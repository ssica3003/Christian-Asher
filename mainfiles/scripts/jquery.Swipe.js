(function( $ ) {
    $.fn.swipe = function( callback ) {
        var touchDown = false,
            originalPosition = null,
            $el = $( this);

        function swipeInfo( event ) {
            var x = event.originalEvent.pageX,
                y = event.originalEvent.pageY,
                dx, dy;

            dx = ( x > originalPosition.x ) ? "right" : "left";
            dy = ( y > originalPosition.y ) ? "down" : "up";

            return {
                direction: {
                    x: dx,
                    y: dy
                },
                offset: {
                    x: x - originalPosition.x,
                    y: originalPosition.y - y
                }
            };
        }

        $el.on( "touchstart mousedown", function ( event ) {
            touchDown = true;
            originalPosition = {
                x: event.originalEvent.pageX,
                y: event.originalEvent.pageY
            };

            callback( '', '', '', 1 );
        } );

        $el.on( "touchend mouseup", function ( ) {
            touchDown = false;
            originalPosition = null;

            callback( '', '', 1, '' );
        } );

        $el.on( "touchmove mousemove", function ( event ) {
            if ( !touchDown ) { return;}
            var info = swipeInfo( event );
            callback( info.direction, info.offset);
        } );

        return true;
    };

})(jQuery);