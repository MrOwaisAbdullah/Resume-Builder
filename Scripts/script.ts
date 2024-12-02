const toggleSkillsButton = document.getElementById("toggleSkills");
const skillsSection = document.getElementById("skill");

document.addEventListener('DOMContentLoaded', () => {

toggleSkillsButton?.addEventListener("click", () => {
  if (skillsSection?.style.display === "none") {
    skillsSection.style.display = "block";
    toggleSkillsButton.textContent = "Hide Skills";
  } else {
    skillsSection!.style.display = "none";
    toggleSkillsButton!.textContent = "Show Skills";
  }
});

// Resume Print Functionality
    const printButton = document.getElementById('print-resume-btn') as HTMLButtonElement;

        printButton.addEventListener('click', () => {
            window.print();
            });
    });
