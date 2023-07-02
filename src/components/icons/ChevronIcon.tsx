import React from "react"
import { IconContainer } from "./IconContainer"
import { type IconProps } from "../../domain/props"

interface Props extends IconProps {
  direction: "left" | "right"
}

export const ChevronIcon = ({ direction = "left", size = 4 }: Props) => {
  if (direction === "left") {
    return (
      <IconContainer>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-${size} h-${size}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </IconContainer>
    )
  }
  return (
    <IconContainer>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-${size} h-${size}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </IconContainer>
  )
}
