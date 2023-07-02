import React from "react"
import { type File } from "../../domain/types"
import { Entity } from "../atoms/Entity"

const files: File[] = [
  { path: "/home/wtman/scrapyard", type: "DIR", name: "scrapayrd" },
  { path: "/home/wtman/.config", type: "DIR", name: ".config" },
  { path: "/home/wtman/scrapyard4", type: "DIR", name: "scrapayrd1" },
  { path: "/home/wtman/scrapyard5", type: "DIR", name: "scrapayrd2" },
  { path: "/home/wtman/scrapyard6", type: "DIR", name: "scrapayrd3" },
  { path: "/home/wtman/scrapyard8", type: "DIR", name: "scrapayrd4" },
  { path: "/home/wtman/scrapyard9", type: "DIR", name: "scrapayrd5" },
  { path: "/home/wtman/scrapyard10", type: "DIR", name: "scrapayrd" },
  { path: "/home/wtman/scrapyard11", type: "DIR", name: "scrapayrd" },
  { path: "/home/wtman/scrapyard12", type: "DIR", name: "scrapayrdblackninjaLOLhahahahasfas dfsdf sdfasd fasdfas df" },
  { path: "/home/wtman/.config4", type: "DIR", name: ".config lol what are we doiong" },
  { path: "/home/wtman/.config5", type: "DIR", name: ".config" },
  { path: "/home/wtman/.config56", type: "DIR", name: ".config" },
  { path: "/home/wtman/.config7", type: "DIR", name: ".config" },
  { path: "/home/wtman/.config9", type: "DIR", name: ".config" },
  { path: "/home/wtman/.config8", type: "DIR", name: ".config" },
  { path: "/home/wtman/.config19", type: "DIR", name: ".config" },
  { path: "/home/wtman/.config10", type: "DIR", name: ".config" },
  { path: "/home/wtman/.config20", type: "FILE", name: ".zshrc" }
]

export const Explorer = () => {
  return <div className="grid md:grid-cols-4 lg:grid-cols-8 sm:grid-cols-3 gap-4 text-gray-500">
    {files.map((file: File) => <Entity file={file} key={file.path}/>)}
  </div>
}
