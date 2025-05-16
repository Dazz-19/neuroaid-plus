
if (!sessionStorage.getItem("caretakerName")) {
  window.location.href = "login.html";
}



let phrases = [];

function addPhrase() {
  const text = document.getElementById("phraseInput").value.trim();
  const btnNum = document.getElementById("buttonInput").value.trim();

  if (!text || !btnNum) return;

  phrases.push({ phrase: text, button: btnNum });
  document.getElementById("phraseInput").value = "";
  document.getElementById("buttonInput").value = "";
  renderPhrases();
}

function deletePhrase(index) {
  phrases.splice(index, 1);
  renderPhrases();
}

function renderPhrases() {
  const list = document.getElementById("phraseList");
  list.innerHTML = "";
  phrases.forEach((p, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>Button ${p.button}</strong>: "${p.phrase}"</span>
      <button class="remove-btn" onclick="deletePhrase(${i})">❌</button>
    `;
    list.appendChild(li);
  });
}

function useSuggested(button, text, btnNum) {
  phrases.push({ phrase: text, button: btnNum });
  renderPhrases();

  button.innerText = "✅";
  button.disabled = true;
  button.style.backgroundColor = "#007d74";
}

// === PATIENT LOGIC ===
const patients = {
  Ravi: {
    age: 55,
    diagnosis: "Stroke - Left Hemiparesis",
    medications: "Aspirin, Atorvastatin",
    notes: "Needs regular speech therapy. Non-verbal."
  },
  Sana: {
    age: 23,
    diagnosis: "Cerebral Palsy",
    medications: "Baclofen",
    notes: "Needs mobility aid and assistive communication device."
  },
  Meena: {
    age: 67,
    diagnosis: "Parkinson’s Disease",
    medications: "Levodopa",
    notes: "Can speak but has voice tremors."
  },
  Aliya: {
    age: 45,
    diagnosis: "Traumatic Brain Injury",
    medications: "Donepezil",
    notes: "Requires memory support and AAC."
  }
};

function loadPatients() {
  const list = document.getElementById("patientList");
  list.innerHTML = "";

  for (let name in patients) {
    const btn = document.createElement("button");
    btn.innerText = name;
    btn.onclick = () => showPatient(name);
    list.appendChild(btn);
  }
}

function showPatient(name) {
  const details = patients[name];
  const container = document.getElementById("patientDetails");

  container.classList.remove("hidden");
  container.innerHTML = `
    <strong>Name:</strong> ${name}<br/>
    <strong>Age:</strong> ${details.age}<br/>
    <strong>Diagnosis:</strong> ${details.diagnosis}<br/>
    <strong>Medications:</strong> ${details.medications}<br/>
    <strong>Notes:</strong> ${details.notes}
  `;
}

// === Initialize After Page Load ===
document.addEventListener("DOMContentLoaded", () => {
  loadPatients();
  document.getElementById("addBtn").addEventListener("click", addPhrase);
});
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  const name = sessionStorage.getItem("caretakerName");

  if (logoutBtn && name) {
    logoutBtn.style.display = "inline-block";

    logoutBtn.addEventListener("click", () => {
      sessionStorage.clear();
      window.location.href = "login.html";
    });
  }
});
async function handleSendButton() {
  const value = document.getElementById("phraseInput").value.trim();

  if (!value) {
    alert("Please type something.");
    return;
  }

  // If it's a number between 1–9, treat it as PLAY_x
  if (!isNaN(value) && Number(value) >= 1 && Number(value) <= 9) {
    await sendToArduino("PLAY_" + value);
  } else {
    await sendToArduino("SAY:" + value);
  }

  document.getElementById("phraseInput").value = "";
}

