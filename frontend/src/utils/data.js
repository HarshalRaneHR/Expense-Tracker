import { IoMdPerson } from "react-icons/io";
import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  { id: "01", label: "Dashboard", icon: LuLayoutDashboard, path: "/dashboard" },
  { id: "02", label: "Income", icon: LuWalletMinimal, path: "/income" },
  { id: "03", label: "Expense", icon: LuHandCoins, path: "/expense" },
  { id: "04", label: "Profile", icon: IoMdPerson, path: "/profile" },
  { id: "04", label: "Logout", icon: LuLogOut, path: "/logout" },
];
