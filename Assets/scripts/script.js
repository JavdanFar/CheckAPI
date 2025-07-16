import {GBI} from "./lib.js"

// =======***======= DarkMode Section =======***=======

const themeBTN = GBI("themeBTN");
const logo = GBI("logo")
const theme = localStorage.getItem("theme")

document.body.dataset.theme = theme || "light";
if (theme === "dark") {
    themeIcon.classList = ("fa fa-solid fa-sun")
    logo.src = "./Assets/logo/logo-white.png"
}

themeBTN.addEventListener("click", () => {
    const body = document.body.dataset;
    const themeIcon = GBI("themeIcon")
    if (body.theme === "dark") {
        localStorage.setItem("theme", "light");
        body.theme = localStorage.getItem("theme");
        themeIcon.classList.replace("fa-sun", "fa-moon")
        logo.src = "./Assets/logo/logo-dark.png"
    } else {
        localStorage.setItem("theme", "dark");
        body.theme = localStorage.getItem("theme");
        themeIcon.classList.replace("fa-moon", "fa-sun")
        logo.src = "./Assets/logo/logo-white.png"
    }
});


// =======***======= Tabs Section =======***=======

const paramsBTN = GBI("paramsBTN")
const headersBTN = GBI("headersBTN")
const bodyBTN = GBI("bodyBTN")

const paramsTab = GBI("paramsTab")
const headersTab = GBI("headersTab")
const bodyTab = GBI("bodyTab")

const handleTab = function (tab, activeBTN) {
    paramsTab.style.display = "none"
    headersTab.style.display = "none"
    bodyTab.style.display = "none"

    tab.style.display = "flex"

    paramsBTN.classList.remove("active-btn");
    headersBTN.classList.remove("active-btn");
    bodyBTN.classList.remove("active-btn");

    activeBTN.classList.add("active-btn");
}

paramsBTN.addEventListener("click", () => {
    handleTab(paramsTab, paramsBTN)
})
headersBTN.addEventListener("click", () => {
    handleTab(headersTab, headersBTN)
})
bodyBTN.addEventListener("click", () => {
    handleTab(bodyTab, bodyBTN)
})
handleTab(paramsTab, paramsBTN)


// =======***======= Params Section =======***=======

const tableBody = document.getElementById("tableBody");

tableBody.addEventListener("keyup", function (e) {
    if (e.target.classList.contains("apiInput")) {
        const currentRow = e.target.closest("tr")
        const isLastRow = currentRow === tableBody.lastElementChild
        currentRow.cl
        const checkBox = currentRow.querySelector("td:first-child input[type='checkbox']")
        if (isLastRow && e.target.value.trim() !== "") {
            checkBox.checked = true;
            addTableRow()
        } else if (e.target.value.trim() === "" && tableBody.rows.length > 1 && !isLastRow) {
            checkBox.checked = false;
            currentRow.remove()
        }

        const deleteBtnExists = currentRow.querySelector(".deleteRowBtn");
        if (!deleteBtnExists && e.target.value.trim() !== "") {
            const td = currentRow.querySelector("td:last-child");
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("deleteRowBtn");
            deleteBtn.innerHTML = `<i class="fa-regular fa-trash-xmark"></i>`;
            td.appendChild(deleteBtn);
        }
    }
});

function addTableRow() {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td><input type="checkbox" /></td>
    <td>
      <input class="apiInput" type="text" placeholder="key" />
    </td>
    <td>
      <input type="text" placeholder="value" />
    </td>
    `;
    tableBody.appendChild(tr);
}

tableBody.addEventListener("click", function (e) {
    if (e.target.classList[0] === "deleteRowBTN" || e.target.classList[1] === "fa-trash-xmark") {
        const row = e.target.closest("tr");
        console.log(row)
        if (row && tableBody.rows.length > 1) {
            row.remove();
        }
    }
});


// =======***======= Params Section =======***=======

const urlForm = GBI("urlForm");
const sendBTN = GBI("sendBTN");
let urlInput = GBI("urlInput");
const httpMethods = GBI("httpMethods");

urlForm.onsubmit = (e) => {
    e.preventDefault();
}

function fetchAPI(e) {
    let response = document.getElementById("response")
    if (urlInput.value.trim() === "") {
        alert("Please enter a valid URL");
        return;
    }

    sendBTN.disabled = true;
    sendBTN.innerText = 'SENDING';
    response.innerText = "Loading...";

    fetch(urlInput.value, {
        method: httpMethods.value,
    })
        .then(response => response.text())
        .then((res) => {
            response.innerText = res
        }).catch(err => response.innerText = err.message).finally(() => {
        sendBTN.disabled = false;
        sendBTN.innerText = 'SEND';
    });
};

sendBTN.addEventListener("click", fetchAPI)

document.onkeyup = (e) => {
    if (e.key === "Enter") {
        fetchAPI();
    }
}


tableBody.addEventListener("keyup", function (e) {
    const inputs = tableBody.querySelectorAll("input[type=text]");
    const params = [];
    inputs.forEach((input,index) => {
        let key = input.value
        let value = inputs[index + 1]?.value ?? '';
        params.push(`${key}=${value}`);
    })
    // let query = ``
    // urlInput.value = query;
    console.log(params);

})