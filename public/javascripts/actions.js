//
$(document).ready(function(){

    var isButtonDisabled = false;
    $("#nextImpulse").click(function($event){

        if (isButtonDisabled){
            return $event.preventDefault();
        }
        isButtonDisabled = true;

        $.ajax("/api/impulse/next",{
            method: "PUT"
        })
            .done(function(response){
                //handle response
                console.log(response);
                location.reload();
            })
            .fail(function(error){
                //handle error
                console.log(error);
            })
            .always(function(){
                //always execute
                isButtonDisabled = false;
            });

        return $event.preventDefault();
    })
});