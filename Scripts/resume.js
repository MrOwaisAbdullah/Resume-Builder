"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-form");
    const profilePicInput = document.getElementById("profile-pic-file");
    const profilePicPreview = document.getElementById("profile-pic");
    const resumeContainer = document.getElementById("main");
    const pageTitle = document.getElementById("heading");
    function buildResume() {
        var _a;
        const fullName = document.getElementById("fullNameInput").value;
        const jobTitle = document.getElementById("jobTitleInput").value;
        const email = document.getElementById("emailInput")
            .value;
        const phone = document.getElementById("phoneInput")
            .value;
        const location = document.getElementById("locationInput").value;
        const aboutMe = document.getElementById("aboutInput")
            .value;
        const educationEntries = document.querySelectorAll(".education-entry");
        let educationData = [];
        educationEntries.forEach((entry) => {
            const degree = entry.querySelector('input[name="degree"]').value;
            const institution = entry.querySelector('input[name="institution"]').value;
            const duration = entry.querySelector('input[name="duration"]').value;
            educationData.push({ degree, institution, duration });
        });
        const workEntries = document.querySelectorAll(".work-entry");
        let workData = [];
        workEntries.forEach((entry) => {
            const jobTitle = entry.querySelector('input[name="jobTitle"]').value;
            const company = entry.querySelector('input[name="company"]').value;
            const duration = entry.querySelector('input[name="duration"]').value;
            const responsibilities = entry.querySelector('textarea[name="responsibilities"]').value;
            workData.push({ jobTitle, company, duration, responsibilities });
        });
        const strengthEntries = document.querySelectorAll(".strengths-entry");
        let strengthData = [];
        strengthEntries.forEach((entry) => {
            const softSkill = entry.querySelector('input[name="strength"]').value;
            const softSkillInfo = entry.querySelector('textarea[name="strengthDescription"]').value;
            strengthData.push({ softSkill, softSkillInfo });
        });
        const skills = document.getElementById("skills_Input").value
            .split(",")
            .map((skill) => skill.trim());
        const profilePicFile = (_a = profilePicInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (profilePicFile) {
            if (!profilePicFile.type.startsWith("image/")) {
                alert("Please upload a valid image file.");
                return;
            }
            if (profilePicFile.size > 5 * 1024 * 1024) {
                // 5MB limit
                alert("File size must be less than 5MB.");
                return;
            }
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                profilePicPreview.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(profilePicFile);
        }
        document.getElementById("full-name").innerText = fullName;
        document.getElementById("job-title").innerText = jobTitle;
        document.getElementById("email").innerHTML = `<i class="fa-solid fa-envelope"></i><p>${email}</p>`;
        document.getElementById("phone").innerHTML = `<i class="fa-solid fa-phone"></i><p>${phone}</p>`;
        document.getElementById("location").innerHTML = `<i class="fa-solid fa-map-pin"></i><p>${location}</p>`;
        document.getElementById("about-me").innerText = aboutMe;
        const educationSection = document.getElementById("education-details");
        educationSection.innerHTML = educationData
            .map((edu) => `<div class="education-header">
                  <h3>${edu.degree}</h3>
                  <span class="date">${edu.duration}</span>
             </div>
                <p class="school-details">${edu.institution}</p>`)
            .join("");
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
        const skillsSection = document.getElementById("skills-details");
        skillsSection.innerHTML = `<ul>${skills
            .map((skill) => `<li>${skill}</li>`)
            .join("")}</ul>`;
    }
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        buildResume();
        pageTitle.textContent = "Your Resume is Generated🎉";
        resumeContainer.style.display = "block";
        form.style.display = "none";
        scrollToTop();
    });
});
