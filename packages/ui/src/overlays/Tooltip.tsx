import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const { children, content } = props;

  return (
    <TooltipPrimitive.Provider delayDuration={100}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger className="hidden sm:inline-flex" asChild>
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={4}
          side="top"
          className="animate-slide-up-fade z-30 hidden items-center overflow-hidden rounded-md border border-gray-200 bg-white drop-shadow-lg sm:block"
        >
          <TooltipPrimitive.Arrow className="fill-current text-white" />
          {typeof content === "string" ? (
            <div className="p-5">
              <span className="block max-w-xs text-center text-sm text-gray-700">
                {content}
              </span>
            </div>
          ) : (
            content
          )}
          <TooltipPrimitive.Arrow className="fill-current text-white" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
