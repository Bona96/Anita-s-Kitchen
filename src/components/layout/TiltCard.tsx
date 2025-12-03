import React, { useRef } from 'react';
import {
    motion,
    useSpring,
    useTransform,
    // Import the necessary hook
    useMotionValue,
    MotionValue
} from 'framer-motion';

// --- Type Definitions ---
interface TiltCardProps {
    imageSrc: string;
    altText: string;
}

const TILT_RANGE = 8;

const TiltCard: React.FC<TiltCardProps> = ({ imageSrc, altText }) => {
    const ref = useRef<HTMLDivElement>(null);

    // 1. **THE FIX:** Use useMotionValue instead of useState for x and y.
    const x = useMotionValue(0.5); // Normalized X coordinate (0 to 1)
    const y = useMotionValue(0.5); // Normalized Y coordinate (0 to 1)

    // useTransform now correctly receives MotionValue inputs
    const rotateX: MotionValue<number> = useTransform(y, [0, 1], [-TILT_RANGE, TILT_RANGE]);
    const rotateY: MotionValue<number> = useTransform(x, [0, 1], [TILT_RANGE, -TILT_RANGE]);

    const springConfig = { damping: 15, stiffness: 300, mass: 1 };
    const smoothRotateX: MotionValue<number> = useSpring(rotateX, springConfig);
    const smoothRotateY: MotionValue<number> = useSpring(rotateY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const { width, height, left, top } = ref.current.getBoundingClientRect();
        const clientX = e.clientX - left;
        const clientY = e.clientY - top;

        // 2. **THE FIX:** Update the MotionValue directly using .set()
        x.set(clientX / width);
        y.set(clientY / height);
    };

    const handleMouseLeave = () => {
        // 3. **THE FIX:** Reset the MotionValue directly using .set()
        x.set(0.5);
        y.set(0.5);
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: '1000px' }}
            className="flex items-center justify-center w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800"
        >
            <motion.div
                className={`w-full h-full flex items-center justify-center`}
                style={{
                    rotateX: smoothRotateX,
                    rotateY: smoothRotateY,
                    transformStyle: 'preserve-3d'
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <img
                    src={imageSrc}
                    alt={altText}
                    style={{ transform: 'translateZ(20px)' }}
                    className="w-auto h-[400px] object-cover rounded-md shadow-lg shadow-indigo-500"
                />
            </motion.div>
        </div>
    );
};

export default TiltCard;