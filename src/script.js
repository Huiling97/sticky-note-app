const container = document.getElementById("app");
const displayNotesContainer = container.querySelector(".note-container");
const searchBox = document.getElementById("search");
const addNoteBtn = container.querySelector(".btn--add-note");
const retrieveBoardBtn = container.querySelector(".btn--retrieve-board");

displayNotes(); //automatically displays notes on load

retrieveBoardBtn.addEventListener('click', () => displayNotes());
addNoteBtn.addEventListener('click', () => addNote());

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
  allNotes.forEach(note => {
    const noteElement = createNoteElement(note.id, note.title, note.body);
    displayNotesContainer.insertAdjacentElement('beforeend', noteElement);
  })
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
