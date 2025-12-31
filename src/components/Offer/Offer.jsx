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
      <figure>
        <img src={forestImg} alt="forest" />
        <figcaption>
          <q className={styles.quote}>
            The journey of a thousand miles begins with a single step.
          </q>
        </figcaption>
      </figure>
      <ul>
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
      </ul>
    </Section>
  );
};

export default Offer;
