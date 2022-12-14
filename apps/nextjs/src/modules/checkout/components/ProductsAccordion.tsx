import Image from "next/image";

import { Accordion } from "@/shared/components";

export interface ProductsAccordionItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ProductsAccordionProps {
  companyLogo: string;
  companyName: string;
  products: ProductsAccordionItem[];

  className?: string;
}

export const ProductsAccordion: React.FC<ProductsAccordionProps> = (props) => {
  const { companyLogo, companyName, products, className } = props;

  return (
    <Accordion
      className={className}
      items={[
        {
          trigger: (
            <div className="flex gap-2 p-3">
              <Image
                src={companyLogo}
                alt={companyName}
                width={50}
                height={50}
                className="h-[50px] w-[50px] rounded-full object-cover"
              />
              <div className="flex flex-col items-start">
                <h3 className="font-medium">{companyName}</h3>
                <p className="text-sm text-gray-500">{products.length} items</p>
              </div>
            </div>
          ),
          content: (
            <div className="">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="h-[50px] w-[50px] rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm text-gray-500">
                        S/ {product.price}
                      </p>
                      <h3 className="truncate text-xl font-medium">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                  <p className="font-medium text-gray-500">
                    {product.quantity} unidades
                  </p>
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
};
