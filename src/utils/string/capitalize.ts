export const capitalize = (str: string) => {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}
