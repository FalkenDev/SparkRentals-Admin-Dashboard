import { AiFillPieChart, AiOutlineUser } from "react-icons/ai";
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
    title: "Settings",
    icon: <FiSettings />,
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
    data: "",
  },
  {
    label: "Total In Use",
    data: "",
  },
  {
    label: "Total Charging",
    data: "",
  },
  {
    label: "Total Maintence",
    data: "",
  },
];

export const cityZoneOverview = [
  {
    label: "Total Zones",
    data: "",
  },
  {
    label: "Total Parking Zones",
    data: "",
  },
  {
    label: "Total No Parking Zones",
    data: "",
  },
  {
    label: "Total Bonus Parking Zones",
    data: "",
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
];

export const dashboard = [
  {
    title: "Scooters",
    icon: <Scooter />,
    color: "#5f78ff",
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
    sub: [
      {
        title: "Total Users",
        icon: "",
      },
      {
        title: "Active Users",
        icon: "",
      },
    ],
  },
  {
    title: "Cities",
    icon: <Areas />,
    color: "#de42bc",
    sub: [
      {
        title: "Total Areas",
        icon: "",
      },
      {
        title: "Active Parking Zones",
        icon: "",
      },
      {
        title: "Total Bonus Parking Zones",
        icon: "",
      },
      {
        title: "Total No Parking Zones",
        icon: "",
      },
    ],
  },
];
