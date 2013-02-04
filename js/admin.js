$(document).ready(function() {
    $('#body2_wrapper .pane').tabs();
    $('#login, button.progress').button();
    
    $("button.progress").click(function(){
        var $this = $(this);
        $this.nextAll('.progress-recipient').html('');
        $('button.progress').button('option', 'disabled', true);
        $.ajax({
            type: "GET",
            url: $this.data('href'),
            progress: function(update){
                $this.nextAll('.progress-recipient').append(update);
                $this.nextAll('.progress-recipient').animate({
                    scrollTop: $this.nextAll('.progress-recipient').get(0).scrollHeight
                }, 200);
            },
            error: function(_, __, e) {
                console.log("ajax error");
                console.log(e);
            }
        }).always(function(){
            $('button.progress').button('option', 'disabled', false);
        });
    });
});