/*
function generateCards() {
    let main = document.getElementById("MainID");
    main.innerHTML = "";
    let count = document.getElementById("Count").value;
    count = parseInt(count);
    for (let i = 1; i <= count; i++) {
        let div = document.createElement("div");
        div.className = "card";
        div.style.backgroundColor = i % 2 === 0 ? "black" : "white";
        let h2 = document.createElement("h2");
        h2.innerHTML = "Card " + i;
        let button = document.createElement("button");
        button.innerHTML = "Click Here";

        let removeCard = document.createElement("button");
        removeCard.innerHTML = "Remove";
        removeCard.onclick = function RemoveCards() {
            div.remove();
        }
        let editCard = document.createElement("button");
        editCard.innerHTML = "Edit";
       editCard.onclick = function EditCards() {
       let nt = prompt("Enter your new text:", h2.innerHTML);
            h2.innerHTML = nt;
            
       }

        div.appendChild(editCard);
        div.appendChild(removeCard);
        div.appendChild(h2);
        div.appendChild(button);
        main.appendChild(div);

    }

    
}
 
*/
// --- GLOBAL: keep reference to the selected card DOM node ---
let selectedCard = null;

function generateCards() {
  const main = document.getElementById("MainID");
  main.innerHTML = "";

  let count = parseInt(document.getElementById("Count").value, 10);

  for (let i = 1; i <= count; i++) {
    const div = document.createElement("div");
    div.className = "card";
    div.style.backgroundColor = i % 2 === 0 ? "black" : "white";

    const h2 = document.createElement("h2");
    h2.textContent = "Card " + i;

    const button = document.createElement("button");
    button.textContent = "Click Here";

    const removeCard = document.createElement("button");
    removeCard.textContent = "Remove";
    removeCard.onclick = function () {
      if (selectedCard === div) selectedCard = null; // clear if removing selected
      div.remove();
    };

    // ----- Select this card for editing (ignore clicks on Remove) -----
    div.addEventListener("click", function (e) {
      if (e.target === removeCard) return;

      // clear previous selection highlight
      document.querySelectorAll(".card.__selected").forEach(c => {
        c.classList.remove("__selected");
        c.style.outline = "";
      });

      selectedCard = div;
      div.classList.add("__selected");
      div.style.outline = "3px dashed #007bff";
    });

    // build card
    div.appendChild(removeCard);
    div.appendChild(h2);
    div.appendChild(button);
    main.appendChild(div);
  }
}

// ----- Modal wiring (Bootstrap 4) -----
document.addEventListener("DOMContentLoaded", function () {
  const inputEl = document.getElementById("modalInput");
  const saveBtn = document.getElementById("modalSave");

  // When opening the modal, preload current title of the selected card
  $('#exampleModal').on('show.bs.modal', function () {
    const titleEl = selectedCard ? selectedCard.querySelector("h2") : null;
    inputEl.value = titleEl ? titleEl.textContent : "";
    setTimeout(() => inputEl && inputEl.focus(), 150);
  });

  // Save back to the selected card
  saveBtn.addEventListener("click", function () {
    if (!selectedCard) { 
      // Optional: alert('Select a card first');
      return; 
    }
    const titleEl = selectedCard.querySelector("h2");
    const newText = inputEl.value.trim();
    if (titleEl && newText !== "") {
      titleEl.textContent = newText;  // <-- update happens here
    }
    $('#exampleModal').modal('hide');
  });
});

