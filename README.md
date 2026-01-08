MiniSoft Pad 

MiniSoft Pad is a lightweight, full‑stack productivity web application that allows users to securely create, manage, and organize **notes** and **to‑do lists** in one place. It is built with **vanilla JavaScript**, **Firebase Authentication**, and **Firebase Firestore**, focusing on simplicity, speed, and real‑world usability.

This project represents a complete end‑to‑end application: authentication, database design, user‑specific data, CRUD operations, and UI logic — all built from scratch.


FEATURES

 Authentication

* Email & password sign‑up and login
* Secure session handling using Firebase Authentication
* Password reset via email
* Automatic route protection (users can’t access dashboard when logged out)
* Logout functionality



Personalized Dashboard

* Displays a personalized greeting using the user’s **sign‑up name**
* Central hub for notes and to‑do lists



Notes Management

* Create notes with title and content
* Edit existing notes
* Delete notes with confirmation
* Notes are user‑specific (each user sees only their own notes)
* Notes are ordered by **most recent**
* Notes support:

  * Custom background color
  * Custom text color
  * Creation date display



To‑Do List Management

* Create to‑do tasks
* View tasks on the dashboard
* Tasks are user‑specific
* Simple and fast task tracking



Smart Date Handling

* Notes display **only the creation date** (no time)
* Firestore timestamps are properly converted to readable dates



Responsive Design

* Desktop and mobile friendly
* Clean UI with focused layout



Tech Stack

Frontend

* HTML5
* CSS3 (Desktop + Mobile styles)
* Vanilla JavaScript (ES Modules)

 Backend / Services

* Firebase Authentication
* Firebase Firestore (NoSQL database)

 Other Tools

* Font Awesome Icons
* Modular JavaScript file structure



Project Structure (Simplified)


MiniSoft Pad/

     index.html          # Login page
     signup.html         # Sign up page
     getpassword.html    # Recover password page
     dashboard.html      # Main dashboard
     writenote.html
     writetodo.html
     checknot.html
     notelist.html
     

    css/
     styles.css
     dashboard.css
     mobile.css

   
    js/
    ├── main.js         # Firebase initialization
    ├── auth.js         # Authentication logic
    ├── dashboard.js    # Notes & todos logic
    ├── writenote.js
    ├── writetodo.js
    └── showpassword.js
 
└── README.md




 How Authentication Works

1. User signs up using email and password
2. User’s name is saved using Firebase `displayName`
3. Firebase manages session state
4. `onAuthStateChanged`:

   * Redirects logged‑in users to dashboard
   * Prevents unauthenticated access to protected pages
5. Logout clears session and redirects to login page



Database Design (Firestore)

 Notes Collection

Each note document contains:

js
{
  title: String,
  content: String,
  bgColor: String,
  textColor: String,
  userId: String,
  createdAt: Timestamp
}


 To‑Do Collection

Each task is linked to the authenticated user via `userId`.



Key Concepts Demonstrated

* Modular JavaScript architecture
* Firebase Authentication workflows
* Firestore CRUD operations
* User‑specific data filtering (`where("userId", "==", currentUserId)`)
* Secure frontend‑only auth protection
* Date and timestamp handling
* DOM manipulation with dynamic rendering

---

Project Goals

MiniSoft Pad was built to:

* Practice real‑world full‑stack development
* Understand authentication deeply
* Learn Firestore data modeling
* Build confidence in JavaScript logic
* Create a usable productivity tool

---

Future Improvements

* User profile editing (change name)
* Search and filter notes
* Pin important notes
* Dark mode
* Cloud backup indicators
* Drag & drop reordering

---

Author

**Bayo Alabi**
Frontend / Full‑Stack JavaScript Developer (in growth)

---

Final Note

MiniSoft Pad is not a tutorial project — it is a **real application** built by solving real problems step by step. It demonstrates the ability to think, debug, design systems, and integrate external services.

This project marks a major milestone in the journey toward becoming a confident full‑stack developer.

