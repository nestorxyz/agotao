import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { IoCopy } from "react-icons/io5";

// Services
import { prisma, Purchase, Product, Company, PaymentMethod } from "@acme/db";

// Components
import { DefaultHead, Header } from "@/shared/components";
import { ProductCard } from "@/modules/checkout/components";

interface PurchasePageProps {
  purchase: Pick<Purchase, "id" | "name" | "email" | "status" | "updatedAt"> & {
    product: Pick<Product, "id" | "name" | "price" | "image"> & {
      company: Pick<Company, "id" | "name" | "image" | "username">;
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
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          company: {
            select: {
              id: true,
              name: true,
              image: true,
              username: true,
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

  return (
    <>
      <DefaultHead
        siteName={purchase.name.split(" ")[0]}
        title={`Compra de ${purchase.product.name}`}
      />

      <header className="flex items-center bg-white py-5 px-4">
        <div className="mx-auto flex w-full max-w-6xl justify-between">
          <Image src="/isotipo.svg" alt="logo" width={124} height={30} />
        </div>
      </header>

      <h1 className="relative my-4 max-w-[800px] text-center text-4xl font-extrabold sm:text-5xl md:text-6xl">
        Hola {purchase.name.split(" ")[0]}, has comprado {purchase.product.name}
      </h1>

      <main>
        <section>
          <h3>Identificador único de compra: {purchase.id}</h3>
          {purchase.status === "VALID" ? (
            <div>
              <p>
                Tu compra ha sido validada, {purchase.product.company.name} se
                comunicará contigo, gracias por tu compra.
              </p>
              <p>
                Si tienes alguna duda, puedes contactarnos a través de nuestro
                correo electrónico:{" "}
                <a
                  href="mailto:
                  nestor@agotao.com"
                >
                  nestor@agotao.com
                </a>
              </p>
            </div>
          ) : (
            <div>
              <p>
                Tu pago está en validación, puede tomar de 1 a 5 minutos en
                validarse
              </p>
              <p>
                Si aún no realizas el pago, realizalo mediante tu medio de pago
                seleccionado:
              </p>
              <div>
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
          <div>
            <h3>Tu información</h3>
            <p>Nombre: {purchase.name}</p>
            <p>Email: {purchase.email}</p>
          </div>
        </section>
        <section>
          <div className="flex gap-2 p-3">
            <Image
              src={purchase.product.company.image}
              alt={purchase.product.company.name}
              width={250}
              height={250}
              className="w-32"
            />

            <div className="flex flex-col items-start">
              <h3 className="font-medium">{purchase.product.company.name}</h3>
            </div>
          </div>
          <ProductCard
            image={purchase.product.image}
            name={purchase.product.name}
            price={purchase.product.price}
            quantity={1}
          />
        </section>
      </main>
    </>
  );
};

export default PurchasePage;
