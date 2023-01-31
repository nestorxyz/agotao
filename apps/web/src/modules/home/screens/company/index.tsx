import { useState } from "react";
import Image from "next/image";
import { Card, Metric, Text as TremorText } from "@tremor/react";
import { Banknote } from "lucide-react";

import { Text, Button } from "@/shared/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/shared/components/DropdownMenu";

interface CompanyScreenProps {
  companies: {
    id: string;
    name: string;
    image: string;
    balance: number;
  }[];

  className?: string;
}

const CompanyScreen: React.FC<CompanyScreenProps> = (props) => {
  const { companies } = props;

  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  if (!selectedCompany) {
    return <div>Something went wrong</div>;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col p-6 md:flex-row md:p-8">
      <div>
        <div className="flex gap-2">
          <Image
            src={selectedCompany.image}
            alt={selectedCompany.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <Text.H2>{selectedCompany.name}</Text.H2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button color="black" outline>
              <Banknote /> Acciones
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Puedes</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Agregar saldo</DropdownMenuItem>
            <DropdownMenuItem>Retirar saldo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <Card>
          <TremorText>Balance</TremorText>
          <Metric>{selectedCompany.balance}</Metric>
        </Card>
      </div>
    </main>
  );
};

export default CompanyScreen;
