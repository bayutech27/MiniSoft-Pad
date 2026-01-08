import { db, auth } from "./main.js";
import { 
  collection, addDoc, doc, getDoc, updateDoc 
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// 🟢 DOM elements
const titleInput = document.getElementById("title");
const contentArea = document.getElementById("content");
const saveBtn = document.getElementById("save");
const clearBtn = document.getElementById("clear");
const whiteBtn = document.querySelector(".white");
const blueBtn = document.querySelector(".blue");
const goldBtn = document.querySelector(".gold");
const greenBtn = document.querySelector(".green");
const tealBtn = document.querySelector(".teal");

let currentUserId = null;
let selectedBgColor = "white";
let selectedTextColor = "black";

// 🟢 User authentication
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserId = user.uid;
    checkEditMode();
  } else {
    window.location.href = "index.html";
  }
});

// 🟢 Check if editing
const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get("editId");

async function checkEditMode() {
  if (!editId) return;

  const docRef = doc(db, "notes", editId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const note = docSnap.data();
    titleInput.value = note.title;
    contentArea.value = note.content;
    applyColor(note.bgColor, note.textColor);
    saveBtn.innerText = "Update Note";
  }
}

// 🟢 Color functions
function applyColor(bg, text) {
  selectedBgColor = bg;
  selectedTextColor = text;
  contentArea.style.backgroundColor = bg;
  contentArea.style.color = text;
}

whiteBtn.addEventListener("click", () => applyColor("white", "black"));
blueBtn.addEventListener("click", () => applyColor("steelblue", "black"));
goldBtn.addEventListener("click", () => applyColor("gold", "black"));
greenBtn.addEventListener("click", () => applyColor("green", "black"));
tealBtn.addEventListener("click", () => applyColor("teal", "black"));

// 🟢 Clear button
clearBtn.addEventListener("click", () => {
  titleInput.value = "";
  contentArea.value = "";
});

// 🟢 Save or update note
saveBtn.addEventListener("click", async () => {
  const title = titleInput.value.trim();
  const content = contentArea.value.trim();

  if (!title || !content) {
    alert("Title and content are required");
    return;
  }

  try {
    if (editId) {
      // Update existing note
      await updateDoc(doc(db, "notes", editId), {
        title,
        content,
        bgColor: selectedBgColor,
        textColor: selectedTextColor,
        updatedAt: new Date()
      });
      alert("Note updated successfully!");
    } else {
      // Create new note
      if (!currentUserId) return alert("You must be logged in to save a note.");
      await addDoc(collection(db, "notes"), {
        title,
        content,
        bgColor: selectedBgColor,
        textColor: selectedTextColor,
        userId: currentUserId,
        createdAt: new Date()
      });
      alert("Note created successfully!");
    }

    window.location.href = "dashboard.html";

  } catch (err) {
    console.error("Error saving note:", err);
    alert("Something went wrong. Try again.");
  }
});
