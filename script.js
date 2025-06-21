let area = document.getElementById('area');
let content = document.getElementById('container');
let box = document.getElementById('box');

function nextwindow() {
    let main = document.getElementsByClassName('welcomearea')[0];
    main.classList.add('go')
    let site = document.getElementsByClassName('mainsite')[0];
    site.classList.add('visibleone');
}

// Load todos on page load
window.onload = function () {
    loadTasks();
    const list = document.querySelectorAll(".todos");

    if (list.length > 0) {
        content.classList.add("visibletwo");
        box.classList.add("moved");
    }
};

function task() {
    const text = area.value.trim();
    if (text === "") return;

    addtaskinDOM(text);
    saveTaskToLocalStorage(text);

    area.value = ""; // clear input after submission
    box.classList.add('moved')
}
box.addEventListener("mousemove", function (e) {
  const rect = box.getBoundingClientRect();
  const x = e.clientX - rect.left + "px";
  const y = e.clientY - rect.top + "px";
  box.style.setProperty("--x", x);
  box.style.setProperty("--y", y);
});

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

    checkbox.addEventListener("change", function () {
    texts.classList.toggle("checked", checkbox.checked);
  });

    // Add checkbox and text to task
    input.appendChild(checkbox);
    input.appendChild(texts);

    // Insert before the Clear button
    const clearBtn = document.querySelector(".Clean");
    content.insertBefore(input, clearBtn);

    content.classList.add("visibletwo");

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
    content.classList.remove("visibletwo");
    box.classList.remove('moved')
}
