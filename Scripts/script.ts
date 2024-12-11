interface EducationEntry {
  degree: string;
  institution: string;
  duration: string;
}

interface WorkEntry {
  jobTitle: string;
  company: string;
  duration: string;
  responsibilities: string;
}

interface StrengthEntry {
  strength: string;
  description: string;
}

interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  aboutMe: string;
  educationData: EducationEntry[];
  workData: WorkEntry[];
  skills: string[];
  strengthData: StrengthEntry[];
  profilePic: string;
  selectedColor: string;
}

const form = document.getElementById("resume-form") as HTMLFormElement;
const toggleSkillsButton = document.getElementById(
  "toggleSkills"
) as HTMLButtonElement;
const skillsSection = document.getElementById("skill") as HTMLDivElement;
const shareBtn = document.getElementById("share-btn") as HTMLButtonElement;
const options = document.getElementById("options") as HTMLDivElement;
const linkContainer = document.getElementById(
  "link-container"
) as HTMLDivElement;
const linkElement = document.getElementById(
  "shareableLink"
) as HTMLAnchorElement;
const copyLinkBtn = document.getElementById("copyLink") as HTMLButtonElement;
const profilePicInput = document.getElementById(
  "profile-pic-file"
) as HTMLInputElement;
const profilePicPreview = document.getElementById(
  "profile-pic"
) as HTMLImageElement;
const resumeContainer = document.getElementById("main") as HTMLDivElement;
const pageTitle = document.getElementById("heading") as HTMLHeadingElement;
const printButton = document.getElementById(
  "print-resume-btn"
) as HTMLButtonElement;
const rightSection = document.querySelector(".right-section") as HTMLDivElement;

let shareableLink: string = "";

document.addEventListener("DOMContentLoaded", () => {
  toggleSkillsButton?.addEventListener("click", () => {
    if (skillsSection?.style.display === "none") {
      skillsSection.style.display = "block";
      toggleSkillsButton.textContent = "Hide Skills";
    } else {
      skillsSection!.style.display = "none";
      toggleSkillsButton!.textContent = "Show Skills";
    }
  });

  // Print and save Functionality
  printButton.addEventListener("click", () => {
    window.print();
  });

  // Handling Form Submission
  document.getElementById("resume-form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = (
      document.getElementById("fullNameInput") as HTMLInputElement
    ).value;
    // Handling profile picture
    const profilePicFile = profilePicInput.files?.[0];

    if (profilePicFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const profilePicDataUrl = e.target?.result as string;

        // Collecting Resume Data Provided by the user
        const resumeData = {
          fullName: fullName,
          jobTitle: (
            document.getElementById("jobTitleInput") as HTMLInputElement
          ).value,
          email: (document.getElementById("emailInput") as HTMLInputElement)
            .value,
          phone: (document.getElementById("phoneInput") as HTMLInputElement)
            .value,
          location: (
            document.getElementById("locationInput") as HTMLInputElement
          ).value,
          aboutMe: (document.getElementById("aboutInput") as HTMLInputElement)
            .value,
          educationData: Array.from(
            document.querySelectorAll(".education-entry")
          ).map((entry: Element) => ({
            degree: (
              entry.querySelector('input[name="degree"]') as HTMLInputElement
            ).value,
            institution: (
              entry.querySelector(
                'input[name="institution"]'
              ) as HTMLInputElement
            ).value,
            duration: (
              entry.querySelector('input[name="duration"]') as HTMLInputElement
            ).value,
          })),
          workData: Array.from(document.querySelectorAll(".work-entry")).map(
            (entry: Element) => ({
              jobTitle: (
                entry.querySelector(
                  'input[name="jobTitle"]'
                ) as HTMLInputElement
              ).value,
              company: (
                entry.querySelector('input[name="company"]') as HTMLInputElement
              ).value,
              duration: (
                entry.querySelector(
                  'input[name="duration"]'
                ) as HTMLInputElement
              ).value,
              responsibilities: (
                entry.querySelector(
                  'textarea[name="responsibilities"]'
                ) as HTMLTextAreaElement
              ).value,
            })
          ),
          skills: (
            document.getElementById("skills_Input") as HTMLInputElement
          ).value.split(","),
          strengthData: Array.from(
            document.querySelectorAll(".strengths-entry")
          ).map((entry: Element) => ({
            strength: (
              entry.querySelector('input[name="strength"]') as HTMLInputElement
            ).value,
            description: (
              entry.querySelector(
                'textarea[name="strengthDescription"]'
              ) as HTMLTextAreaElement
            ).value,
          })),
          profilePic: profilePicDataUrl,
           // Collecting the selected color
          selectedColor: (document.getElementById("colorSelect") as HTMLSelectElement).value
        };

        // Generating a Unique ID
        const uniqueID = Date.now().toString(36);

        // Saving resume data in local storage
        const userName = fullName.replace(/\s+/g, "-").toLowerCase();
        localStorage.setItem(
          `${userName}-${uniqueID}`,
          JSON.stringify(resumeData)
        );

        // Generating a shareable link
        shareableLink = `${
          window.location.origin
        }/generate-resume.html?username=${encodeURIComponent(
          userName
        )}-${uniqueID}`;
        linkElement.href = shareableLink;
        linkElement.textContent = shareableLink;
      };
      reader.readAsDataURL(profilePicFile); // Reading the file as a data URL
    }
  });

  // Function to show/hide link
  function toggleShareableLink() {
    if (
      linkContainer.style.display === "none" ||
      linkContainer.style.display === ""
    ) {
      options.style.height = "10rem";
      linkContainer.style.display = "flex";

      // Hiding link after 10 seconds
      setTimeout(() => {
        options.style.height = "7rem";
        linkContainer.style.display = "none";
      }, 10000);
    } else {
      options.style.height = "7rem";
      linkContainer.style.display = "none";
    }
  }

  // Add event listener to share button
  shareBtn.addEventListener("click", toggleShareableLink);

  // Function to populate the resume form with saved data
  function populateResumeForm(resumeData: ResumeData) {
    // Personal Details
    (document.getElementById("fullNameInput") as HTMLInputElement).value =
      resumeData.fullName;
    (document.getElementById("jobTitleInput") as HTMLInputElement).value =
      resumeData.jobTitle;
    (document.getElementById("emailInput") as HTMLInputElement).value =
      resumeData.email;
    (document.getElementById("phoneInput") as HTMLInputElement).value =
      resumeData.phone;
    (document.getElementById("locationInput") as HTMLInputElement).value =
      resumeData.location;
    (document.getElementById("aboutInput") as HTMLInputElement).value =
      resumeData.aboutMe;

    // Skills
    (document.getElementById("skills_Input") as HTMLInputElement).value =
      resumeData.skills.join(",");

          // Seting the selected color in the form
  (document.getElementById("colorSelect") as HTMLSelectElement).value = resumeData.selectedColor;

    // Dynamically add and populate Education entries
    const educationSection = document.getElementById("form-education-section");
    resumeData.educationData.forEach((edu: any, index: number) => {
      if (index > 0) {
        // Add more education entry if more than one
        const addEducationBtn = document.getElementById("addEducation");
        addEducationBtn?.click();
      }

      const educationEntries = document.querySelectorAll(".education-entry");
      const latestEntry = educationEntries[index];

      (
        latestEntry.querySelector('input[name="degree"]') as HTMLInputElement
      ).value = edu.degree;
      (
        latestEntry.querySelector(
          'input[name="institution"]'
        ) as HTMLInputElement
      ).value = edu.institution;
      (
        latestEntry.querySelector('input[name="duration"]') as HTMLInputElement
      ).value = edu.duration;
    });

    // Dynamically add and populate Work Experience entries
    const workSection = document.getElementById("form-work-section");
    resumeData.workData.forEach((work: any, index: number) => {
      if (index > 0) {
        // Add more work entry if more than one
        const addWorkBtn = document.getElementById("addWork");
        addWorkBtn?.click();
      }

      const workEntries = document.querySelectorAll(".work-entry");
      const latestEntry = workEntries[index];

      (
        latestEntry.querySelector('input[name="jobTitle"]') as HTMLInputElement
      ).value = work.jobTitle;
      (
        latestEntry.querySelector('input[name="company"]') as HTMLInputElement
      ).value = work.company;
      (
        latestEntry.querySelector('input[name="duration"]') as HTMLInputElement
      ).value = work.duration;
      (
        latestEntry.querySelector(
          'textarea[name="responsibilities"]'
        ) as HTMLTextAreaElement
      ).value = work.responsibilities;
    });

    // Dynamically add and populate Strengths entries
    const strengthsSection = document.getElementById("form-strengths-section");
    resumeData.strengthData.forEach((strength: any, index: number) => {
      if (index > 0) {
        // Add more strength entry if more than one
        const addStrengthBtn = document.getElementById("addStrength");
        addStrengthBtn?.click();
      }

      const strengthEntries = document.querySelectorAll(".strengths-entry");
      const latestEntry = strengthEntries[index];

      (
        latestEntry.querySelector('input[name="strength"]') as HTMLInputElement
      ).value = strength.strength;
      (
        latestEntry.querySelector(
          'textarea[name="strengthDescription"]'
        ) as HTMLTextAreaElement
      ).value = strength.description;
    });
  }

  // Modifying the load event listener to use these function
  window.addEventListener("load", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");

    if (username) {
      const savedData = localStorage.getItem(username);
      if (savedData) {
        const resumeData: ResumeData = JSON.parse(savedData);
        populateResumeForm(resumeData); // Populating the resume data
        displayResume(resumeData); // Displaying the resume after populating the form
      } else {
        alert("Resume not found!");
      }
    }
  });

  function displayResume(data: ResumeData) {
    // Seting the profile picture from the data
    const profilePicPreview = document.getElementById(
      "profile-pic"
    ) as HTMLImageElement;
    profilePicPreview.src = data.profilePic; // Using the stored data URL

    // Display Personal Details
    (document.getElementById("full-name") as HTMLElement).innerText =
      data.fullName;
    (document.getElementById("job-title") as HTMLElement).innerText =
      data.jobTitle;
    (
      document.getElementById("email") as HTMLElement
    ).innerHTML = `<span style="color: ${data.selectedColor}; margin-right: 5px;" class="fa-solid fa-envelope"></span><p>${data.email}</p>`;
    (
      document.getElementById("phone") as HTMLElement
    ).innerHTML = `<span style="color: ${data.selectedColor}; margin-right: 5px;" class="fa-solid fa-phone"></span><p>${data.phone}</p>`;
    (
      document.getElementById("location") as HTMLElement
    ).innerHTML = `<span style="color: ${data.selectedColor}; margin-right: 5px;" class="fa-solid fa-map-pin"></span><p>${data.location}</p>`;
    (
      document.getElementById("about") as HTMLElement
    ).innerHTML = `<p id="about-me">${data.aboutMe}</p>`;

    // Display Education
    const educationSection = document.getElementById(
      "education-details"
    ) as HTMLElement;
    educationSection.innerHTML = data.educationData
      .map(
        (edu: any) =>
          `<div class="education-header">
                <h3>${edu.degree}</h3>
                <span class="date">${edu.duration}</span>
           </div>
              <p class="school-details">${edu.institution}</p>`
      )
      .join("");

    // Display Work Experience
    const workExperienceSection = document.getElementById(
      "experience-details"
    ) as HTMLElement;
    workExperienceSection.innerHTML = data.workData
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

    // Display Strengths
    const strengthSections = document.getElementById(
      "strength-details"
    ) as HTMLElement;
    strengthSections.innerHTML = data.strengthData
      .map(
        (strength: any) => `
              <ul>
                <li>
                  <h3>${strength.strength}</h3>
                  <p>
                    ${strength.description}
                  </p>
                </li>
              </ul>`
      )
      .join("");

    // Display skills
    const skillsSection = document.getElementById(
      "skills-details"
    ) as HTMLElement;
    skillsSection.innerHTML = `<ul>${data.skills
      .map((skill: string) => `<li>${skill}</li>`)
      .join("")}</ul>`;

    // Set the color for the page title
    pageTitle.innerHTML = `<h1 class="page-title">Resume of <span style="color: ${data.selectedColor};">${data.fullName}</span></h1>`;    resumeContainer.style.display = "block";
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
