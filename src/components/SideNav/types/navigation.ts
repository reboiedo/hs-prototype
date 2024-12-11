export interface NavigationItem {
  id: number;
  title: string;
  subItems: string[];
}

export interface NavigationProps {
  showBanner?: boolean;
  isOpen?: boolean;
  isMobile?: boolean;
}

export interface CategoryTitleProps {
  category: NavigationItem;
  isOpen: boolean;
  isMobile: boolean;
  onToggle: (id: number, isMobile: boolean) => void;
}

export interface SubItemProps {
  items: string[];
  isOpen: boolean;
  isInitialOpen?: boolean;
}

export interface LayoutProps {
  categories: NavigationItem[];
  openCategories: Set<number>;
  toggleCategory: (id: number, isMobile: boolean) => void;
  isInitialOpen?: boolean;
}

export interface NavigationMenuProps {
  isOpen: boolean;
  isMobile: boolean;
}
