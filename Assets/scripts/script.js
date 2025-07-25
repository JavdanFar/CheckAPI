import { GBI } from "./lib.js"

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

const paramsTableBody = GBI("paramsTableBody");

paramsTableBody.addEventListener("keyup", function (e) {
    if (e.target.classList.contains("apiInput")) {
        const currentRow = e.target.closest("tr")
        const isLastRow = currentRow === paramsTableBody.lastElementChild
        const checkBox = currentRow.querySelector("td:first-child input[type='checkbox']")
        if (isLastRow && e.target.value.trim() !== "") {
            checkBox.checked = true;
            addTableRow()
        } else if (e.target.value.trim() === "" && paramsTableBody.rows.length > 1 && !isLastRow) {
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
    <td class="col1"><input type="checkbox" /></td>
    <td class="col2">
      <input class="apiInput" type="text" placeholder="key" />
    </td>
    <td class="col3">
      <input type="text" placeholder="value" />
    </td>
    `;
    paramsTableBody.appendChild(tr);
}

paramsTableBody.addEventListener("click", function (e) {
    if (e.target.classList[0] === "deleteRowBTN" || e.target.classList[1] === "fa-trash-xmark") {
        const row = e.target.closest("tr");
        console.log(row)
        if (row && paramsTableBody.rows.length > 1) {
            row.remove();
            makeQuery()
        }
    }
});


// =======***======= Get Method Form Section =======***=======

const urlForm = GBI("urlForm");
const sendBTN = GBI("sendBTN");
let urlInput = GBI("urlInput");
const httpMethods = GBI("httpMethods");

urlForm.onsubmit = (e) => {
    e.preventDefault();
}

function fetchAPI(e) {
    let paramsResponse = GBI("paramsResponse")
    if (urlInput.value.trim() === "") {
        alert("Please enter a valid URL");
        return;
    }

    sendBTN.disabled = true;
    sendBTN.innerText = 'SENDING';
    paramsResponse.innerText = "Loading...";

    fetch(urlInput.value, {
        method: httpMethods.value,
    })
        .then(response => response.text())
        .then((res) => {
            paramsResponse.innerText = res
        }).catch(err => paramsResponse.innerText = err.message).finally(() => {
            sendBTN.disabled = false;
            sendBTN.innerText = 'SEND';
        });
};

sendBTN.addEventListener("click", fetchAPI)

urlInput.onkeyup = (e) => {
    if (e.key === "Enter") {
        fetchAPI();
    }
}


paramsTableBody.addEventListener("keyup", makeQuery)

function makeQuery() {
    const inputs = paramsTableBody.querySelectorAll("input[type=text]");
    const params = [];

    for (let i = 0; i < inputs.length; i += 2) {
        let apiKey = ""
        let apiValue = ""
        if (inputs[i] !== "") {
            apiKey = inputs[i].value
        }
        if (inputs[i + 1] !== "") {
            apiValue = inputs[i + 1].value
        }

        if (apiKey !== "") {
            let sign = (params.length === 0) ? "?" : "&"
            params.push(sign + apiKey + "=" + apiValue)
        }
    }

    const baseUrl = urlInput.value.split("?")[0];

    urlInput.value = baseUrl + params.join("");
}

// =======***======= Radio Section =======***=======

// const noneRadio = GBI("noneRadio")
// const formDataRadio = GBI("formDataRadio")
// const jsonRadio = GBI("jsonRadio")

const nonePage = GBI("nonePage")
const formDataPage = GBI("formDataPage")
const jsonPage = GBI("jsonPage")

let radios = document.getElementsByName("bodyRadio")
radios.forEach((radio) => {
    radio.addEventListener("input", function (e) {
        switch (e.target.id) {
            case "noneRadio":
                nonePage.style.display = "block"
                formDataPage.style.display = "none"
                jsonPage.style.display = "none"
                break;

            case "formDataRadio":
                nonePage.style.display = "none"
                formDataPage.style.display = "block"
                jsonPage.style.display = "none"
                break;

            case "jsonRadio":
                nonePage.style.display = "none"
                formDataPage.style.display = "none"
                jsonPage.style.display = "block"
                break;

            default:
                nonePage.style.display = "block"
                formDataPage.style.display = "none"
                jsonPage.style.display = "none"
        }
    })
})


// =======***======= JSON input Section =======***=======
const jsonInput = document.getElementById("jsonInput");
const lineNumbers = document.getElementById("lineNumbers");

function updateLineNumbers() {
    const lines = jsonInput.value.split("\n").length;
    let result = "";
    for (let i = 1; i <= lines; i++) {
        result += i + "\n";
    }
    lineNumbers.innerText = result;
}

jsonInput.addEventListener("input", updateLineNumbers);

updateLineNumbers();