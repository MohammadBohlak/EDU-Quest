export const scrollAnimation = {
  initial: {
    opacity: 0,
    y: 100,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
  viewport: {
    once: true,
    amount: 0.5,
  },
};
export const scrollLeftAnimation = {
  whileInView: { x: 0 },
  initial: { x: "-100%" },
  transition: { duration: 1 },
  viewport: {
    once: true,
    //   amount: 0.5,
  },
};
export const scrollRightAnimation = {
  whileInView: { x: 0 },
  initial: { x: "100%" },
  transition: { duration: 1 },
  viewport: {
    once: true,
    //   amount: 0.5,
  },
};
