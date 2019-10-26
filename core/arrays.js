
export const frequencies = (array) => {
  const counts = {}

  array.forEach(element => {
    counts[element] = counts[element] ? counts[element] + 1 : 1
  })

  return counts
}

export const chunk = (array, size) => {
  const chunkedArray = []
  let index = 0
  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index))
    index += size
  }
  return chunkedArray
}
