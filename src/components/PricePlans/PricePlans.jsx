import Section from "../Section/Section";
import PricePlansCard from "../PricePlansCard/PricePlansCard";
import { PRICE_PLANS } from "../../app/plansData";

const PricePlans = () => {
  return (
    <Section>
      <h2>Plans for Every Traveler</h2>
      <p>
        Choose the perfect plan for your adventure style. Switch or cancel
        anytime.
      </p>

      <ul>
        {PRICE_PLANS.map((plan) => (
          <PricePlansCard key={plan.id} {...plan} />
        ))}
      </ul>
    </Section>
  );
};

export default PricePlans;
