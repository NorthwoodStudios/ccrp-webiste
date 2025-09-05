const playersEl = document.getElementById("players-count");
const joinKeyEl = document.getElementById("join-key");

// Animate number changes smoothly
function animateValue(el, start, end, duration = 500) {
  const range = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    el.textContent = Math.floor(start + range * progress);
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

// Safely parse numbers, preserving 0
function safeParseNumber(value) {
  const num = parseInt(value);
  return isNaN(num) ? 0 : num;
}

function updateServerData() {
  // Fetch player count
  fetch("https://ccrp-api.onrender.com/ccrp/api/playercount")
    .then(res => res.json())
    .then(data => {
      const newCount = data.CurrentPlayers ?? 0; // preserves 0
      const currentCount = safeParseNumber(playersEl.textContent);
      if (currentCount !== newCount) {
        animateValue(playersEl, currentCount, newCount, 500);
      }
    })
    .catch(err => console.error("Player count fetch error:", err));

  // Fetch join key (no animation for string)
  fetch("https://ccrp-api.onrender.com/ccrp/api/joinkey")
    .then(res => res.json())
    .then(data => {
      const newKey = data.JoinKey ?? "N/A";
      if (joinKeyEl.textContent !== newKey) {
        joinKeyEl.textContent = newKey;
      }
    })
    .catch(err => console.error("Join key fetch error:", err));
}

// Initial update and every second
document.addEventListener("DOMContentLoaded", () => {
  updateServerData();
  setInterval(updateServerData, 1000);
});
