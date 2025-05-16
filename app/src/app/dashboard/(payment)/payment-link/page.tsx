"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      staggerChildren: 0.3, // Stagger the appearance of child elements
    },
  },
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const buttonVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

const PaymentLinkPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex flex-col items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-6"
      >
        <motion.div variants={textVariants}>
          <h1
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl font-extrabold",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-blue-400 to-purple-400",
              "drop-shadow-lg"
            )}
          >
            Coming Soon
          </h1>
        </motion.div>

        <motion.p
          variants={textVariants}
          className={cn(
            "text-lg sm:text-xl md:text-2xl",
            "text-gray-300 max-w-2xl mx-auto",
            "leading-relaxed"
          )}
        >
          We're working hard to bring you an amazing experience. Get ready for
          something special! Sign up to be notified when we launch.
        </motion.p>

        <motion.div variants={buttonVariants}>
          <Button
            size="lg"
            className={cn(
              "bg-gradient-to-r from-purple-500 to-blue-500",
              "text-white font-semibold px-8 py-3 rounded-full",
              "hover:from-purple-600 hover:to-blue-600",
              "transition-all duration-300",
              "shadow-lg hover:shadow-xl",
              "focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75",
              "text-lg sm:text-xl"
            )}
          >
            Notify Me
          </Button>
        </motion.div>
        <motion.div variants={textVariants}>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Nestsite. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentLinkPage;
