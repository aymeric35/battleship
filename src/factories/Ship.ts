export default function Ship(shipLength: number) {
  const length = shipLength
  let hitTrack = 0

  const isSunk = () => length <= hitTrack

  const getHits = () => {
    return hitTrack
  }

  const hit = () => {
    hitTrack++
  }

  return { length, getHits, isSunk, hit }
}
