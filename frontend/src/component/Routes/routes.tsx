import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import DescriptionIcon from "@mui/icons-material/Description";

const routes = [
  { path: "/", name: "Home", icon: <DashboardIcon /> },
  { path: "/orders", name: "Attendence", icon: <ShoppingCartIcon /> },
  {
    path: "/reports",
    name: "Referral",
    icon: <BarChartIcon />,
    children: [
      { path: "/sales", name: "Sales", icon: <DescriptionIcon /> },
      { path: "/traffic", name: "Traffic", icon: <DescriptionIcon /> },
    ],
  },
  { path: "/integrations", name: "Integrations", icon: <LayersIcon /> },
];

export default routes;
