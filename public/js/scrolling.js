let yPos = 0;
let isScrolling = false;
const scrollableContainers = document.querySelectorAll('.scrollable');
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');
const side_header = document.querySelector('.side-header');


window.addEventListener('load', function () {
    const savedSection = localStorage.getItem('section');
    if (savedSection !== null) {
        yPos = savedSection;
        sections[yPos].scrollIntoView();
    }

    updateUI();
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

let yStart = 0;

// Handle scrolling with the mouse wheel
window.addEventListener('wheel', function (event) {
    // Check if the event originated from any scrollable container
    const isInsideScrollable = Array.from(scrollableContainers).some(container => container.contains(event.target));

    if (!isInsideScrollable) {
        if (!isScrolling) {
            isScrolling = true;

            if (event.deltaY > 1.5) {
                yPos = Math.min(yPos + 1, sections.length - 1);
            } else if (event.deltaY < -1.5) {
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
