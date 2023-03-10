import { useState } from "react";
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { trpc } from "@/lib/trpc";

import { Modal, DefaultHead, Text, Button } from "@/components";
import {
  CompanyBackButton,
  PaymentElement,
  ItemCard,
  TotalCard,
} from "@/localComponents";
import { ExpiredCheckout, LoadingCheckout, NotFoundCheckout } from "@/screens";
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
  const [showGoBackModal, setShowGoBackModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  const router = useRouter();

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

  if (checkout.payment_intent?.status === "PAID") {
    mixpanel.track("Checkout Page Paid", {
      checkout_id: checkout.id,
      company_id: checkout.company.id,
      company_name: checkout.company.name,
      status: "PAID",
    });

    router.push(`/compra/${checkout.payment_intent.id}`);

    return <></>;
  }

  if (checkout.payment_intent?.status === "VALIDATING") {
    mixpanel.track("Checkout Page Validating", {
      checkout_id: checkout.id,
      company_id: checkout.company.id,
      company_name: checkout.company.name,
      status: "VALIDATING",
    });

    router.push(`/compra/${checkout.payment_intent.id}`);

    return <></>;
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

  const total = checkout.order_items.reduce((acc, item) => {
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
                onClick={() => setShowGoBackModal(true)}
                processing={processing}
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
              <img
                src={checkout.order_items[0]!.product.image} // eslint-disable-line
                alt={checkout.order_items[0]!.product.name} // eslint-disable-line
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
                  {checkout.order_items.reduce((acc, item) => {
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
                {checkout.order_items.map((item) => (
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
          <PaymentElement
            checkout_id={checkout.id}
            setProcessing={setProcessing}
            processing={processing}
          />
        </div>
      </div>
      <footer className="mb-8 mt-10 flex items-center justify-center gap-2 text-gray-400 lg:hidden">
        <p>Compras seguras con</p>
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
        <div className="bg-white p-4">
          <section className="mx-auto max-w-md lg:w-96">
            {checkout.order_items.map((item) => (
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
      <Modal showModal={showGoBackModal} setShowModal={setShowGoBackModal}>
        <div className="rounded-lg bg-white p-8 sm:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <Text.H2 className="text-center font-bold">
            ¿Estás seguro de que quieres salir?
          </Text.H2>
          <Text.Subtitle className="mb-10 text-center">
            Si sales de la página de pago, la compra se cancelará.
          </Text.Subtitle>

          <div className="mt-4 flex flex-col-reverse justify-center gap-2 sm:flex-row">
            <Button
              soft
              color="black"
              onClick={() => {
                setShowGoBackModal(false);
              }}
            >
              No, completar la compra
            </Button>
            <Button
              filled
              color="primary"
              onClick={() => {
                mixpanel.track("Checkout Back ", {
                  company_name: checkout.company.name,
                });

                if (checkout.cancel_url) {
                  window.open(checkout.cancel_url, "_self");
                } else {
                  window.history.back();
                }
              }}
            >
              Salir de todos modos
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CheckoutPage;
