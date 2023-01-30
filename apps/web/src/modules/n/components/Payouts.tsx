import { useState } from "react";
import { trpc } from "@/utils/trpc";
import {
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
} from "@tremor/react";
import toast from "react-hot-toast";

import { StatusBadge, Text, Button, Modal } from "@/shared/components";
import { Dayjs } from "@agotao/utils";

interface Payout {
  id: string;
  status: "UNPAID" | "VALIDATING" | "PAID";
  createdAt: Date;
  updatedAt: Date;
  company: {
    name: string;
    admin: {
      email: string;
      name: string;
    };
  };
  items: {
    id: string;
    name: string;
    email: string;
    amount: number;
    fee: number;
    type: string;
    keyInfo: string;
  }[];
}

export const Payouts: React.FC = () => {
  const [payout, setPayout] = useState<Payout | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, refetch } = trpc.admin.getPayouts.useQuery();

  const validatePayoutMutation = trpc.admin.validatePayouts.useMutation({
    onSuccess: () => {
      toast.success("Payout validated");
      refetch();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (!data && !error) return <div>Loading...</div>;

  if (!data) return <div>No data</div>;

  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.data.map((payout) => (
          <article
            key={payout.id}
            className="grid grid-cols-2 rounded-lg border border-primary-50 p-4 shadow-sm"
          >
            <h4>{payout.company.name}</h4>
            <StatusBadge status={payout.status} />
            <Text.Subtitle>{payout.company.admin.name}</Text.Subtitle>
            <Text.Subtitle>
              {Dayjs.dayjs.tz(payout.createdAt).format("DD/MM/YYYY HH:mm")}
            </Text.Subtitle>
            <Button
              onClick={() => {
                setPayout(payout);
                setIsModalOpen(true);
              }}
            >
              See more
            </Button>
          </article>
        ))}
      </section>

      <Modal
        showModal={isModalOpen}
        setShowModal={setIsModalOpen}
        disableClose={validatePayoutMutation.isLoading}
      >
        {payout && (
          <div className="inline-block w-full transform overflow-hidden bg-white px-4 py-6 align-middle transition-all sm:max-w-xl sm:rounded-2xl sm:border sm:border-gray-200 sm:py-10 sm:px-6">
            <div className="flex gap-2">
              <Text.H2>{payout.company.name}</Text.H2>
              <Text.Subtitle>
                {Dayjs.dayjs.tz(payout.createdAt).format("DD/MM/YYYY HH:mm")}
              </Text.Subtitle>
            </div>
            <StatusBadge status={payout.status} />
            <Card>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell> Name </TableHeaderCell>
                    <TableHeaderCell textAlignment="text-right">
                      Email
                    </TableHeaderCell>
                    <TableHeaderCell textAlignment="text-right">
                      Medio
                    </TableHeaderCell>
                    <TableHeaderCell textAlignment="text-right">
                      Info
                    </TableHeaderCell>
                    <TableHeaderCell textAlignment="text-right">
                      Amount
                    </TableHeaderCell>
                    <TableHeaderCell textAlignment="text-right">
                      Fee
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {payout.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell textAlignment="text-right">
                        {item.email}
                      </TableCell>
                      <TableCell textAlignment="text-right">
                        {item.type}
                      </TableCell>
                      <TableCell textAlignment="text-right">
                        {item.keyInfo}
                      </TableCell>
                      <TableCell textAlignment="text-right">
                        {item.amount}
                      </TableCell>
                      <TableCell textAlignment="text-right">
                        {item.fee}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            <Button
              filled
              color="black"
              className="w-full"
              disabled={payout.status !== "VALIDATING"}
              loading={validatePayoutMutation.isLoading}
              onClick={() => {
                validatePayoutMutation.mutate({ id: payout.id });
              }}
            >
              Pagos realizados
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};
