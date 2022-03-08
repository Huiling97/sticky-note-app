const container = document.getElementById("app");
const displayNotesContainer = container.querySelector(".note-container");
const searchBox = document.getElementById("search");
const addNoteBtn = document.getElementById("btn--add-note");
const retrieveBoardBtn = document.getElementById("btn--retrieve-board");

displayNotes(); //automatically displays notes on load

retrieveBoardBtn.addEventListener('click', () => {
  displayNotes();
  searchBox.value = "";
});
addNoteBtn.addEventListener('click', () => addNote());
searchBox.addEventListener('input', (e) => searchNotes(e));

//get notes from local storage, return empty array if none
function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes") || "[]");
}

//save notes to local storage
function saveNotes(notes) {
  localStorage.setItem("stickynotes", JSON.stringify(notes));
}

//display notes
function displayNotes(searchedNotes) {
  //clear board if there are noets
  if (displayNotesContainer.firstChild != null) {
    clearBoard();
  }

  let allNotes;

  //if searching notes, return search results
  if (searchedNotes) {
    allNotes = searchedNotes;
  } else {
    //else, return all notes
    allNotes = getNotes();
  }
  //create note element, insert each into html
  allNotes.forEach(note => {
    const noteElement = createNoteElement(note.id, note.title, note.body);
    displayNotesContainer.insertAdjacentElement('beforeend', noteElement);
  })
}

//clear board
function clearBoard() {
  while (displayNotesContainer.firstChild) {
    displayNotesContainer.removeChild(displayNotesContainer.firstChild);
  }
}

//create note element
function createNoteElement(id, titleContent, bodyContent) {
  const noteContainer = document.createElement("div");
  const noteTitle = document.createElement("input");
  const noteBody = document.createElement("textarea");
  const deleteBtn = document.createElement("button");

  noteContainer.classList.add("note");
  noteContainer.append(noteTitle, noteBody, deleteBtn);

  noteTitle.value = titleContent;
  noteTitle.placeholder = "Your title";
  noteTitle.classList.add('note-title');

  noteBody.value = bodyContent;
  noteBody.placeholder = "Your Content";
  noteBody.classList.add('note-body');
  noteBody.setAttribute('cols', 20);
  noteBody.setAttribute('rows', 8);

  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("btn-delete-note");

  noteContainer.addEventListener('change', () => updateNote(id, noteTitle.value, noteBody.value));
  deleteBtn.addEventListener("click", () => deleteNote(id, noteContainer));

  return noteContainer;
}

//add note to html
function addNote() {
  //get all notes
  const allNotes = getNotes();

  //create new note element
  const newNoteObj = {
    id: Math.floor(Math.random() * 10000),
    title: "",
    body: ""
  };
  const newNote = createNoteElement(newNoteObj.id, newNoteObj.title, newNoteObj.body);

  //add new note element into html
  displayNotesContainer.insertAdjacentElement('beforeend', newNote);

  //add and save new note object to all notes
  allNotes.push(newNoteObj);
  saveNotes(allNotes);
}

//update note
function updateNote(id, newTitleContent, newBodyContent) {
  //get all notes
  const allNotes = getNotes();

  //filter out the note to update
  const updatedNote = allNotes.filter(note => note.id === id)[0];

  //update note with new content
  updatedNote.title = newTitleContent;
  updatedNote.body = newBodyContent;

  //save notes
  saveNotes(allNotes);
}

//delete note
function deleteNote(id, noteElement) {
  //get all notes
  const allNotes = getNotes();

  //filter out all except deleted note
  const remainingNotes = allNotes.filter(note => note.id !== id);

  //save all notes
  saveNotes(remainingNotes);

  //remove deleted note element from html
  displayNotesContainer.removeChild(noteElement);
}

//search notes
function searchNotes(e) {
  //get input
  const searchValue = e.target.value.toLowerCase();

  //check for valid input
  if (searchValue && searchValue.trim().length > 0) {
    //get all notes
    const allNotes = getNotes();

    //filter out the searched note and display
    const searchedNotes = allNotes.filter(note => note.title.toLowerCase().startsWith(searchValue) || note.body.toLowerCase().startsWith(searchValue));
    displayNotes(searchedNotes);
  } else {
    //if invalid input, display all notes
    displayNotes();
  }
}
