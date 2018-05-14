$('#bar').keyup(function(){
    $.ajax({
        method: "GET",
        url: "/search",
        data: { q : $('#bar').val() }
    })
  .done(function( msg ) {
    //alert( "Data Saved: " + msg );
    console.log(msg);
    $( "#searchResult" ).html("");
    if(msg.length >= 1 ){
    msg.forEach(function(user){
        console.log(user.username);
        var path = "/users/" + user._id ;
        $( "#searchResult" ).append( '<li><a href = " '+ path +'">'+ user.username +'</a></li>' );
    });
    }
  });
});








