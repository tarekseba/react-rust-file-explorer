import React from "react"
import type { Item } from "../../../domain/types"
import { classNames } from "../../../utils/ui/helpers"

interface Props {
  item: Item
  selected: boolean
  onSelect: () => void
}

export const ListItem = ({ item, selected, onSelect }: Props) => (
  <li
    className={classNames(
      "relative flex flex-row justify-left items-center gap-2 px-2 leading-8 rounded-xl cursor-pointer transition-all ease-in duration-200 text-gray-500 font-serif",
      selected ? "bg-white text-gray-600 transition-all" : "",
      !selected ? "hover:translate-x-1 hover:bg-white/50" : ""
    )}
    onClick={onSelect}
  >
    {React.cloneElement(item.icon, { highlighted: selected })}
    {item.label}
  </li>
)
