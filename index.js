const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeElement = document.querySelector('#time')
const board = document.querySelector('#board')

const colors = ['darkcyan', 'whitesmoke', 'coral', 'orange', 'lime', 'darkblue', 'mediumslateblue', 'maroon', 'teal']

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
  // hackTheGame()
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`    
        } 
        setTime(current)
    }
}

function setTime(value) {
    timeElement.innerHTML = `00:${value}`
}

function finishGame() {
    timeElement.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span></h1>`
    board.addEventListener('click', () => window.location.reload())
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(5, 80)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    const color = getRandomColor()
    
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = color
    

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
}

/*function hackTheGame() {
    function killCircle() {
        const circle = document.querySelector('.circle')
        circle.click()

        if (circle) {
            circle.click()
        }
    }

    setInterval(killCircle, 1)

}*/