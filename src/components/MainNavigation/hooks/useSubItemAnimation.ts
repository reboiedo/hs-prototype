import { useMemo } from "react";
import { TRANSITION } from "../constants/animations";

export const useSubItemAnimation = (
  isInitialOpen: boolean,
  index: number,
  isMobile: boolean
) => {
  const animation = useMemo(
    () => ({
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: {
        ...TRANSITION,
        delay: isMobile ? 0 : isInitialOpen ? 0.6 + index * 0.1 : index * 0.1,
      },
    }),
    [isInitialOpen, index, isMobile]
  );

  return { animation };
};
