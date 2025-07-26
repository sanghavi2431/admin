import { AdaptableCard } from "@/components/shared";
import SubscriptionTools from "./components/subscriptionTools";
import SubscriptionTable from "./components/subscriptionList";
import { injectReducer } from "@/store";
import { GiMoneyStack } from 'react-icons/gi'
import reducer from "./store";
injectReducer('subscriptionList', reducer)


function WoloosList() {
  return (
    <AdaptableCard className="h-full" bodyClass="h-full">
      <div className="md:flex items-center justify-between mb-6">
        <div className="flex items-center mb-4">
          <GiMoneyStack size={"30"} />
          <h3 className="ml-5">Subscription</h3>
        </div>
          <SubscriptionTools />
      </div>
      <SubscriptionTable />
    </AdaptableCard>
  );
}
export default WoloosList;