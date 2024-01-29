import { gameBoard, addIcon } from "./buildBoard.js"
import { knightTravails } from "./search-alg.js"
import { knightMoves } from "./knightMoves.js"


gameBoard()

const btn = document.querySelector('button')

btn.addEventListener('click',() => {
    startExecution()
})

function startExecution() {
    let start = document.querySelector('#start').value.trim()
    let end = document.querySelector('#end').value.trim()
    const spanTag = document.querySelector('.errorMsg')

    if(!start || !end) {
        const msg = "Give the valid input"
        spanTag.textContent = msg
        setTimeout(function() {
            spanTag.textContent = ''
            reset()
        },3000)
    }else {
        start = start.split(',').map(Number)
        end = end.split(',').map(Number)
        if(start[0] >= 0 && end[0] >= 0 && start[1] <= 7 && end[1] <= 7) {
            const path = knightMoves(start, end)
            displayResults(path)
            addIcon(path[0])
            setTimeout(function() {
                addIcon(path[path.length-1])
            },4000)
        }
    }
}

function displayResults(path) {
    const displayBox = document.querySelector('#displayBox')
    const heading = document.createElement('h3')
    heading.textContent = `You Made It in ${path.length -1}`
    displayBox.appendChild(heading)
    const para = document.createElement('p')
    para.textContent = "Below are the Shortest Path Available"
    displayBox.appendChild(para)
    for(let i=0; i<path.length;i++) {
        const para = document.createElement('p')
        para.textContent = path[i]
        para.classList.add('displayPara')
        displayBox.appendChild(para)
    }
    const btn = document.createElement('button')
    btn.textContent = "CLose"
    displayBox.appendChild(btn)
    btn.addEventListener('click',()=> {
        while(displayBox.firstChild) {
            displayBox.removeChild(displayBox.firstChild)
        }
        displayBox.close()
        reset()
    })
    displayBox.showModal()
}

function reset() {
    const start = document.querySelector('#start')
    const end = document.querySelector('#end')

    start.value =''
    end.value =''
}