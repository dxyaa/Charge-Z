import { FC } from "react";
import "../CSS/circle.css";

interface Props {
  strokeWidth?: number;
  sqSize?: number;
  progress?: number; // Add a new prop for progress
}

const CircularProgressBar: FC<Props> = (props) => {
  const { strokeWidth = 1, sqSize = 160, progress = 100 } = props;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const startAngle = 0; // Angle to start drawing rays from
  const endAngle = startAngle + (progress / 100) * 360; // Calculate end angle based on progress

  const rays = [];

  for (let angle = startAngle; angle < endAngle; angle += 3.6) {
    const x1 = sqSize / 2 + radius * Math.cos((angle - 90) * (Math.PI / 180));
    const y1 = sqSize / 2 + radius * Math.sin((angle - 90) * (Math.PI / 180));
    const x2 =
      sqSize / 2 + (radius - 15) * Math.cos((angle - 90) * (Math.PI / 180));
    const y2 =
      sqSize / 2 + (radius - 15) * Math.sin((angle - 90) * (Math.PI / 180));
    rays.push(
      <line
        key={angle}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className="ray animated-progress"
        strokeWidth={strokeWidth}
      />
    );
  }

  return (
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        className="fill-none stroke-gray-200"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth * 3}px`}
      />
      {rays}
    </svg>
  );
};

export default CircularProgressBar;
