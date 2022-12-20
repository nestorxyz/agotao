// Components
import {
  ProductsAccordion,
  PaymentElement,
  CheckoutHeader,
} from "@/modules/checkout/components";

const fakeCompany = {
  name: "Naiki",
  logo: "https://images.squarespace-cdn.com/content/v1/5c08276ada02bc6f72ea0cfe/1594373937107-9TY8XMZIBBN8TAT817ZR/logo+design",
};

const fakeProduct = {
  id: "1",
  name: "Naiki Hoddie Max 270",
  price: 100,
  quantity: 2,
  image: "https://i.linio.com/p/b3b1a3fbb8ec9970c82c16d31ace87e1-product.webp",
};

const fakeProducts = Array.from({ length: 1 }, () => fakeProduct);

const Checkout: React.FC = () => {
  return (
    <div
      id="checkout-container"
      className="relative min-h-screen md:bg-[#FCFCFC]"
    >
      <CheckoutHeader />

      <div className="flex flex-1 flex-col p-4 md:my-6 md:mx-auto md:w-full md:max-w-5xl md:flex-row-reverse md:justify-center md:gap-8 md:p-0">
        <div className="h-fit w-full flex-col gap-4 divide-gray-100 rounded-2xl bg-white md:flex md:divide-y md:p-6 md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
          <div id="purchase-container"></div>
          <ProductsAccordion
            companyLogo={fakeCompany.logo}
            companyName={fakeCompany.name}
            products={fakeProducts}
            className="mb-4"
          />
        </div>

        <div className="w-full md:h-fit md:max-w-lg md:rounded-2xl md:bg-white md:px-6 md:py-8 md:shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
          <h2 className="font-semibold">Método de compra</h2>
          <PaymentElement
            amount={fakeProducts.reduce(
              (acc, product) => acc + product.price * product.quantity,
              0,
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
