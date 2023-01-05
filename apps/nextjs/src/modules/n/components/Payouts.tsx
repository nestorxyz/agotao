import { trpc } from "@/utils/trpc";

export const Payouts: React.FC = () => {
  const { data, isLoading } = trpc.admin.payouts.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return <div></div>;
};
