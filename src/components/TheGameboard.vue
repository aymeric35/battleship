<script setup lang="ts">
import Game from '~/factories/Game'
import { hitType } from '~/enums'

const game = (Game())
game.start()

function evaluateAttack(x: number, y: number) {
  if (game.getCurrentTurn() === game.player1.getName()) {
    const playerAttack = game.Board2.receiveAttack(x, y)
    if (playerAttack === hitType.ALREADYHIT)
      return
    checkForGameOver()
    game.nextTurn()

    game.player2.randomAttack(game.Board1)
    checkForGameOver()
    game.nextTurn()
  }
  else {
    game.notYourTurn()
  }
}

function checkForGameOver() {
  if (game.Board2.isGameOver())
    return alert(`${game.player1.getName()} won!`)
  if (game.Board1.isGameOver())
    return alert(`${game.player2.getName()} won!`)
}
</script>

<template>
  <section>
    <h2 class="mb-4">
      Current turn : {{ game.getCurrentTurn() }}
    </h2>
    <TheBoard :gameboard="game.Board1" />
    <div class="my-8 b-1 border-red" />
    <TheBoard :gameboard="game.Board2" @attack="(x, y) => evaluateAttack(x, y)" />
  </section>
</template>
