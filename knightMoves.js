export function knightMoves(start, end) {
    let board = buildBoard();
    let startIndex = findIndex(start,board)
    let endIndex = findIndex(end,board)
    let bfsInfo = buildInfoArr(board,startIndex)
    let adjList = buildAdjList(board)
    let queue = [startIndex]
    let u
    
    while(u != endIndex) {
        u = queue.shift();

        for(let i=0;i<adjList[u].length;i++) {
            let vIndex = adjList[u][i]

            if(vIndex === endIndex) {
                bfsInfo[vIndex].predecessor = u
                let path = []
                constructPath(board,bfsInfo,bfsInfo[vIndex],vIndex,path)
                let result = path.reverse().splice(0,0,start)
                console.log(`you made it in ${path.length-1}`)
                return path
            } else {
                if(bfsInfo[vIndex].distance == null) {
                    bfsInfo[vIndex].distance = bfsInfo[u].distance +1
                    bfsInfo[vIndex].predecessor = u
                    queue.push(vIndex)
                }
            }
        }
    }
}

function buildBoard() {
    let board = []
        for(let i=0; i<8; i++) {
            for(let j=0; j<8; j++) {
                board.push([i, j])
            }
        }
    return board
}

function findIndex(target, arr) {
    for(let i=0; i<arr.length; i++) {
        if(arr[i][0] === target[0] && arr[i][1] === target[1]) {
            return i
        }
    }
}

function buildInfoArr(boardArr, startIndex) {
    let newArr = []
    for(let i=0; i<boardArr.length; i++) {
        newArr[i] = {
            distance: null,
            predecessor: null
        }
    }
    newArr[startIndex].distance = 0
    return newArr
}


function buildAdjList(board) {
    let adjList = []
    for(let i=0; i<board.length; i++) {
        let neighbers = []
        for(let j=0; j<8; j++) {
            let neighber = findNextMove(j,board[i][0],board[i][1])
            if(containsSpot(board,neighber)) {
                neighbers.push(findIndex(neighber,board))
            }
        }
        adjList[i] = neighbers
    }
    return adjList
}

function findNextMove(index,x,y) {
    if(index == 0) return [x+2,y+1]
    if(index == 1) return [x+1,y+2]
    if(index == 2) return [x-1,y+2]
    if(index == 3) return [x-2,y+1]
    if(index == 4) return [x-2,y-1]
    if(index == 5) return [x-1,y-2]
    if(index == 6) return [x+1,y-2]
    if(index == 7) return [x+2,y-1]
}

function constructPath(board,infoArr,item,index,newArr) {
    if(item.predecessor === null) return
    if(item.predecessor != null) {
        newArr.push(board[index])
        constructPath(board,infoArr,infoArr[item.predecessor],item.predecessor,newArr)
    }
}

function containsSpot(arr, target) {
    if(arr.find(element => element[0] === target[0]) &&
    arr.find(element => element[1] === target[1])) {
        return true
    }
}
