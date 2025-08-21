if (!localStorage.getItem("screenWidth")) {
    //check if screenWidth is not set
    localStorage.setItem("screenWidth", window.screen.width);
}

const screenWidth = localStorage.getItem("screenWidth"); // get screen width
document.documentElement.style.setProperty("--screen-width", screenWidth);
// set screen width by getting screenWidth property from style.css
