export const classNames = (...args: Array<string | undefined>): string => args.filter(Boolean).join(" ")
