let userRole = null; // This will simulate the logged-in user's role

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
  // Placeholder: randomly assign a role for testing
  const roles = ["moderator", "management", "administrator"];
  userRole = roles[Math.floor(Math.random() * roles.length)];

  alert(`Logged in as: ${userRole} (simulated)`);

  // Redirect to dashboard (can be conditional later)
  window.location.href = "../dashboard/";
});
