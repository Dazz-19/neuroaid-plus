document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const id = document.getElementById("caretakerId").value.trim();

  if (!name || !email || !id) {
    alert("Please fill in all fields.");
    return;
  }

  // ✅ Store login info in sessionStorage
  sessionStorage.setItem("caretakerName", name);
  sessionStorage.setItem("caretakerEmail", email);
  sessionStorage.setItem("caretakerID", id);

  window.location.href = "index.html"; // ✅ go to homepage
});
