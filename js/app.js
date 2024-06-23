const gameForm = document.getElementById('form')
const gameField = document.createElement('div')
const gameButton = document.createElement('button')
const controlGameField = []
const controlObject = {
  lines: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ],
  columns: [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ],
  diagonals: [
    [0, 4, 8],
    [2, 4, 6]
  ]
}
let gameOver
let processCounter

const initGameField = () => {
  for (let i = 0; i < 9; i++) {
    const gameCell = document.createElement('div')
    gameCell.setAttribute('id', `gameCell_${i}`)
    gameCell.setAttribute('class', 'cell')
    gameField.append(gameCell)
    controlGameField.push('')
  }
}

const startGame = () =>  {
  gameField.setAttribute('class', 'form__game-field')
  initGameField()

  gameForm.append(gameField)

  gameButton.setAttribute('class', 'form__game-button')
  gameButton.innerHTML = 'СНАЧАЛА'
  gameForm.append(gameButton)

  processCounter = 0
  gameOver = false
}

const markWiningCells = (winningCells) => {
  winningCells.forEach(i => {
    const winningCell = document.getElementById(`gameCell_${i}`)
    winningCell.className = 'winning-cell'
  })
}

const allEqual = arr => arr.every(v => v === arr[0])

const inspectGameSituation = () => {
  for (const key in controlObject) {
    let winingLine = []
    for (let i = 0; i < controlObject[key].length; i++) {
      controlObject[key][i].forEach(item => winingLine.push(controlGameField[item]))
      gameOver = allEqual(winingLine)
      if (gameOver) {
        winingLine = controlObject[key][i]
        break
      }
    }
    if (gameOver) {
      markWiningCells(winingLine)
      break
    }
  }
}

const isEven = number => number % 2 === 0

const makeMove = currentCellId => {
  processCounter += 1
  const currentCell = document.getElementById(currentCellId)
  const stroke = document.createElement('img')
  const src = isEven(processCounter) ? './img/zero.png' : './img/cross.png'
  stroke.setAttribute('src', src)
  stroke.setAttribute('loading', 'lazy')
  stroke.setAttribute('alt', '')

  currentCell.append(stroke)
  currentCell.className = 'filled-cell'

  const index = currentCellId.replace('gameCell_', '')
  controlGameField[Number(index)] = isEven(processCounter) ? 'zero' : 'cross'

  if (processCounter >= 5) {
    inspectGameSituation()
  }
}

const resetGameField = () => {
  for (let i = 0; i < 9; i++) {
    const currentCell = document.getElementById(`gameCell_${i}`)
    currentCell.innerHTML = ''
    currentCell.className = 'cell'
    controlGameField[i] = ''
  }
  processCounter = 0
  gameOver = false
}

startGame()

gameField.addEventListener('click', evt => {
  if (gameOver) return
  const currentCellId = evt.target.getAttribute('id')
  if (currentCellId) {
    makeMove(currentCellId)
  }
})

gameButton.addEventListener('click', evt => {
  resetGameField()
})
