"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "tailwindcss/tailwind.css";
import { useState } from "react";
const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

const Profile = () => {
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const circle = useRef<HTMLDivElement>(null);
  const delayedMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const size = 30;
  const rafId = useRef<number>();

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    mouse.current = {
      x: clientX,
      y: clientY,
    };

    moveCircle(mouse.current.x, mouse.current.y);
  };

  const animate = () => {
    const { x, y } = delayedMouse.current!;

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
    window.addEventListener("mousemove", manageMouseMove);
    animate(); // Start animation loop
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      cancelAnimationFrame(rafId.current!);
    };
  }, []);

  const [isActive, setIsActive] = useState(false);
  return (
    <div className="bg-black text-white h-screen relative">
      <div
        ref={circle}
        style={{
          backgroundColor: "#BCE4F2",
          width: size,
          height: size,
          borderRadius: "50%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      Profile
    </div>
  );
};

export default Profile;
