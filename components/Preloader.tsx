"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time or wait for assets
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // 2 seconds "Fake" load

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait" onExitComplete={onComplete}>
            {isLoading && (
                <motion.div
                    exit={{ y: "-100%" }}
                    transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                    className="fixed inset-0 z-[9999] bg-deep-black flex items-center justify-center"
                >
                    <div className="flex flex-col items-center">
                        {/* Pulsing Loader / Counter could go here */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-cream text-6xl md:text-9xl font-playfair font-bold"
                        >
                            0 - 100
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
