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
  const { data, isLoading } = trpc.purchase.getUserSales.useQuery();

  const dayjs = Dayjs.getInstance().dayjs;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <Text.H1>Mis ventas</Text.H1>
      </div>

      {isLoading && <p>Cargando...</p>}

      {data && (
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Producto</TableHeaderCell>
              <TableHeaderCell>Fecha</TableHeaderCell>
              <TableHeaderCell>Valor</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.result.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.name}</TableCell>
                <TableCell>{sale.email}</TableCell>
                <TableCell>{sale.product.name}</TableCell>
                <TableCell>
                  {dayjs(sale.updatedAt).format("dddd,DD MMM YYYY")}
                </TableCell>
                <TableCell>
                  {Dayjs.getInstance().formatMoney(sale.product.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
