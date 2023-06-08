const form = document.getElementById("form");
const tasklist = document.getElementById("tasklist");
var array = [];
var globalId;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = document.getElementById("task").value;
  if (task.trim().length == 0) {
    alert("Enter Valid Task Name.");
    document.getElementById("task").value = "";
    return;
  }
  if (document.getElementById("submit").innerHTML == "Done") {
    let data = JSON.parse(localStorage.getItem("task"));
    for (let a of data) {
      if (a.id === globalId) {
        a.task = task;
        document.getElementById(a.id).children[1].innerHTML = a.task;
        document.getElementById("submit").classList.remove("btn");
        document.getElementById("submit").innerHTML = "+";
        document.getElementById("task").value = "";
        break;
      }
    }
    localStorage.removeItem("task");
    localStorage.setItem("task", JSON.stringify(data));
    return;
  }
  const id = Date.now();
  const obj = {
    id,
    task,
    status: false,
  };
  if (localStorage.getItem("task") == null) {
    array.push(obj);
    localStorage.setItem("task", JSON.stringify(array));
  } else {
    var x = JSON.parse(localStorage.getItem("task"));
    console.log(x);
    x.push(obj);
    localStorage.setItem("task", JSON.stringify(x));
    console.log(x);
  }
  const data = `<li class="list" id="${id}">
    <div>
      <input type="checkbox" onclick="checkItem(${id})"/>
    </div>
    <div class="content">${task}</div>
    <div style="align-self : flex-start"><img src="./icons8-edit.svg" width="30" height="30" id="edit" onclick='edit(${id})'/></div>
    <div style="align-self : flex-start"><img src="./icons8-delete.svg" width="30" height="30"  id='remove' onclick='remove(${id})'/></div>
  </li> `;
  document.getElementById("task").value = "";
  tasklist.insertAdjacentHTML("beforeend", data);
});
const remove = (id) => {
  document.getElementById(id).remove();
  let x = JSON.parse(localStorage.getItem("task"));
  var index = 0;
  for (let a of x) {
    if (a.id === id) {
      x.splice(index, 1);
    }
    index++;
  }
  localStorage.removeItem("task");
  localStorage.setItem("task", JSON.stringify(x));
};
const checkItem = (id) => {
  const childs = document.getElementById(id);
  if (childs.querySelector("div input").checked) {
    let x = localStorage.getItem("task");
    x = JSON.parse(x);
    for (let i of x) {
      if (i.id === id) {
        i.status = true;
      }
    }
    localStorage.removeItem("task");
    localStorage.setItem("task", JSON.stringify(x));
    childs.querySelectorAll("div")[1].style.textDecoration = "line-through";
  } else {
    childs.querySelector("div input").checked = false;
    childs.querySelectorAll("div")[1].style.textDecoration = "none";
    let x = localStorage.getItem("task");
    x = JSON.parse(x);
    for (let i of x) {
      if (i.id === id) {
        i.status = false;
      }
    }
    localStorage.removeItem("task");
    localStorage.setItem("task", JSON.stringify(x));
  }
};
const edit = (id) => {
  let data = JSON.parse(localStorage.getItem("task"));
  for (let a of data) {
    if (a.id === id) {
      globalId = a.id;
      document.getElementById("task").value = a.task;
      document.getElementById("submit").innerHTML = "Done";
      document.getElementById("submit").classList.add("btn");
    }
  }
};
const show = () => {
  if (localStorage.getItem("task")) {
    const data = JSON.parse(localStorage.getItem("task"));
    var data1 = "";
    for (let a of data) {
      data1 =
        data1 +
        `<li class="list" id="${a.id}">
             <div>
                 <input type="checkbox" onclick="checkItem(${a.id})" ${
          a.status ? "checked" : ""
        }/>
               </div>
               <div class="content ${a.status ? "active" : ""}">${a.task}</div>
               <div><img src="./icons8-edit.svg" width="30" height="30" id="edit" onclick='edit(${
                 a.id
               })'/></div>
               <div><img src="./icons8-delete.svg" width="30" height="30"  id='remove' onclick='remove(${
                 a.id
               })'/></div>
             </li> `;
    }
    tasklist.insertAdjacentHTML("afterbegin", data1);
  }
};
show();
