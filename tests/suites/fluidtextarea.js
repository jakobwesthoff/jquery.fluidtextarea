(function( $, jQuery ) {
    module( "fluidtextarea", {
        "setup": function() {
            this.textarea = $( "#textarea-fixture" );
            this.textarea.fluidtextarea();
            this.shadow = this.textarea.prev();            
        },
        "contentFixture": function() {
            return [
                "foobar",
                "foo\nbar",
                "foo\nbar\nbaz",
                "foo\n",
                "\n",
                "foo bar baz",
                "fooooooooooooo",
                "fooooooooooooo baaaaaaaaaaar",
                "fo  ba",
                "fo   bar",
                "fo   bar "
            ];
        }
    });

    test( "Plugin function defined", {
        "setup": function() {}
    }, function() {
        ok( 
            typeof $( "<div />" ).fluidtextarea === "function",
            "Plugin function is defined and of type 'function'"
        );
    });

    test( "Shadow created and inserted", function() {
        var shadowedTextArea;
        
        same(
            this.shadow.length,
            1,
            "Textarea has a previous sibling"
        );
        ok(
            this.shadow.is( "textarea" ),
            "Shadow is of type textarea"
        );
        ok( 
            this.textarea.data( "fluidtextarea-shadow" ) !== null,
            "ShadowedTextArea object is assigned to original textarea"
        );
        
        shadowedTextArea = this.textarea.data( "fluidtextarea-shadow" );
        same(
            this.textarea.height(),
            shadowedTextArea.getHeight(),
            "Initial height of textarea is set correctly"
        );
    });

    test( "Shadow is invisible", function() {
        var position
          , size;


        // The shadow needs to be positioned inside the document body, because
        // inside the fixture area quint moves it out of the visual area
        // automatically.
        this.shadow.detach();
        $( "body" ).append( this.shadow );

        position = this.shadow.offset();
        size = {
            width: this.shadow.width(),
            height: this.shadow.height()
        };

        ok(
            ( position.top + size.height <= 0 ) && ( position.left + size.width ) <= 0,
            "Shadow element is positioned outside of the visual area"
        );

        // Remove the element again, as it is not cleaned up by qunit
        // automatically
        this.shadow.remove();
    });

    test( "Shadow has same content after initialization", {
        "setup": function() {}  
    }, function() {
        var textarea
          , shadow;
          
        textarea = $( "#textarea-fixture" );
        textarea.val( "Foo\nbar" );
        textarea.fluidtextarea();
        
        shadow = textarea.prev();
        
        ok(
            shadow.val() === textarea.val(),
            "Shadow has same text content than textarea"
        );
    });

    /**
     * ATTENTION: If this test fails all tests after this one can not be
     * trusted to produce accurate results!
     */
    test( "scrollTop value of textareas is calculated correctly", function() {
        var textarea;
        
        textarea = $( "<textarea />" )
            .height( 3 )
            .val( 
                new Array( 423 ).join( "foo" )
            )
            .appendTo( 
                $( "#qunit-fixture" )
            );

        textarea.scrollTop( 23 );
        same(
            textarea.scrollTop(),
            23,
            "scrollTop calculation incorrect: ATTENTION: THIS DOES AFFECT THE CORRECTNESS OF ALL FOLLOWING TESTS."
        );

        textarea.scrollTop( 0 );
        same(
            textarea.scrollTop(),
            0,
            "scrollTop calculation incorrect: ATTENTION: THIS DOES AFFECT THE CORRECTNESS OF ALL FOLLOWING TESTS."
        );
    });

    test( "Size calculation of shadow area is correct", function() {
        var shadowedTextArea
          , shadow
          , contents
          , content
          , calculatedHeight
          , i;

        shadowedTextArea = this.textarea.data( "fluidtextarea-shadow" );
        shadow = shadowedTextArea.shadow_;

        contents = this.contentFixture();
        for ( i = 0; i < contents.length; ++i ) {
            content = contents[i];
            
            shadow.val( content );
            calculatedHeight = shadowedTextArea.getHeight();

            // Set the shadow area to the calculatedHeight an check if it still
            // needs to be scrolled.
            shadow.height( calculatedHeight );

            // Check if the textarea still needs scrolling
            shadow.scrollTop( 999999 );
            same(
                shadow.scrollTop(),
                0,
                "Text fits into textarea of calculated height"
            );
        }
    });

    test( "Text area adapts size to input", function() {
        var contents
          , content
          , calculatedHeight
          , i;

        contents = this.contentFixture();
        for ( i = 0; i < contents.length; ++i ) {
            content = contents[i];
            
            this.textarea.val( content );
            
            // The keyup event is monitored to detect changes therefore it
            // needs to triggered in order for the textarea to update its
            // height.
            this.textarea.trigger( "keyup" );

            // Check if the textarea still needs scrolling
            this.textarea.scrollTop( 999999 );
            same(
                this.textarea.scrollTop(),
                0,
                "Text fits into textarea of calculated height"
            );
        }
    });

    test( "Text area reduces size to fit input", function() {
        var firstHeight
          , secondHeight;

        this.textarea.val( "foo bar baz" );
        this.textarea.trigger( "keyup" );
        
        firstHeight = this.textarea.height();

        this.textarea.val( "foo" );
        this.textarea.trigger( "keyup" );
        
        secondHeight = this.textarea.height();

        ok(
            firstHeight > secondHeight,
            "Textarea reduced size to fit smaller content"
        );
    });
})( jQuery, jQuery );
