import { motion } from "framer-motion"
import React, { useMemo } from "react";
import { FaUtensils, FaDrumstickBite, FaFish } from 'react-icons/fa';
// import available food images
import jollof from "../../assets/media/jollof-rice.jpeg";
import boiled from "../../assets/media/boiled-chicken.jpeg";
import grilled from "../../assets/media/grilled-chicken.jpeg";
import wings from "../../assets/media/chicken-wings.jpeg";
import roasted from "../../assets/media/roasted-chicken.jpeg";
import localFood from "../../assets/media/local-food.jpeg";
import fish from "../../assets/media/all-foods-and-fish.jpeg";

const ICONS = [FaUtensils, FaDrumstickBite, FaFish];

const IMAGES = [jollof, boiled, grilled, wings, roasted, localFood, fish];
interface TileProps {
  /** timestamp in ms when this tile became active (from Hero). */
  activeAt?: number | null;
}

const DURATION = 1400; // ms - how long the trail lasts

const Tile: React.FC<TileProps> = ({ activeAt = null }) => {
    // choose a random content for this tile (icon or image)
  const { type, value } = useMemo(() => {
    const isImage = Math.random() > 0.6; // ~40% tiles show images
    if (isImage) {
    const img = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    return { type: "image", value: img };
    }
    const IconComponent = ICONS[Math.floor(Math.random() * ICONS.length)];
    // pick some pleasant theme color variables
    const cssVars = ["--color-cyan-500","--color-maroon-500","--color-violet-500","--color-gray-100"];
    const cssVar = cssVars[Math.floor(Math.random() * cssVars.length)];
    const style = { color: `var(${cssVar})` } as React.CSSProperties;
    return { type: "icon", value: <IconComponent className="w-8 h-8" style={style} aria-hidden /> };
  }, []);

  // compute intensity based on how recently this tile was activated
  const age = activeAt ? Math.max(0, Date.now() - activeAt) : Infinity;
  const intensity = Math.max(0, 1 - age / DURATION); // 1 => freshest, 0 => inactive

  // derive animated targets from intensity
  const targetScale = 1 + 0.6 * intensity; // grow up to 1.6x
  const targetOpacity = 0.12 + 0.88 * intensity; // from subtle to fully visible
  const targetRadius = intensity > 0 ? 8 : 9999; // rounded-md when active, pill when not

  return (
    <motion.div
      // animate based on active intensity (Hero updates activeMap each frame)
      animate={{
        scale: targetScale,
        opacity: targetOpacity,
        borderRadius: `${targetRadius}px`,
      }}
      transition={{
        // slow, smooth decay to create the trailing effect
        duration: DURATION / 1000,
        ease: "easeOut",
      }}
      whileHover={{
        zIndex: 1,
        scale: 1.08,
      }}
      className="aspect-square bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden"
    >
      {type === "image" ? (
        <img
          loading="lazy"
          src={value as string}
          alt="food"
          className="object-cover w-full h-full"
          style={{
            // make images clearer/sharper when active by slightly increasing contrast
            filter: `contrast(${1 + 0.15 * intensity})`,
          }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-neutral-900">
          <div className="opacity-90">{value}</div>
        </div>
      )}
    </motion.div>
  )
}

export default Tile





// End of Tile
