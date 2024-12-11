import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryTitle } from "../CategoryTitle/CategoryTitle";
import { DesktopSubItems } from "../SubItems/DesktopSubItems";
import { SecondaryActions } from "../SecondaryActions/SecondaryActions";
import { useNavigationAnimation } from "../../hooks/useNavigationAnimation";
import type { LayoutProps } from "../../types/navigation";
import "./Layout.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

export const DesktopLayout = ({
  categories,
  openCategories,
  toggleCategory,
  isInitialOpen = false,
}: LayoutProps) => (
  <div className="navigation-content">
    <div className="categories-wrapper">
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          className="category"
          variants={itemVariants}
        >
          <CategoryTitle
            category={category}
            isOpen={openCategories.has(category.id)}
            isMobile={false}
            onToggle={(id: number) => toggleCategory(id, false)}
          />
        </motion.div>
      ))}
      <motion.div variants={itemVariants}>
        <SecondaryActions />
      </motion.div>
    </div>
    <div className="subitems-wrapper">
      <AnimatePresence mode="wait">
        {Array.from(openCategories).map((categoryId) => {
          const category = categories.find((c) => c.id === categoryId);
          return (
            category && (
              <DesktopSubItems
                key={categoryId}
                items={category.subItems}
                isOpen={true}
                isInitialOpen={isInitialOpen}
              />
            )
          );
        })}
      </AnimatePresence>
    </div>
  </div>
);
