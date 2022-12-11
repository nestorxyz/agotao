// Components
import { Header } from "@/shared/components";
import { ProductsAccordion } from "@/modules/checkout/components";

const fakeCompany = {
  name: "Company Name",
  logo: "https://images.unsplash.com/photo-1616489950003-8e1f2e1b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
};

const fakeProduct = {
  id: "1",
  name: "Product Name",
  price: 100,
  quantity: 2,
  image:
    "https://images.unsplash.com/photo-1616489950003-8e1f2e1b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
};

const fakeProducts = Array.from({ length: 5 }, () => fakeProduct);

const Checkout: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="p-4">
        <ProductsAccordion
          companyLogo={fakeCompany.logo}
          companyName={fakeCompany.name}
          products={fakeProducts}
        />
      </div>
    </div>
  );
};

export default Checkout;
