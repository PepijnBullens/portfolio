const searchForProjectInput = document.querySelector('#project-search');
const searchForSkillInput = document.querySelector('#skill-search');

let originalProjectData = [];
let projectData = [];
let skillData = [];
let aboutMeData = [];

let currentProject = 0;
let currentImage = 0;
const projectImage = document.querySelector('.portfolio-image-image');
const projectImageControllers = document.querySelectorAll('.portfolio-image-controller');
const projectTitle = document.querySelector('.project-title');
const projectDescription = document.querySelector('.project-description');
const projectDate = document.querySelector('.project-date');
const projectLink = document.querySelector('.project-link');
const projectSkillsContainer = document.querySelector('.project-skills');
const noProjectFound = document.querySelector('.portfolio .no-data-found');

let currentSkill = 0;
let skillsPerPage = 3;
const skillDivs = document.querySelectorAll('.skill');
const noSkillFound = document.querySelector('.skills .no-data-found');

let currentAboutMe = 0;
const aboutMeImage = document.querySelector('.about-me-image img');
const aboutMeTitle = document.querySelector('.about-me-title');
const aboutMeDescription = document.querySelector('.about-me-description');
const noAboutMeFound = document.querySelector('.about-me .no-data-found');

window.addEventListener('resize', () => {
    if (window.innerWidth > 1000) {
        skillsPerPage = 3;
        currentSkill = 0;
        updateSkill(skillData);
    } else {
        skillsPerPage = 1;
        currentSkill = 0;
        updateSkill(skillData);
    }
});

window.addEventListener('load', () => {
    if (window.innerWidth > 1000) {
        skillsPerPage = 3;
        currentSkill = 0;
        updateSkill(skillData);
    } else {
        skillsPerPage = 1;
        currentSkill = 0;
        updateSkill(skillData);
    }

    fetch('/get-about-me-request', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(_data => {
            aboutMeData = _data;
            updateAboutMe(aboutMeData);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch('/get-skills-request', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(_data => {
            skillData = _data;
            updateSkill(skillData);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch('/get-projects-request', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(_data => {                        
            originalProjectData = _data;
            projectData = _data;
            updateProject(projectData);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    // Add an event listener for 'keydown' on the input
    searchForProjectInput.addEventListener('keydown', function (event) {
        // Check if the 'Enter' key (key code 13) was pressed
        if (event.key === 'Enter') {
            // Prevent default behavior (form submission, etc.)
            event.preventDefault();
            searchForProject();
        }
    });

    // Add an event listener for 'keydown' on the input
    searchForSkillInput.addEventListener('keydown', function (event) {
        // Check if the 'Enter' key (key code 13) was pressed
        if (event.key === 'Enter') {
            // Prevent default behavior (form submission, etc.)
            event.preventDefault();
            searchForSkill();
        }
    });
});

function searchForProject() {
    const query = searchForProjectInput.value;

    if (query != '') {
        projectData = projectData.filter(project =>
            project['title'].toLowerCase().includes(query.toLowerCase())
        );
    } else {
        projectData = originalProjectData;
    }

    currentProject = 0;
    updateProject(projectData);
}

function searchForSkill() {
    const query = searchForSkillInput.value;

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch('/get-skills-by-name-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken // Include the CSRF token in the headers
            },
            body: JSON.stringify({
                query: query
            })
        })
        .then(response => response.json())
        .then(_data => {
            currentSkill = 0;
            skillData = _data;
            updateSkill(skillData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function toggleProjectImage() {
    document.querySelector('.blur-effect').classList.toggle('active');
    document.querySelector('.portfolio-image-image').classList.toggle('active');
}

function updateProject(data) {
    if (data.length == 0) {
        noProjectFound.style.display = 'block';
        projectTitle.textContent = '';
        projectDescription.textContent = '';
        projectDate.textContent = '';
        projectImage.style.display = 'none';
        projectImageControllers.forEach(controller => controller.style.display = 'none');
        projectTitle.style.display = 'none';
        projectDescription.style.display = 'none';
        projectDate.style.display = 'none';
        projectLink.style.display = 'none';

        projectSkillsContainer.querySelectorAll('.project-skill').forEach(skill => skill.remove());
        projectSkillsContainer.style.display = 'none';
    } else {
        noProjectFound.style.display = 'none';

        projectImage.src = data[currentProject]['images'][currentImage];
        projectImage.alt = data[currentProject]['title'] + ' foto';
        projectImage.style.display = 'block';
        projectImageControllers.forEach(controller => controller.style.display = 'block');
        projectTitle.textContent = data[currentProject]['title'];
        projectTitle.style.display = 'block';
        projectDescription.textContent = data[currentProject]['description'];
        projectDescription.style.display = 'block';
        projectDate.textContent = data[currentProject]['date'];
        projectDate.style.display = 'block';

        if (data[currentProject]['link'] == null) {
            projectLink.style.display = 'none';
        } else {
            projectLink.querySelector('a').href = data[currentProject]['link'];
            projectLink.style.display = 'block';
        }

        projectSkillsContainer.querySelectorAll('.project-skill').forEach(skill => skill.remove());

        data[currentProject]['skills'].forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.classList.add('project-skill');
            const skillImage = document.createElement('img');
            skillImage.src = skill['image'];
            skillElement.appendChild(skillImage);
            const skillName = document.createElement('p');
            skillName.textContent = skill['name'];
            skillElement.appendChild(skillName);
            projectSkillsContainer.appendChild(skillElement);
        });

        projectSkillsContainer.style.display = 'flex';
    }
}

function updateSkill(data) {
    if (data.length == 0) {
        noSkillFound.style.display = 'block';

        skillDivs.forEach(skillDiv => {
            const skillImage = skillDiv.querySelector('.skill-image-image');
            const skillName = skillDiv.querySelector('.skill-info-name');
            const skillDate = skillDiv.querySelector('.skill-info-date');

            skillImage.style.display = 'none';
            skillName.style.display = 'none';
            skillDate.style.display = 'none';

            skillDiv.style.display = 'none';
        });
    } else {
        skillDivs.forEach((skillDiv, index) => {
            // Calculate the correct index in the data array
            const i = currentSkill * skillsPerPage + index;

            // Check if the index exists within the data array bounds
            if (index < skillsPerPage && i < data.length) {
                // Show the skill div and set its content
                skillDiv.style.display = 'block';

                const skillImage = skillDiv.querySelector('.skill-image-image');
                const skillName = skillDiv.querySelector('.skill-info-name');
                const skillDate = skillDiv.querySelector('.skill-info-date');

                skillImage.src = data[i]['image'];
                skillImage.alt = data[i]['name'] + ' foto';
                skillImage.style.display = 'block';
                skillName.textContent = data[i]['name'];
                skillName.style.display = 'block';
                skillDate.textContent = data[i]['date'];
                skillDate.style.display = 'block';
            } else {
                // If index is out of bounds or exceeds skillsPerPage, hide the elements
                skillDiv.style.display = 'none';
            }
        });

        // Hide the "no skills found" message if it was previously shown
        noSkillFound.style.display = 'none';

    }
}

function updateAboutMe(data) {
    if (data.length == 0) {
        noAboutMeFound.style.display = 'block';
        aboutMeImage.style.display = 'none';
        aboutMeTitle.style.display = 'none';
        aboutMeDescription.style.display = 'none';
    } else {
        noAboutMeFound.style.display = 'none';
        aboutMeImage.src = data[currentAboutMe]['image'];
        aboutMeImage.alt = data[currentAboutMe]['image'];
        aboutMeImage.style.display = 'block';
        aboutMeTitle.textContent = data[currentAboutMe]['title'];
        aboutMeTitle.style.display = 'block';
        aboutMeDescription.textContent = data[currentAboutMe]['description'];
        aboutMeDescription.style.display = 'block';
    }
}

function nextProject() {
    if (currentProject < projectData.length - 1) {
        currentImage = 0;
        currentProject = Math.min(currentProject + 1, projectData.length - 1);
        updateProject(projectData);
    }
}

function previousProject() {
    if (currentProject > 0) {
        currentImage = 0;
        currentProject = Math.max(currentProject - 1, 0);
        updateProject(projectData);
    }
}

function nextSkill() {
    currentSkill = Math.min(currentSkill + 1, Math.floor(skillData.length / 3));
    updateSkill(skillData);
}

function previousSkill() {
    currentSkill = Math.max(currentSkill - 1, 0);
    updateSkill(skillData);
}

function nextImage() {
    currentImage = Math.min(currentImage + 1, projectData[currentProject]['images'].length - 1);
    projectImage.src = projectData[currentProject]['images'][currentImage];
    projectImage.alt = projectData[currentProject]['title'] + ' foto';
}

function previousImage() {
    currentImage = Math.max(currentImage - 1, 0);
    projectImage.src = projectData[currentProject]['images'][currentImage];
    projectImage.alt = projectData[currentProject]['title'] + ' foto';
}

function nextAboutMe() {
    currentAboutMe = Math.min(currentAboutMe + 1, aboutMeData.length - 1);
    updateAboutMe(aboutMeData);
}

function previousAboutMe() {
    currentAboutMe = Math.max(currentAboutMe - 1, 0);
    updateAboutMe(aboutMeData);
}

let yPos = 0;
const side_header = document.querySelector('.side-header');
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');

new fullpage('#fullpage', {
    autoScrolling: true,
    navigation: false,
    normalScrollElements: '.scrollable',
    onLeave: function (origin, destination, direction) {
        yPos = destination.index;
        saveSection();
        updateUI();

        if (destination.index == 0) {
            gsap.from(".animated-text-move-up-intro-2", {
                duration: 1,
                y: 200,
                ease: "power2.out",
                stagger: 0.2,
            });

            gsap.from(".animated-text-rotate-image-intro-2", {
                duration: 1,
                y: 300,
                ease: "power2.out",
                stagger: 0.2,
            });

            gsap.from(".animated-text-rotate-image-intro-2", {
                duration: 1,
                rotation: -25,
                opacity: 0,
                ease: "power2.out",
                stagger: 0.2,
                delay: 0.2
            });
        } else if (destination.index == 1) {

            gsap.from(".animated-text-move-right-intro", {
                duration: 1,
                opacity: 0,
                x: -100,
                ease: "power2.out",
                stagger: 0.2,
            });
        } else if (destination.index == 2) {
            gsap.from(".animated-text-move-up-projects", {
                duration: 1,
                y: 80,
                ease: "power2.out",
                stagger: 0.1,
            });

            gsap.from(".animated-text-opacity-projects", {
                duration: 2,
                opacity: 0,
                ease: "power2.out",
                stagger: 0.2,
            });
        } else if (destination.index == 3) {
            gsap.from(".animated-text-move-up-skills", {
                duration: 1,
                y: 60,
                ease: "power2.out",
                delay: 0.4,
                stagger: 0.1,
            });
        } else if (destination.index == 4) {
            gsap.from(".animated-text-move-up-about-me", {
                duration: 1,
                y: 80,
                ease: "power2.out",
                stagger: 0.1,
            });

        }
    }
});

function updateUI() {
    if (yPos == 0) {
        side_header.classList.remove('active');
    } else {
        side_header.classList.add('active');
    }

    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index == yPos);
    });
}

function saveSection() {
    localStorage.setItem('section', yPos);
}

function goTo(index, withAnimation = true) {
    yPos = index;
    updateUI();
    saveSection();

    if (withAnimation) {
        fullpage_api.moveTo(yPos + 1);
    } else {
        fullpage_api.setScrollingSpeed(0); // Set scrolling speed to 0 for no animation

        fullpage_api.moveTo(yPos + 1);

        setTimeout(function () {
            fullpage_api.setScrollingSpeed(700); // Restore scrolling speed to normal
        }, 100);
    }
}

window.addEventListener('load', () => {
    yPos = parseInt(localStorage.getItem('section')) || 0;
    goTo(yPos, false);

    gsap.from(".animated-text-move-up-intro", {
        duration: 1,
        y: 300,
        ease: "power2.out",
        stagger: 0.2,
    });

    gsap.from(".animated-text-rotate-image-intro", {
        duration: 1,
        y: 300,
        ease: "power2.out",
        stagger: 0.2,
    });

    gsap.from(".animated-text-rotate-image-intro", {
        duration: 1,
        rotation: -25,
        opacity: 0,
        ease: "power2.out",
        stagger: 0.2,
        delay: 0.2
    });
});
