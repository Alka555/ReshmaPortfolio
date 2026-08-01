// "use client";

// import { motion, useReducedMotion } from "framer-motion";
// import { ReactNode } from "react";

// interface PageTransitionProps {
//   children: ReactNode;
//   className?: string;
// }

// export function PageTransition({ children, className = "" }: PageTransitionProps) {
//   const shouldReduceMotion = useReducedMotion();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
//       transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }
"use client";

import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  return <div className={className}>{children}</div>;
}