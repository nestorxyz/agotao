interface TotalCardProps {
  total: string;
}

export const TotalCard: React.FC<TotalCardProps> = (props) => {
  const { total } = props;

  return (
    <article className="mt-4 flex gap-4">
      <div className="h-[42px] w-[42px] rounded-md bg-transparent object-cover" />
      <div>
        <p className="w-auto truncate text-sm font-medium">Total</p>
      </div>
      <div className="ml-auto">
        <p className="text-right font-medium">{total}</p>
      </div>
    </article>
  );
};
