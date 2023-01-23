import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@tremor/react";

// Services
import { trpc } from "@/utils/trpc";
import { Dayjs } from "@/shared/utils/Datejs";

// Components
import { Text } from "@/shared/components";

export const MySales: React.FC = () => {
  const { data, isLoading } = trpc.web.getMySales.useQuery();

  const dayjs = Dayjs.getInstance().dayjs;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <Text.H2>Ventas</Text.H2>
      </div>

      {isLoading && <p>Cargando...</p>}

      {data && (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Productos</TableHeaderCell>
              <TableHeaderCell>Fecha</TableHeaderCell>
              <TableHeaderCell>Venta total</TableHeaderCell>
              <TableHeaderCell>Servicio</TableHeaderCell>
              <TableHeaderCell>Recibes</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.result.map((sale) => {
              return (
                <TableRow key={sale.id}>
                  <TableCell>{sale.name}</TableCell>
                  <TableCell>{sale.email}</TableCell>
                  <TableCell>
                    {sale.checkout_session.order_items.length} productos
                  </TableCell>
                  <TableCell>
                    {dayjs(sale.updatedAt).format("dddd,DD MMM YYYY")}
                  </TableCell>
                  <TableCell>
                    {Dayjs.getInstance().formatMoney(sale.amount)}
                  </TableCell>
                  <TableCell>
                    {Dayjs.getInstance().formatMoney(sale.commission)}
                  </TableCell>
                  <TableCell>
                    {Dayjs.getInstance().formatMoney(
                      sale.amount - sale.commission,
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
