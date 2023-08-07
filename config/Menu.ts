import dashboard from "@/assets/dashboard.svg";
import certification from "@/assets/certification.svg";
import newcertification from "@/assets/newcertification.svg";
import config from "@/assets/config.svg";
import { NavMenu } from "@/types";
import { DashboardOutlined } from "@ant-design/icons";

export const navConfig: NavMenu = {
  NavMenu: [
    {
      title: "Dashboard",
      href: "#",
      disabled: false,
      icon: dashboard,
    },
    {
      title: "Certificações",
      href: "#",
      disabled: false,
      icon: certification,
    },
    {
      title: "Nova Certificação",
      href: "#",
      disabled: false,
      icon: newcertification,
    },
    {
      title: "Configurações",
      href: "#",
      disabled: true,
      icon: config,
    },
  ],
};
