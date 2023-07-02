import React, { useState } from "react"
import type { Item } from "../../../domain/types"
import { ListItem } from "./ListItem"
import type { ReactState } from "../../../domain/react"

interface Props {
  items: Item[]
}

export const List = (props: Props) => {
  const [selected, setSelected]: ReactState<number> = useState(0)

  const onSelect = (index: number) => () => {
    setSelected(index)
  }

  return (
    <ul className="flex flex-col gap-[6px]">
      {props.items.map((item: Item, index: number) => (
        <ListItem
          item={item}
          key={item.label}
          selected={selected === index}
          onSelect={onSelect(index)}
        />
      ))}
    </ul>
  )
}
