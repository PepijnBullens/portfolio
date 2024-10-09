let yPos = 0;
let isScrolling = false;
const scrollableContainers = document.querySelectorAll('.scrollable');
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');
const side_header = document.querySelector('.side-header');

const searchForProjectInput = document.querySelector('#project-search');
const searchForSkillInput = document.querySelector('#skill-search');

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
const noProjectFound = document.querySelector('.no-project-found');

let currentSkill = 0;
let skillsPerPage = 3;
const skillDivs = document.querySelectorAll('.skill');
const noSkillFound = document.querySelector('.no-skill-found');

let currentAboutMe = 0;
const aboutMeImage = document.querySelector('.about-me-image img');
const aboutMeTitle = document.querySelector('.about-me-title');
const aboutMeDescription = document.querySelector('.about-me-description');
const noAboutMeFound = document.querySelector('.no-about-me-found');

window.addEventListener('load', () => {
    const savedSection = localStorage.getItem('section');
    if (savedSection !== null) {
        yPos = savedSection;
        sections[yPos].scrollIntoView();
    }

    if (window.innerWidth > 1000) {
        skillsPerPage = 3;
        currentSkill = 0;
        updateSkill(skillData);
    } else {
        skillsPerPage = 1;
        currentSkill = 0;
        updateSkill(skillData);
    }

    updateUI();

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

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch('/get-projects-by-name-request', {
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
            projectData = _data;
            currentImage = 0;
            updateProject(projectData);
        })
        .catch(error => {
            console.error('Error:', error);
        });
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
        projectDate.textContent = data[currentProject]['date_created'];
        projectDate.style.display = 'block';

        if (data[currentProject]['project_link'] == null) {
            projectLink.style.display = 'none';
        } else {
            projectLink.querySelector('a').href = data[currentProject]['project_link'];
            projectLink.style.display = 'block';
        }
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

// Smooth scrolling function using requestAnimationFrame
function smoothScroll(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        window.scrollTo(0, startY + (distance * ease));

        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            isScrolling = false;
        }
    }

    requestAnimationFrame(animation);
}

window.addEventListener('resize', function (event) {
    const targetY = sections[yPos].offsetTop;
    window.scrollTo(0, targetY);

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

// Handle scrolling with the mouse wheel
window.addEventListener('wheel', function (event) {
    // Check if the event originated from any scrollable container
    const isInsideScrollable = Array.from(scrollableContainers).some(container => container.contains(event.target));

    if (!isInsideScrollable) {
        if (!isScrolling) {
            isScrolling = true;

            if (event.deltaY > 1) {
                yPos = Math.min(yPos + 1, sections.length - 1);
            } else if (event.deltaY < -1) {
                yPos = Math.max(yPos - 1, 0);
            }

            updateUI();
            const targetY = sections[yPos].offsetTop;
            saveSection();
            smoothScroll(targetY, 500);
        }
    }
});

// Handle touch start
window.addEventListener('touchstart', function (event) {
    touchStartY = event.touches[0].clientY; // Record the starting touch position
}, false);

// Handle touch move
window.addEventListener('touchmove', function (event) {
    // Check if the event originated from any scrollable container
    const isInsideScrollable = Array.from(scrollableContainers).some(container => container.contains(event.target));

    if (!isInsideScrollable) {
        const touchEndY = event.touches[0].clientY; // Current Y position of the touch

        // Calculate the swipe distance
        const swipeDistance = touchStartY - touchEndY;

        // If the swipe is significant enough (to avoid accidental small swipes)
        if (Math.abs(swipeDistance) > 50 && !isScrolling) {
            isScrolling = true;

            if (swipeDistance > 0) { // Swipe up
                yPos = Math.min(yPos + 1, sections.length - 1);
            } else { // Swipe down
                yPos = Math.max(yPos - 1, 0);
            }

            updateUI();
            const targetY = sections[yPos].offsetTop;
            saveSection();
            smoothScroll(targetY, 500); // Smooth scroll with the same function

            // Reset touchStartY for the next swipe
            touchStartY = touchEndY;
        }
    }
}, false);

// Prevent default scrolling behavior when inside any scrollable container
scrollableContainers.forEach(container => {
    container.addEventListener('wheel', function (event) {
        // Allow default scroll behavior inside the container
        event.stopPropagation(); // Stop the event from bubbling up to the window
    }, {
        passive: false
    });

    container.addEventListener('touchmove', function (event) {
        // Allow default scroll behavior inside the container
        event.stopPropagation(); // Stop the event from bubbling up to the window
    }, {
        passive: false
    });
});

// Smooth scrolling function using requestAnimationFrame
function smoothScroll(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function animation(currentTime) {
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutQuad(progress);
        window.scrollTo(0, startY + (distance * ease));

        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            isScrolling = false;
        }
    }

    requestAnimationFrame(animation);
}

// Easing function for smooth transition
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function scaleValue(value, minOld, maxOld, minNew, maxNew) {
    return ((value - minOld) / (maxOld - minOld)) * (maxNew - minNew) + minNew;
}

function nextSection() {
    if (!isScrolling) {
        isScrolling = true;
        yPos = Math.max(yPos - 1, 0);
        updateUI();
        const targetY = sections[yPos].offsetTop;
        saveSection();
        smoothScroll(targetY, 500); // 700ms duration
    }
}

function previousSection() {
    if (!isScrolling) {
        isScrolling = true;
        yPos = Math.min(yPos + 1, sections.length - 1);
        updateUI();
        const targetY = sections[yPos].offsetTop;
        saveSection();
        smoothScroll(targetY, 500); // 700ms duration
    }
}

function goTo(index) {
    if (!isScrolling) {
        isScrolling = true;
        yPos = index;
        updateUI();
        const targetY = sections[yPos].offsetTop;
        saveSection();
        smoothScroll(targetY, 500); // 700ms duration
    }
}

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
