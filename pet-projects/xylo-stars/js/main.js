$(function() {

    // $.fn.checkPosition = function() {
    //     var top = this[0].getBoundingClientRect().top;
    //     var left = this[0].getBoundingClientRect().left;
    //     var right = this[0].getBoundingClientRect().right;
    //     var bottom = this[0].getBoundingClientRect().bottom;

    //     // console.log(top, right, bottom, left)
    // }

    buzz.defaults.formats = ['wav'];
    var xyloSounds = [];
    var sounds = ['a', 'b', 'c', 'c2', 'd1', 'e1', 'f', 'g'];

    for (var i = 0; i < sounds.length; i++) {
        var sound = sounds[i];
        xyloSounds.push(new buzz.sound('audio/' + sound));
    }

    var starRatio = 228/225;
    var countStars = getRandomInt(7, 20);
    var securityZoneSize = getRandomInt(10, 100);

    divideArea(securityZoneSize, countStars);

    $(window).on('resize', function() {
        countStars = getRandomInt(7, 20);
        securityZoneSize = getRandomInt(10, 100);

        $('.star').remove();
        divideArea(securityZoneSize, countStars);
    });

    $('.star').on('mousedown', function() {
        var concreteSound = getRandomInt(0, sounds.length);
        if (xyloSounds[concreteSound].isPaused()) {
            xyloSounds[concreteSound].play();
        } else {
            xyloSounds[concreteSound].stop().play();
        }

    });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    function getRandom() {
        return Math.random() > 0.5 ? Math.random() :  Math.random() -1;
    }

    function setSquare(topCoord, leftCoord, $elementSide) {

        var newSquare = document.createElement('div');
        $(newSquare).addClass('star');
        $(newSquare).css({
            'top': topCoord + 100 * getRandom(),
            'left': leftCoord + 10 * getRandom(),
            'width': $elementSide * starRatio,
            'height': $elementSide
        });
        $('.sky').append(newSquare);
    }

    function divideArea(securityZoneSize, numberOfSquares) {
        var $width = $(window).width() - securityZoneSize;
        var $height = $(window).height() - securityZoneSize;
        var $square = $width * $height;
        var $elementSquare = parseInt($square / numberOfSquares);
        var $elementSide = parseInt(Math.sqrt($elementSquare));

        for (var i = securityZoneSize; i < $width - $elementSide; i+= $elementSide) {
            for (var j = securityZoneSize; j < $height - $elementSide; j+= $elementSide) {
                setSquare(j, i, $elementSide);
            }
        }
    }
});
