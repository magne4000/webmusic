$(document).ready(function() {
    $('#body2_wrapper .pane').tabs();
    $('#login, button.progress').button();
    
    $dialog = $('<p></p>').dialog({autoOpen: false});
    $("button.confirm").click(function(e){
        var $this = $(this);
        if (!$dialog.dialog('isOpen')){
            e.stopImmediatePropagation();
        }
        $dialog.dialog('destroy');
        $dialog.text($this.data('confirm')).dialog({
            resizable: false,
            height: 140,
            modal: true,
            title: $this.data('title'),
            buttons: {
                "Oui": function() {
                    $this.click();
                    $(this).dialog("close");
                },
                "Non": function() {
                    $(this).dialog("close");
                }
            }
        });
    });
    
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
            },
            dataType: "text"
        }).always(function(){
            $('button.progress').button('option', 'disabled', false);
        });
    });
});