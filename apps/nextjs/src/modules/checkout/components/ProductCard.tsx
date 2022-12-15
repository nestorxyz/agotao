import Image from "next/image";
import classNames from "classnames";

export interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  quantity: number;

  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { image, name, price, quantity, className } = props;

  return (
    <div
      className={classNames(className, "flex items-center justify-between p-4")}
    >
      <div className="flex items-center space-x-2">
        <div className="relative h-[50px] w-[50px]">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div>
          <p className="text-sm text-gray-500">S/ {price}</p>
          <h3 className="truncate text-xl font-medium">{name}</h3>
        </div>
      </div>
      <p className="font-medium text-gray-500">{quantity} unidades</p>
    </div>
  );
};
