import { useState } from "react";
import Image from "next/image";
import { Card, Metric, Text as TremorText } from "@tremor/react";

import { Dayjs } from "@agotao/utils";

import { Text, Dots } from "@/shared/components";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/Tabs";
import Payouts from "./payouts";
import Developers from "./developers";

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
    return (
      <div className="mt-10 flex w-full justify-center">
        <Dots />
      </div>
    );
  }

  return (
    <main className="px-4 py-6 md:py-8">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-4">
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
        </div>

        <div className="flex w-full max-w-xs justify-start">
          <Card maxWidth="max-w-md">
            <TremorText>Balance</TremorText>
            <Metric>{Dayjs.formatMoney(selectedCompany.balance)}</Metric>
          </Card>
        </div>

        <Tabs defaultValue="payouts">
          <TabsList className="mb-4 w-full justify-start rounded-none border-b border-gray-100 bg-white">
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
          <TabsContent value="developers" className="border-0 p-0">
            <Developers company_id={selectedCompany.id} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default CompanyScreen;
