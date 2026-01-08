// ================================
// FIREBASE IMPORTS
// ================================
import { db, auth } from "./main.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";


// 🟢 WAIT UNTIL HTML IS READY
document.addEventListener("DOMContentLoaded", () => {

// ================================
// DOM ELEMENTS
// ================================
const taskInput = document.getElementById("task");
const addBtn = document.querySelector(".add-btn");
const todoContainer = document.getElementById("todoContainer");

// ================================
// AUTH STATE
// ================================
let currentUserId = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  currentUserId = user.uid;
  loadTodos();
});

// ================================
// CREATE TODO
// ================================
async function createTodo(title) {
  await addDoc(collection(db, "todos"), {
    title: title,
    completed: false,
    userId: currentUserId,
    createdAt: serverTimestamp()
  });
}

addBtn.addEventListener("click", async () => {
  const title = taskInput.value.trim();

  if (!title) return;

  await createTodo(title);
  taskInput.value = "";
});

// ================================
// LOAD TODOS (REAL-TIME)
// ================================
function loadTodos() {
  const q = query(
    collection(db, "todos"),
    where("userId", "==", currentUserId),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (snapshot) => {
    todoContainer.innerHTML = "";

    snapshot.forEach((docSnap) => {
      const todo = docSnap.data();

      const createdDate = todo.createdAt
  ? todo.createdAt.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  : "";


      const li = document.createElement("li");
      li.className = "task-list";

      li.innerHTML = `
        <div class="task-and-date">
        <h4 class="task" style="text-decoration:${todo.completed ? "line-through" : "none"}">
          ${todo.title}
        </h4>
         <small class="todo-date">${createdDate}</small>
        </div>
        <div class="task-actions">
          <button class="toggle-btn">
            ${todo.completed ? "Undo" : "Complete"}
          </button>
          <button class="edit-task" onclick="editTodo('${docSnap.id}', '${todo.title}')">Edit</button>
          <i id="deleteTask" class="fa-solid fa-trash delete-btn"></i>
        </div><hr class="todo-rule">
      `;

      // TOGGLE COMPLETE
      li.querySelector(".toggle-btn").addEventListener("click", async () => {
        await updateDoc(doc(db, "todos", docSnap.id), {
          completed: !todo.completed
        });
      });

      // DELETE TODO
      li.querySelector(".delete-btn").addEventListener("click", async () => {
        await deleteDoc(doc(db, "todos", docSnap.id));
      });

      todoContainer.appendChild(li);
    });
  });
}



// 🟢 Edit task 
window.editTodo = async function (id, oldTitle) {

  // Ask the user for a new title
  const newTitle = prompt("Edit your task:", oldTitle);

  // If user clicks Cancel or enters empty text
  if (!newTitle || newTitle.trim() === "") return;

  // Update the todo in Firestore
  await updateDoc(doc(db, "todos", id), {
    title: newTitle.trim(),
  });

};

});

