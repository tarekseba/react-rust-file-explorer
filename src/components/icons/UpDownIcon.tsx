import React from "react"
import { IconContainer } from "./IconContainer"
import { type IconProps } from "../../domain/props"

interface Props extends IconProps {
  direction: "up" | "down"
}

export const UpDownIcon = ({ direction, highlighted }: Props) => {
  if (direction === "up") {
    return (
      <IconContainer highlighted={highlighted}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 font-bold">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </IconContainer>
    )
  }
  return (
    <IconContainer highlighted={highlighted}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </IconContainer>
  )
}
