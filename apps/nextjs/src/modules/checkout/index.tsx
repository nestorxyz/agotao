import { useState } from "react";

// Components
import { Header, Button, Modal } from "@/shared/components";
import {
  ProductsAccordion,
  PaymentElement,
} from "@/modules/checkout/components";
import { AuthContent } from "@/modules/auth/components";

const fakeCompany = {
  name: "Nike",
  logo: "https://mir-s3-cdn-cf.behance.net/projects/404/d5f468144562697.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg",
};

const fakeProduct = {
  id: "1",
  name: "Nike Air Max 270",
  price: 100,
  quantity: 2,
  image:
    "https://mir-s3-cdn-cf.behance.net/projects/404/d5f468144562697.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg",
};

const fakeProducts = Array.from({ length: 5 }, () => fakeProduct);

const Checkout: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      id="checkout-container"
      className="relative min-h-screen md:bg-[#FCFCFC]"
    >
      <Modal showModal={open} setShowModal={setOpen}>
        <AuthContent />
      </Modal>
      <Header>
        <div className="flex gap-2">
          <Button color="black" size="small" onClick={() => setOpen(true)}>
            Iniciar sesión
          </Button>
          <Button
            color="black"
            size="small"
            light
            onClick={() => setOpen(true)}
          >
            Crear cuenta
          </Button>
        </div>
      </Header>
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
