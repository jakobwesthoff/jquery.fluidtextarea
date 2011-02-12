(function( $, jQuery ) {
    module( "fluidtextarea", {
        "setup": function() {
            this.textarea = $( "#textarea-fixture" );
            this.textarea.fluidtextarea();
            this.shadow = this.textarea.prev();            
        },
        "contentFixture": function() {
            return {
                "foobar": 30,
                "foo\nbar": 30,
                "foo\nbar\nbaz": 45,
                "foo\n": 30,
                "\n": 30,
                "foo bar baz": 75,
                "fooooooooooooo": 75,
                "fooooooooooooo baaaaaaaaaaar": 150,
                "fo  ba": 30,
                "fo   bar": 45,
                "fo   bar ": 60
            };
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
        
        ok(
            this.shadow.length === 1,
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
        ok(
            shadowedTextArea.getHeight() === this.textarea.height(),
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

    test( "Size calculation of shadow area is correct", function() {
        var shadowedTextArea
          , shadow
          , contentSets
          , expectedHeight;

        shadowedTextArea = this.textarea.data( "fluidtextarea-shadow" );
        shadow = shadowedTextArea.shadow_;

        contentSets = this.contentFixture();
        for ( content in contentSets ) if ( contentSets.hasOwnProperty( content ) ) {
            expectedHeight = contentSets[content];
            
            shadow.val( content );
            
            same(
                shadowedTextArea.getHeight(), expectedHeight,
                "Size of content '" + content + "' is calculated correctly"
            );
        }
    });

    test( "Text area adapts size to input", function() {
        var contentSets;

        contentSets = this.contentFixture();
        for ( content in contentSets ) if ( contentSets.hasOwnProperty( content ) ) {
            expectedHeight = contentSets[content];
            
            this.textarea.val( content );
            // The keyup event is monitored to detect changes therefore it
            // needs to triggered in order for the textarea to update its
            // height.
            this.textarea.trigger( "keyup" );
            
            same(
                this.textarea.height(), expectedHeight,
                "Size of content '" + content + "' is adapted to correctly"
            );
        }
    });
})( jQuery, jQuery );
