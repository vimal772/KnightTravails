//creates 8*8 chess board
export const gameBoard = () => {
    const board = document.createElement('div')
    const coordArr = []

    for(let i=0;i<8;i++) {
        const boardRow = document.createElement('div')
        boardRow.classList.add('cellRow')
        // boardRow.textContent = i
        coordArr.push(i)
        for(let j=0;j<8;j++) {
            const cell = document.createElement('div')
            if(i==0 && j===0) {
                cell.style.color = "red"
            }
            cell.textContent = j
            coordArr.push(j)
            cell.dataset.coord = coordArr
            coordArr.splice(1,1)
            cell.classList.add('cell')
            boardRow.appendChild(cell)
            if((i+j)%2 === 0) {
                cell.classList.add('whiteCell')
            }else {
                cell.classList.add('blackCell')
            }
        }
        coordArr.splice(0,1)
        board.appendChild(boardRow)
    }
    document.querySelector('body').appendChild(board)
}

//adds knight icon
export function addIcon(target) {
    let iconSrc = "./assets/images/Knight-icon.jpg";
    const img = document.createElement('img');
    img.classList.add('icon');
    img.src = iconSrc;

    const cellNodes = document.querySelectorAll('.cell');
    cellNodes.forEach((cell) => {
        if (target.toString() === cell.dataset.coord) {
            cell.appendChild(img);
            // cell.classList.add('path')
        }
    });
}
