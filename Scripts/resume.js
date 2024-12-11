"use strict";
// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-form");
    const profilePicInput = document.getElementById("profile-pic-file");
    const profilePicPreview = document.getElementById("profile-pic");
    const resumeContainer = document.getElementById("main");
    const pageTitle = document.getElementById("heading");
    const options = document.getElementById("options");
    // Edit Mode
    const editModeButton = document.getElementById("edit-resume-btn");
    // Function to make elements editable
    function makeEditable(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            element.setAttribute("contenteditable", "true");
            element.classList.add("editable-field");
        });
    }
    // Function to remove editability
    function removeEditable(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
            element.removeAttribute("contenteditable");
            element.classList.remove("editable-field");
        });
    }
    // Edit Mode Toggle Button
    let isEditMode = false;
    editModeButton.addEventListener("click", () => {
        isEditMode = !isEditMode;
        if (isEditMode) {
            // Make elements editable
            makeEditable("#full-name");
            makeEditable("#job-title");
            makeEditable("#phone");
            makeEditable("#email");
            makeEditable("#location");
            makeEditable("#about-me");
            makeEditable(".education-details h3");
            makeEditable(".education-details .date");
            makeEditable(".education-details .school-details");
            makeEditable(".job-header h3");
            makeEditable(".job-header .date");
            makeEditable(".company");
            makeEditable(".experience-details ul li");
            makeEditable(".strengths ul h3");
            makeEditable(".strengths ul p");
            makeEditable("#skill ul li");
            editModeButton.textContent = "Save Changes";
            editModeButton.classList.add("save-mode");
            scrollToTop();
        }
        else {
            // Remove editability
            removeEditable("#full-name");
            removeEditable("#job-title");
            removeEditable("#phone");
            removeEditable("#email");
            removeEditable("#location");
            removeEditable("#about-me");
            removeEditable(".education-details h3");
            removeEditable(".education-details .date");
            removeEditable(".education-details .school-details");
            removeEditable(".job-header h3");
            removeEditable(".job-header .date");
            removeEditable(".company");
            removeEditable(".experience-details ul li");
            removeEditable(".strengths ul h3");
            removeEditable(".strengths ul p");
            removeEditable("#skill ul li");
            editModeButton.textContent = "Edit Resume";
            editModeButton.classList.remove("save-mode");
            scrollToTop();
        }
    });
    // Function to build the resume from the form inputs
    function buildResume() {
        var _a;
        // Collecting personal details from the form
        const fullName = document.getElementById("fullNameInput").value;
        const jobTitle = document.getElementById("jobTitleInput").value;
        const email = document.getElementById("emailInput")
            .value;
        const phone = document.getElementById("phoneInput")
            .value;
        const location = document.getElementById("locationInput").value;
        const aboutMe = document.getElementById("aboutInput")
            .value;
        // Collecting education entries from the form
        const educationEntries = document.querySelectorAll(".education-entry");
        let educationData = []; // Array to hold education data
        educationEntries.forEach((entry) => {
            const degree = entry.querySelector('input[name="degree"]').value;
            const institution = entry.querySelector('input[name="institution"]').value;
            const duration = entry.querySelector('input[name="duration"]').value;
            educationData.push({ degree, institution, duration }); // Pushing each entry to the education data array
        });
        // Collecting work entries from the form
        const workEntries = document.querySelectorAll(".work-entry");
        let workData = []; // Array to hold work data
        workEntries.forEach((entry) => {
            const jobTitle = entry.querySelector('input[name="jobTitle"]').value;
            const company = entry.querySelector('input[name="company"]').value;
            const duration = entry.querySelector('input[name="duration"]').value;
            const responsibilities = entry.querySelector('textarea[name="responsibilities"]').value;
            workData.push({ jobTitle, company, duration, responsibilities }); // Pushing each entry to the work data array
        });
        // Collecting strengths entries from the form
        const strengthEntries = document.querySelectorAll(".strengths-entry");
        let strengthData = []; // Array to hold strength data
        strengthEntries.forEach((entry) => {
            const softSkill = entry.querySelector('input[name="strength"]').value;
            const softSkillInfo = entry.querySelector('textarea[name="strengthDescription"]').value;
            strengthData.push({ softSkill, softSkillInfo }); // Pushing each entry to the strength data array
        });
        // Collecting skills from the input field
        const skills = document.getElementById("skills_Input").value
            .split(",")
            .map((skill) => skill.trim()); // Split and trim skills into an array
        // Handling profile picture upload
        const profilePicFile = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (profilePicFile) {
            if (!profilePicFile.type.startsWith("image/")) {
                alert("Please upload a valid image file."); // Alerting if the file is not an image
                return;
            }
            if (profilePicFile.size > 5 * 1024 * 1024) {
                alert("File size must be less than 5MB."); // Alerting if the file size exceeds 5MB
                return;
            }
            const reader = new FileReader(); // Creating a FileReader to read the file
            reader.onload = (e) => {
                var _a;
                profilePicPreview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result; // Seting the profile picture preview
            };
            reader.readAsDataURL(profilePicFile); // Reading the file as a data URL
        }
        // Generating the resume with the collected data
        document.getElementById("full-name").innerText = fullName;
        document.getElementById("job-title").innerText = jobTitle;
        document.getElementById("email").innerHTML = `<i class="fa-solid fa-envelope"></i><p>${email}</p>`;
        document.getElementById("phone").innerHTML = `<i class="fa-solid fa-phone"></i><p>${phone}</p>`;
        document.getElementById("location").innerHTML = `<i class="fa-solid fa-map-pin"></i><p>${location}</p>`;
        document.getElementById("about").innerHTML = `<p id="about-me">${aboutMe}</p>`;
        // Generating education section
        const educationSection = document.getElementById("education-details");
        educationSection.innerHTML = educationData
            .map((edu) => `<div class="education-header">
                  <h3>${edu.degree}</h3>
                  <span class="date">${edu.duration}</span>
             </div>
                <p class="school-details">${edu.institution}</p>`)
            .join("");
        // Generating experience section
        const workExperienceSection = document.getElementById("experience-details");
        workExperienceSection.innerHTML = workData
            .map((work) => `
          <div class="job-header">
                <h3>${work.jobTitle}</h3>
                <span class="date">${work.duration}</span>
            </div>
              <p class="company">${work.company}</p>
            <ul>
              <li>
                ${work.responsibilities}
              </li>
            </ul>`)
            .join("");
        // Generating strength section
        const strengthSections = document.getElementById("strength-details");
        strengthSections.innerHTML = strengthData
            .map((strength) => `
                <ul>
                  <li>
                    <h3>${strength.softSkill}</h3>
                    <p>
                      ${strength.softSkillInfo}
                    </p>
                  </li>
                </ul>`)
            .join("");
        // Generating skills section
        const skillsSection = document.getElementById("skills-details");
        skillsSection.innerHTML = `<ul>${skills
            .map((skill) => `<li>${skill}</li>`)
            .join("")}</ul>`;
    }
    //scroll to top Function
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    // Event listener for form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        buildResume(); // Calling the function to build the resume
        pageTitle.textContent = "Your Resume is Generated🎉";
        resumeContainer.style.display = "block"; // Showing the resume container
        form.style.display = "none"; // Hiding the form
        options.style.display = "block"; // Showing options for sharing, Editing and downloading
        scrollToTop();
    });
});
