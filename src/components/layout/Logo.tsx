import {motion} from 'framer-motion'
import Anita from '../../assets/media/anita-s-kitchen-logo.jpg';

// Define a constant for the size for easy modification
const LOGO_SIZE = '100px';
const FONT_SIZE = 'xl'; // Tailwind text size

const Logo = () => {

    return (
        <motion.div
            // 1. Initial/Hover Animation (Enhanced 3D)
            whileHover={{
                scale: 1.05, // Slightly larger lift
                rotateX: -4, // Tilt backward on X-axis
            }}
            // 2. Add perspective for 3D depth
            style={{
                perspective: '900px',
                // Using a slightly more complex radial gradient for visual depth

            }}
            // 3. Organization and Sizing
            className={`
                mt-10
                bg-gray-400/70
                flex flex-row 
                items-center 
                justify-center 
                gap-2 
                p-4 
                rounded-lg 
                shadow-xl 
                cursor-pointer 
                transform-style-preserve-3d 
            `}
        >
            <motion.div
                // This div ensures the image and its shadow rotate as one 3D unit
                className="shadow-2xl rounded-md"
                style={{
                    // Crucial: Use translateZ to pull the entire image block forward in 3D space
                    transform: 'translateZ(30px)',
                    height: LOGO_SIZE,
                    width: LOGO_SIZE,
                }}
            >
                <img
                    src={Anita}
                    alt={"CEO"}
                    className="object-contain rounded-md "
                    // Use CSS variables for easy size control
                    style={{
                        height: LOGO_SIZE,
                        width: LOGO_SIZE,
                    }}
                />
            </motion.div>

            <h1
                className={`
                    text-${FONT_SIZE} 
                    font-extrabold 
                    text-transparent 
                    bg-clip-text
                    bg-gradient-to-r from-indigo-500 to-cyan-400
                `}
                // Re-apply the gradient style for the text
                style={{
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    // Use a slight Z-lift on the text as well
                    transform: 'translateZ(10px)',
                }}
            >
                Anita's Kitchen
            </h1>
        </motion.div>
    );
};

export default Logo;