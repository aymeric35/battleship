export default function Ship(shipLength: number) {
  const length = shipLength
  let hitTrack = 0
  let sunk = false

  const isSunk = () => {
    if (length === hitTrack)
      sunk = true
    return sunk
  }

  const hitOccurrences = () => {
    return hitTrack
  }

  const hit = () => {
    hitTrack++
  }

  return { length, hitOccurrences, isSunk, hit }
}
