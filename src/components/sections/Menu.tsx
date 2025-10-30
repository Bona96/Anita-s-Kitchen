import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import type { Mesh } from 'three';
import { useRef, useState, useEffect, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { TextureLoader, VideoTexture, LinearFilter } from 'three';
import { menuItems } from '../../assets/constants/constants';
import type { MenuItem } from '../../assets/constants/constants';


// Image variant: uses useLoader for TextureLoader (hook only used here for images)
const ImageFoodCard = ({ src }: { src: string }) => {
  const meshRef = useRef<Mesh | null>(null);
  const imgTexture = useLoader(TextureLoader, src);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.1 - 0.04;
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.06;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2.2, 1.4]} />
      <meshStandardMaterial map={imgTexture as any} metalness={0.15} roughness={0.6} />
      <Html center position={[0, -0.85, 0]}>
        <div className="w-56 h-4 bg-linear-to-r from-black/10 to-black/0 rounded-full blur-sm opacity-60"></div>
      </Html>
    </mesh>
  );
};

// Video variant: accepts a filename (relative to assets/media) and a quality selector
const VideoFoodCard = ({ filename, quality = 'auto' }: { filename: string; quality?: 'auto' | '720' | '1080' }) => {
  const meshRef = useRef<Mesh | null>(null);
  const [selectedSrc, setSelectedSrc] = useState<string>(() => {
    try {
      return new URL(`../../assets/media/${filename}`, import.meta.url).href;
    } catch (e) {
      return `/src/assets/media/${filename}`;
    }
  });

  // Try to prefer quality-specific filename when requested (e.g., name-720.mp4)
  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (quality === 'auto') {
        try {
          const u = new URL(`../../assets/media/${filename}`, import.meta.url).href;
          if (isMounted) setSelectedSrc(u);
        } catch (e) {
          if (isMounted) setSelectedSrc(`/src/assets/media/${filename}`);
        }
        return;
      }

      const candidate = filename.replace(/\.mp4$/i, `-${quality}.mp4`);
      try {
        const url = new URL(`../../assets/media/${candidate}`, import.meta.url).href;
        // Check quickly if resource is accessible (HEAD)
        try {
          const res = await fetch(url, { method: 'HEAD' });
          if (res.ok) {
            if (isMounted) setSelectedSrc(url);
            return;
          }
        } catch (err) {
          // network or CORS may block HEAD; we'll fallback to original below
        }
      } catch (e) {
        // invalid url, ignore
      }

      // fallback to original
      try {
        const u = new URL(`../../assets/media/${filename}`, import.meta.url).href;
        if (isMounted) setSelectedSrc(u);
      } catch (e) {
        if (isMounted) setSelectedSrc(`/src/assets/media/${filename}`);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [filename, quality]);

  // create and play video element
  const videoEl = useMemo(() => {
    const v = document.createElement('video');
    v.crossOrigin = 'anonymous';
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.autoplay = true;
    return v;
  }, []);

  useEffect(() => {
    if (!videoEl) return;
    videoEl.src = selectedSrc;
    videoEl.load();
    videoEl.play().catch(() => {});
  }, [selectedSrc, videoEl]);

  const videoTexture = useMemo(() => {
    const vt = new VideoTexture(videoEl as HTMLVideoElement);
    vt.minFilter = LinearFilter;
    vt.magFilter = LinearFilter;
    return vt;
  }, [videoEl]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.1 - 0.04;
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.06;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[2.2, 1.4]} />
      <meshStandardMaterial map={videoTexture as any} metalness={0.15} roughness={0.6} toneMapped={false} />
    </mesh>
  );
};

// legacy variants removed (replaced by sliderVariants)

const Menu = () => {
  // layout modes
  type LayoutMode = 'cards' | 'slider' | 'grid' | 'masonry' | 'table';
  const [layout, setLayout] = useState<LayoutMode>('cards');
  const [videoQuality, setVideoQuality] = useState<'auto' | '720' | '1080'>('auto');

  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);

  // pagination across layouts: pages of itemsPerPage
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const totalPages = Math.max(1, Math.ceil(menuItems.length / itemsPerPage));
  const pageItems = menuItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const paginate = (newDirection: number) => {
    setIndex(([i]) => {
      const pageStart = currentPage * itemsPerPage;
      const pageEnd = Math.min(pageStart + itemsPerPage, menuItems.length) - 1;
      let current = i;
      if (current < pageStart || current > pageEnd) current = pageStart;
      let next = current + newDirection;
      if (next > pageEnd) next = pageStart;
      if (next < pageStart) next = pageEnd;
      return [next, newDirection];
    });
  };

  const changePage = (newPage: number) => {
    const p = Math.max(0, Math.min(totalPages - 1, newPage));
    setCurrentPage(p);
    // move slider index to first item on page for slider UX
    setIndex([p * itemsPerPage, 0]);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (layout !== 'slider') return;
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [layout]);

  // helper to create asset url for Vite
  const assetUrl = (filename?: string) => {
    if (!filename) return '';
    try {
      return new URL(`../../assets/media/${filename}`, import.meta.url).href;
    } catch (e) {
      return `/src/assets/media/${filename}`; // fallback
    }
  };

  const qualityAssetUrl = (filename?: string, quality?: 'auto' | '720' | '1080') => {
    if (!filename) return '';
    if (!quality || quality === 'auto') return assetUrl(filename);
    const candidate = filename.replace(/\.mp4$/i, `-${quality}.mp4`);
    try {
      return new URL(`../../assets/media/${candidate}`, import.meta.url).href;
    } catch (e) {
      return assetUrl(filename);
    }
  };

  // small reusable card used in non-slider layouts
  const Card = ({ it }: { it: MenuItem }) => {
    const src = it.media ? qualityAssetUrl(it.media, videoQuality) : assetUrl('local-food.jpeg');
    const video = it.media ? it.media.toLowerCase().endsWith('.mp4') : false;
    return (
      <motion.div
        layout
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-700"
      >
        <div className="rounded-lg overflow-hidden mb-3 bg-gray-100 dark:bg-gray-700">
          {video ? (
            <video src={src} muted loop playsInline autoPlay className="w-full h-44 object-cover" />
          ) : (
            <img src={src} alt={it.name} className="w-full h-44 object-cover" />
          )}
        </div>
        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{it.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-300 my-2">{it.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-cyan-500 font-bold">UGX {it.price.toLocaleString()}</span>
          <span className="text-sm px-2 py-1 rounded-full text-violet-700 dark:text-violet-100 bg-violet-100 dark:bg-violet-700/20">{it.category}</span>
        </div>
      </motion.div>
    );
  };

  const item = menuItems[index];

  // layout UI
  const LayoutSwitcher = () => (
    <div className="flex items-center gap-2">
      {(['slider', 'cards', 'grid', 'masonry', 'table'] as LayoutMode[]).map((m) => (
        <button
          key={m}
          onClick={() => setLayout(m)}
          className={`px-3 py-1 rounded-md text-sm font-medium border ${layout === m ? 'bg-violet-500 text-white border-violet-600' : 'bg-white dark:bg-transparent text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700'} hover:scale-105 transition`}
          aria-pressed={layout === m}
        >
          {m}
        </button>
      ))}
    </div>
  );

  // slider variants with drag
  const sliderVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.98 })
  };

  return (
    <section id="menu" className="py-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-4xl font-bold mb-1">Our Menu — Taste of Uganda</h2>
            <p className="text-base text-gray-600 dark:text-gray-400">Choose layout and explore — touch or arrow keys work in slider mode.</p>
          </div>

          <div className="flex items-center gap-4">
            <LayoutSwitcher />
            <div className="flex items-center gap-3">
              <label className="text-sm text-gray-600 dark:text-gray-300">Video</label>
              <select value={videoQuality} onChange={(e) => setVideoQuality(e.target.value as any)} className="text-sm rounded-md px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <option value="auto">Auto</option>
                <option value="720">720p</option>
                <option value="1080">1080p</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Previous" onClick={() => paginate(-1)} className="p-2 rounded-full bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:scale-105 transition">
                ‹
              </button>
              <button aria-label="Next" onClick={() => paginate(1)} className="p-2 rounded-full bg-white dark:bg-gray-800 shadow border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:scale-105 transition">
                ›
              </button>
            </div>
          </div>
        </div>

        {/* content area: switch between layouts */}
        <div>
          {layout === 'slider' && (
            <div className="relative h-[520px]">
              <AnimatePresence custom={direction} initial={false} mode="wait">
                <motion.article
                  key={index}
                  custom={direction}
                  variants={sliderVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) paginate(1);
                    if (info.offset.x > 80) paginate(-1);
                  }}
                  className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 rounded-2xl p-6 shadow-2xl bg-white/60 dark:bg-gray-800/60"
                >
                  <div className="w-full md:w-1/2">
                    <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{item.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-2xl font-semibold text-cyan-500">UGX {item.price.toLocaleString()}</span>
                      <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-sm border border-gray-200 dark:border-gray-700">{item.category}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Pair with</h4>
                      <div className="flex flex-wrap gap-3">
                        {item.drinks.map((d) => (
                          <span key={d} className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-sm border border-gray-100 dark:border-gray-700">{d}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 h-[420px] rounded-xl overflow-hidden bg-white/60 dark:bg-gray-800/60 flex items-center justify-center">
                    <Canvas shadows>
                      <ambientLight intensity={0.9} />
                      <directionalLight position={[2, 5, 2]} intensity={0.8} />
                      <PerspectiveCamera makeDefault position={[0, 1.4, 3]} />
                      {/* keep OrbitControls but locked for consistent UX */}
                      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                      {item.media && item.media.toLowerCase().endsWith('.mp4') ? (
                        <VideoFoodCard filename={item.media} quality={videoQuality} />
                      ) : (
                        <ImageFoodCard src={assetUrl(item.media || 'local-food.jpeg')} />
                      )}
                    </Canvas>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>
          )}

          {layout === 'cards' && (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((it) => (
                <Card key={it.id} it={it} />
              ))}
            </motion.div>
          )}

          {layout === 'grid' && (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((it) => (
                <motion.div key={it.id} whileHover={{ y: -4 }} className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex gap-3 items-center">
                    <div className="w-28 h-20 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                      {it.media && it.media.toLowerCase().endsWith('.mp4') ? (
                        <video src={qualityAssetUrl(it.media, videoQuality)} muted loop playsInline autoPlay className="w-full h-full object-cover" />
                      ) : (
                        <img src={assetUrl(it.media || 'local-food.jpeg')} alt={it.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{it.name}</h4>
                      <div className="text-sm text-gray-500 dark:text-gray-300">UGX {it.price.toLocaleString()}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {layout === 'masonry' && (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
              {pageItems.map((it) => (
                <div key={it.id} className="mb-4 break-inside-avoid">
                  <Card it={it} />
                </div>
              ))}
            </div>
          )}

          {layout === 'table' && (
            <div className="overflow-auto rounded-lg border border-gray-100 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Item</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">Category</th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-300">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-700">
                  {pageItems.map((it) => (
                    <tr key={it.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-16 h-12 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-700">
                          {it.media && it.media.toLowerCase().endsWith('.mp4') ? (
                            <video src={qualityAssetUrl(it.media, videoQuality)} muted loop playsInline autoPlay className="w-full h-full object-cover" />
                          ) : (
                            <img src={assetUrl(it.media || 'local-food.jpeg')} alt={it.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{it.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-300">{it.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">{it.category}</td>
                      <td className="px-6 py-4 text-right text-sm font-medium text-cyan-500">UGX {it.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Pagination controls (pages of items) */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 0} className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50">
            Prev
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, p) => (
              <button key={p} onClick={() => changePage(p)} className={`w-3 h-3 rounded-full ${currentPage === p ? 'bg-violet-500' : 'bg-gray-300 dark:bg-gray-600'}`} aria-label={`Go to page ${p + 1}`} />
            ))}
          </div>
          <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages - 1} className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;