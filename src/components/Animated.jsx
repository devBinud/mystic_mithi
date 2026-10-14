import { motion, useReducedMotion } from 'framer-motion';

// Standard subtle easing and duration
const defaultTransition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1.0]
};

// 1. Reusable FadeUp Component (Default Y movement + Fade)
export function FadeUp({ children, delay = 0, distance = 25, className = '', style = {} }) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : distance
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ...defaultTransition,
        delay
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// 2. Reusable FadeIn Component (Pure Opacity Fade)
export function FadeIn({ children, delay = 0, className = '', style = {} }) {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ...defaultTransition,
        delay
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// 3. Reusable FadeHorizontal Component (Fade + Left/Right movement)
export function FadeHorizontal({ children, direction = 'left', delay = 0, distance = 30, className = '', style = {} }) {
  const shouldReduceMotion = useReducedMotion();
  const xOffset = direction === 'left' ? -distance : distance;

  const variants = {
    hidden: {
      opacity: 0,
      x: shouldReduceMotion ? 0 : xOffset
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        ...defaultTransition,
        delay
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// 4. Reusable Stagger Container (Parent for Cards, Features, Grids)
export function StaggerContainer({ children, staggerDelay = 0.12, delayChildren = 0, className = '', style = {} }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// 5. Reusable Stagger Item (Child element inside StaggerContainer)
export function StaggerItem({ children, distance = 25, className = '', style = {} }) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : distance
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: defaultTransition
    }
  };

  return (
    <motion.div variants={itemVariants} className={className} style={style}>
      {children}
    </motion.div>
  );
}
