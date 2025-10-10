const toggleCheckbox = document.getElementById('toggleCheckbox');
const modeText = document.getElementById("modeText");
// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  toggleCheckbox.checked = true;
  modeText.textContent = "Dark Mode"; 
} else {
  toggleCheckbox.checked = false; 
  modeText.textContent = "Light Mode"; 
}

// Listen for toggle
toggleCheckbox.addEventListener("change", () => {
  if (toggleCheckbox.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    modeText.textContent = "Dark Mode";
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    modeText.textContent = "Light Mode";
  }
  
});
// Select the button and the card container
const addButton = document.getElementById("addCardBtn");
const mainSection = document.getElementById("MainID");

// Example data for new cities
const newCities = [
  {
    name: "Madrid",
    desc: "Capital City Of Spain",
    img: "./madrid.jpg"
  },
  {
    name: "Tokyo",
    desc: "Capital City Of Japan",
    img: "./tokyo.jpg"
  },
  {
    name: "Abu Dhabi",
    desc: "Capital City Of United Arab Emirates",
    img: "./Abu Dhabi.jpg"
  },
  {
    name: "Amman",
    desc: "Capital City Of Jordan",
    img: "./Amman.jpg"

  }
];


let currentIndex = 0;

// When the button is clicked
addButton.addEventListener("click", function () {

  // Use a loop but break after adding one city
  for (let i = currentIndex; i < newCities.length; i++) {
    const city = newCities[i];

    // Create a new card
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${city.img}" alt="${city.name}">
      <h2>${city.name}</h2>
      <p>${city.desc}</p>
      <button>Click Here</button>
    `;

    // Add the card to the page
    mainSection.appendChild(card);

    // Move index forward
    currentIndex++;

    // Break the loop after adding one card only
    break;
  }

  // Disable the button when all cities are added
  if (currentIndex >= newCities.length) {
    addButton.disabled = true;
    addButton.textContent = "All Cities Added!";
  }
});

