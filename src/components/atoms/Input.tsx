import React, { type ReactNode, type InputHTMLAttributes } from "react"
interface Props extends React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}

export const Input = ({ startAdornment, endAdornment, ...inputProps }: Props) => {
  return (
    <div className="
      flex flex-row items-center gap-2
      bg-white rounded-lg px-2 ml-auto
      focus-within:border-solid focus-within:border-red-100 focus-within:border-[0.5px]">
      {startAdornment && startAdornment}
      <input
        {...inputProps}
        type="text"
        className="focus:outline-0 focus-within:outline-0 focus-visible:outline-0 outline-0"
      />
      {endAdornment && endAdornment}
    </div>
  )
}
