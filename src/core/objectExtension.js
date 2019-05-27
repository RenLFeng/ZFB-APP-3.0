export const merge = (...args) => {
  const end = Object.assign({}, ...args)
  return end
}

export const prop = key => object => object[key]
