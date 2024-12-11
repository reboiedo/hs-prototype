import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import type { CategoryTitleProps } from "../../types/navigation";
import "./CategoryTitle.css";

export const CategoryTitle = ({
  category,
  isOpen,
  isMobile,
  onToggle,
}: CategoryTitleProps) => (
  <motion.button
    className={`category-title ${isOpen ? "active" : ""}`}
    onClick={() => onToggle(category.id, isMobile)}
    whileHover={{ x: 10 }}
  >
    <span className="order">{String(category.id).padStart(2, "0")}</span>
    <span className="title">{category.title}</span>
    <motion.span
      className="icon-wrapper"
      animate={{ rotate: isMobile && isOpen ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <Icon
        icon={isMobile ? "mdi:chevron-down" : "mdi:arrow-right"}
        className={`category-icon ${isOpen ? "active" : ""}`}
      />
    </motion.span>
  </motion.button>
);
