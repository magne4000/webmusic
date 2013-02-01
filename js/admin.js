$(document).ready(function() {
    $('#body2_wrapper .pane').tabs();
    $('#login, button.progress').button();
    
    $("button.progress").click(function(){
        var $this = $(this);
        $this.next('.progress').html('');
        $this.button('option', 'disabled', true);
        $.ajax({
            type: "GET",
            url: $this.data('href'),
            progress: function(update){
                $this.next('.progress').append(update);
            },
            error: function(_, __, e) {
                console.log("ajax error");
                console.log(e);
            }
        }).always(function(){
            $this.button('option', 'disabled', false);
        });
    });
});