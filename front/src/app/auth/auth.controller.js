/**
 * Constructs and returns Auth COntroller class
 * used to send ajax requests to register and login apis
 * @returns- FollowerMessages Controller object
 * @constructor
 */
export class AuthController {
	constructor($scope, $cookies, $http, $window){
		'ngInject';
		
		this.$scope =$scope;
		this.$cookies =$cookies;
		this.$http = $http;
		this.$window = $window;
	}
	/**
	 * Register a new user using the register api
	 * save user credentials in cookie on sucess and redirect to tweets
	 * send error message on failure triggering alert
	 */
	register(){
		var that = this;
		$.post("/api/register", 
			this.user
			, function(data) {
				if(data.auth.error){
					that.loginerror = data.auth.error;
				}else{
					that.$cookies.put('authtoken', data.auth.uid);
					that.$cookies.put('username', data.auth.name);
					that.$window.location.href = '/#';
				}
				
		}).fail(function(error){
			that.loginerror = error.responseText;
			that.$scope.$apply();
		}).done(function( data ) {
			if(data.auth.error){
				alert( "Signup Failed with error: " + data.auth.error );
			}   
		});
	}
	/**
	 * login existing user using the login api
	 * save user credentials in cookie on sucess and redirect to tweets
	 * send error message on failure triggering view render
	 */
	login(){
		var that = this;

		$.post("/api/login", 
			this.credentials
			, function(data) {
				if(data.auth.error){
					that.loginerror = data.auth.error;
				}else{
					that.$cookies.put('authtoken', data.auth.uid);
					that.$cookies.put('username', data.auth.name);
					that.$window.location.href = '/#';
				}
				
		}).fail(function(error){
			that.loginerror = error.responseText;
			that.$scope.$apply();
			
		}).done(function( data ) {
			if(data.auth.error){
				alert( "Login Failed with error: " + data.auth.error );
			} 
		});	
	}
}

