import { useState, useEffect } from "react";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { trpc } from "@/lib/trpc";

import { Modal, DefaultHead } from "@/components";
import {
  CompanyBackButton,
  PaymentElement,
  ItemCard,
  TotalCard,
} from "@/localComponents";
import {
  ExpiredCheckout,
  LoadingCheckout,
  NotFoundCheckout,
  PaidCheckout,
} from "@/screens";
import { Dayjs } from "@agotao/utils";
import Image from "next/image";

import mixpanel from "@/lib/mixpanel";

interface CheckoutPageProps {
  checkout_id: string;
}

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

  if (checkout.payment_status === "PAID") {
    mixpanel.track("Checkout Page Paid", {
      checkout_id: checkout.id,
      company_id: checkout.company.id,
      company_name: checkout.company.name,
      status: "PAID",
    });

    return <PaidCheckout />;
  }

  if (checkout.status === "EXPIRED") {
    mixpanel.track("Checkout Page Expired", {
      checkout_id: checkout.id,
      company_id: checkout.company.id,
      company_name: checkout.company.name,
      status: "EXPIRED",
    });

    return <ExpiredCheckout />;
  }

  mixpanel.track("Checkout Page", {
    checkout_id: checkout.id,
    company_id: checkout.company.id,
    company_name: checkout.company.name,
    status: "VALID",
  });

  const total = checkout.orderItems.reduce((acc, item) => {
    return acc + item.quantity * item.product.price;
  }, 0);

  return (
    <>
      <DefaultHead title={`Checkout - ${checkout.company.name}`} />

      <div className="p-4 lg:flex lg:min-h-screen lg:p-0">
        <section className="mx-auto mb-8 w-full max-w-sm lg:m-0 lg:max-w-none lg:bg-[rgba(0,0,0,0.01)] lg:pt-16">
          <div className="ml-auto space-y-8 lg:mr-20 lg:w-96">
            <header className="flex justify-between">
              <CompanyBackButton
                name={checkout.company.name}
                logo={checkout.company.image}
                cancel_url={checkout.cancel_url ?? undefined}
              />

              <button
                className="flex items-center gap-1 text-sm font-medium text-gray-400 lg:hidden"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Detalles
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </header>
            <div className="relative flex flex-col items-center lg:hidden">
              <Image
                src={checkout.orderItems[0]!.product.image} // eslint-disable-line
                alt={checkout.orderItems[0]!.product.name} // eslint-disable-line
                width={300}
                height={300}
                className="h-32 w-32 rounded-md object-cover"
              />
              <button
                className="absolute -bottom-4 flex min-w-[100px] items-center justify-center gap-1 rounded-full bg-white px-1 py-1 shadow-sm"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                <span className="text-sm font-medium leading-4 text-gray-800">
                  {checkout.orderItems.reduce((acc, item) => {
                    return acc + item.quantity;
                  }, 0)}{" "}
                  items
                </span>
                <ChevronRightIcon className="h-[14px] w-[14px] text-gray-400" />
              </button>
            </div>
            <div className="text-center lg:text-left">
              <p className="font-medium text-gray-500">
                Comprar en {checkout.company.name}
              </p>
              <p className="text-3xl font-semibold">
                {Dayjs.formatMoney(total)}
              </p>
            </div>
            <div className="hidden lg:inline-block">
              <section className="mx-auto max-w-md lg:w-96">
                {checkout.orderItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    name={item.product.name}
                    image={item.product.image}
                    quantity={item.quantity}
                    price={Dayjs.formatMoney(item.product.price)}
                    total={Dayjs.formatMoney(
                      item.quantity * item.product.price,
                    )}
                  />
                ))}
                <TotalCard total={Dayjs.formatMoney(total)} />
              </section>
            </div>
          </div>
        </section>
        <div className="lg:w-full lg:max-w-none lg:pt-16 lg:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
          <PaymentElement checkout_id={checkout.id} amount={total} />
        </div>
      </div>
      <footer className="mb-8 mt-10 flex items-center justify-center gap-2 text-gray-400 lg:hidden">
        <p>Powered by</p>
        <Image
          src="/isotipo.svg"
          alt="Isotipo de Agotao"
          width={80}
          height={42}
        />
      </footer>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        breakPoint={1024}
      >
        <div className="bg-white p-4" id="mobile-items">
          <section className="mx-auto max-w-md lg:w-96">
            {checkout.orderItems.map((item) => (
              <ItemCard
                key={item.id}
                name={item.product.name}
                image={item.product.image}
                quantity={item.quantity}
                price={Dayjs.formatMoney(item.product.price)}
                total={Dayjs.formatMoney(item.quantity * item.product.price)}
              />
            ))}
            <TotalCard total={Dayjs.formatMoney(total)} />
          </section>
        </div>
      </Modal>
    </>
  );
};

export default CheckoutPage;
