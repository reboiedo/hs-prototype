import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "./context/NavigationContext";
import { navigationData } from "./constants/navigationData";
import { MobileLayout } from "./components/Layout/MobileLayout";
import { DesktopLayout } from "./components/Layout/DesktopLayout";
import { NAVIGATION_VARIANTS, TRANSITION } from "./constants/animations";
import type { NavigationMenuProps } from "./types/navigation";
import "./Navigation.css";

export const NavigationMenu = ({ isOpen, isMobile }: NavigationMenuProps) => {
  const { openCategories, isInitialOpen, toggleCategory } = useNavigation();

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="navigation-menu"
          variants={NAVIGATION_VARIANTS}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={TRANSITION}
        >
          {isMobile ? (
            <MobileLayout
              categories={navigationData}
              openCategories={openCategories}
              toggleCategory={toggleCategory}
              isInitialOpen={isInitialOpen}
            />
          ) : (
            <DesktopLayout
              categories={navigationData}
              openCategories={openCategories}
              toggleCategory={toggleCategory}
              isInitialOpen={isInitialOpen}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationMenu;
