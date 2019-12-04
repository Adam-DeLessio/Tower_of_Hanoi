
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
	if (block === null && (event.target === boxes[0].firstElementChild || event.target === boxes[1].firstElementChild || event.target === boxes[2].firstElementChild)) {
		block = event.target
		block.style.backgroundColor = 'gray'
	} else if (block !== null && (event.target === boxes[0] || event.target === boxes[1] || event.target === boxes[2])) {
		
		event.target.insertBefore(block, event.target.firstElementChild)
		block.style.backgroundColor = 'black'
		block = null
	}
}


 



































