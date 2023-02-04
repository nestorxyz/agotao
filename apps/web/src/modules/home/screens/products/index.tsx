import { trpc } from "@/utils/trpc";
import Image from "next/image";
import toast from "react-hot-toast";

import { Dayjs, copyToClipboard } from "@agotao/utils";

import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  Badge,
} from "@tremor/react";
import { Text, Button } from "@/shared/components";
import CreateProductButton from "./CreateProductButton";

interface ProductsProps {
  company_id: string;
}

const Products: React.FC<ProductsProps> = (props) => {
  const { company_id } = props;

  const { data, refetch, isInitialLoading } =
    trpc.web.dashboard.products.getPageData.useQuery({
      company_id,
    });

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-20">
      <Text.H3 className="text-base">Productos</Text.H3>

      <div className="w-full">
        <div className="flex items-center justify-between">
          <Text.H3>Productos</Text.H3>
          <div className="flex items-center gap-2">
            <Badge
              text={`${data?.reduce((acc, cur) => acc + 1, 0)}`}
              color="gray"
            />
            <CreateProductButton companyId={company_id} onCreated={refetch} />
          </div>
        </div>

        {isInitialLoading && <div>Table skeleton here</div>}

        {data && (
          <Table marginTop="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Nombre</TableHeaderCell>
                <TableHeaderCell>ID</TableHeaderCell>
                <TableHeaderCell>Creado</TableHeaderCell>
                <TableHeaderCell>Actualizado</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex gap-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="max-h-[40px] min-h-[40px] min-w-[40px] max-w-[40px] rounded-sm object-cover"
                      />
                      <div>
                        <p className="w-full">{product.name}</p>
                        <p>{Dayjs.formatMoney(product.price)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        copyToClipboard({
                          text: product.id,
                          onSuccess: () => {
                            toast.success("Copiado al portapapeles");
                          },
                        });
                      }}
                      className="p-0 font-light text-gray-500 hover:text-gray-700"
                    >
                      {product.id}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {Dayjs.dayjs.tz(product.createdAt).format("MMMM DD")}
                  </TableCell>
                  <TableCell>
                    {Dayjs.dayjs.tz(product.updatedAt).format("MMMM DD")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Products;
