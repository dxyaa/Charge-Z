import { FC } from 'react'
import { FaCar } from "react-icons/fa";

interface Props {
  strokeWidth?: number
  sqSize?: number
  percentage: number
}

const CircularProgressBar: FC<Props> = (props) => {
  const { strokeWidth = 8, sqSize = 160, percentage } = props
  const radius = (sqSize - strokeWidth) / 2
  const viewBox = `0 0 ${sqSize} ${sqSize}`
  const dashArray = radius * Math.PI * 2
  const dashOffset = dashArray - (dashArray * (percentage || 0)) / 100
  const iconSize = 60; // Adjust icon size as needed

  return (
  
    <svg width={sqSize} height={sqSize} viewBox={viewBox}>
      <circle
        className="fill-none stroke-gray-200"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
      />
      <g 
        transform={`translate(${sqSize / 2}, ${sqSize / 2})`} // Centering the group
        style={{ transformOrigin: 'center' }} 
      >
        <FaCar className='' size={iconSize} color="#0044AA" /> 
      </g>
      <circle
        className="fill-none stroke-[#0044AA] transition-all ease-in delay-200"
        cx={sqSize / 2}
        cy={sqSize / 2}
        r={radius}
        strokeLinecap="round"
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-270 ${sqSize / 2} ${sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
    </svg>
 
  )
}

export default CircularProgressBar
