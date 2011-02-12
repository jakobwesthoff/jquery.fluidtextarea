/**
 * Copyright (c) 2011 Jakob Westhoff
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function( $, jQuery ) {
    /**
     * Representation of a shadowed textarea.
     *
     * The shadow will inherit all the visual styles of the textarea, except
     * its height definition. This way it is possible to determine the height
     * the text currently in the textareas buffer does occupy.
     *
     * @constructor
     * @param jQueryObject source
     */
    function ShadowedTextArea( source ) {
        var height;

        /**
         * Source element used for the generation of the shadow
         * 
         * @private
         * @type jQueryObject
         */
        this.source_ = source;

        /**
         * Text content currently stored inside the source textarea
         *
         * @private
         * @type string
         */
        this.sourceContent_ = source.val();

        /**
         * Height of the shadowed textarea
         *
         * @private
         * @type number
         */
        this.sourceHeight_ = source.height();

        /**
         * shadow element
         *
         * @private
         * @type jQueryObject
         */
        this.shadow_ = this.createShadow_( source );

        this.monitorTextArea_( source );
    }

    /**
     * Create a shadow of the given textarea and return it
     *
     * The shadow will be a textarea element encapsulated into a jquery set.
     * It will inherit all the styles of the source element except it's height
     * restricting properties.
     * 
     * @private
     * @param jQueryObject source
     * @returns jQueryObject
     */
    ShadowedTextArea.prototype.createShadow_ = function( source ) {
        var shadow = $( "<div />" );
        this.transferStyles_( source, shadow );

        this.transferText_( source, shadow );
        
        return shadow;
    };

    /**
     * Transfer all css properties relevant for the dimensions of textareas
     * from one element to another effectively making their size identical
     *
     * Properties controlling the height of the area are not transfered.
     *
     * @private
     * @param jQueryObject source
     * @param jQueryObject target
     */
    ShadowedTextArea.prototype.transferStyles_ = function( source, target ) {
        $.each(
            [
                'direction',
                'font-family',
                'font-size',
                'font-style',
                'font-weight',
                'letter-spacing',
                'line-height',
                'max-width',
                'min-width',
                'overflow-x',
                'overflow-y',
                'padding-bottom',
                'padding-left',
                'padding-right',
                'padding-top',
                'text-align',
                'text-decoration',
                'text-transform',
                'width',
                'word-spacing',
                'word-wrap'
            ],
            function( index, property ) {
                target.css(
                    property,
                    source.css( property )
                );
            }
        );
    };

    /**
     * Transfer the text content from the source textarea to the shadowed target.
     *
     * @private
     * @param jQueryObject source
     * @param jQueryObject target
     */
    ShadowedTextArea.prototype.transferText_ = function( source, target ) {
        var content = source.val();
        target.val( content );
    }

    /**
     * Monitor a given textarea for content changes.
     *
     * If the size of the textarea changes due to modifications of the content
     * a height-changed event is fired on the ShadowedTextArea object. The event
     * receives the newly calculated height.
     * 
     * @private
     * @param jQueryObject area
     */
    ShadowedTextArea.prototype.monitorTextArea_ = function( area ) {        
        area.bind(
            "keyup.shadowedtextarea",
            jQuery.proxy( function( e ) {
                var newContent
                  , newHeight;

                newContent = area.val();
                if ( newContent === this.sourceContent_ ) {
                    // The content did not change. No new height calculation is
                    // needed.
                    return;
                }

                this.sourceContent_ = newContent;
                this.transferText_( area, this.shadow_ );
                
                newHeight = this.getHeight();
                if ( newHeight === this.sourceHeight_ ) {
                    // Height did not change. Nothing to do.
                    return;
                }

                this.sourceHeight_ = newHeight;
                $(this).trigger( "height-changed", [newHeight] );
            }, this )
        );
    };

    /**
     * Calculate the height of the shadow textarea and return it
     *
     * @return number
     */
    ShadowedTextArea.prototype.getHeight = function() {
    };

    jQuery.fn.fluidtextarea = function() {
        this.filter( "textarea" ).each( function() {
            var target = $(this)
              , shadow;

            if ( target.data( "fluidtextarea-shadow" ) ) {
                // Fluidtextarea is already initialized. Ignore.
                return;
            }

            // Scrollbars should no longer be displayed for the fluidtextarea
            target.css( "overflow", "hidden" );

            shadow = new shadowdTextArea( target );
            target.data( "fluidtextarea-shadow", shadow );
            
            // Set the needed height initially
            target.height( shadow.getHeight() );

            // Monitor height changes to adapt to them
            $(shadow).bind( 
                "height-changed", 
                function( e, height ) {
                    target.height( height );
                }
            );
        });
    };
})( jQuery, jQuery );
