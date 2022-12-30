import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";

// Components
import { DefaultHead } from "@/shared/components";
import {
  ProductsAccordion,
  CheckoutHeader,
  PaymentElement,
} from "@/modules/checkout/components";

// Services
import { prisma, Product, Company, PaymentMethod } from "@acme/db";
import { env } from "@/env/client.mjs";

interface ProductPageProps {
  product: Pick<Product, "id" | "name" | "price" | "image"> & {
    company: Pick<Company, "id" | "image" | "name" | "username">;
  };
  paymentMethods: Array<
    Pick<PaymentMethod, "id" | "name" | "type" | "keyInfo">
  >;
}

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (
  ctx,
) => {
  const { productId } = ctx.query as {
    productId: string;
  };

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      company: {
        select: {
          id: true,
          image: true,
          name: true,
          username: true,
        },
      },
    },
  });

  if (!product) {
    return {
      notFound: true,
    };
  }

  const paymentMethods = await prisma.paymentMethod.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      keyInfo: true,
    },
  });

  return {
    props: {
      product,
      paymentMethods,
    },
  };
};

const ProductPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { product, paymentMethods } = props;

  return (
    <>
      <DefaultHead
        title={product.name}
        canonical={`${env.NEXT_PUBLIC_APP_URL}/${product.company.username}/${product.id}`}
      />

      <div
        id="checkout-container"
        className="relative min-h-screen md:bg-[#FCFCFC]"
      >
        <CheckoutHeader
          callbackUrl={`/${product.company.username}/${product.id}`}
        />

        <div className="flex flex-1 flex-col p-4 md:my-6 md:mx-auto md:w-full md:max-w-5xl md:flex-row-reverse md:justify-center md:gap-8 md:p-0">
          <div className="h-fit w-full flex-col gap-4 divide-gray-100 rounded-2xl bg-white md:flex md:divide-y md:p-6 md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
            <div id="purchase-container"></div>
            <ProductsAccordion
              companyLogo={product.company.image}
              companyName={product.company.name}
              products={[
                {
                  ...product,
                  quantity: 1,
                },
              ]}
              className="mb-4"
            />
          </div>

          <div className="w-full md:h-fit md:max-w-lg md:rounded-2xl md:bg-white md:px-6 md:py-8 md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
            <PaymentElement
              amount={product.price}
              product_id={product.id}
              paymentMethods={paymentMethods}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
