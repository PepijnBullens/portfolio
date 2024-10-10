<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Portfolio - Pepijn Bullens</title>

    <link rel="stylesheet" href="{{ asset('css/main.css') }}">

    <script src="{{ asset('js/global.js') }}" defer></script>
    <script src="{{ asset('js/main.js') }}" defer></script>
    <script src="{{ asset('js/gsap.js') }}" defer></script>

    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

    <link rel="stylesheet" type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.1.2/fullpage.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.1.2/fullpage.min.js"></script>
</head>

<body>
    <div class="side-header">
        <ul>
            <li>
                <div class="dot active"></div>
                <p onclick="goTo(0)">home</p>
            </li>
            <li>
                <div class="dot"></div>
                <p onclick="goTo(1)">intro</p>
            </li>
            <li>
                <div class="dot"></div>
                <p onclick="goTo(2)">portfolio</p>
            </li>
            <li>
                <div class="dot"></div>
                <p onclick="goTo(3)">vaardigheden</p>
            </li>
            <li>
                <div class="dot"></div>
                <p onclick="goTo(4)">over mij</p>
            </li>
            <li>
                <div class="dot"></div>
                <p onclick="goTo(5)">social media</p>
        </ul>
    </div>

    <div id="fullpage">
        <div class="section home">
            <div class="home-content">
                <div class="home-content-info">
                    <h1 class="animated-text-move-up-intro animated-text-move-up-intro-2">Hey, ik ben Pepijn Bullens
                    </h1>
                    <p class="animated-text-move-up-intro animated-text-move-up-intro-2">Web developer</p>
                </div>
                <div class="home-content-image">
                    <img class="animated-text-rotate-image-intro animated-text-rotate-image-intro-2"
                        src="{{ $profilePicture }}" alt="Pepijn Bullens">
                </div>
            </div>
        </div>
        <div class="section intro">
            <p class="animated-text-move-right-intro">{!! $introText !!}</p>
        </div>
        <div class="section portfolio animated-text-opacity-projects">
            <div class="portfolio-project">
                <h2 class="no-project-found">Geen project kunnen vinden...</h2>
                <div class="portfolio-image">
                    <div onclick="toggleProjectImage()" class="blur-effect"></div>
                    <img class="portfolio-image-controller left" onclick="previousImage();"
                        src="{{ asset('imgs/icon-fast-backword.svg') }}" alt="icon-fast-backword">
                    <img onclick="toggleProjectImage()" class="portfolio-image-image"
                        src="{{ asset('imgs/placeholders/project_image.png') }}" alt="placeholder">
                    <img class="portfolio-image-controller right" onclick="nextImage();"
                        src="{{ asset('imgs/icon-fast-forward.svg') }}" alt="icon-fast-forward">
                </div>
                <div class="portfolio-info">
                    <h2 class="project-title animated-text-move-up-projects">Project</h2>
                    <p class="project-description scrollable animated-text-move-up-projects">Lorem ipsum dolor sit amet,
                        consectetur
                        adipiscing elit.
                        Nullam nec purus
                        nec nunc
                        ultricies
                        ultricies. Nullam nec purus nec nunc ultricies ultricies.</p>
                    <div class="portfolio-smalls">
                        <small class="project-date animated-text-move-up-projects">10/4/2024</small>
                        <small class="project-link animated-text-move-up-projects"><a target="_blank">Link naar
                                project</a></small>
                    </div>
                </div>
            </div>

            <div class="portfolio-controller">
                <label for="project-search">
                    <img onclick="searchForProject();" src="{{ asset('imgs/icon-magnifying-glass.svg') }}"
                        alt="icon-magnifying-glass">
                    <input type="text" name="project-search" id="project-search">
                </label>
                <img onclick="previousProject();" src="{{ asset('imgs/icon-fast-backword.svg') }}"
                    alt="icon-fast-backword">
                <img onclick="nextProject();" src="{{ asset('imgs/icon-fast-forward.svg') }}" alt="icon-fast-forward">
            </div>
        </div>
        <div class="section skills">
            <div class="skills-container">
                <h2 class="no-skill-found">Geen vaardigheid kunnen vinden...</h2>
                <div class="skill animated-text-move-up-skills">
                    <div class="skill-image">
                        <img class="skill-image-image" src="{{ asset('imgs/placeholders/skill_image.png') }}"
                            alt="placeholder">
                    </div>
                    <div class="skill-info">
                        <p class="skill-info-name">Lorem ipsum</p>
                        <small class="skill-info-date">10/4/2024</small>
                    </div>
                </div>
                <div class="skill animated-text-move-up-skills">
                    <div class="skill-image">
                        <img class="skill-image-image" src="{{ asset('imgs/placeholders/skill_image.png') }}"
                            alt="placeholder">
                    </div>
                    <div class="skill-info">
                        <p class="skill-info-name">Lorem ipsum</p>
                        <small class="skill-info-date">10/4/2024</small>
                    </div>
                </div>
                <div class="skill animated-text-move-up-skills">
                    <div class="skill-image">
                        <img class="skill-image-image" src="{{ asset('imgs/placeholders/skill_image.png') }}"
                            alt="placeholder">
                    </div>
                    <div class="skill-info">
                        <p class="skill-info-name">Lorem ipsum</p>
                        <small class="skill-info-date">10/4/2024</small>
                    </div>
                </div>
            </div>

            <div class="skill-controller">
                <label for="skill-search">
                    <img onclick="searchForSkill();" src="{{ asset('imgs/icon-magnifying-glass.svg') }}"
                        alt="icon-magnifying-glass">
                    <input type="text" name="skill-search" id="skill-search">
                </label>
                <img onclick="previousSkill();" src="{{ asset('imgs/icon-fast-backword.svg') }}"
                    alt="icon-fast-backword">
                <img onclick="nextSkill();" src="{{ asset('imgs/icon-fast-forward.svg') }}" alt="icon-fast-forward">
            </div>
        </div>
        <div class="section about-me">
            <div class="about-me">
                <h2 class="no-about-me-found">Geen informatie kunnen vinden...</h2>
                <div class="about-me-image">
                    <img src="{{ asset('imgs/placeholders/about_me_image.png') }}" alt="placeholder">
                </div>
                <div class="about-me-info">
                    <h2 class="about-me-title animated-text-move-up-about-me">over mij</h2>
                    <p class="about-me-description scrollable animated-text-move-up-about-me">Lorem ipsum dolor sit
                        amet,
                        consectetur adipiscing elit.
                        Nullam nec
                        purus
                        nec nunc
                        ultricies
                        ultricies. Nullam nec purus nec nunc ultricies ultricies.</p>
                </div>
            </div>
            <div class="about-me-controller">
                <img onclick="previousAboutMe();" src="{{ asset('imgs/icon-fast-backword.svg') }}"
                    alt="icon-fast-backword">
                <img onclick="nextAboutMe();" src="{{ asset('imgs/icon-fast-forward.svg') }}" alt="icon-fast-forward">
            </div>
        </div>
        <div class="section social-media">
            <a href="https://www.youtube.com/@Abfebalde" target="_blank"><img src="{{ asset('imgs/youtube.png') }}"
                    alt="youtube icon"></a><a href="https://www.instagram.com/pepijnbullens/" target="_blank"><img
                    src="{{ asset('imgs/instagram.png') }}" alt="instagram icon"></a><a
                href="https://open.spotify.com/user/pepie8" target="_blank"><img src="{{ asset('imgs/spotify.png') }}"
                    alt="spotify icon"></a>
        </div>
    </div>
</body>

</html>