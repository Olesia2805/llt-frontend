import { Link } from "react-router-dom";
import { PiMapTrifoldBold } from "react-icons/pi";

const Logo = () => {
  return (
    <Link to="/" aria-label="LiteLifeTrip home">
      <PiMapTrifoldBold />
      <span>LiteLifeTrip</span>
    </Link>
  );
};

export default Logo;
