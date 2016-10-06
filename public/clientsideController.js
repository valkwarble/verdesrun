/**
 * Maintains a db of tweets
 */
var Auth = function() {
  var that = Object.create(Database.prototype);

  /**
   * Given a variable being used on this route fetches its value
   * @param {String} variable - name of variable to look for in this route
   * @returns{String} value of the variable or false if not present
   */
  that.getQueryVariable= function(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
  }
  /**
   * Generates a unique ID using a family of random hashes overlaps with probability :((1/16)^4)^8
   * @return randomly generated ID 
   */
  that.guid= function {
    function rhash() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return rhash() + rhash() + '-' + rhash() + '-' + rhash() + '-' +
      rhash() + '-' + rhash() + rhash() + rhash();
  }

/**
 * Generates a unique ID using a family of random hashes overlaps with probability :((1/16)^4)^8
 * @return randomly generated ID 
 */
  that.validatelogin= function(username, div){
  	try{
  		 var url = window.location.href;
  		 var clear = url.substring(0,url.lastIndexOf('/') + 1);
  		if(username.length == 0){
        $(div)[0].innerHTML = "Authentication Failed";
  			alert("invalid username ")
  		}
  		else{
  			$(div)[0].innerHTML = "Authentication Successful";
  		}
  	}
  	catch(e){

  	}
  	
  }
return that

}
