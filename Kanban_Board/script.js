const containers = Array.from(document.querySelectorAll(".container"));
const cards = Array.from(document.querySelectorAll(".card"));

cards.forEach((card) => {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
});

containers.forEach((container) => {
  container.addEventListener("dragenter", dragEnter);
  container.addEventListener("dragover", dragOver);
  container.addEventListener("drop", dragDrop);
  container.addEventListener("dragleave", dragLeave);
});

function dragStart(e) {
  console.log("Drag Started");
  e.target.classList.add("dragging");
  e.dataTransfer.setData("text/plain", e.target.id);

  // Optional: set a custom drag image
  // e.dataTransfer.setDragImage(e.target, 0, 0);
}

function dragEnd(e) {
  console.log("Drag Ended");
  e.target.classList.remove("dragging");
}

function dragEnter(e) {
  e.preventDefault(); // necessary for drop to work
  this.classList.add("over");
}

function dragOver(e) {
  e.preventDefault(); // allow dropping
}

function dragLeave(e) {
  this.classList.remove("over");
}

function dragDrop(e) {
  e.preventDefault();
  this.classList.remove("over");

  const id = e.dataTransfer.getData("text/plain");
  const draggedCard = document.getElementById(id);

  // Avoid re-appending if already inside
  if (!this.contains(draggedCard)) {
    this.appendChild(draggedCard);
    console.log(`Dropped ${id} into ${this.id}`);
  } else {
    console.log(`${id} is already here`);
  }
}
