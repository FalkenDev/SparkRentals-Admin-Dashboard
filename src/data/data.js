import {
  AiFillPieChart,
  AiOutlineUser,
  AiFillCreditCard,
} from "react-icons/ai";
import { BsFillPinMapFill } from "react-icons/bs";
import { FaCity, FaUserFriends } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { TbScooter } from "react-icons/tb";
import { ReactComponent as Scooter } from "../assets/icons/Scooter.svg";
import { ReactComponent as Users } from "../assets/icons/Users.svg";
import { ReactComponent as Areas } from "../assets/icons/Areas.svg";

export const links = [
  {
    title: "dashboard",
    icon: <AiFillPieChart />,
  },
  {
    title: "map",
    icon: <BsFillPinMapFill />,
  },
  {
    title: "cities",
    icon: <FaCity />,
  },
  {
    title: "scooters",
    icon: <TbScooter />,
  },
  {
    title: "customers",
    icon: <FaUserFriends />,
  },
  {
    title: "prepaid",
    icon: <AiFillCreditCard />,
  },
  {
    title: "Settings",
    icon: <FiSettings />,
  },
];

export const customerEdit = [
  {
    label: "First Name",
    data: "firstName",
    type: "text",
  },
  {
    label: "Last Name",
    data: "lastName",
    type: "text",
  },
  {
    label: "Phone Number",
    data: "phoneNumber",
    type: "text",
  },
  {
    label: "Email",
    data: "email",
    type: "text",
  },
  {
    label: "Balance (SEK)",
    data: "balance",
    type: "number",
  },
];

export const prepaidEdit = [
  {
    label: "Code",
    data: "code",
    type: "text",
  },
  {
    label: "Uses",
    data: "totalUses",
    type: "number",
  },
  {
    label: "Amount (SEK)",
    data: "amount",
    type: "number",
  },
];

export const scooterOverview = [
  {
    label: "Status",
    data: "status",
  },
  {
    label: "City",
    data: "owner",
  },
  {
    label: "Battery",
    data: "battery",
  },
  {
    label: "Speed",
    data: "speed",
  },
  {
    label: "Latitude",
    data: ["coordinates", "latitude"],
  },
  {
    label: "Longitude",
    data: ["coordinates", "longitude"],
  },
];

export const cityScooterOverview = [
  {
    label: "Total Scooters",
    data: "totalScooters",
  },
  {
    label: "Total Available",
    data: "totalAvailable",
  },
  {
    label: "Total In Use",
    data: "totalInUse",
  },
  {
    label: "Total Charging",
    data: "totalUnavailable",
  },
  {
    label: "Total Maintence",
    data: "totalMaintenance",
  },
  {
    label: "Total Off",
    data: "totalOff",
  },
];

export const cityZoneOverview = [
  {
    label: "Total Zones",
    data: "total",
  },
  {
    label: "Parking Zones",
    data: "parkingZone",
  },
  {
    label: "No Parking Zones",
    data: "noParkingZone",
  },
  {
    label: "Bonus Parking Zones",
    data: "bonusParkingZone",
  },
  {
    label: "Charging Zones",
    data: "chargingZone",
  },
];

export const scooterform = [
  {
    title: "City",
    name: "owner",
    type: "custom",
    placeholder: "Enter owner city",
  },
  {
    title: "Status",
    name: "status",
    type: "option",
    placeholder: "Enter Current Status",
  },
  {
    title: "Latitude",
    name: "latitude",
    type: "number",
    placeholder: "Enter current Latitude",
  },
  {
    title: "Longitude",
    name: "longitude",
    type: "number",
    placeholder: "Enter current Longitude",
  },
  {
    title: "battery",
    name: "battery",
    type: "number",
    placeholder: "Enter current battery",
  },
];

export const cityform = [
  {
    title: "City",
    name: "name",
    type: "text",
    placeholder: "Enter city name",
  },
  {
    title: "Fixed Rate",
    name: "fixedRate",
    type: "number",
    placeholder: "Enter Fixed Rate",
  },
  {
    title: "Time Rate",
    name: "timeRate",
    type: "number",
    placeholder: "Enter Fixed Rate",
  },
  {
    title: "Bonus Zone Rate",
    name: "bonusParkingZoneRate",
    type: "number",
    placeholder: "Enter Bonus Zone Rate",
  },
  {
    title: "Parking Zone Rate",
    name: "parkingZoneRate",
    type: "number",
    placeholder: "Enter Parking Zone Rate",
  },
  {
    title: "No Parking Zone Rate",
    name: "noParkingZoneRate",
    type: "number",
    placeholder: "Enter No Parking Zone Rate",
  },
  {
    title: "Charging Zone Rate",
    name: "chargingZoneRate",
    type: "number",
    placeholder: "Enter Charging Zone Rate",
  },
  {
    title: "Move to valid parking discount",
    name: "noParkingToValidParking",
    type: "number",
    placeholder: "Enter Discount",
  },
];

export const adminform = [
  {
    title: "First Name",
    name: "firstName",
    type: "text",
    placeholder: "Enter First Name",
  },
  {
    title: "Last Name",
    name: "lastName",
    type: "text",
    placeholder: "Enter Last Name",
  },
  {
    title: "Email",
    name: "email",
    type: "text",
    placeholder: "Enter Email",
  },
  {
    title: "Password",
    name: "password",
    type: "text",
    placeholder: "Enter Password",
  },
];

export const dashboard = [
  {
    title: "Scooters",
    icon: <Scooter />,
    color: "#5f78ff",
    dataName: "totalScooters",
    sub: [
      {
        title: "Total Scooters",
        icon: "",
        dataName: "totalScooters",
      },
      {
        title: "Total Live Scooters",
        icon: "",
        dataName: "liveScooters",
      },
      {
        title: "Total Scooters Charging",
        icon: "",
        dataName: "chargingScooters",
      },
      {
        title: "Total Scooters Maintence",
        icon: "",
        dataName: "maintenceScooters",
      },
    ],
  },
  {
    title: "Users",
    icon: <AiOutlineUser />,
    color: "#ff731d",
    dataName: "totalUsers",
    sub: [
      {
        title: "Total Users",
        icon: "",
        dataName: "totalUsers",
      },
      {
        title: "Active Users",
        icon: "",
        dataName: "activeUsers",
      },
    ],
  },
  {
    title: "Cities",
    icon: <Areas />,
    color: "#de42bc",
    dataName: "totalAreas",
    sub: [
      {
        title: "Total Cities",
        icon: "",
        dataName: "totalAreas",
      },
      {
        title: "Active Parking Zones",
        icon: "",
        dataName: "totalParkingZones",
      },
      {
        title: "Total Bonus Parking Zones",
        icon: "",
        dataName: "totalBonus",
      },
      {
        title: "Total No Parking Zones",
        icon: "",
        dataName: "totalNoParking",
      },
    ],
  },
];
