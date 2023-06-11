import { expect, test } from 'vitest'
import Ship from '~/modules/ship'

test('Ship should have the following properties : length, hitTrack and isSunk', () => {
  const ship = Ship(1)
  expect(ship.hitOccurrences()).toEqual(0)
  expect(ship.length).toEqual(1)
  expect(ship.isSunk()).toBeFalsy()
})

test('Ship should be sunk', () => {
  const ship = Ship(1)
  ship.hit()
  expect(ship.isSunk()).toBeTruthy()
})

test('hitOccurrences should return the correct number of times the ship was hit', () => {
  const ship = Ship(3)
  ship.hit()
  ship.hit()
  expect(ship.hitOccurrences()).toEqual(2)
})
