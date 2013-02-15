<?php
session_start();
?>
<html dropzone="copy string:text/html" xmlns="http://www.w3.org/1999/html">
<head>
    <title>SpotiBuy - Spotify tracks to Amazon purchase links!</title>
    <link href="css/style.css" rel="stylesheet" type="text/css"/>
    <script src="js/jquery.js"></script>
    <script src="js/jquery-ui-1.8.7.custom.min.js"></script>
    <script src="js/spotibuy.js"></script>
</head>
<body>
<h1><span>SpotiBuy</span> <span>Spotify tracks to Amazon purchase links!</span></h1>

<div id="container">
</div>
<div id="tracklist">
    <strong>Drag and drop the playlist or track from Spotify into this area.</strong>
    <br>
        <ol>
            <li>Click and drag the playlist / item title from the left column...</li>
            <li>Drop it on this window...</li>
            <li>We'll make Amazon links for your songs!</li>
        </ol>
</div>

</body>
</html>
