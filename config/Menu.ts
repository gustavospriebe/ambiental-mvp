import certification from "@/assets/certification.svg";
import config from "@/assets/config.svg";
import dashboard from "@/assets/dashboard.svg";
import newcertification from "@/assets/newcertification.svg";
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
      title: "Nova Certificação",
      href: "/newcertification",
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
