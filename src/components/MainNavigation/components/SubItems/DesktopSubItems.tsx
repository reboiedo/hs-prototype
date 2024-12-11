import React from "react";
import { motion } from "framer-motion";
import { SubItemLink } from "./SubItemLink";
import type { SubItemProps } from "../../types/navigation";
import "./SubItems.css";

export const DesktopSubItems = ({
  items,
  isOpen,
  isInitialOpen = false,
}: SubItemProps) => (
  <motion.ul
    className="sub-items"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {items.map((item, index) => (
      <SubItemLink
        key={index}
        item={item}
        index={index}
        isInitialOpen={isInitialOpen}
        isMobile={false}
      />
    ))}
  </motion.ul>
);
