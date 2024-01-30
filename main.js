import { gameBoard } from "./buildBoard.js"
import { startExecution } from "./starting.js"


gameBoard()

const btn = document.querySelector('button')

btn.addEventListener('click',() => {
    startExecution()
})