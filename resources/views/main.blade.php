<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Portfolio - Pepijn Bullens</title>

    <link rel="stylesheet" href="{{ asset('css/main.css') }}">

    <script src="{{ asset('js/global.js') }}" defer></script>
    <script src="{{ asset('js/main.js') }}" defer></script>
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
        </ul>
    </div>

    <div class="section home">
        <div class="home-content">
            <div class="home-content-info">
                <h1>Hey, ik ben Pepijn Bullens</h1>
                <p>Full-Stack developer</p>
            </div>
            <div class="home-content-image">
                <img src="{{ $profilePicture }}" alt="Pepijn Bullens">
            </div>
        </div>
    </div>
    <div class="section intro">
        <p>{!! $introText !!}</p>
    </div>
    <div class="section portfolio">
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
                <h2 class="project-title">Project 1</h2>
                <p class="project-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus
                    nec nunc
                    ultricies
                    ultricies. Nullam nec purus nec nunc ultricies ultricies.</p>
                <div class="portfolio-smalls">
                    <small class="project-date">10/4/2024</small>
                    <small class="project-link"><a target="_blank">Link naar
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
            <img onclick="previousProject();" src="{{ asset('imgs/icon-fast-backword.svg') }}" alt="icon-fast-backword">
            <img onclick="nextProject();" src="{{ asset('imgs/icon-fast-forward.svg') }}" alt="icon-fast-forward">
        </div>
    </div>
    <div class="section skills">
        <div class="skills-container">
            <h2 class="no-skill-found">Geen vaardigheid kunnen vinden...</h2>
            <div class="skill">
                <div class="skill-image">
                    <img class="skill-image-image" src="{{ asset('imgs/placeholders/skill_image.png') }}"
                        alt="placeholder">
                </div>
                <div class="skill-info">
                    <p class="skill-info-name">Lorem ipsum</p>
                    <small class="skill-info-date">10/4/2024</small>
                </div>
            </div>
            <div class="skill">
                <div class="skill-image">
                    <img class="skill-image-image" src="{{ asset('imgs/placeholders/skill_image.png') }}"
                        alt="placeholder">
                </div>
                <div class="skill-info">
                    <p class="skill-info-name">Lorem ipsum</p>
                    <small class="skill-info-date">10/4/2024</small>
                </div>
            </div>
            <div class="skill">
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
            <img onclick="previousSkill();" src="{{ asset('imgs/icon-fast-backword.svg') }}" alt="icon-fast-backword">
            <img onclick="nextSkill();" src="{{ asset('imgs/icon-fast-forward.svg') }}" alt="icon-fast-forward">
        </div>
    </div>
    <div class="section about-me">

    </div>
</body>

</html>