let yPos = 0;
let isScrolling = false;
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');
const side_header = document.querySelector('.side-header');

const searchForProjectInput = document.querySelector('#project-search');

let data = [];

window.addEventListener('load', () => {
    const savedSection = localStorage.getItem('section');
    if (savedSection !== null) {
        yPos = savedSection;
        sections[yPos].scrollIntoView();
    }
    updateUI();


    fetch('/get-projects-request', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(_data => {
            data = _data;
            updateProject(data);
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
            data = _data;
            currentImage = 0;
            updateProject(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


let currentProject = 0;
let currentImage = 0;
const portfolioImage = document.querySelector('.portfolio-image-image');
const portfolioImageControllers = document.querySelectorAll('.portfolio-image-controller');
const projectTitle = document.querySelector('.project-title');
const projectDescription = document.querySelector('.project-description');
const projectDate = document.querySelector('.project-date');
const projectLink = document.querySelector('.project-link');
const noProjectFound = document.querySelector('.no-project-found');

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
        portfolioImage.style.display = 'none';
        portfolioImageControllers.forEach(controller => controller.style.display = 'none');
        projectTitle.style.display = 'none';
        projectDescription.style.display = 'none';
        projectDate.style.display = 'none';
        projectLink.style.display = 'none';

    } else {
        noProjectFound.style.display = 'none';

        portfolioImage.src = data[currentProject]['images'][currentImage];
        portfolioImage.style.display = 'block';
        portfolioImageControllers.forEach(controller => controller.style.display = 'block');
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

function nextProject() {
    currentImage = 0;
    currentProject = Math.min(currentProject + 1, data.length - 1);
    updateProject(data);
}

function previousProject() {
    currentImage = 0;
    currentProject = Math.max(currentProject - 1, 0);
    updateProject(data);
}

function nextImage() {
    currentImage = Math.min(currentImage + 1, data[currentProject]['images'].length - 1);
    portfolioImage.src = data[currentProject]['images'][currentImage];
}

function previousImage() {
    currentImage = Math.max(currentImage - 1, 0);
    portfolioImage.src = data[currentProject]['images'][currentImage];
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

// Easing function for smooth transition
function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function scaleValue(value, minOld, maxOld, minNew, maxNew) {
    return ((value - minOld) / (maxOld - minOld)) * (maxNew - minNew) + minNew;
}

// Add event listener to the wheel event
window.addEventListener('wheel', function (event) {
    if (!isScrolling) {
        isScrolling = true;

        if (event.deltaY > 2) {
            yPos = Math.min(yPos + 1, sections.length - 1);
        } else if (event.deltaY < -2) {
            yPos = Math.max(yPos - 1, 0);
        }

        updateUI();
        const targetY = sections[yPos].offsetTop;
        saveSection();
        smoothScroll(targetY, 500); // 700ms duration
    }
});

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
