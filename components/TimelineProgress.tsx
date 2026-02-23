"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function TimelineProgress({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end end"],
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] h-full bg-neutral-800 -translate-x-1/2 hidden md:block">
            <motion.div
                style={{ height }}
                className="w-full bg-neon-lime shadow-[0_0_10px_#DFFF00]"
            />
        </div>
    );
}
