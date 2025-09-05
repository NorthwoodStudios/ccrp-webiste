const stages = document.querySelectorAll(".stage");
const questions = document.querySelectorAll(".question");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentStage = 0;

function updateStage() {
  stages.forEach((s,i) => s.classList.toggle("active", i === currentStage));
  questions.forEach((q,i) => q.classList.toggle("active", i === currentStage));

  prevBtn.style.display = currentStage === 0 ? "none" : "inline-block";
  nextBtn.textContent = currentStage === questions.length -1 ? "Submit" : "Next";
}

nextBtn.addEventListener("click", () => {
  if(currentStage < questions.length -1){
    currentStage++;
    updateStage();
  } else {
    alert("Application submitted! (mock)");
  }
});

prevBtn.addEventListener("click", () => {
  if(currentStage > 0){
    currentStage--;
    updateStage();
  }
});

// Clicking stage circles
stages.forEach(s => s.addEventListener("click", () => {
  currentStage = parseInt(s.dataset.stage);
  updateStage();
}));

// Initialize
updateStage();
