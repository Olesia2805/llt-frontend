import {
  MdHiking,
  MdFamilyRestroom,
  MdFastfood,
  MdEmojiTransportation,
  MdPets,
  MdRestaurant,
  MdOutlinePhotoCamera,
} from "react-icons/md";
import {
  FaPersonWalkingLuggage,
  FaBuildingColumns,
  FaTreeCity,
  FaPhotoFilm,
  FaShop,
} from "react-icons/fa6";
import { FaCar, FaWalking, FaCocktail, FaCity, FaSpa } from "react-icons/fa";
import { PiPark, PiMountainsFill } from "react-icons/pi";
import { IoBicycle, IoLogoInstagram, IoMusicalNotes } from "react-icons/io5";
import { LuShoppingBasket, LuTentTree } from "react-icons/lu";
import { GiCoffeeCup, GiPartyFlags } from "react-icons/gi";
import { BiWater } from "react-icons/bi";
import { TbTrees } from "react-icons/tb";

export const DNA_ICONS = {
  hiking: MdHiking,
  bars: FaCocktail,
  solo: FaPersonWalkingLuggage,
  familyTrips: MdFamilyRestroom,
  architecture: FaCity,
  streetFood: MdFastfood,
  petFriendly: MdPets,
  photography: MdOutlinePhotoCamera,
  history: FaBuildingColumns,
  parks: PiPark,
  shopping: LuShoppingBasket,
  nature: TbTrees,
  mountains: PiMountainsFill,
  lakes: BiWater,
  camping: LuTentTree,
  restaurants: MdRestaurant,
  markets: FaShop,
  cafes: GiCoffeeCup,
  urban: FaTreeCity,
  instagramSpots: IoLogoInstagram,
  events: GiPartyFlags,
  music: IoMusicalNotes,
  artGalleries: FaPhotoFilm,
  spa: FaSpa,
};

export const TRANSPORT_ICONS = {
  car: FaCar,
  walk: FaWalking,
  public: MdEmojiTransportation,
  bike: IoBicycle,
};
