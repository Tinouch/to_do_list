
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function sanitizeInput(input) {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
}

function addTask() {
    const sanitizedValue = sanitizeInput(inputBox.value);
    if (sanitizedValue === '') {
        alert("Vous pouvez maintenant écrire !");
    } else {
        let li = document.createElement("li");
        li.textContent = sanitizedValue; // Sécurisé
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.textContent = "\u00d7"; // Sécurisé
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    const tasks = [];
    listContainer.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent, // Récupère uniquement le texte
            checked: li.classList.contains('checked') // Vérifie si la tâche est cochée
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text; // Sécurisé
        if (task.checked) li.classList.add('checked');
        let span = document.createElement("span");
        span.textContent = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

showTask();
