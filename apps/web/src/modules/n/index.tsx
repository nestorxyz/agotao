import { useState } from "react";

import { Purchases, Payouts } from "@/modules/n/components";
import { Button } from "@/shared/components";

enum NTab {
  purchases = "purchases",
  payouts = "payouts",
}

const NComponent: React.FC = () => {
  const [tab, setTab] = useState<NTab>(NTab.purchases);

  return (
    <main className="max-w-8xl my-10 mx-auto w-full px-4">
      <div className="mb-6 flex justify-center gap-2">
        <Button soft color="black" onClick={() => setTab(NTab.purchases)}>
          Switch to Purchases
        </Button>
        <Button soft color="black" onClick={() => setTab(NTab.payouts)}>
          Switch to Payouts
        </Button>
      </div>

      {tab === NTab.purchases && <Purchases />}
      {tab === NTab.payouts && <Payouts />}
    </main>
  );
};

export default NComponent;
