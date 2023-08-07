export interface NavItem {
    title: string;
    href: string;
    icon?: any;
    disabled?: boolean;
}

export interface NavMenu {
    NavMenu: NavItem[];
}
