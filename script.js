
/// Makes array of the 3 boxes
let box = document.querySelectorAll('.box')

let block = null
let newBox = null
let newBoxvalue = null
let blockValue = null
let topValue = null

/// Makes each box clickable
for (let i = 0; i < box.length; i++) {
	box[i].addEventListener('click', moveBlock)
}

/// Selects the top block in the selected box
function moveBlock(event) {
	if (block === null && (event.target === box[0].firstElementChild || event.target === box[1].firstElementChild || event.target === box[2].firstElementChild)) {
		block = event.target
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

function compare() {
	if (newBoxvalue === null) {
		newBox.appendChild(block)
		block.style.backgroundColor = 'black'
		block = null
		newBox = null
		newBoxvalue = null
	} else if (newBoxvalue !== null && topValue > blockValue) {
		newBox.insertBefore(block, newBox.firstElementChild)
		block.style.backgroundColor = 'black'
		block = null
		newBox = null
		newBoxvalue = null
	} else if (newBoxvalue !== null && topValue === blockValue) {
		block.style.backgroundColor = 'black'
		block = null
		newBox = null
		newBoxvalue = null
	} else if (newBoxvalue !== null && topValue < blockValue) {
		block.style.backgroundColor = 'black'
		block = null
		newBox = null
		newBoxvalue = null
	}
}















