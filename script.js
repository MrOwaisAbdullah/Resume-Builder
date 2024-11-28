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
    // Add print functionality
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Resume';
    printButton.style.position = 'fixed';
    printButton.style.bottom = '20px';
    printButton.style.right = '20px';
    printButton.style.padding = '10px 20px';
    printButton.style.backgroundColor = '#4CAF50';
    printButton.style.color = 'white';
    printButton.style.border = 'none';
    printButton.style.borderRadius = '5px';
    printButton.style.cursor = 'pointer';
    printButton.addEventListener('click', () => {
        // Create a new window for printing
        document.body.classList.add('print-resume');
        // Trigger browser print dialog
        window.print();
        // Remove print class after printing
        document.body.classList.remove('print-resume');
    });
    document.body.appendChild(printButton);
});
