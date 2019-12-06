
/// Move counter
let counter = 0

/// Makes array of the 3 boxes
let box = document.querySelectorAll('.box')

/// Determines win
let box3 = document.querySelector('#box3')
let win = document.querySelector('#win')

/// Changeable variables
let block = null
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

reset.style.display = 'none'
extras.style.display = 'none'
box1.style.display = 'none'
box2.style.display = 'none'
box3.style.display = 'none'
timer.style.display = 'none'


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
	timer.style.display = 'block'
	countDown()
	addBlocks()
}

function addBlocks() {
	for (let i = 1; i <= howMany; i++) {
		let div = document.createElement('div')
		div.setAttribute('id', 'block' + i)
		div.setAttribute('data-value', i)
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
}

/// Makes each box clickable
for (let i = 0; i < box.length; i++) {
	box[i].addEventListener('click', moveBlock)
}

/// Selects the top block in the selected box
function moveBlock(event) {
	if (block === null && (event.target === box[0].firstElementChild || event.target === box[1].firstElementChild || event.target === box[2].firstElementChild)) {
		block = event.target
		blockColor = block.style.backgroundColor
		block.style.backgroundColor = 'gray'
		blockValue = event.target.getAttribute('data-value')
	} else if (block !== null && (event.target === box[0] || event.target === box[1] || event.target === box[2])) {
		newBox = event.target
		newBoxvalue = event.target.firstElementChild

		if (event.target.children.length > 0) {
			topValue = event.target.firstElementChild.getAttribute('data-value')
		}
		compare()
	}
}

/// Checks validity of move
function compare() {
	if (newBoxvalue === null) {
		newBox.appendChild(block)
		block.style.backgroundColor = blockColor
		block = null
		newBox = null
		newBoxvalue = null
		counter++
		document.querySelector('#counter').innerHTML = counter
	} else if (newBoxvalue !== null && topValue > blockValue) {
		newBox.insertBefore(block, newBox.firstElementChild)
		block.style.backgroundColor = blockColor
		checkWin()
		block = null
		newBox = null
		newBoxvalue = null
		counter++
		document.querySelector('#counter').innerHTML = counter
	} else if (newBoxvalue !== null && topValue === blockValue) {
		block.style.backgroundColor = blockColor
		block = null
		newBox = null
		newBoxvalue = null
	} else if (newBoxvalue !== null && topValue < blockValue) {
		block.style.backgroundColor = blockColor
		block = null
		newBox = null
		newBoxvalue = null
	}
}

/// Checks if all disks have been moved to the right-side box
function checkWin() {
	if ((box3.children.length === 4 && howMany === 4) || (box3.children.length === 5 && howMany === 5) || (box3.children.length === 6 && howMany === 6)) {
		win.style.display = 'flex'
		// box1.style.display = 'none'
		// box2.style.display = 'none'
		// box3.style.display = 'none'
		// extras.style.display = 'none'
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
	win.style.display = 'none'
	reset.style.display = 'none'
	extras.style.display = 'none'
	box1.style.display = 'none'
	box2.style.display = 'none'
	box3.style.display = 'none'
	
	choose.style.display = 'flex'

	stopTimer()
}




/// Timer
let seconds = 60

let myTimer;

function countDown() {
    function tick() {
        seconds--
        timer.innerHTML = seconds
        if( seconds > 0 ) {
            myTimer = setTimeout(tick, 1000)
        }
    }
    tick();
}

/// Reset Timer
function stopTimer() {
	clearTimeout(myTimer)
	seconds = 60
}





start()




























