//*     Main JavaScript

// Call convertTo169() on page load
window.onload = convertTo169();

// Get screen width and height
const defaultWidth = innerWidth - 8;
const defaultHeight = innerHeight - 8;

// Check if convertTo169() was called or width and height were stored previously
if (
    !localStorage.getItem("screenWidth") ||
    !localStorage.getItem("screenHeight")
) {
    localStorage.setItem("screenWidth", defaultWidth + "px");
    localStorage.setItem("screenHeight", defaultHeight + "px");
}

// Apply stored screen width as a CSS variable
const screenWidth = localStorage.getItem("screenWidth");
const screenHeight = localStorage.getItem("screenHeight");
document.documentElement.style.setProperty("--screen-width", screenWidth);
document.documentElement.style.setProperty("--screen-height", screenHeight);

//# functions
//* Convert to 16:9 ratio
function convertTo169() {
    // Get screen size
    let scrWidth = window.innerWidth;
    let scrHeight = window.innerHeight;

    // Define required ratio
    let requiredRatio = (16 / 9) * 1.105; // 110.5% of 16:9 ratio

    // Current ratio
    let currentRatio = scrWidth / scrHeight;

    // Define new width and height variables
    let newWidth, newHeight;

    // Check if screen is wider(if) or taller(else)
    if (currentRatio > requiredRatio) {
        newHeight = scrHeight;
        newWidth = newHeight * requiredRatio;
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
        newHeight = newWidth * requiredRatio;
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

//# Debug functions
//? Debug: Override screen width (Console Command)
function overrideWidth(newWidth) {
    if (newWidth == null) {
        // Check if input is empty
        console.log("Error empty width input");
        return;
    } else if (newWidth == "Reset") {
        // Check if user wants to reset width
        newWidth = defaultWidth;
    }
    // Set new width
    const overriddenWidth = newWidth + "px";
    localStorage.setItem("screenWidth", overriddenWidth);
    document.documentElement.style.setProperty(
        "--screen-width",
        overriddenWidth
    );

    console.log("Screen width overridden to: " + overriddenWidth);
    console.log("Default screen width is: " + screenWidth);
}
