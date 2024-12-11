"use strict";
var _a, _b, _c;
const form = document.getElementById("resume-form");
// Add More Strength Sections
function addStrengthEntry() {
    const strengthsSection = document.getElementById("form-strengths-section");
    const newEntry = document.createElement("div");
    newEntry.className = "strengths-entry";
    newEntry.innerHTML = `
        <span class="remove">
          <img class="remove-icon" src="/Public/close-icon.svg" alt="Close Icon"> 
        </span>
        <label>Strength:</label>
        <input type="text" name="strength" maxlength="30" required />
        
        <label>Description:</label>
        <textarea name="strengthDescription" maxlength="80" required></textarea>
      `;
    strengthsSection.insertBefore(newEntry, document.getElementById("addStrength"));
}
// Add More Education Sections
function addEducationEntry() {
    const educationSection = document.getElementById("form-education-section");
    const newEntry = document.createElement("div");
    newEntry.className = "education-entry";
    newEntry.innerHTML = `
        <span class="remove">
          <img class="remove-icon" src="/Public/close-icon.svg" alt="Close Icon"> 
        </span>
        <label>Degree:</label>
        <input type="text" name="degree" maxlength="50" required />
        <label>Institution:</label>
        <input type="text" name="institution" maxlength="50" required />
        <label>Duration:</label>
        <input type="text" name="duration" maxlength="20" required />
      `;
    educationSection.insertBefore(newEntry, document.getElementById("addEducation"));
}
// Add More Experience Sections
function addWorkEntry() {
    const workSection = document.getElementById("form-work-section");
    const newEntry = document.createElement("div");
    newEntry.className = "work-entry";
    newEntry.innerHTML = `
        <span class="remove">
          <img class="remove-icon" src="/Public/close-icon.svg" alt="Close Icon"> 
        </span>
        <label>Job Title:</label>
        <input type="text" name="jobTitle" maxlength="50" required />
        <label>Company:</label>
        <input type="text" name="company" maxlength="50" required />
        <label>Duration:</label>
        <input type="text" name="duration" maxlength="20" required />
        <label>Responsibilities:</label>
        <textarea name="responsibilities" maxlength="150" required></textarea>
      `;
    workSection.insertBefore(newEntry, document.getElementById("addWork"));
}
(_a = document
    .getElementById("addEducation")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addEducationEntry);
(_b = document.getElementById("addWork")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", addWorkEntry);
(_c = document
    .getElementById("addStrength")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", addStrengthEntry);
// Remove Extra Sections
form === null || form === void 0 ? void 0 : form.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("remove-icon") ||
        target.classList.contains("remove")) {
        const confirmRemove = confirm("Are you sure you want to remove this section?");
        if (confirmRemove) {
            const sectionToRemove = target.closest(".strengths-entry, .education-entry, .work-entry");
            sectionToRemove === null || sectionToRemove === void 0 ? void 0 : sectionToRemove.remove();
        }
    }
});
