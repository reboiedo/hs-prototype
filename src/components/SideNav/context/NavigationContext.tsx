import React, {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { NavigationItem } from "../types/navigation";
import { navigationData } from "../constants/navigationData";

interface NavigationContextType {
  openCategories: Set<number>;
  isInitialOpen: boolean;
  toggleCategory: (id: number, isMobile: boolean) => void;
}

interface NavigationProviderProps {
  children: ReactNode;
  isOpen: boolean;
  isMobile: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider = ({
  children,
  isOpen,
  isMobile,
}: NavigationProviderProps) => {
  const [openCategories, setOpenCategories] = useState<Set<number>>(new Set());
  const [isInitialOpen, setIsInitialOpen] = useState(true);

  // Set initial state based on device type
  useEffect(() => {
    if (!isMobile && isOpen) {
      // On desktop, open the first category by default
      setOpenCategories(new Set([navigationData[0].id]));
      setIsInitialOpen(true);
    } else {
      // On mobile, start with everything closed
      setOpenCategories(new Set());
      setIsInitialOpen(false);
    }
  }, [isMobile, isOpen]);

  const toggleCategory = useCallback(
    (categoryId: number, isMobile: boolean) => {
      if (isMobile) {
        setOpenCategories((prev) => {
          const next = new Set(prev);
          if (next.has(categoryId)) {
            next.delete(categoryId);
          } else {
            next.add(categoryId);
          }
          return next;
        });
      } else {
        setIsInitialOpen(false);
        setOpenCategories(new Set([categoryId]));
      }
    },
    []
  );

  return (
    <NavigationContext.Provider
      value={{ openCategories, isInitialOpen, toggleCategory }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
