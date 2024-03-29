import { useRouter } from "next/router";
import classNames from "classnames";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import type { PanInfo } from "framer-motion";

import { useViewportSize } from "@agotao/utils";

export function Modal({
  children,
  showModal,
  setShowModal,
  bgColor = "bg-white",
  closeWithX,
  disableClose,
  breakPoint = 640,
}: {
  children: React.ReactNode;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  bgColor?: string;
  closeWithX?: boolean;
  disableClose?: boolean;
  breakPoint?: number;
}) {
  const router = useRouter();
  const { key } = router.query;
  const mobileModalRef = useRef(null);
  const desktopModalRef = useRef(null);
  const { width } = useViewportSize();

  const closeModal = useCallback(
    (closeWithX?: boolean) => {
      if (disableClose) return;

      if (closeWithX) {
        return;
      } else if (key) {
        router.push("/");
      } else {
        setShowModal(false);
      }
    },
    [key, router, setShowModal, disableClose],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && !closeWithX) {
        if (disableClose) return;

        setShowModal(false);
      }
    },
    [disableClose, closeWithX, setShowModal],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const controls = useAnimation();
  const transitionProps = { type: "spring", stiffness: 500, damping: 30 };
  useEffect(() => {
    controls.start({
      y: 0,
      transition: transitionProps,
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleDragEnd(
    _: MouseEvent | PointerEvent | TouchEvent,
    info: PanInfo,
  ) {
    const offset = info.offset.y;
    const velocity = info.velocity.y;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const height = (mobileModalRef.current as any).getBoundingClientRect()
      .height;
    if (offset > height / 2 || velocity > 800) {
      await controls.start({ y: "100%", transition: transitionProps });
      closeModal();
    } else {
      controls.start({ y: 0, transition: transitionProps });
    }
  }

  return (
    <AnimatePresence>
      {showModal && (
        <div className="absolute">
          <motion.div
            {...(width < breakPoint
              ? {
                  ref: mobileModalRef,
                  key: "mobile-modal",
                  className: classNames(
                    "group inset-x-0 bottom-0 z-40 w-screen cursor-grab active:cursor-grabbing",
                    width > breakPoint ? "hidden" : "fixed",
                  ),
                  initial: { y: "0%" },
                  animate: controls,
                  exit: { y: "100%" },
                  transition: transitionProps,
                  drag: "y",
                  dragDirectionLock: true,
                  onDragEnd: handleDragEnd,
                  dragElastic: { top: 0, bottom: 1 },
                  dragConstraints: { top: 0, bottom: 0 },
                }
              : {
                  ref: desktopModalRef,
                  key: "desktop-modal",
                  className: classNames(
                    "fixed inset-0 z-40 min-h-screen items-center justify-center",
                    width > breakPoint ? "flex" : "hidden",
                  ),
                  initial: { scale: 0.95 },
                  animate: { scale: 1 },
                  exit: { scale: 0.95 },
                  onMouseDown: (e) => {
                    if (desktopModalRef.current === e.target) {
                      closeModal(closeWithX);
                    }
                  },
                })}
          >
            <div
              className={classNames(
                `h-7 ${bgColor} rounded-t-4xl -mb-1 flex w-full items-center justify-center border-t border-gray-200`,
                width > breakPoint && "hidden",
              )}
            >
              <div className="-mr-1 h-1 w-6 rounded-full bg-gray-300 transition-all group-active:rotate-12" />
              <div className="h-1 w-6 rounded-full bg-gray-300 transition-all group-active:-rotate-12" />
            </div>
            {children}
          </motion.div>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => closeModal(closeWithX)}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
