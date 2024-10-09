<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1 user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>CMS - Pepijn Bullens</title>

    <link rel="stylesheet" href="{{ asset('css/cms.css') }}">

    <script src="{{ asset('js/global.js') }}" defer></script>
    <script src="{{ asset('js/cms.js') }}" defer></script>
</head>

<body>
    <aside>
        <ul>
            <li><a href="{{ url('cms/pagina-data') }}">pagina data</a></li>
            <li><a href="{{ url('cms/projecten') }}">projecten</a></li>
            <li><a href="{{ url('cms/vaardigheden') }}">vaardigheden</a></li>
            <li><a href="{{ url('cms/over-mij') }}">over mij</a></li>
        </ul>
    </aside>
</body>

</html>