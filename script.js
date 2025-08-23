//* ------------------- Main JavaScript -------------------

// Get browser screen width and height
const defaultWidth = innerWidth - 8;
const defaultHeight = innerHeight - 8;

// If screen dimensions not are saved in localStorage then calculate 16:9 ratio on load
if (
    !localStorage.getItem("screenWidth") ||
    !localStorage.getItem("screenHeight")
) {
    window.onload = convertTo169();
}

// Load previously saved theme, or set theme to dark mode if not perviously saved
if (!localStorage.getItem("theme")) {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
} else if (localStorage.getItem("theme") == "light") {
    setTheme("light");
    localStorage.setItem("theme", "light");
} else if (localStorage.getItem("theme") == "dark") {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
}

// Wait for Document Object Model (DOM) to load and then update all icons
document.addEventListener("DOMContentLoaded", updateAllIcons);

//! ------------------- Danger Zone -------------------
// Apply stored width/height from localStorage as CSS variables
// Ensures layout remains constant across reloads
const screenWidth = localStorage.getItem("screenWidth");
const screenHeight = localStorage.getItem("screenHeight");
document.documentElement.style.setProperty("--screen-width", screenWidth);
document.documentElement.style.setProperty("--screen-height", screenHeight);

//# ------------------- Functions -------------------

//* Convert to ~16:9 aspect ratio (with tolerance)
// Stores new dimensions in localStorage and updates CSS variables
function convertTo169() {
    // Get screen size
    let scrWidth = window.innerWidth;
    let scrHeight = window.innerHeight;

    // Define required ratio
    let requiredRatio = (16 / 9) * 1.225; // 122.5% of 16:9 ratio

    // Current ratio
    let currentRatio = scrWidth / scrHeight;

    // Define new width and height variables
    let newWidth, newHeight;

    // Check if screen is wider(if) or taller(else)
    if (currentRatio > requiredRatio) {
        newHeight = scrHeight;
        newWidth = Math.round(newHeight * requiredRatio);
    } else {
        newWidth = scrWidth;
        newHeight = newWidth / requiredRatio;
    }

    // Check if new width or height is out of bounds to prevent distortion
    if (newWidth > 1920) {
        newWidth = 1920;
        newHeight = newWidth / requiredRatio;
    } else if (newWidth < 900) {
        newWidth = 900;
        newHeight = Math.round(newWidth * requiredRatio);
    }

    //? Debug: Print new width and height
    console.log("New width is: " + newWidth);
    console.log("New height is: " + newHeight);

    // Store new width and height
    localStorage.setItem("screenWidth", newWidth + "px");
    localStorage.setItem("screenHeight", newHeight + "px");

    // Set new width and height
    document.documentElement.style.setProperty(
        "--screen-width",
        newWidth + "px"
    );
    document.documentElement.style.setProperty(
        "--screen-height",
        newHeight + "px"
    );
}

//* Get current theme from localStorage
function getTheme() {
    return localStorage.getItem("theme");
}

//* Set theme colors (light/dark) by updating CSS variables
// Also call icon update to apply themed icons
function setTheme(theme) {
    if (theme == "light") {
        localStorage.setItem("theme", "light");

        document.documentElement.style.setProperty("--bg-color", "#e0e0e0ff");
        document.documentElement.style.setProperty("--text-color", "#2e2e2e");
        document.documentElement.style.setProperty("--hr-color", "#bdbdbd");
        document.documentElement.style.setProperty(
            "--table-bg-color",
            "#ffffff"
        );
        document.documentElement.style.setProperty(
            "--info-bg-color",
            "#fff8d6"
        );
        document.documentElement.style.setProperty(
            "--info-text-color",
            "#2e2e2e"
        );
        document.documentElement.style.setProperty(
            "--input-caption-color",
            "rgba(37, 37, 37, 0.7)"
        );
    } else if (theme == "dark") {
        localStorage.setItem("theme", "dark");

        document.documentElement.style.setProperty("--bg-color", "#181a1b");
        document.documentElement.style.setProperty("--text-color", "#d5d3cf");
        document.documentElement.style.setProperty("--hr-color", "#e9e6f0");
        document.documentElement.style.setProperty(
            "--table-bg-color",
            "#252828"
        );
        document.documentElement.style.setProperty(
            "--info-bg-color",
            "#d5d3cf"
        );
        document.documentElement.style.setProperty(
            "--info-text-color",
            "#252828"
        );
        document.documentElement.style.setProperty(
            "--input-caption-color",
            "rgba(192, 192, 192, 0.7)"
        );
    } else {
        console.log("Invalid theme");
        console.log("Available themes: light, dark");
    }

    updateAllIcons();
}

//* Toggle between dark and light theme
// Called by theme button in the document
function toggleTheme() {
    console.log("Toggling theme");
    let theme = getTheme();
    if (theme == "light") {
        setTheme("dark");
    } else if (theme == "dark") {
        setTheme("light");
    }

    const themeButton = document.getElementById("mode");
    themeButton.src = setIconPath("theme-mode.png");
}

//* Update all icons on the page based on theme
// Loops through predefined IDs and replaces their src paths
function updateAllIcons() {
    const iconIDs = [
        "account",
        "buy-us-a-kofi",
        "cart",
        "home",
        "logo",
        "logo1",
        "support",
        "theme-mode",
    ];

    for (let i = 0; i < iconIDs.length; i++) {
        updateIcon(iconIDs[i], iconIDs[i] + ".png");
        console.log(iconIDs[i] + ", " + iconIDs[i] + ".png");
    }
}

//* Update a single icon element by ID
// Checks if element is null or not before applying new src path
function updateIcon(elementID, iconName) {
    const element = document.getElementById(elementID);
    if (!element) {
        console.warn(`No element with id="${elementID}" found`);
        return;
    }
    element.src = setIconPath(iconName);
    console.log(`Icon updated for #${elementID} → ${element.src}`);
}

//* Build the correct file path for an icon based on theme
// Returns full path in string
function setIconPath(iconName) {
    const theme = getTheme();

    let folderPath = "/images/icons/";

    if (theme == "light") {
        folderPath = folderPath + "light/";
        console.log("Light folder Path: " + folderPath);
    } else if (theme == "dark") {
        folderPath = folderPath + "dark/";
        console.log("Dark folder Path: " + folderPath);
    } else {
        console.log("Invalid theme");
        console.log("Available themes: light, dark");
    }

    console.log("Icon Path: " + folderPath);
    return folderPath + iconName;
}

//# ------------------- Debugging Functions -------------------

//? Debug: Directly set screen dimensions
function setScreenDimensions(width, height) {
    document.documentElement.style.setProperty("--screen-width", width + "px");
    document.documentElement.style.setProperty(
        "--screen-height",
        height + "px"
    );
}

//? Debug: Print current screen dimensions to console (from localStorage)
function getScreenDimensions() {
    console.log("Screen Dimensions are: " + screenWidth + " x " + screenHeight);
}

//? Debug: Override screen dimensions and save them in localStorage
function overrideScreenDimensions(newWidth, newHeight) {
    if (newWidth == null || newHeight == null) {
        // Check if input is empty
        console.log("Error empty input");
        return;
    } else if (newWidth == 0 || newHeight == 0) {
        resetScreenDimensions();
        return;
    }

    const overriddenWidth = newWidth + "px";
    const overriddenHeight = newHeight + "px";
    localStorage.setItem("screenWidth", overriddenWidth);
    localStorage.setItem("screenHeight", overriddenHeight);
    setScreenDimensions(overriddenWidth, overriddenHeight);

    console.log(
        "Screen Dimensions overridden to: " +
            overriddenWidth +
            " x " +
            overriddenHeight
    );
    console.log(
        "Default screen Dimensions are: " + screenWidth + " x " + screenHeight
    );
}

//? Debug: Reset stored dimensions back to default
function resetScreenDimensions() {
    localStorage.removeItem("screenWidth");
    localStorage.removeItem("screenHeight");
    setScreenDimensions(defaultWidth, defaultHeight);
}

//? Debug: Print all available commands
function help() {
    console.log("Available Commands:");
    console.log("convertTo169()");
    console.log("getTheme()");
    console.log("setTheme(theme) - theme: light, dark");
    console.log("toggleTheme()");
    console.log("updateAllIcons()");
    console.log(
        "updateIcon(elementID, iconName) - elementID: string (without #), iconName: string (without extension)"
    );
    console.log("setScreenDimensions(width, height)");
    console.log("getScreenDimensions()");
    console.log("overrideScreenDimensions(newWidth, newHeight)");
    console.log("resetScreenDimensions()");
}
