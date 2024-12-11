import { useMemo } from "react";
import { TRANSITION } from "../constants/animations";

export const useNavigationAnimation = (
  isInitialOpen: boolean,
  index: number,
  isMobile: boolean
) => {
  const animation = useMemo(
    () => ({
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: {
        ...TRANSITION,
        delay: !isMobile ? index * 0.1 : 0,
      },
    }),
    [isInitialOpen, index, isMobile]
  );

  return { animation };
};
