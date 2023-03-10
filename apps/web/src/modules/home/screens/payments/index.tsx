import Image from "next/image";
import { useState } from "react";
import { trpc } from "@/utils/trpc";
import { Dayjs } from "@agotao/utils";

import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
} from "@tremor/react";
import { Text, Modal } from "@/shared/components";
import ItemCard from "./ItemCard";
import TotalCard from "./TotalCard";

interface PaymentSummaryProps {
  amount: number;
  order_items: {
    id: string;
    quantity: number;
    product: {
      name: string;
      price: number;
      image: string;
    };
  }[];
}

interface PaymentProps {
  company_id: string;
}

const Payments: React.FC<PaymentProps> = (props) => {
  const { company_id } = props;

  const [showProductsModal, setShowProductsModal] = useState(false);
  const [paymentSummary, setPaymentSummary] = useState<PaymentSummaryProps>();

  const { data, isInitialLoading } =
    trpc.web.dashboard.payments.getPageData.useQuery({
      company_id,
    });

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-20">
        <Text.H3 className="text-base">Ventas</Text.H3>

        <div className="w-full">
          <div className="flex items-center justify-between">
            <Text.H3>Ventas</Text.H3>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <Badge text={`Número: ${data?.length || 0}`} color="gray" />
              <Badge
                text={`Monto total: ${Dayjs.formatMoney(
                  data?.reduce((acc, cur) => acc + cur.amount, 0) || 0,
                )}`}
                color="sky"
              />
            </div>
          </div>

          {isInitialLoading && <div>Table skeleton here</div>}

          {data && (
            <Table marginTop="mt-6">
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Monto</TableHeaderCell>
                  <TableHeaderCell>{}</TableHeaderCell>
                  <TableHeaderCell>Productos</TableHeaderCell>
                  <TableHeaderCell>Cliente</TableHeaderCell>
                  <TableHeaderCell>Fecha</TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{Dayjs.formatMoney(payment.amount)}</TableCell>
                    <TableCell>PEN</TableCell>
                    <TableCell>
                      <div
                        className="flex cursor-pointer items-center gap-2"
                        onClick={() => {
                          setShowProductsModal(true);
                          setPaymentSummary({
                            amount: payment.amount,
                            order_items: payment.checkout_session.order_items,
                          });
                        }}
                      >
                        <img
                          src={
                            payment.checkout_session.order_items[0]?.product
                              .image || ""
                          }
                          alt={
                            payment.checkout_session.order_items[0]?.product
                              .name || ""
                          }
                          width={100}
                          height={100}
                          className="max-h-[40px] min-h-[40px] min-w-[40px] max-w-[40px] rounded object-cover"
                        />
                        <span className="text-sm leading-4 text-gray-800">
                          {payment.checkout_session.order_items.reduce(
                            (acc, item) => {
                              return acc + item.quantity;
                            },
                            0,
                          )}{" "}
                          items
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p>
                        {payment.name}({payment.email})
                      </p>
                    </TableCell>
                    <TableCell>
                      {Dayjs.dayjs.tz(payment.updatedAt).format("MMMM DD")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      <Modal showModal={showProductsModal} setShowModal={setShowProductsModal}>
        {paymentSummary && (
          <div className="bg-white p-4">
            <section className="mx-auto max-w-md space-y-4 lg:w-96">
              {paymentSummary.order_items.map((item) => (
                <ItemCard
                  key={item.id}
                  name={item.product.name}
                  image={item.product.image}
                  quantity={item.quantity}
                  price={Dayjs.formatMoney(item.product.price)}
                  total={Dayjs.formatMoney(item.quantity * item.product.price)}
                />
              ))}
              <TotalCard total={Dayjs.formatMoney(paymentSummary.amount)} />
            </section>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Payments;
