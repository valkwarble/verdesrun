/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _index = __webpack_require__(1);

	var _index2 = __webpack_require__(2);

	var _main = __webpack_require__(3);

	var _auth = __webpack_require__(4);

	var _navbar = __webpack_require__(5);

	angular.module('frontend', ['ui.router', 'toastr', 'ngCookies']).constant('URL', 'http://localhost:5000/').constant('moment', moment).config(_index.routerConfig).run(_index2.runBlock).controller('MainController', _main.MainController).controller('AuthController', _auth.AuthController).directive('acmeNavbar', _navbar.NavbarDirective);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	routerConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.routerConfig = routerConfig;
	function routerConfig($stateProvider, $urlRouterProvider) {
	  'ngInject';

	  $stateProvider.state('home', {
	    url: '/',
	    templateUrl: 'app/main/main.html',
	    controller: 'MainController',
	    controllerAs: 'main'
	  }).state('auth', {
	    url: '/auth',
	    templateUrl: 'app/auth/auth.html',
	    controller: 'AuthController',
	    controllerAs: 'auth'
	  }).state('follows', {
	    url: '/follows',
	    templateUrl: 'app/main/follows.html',
	    controller: 'MainController',
	    controllerAs: 'main'
	  });

	  $urlRouterProvider.otherwise('/');
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	runBlock.$inject = ["$log"];
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.runBlock = runBlock;
	function runBlock($log) {
	  'ngInject';

	  $log.debug('runBlock end');
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MainController = exports.MainController = function () {
		MainController.$inject = ["$http", "$scope", "$cookies", "$window"];
		function MainController($http, $scope, $cookies, $window) {
			'ngInject';

			_classCallCheck(this, MainController);

			this.$http = $http;
			this.$scope = $scope;
			this.$cookies = $cookies;
			this.$window = $window;
			this.getMessages();
		}

		_createClass(MainController, [{
			key: 'getMessages',
			value: function getMessages() {
				var that = this;

				$.get("/api/message", function () {}).done(function (data) {
					if (that.$cookies.get('username')) {
						that.messages = data.tweets.reverse();
						that.getFollowerMessages();
						that.$scope.$apply();
					} else {
						that.$window.location.href = '/#/auth';
					}
				}).fail(function () {}); // in the call back this points to something else need to keep vm controller in scopem
			}
		}, {
			key: 'postMessage',
			value: function postMessage() {
				var that = this;
				$.post("/api/message", {
					"text": this.message
				}, function () {
					that.getMessages();
				});
			}
		}, {
			key: 'deletemessage',
			value: function deletemessage(tweetid) {
				var that = this;
				var contentType = "application/x-www-form-urlencoded; charset=utf-8";
				$.ajax({
					type: "DELETE",
					url: "api/message",
					data: { "tweetid": tweetid },
					contentType: contentType,
					success: function success() {
						that.getMessages();
					},
					error: function error() {}
				});
			}
		}, {
			key: 'follow',
			value: function follow(user) {
				$.post("/api/follow", {
					"username": user
				}, function () {});
			}
		}, {
			key: 'retweet',
			value: function retweet(tweet) {
				var that = this;
				$.post("/api/retweet", {
					text: tweet.text,
					retweet: tweet.user.username
				}, function () {
					that.getMessages();
				});
			}
		}, {
			key: 'getFollowerMessages',
			value: function getFollowerMessages() {
				var that = this;

				$.get("/api/followermessages", function () {}).done(function (data) {
					that.followermessages = data.tweets.reverse();
					that.$scope.$apply();
				}); // in the call back this points to something else need to keep vm controller in scopem
			}
		}, {
			key: 'deletecheck',
			value: function deletecheck() {
				return this.$cookies.get('username');
			}
		}]);

		return MainController;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AuthController = exports.AuthController = function () {
		AuthController.$inject = ["$scope", "$cookies", "$http", "$window"];
		function AuthController($scope, $cookies, $http, $window) {
			'ngInject';

			_classCallCheck(this, AuthController);

			this.$scope = $scope;
			this.$cookies = $cookies;
			this.$http = $http;
			this.$window = $window;
		}

		_createClass(AuthController, [{
			key: 'register',
			value: function register() {
				var that = this;
				$.post("/api/register", this.user, function (data) {
					if (data.auth.error) {
						that.loginerror = data.auth.error;
					} else {
						that.$cookies.put('authtoken', data.auth.uid);
						that.$cookies.put('username', data.auth.name);
						that.$window.location.href = '/#';
					}
				}).fail(function (error) {
					that.loginerror = error.responseText;
					that.$scope.$apply();
				}).done(function (data) {
					if (data.auth.error) {
						alert("Signup Failed with error: " + data.auth.error);
					}
				});
			}
		}, {
			key: 'login',
			value: function login() {
				var that = this;

				$.post("/api/login", this.credentials, function (data) {
					if (data.auth.error) {
						that.loginerror = data.auth.error;
					} else {
						that.$cookies.put('authtoken', data.auth.uid);
						that.$cookies.put('username', data.auth.name);
						that.$window.location.href = '/#';
					}
				}).fail(function (error) {
					that.loginerror = error.responseText;
					that.$scope.$apply();
				}).done(function (data) {
					if (data.auth.error) {
						alert("Login Failed with error: " + data.auth.error);
					}
				});
			}
		}]);

		return AuthController;
	}();

	// Retrieving a cookie
	// Setting a cookie

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.NavbarDirective = NavbarDirective;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function NavbarDirective() {
	  'ngInject';

	  var directive = {
	    restrict: 'E',
	    templateUrl: 'app/components/navbar/navbar.html',
	    scope: {
	      creationDate: '='
	    },
	    controller: NavbarController,
	    controllerAs: 'vm',
	    bindToController: true
	  };

	  return directive;
	}

	var NavbarController = function () {
	  NavbarController.$inject = ["moment", "$cookies", "$window"];
	  function NavbarController(moment, $cookies, $window) {
	    'ngInject';

	    _classCallCheck(this, NavbarController);

	    this.$cookies = $cookies;
	    this.$window = $window;
	    // "this.creationDate" is available by directive option "bindToController: true"
	    //this.relativeDate = moment(this.creationDate).fromNow();
	  }

	  _createClass(NavbarController, [{
	    key: 'hidelogout',
	    value: function hidelogout() {
	      return this.$cookies.get('username');
	    }
	  }, {
	    key: 'logout',
	    value: function logout() {
	      this.$cookies.remove('username');
	      this.$cookies.remove('authtoken');
	      this.$window.location.href = '/#/auth';
	    }
	  }]);

	  return NavbarController;
	}();

/***/ }
/******/ ]);