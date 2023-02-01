import { useState } from "react";
import dayjs from "dayjs";
import { trpc } from "@/utils/trpc";

import { Dayjs } from "@agotao/utils";
import { PaymentMethodType, PaymentIntentStatus } from "@acme/db";

import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
} from "@tremor/react";
import { ArrowUpRight } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/Avatar";
import { Text, StatusBadge, Button, Modal } from "@/shared/components";

interface Payout {
  id: string;
  name: string;
  email: string;
  memo: string | null;
  amount: number;
  fee: number;
  type: keyof typeof PaymentMethodType;
  keyInfo: string;
  status: keyof typeof PaymentIntentStatus;
  createdAt: Date;
  updatedAt: Date;
}

interface PayoutsProps {
  company_id: string;
  company_name: string;
  company_image: string;
}

const Payouts: React.FC<PayoutsProps> = (props) => {
  const { company_id, company_name, company_image } = props;

  const [payout, setPayout] = useState<Payout | undefined>(undefined);
  const [showReceipt, setShowReceipt] = useState(false);

  const { data, error, isInitialLoading } =
    trpc.web.dashboard.getPayouts.useQuery({
      company_id,
    });

  if (isInitialLoading) {
    return <div>Table skeleton here</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (data) {
    return (
      <>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Text.H3>Depósitos</Text.H3>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Badge
                text={`Número: ${data.result.reduce(
                  (acc, cur) => acc + cur.items.length,
                  0,
                )}`}
                color="gray"
              />
              <Badge
                text={`Monto total: ${Dayjs.formatMoney(
                  data.result.reduce(
                    (acc, cur) =>
                      acc + cur.items.reduce((acc, cur) => acc + cur.amount, 0),
                    0,
                  ),
                )}`}
                color="sky"
              />
            </div>
          </div>
          <Text.Subtitle>
            Resumen de los depósitos realizados desde el balance de la empresa
          </Text.Subtitle>
        </div>
        <Table marginTop="mt-6">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Usuario</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Solicitado</TableHeaderCell>
              <TableHeaderCell textAlignment="text-right">
                Total
              </TableHeaderCell>
              <TableHeaderCell>Servicio</TableHeaderCell>
              <TableHeaderCell>Detalles</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.result.map((payouts) => {
              return (
                <>
                  {payouts.items.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell>
                        <p className="font-medium">{payout.name}</p>
                        <p>{payout.email}</p>
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={payouts.status}
                          className="w-fit"
                        />
                      </TableCell>
                      <TableCell>
                        <p>
                          {Dayjs.dayjs
                            .tz(payouts.createdAt)
                            .format("DD/MM/YY HH:mm a")}
                        </p>
                      </TableCell>
                      <TableCell textAlignment="text-right">
                        <p>{Dayjs.formatMoney(payout.amount)}</p>
                      </TableCell>
                      <TableCell>
                        <p>{Dayjs.formatMoney(payout.fee)}</p>
                      </TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          size="small"
                          light
                          onClick={() => {
                            setPayout({
                              ...payout,
                              status: payouts.status,
                              createdAt: payouts.createdAt,
                            });
                            setShowReceipt(true);
                          }}
                        >
                          Ver Recibo
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              );
            })}
          </TableBody>
        </Table>

        <Modal showModal={showReceipt} setShowModal={setShowReceipt}>
          {payout && (
            <div className="inline-block w-full transform space-y-4 overflow-hidden bg-white px-4 py-6 align-middle transition-all sm:max-w-md sm:rounded-2xl sm:border sm:border-gray-200 sm:py-10 sm:px-6">
              <div className="flex w-fit gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                <ArrowUpRight className="h-4 w-4" />
                Depósito
              </div>

              <div className="flex justify-between">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={company_image} />
                  <AvatarFallback>
                    {company_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="text-right">
                  <p className="mb-1 text-3xl font-semibold">
                    - {Dayjs.formatMoney(payout.amount)}
                  </p>
                  <p className="text-sm text-gray-400">Depósito en PEN a</p>
                  <p className="text-sm font-medium">{payout.name}</p>
                </div>
              </div>

              <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500">Status</p>
                  <StatusBadge status={payout.status} className="w-fit" />
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">Fecha de solicitud</p>
                  <p className="text-right font-semibold">
                    {Dayjs.dayjs
                      .tz(payout.createdAt)
                      .format("DD/MM/YY HH:mm a")}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">
                    {dayjs(payout.createdAt).isSame(payout.updatedAt)
                      ? "Llegada estimada"
                      : "Fecha de depósito"}
                  </p>
                  <p className="text-right font-semibold">
                    {Dayjs.dayjs
                      .tz(
                        dayjs(payout.createdAt).isSame(payout.updatedAt)
                          ? dayjs(payout.createdAt).add(5, "minutes")
                          : payout.updatedAt,
                      )
                      .format("DD/MM/YY HH:mm a")}
                  </p>
                </div>
              </div>

              <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between">
                  <p className="text-gray-500">Costo del servicio</p>
                  <p className="text-right font-semibold">
                    {Dayjs.formatMoney(payout.fee)}
                  </p>
                </div>
              </div>

              <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between">
                  <p className="text-gray-500">Método</p>
                  <p className="text-right font-semibold text-primary">
                    {payout.type} • PEN
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">Número de cuenta</p>
                  <p className="text-right font-semibold">{payout.keyInfo}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </>
    );
  }

  return <></>;
};

export default Payouts;
