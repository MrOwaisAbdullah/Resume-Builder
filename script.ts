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
            document.body.classList.add('print-resume');

            window.print();
    
            document.body.classList.remove('print-resume');
        });
    
        document.body.appendChild(printButton);
});
