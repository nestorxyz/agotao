import { useState } from "react";
import Image from "next/image";
import { Card, Metric, Text as TremorText } from "@tremor/react";
import { Banknote } from "lucide-react";

import { Dayjs } from "@agotao/utils";

import { Text, Button, Dots } from "@/shared/components";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/shared/components/DropdownMenu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/Tabs";
import Payouts from "./components/Payouts";
import AddBalanceModal from "./components/AddBalanceModal";

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
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);

  if (!selectedCompany) {
    return (
      <div className="mt-10 flex w-full justify-center">
        <Dots />
      </div>
    );
  }

  return (
    <>
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4 px-4 py-6 md:px-0 md:py-8">
        <div className="flex flex-wrap justify-between gap-2">
          <div className="flex items-center gap-2">
            <Image
              src={selectedCompany.image}
              alt={selectedCompany.name}
              width={50}
              height={50}
              className="rounded-md"
            />
            <Text.H2>{selectedCompany.name}</Text.H2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="sm:hidden">
              <Button color="black" outline className="w-12 space-x-2 p-0">
                <Banknote /> <span className="hidden sm:block">Acciones</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 w-full">
              <DropdownMenuLabel>Puedes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowAddBalanceModal(true)}>
                Agregar saldo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex w-full max-w-xs justify-start">
          <Card maxWidth="max-w-md">
            <TremorText>Balance</TremorText>
            <Metric>{Dayjs.formatMoney(selectedCompany.balance)}</Metric>
          </Card>
        </div>

        <Tabs defaultValue="payouts">
          <TabsList className="bg-white">
            <TabsTrigger value="payouts">Depósitos</TabsTrigger>
            <TabsTrigger value="developers">Desarrolladores</TabsTrigger>
          </TabsList>
          <TabsContent value="payouts" className="border-0 p-0">
            <Payouts
              company_id={selectedCompany.id}
              company_name={selectedCompany.name}
              company_image={selectedCompany.image}
            />
          </TabsContent>
          <TabsContent value="developers">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Change your password here. After saving, you&apos;ll be logged
              out.
            </p>
          </TabsContent>
        </Tabs>
      </main>

      <AddBalanceModal
        isOpen={showAddBalanceModal}
        setIsOpen={setShowAddBalanceModal}
        currentBalance={selectedCompany.balance}
      />
    </>
  );
};

export default CompanyScreen;
