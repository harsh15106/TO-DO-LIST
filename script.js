let area = document.getElementById('area');
let content = document.getElementById('container');

// Load todos on page load
window.onload = function () {
    loadTasks();
};

function task() {
    const text = area.value.trim();
    if (text === "") return;

    addtaskinDOM(text);
    saveTaskToLocalStorage(text);

    area.value = ""; // clear input after submission
}

function addtaskinDOM(text) {
    // Create task container
    const input = document.createElement("div");
    input.className = "todos";

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Create text span
    const texts = document.createElement("span");
    texts.textContent = text;
    texts.style.marginLeft = "10px";

    // Add checkbox and text to task
    input.appendChild(checkbox);
    input.appendChild(texts);

    // Insert before the Clear button
    const clearBtn = document.querySelector(".Clean");
    content.insertBefore(input, clearBtn);

    content.classList.add("visible");
}

function saveTaskToLocalStorage(text) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []; // FIXED: fallback to []
    todos.push(text);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTasks() {
    let todos = JSON.parse(localStorage.getItem("todos")) || []; // FIXED: fallback to []
    todos.forEach(task => addtaskinDOM(task)); // FIXED: correct function name
}

function cleartask() {
    // Remove all task elements
    document.querySelectorAll(".todos").forEach(task => task.remove());

    // Clear localStorage
    localStorage.removeItem("todos");

    // Hide container if needed
    content.classList.remove("visible");
}
