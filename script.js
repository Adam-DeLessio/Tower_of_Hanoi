
/// Array of the 3 boxes
let boxes = document.querySelectorAll('.box')

/// No blocks are selected
let block = null

/// Makes each box clickable
for (let i = 0; i < boxes.length; i++) {
	boxes[i].addEventListener('click', moveBlock)
}

/// Selects the top block in the selected box
function moveBlock(event) {
	if (block === null && (event.target === boxes[0].firstElementChild)) {
		block = event.target
		block.style.backgroundColor = 'gray'
	} else {

	}
}
















































