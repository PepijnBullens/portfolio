<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

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

    </div>
    <div class="section skills">

    </div>
    <div class="section about-me">

    </div>
</body>

</html>