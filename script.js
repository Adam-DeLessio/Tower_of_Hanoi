
/// Makes array of the 3 boxes
let box = document.querySelectorAll('.box')

/// Empty variable that represents any block
let block = null
let blockValue = null

/// Makes each box clickable
for (let i = 0; i < box.length; i++) {
	box[i].addEventListener('click', moveBlock)
}

/// Selects the top block in the selected box
function moveBlock(event) {
	if (block === null && (event.target === box[0].firstElementChild || event.target === box[1].firstElementChild || event.target === box[2].firstElementChild)) {
		block = event.target
		block.style.backgroundColor = 'gray'
		blockValue = block.getAttribute('data-value')
	} else if (block !== null && (event.target === box[0] || event.target === box[1] || event.target === box[2])) {

		let newBox = event.target

		checkBox()

		event.target.insertBefore(block, event.target.firstElementChild)
		block.style.backgroundColor = 'black'
		block = null
		blockValue = null
	}
}


















