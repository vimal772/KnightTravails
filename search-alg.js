const squareRegistry = new Map()

const chessSquare = (x,y) => {
    const xPosition =  x
    const yPostition = y
    let predecessor

    const knightMoves = [
        [1,2],[1,-2],
        [-1,2],[-1,-2],
        [2,1], [2,-1],
        [-2,1], [-2,-1]
    ]

    const getPredecessor = () => predecessor
    const setPredecessor = (newPredecessor) => {
        predecessor = predecessor || newPredecessor
    }

    const name = () => `${x}, ${y}`
    const possibleMoves = () => {
        return knightMoves
            .map((offset) => newSquareFrom(offset[0],offset[1]))
            .filter((square) => square !== undefined)
    }

    const newSquareFrom = (xOffset, yOffset) => {
        const [newX, newY] = [xPosition + xOffset, yPostition+yOffset];
        if(0 <= newX && 0 <= newY && newX < 8 && newY < 8) {
            return chessSquare(newX, newY)
        }
    }

    if(squareRegistry.has(name())) {
        return squareRegistry.get(name())
    }else {
        const newSquare = { name, getPredecessor, setPredecessor, possibleMoves }
        squareRegistry.set(name(),newSquare)
        return newSquare
    }   
}

const knightTravails = (start, end) => {
    squareRegistry.clear()

    const origin = chessSquare(...start)
    const target = chessSquare(...end)

    const queue = [origin]
    while(!queue.includes(target)) {
        const currentSquare = queue.shift()

        const enqeueList = currentSquare.possibleMoves();
        enqeueList.forEach(element => {
            element.setPredecessor(currentSquare)
        }); 
        queue.push(...enqeueList)
    }

    const path = [target]
    while(!path.includes(origin)) {
        const prevSquare = path[0].getPredecessor()
        path.unshift(prevSquare)
    }

    console.log(`the shortest path was ${path.length-1} moves!`);
    console.log("The moves were");
    path.forEach(element => console.log(element.name()));
}

export { knightTravails };