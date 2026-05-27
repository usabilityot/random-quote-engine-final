/**
 * Full-Stack Fetch Sandbox Core Script
 */

// --- GLOBAL DEVELOPMENT SETTINGS ---
const ERROR_MODE = "screen"; 

// Typography configuration rules

// Typography configuration rules (Fixed with proper CSS string formats)
const fonts = [
  "'Qwitcher Grypen', cursive", 
  "'Tulpen One', sans-serif", 
  "'Shadows Into Light', cursive"
];

var rotating = 0; // Tracks which font index to apply next

// ❌ REMOVED the broken event listener from here

function getRandomQuote() {
  clearDisplayErrors();

  fetch("https://newmanix.com/classes/it102/random_quotes.php")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error Status: ${res.status}`);
      }
      return res.text();
    })
    .then((data) => {
      const quoteContainer = document.getElementById("result");
      quoteContainer.innerHTML = data;

      // --- TYPOGRAPHY LOOP ROTATION ---
      quoteContainer.style.fontFamily = fonts[rotating];
      rotating = (rotating + 1) % fonts.length; 
      
      // --- TRANSITION CONTROLLER ---
      quoteContainer.classList.remove("fade-in");
      void quoteContainer.offsetWidth; 
      quoteContainer.classList.add("fade-in"); 
    })
    .catch((err) => {
      handleRoutingError(err);
    });
}

// --- AUTOMATION ENGINE ---
document.addEventListener("DOMContentLoaded", () => {
    //  ✅ MOVED HERE: Element safely exists now!
    document.getElementById("fetchData").addEventListener("click", getRandomQuote);

    // 1. Run the function immediately when the DOM layout is loaded stable
    getRandomQuote(); 
    
    // 2. Set an infinite recurring timer loop (5000ms = 5 seconds)
    setInterval(getRandomQuote, 5000);
});

/**
 * Dispatches errors to the chosen target based on configuration
 */
function handleRoutingError(error) {
  const errorMessage = `⚠️ FETCH FAILURE DETAILS:\n-------------------------\nMessage: ${error.message}\nType: ${error.name}`;
  
  if (ERROR_MODE === "screen") {
    const errorBox = document.getElementById("error-display");
    errorBox.textContent = errorMessage;
    errorBox.style.display = "block";
  } else {
    console.error("❌ AJAX Routing Error:", error);
  }
}

/**
 * Resets the visual layout state before firing a clean request
 */
function clearDisplayErrors() {
  const errorBox = document.getElementById("error-display");
  if (errorBox) { // Added a quick safety check
    errorBox.textContent = "";
    errorBox.style.display = "none";
  }
}