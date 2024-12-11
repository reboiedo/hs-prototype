export const NAVIGATION_VARIANTS = {
  hidden: {
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
  },
  visible: {
    clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  exit: {
    clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0% 0%)",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const ITEM_ANIMATION = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const TRANSITION = {
  duration: 0.3,
  ease: "easeInOut",
};
