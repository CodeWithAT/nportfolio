"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({
    children,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any;
}) {
    return (
        <ReactLenis root options={{ lerp: 0.05, duration: 2.5, smoothWheel: true }}>
            {children}
        </ReactLenis>
    );
}
