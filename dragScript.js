
/// Move counter
let counter = 0

/// Makes array of the 3 boxes
let box = document.querySelectorAll('.box')

/// Determines win
let box3 = document.querySelector('#box3')
let win = document.querySelector('#win')

/// Changeable variables
let blockColor = null
let newBox = null
let newBoxvalue = null
let blockValue = null
let topValue = null

/// Effects starting appearance
let box1 = document.querySelector('#box1')
let box2 = document.querySelector('#box2')
let reset = document.querySelector('.reset')
let extras = document.querySelector('.extras')
let timer = document.querySelector('#timer')
let games = document.querySelector('.games')
let gameCounter = 0
let wonGames = document.querySelector('#wonGames')

reset.style.display = 'none'
extras.style.display = 'none'
box1.style.display = 'none'
box2.style.display = 'none'
box3.style.display = 'none'
timer.style.display = 'none'
games.style.display = 'none'
timer.style.visibility = 'hidden'

/// Choose how many blocks
let choose = document.querySelector('.choose')
let easy = document.querySelector('#easy')
let medium = document.querySelector('#medium')
let hard = document.querySelector('#hard')
let timed = document.querySelector('#timed')
let howMany = null

function start() {
	easy.addEventListener('click', easyBlocks)
	medium.addEventListener('click', mediumBlocks)
	hard.addEventListener('click', hardBlocks)
	timed.addEventListener('click', timedBlocks)
}

function easyBlocks() {
	choose.style.display = 'none'
	howMany = 4
	addBlocks()
}
function mediumBlocks() {
	choose.style.display = 'none'
	howMany = 5
	addBlocks()
}
function hardBlocks() {
	choose.style.display = 'none'
	howMany = 6
	addBlocks()
}
function timedBlocks() {
	choose.style.display = 'none'
	howMany = 6
	timer.style.visibility = 'visible'
	countDown()
	addBlocks()
}

function addBlocks() {
	for (let i = 1; i <= howMany; i++) {
		let div = document.createElement('div')
		div.setAttribute('class', 'block')
		div.setAttribute('id', 'block' + i)
		div.setAttribute('data-value', i)

		div.setAttribute('draggable', true)
		div.setAttribute('ondragstart', 'moveBlock(event)')

		div.style.height = '50px'
		div.style.width = (i * 50) + 'px'
		div.style.borderRadius = '5px'
		div.style.margin = '1px'
		box1.appendChild(div)
	}
	reset.style.display = 'flex'
	extras.style.display = 'flex'
	box1.style.display = 'flex'
	box2.style.display = 'flex'
	box3.style.display = 'flex'
	games.style.display = 'flex'
	timer.style.display = 'flex'

	box1.style.visibility = 'visible'
	box2.style.visibility = 'visible'
	box3.style.visibility = 'visible'
}

box.forEach(box => {
	box.setAttribute('ondragover', 'allowDrop(event)')
	box.setAttribute('ondrop', 'drop(event)')
})

function allowDrop(event) {
	event.preventDefault()
}

function drop(event) {
	event.preventDefault()
	let dataValue = event.dataTransfer.getData('dataValue')
	let id = event.dataTransfer.getData('id')
	if (event.target.lastElementChild === null && event.target.getAttribute('class') !== 'block') {
		event.target.appendChild(document.getElementById(id))
		counter++
		document.querySelector('#counter').innerHTML = counter
	} else if (event.target.lastElementChild !== null) {
		let lastValue = event.target.firstElementChild.getAttribute('data-value')
		if (lastValue > dataValue) {
			event.target.insertBefore(document.getElementById(id), event.target.firstElementChild)
			checkWin()
			counter++
			document.querySelector('#counter').innerHTML = counter
		} else {
			event.preventDefault()
		}
	}	
}

/// Selects the top block in the selected box
function moveBlock(event) {
	if (event.target === box[0].firstElementChild || event.target === box[1].firstElementChild || event.target === box[2].firstElementChild) {
		dataValue = event.target.getAttribute('data-value')
		event.dataTransfer.setData('dataValue', dataValue)
		event.dataTransfer.setData('id', event.target.id)
	} else {
		event.preventDefault()
	}
}

/// Checks if all disks have been moved to the right-side box
function checkWin() {
	if ((box3.children.length === 4 && howMany === 4) || (box3.children.length === 5 && howMany === 5) || (box3.children.length === 6 && howMany === 6)) {
		win.style.display = 'flex'
		gameCounter++
		wonGames.innerHTML = gameCounter
		box1.style.visibility = 'hidden'
		box2.style.visibility = 'hidden'
		box3.style.visibility = 'hidden'
	} 
}

/// Reset
reset.addEventListener('click', resetGame)

function resetGame() {
	while (box1.firstElementChild) {
		box1.removeChild(box1.firstElementChild)
	}
	while (box2.firstElementChild) {
		box2.removeChild(box2.firstElementChild)
	}
	while (box3.firstElementChild) {
		box3.removeChild(box3.firstElementChild)
	}

	counter = 0
	document.querySelector('#counter').innerHTML = counter
	timer.style.display = 'none'
	timer.style.visibility = 'hidden'
	win.style.display = 'none'
	fail.style.display = 'none'
	reset.style.display = 'none'
	extras.style.display = 'none'
	box1.style.display = 'none'
	box2.style.display = 'none'
	box3.style.display = 'none'
	games.style.display = 'none'
	choose.style.display = 'flex'

	resetTimer()
}

/// Timer
let seconds = 61
let myTimer;

function countDown() {
    function tick() {
        seconds--
        timer.innerHTML = seconds
        if (seconds > 0) {
            myTimer = setTimeout(tick, 1000)
        } else if (box3.children.length === 6 && howMany === 6) {
        	winTimed()
        } else if (seconds === 0) {
        	endGame()
        }
    }
    tick();
}

/// Reset Timer
function resetTimer() {
	clearTimeout(myTimer)
	seconds = 61
}

/// Win timed run
function winTimed() {
	win.style.display = 'flex'
	box1.style.visibility = 'hidden'
	box2.style.visibility = 'hidden'
	box3.style.visibility = 'hidden'
	timer.innerHTML = seconds
	gameCounter++
	wonGames.innerHTML = gameCounter
	clearTimeout(myTimer)
}

/// Fail timed run
function endGame() {
	let fail = document.querySelector('#fail')
	fail.style.display = 'flex'

	box1.style.visibility = 'hidden'
	box2.style.visibility = 'hidden'
	box3.style.visibility = 'hidden'
}


start()
