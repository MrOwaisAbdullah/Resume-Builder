"use strict";
const toggleSkillsButton = document.getElementById("toggleSkills");
const skillsSection = document.getElementById("skill");
document.addEventListener('DOMContentLoaded', () => {
    toggleSkillsButton === null || toggleSkillsButton === void 0 ? void 0 : toggleSkillsButton.addEventListener("click", () => {
        if ((skillsSection === null || skillsSection === void 0 ? void 0 : skillsSection.style.display) === "none") {
            skillsSection.style.display = "block";
            toggleSkillsButton.textContent = "Hide Skills";
        }
        else {
            skillsSection.style.display = "none";
            toggleSkillsButton.textContent = "Show Skills";
        }
    });
    // Resume Print Functionality
    const printButton = document.getElementById('print-resume-btn');
    printButton.addEventListener('click', () => {
        window.print();
    });
});
