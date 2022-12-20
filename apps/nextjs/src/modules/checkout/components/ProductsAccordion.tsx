import Image from "next/image";

import { Accordion } from "@/shared/components";
import { ProductCard } from "@/modules/checkout/components";

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
              <div className="relative h-[50px] w-[50px]">
                <Image
                  src={companyLogo}
                  alt={companyName}
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>

              <div className="flex flex-col items-start">
                <h3 className="font-medium">{companyName}</h3>
                <p className="text-sm text-gray-500">{products.length} items</p>
              </div>
            </div>
          ),
          content: (
            <div className="">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
              ))}
            </div>
          ),
        },
      ]}
    />
  );
};
