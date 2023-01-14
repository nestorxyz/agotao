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
import { Modal } from "@agotao/ui";

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
      <header className="p-4">
        <CompanyBackButton
          name={checkout.company.name}
          logo={checkout.company.image}
          cancel_url={checkout.cancel_url ?? undefined}
        />

        <button
          className="flex items-center gap-2"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Detalles
          <ChevronDownIcon className="h-5 w-5" />
        </button>
      </header>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="p-4">
          <h1 className="text-2xl font-semibold">Detalles de la compra</h1>
          <button>asd</button>
        </div>
      </Modal>
    </>
  );
};

export default CheckoutPage;
