import { useEffect, useState } from "react";

export default function FlyingImage({ imageSrc, startRect, endRect, onAnimationEnd }) {
  const [style, setStyle] = useState({
    position: "fixed",
    top: startRect.top,
    left: startRect.left,
    width: startRect.width,
    height: startRect.height,
    transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
    zIndex: 9999,
    opacity: 1,
    borderRadius: "8px",
    pointerEvents: "none",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStyle((prev) => ({
        ...prev,
        top: endRect.top,
        left: endRect.left,
        width: 30,
        height: 30,
        opacity: 0,
        transform: "scale(0.5)",
      }));
    }, 50);

    const cleanup = setTimeout(() => {
      onAnimationEnd?.();
    }, 750);

    return () => {
      clearTimeout(timeout);
      clearTimeout(cleanup);
    };
  }, [endRect, onAnimationEnd]);

  return <img src={imageSrc} alt="" style={style} />;
}
