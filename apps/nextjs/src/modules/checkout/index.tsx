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
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col bg-[#FCFCFC] p-4">
        <ProductsAccordion
          companyLogo={fakeCompany.logo}
          companyName={fakeCompany.name}
          products={fakeProducts}
          className="mb-4"
        />

        <h2 className="font-semibold">Método de compra</h2>
        <PaymentElement />
      </div>
    </div>
  );
};

export default Checkout;
