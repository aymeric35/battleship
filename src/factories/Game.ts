import { ref } from 'vue'
import AI from './AI'
import Gameboard from './Gameboard'
import Player from './Player'
import Ship from './Ship'

export default function Game() {
  const player1 = Player()
  const player2 = AI()
  const Board1 = Gameboard()
  const Board2 = Gameboard()
  const currentTurn = ref('')
  const firstTurn = player1.getName()
  const getCurrentTurn = () => currentTurn
  const setCurrentTurn = (player1: string) => currentTurn.value = player1
  const notYourTurn = () => alert('Not your turn')
  const nextTurn = () => {
    currentTurn.value === player1.getName() ? setCurrentTurn(player2.getName()) : setCurrentTurn(player1.getName())
  }

  const start = () => {
    Board1.placeShip(Ship(4), 0, 0)
    Board1.placeShip(Ship(3), 3, 0)
    Board1.placeShip(Ship(2), 9, 4)
    Board1.placeShip(Ship(1), 6, 9)

    Board2.placeShip(Ship(4), 0, 0)
    Board2.placeShip(Ship(3), 3, 0)
    Board2.placeShip(Ship(2), 9, 4)
    Board2.placeShip(Ship(1), 6, 9)

    setCurrentTurn(firstTurn)
  }

  return { getCurrentTurn, notYourTurn, nextTurn, Board1, Board2, player1, player2, start }
}
