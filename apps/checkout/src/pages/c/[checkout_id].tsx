import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";

import { trpc } from "@/lib/trpc";

import {
  ExpiredCheckout,
  LoadingCheckout,
  NotFoundCheckout,
  PaidCheckout,
  PrettyCheckout,
} from "@/components";

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

  return <PrettyCheckout checkout={checkout} />;
};

export default CheckoutPage;
