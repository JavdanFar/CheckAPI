import { GBI } from "./lib.js"

// =======***======= DarkMode Section =======***=======

const themeBTN = GBI("themeBTN");
const logo = GBI("logo")
const theme = localStorage.getItem("theme")

document.body.dataset.theme = theme || "light";
if (theme == "dark") {
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
    }
    else {
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

paramsBTN.addEventListener("click", () => { handleTab(paramsTab, paramsBTN) })
headersBTN.addEventListener("click", () => { handleTab(headersTab, headersBTN) })
bodyBTN.addEventListener("click", () => { handleTab(bodyTab, bodyBTN) })
handleTab(paramsTab, paramsBTN)

