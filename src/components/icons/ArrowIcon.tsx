import React from "react"
import { IconContainer } from "./IconContainer"
import { type IconProps } from "../../domain/props"

interface Props extends IconProps {
  direction: "left" | "right"
}

export const ArrowIcon = ({ direction = "left", highlighted = false, ...props }: Props) => {
  if (direction === "left") {
    return (
      <IconContainer highlighted={highlighted} onClick={props.onClickCb}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </IconContainer>
    )
  }
  return (
    <IconContainer highlighted={highlighted} onClick={props.onClickCb}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </IconContainer>
  )
}
