import styles from "./Offer.module.css";
import forestImg from "../../assets/img/forest.jpg";
import Section from "../Section/Section";
import OfferListCard from "../OfferListCard/OfferListCard";
import {
  FaListCheck,
  FaMapLocationDot,
  FaMagnifyingGlassChart,
} from "react-icons/fa6";

const Offer = () => {
  return (
    <Section>
      <h2>What We Offer</h2>
      <p>
        Discover the comprehensive suite of features designed to make every step
        of your journey seamless and enjoyable.
      </p>
      <div>
        <img src={forestImg} />
        <q className={styles.quote}>
          "The journey of a thousand miles begins with a single step."
        </q>
      </div>
      <OfferListCard
        title="Create Packing Lists"
        description="Smart, weather-aware checklists ensure you never leave essentials behind. Customizable for every adventure type."
        Icon={FaListCheck}
      />
      <OfferListCard
        title="Popular and Recommended Routes"
        description="Access verified paths loved by the community. From scenic drives to hidden city walks, find the best way forward."
        Icon={FaMapLocationDot}
      />
      <OfferListCard
        title="Personal Statistics"
        description="Track your milestones. Visualize countries visited, distance traveled, and memories collected in one dashboard."
        Icon={FaMagnifyingGlassChart}
      />
    </Section>
  );
};

export default Offer;
