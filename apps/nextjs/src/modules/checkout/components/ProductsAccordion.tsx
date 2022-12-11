import Image from "next/image";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

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
}

export const ProductsAccordion: React.FC<ProductsAccordionProps> = (props) => {
  const { companyLogo, companyName, products } = props;

  return (
    <Accordion.Root type="single" defaultValue="1" collapsible>
      <Accordion.Item value="1">
        <Accordion.Trigger className="group flex w-full items-center justify-between">
          <div className="space-x-2">
            <Image
              src={companyLogo}
              alt={companyName}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h3 className="font-medium">{companyName}</h3>
              <p className="text-sm text-gray-500">{products.length} items</p>
            </div>
          </div>
          <ChevronDownIcon
            aria-hidden
            className="group-radix-state-open:rotate-180 h-5 w-5 text-gray-600 transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]"
          />
        </Accordion.Trigger>
        <Accordion.Content>
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
                <div>
                  <p className="text-gray-500">{product.price}</p>
                  <h3 className="text-2xl font-medium">{product.name}</h3>
                </div>
              </div>
              <p className="text-gray-500 font-medium">{product.quantity} unidades</p>
            </div>
          ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
