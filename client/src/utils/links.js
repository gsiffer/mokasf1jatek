import { IoBarChartSharp } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { IoLocationSharp } from "react-icons/io5";
import { MdSportsScore } from "react-icons/md";
import { GiMechanicGarage, GiFullMotorcycleHelmet } from "react-icons/gi";
import { FaRegFileExcel } from "react-icons/fa";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
    role: "user",
  },
  {
    id: 2,
    text: "my drivers",
    path: "my-drivers",
    icon: <MdSportsScore />,
    role: "user",
  },
  {
    id: 3,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
    role: "user",
  },
  {
    id: 4,
    text: "locations",
    path: "locations",
    icon: <IoLocationSharp />,
    role: "user",
  },
  {
    id: 5,
    text: "constructors",
    path: "constructors",
    icon: <GiMechanicGarage />,
    role: "user",
  },
  {
    id: 6,
    text: "drivers",
    path: "drivers",
    icon: <GiFullMotorcycleHelmet />,
    role: "user",
  },
  {
    id: 7,
    text: "convert to excel",
    path: "excel",
    icon: <FaRegFileExcel />,
    role: "admin",
  },
];

export default links;
