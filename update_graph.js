const fs = require('fs');
const file = 'src/components/AnimatedDetoxGraph.jsx';
let content = fs.readFileSync(file, 'utf8');

// Update imports
content = content.replace(
  "import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from 'framer-motion';",
  "import { motion, useTransform, useMotionValue, useInView, animate } from 'framer-motion';"
);

// Replace hook logic
const oldHooks = `  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const clampedProgress = useMotionValue(0);
  const hasFinished = useRef(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.98) {
      hasFinished.current = true;
    }
    
    if (hasFinished.current) {
      clampedProgress.set(1);
    } else {
      clampedProgress.set(latest);
    }
  });`;

const newHooks = `  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const clampedProgress = useMotionValue(0);

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(clampedProgress, 1, { duration: 5, ease: "linear" });
      return controls.stop;
    } else {
      clampedProgress.set(0);
    }
  }, [isInView, clampedProgress]);`;

content = content.replace(oldHooks, newHooks);

// Update styles
content = content.replace(
  "<div ref={containerRef} style={{ height: '700vh', position: 'relative', width: '100%', maxWidth: '1000px', margin: '100px auto 0' }}>",
  "<div ref={containerRef} style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '100px auto', padding: '20px 0' }}>"
);

content = content.replace(
  "<div style={{ position: 'sticky', top: '15vh', height: '80vh', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>",
  "<div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>"
);

// Remove the "scroll down" indicator text since it's no longer scroll-based
content = content.replace(
  "<p style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>아래로 스크롤하여 변화를 확인하세요</p>",
  "<p style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>시간의 흐름에 따른 치료 과정을 확인하세요</p>"
);

fs.writeFileSync(file, content);
console.log('Updated successfully');
