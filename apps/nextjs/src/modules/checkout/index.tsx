// Components
import { Header } from "@/shared/components";
import {
  ProductsAccordion,
  PaymentElement,
} from "@/modules/checkout/components";

const fakeCompany = {
  name: "Company Name",
  logo: "https://mir-s3-cdn-cf.behance.net/projects/404/d5f468144562697.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg",
};

const fakeProduct = {
  id: "1",
  name: "Product Name",
  price: 100,
  quantity: 2,
  image:
    "https://mir-s3-cdn-cf.behance.net/projects/404/d5f468144562697.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg",
};

const fakeProducts = Array.from({ length: 5 }, () => fakeProduct);

const Checkout: React.FC = () => {
  return (
    <div
      id="checkout-container"
      className="relative flex min-h-screen flex-col md:bg-[#FCFCFC]"
    >
      <Header />
      <div className="flex flex-1 flex-col p-4 md:my-6 md:mx-auto md:w-full md:max-w-5xl md:flex-row-reverse md:justify-center md:gap-4 md:p-0">
        <ProductsAccordion
          companyLogo={fakeCompany.logo}
          companyName={fakeCompany.name}
          products={fakeProducts}
          className="mb-4 md:mb-0 md:w-full"
        />

        <div className="w-full md:h-fit md:max-w-lg md:rounded-2xl md:bg-white md:px-6 md:py-8">
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
