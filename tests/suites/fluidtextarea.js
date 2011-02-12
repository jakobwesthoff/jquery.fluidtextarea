(function( $, jQuery ) {
    module( "fluidtextarea", {
        "setup": function() {
            this.textarea = $( "#textarea-fixture" );
        }
    });

    test( "Plugin function defined", function() {
        ok( 
            typeof $( "<div />" ).fluidtextarea === "function",
            "Plugin function is defined and of type 'function'"
        );
    });

    test( "Shadow created and inserted", function() {
        var shadow;

        this.textarea.fluidtextarea();
        shadow = this.textarea.prev();

        ok(
            shadow.length === 1,
            "Textarea has a previous sibling"
        );
        ok(
            shadow.is( "textarea" ),
            "Shadow is of type textarea"
        );
        ok(
            shadow.height() === this.textarea.height(),
            "Shadow has same height as textarea"
        );
    });

    test( "Shadow is invisible", function() {
        var shadow;

        this.textarea.fluidtextarea();
        shadow = this.textarea.prev();

        ok( 
            shadow.is( "not( :visible )" ),
            "Shadow element is invisible"
        );

        ok( 
            shadow.css( "display" ) === "none",
            "Display property is 'none'"
        );
    });
})( jQuery, jQuery );
