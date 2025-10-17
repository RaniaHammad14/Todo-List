const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const addBtn = document.getElementById("add-btn");

function addTask(event) {
  event.preventDefault();
  const newTask = todoInput.value;
  if (!newTask) {
    Swal.fire({
      title: "Please enter a task!",
      customClass: {
        popup: "my-alert-box", // add your own style class
        confirmButton: "my-alert-btn",
      },
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    });
  } else {
    const listItem = document.createElement("li");
    listItem.classList.add("todo-item");

    // left circle
    const circle = document.createElement("i");
    circle.classList.add("fa-regular", "fa-circle", "circle");

    // task text (in its own span)
    const taskText = document.createElement("span");
    taskText.textContent = newTask;
    taskText.classList.add("task-text");

    // right trash can
    const span = document.createElement("i");
    span.classList.add("fa-solid", "fa-trash-can", "close");

    // put it all together
    listItem.appendChild(circle);
    listItem.appendChild(taskText);
    listItem.appendChild(span);

    todoList.appendChild(listItem);
    todoInput.value = "";
    setTasks();
  }
}

addBtn.addEventListener("click", addTask);

// remove task on click on  the trash icon //
todoList.addEventListener("click", function (event) {
  if (event.target.classList.contains("close")) {
    event.target.parentElement.remove();
    setTasks();
  }
});

// reshape the clicked task afte completion //
todoList.addEventListener("click", function (event) {
  if (event.target.classList.contains("circle")) {
    // find the closest parent li (.todo-item) so i can access it and apply css on it and its contents
    const listItem = event.target.closest(".todo-item");
    // find the task text inside it
    const text = listItem.querySelector(".task-text");

    // change circle style
    event.target.classList.toggle("fa-regular");
    event.target.classList.toggle("fa-solid");
    if (event.target.classList.contains("fa-solid")) {
      text.style.textDecoration = "line-through";
      text.style.opacity = "0.7";
      event.target.style.color = "yellow";
    } else {
      event.target.style.color = "#281310";
      text.style.textDecoration = "none";
      text.style.opacity = "1";
    }
    setTasks();
  }
});

// delete all btn function //
const deleteBtn = document.querySelector(".delete-btn");
function deleteAllTasks() {
  const lis = document.querySelectorAll(".todo-item");
  if (lis.length > 0) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "my-confirm-btn",
        cancelButton: "my-cancel-btn",
        popup: "my-swal-box",
      },
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          lis.forEach((e) => {
            e.remove();
            setTasks();
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "No tasks has been deleted :)",
            icon: "error",
          });
        }
      });
  } else {
    Swal.fire({
      title: "You don't have any tasks to delete",
      customClass: {
        popup: "my-alert-box", // add your own style class
        confirmButton: "my-alert-btn",
      },
      showClass: {
        popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
      },
      hideClass: {
        popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
      },
    });
  }
  setTasks();
}

deleteBtn.addEventListener("click", deleteAllTasks);
//===================== LOCAL STORAGE ===============================//
function setTasks() {
  let savedTasks = localStorage.setItem("tasks", todoList.innerHTML);
}
function getTasks() {
  localStorage.getItem("tasks");
  const saved = localStorage.getItem("tasks");
  if (saved) {
    todoList.innerHTML = saved;
  }
}
getTasks();
