

const list = document.querySelector("#taskList");
const input = document.querySelector("#taskInput");
const btn = document.querySelector("#btn");
const table = document.querySelector("#tableBody");


document.getElementById("taskInput").addEventListener("change", function () {
  let fileNameDisplay = document.getElementById("fileName");
  if (this.files.length > 0) {
      fileNameDisplay.textContent = this.files[0].name;
  } else {
      fileNameDisplay.textContent = "No file chosen";
  }
});


function addTodo(taskData) {
  
  document.querySelector(".main-table").style.display = "table-header-group";

  let { fileName, status, createdDate, createdTime } = taskData;


  const tr = document.createElement("tr");


  //***************** created a checkbox ********************************//
  const tdInput = document.createElement("td");
  const inputCheck = document.createElement("input");
  inputCheck.type = "checkbox";
  tdInput.appendChild(inputCheck);
  tr.appendChild(tdInput);


  //******************created and assign document name *******************//
  const tdTittle = document.createElement("td");
  const docTittle = document.createElement("p");
  docTittle.innerText = fileName;
  docTittle.classList.add("d-name");
  tdTittle.appendChild(docTittle);
  tr.appendChild(tdTittle);


  //**************** created status td assign ***********************//
  const tdStatus = document.createElement("td");
  const statusElement = document.createElement("span");
  if (status == "signing") {
    statusElement.innerText = "Needs Signing";
    statusElement.classList.add("status", "needs-sign");
  } else if (status == "Pending") {
    statusElement.innerText = "Pending";
    statusElement.classList.add("status", "pending");
  } else {
    statusElement.innerText = "Completed";
    statusElement.classList.add("status", "completed");
  }
  tdStatus.appendChild(statusElement);
  tr.appendChild(tdStatus);

  

  // *********************** created Modified_at *****************************//
  const tdDate = document.createElement("td");
  const createDate = document.createElement("span");
  const br = document.createElement("br");
  createDate.textContent = createdDate;
  createDate.appendChild(br);
  createDate.appendChild(document.createTextNode(createdTime));
  createDate.classList.add("time-color");
  createDate.style.marginRight = "60px";
  tdDate.appendChild(createDate);
  tr.appendChild(tdDate);



  //******************* created a buttons-> delete and download..*********************************/
  const tdLastCol = document.createElement("td");
  const lastCol = document.createElement("div");
  const lastColButton = document.createElement("div");
  const button = document.createElement("button");
  const lastColAction = document.createElement("div");
  const lastColImage = document.createElement("img");
  lastCol.classList.add("last-col");
  lastColButton.classList.add("last-col-button");
  button.classList.add("btn", "btn-color");
  if (status == "signing") {
    button.innerText = "Sign-in";
  } else if (status == "Pending") {
    button.innerText = "Preview";
  } else {
    button.innerText = "Download PDF";
  }
  lastColButton.appendChild(button);
  lastCol.appendChild(lastColButton);

  lastColAction.classList.add("action");
  const btnDelete = document.createElement('button');
  // btnDelete.innerText = "Delete";
  btnDelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
  btnDelete.classList.add('btn-1', 'lastColDeleteBtn');
  lastColAction.appendChild(btnDelete);
  lastCol.appendChild(lastColAction);

  tdLastCol.appendChild(lastCol);
  tr.appendChild(tdLastCol);


  // ************appending the row to table ***********//
  table.appendChild(tr);
}

document.getElementById("addTask").addEventListener("click", () => {
  document.querySelector(".popup").style.cssText = `display:flex`;
});

document.querySelector(".close-btn").addEventListener("click", () => {
  document.querySelector(".popup").style.cssText = `display:none`;
});


//*********** delete *************/
document.querySelector("table").addEventListener("click", (event) => {
  if (event.target.closest(".lastColDeleteBtn")) {
      event.stopPropagation();
      
      let row = event.target.closest("tr");
      let fileName = row.querySelector(".d-name").innerText; 

      //****************** remove the row from UI *****************//
      row.remove();

      // ********************** remove from localStorage*************//
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(task => task.fileName !== fileName);
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});


 

document.querySelector(".submit-btn").addEventListener("click", (event) => {
  let fileInput = document.getElementById("taskInput");
  let statusChecked = document.querySelector('input[name="status"]:checked');

  if (!fileInput.files.length) {
    alert("Please select a file.");
    return;
  }

  if (!statusChecked) {
    alert("Please select a status.");
    return;
  }

  // Get current date and time
  const date = new Date().toLocaleDateString();
  const hr = new Date().getHours();
  const min = new Date().getMinutes();
  const time = `${hr > 12 ? hr % 12 : hr}:${min} ${hr > 12 ? "pm" : "am"}`;

  let taskData = {
    fileName: fileInput.files[0].name,
    status: statusChecked.value,
    createdDate: date,
    createdTime: time
  };

  // Save the task data in localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskData);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  addTodo(taskData); 

  fileInput.value = ""
  let fileNameDisplay = document.getElementById("fileName");
  fileNameDisplay.innerText="No file chosen";

  document.querySelector(".popup").style.cssText = `display:none`;

});

//*************** load tasks from localStorage on page load*********//
window.onload = function() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    addTodo(task);  
  });
};



// ***************** search the document ********************************//
document.getElementById('searchDocument').addEventListener("input", function() {
  let filterValue = this.value.toLowerCase();
  let rows = document.querySelectorAll("#tableBody tr"); // Select all table rows
  console.log(filterValue);
  
  rows.forEach(row => {
      console.log(row);
      
      let docName = row.querySelector(".d-name").innerText.toLowerCase(); // Get document name
      if (docName.includes(filterValue)) {
          row.style.display = ""; // Show the row if it matches the filter
      } else {
          row.style.display = "none"; // Hide the row if it doesn't match
      }
      console.log(docName);
      
  });
});










