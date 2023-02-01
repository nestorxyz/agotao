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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/Tabs";

import { Dayjs } from "@agotao/utils";

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
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 p-6 md:p-8">
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
            <DropdownMenuItem>Agregar saldo</DropdownMenuItem>
            <DropdownMenuItem>Retirar saldo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div>
        <Card>
          <TremorText>Balance</TremorText>
          <Metric>{Dayjs.formatMoney(selectedCompany.balance)}</Metric>
        </Card>
      </div>

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Make changes to your account here. Click save when you&apos;re done.
          </p>
        </TabsContent>
        <TabsContent value="password">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default CompanyScreen;
