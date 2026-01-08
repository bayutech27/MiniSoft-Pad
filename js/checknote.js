import { db } from "./main.js";
import { doc, getDoc } from
"https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {

  const params = new URLSearchParams(window.location.search);
  const noteId = params.get("id");

  if (!noteId) {
    alert("No note selected");
    return;
  }

  await loadSingleNote(noteId);
});

async function loadSingleNote(noteId) {
  const noteRef = doc(db, "notes", noteId);
  const noteSnap = await getDoc(noteRef);

  if (!noteSnap.exists()) {
    alert("Note not found");
    return;
  }

  const note = noteSnap.data();

  document.getElementById("checkNote").innerHTML = `
    <h3 class="heading">${note.title}</h3>
    <p class="paragraph">${note.content}</p>

    <div class="note-body">
      <a href="writenote.html?editId=${noteId}">
        <button class="edit">edit</button>
      </a>

      <i class="fa-solid fa-trash" id="deleteNote"
         onclick="deleteNote('${noteId}')"></i>
    </div>
  `;
}
