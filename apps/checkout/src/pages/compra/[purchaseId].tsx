import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import { useState } from "react";
import Image from "next/image";
import { ChevronDownIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Dayjs } from "@agotao/utils";

// Services
import {
  prisma,
  PaymentIntent,
  Product,
  PaymentMethod,
  CheckoutSession,
  Company,
} from "@acme/db";

// Components
import { DefaultHead, Modal } from "@/components";
import { CompanyBackButton, ItemCard, TotalCard } from "@/localComponents";
import { VerifiyingPayment } from "@/localComponents/VerifiyingPayment";
import { StatusBadge } from "@/localComponents/StatusBadge";

interface PurchasePageProps {
  payment_intent: Pick<
    PaymentIntent,
    "id" | "name" | "email" | "status" | "updatedAt" | "amount"
  > & {
    checkout_session: Pick<CheckoutSession, "id" | "expires_at"> & {
      company: Pick<Company, "name" | "image">;
      order_items: {
        id: string;
        quantity: number;
        product: Pick<Product, "id" | "name" | "price" | "image">;
      }[];
    };
    payment_method: Pick<PaymentMethod, "id" | "name" | "type" | "keyInfo">;
  };
}

export const getServerSideProps: GetServerSideProps<PurchasePageProps> = async (
  ctx,
) => {
  const { purchaseId } = ctx.query as {
    purchaseId: string;
  };

  const payment_intent = await prisma.paymentIntent.findUnique({
    where: {
      id: purchaseId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      updatedAt: true,
      amount: true,
      checkout_session: {
        select: {
          id: true,
          expires_at: true,
          company: {
            select: {
              name: true,
              image: true,
            },
          },
          order_items: {
            select: {
              id: true,
              quantity: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  price: true,
                },
              },
            },
          },
        },
      },
      payment_method: {
        select: {
          id: true,
          name: true,
          type: true,
          keyInfo: true,
        },
      },
    },
  });

  if (!payment_intent)
    return {
      notFound: true,
    };

  return {
    props: {
      payment_intent: JSON.parse(JSON.stringify(payment_intent)),
    },
  };
};

const PurchasePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { payment_intent } = props;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <DefaultHead
        siteName={payment_intent.name.split(" ")[0]}
        title={`Compra en ${payment_intent.checkout_session.company.name}`}
      />

      <div className="p-4 lg:flex lg:min-h-screen lg:p-0">
        <section className="mx-auto mb-8 w-full max-w-sm lg:m-0 lg:max-w-none lg:bg-[rgba(0,0,0,0.01)] lg:py-16">
          <div className="ml-auto flex flex-col gap-8 lg:mr-20 lg:h-full lg:w-96">
            <header className="flex justify-between">
              <CompanyBackButton
                name={payment_intent.checkout_session.company.name}
                logo={payment_intent.checkout_session.company.image}
                processing={true}
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
                src={
                  // eslint-disable-next-line
                  payment_intent.checkout_session.order_items[0]!.product.image
                }
                alt={
                  // eslint-disable-next-line
                  payment_intent.checkout_session.order_items[0]!.product.name
                }
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
                  {payment_intent.checkout_session.order_items.reduce(
                    (acc, item) => {
                      return acc + item.quantity;
                    },
                    0,
                  )}{" "}
                  items
                </span>
                <ChevronRightIcon className="h-[14px] w-[14px] text-gray-400" />
              </button>
            </div>
            <div className="text-center lg:text-left">
              <p className="font-medium text-gray-500">
                Tu compra en {payment_intent.checkout_session.company.name}
              </p>
              <p className="text-3xl font-semibold">
                {Dayjs.formatMoney(payment_intent.amount)}
              </p>
            </div>
            <div className="hidden lg:inline-block">
              <section className="mx-auto max-w-md lg:w-96">
                {payment_intent.checkout_session.order_items.map((item) => (
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
                <TotalCard total={Dayjs.formatMoney(payment_intent.amount)} />
              </section>
            </div>

            <footer className="mb-8 mt-auto hidden items-center gap-2 text-gray-400 lg:flex">
              <p>Compras seguras con</p>
              <Image
                src="/isotipo.svg"
                alt="Isotipo de Agotao"
                width={80}
                height={42}
              />
            </footer>
          </div>
        </section>
        <div className="lg:w-full lg:max-w-none lg:pt-16 lg:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
          <div className="mx-auto flex max-w-md flex-col gap-8 lg:m-0 lg:ml-20 lg:mt-8">
            <div className="space-y-1">
              <h3 className="font-medium text-gray-600">
                Información de contacto
              </h3>
              <div className="space-y-1 rounded-lg text-sm">
                <p className="text-gray-500">
                  Nombre:{" "}
                  <span className="font-medium text-black">
                    {payment_intent.name}
                  </span>
                </p>
                <p className="text-gray-500">
                  Email:{" "}
                  <span className="font-medium text-black">
                    {payment_intent.email}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-600">
                    Estado de tu compra
                  </h3>
                  <span className="text-sm text-gray-400">
                    ID: {payment_intent.id}
                  </span>
                </div>
                <StatusBadge status={payment_intent.status} />
              </div>
              <VerifiyingPayment
                company_name={payment_intent.checkout_session.company.name}
                payment_method={payment_intent.payment_method.name}
                payment_method_info={payment_intent.payment_method.keyInfo}
                total={Dayjs.formatMoney(payment_intent.amount)}
                expires_at={Dayjs.dayjs
                  .tz(
                    payment_intent.checkout_session.expires_at,
                    "America/Lima",
                  )
                  .format("DD [de] MMMM [de] YYYY, h:mm a")}
                status={payment_intent.status}
              />
            </div>

            <p
              className="mx-auto mb-4 w-full max-w-5xl text-sm md:p-0 md:pb-1
             lg:mt-auto"
            >
              Si tienes alguna duda, puedes contactarnos a través de nuestro
              correo electrónico:{" "}
              <a
                href="mailto:
                pagos@agotao.com"
                className="font-semibold text-primary"
              >
                pagos@agotao.com
              </a>
            </p>
          </div>
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
            {payment_intent.checkout_session.order_items.map((item) => (
              <ItemCard
                key={item.id}
                name={item.product.name}
                image={item.product.image}
                quantity={item.quantity}
                price={Dayjs.formatMoney(item.product.price)}
                total={Dayjs.formatMoney(item.quantity * item.product.price)}
              />
            ))}
            <TotalCard total={Dayjs.formatMoney(payment_intent.amount)} />
          </section>
        </div>
      </Modal>
    </>
  );
};

export default PurchasePage;
