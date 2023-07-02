import React, { type PropsWithChildren } from "react"
import { classNames } from "../../utils/ui/helpers"
import { type IconProps } from "../../domain/props"

interface Props extends IconProps {
  color?: string
  className?: string
}

export const IconContainer = ({ children, color, highlighted = false }: PropsWithChildren<Props>) => {
  return (
    <span className={classNames(
      "flex items-center justify-center text-sm cursor-pointer border-gray-200 transition-colors ease-in-out duration-200 align-baseline",
      highlighted ? "text-gray-900" : "text-gray-400"
    )} {...(color ? { style: { color } } : {})}>
      {children}
    </span>
  )
}
