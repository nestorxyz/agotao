import { Text } from "@/shared/components";
import { CreateCompanyButton } from "./CreateCompanyButton";

export const MyCompanies: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <Text.H1>Mis negocios</Text.H1>
        <CreateCompanyButton />
      </div>
      <section></section>
    </div>
  );
};
