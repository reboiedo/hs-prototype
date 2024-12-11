import React from "react";
import { motion } from "framer-motion";
import { SubItemLink } from "./SubItemLink";
import type { SubItemProps } from "../../types/navigation";
import "./SubItems.css";

export const MobileSubItems = ({ items, isOpen }: SubItemProps) => (
  <motion.ul
    className="sub-items"
    initial={{ height: 0, opacity: 0 }}
    animate={{
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2 },
      },
    }}
    exit={{
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2, delay: 0.1 },
      },
    }}
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {items.map((item, index) => (
        <SubItemLink
          key={index}
          item={item}
          index={index}
          isInitialOpen={false}
          isMobile={true}
        />
      ))}
    </motion.div>
  </motion.ul>
);
