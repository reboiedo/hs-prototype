import React from "react";
import { motion } from "framer-motion";
import { useSubItemAnimation } from "../../hooks/useSubItemAnimation";

interface SubItemLinkProps {
  item: string;
  index: number;
  isInitialOpen: boolean;
  isMobile: boolean;
}

export const SubItemLink = ({
  item,
  index,
  isInitialOpen,
  isMobile,
}: SubItemLinkProps) => {
  const { animation } = useSubItemAnimation(isInitialOpen, index, isMobile);

  return (
    <motion.li {...animation}>
      <motion.a href="#" whileHover={{ x: 10 }} transition={{ duration: 0.2 }}>
        {item}
      </motion.a>
    </motion.li>
  );
};
