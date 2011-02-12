(function( $, jQuery ) {
    module( "fluidtextarea", {
        "setup": function() {
            this.textarea = $( "#textarea-fixture" );
            this.textarea.fluidtextarea();
            this.shadow = this.textarea.prev();
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
        ok(
            this.shadow.length === 1,
            "Textarea has a previous sibling"
        );
        ok(
            this.shadow.is( "textarea" ),
            "Shadow is of type textarea"
        );
        ok(
            this.shadow.height() === this.textarea.height(),
            "Shadow has same height as textarea"
        );
        console.log( this.shadow.height(), this.textarea.height() );
    });

    test( "Shadow is invisible", function() {
        ok( 
            !this.shadow.is( ":visible" ),
            "Shadow element is invisible"
        );

        ok( 
            this.shadow.css( "display" ) === "none",
            "Display property is 'none'"
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
})( jQuery, jQuery );
