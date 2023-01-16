import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { IoCopy } from "react-icons/io5";
import { Dayjs } from "@agotao/utils";

// Services
import {
  prisma,
  Purchase,
  Product,
  PaymentMethod,
  CheckoutSession,
  Company,
} from "@acme/db";

// Components
import { DefaultHead } from "@/components";
import { ItemCard, TotalCard } from "@/localComponents";

interface PurchasePageProps {
  purchase: Pick<
    Purchase,
    "id" | "name" | "email" | "status" | "updatedAt" | "amount"
  > & {
    checkoutSession: Pick<CheckoutSession, "id"> & {
      company: Pick<Company, "name" | "image">;
      orderItems: {
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

  const purchase = await prisma.purchase.findUnique({
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
      checkoutSession: {
        select: {
          id: true,
          company: {
            select: {
              name: true,
              image: true,
            },
          },
          orderItems: {
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

  if (!purchase)
    return {
      notFound: true,
    };

  if (purchase.status === "INVALID")
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      purchase: JSON.parse(JSON.stringify(purchase)),
    },
  };
};

const PurchasePage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { purchase } = props;

  const handleCopy = (
    paymentMethod: Pick<PaymentMethod, "id" | "name" | "type" | "keyInfo">,
  ) => {
    navigator.clipboard.writeText(paymentMethod.keyInfo);
    toast.success(`Copiado ${paymentMethod.name}`);
  };

  const total_items = purchase.checkoutSession.orderItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <>
      <DefaultHead
        siteName={purchase.name.split(" ")[0]}
        title={`Compra en ${purchase.checkoutSession.company.name}`}
      />

      <div className="flex min-h-screen w-full flex-col">
        <header className="flex items-center bg-white py-5 px-4">
          <div className="mx-auto flex w-full max-w-5xl justify-between">
            <Image src="/isotipo.svg" alt="logo" width={124} height={30} />
          </div>
        </header>

        <main className="mx-auto flex w-full flex-col gap-4 p-4 md:w-full md:max-w-5xl md:flex-row md:gap-10 lg:px-0">
          <section className="w-full space-y-4">
            <h1 className="text-2xl font-bold">
              Hola {purchase.name.split(" ")[0]}, has comprado {total_items}{" "}
              {total_items > 1 ? "productos" : "producto"} en{" "}
              {purchase.checkoutSession.company.name}
            </h1>

            <div className="rounded-lg border border-gray-100 px-6 py-4">
              <h3 className="font-medium text-gray-600">Estado de la compra</h3>
              {purchase.status === "VALID" ? (
                <div>
                  <p>
                    Tu compra ha sido validada,{" "}
                    {purchase.checkoutSession.company.name} se comunicará
                    contigo
                  </p>
                </div>
              ) : (
                <div>
                  <p className="mb-3">
                    Tu pago está en validación, puede tomar de 1 a 5 minutos en
                    validarse
                  </p>
                  <p>
                    Si aún no realizas el pago, realizalo mediante tu medio de
                    pago seleccionado:
                  </p>
                  <div className="mx-auto my-4 flex w-fit gap-2">
                    <Image
                      src={`/images/payment/${purchase.payment_method.type.toLowerCase()}.png`}
                      alt={purchase.payment_method.name}
                      width={200}
                      height={200}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex w-full flex-col items-center justify-center">
                      <p className="mb-2 text-center text-lg">
                        {purchase.payment_method.type === "YAPE" ||
                        purchase.payment_method.type === "PLIN"
                          ? `Envía el total de tu compra a este número con ${purchase.payment_method.name}`
                          : `Número de cuenta ${purchase.payment_method.type}`}
                      </p>

                      <button
                        className="flex items-center gap-2 transition-all active:scale-95"
                        onClick={() => handleCopy(purchase.payment_method)}
                      >
                        <p className="text-xl font-semibold text-primary">
                          {purchase.payment_method.keyInfo}
                        </p>
                        <IoCopy className="h-6 w-6 text-primary" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-gray-600">
                Información de contacto
              </h3>
              <div className="space-y-1 rounded-lg bg-gray-50 px-6 py-4 text-sm">
                <p className="text-lg font-semibold"> {purchase.name}</p>
                <p className="text-sm text-gray-600"> {purchase.email}</p>
              </div>
            </div>
          </section>

          <div className="border-t md:hidden" />

          <section className="w-full max-w-md space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src={purchase.checkoutSession.company.image}
                alt={purchase.checkoutSession.company.name}
                width={200}
                height={200}
                className="h-16 w-16 rounded-full object-cover"
              />
              <p className="text-lg font-semibold">
                {purchase.checkoutSession.company.name}
              </p>
            </div>

            <div className="space-y-2 rounded-lg bg-white p-4 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
              <div>
                <h2 className="font-medium text-gray-600">Detalle de compra</h2>
                <h3 className="text-sm text-gray-500">
                  Identificador único de compra: {purchase.id}
                </h3>
              </div>

              <section className="mx-auto max-w-md lg:w-96">
                {purchase.checkoutSession.orderItems.map((item) => (
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
                <TotalCard total={Dayjs.formatMoney(purchase.amount)} />
              </section>
            </div>
          </section>
        </main>
        <p className="mx-auto mt-12 mb-4 w-full max-w-5xl p-4 text-sm md:mt-36 md:p-0">
          Si tienes alguna duda, puedes contactarnos a través de nuestro correo
          electrónico:{" "}
          <a
            href="mailto:
                  nestor@agotao.com"
            className="font-semibold text-primary"
          >
            nestor@agotao.com
          </a>
        </p>
      </div>
    </>
  );
};

export default PurchasePage;
