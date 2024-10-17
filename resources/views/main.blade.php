<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Portfolio - Pepijn Bullens</title>

    <meta name="description"
        content="De persoonlijke website van Pepijn Bullens. Bevat zijn portfolio, vaardigheden & verhaal.">

    <meta property="og:title" content="Pepijn Bullens - Portfolio & vaardigheden">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://www.pepijnbullens.nl">
    <meta property="og:image" content="https://pepijnbullens.nl/pfp.png">
    <meta property="og:description"
        content="De persoonlijke website van Pepijn Bullens. Bevat zijn portfolio, vaardigheden & verhaal.">
    <meta property="og:site_name" content="pepijnbullens.nl">
    <meta property="og:locale" content="nl_NL">

    <link rel="icon" href="{{ asset('imgs/icons/favicon.ico') }}" sizes="any">
    <link rel="icon" href="{{ asset('imgs/icons/icon.svg') }}" type="image/svg+xml">
    <link rel="apple-touch-icon" href="{{ asset('imgs/icons/icon.png') }}">

    <link rel="manifest" href="{{ asset('site.webmanifest') }}">
    <meta name="theme-color" content="#000000">

    <link rel="stylesheet" href="{{ asset('css/main.css') }}">

    <script src="{{ asset('js/global.js') }}" defer></script>
    <script src="{{ asset('js/main.js') }}" defer></script>

    <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>

    <link rel="stylesheet" type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.1.2/fullpage.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fullPage.js/3.1.2/fullpage.min.js"></script>
</head>

<body>
    <div id="page-loader">
        <div></div>
    </div>

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
            <h2 class="no-data-found">Geen project kunnen vinden...</h2>

            <div onclick="toggleProjectImage()" class="zoomed-in-blur-effect">
                <img src="" alt="">
            </div>

            <div class="portfolio-project">
                <div class="portfolio-image">
                    <img class="portfolio-image-controller left" onclick="previousImage();"
                        src="{{ asset('imgs/icon-fast-backword.svg') }}" alt="icon-fast-backword">
                    <img onclick="toggleProjectImage()" class="portfolio-image-image"
                        src="{{ asset('imgs/placeholders/project_image.png') }}" alt="placeholder">
                    <img class="portfolio-image-controller right" onclick="nextImage();"
                        src="{{ asset('imgs/icon-fast-forward.svg') }}" alt="icon-fast-forward">
                    <div class="image-loader">
                        <div></div>
                    </div>
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
                <div class="project-skills scrollable">
                    <p>Gebruikte vaardigheden</p>
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
            <h2 class="no-data-found">Geen vaardigheid kunnen vinden...</h2>

            <div class="skills-container">
                <div class="skill animated-text-move-up-skills">
                    <div class="skill-loader">
                        <div></div>
                    </div>
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
                    <div class="skill-loader">
                        <div></div>
                    </div>
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
                    <div class="skill-loader">
                        <div></div>
                    </div>
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
            <h2 class="no-data-found">Geen informatie kunnen vinden...</h2>

            <div class="about-me">
                <div class="about-me-image">
                    <div class="about-me-loader">
                        <div></div>
                    </div>
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