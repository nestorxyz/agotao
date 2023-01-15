import Image from "next/image";

interface ItemCardProps {
  image: string;
  name: string;
  quantity: number;
  price: string;
  total: string;
}

export const ItemCard: React.FC<ItemCardProps> = (props) => {
  const { image, name, quantity, price, total } = props;

  return (
    <article className="flex gap-4">
      <Image
        src={image}
        alt={name}
        width={100}
        height={100}
        className="h-[42px] w-[42px] rounded-md object-cover"
      />
      <div>
        <p className="w-auto truncate text-sm font-medium">{name}</p>
        <p className="text-xs text-gray-500">{quantity} unidades</p>
      </div>
      <div className="ml-auto">
        <p className="w-auto truncate text-right text-sm font-medium">
          {total}
        </p>
        <p className="text-right text-xs text-gray-500">{price} cada uno</p>
      </div>
    </article>
  );
};
