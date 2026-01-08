

//====FIREBASE BACKEND CRUD SETUP FOR NOTES AND TODOS=====

import { auth } from "./main.js";
import { db } from "./main.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";



// 🟢 WAIT UNTIL HTML IS READY
document.addEventListener("DOMContentLoaded", () => {



let currentUserId = null;

onAuthStateChanged(auth, (user) => {
  if (user) {

    const welcomeText = document.getElementById("welcomeUser");
    if (welcomeText) {
      welcomeText.textContent = `Welcome, ${user.displayName || "Friend"}!`;
    }
    currentUserId = user.uid;
    loadNotes();
    loadTodos();
  }
});


//====CREATE NOTES=======

async function createNote(title, content) {
  await addDoc(collection(db, "notes"), {
    title: title,
    content: content,
    bgColor: selectedBgColor,
    textColor: selectedTextColor,
    userId: currentUserId,
    createdAt: new Date()
  });
  loadNotes();
};



//====READ NOTES=====
async function loadNotes() {
  const q = query(
    collection(db, "notes"),
    where("userId", "==", currentUserId),
    orderBy("createdAt", "desc"),
    limit(5)
  
  );

  const snapshot = await getDocs(q);
  const notesDiv = document.getElementById("notesContainer");
  notesDiv.innerHTML = "";

  snapshot.forEach((docSnap) => {
    const note = docSnap.data();
    
    const createdDate = note.createdAt
  ? note.createdAt.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  : "";

    notesDiv.innerHTML += `
     <li class="note-box" style="background:${note.bgColor};color:${note.textColor}">  
         <div class="note-detail">
        <div class="note-head">
          <a href="checknote.html?id=${docSnap.id}">
            <h3 class="head">${note.title.substring(0, 50)}...</h3>
          </a>
           <small class="note-date">${createdDate}</small>

        </div>
        <div class="note-body">
          <a href="checknote.html?id=${docSnap.id}">
            <p class="body">${note.content.substring(0, 30)}...</p>
          </a>

          <a href="writenote.html?editId=${docSnap.id}">
            <button class="edit" onclick="editNote('${docSnap.id}','${note.title}','${note.content}')">Edit</button>
          </a>
          <i onclick="deleteNote('${docSnap.id}')" id="deleteNote" class="fa-solid fa-trash"></i>
        </div>
        </div>
      </li>
    `;
  });


};





//=====EDIT OR UPDATE NOTES=====

async function updateNote(noteId, newTitle, newContent) {
  await updateDoc(doc(db, "notes", noteId), {
    title: newTitle,
    content: newContent
  });
  loadNotes();
}

function editNote(id, title, content) {
  const newTitle = prompt("Edit title", title);
  const newContent = prompt("Edit content", content);
  if (newTitle && newContent) {
    updateNote(id, newTitle, newContent);
  }
};;



//====DELETE NOTES=====

// 🟢 Delete note
window.deleteNote = async function(noteId) {
  if (!confirm("Delete this note?")) return;
  await deleteDoc(doc(db, "notes", noteId));
  loadNotes();
};


});










