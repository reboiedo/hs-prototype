import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryTitle } from "../CategoryTitle/CategoryTitle";
import { MobileSubItems } from "../SubItems/MobileSubItems";
import { SecondaryActions } from "../SecondaryActions/SecondaryActions";
import { ITEM_ANIMATION, TRANSITION } from "../../constants/animations";
import type { LayoutProps } from "../../types/navigation";
import "./Layout.css";

export const MobileLayout = ({
  categories,
  openCategories,
  toggleCategory,
}: LayoutProps) => (
  <div className="navigation-content">
    {categories.map((category, index) => (
      <motion.div
        key={category.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...TRANSITION, delay: index * 0.1 }}
      >
        <CategoryTitle
          category={category}
          isOpen={openCategories.has(category.id)}
          isMobile={true}
          onToggle={(id: number) => toggleCategory(id, true)}
        />
        <AnimatePresence>
          {openCategories.has(category.id) && (
            <MobileSubItems
              items={category.subItems}
              isOpen={openCategories.has(category.id)}
            />
          )}
        </AnimatePresence>
      </motion.div>
    ))}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...TRANSITION, delay: categories.length * 0.1 }}
    >
      <SecondaryActions />
    </motion.div>
  </div>
);
