// Navbar mobile toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
});

// Function to fetch and update server data
function updateServerData() {
  const playersEl = document.getElementById("players-count");
  const joinKeyEl = document.getElementById("join-key");

  // Fetch player count
  fetch("https://ccrp-api.onrender.com/ccrp/api/playercount")
    .then(res => res.json())
    .then(data => {
      playersEl.textContent = data.CurrentPlayers ?? "N/A";
    })
    .catch(err => console.error("Player count fetch error:", err));

  // Fetch join key
  fetch("https://ccrp-api.onrender.com/ccrp/api/joinkey")
    .then(res => res.json())
    .then(data => {
      joinKeyEl.textContent = data.JoinKey ?? "N/A";
    })
    .catch(err => console.error("Join key fetch error:", err));
}

// Update immediately on page load
document.addEventListener("DOMContentLoaded", () => {
  updateServerData();
  // Then fetch every 1 second
  setInterval(updateServerData, 1000);
});
