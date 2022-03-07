const container = document.getElementById("app");
const searchBox = document.getElementById("search");
const addNoteBtn = container.querySelector(".btn--add-note");
const retrieveBoardBtn = container.querySelector(".btn--retrieve-board");

//get notes from local storage, return empty array if none
function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes") || "[]");
}

//save notes to local storage
function saveNotes(notes) {
  localStorage.setItem("stickynotes", JSON.stringify(notes));
}

//display notes
function displayNotes() {
  //get notes from local storage
  const allNotes = getNotes();

  //create note element, insert each into html
}
