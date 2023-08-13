import certification from "@/assets/certification.svg";
import config from "@/assets/config.svg";
import dashboard from "@/assets/dashboard.svg";
import { NavMenu } from "@/types";

export const navConfig: NavMenu = {
  NavMenu: [
    {
      title: "Dashboard",
      href: "/home",
      disabled: false,
      icon: dashboard,
    },
    {
      title: "Certificações",
      href: "/certification",
      disabled: false,
      icon: certification,
    },
    {
      title: "Configurações",
      href: "#",
      disabled: true,
      icon: config,
    },
  ],
};
