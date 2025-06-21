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

function addtaskinDOM(text,index) {
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
    // Create edit button with pencil icon
    const editBtn = document.createElement("button");
    editBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#aaa" viewBox="0 0 24 24">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM21.41 6.34c.38-.38.38-1.01 
      0-1.39l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 
      3.75 3.75 1.83-1.83z"/>
    </svg>`;
    editBtn.classList.add("editbtn");

    //Edit logic
    editBtn.addEventListener("click", function () {
        texts.contentEditable = true;
        texts.focus();
        texts.style.outline = "1.5px dashed rgb(255, 255, 255)";
    });

    //  Save on Enter or blur
    function saveEditedText() {
        if (texts.textContent === "") return text;
        texts.contentEditable = false;
        texts.style.outline = "none";
        updateTaskInLocalStorage(index, texts.textContent);
  }

    texts.addEventListener("keydown", function (e) {
        

        if (e.key === "Enter") {
            e.preventDefault();
            saveEditedText();
        }
    });
    texts.addEventListener("blur", function () {
        texts.contentEditable = false;
        texts.style.outline = "none";
    });
    // Add checkbox and text to task
    input.appendChild(checkbox);
    input.appendChild(texts);
    input.appendChild(editBtn);
    // Insert before the Clear button
    const clearBtn = document.querySelector(".Clean");
    content.insertBefore(input, clearBtn);


    content.classList.add("visibletwo");

    //Enter key function 
    area.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();  // prevent newline
            task();
        }
    });

}


function saveTaskToLocalStorage(text) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(text);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function updateTaskInLocalStorage(index, newText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  if (index >= 0 && index < todos.length) {
    todos[index] = newText;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

function loadTasks() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((task, index) => {
    addtaskinDOM(task, index);
  });
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
