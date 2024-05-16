import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
interface CursorProps {
  isActive: boolean;
}
export const Cursor: React.FC<CursorProps> = ({ isActive }) => {
  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef<HTMLDivElement | null>(null);
  const delayedMouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    mouse.current = {
      x: clientX,
      y: clientY,
    };

    moveCircle(mouse.current.x, mouse.current.y);
  };

  const animate = () => {
    const { x, y } = delayedMouse.current;

    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075),
    };

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);

    rafId.current = window.requestAnimationFrame(animate);
  };

  const moveCircle = (x: number, y: number) => {
    if (circle.current) {
      gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
    }
  };

  useEffect(() => {
    animate();
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const size = isActive ? 200 : 30;

  return (
    <div className="relative h-screen">
      <div
        ref={circle}
        style={{
          backgroundColor: "#1F51FF",
          width: size,
          height: size,
          filter: `blur(${isActive ? 20 : 0}px)`,
          transition: `height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out`,
        }}
        className="top-0 left-0 fixed rounded-full mix-blend-difference pointer-events-none"
      />
    </div>
  );
};
