gsap.from(".animated-text-move-up-intro", {
    duration: 1,
    y: 300,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".home",
        start: "top center",
        toggleActions: "play none none none",
    }
});

gsap.from(".animated-text-rotate-image-intro", {
    duration: 1,
    y: 300,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".home",
        start: "top center",
        toggleActions: "play none none none",
    }
});

gsap.from(".animated-text-rotate-image-intro", {
    duration: 1,
    rotation: -25,
    opacity: 0,
    ease: "power2.out",
    stagger: 0.2,
    delay: 0.7,
    scrollTrigger: {
        trigger: ".home",
        start: "top center",
        toggleActions: "play none none none",
    }
});


gsap.from(".animated-text-move-right-intro", {
    duration: 1,
    opacity: 0,
    x: -100,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".intro",
        start: "top center",
        toggleActions: "play none none reverse",
    }
});

gsap.from(".animated-text-move-up-projects", {
    duration: 1,
    y: 80,
    ease: "power2.out",
    stagger: 0.1,
    scrollTrigger: {
        trigger: ".portfolio",
        start: "top center",
        toggleActions: "play none none reverse",
    }
});

gsap.from(".animated-text-opacity-projects", {
    duration: 2,
    opacity: 0,
    ease: "power2.out",
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".portfolio",
        start: "top center",
        toggleActions: "play none none reverse",
    }
});

gsap.from(".animated-text-move-up-skills", {
    duration: 1,
    y: 60,
    ease: "power2.out",
    stagger: 0.1,
    scrollTrigger: {
        trigger: ".skills",
        start: "top center",
        toggleActions: "play none none reverse",
    }
});

gsap.from(".animated-text-move-up-about-me", {
    duration: 1,
    y: 80,
    ease: "power2.out",
    stagger: 0.1,
    scrollTrigger: {
        trigger: ".about-me",
        start: "top center",
        toggleActions: "play none none reverse",
    }
});
