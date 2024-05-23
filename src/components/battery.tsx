import { FC } from 'react';
import '../CSS/circle.css';

interface Props {
  strokeWidth?: number;
  sqSize?: number;
  rayCount?: number;
  rayLength?: number;
}

const CircularProgressBar: FC<Props> = (props) => {
  const { strokeWidth = 1, sqSize = 160, rayCount = 100, rayLength = 10 } = props;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const rays = [];

  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * 360;
    const x1 = sqSize / 2 + radius * Math.cos((angle - 90) * (Math.PI / 180));
    const y1 = sqSize / 2 + radius * Math.sin((angle - 90) * (Math.PI / 180));
    const x2 = sqSize / 2 + (radius - rayLength) * Math.cos((angle - 90) * (Math.PI / 180));
    const y2 = sqSize / 2 + (radius - rayLength) * Math.sin((angle - 90) * (Math.PI / 180));
    rays.push(
      <line
        key={i}
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
}

export default CircularProgressBar;
