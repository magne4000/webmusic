$(document).ready(function() {
    $('#body2_wrapper .pane').tabs();
    
    $("button.progress").click(function(){
        var $this = $(this);
        $this.next('.progress').html('');
        $this.attr('disabled', '');
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
            $this.removeAttr('disabled');
        });
    });
});