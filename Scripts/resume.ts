document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resume-form") as HTMLFormElement;
  const profilePicInput = document.getElementById(
    "profile-pic-file"
  ) as HTMLInputElement;
  const profilePicPreview = document.getElementById(
    "profile-pic"
  ) as HTMLImageElement;
  const resumeContainer = document.getElementById("main") as HTMLDivElement;
  const pageTitle = document.getElementById("heading") as HTMLHeadingElement;



  function buildResume() {
    const fullName = (
      document.getElementById("fullNameInput") as HTMLInputElement
    ).value;
    const jobTitle = (
      document.getElementById("jobTitleInput") as HTMLInputElement
    ).value;
    const email = (document.getElementById("emailInput") as HTMLInputElement)
      .value;
    const phone = (document.getElementById("phoneInput") as HTMLInputElement)
      .value;
    const location = (
      document.getElementById("locationInput") as HTMLInputElement
    ).value;
    const aboutMe = (document.getElementById("aboutInput") as HTMLInputElement)
      .value;

    const educationEntries = document.querySelectorAll(".education-entry");
    let educationData: any[] = [];
    educationEntries.forEach((entry) => {
      const degree = (
        entry.querySelector('input[name="degree"]') as HTMLInputElement
      ).value;
      const institution = (
        entry.querySelector('input[name="institution"]') as HTMLInputElement
      ).value;
      const duration = (
        entry.querySelector('input[name="duration"]') as HTMLInputElement
      ).value;

      educationData.push({ degree, institution, duration });
    });

    const workEntries = document.querySelectorAll(".work-entry");
    let workData: any[] = [];
    workEntries.forEach((entry) => {
      const jobTitle = (
        entry.querySelector('input[name="jobTitle"]') as HTMLInputElement
      ).value;
      const company = (
        entry.querySelector('input[name="company"]') as HTMLInputElement
      ).value;
      const duration = (
        entry.querySelector('input[name="duration"]') as HTMLInputElement
      ).value;
      const responsibilities = (
        entry.querySelector(
          'textarea[name="responsibilities"]'
        ) as HTMLTextAreaElement
      ).value;
      workData.push({ jobTitle, company, duration, responsibilities });
    });

    const strengthEntries = document.querySelectorAll(".strengths-entry");
    let strengthData: any[] = [];
    strengthEntries.forEach((entry) => {
      const softSkill = (
        entry.querySelector('input[name="strength"]') as HTMLInputElement
      ).value;
      const softSkillInfo = (
        entry.querySelector(
          'textarea[name="strengthDescription"]'
        ) as HTMLTextAreaElement
      ).value;
      strengthData.push({ softSkill, softSkillInfo });
    });

    const skills = (
      document.getElementById("skills_Input") as HTMLInputElement
    ).value
      .split(",")
      .map((skill) => skill.trim());

    const profilePicFile = profilePicInput.files?.[0];
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
        profilePicPreview.src = e.target?.result as string;
      };
      reader.readAsDataURL(profilePicFile);
    }

    (document.getElementById("full-name") as HTMLElement).innerText = fullName;
    (document.getElementById("job-title") as HTMLElement).innerText = jobTitle;
    (
      document.getElementById("email") as HTMLElement
    ).innerHTML = `<i class="fa-solid fa-envelope"></i><p>${email}</p>`;
    (
      document.getElementById("phone") as HTMLElement
    ).innerHTML = `<i class="fa-solid fa-phone"></i><p>${phone}</p>`;
    (
      document.getElementById("location") as HTMLElement
    ).innerHTML = `<i class="fa-solid fa-map-pin"></i><p>${location}</p>`;
    (document.getElementById("about-me") as HTMLElement).innerText = aboutMe;

    const educationSection = document.getElementById(
      "education-details"
    ) as HTMLElement;
    educationSection.innerHTML = educationData
      .map(
        (edu: any) =>
          `<div class="education-header">
                  <h3>${edu.degree}</h3>
                  <span class="date">${edu.duration}</span>
             </div>
                <p class="school-details">${edu.institution}</p>`
      )
      .join("");

    const workExperienceSection = document.getElementById(
      "experience-details"
    ) as HTMLElement;
    workExperienceSection.innerHTML = workData
      .map(
        (work: any) => `
          <div class="job-header">
                <h3>${work.jobTitle}</h3>
                <span class="date">${work.duration}</span>
            </div>
              <p class="company">${work.company}</p>
            <ul>
              <li>
                ${work.responsibilities}
              </li>
            </ul>`
      )
      .join("");

    const strengthSections = document.getElementById(
      "strength-details"
    ) as HTMLElement;
    strengthSections.innerHTML = strengthData
      .map(
        (strength: any) => `
                <ul>
                  <li>
                    <h3>${strength.softSkill}</h3>
                    <p>
                      ${strength.softSkillInfo}
                    </p>
                  </li>
                </ul>`
      )
      .join("");

    const skillsSection = document.getElementById("skills-details") as HTMLElement;
    skillsSection.innerHTML = `<ul>${skills
      .map((skill: string) => `<li>${skill}</li>`)
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
