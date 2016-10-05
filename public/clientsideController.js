function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function guid() {
  function rhash() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return rhash() + rhash() + '-' + rhash() + '-' + rhash() + '-' +
    rhash() + '-' + rhash() + rhash() + rhash();
}

//just a dummy function for now 
function validatelogin(username){
	try{
		 var url = window.location.href;
		 var clear = url.substring(0,url.lastIndexOf('/') + 1);
		if(username.length == 0){
			alert("invalid username ")
		}
		else{}
	}
	catch(e){

	}
	
}

$(document).on("click", "#login", function() {
	validatelogin($("#username").val());
});

$(document).on("click", "#displayTweets", function() {
	renderTweets();
});

$(document).on("click", "#createTweet", function() {
	var username = getQueryVariable("username");
	if(username== false){
		alert('please log in')
		return;
	}
	else if( $("#tweet").val().length ==0 ){
		alert('empty field warning, please write something')
		return;
	}
	else{
		$.post("/tweet", {
		    "username": username, 
		    "tweet": $("#tweet").val(),
		    "tweetid": guid()
		  }, function(data) {
		  	renderTweets();  
		 
		});	
	}
	
});

$(document).on("click", ".delete", function() {
	
	$.post("/delete", {
		    "tweetid": $(this).attr('id')
		  }, function(data) {
		  	renderTweets();  
		 
		});	
});
