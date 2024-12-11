"use strict";
const form = document.getElementById("resume-form");
const toggleSkillsButton = document.getElementById("toggleSkills");
const skillsSection = document.getElementById("skill");
const shareBtn = document.getElementById("share-btn");
const options = document.getElementById("options");
const linkContainer = document.getElementById("link-container");
const linkElement = document.getElementById("shareableLink");
const copyLinkBtn = document.getElementById("copyLink");
const profilePicInput = document.getElementById("profile-pic-file");
const profilePicPreview = document.getElementById("profile-pic");
const resumeContainer = document.getElementById("main");
const pageTitle = document.getElementById("heading");
const printButton = document.getElementById("print-resume-btn");
const rightSection = document.querySelector(".right-section");
let shareableLink = "";
document.addEventListener("DOMContentLoaded", () => {
    var _a;
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
    // Print and save Functionality
    printButton.addEventListener("click", () => {
        window.print();
    });
    // Handling Form Submission
    (_a = document.getElementById("resume-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (e) => {
        var _a;
        e.preventDefault();
        const fullName = document.getElementById("fullNameInput").value;
        // Handling profile picture
        const profilePicFile = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (profilePicFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                const profilePicDataUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                // Collecting Resume Data Provided by the user
                const resumeData = {
                    fullName: fullName,
                    jobTitle: document.getElementById("jobTitleInput").value,
                    email: document.getElementById("emailInput")
                        .value,
                    phone: document.getElementById("phoneInput")
                        .value,
                    location: document.getElementById("locationInput").value,
                    aboutMe: document.getElementById("aboutInput")
                        .value,
                    educationData: Array.from(document.querySelectorAll(".education-entry")).map((entry) => ({
                        degree: entry.querySelector('input[name="degree"]').value,
                        institution: entry.querySelector('input[name="institution"]').value,
                        duration: entry.querySelector('input[name="duration"]').value,
                    })),
                    workData: Array.from(document.querySelectorAll(".work-entry")).map((entry) => ({
                        jobTitle: entry.querySelector('input[name="jobTitle"]').value,
                        company: entry.querySelector('input[name="company"]').value,
                        duration: entry.querySelector('input[name="duration"]').value,
                        responsibilities: entry.querySelector('textarea[name="responsibilities"]').value,
                    })),
                    skills: document.getElementById("skills_Input").value.split(","),
                    strengthData: Array.from(document.querySelectorAll(".strengths-entry")).map((entry) => ({
                        strength: entry.querySelector('input[name="strength"]').value,
                        description: entry.querySelector('textarea[name="strengthDescription"]').value,
                    })),
                    profilePic: profilePicDataUrl,
                    // Collecting the selected color
                    selectedColor: document.getElementById("colorSelect").value
                };
                // Generating a Unique ID
                const uniqueID = Date.now().toString(36);
                // Saving resume data in local storage
                const userName = fullName.replace(/\s+/g, "-").toLowerCase();
                localStorage.setItem(`${userName}-${uniqueID}`, JSON.stringify(resumeData));
                // Generating a shareable link
                shareableLink = `${window.location.origin}/generate-resume.html?username=${encodeURIComponent(userName)}-${uniqueID}`;
                linkElement.href = shareableLink;
                linkElement.textContent = shareableLink;
            };
            reader.readAsDataURL(profilePicFile); // Reading the file as a data URL
        }
    });
    // Function to show/hide link
    function toggleShareableLink() {
        if (linkContainer.style.display === "none" ||
            linkContainer.style.display === "") {
            options.style.height = "12rem";
            linkContainer.style.display = "flex";
            // Hiding link after 10 seconds
            setTimeout(() => {
                options.style.height = "7rem";
                linkContainer.style.display = "none";
            }, 10000);
        }
        else {
            options.style.height = "7rem";
            linkContainer.style.display = "none";
        }
    }
    // Add event listener to share button
    shareBtn.addEventListener("click", toggleShareableLink);
    // Function to populate the resume form with saved data
    function populateResumeForm(resumeData) {
        // Personal Details
        document.getElementById("fullNameInput").value =
            resumeData.fullName;
        document.getElementById("jobTitleInput").value =
            resumeData.jobTitle;
        document.getElementById("emailInput").value =
            resumeData.email;
        document.getElementById("phoneInput").value =
            resumeData.phone;
        document.getElementById("locationInput").value =
            resumeData.location;
        document.getElementById("aboutInput").value =
            resumeData.aboutMe;
        // Skills
        document.getElementById("skills_Input").value =
            resumeData.skills.join(",");
        // Seting the selected color in the form
        document.getElementById("colorSelect").value = resumeData.selectedColor;
        // Dynamically add and populate Education entries
        const educationSection = document.getElementById("form-education-section");
        resumeData.educationData.forEach((edu, index) => {
            if (index > 0) {
                // Add more education entry if more than one
                const addEducationBtn = document.getElementById("addEducation");
                addEducationBtn === null || addEducationBtn === void 0 ? void 0 : addEducationBtn.click();
            }
            const educationEntries = document.querySelectorAll(".education-entry");
            const latestEntry = educationEntries[index];
            latestEntry.querySelector('input[name="degree"]').value = edu.degree;
            latestEntry.querySelector('input[name="institution"]').value = edu.institution;
            latestEntry.querySelector('input[name="duration"]').value = edu.duration;
        });
        // Dynamically add and populate Work Experience entries
        const workSection = document.getElementById("form-work-section");
        resumeData.workData.forEach((work, index) => {
            if (index > 0) {
                // Add more work entry if more than one
                const addWorkBtn = document.getElementById("addWork");
                addWorkBtn === null || addWorkBtn === void 0 ? void 0 : addWorkBtn.click();
            }
            const workEntries = document.querySelectorAll(".work-entry");
            const latestEntry = workEntries[index];
            latestEntry.querySelector('input[name="jobTitle"]').value = work.jobTitle;
            latestEntry.querySelector('input[name="company"]').value = work.company;
            latestEntry.querySelector('input[name="duration"]').value = work.duration;
            latestEntry.querySelector('textarea[name="responsibilities"]').value = work.responsibilities;
        });
        // Dynamically add and populate Strengths entries
        const strengthsSection = document.getElementById("form-strengths-section");
        resumeData.strengthData.forEach((strength, index) => {
            if (index > 0) {
                // Add more strength entry if more than one
                const addStrengthBtn = document.getElementById("addStrength");
                addStrengthBtn === null || addStrengthBtn === void 0 ? void 0 : addStrengthBtn.click();
            }
            const strengthEntries = document.querySelectorAll(".strengths-entry");
            const latestEntry = strengthEntries[index];
            latestEntry.querySelector('input[name="strength"]').value = strength.strength;
            latestEntry.querySelector('textarea[name="strengthDescription"]').value = strength.description;
        });
    }
    // Modifying the load event listener to use these function
    window.addEventListener("load", () => {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get("username");
        if (username) {
            const savedData = localStorage.getItem(username);
            if (savedData) {
                const resumeData = JSON.parse(savedData);
                populateResumeForm(resumeData); // Populating the resume data
                displayResume(resumeData); // Displaying the resume after populating the form
            }
            else {
                alert("Resume not found!");
            }
        }
    });
    function displayResume(data) {
        // Seting the profile picture from the data
        const profilePicPreview = document.getElementById("profile-pic");
        profilePicPreview.src = data.profilePic; // Using the stored data URL
        // Display Personal Details
        document.getElementById("full-name").innerText =
            data.fullName;
        document.getElementById("job-title").innerText =
            data.jobTitle;
        document.getElementById("email").innerHTML = `<span style="color: ${data.selectedColor}; margin-right: 5px;" class="fa-solid fa-envelope"></span><p>${data.email}</p>`;
        document.getElementById("phone").innerHTML = `<span style="color: ${data.selectedColor}; margin-right: 5px;" class="fa-solid fa-phone"></span><p>${data.phone}</p>`;
        document.getElementById("location").innerHTML = `<span style="color: ${data.selectedColor}; margin-right: 5px;" class="fa-solid fa-map-pin"></span><p>${data.location}</p>`;
        document.getElementById("about").innerHTML = `<p id="about-me">${data.aboutMe}</p>`;
        // Display Education
        const educationSection = document.getElementById("education-details");
        educationSection.innerHTML = data.educationData
            .map((edu) => `<div class="education-header">
                <h3>${edu.degree}</h3>
                <span class="date">${edu.duration}</span>
           </div>
              <p class="school-details">${edu.institution}</p>`)
            .join("");
        // Display Work Experience
        const workExperienceSection = document.getElementById("experience-details");
        workExperienceSection.innerHTML = data.workData
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
        // Display Strengths
        const strengthSections = document.getElementById("strength-details");
        strengthSections.innerHTML = data.strengthData
            .map((strength) => `
              <ul>
                <li>
                  <h3>${strength.strength}</h3>
                  <p>
                    ${strength.description}
                  </p>
                </li>
              </ul>`)
            .join("");
        // Display skills
        const skillsSection = document.getElementById("skills-details");
        skillsSection.innerHTML = `<ul>${data.skills
            .map((skill) => `<li>${skill}</li>`)
            .join("")}</ul>`;
        // Set the color for the page title
        pageTitle.innerHTML = `<h1 class="page-title">Resume of <span style="color: ${data.selectedColor};">${data.fullName}</span></h1>`;
        resumeContainer.style.display = "block";
        form.style.display = "none";
        rightSection.style.backgroundColor = data.selectedColor;
        options.style.display = "block";
        scrollToTop();
    }
    // Function to scroll to the top of the page
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
});
// Copy Link Function
function copyLink() {
    navigator.clipboard
        .writeText(shareableLink)
        .then(() => {
        alert("Link copied to clipboard!"); // Notifying user of successful copy
    })
        .catch((err) => {
        alert("Failed to copy link. Please try again."); // Notifying user of failure
    });
}
// Ensuring copy link button is added after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    const copyLinkBtn = document.getElementById("copyLink");
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener("click", copyLink);
    }
});
