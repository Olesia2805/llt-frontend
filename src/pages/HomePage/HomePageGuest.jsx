import HeroGuest from "../../components/Hero/HeroGuest";
import ChooseReasons from "../../components/ChooseReasons/ChooseReasons";
import Offer from "../../components/Offer/Offer";
import PricePlans from "../../components/PricePlans/PricePlans";
import Testimonials from "../../components/Testimonials/Testimonials";

const HomePageGuest = () => {
  return (
    <>
      <HeroGuest />
      <ChooseReasons />
      <Offer />
      <PricePlans />
      <Testimonials />
    </>
  );
};

export default HomePageGuest;
