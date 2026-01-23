import {
  MdHiking,
  MdFamilyRestroom,
  MdFastfood,
  MdEmojiTransportation,
} from "react-icons/md";
import { FaCar, FaWalking } from "react-icons/fa";
import { FaPersonWalkingLuggage, FaBuildingColumns } from "react-icons/fa6";
import { PiPark } from "react-icons/pi";
import { IoBicycle } from "react-icons/io5";

export const DNA_ICONS = {
  hiking: MdHiking,
  solo: FaPersonWalkingLuggage,
  familyTrips: MdFamilyRestroom,
  history: FaBuildingColumns,
  parks: PiPark,
  streetFood: MdFastfood,
};

export const TRANSPORT_ICONS = {
  car: FaCar,
  walking: FaWalking,
  publicTransport: MdEmojiTransportation,
  bicycle: IoBicycle,
};
