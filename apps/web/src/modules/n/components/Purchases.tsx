import { trpc } from "@/utils/trpc";
import toast from "react-hot-toast";

import {
  Card,
  Title,
  Text,
  Flex,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
} from "@tremor/react";

import { Dayjs } from "@agotao/utils";

import { Button } from "@/shared/components";

export const Purchases: React.FC = () => {
  const { data, isLoading, refetch } = trpc.admin.getPurchases.useQuery();

  const validatePurchaseMutation = trpc.admin.validatePurchase.useMutation({
    onSuccess: () => {
      toast.success("Purchase validated");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Flex justifyContent="justify-start" spaceX="space-x-2">
        <Title>Purchases</Title>
        <Badge text={data?.data.length.toString() ?? ""} color="gray" />
      </Flex>
      <Text marginTop="mt-2">Overview of purchases</Text>

      <Table marginTop="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Empresa</TableHeaderCell>
            <TableHeaderCell>Builder</TableHeaderCell>
            <TableHeaderCell>Builder Email</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Amount</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Fees</TableHeaderCell>
            <TableHeaderCell textAlignment="text-right">Income</TableHeaderCell>
            <TableHeaderCell>Link</TableHeaderCell>
          </TableRow>
        </TableHead>

        {data && (
          <TableBody>
            {data.data.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>{purchase.name}</TableCell>
                <TableCell>{purchase.email}</TableCell>
                <TableCell>{purchase.checkoutSession.company.name}</TableCell>
                <TableCell>
                  {purchase.checkoutSession.company.admin.name}
                </TableCell>
                <TableCell>
                  {purchase.checkoutSession.company.admin.email}
                </TableCell>
                <TableCell textAlignment="text-right">
                  {Dayjs.formatMoney(purchase.amount)}
                </TableCell>
                <TableCell textAlignment="text-right">
                  {Dayjs.formatMoney(purchase.commission)}
                </TableCell>
                <TableCell textAlignment="text-right">
                  {Dayjs.formatMoney(purchase.amount - purchase.commission)}
                </TableCell>
                <TableCell>
                  <Button
                    color="positive"
                    outline
                    disabled={purchase.status === "VALID"}
                    loading={validatePurchaseMutation.isLoading}
                    onClick={() =>
                      validatePurchaseMutation.mutate({ id: purchase.id })
                    }
                  >
                    Validar pago
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </Card>
  );
};
