import { useState } from "react";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { trpc } from "@/lib/trpc";

import { CompanyBackButton } from "@/components";
import {
  ExpiredCheckout,
  LoadingCheckout,
  NotFoundCheckout,
  PaidCheckout,
} from "@/screens";
import { Modal, Dayjs } from "@agotao/ui";
import Image from "next/image";

interface CheckoutPageProps {
  checkout_id: string;
}

// Return the checkout_id from the URL
export const getServerSideProps: GetServerSideProps<CheckoutPageProps> = async (
  context,
) => {
  const { checkout_id } = context.query;

  if (!checkout_id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      checkout_id: checkout_id as string,
    },
  };
};

const CheckoutPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const [showModal, setShowModal] = useState(false);

  const { data: checkout, isLoading } = trpc.checkout.getPage.useQuery(
    props.checkout_id,
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return <LoadingCheckout />;
  }

  if (!checkout) {
    return <NotFoundCheckout />;
  }

  /* if (checkout.payment_status === "PAID") {
    return <PaidCheckout />;
  }

  if (checkout.status === "EXPIRED") {
    return <ExpiredCheckout />;
  } */

  return (
    <>
      <header className="flex justify-between p-4">
        <CompanyBackButton
          name={checkout.company.name}
          logo={checkout.company.image}
          cancel_url={checkout.cancel_url ?? undefined}
        />

        <button
          className="flex items-center gap-1 text-sm font-medium text-gray-400"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Detalles
          <ChevronDownIcon className="h-4 w-4" />
        </button>
      </header>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="p-4">
          <section>
            {checkout.orderItems.map((item) => (
              <article className="flex gap-4">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="h-[42px] w-[42px] rounded-md object-cover"
                />
                <div>
                  <p className="w-auto truncate text-sm font-medium">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} unidades
                  </p>
                </div>
                <div className="ml-auto">
                  <p className="w-auto truncate text-right text-sm font-medium">
                    {Dayjs.formatMoney(item.product.price * item.quantity)}
                  </p>
                  <p className="text-right text-xs text-gray-500">
                    {Dayjs.formatMoney(item.product.price)} cada uno
                  </p>
                </div>
              </article>
            ))}
          </section>
        </div>
      </Modal>
    </>
  );
};

export default CheckoutPage;
