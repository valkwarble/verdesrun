/******/!function(e){function t(a){if(l[a])return l[a].exports;var s=l[a]={exports:{},id:a,loaded:!1};return e[a].call(s.exports,s,s.exports,t),s.loaded=!0,s.exports}// webpackBootstrap
/******/
var l={};return t.m=e,t.c=l,t.p="",t(0)}([function(e,t,l){"use strict";var a=l(1),s=l(2),n=l(3),o=l(4),i=l(5),d=l(6);angular.module("frontend",["ui.router","toastr","ngCookies"]).constant("URL","http://localhost:5000/").constant("moment",moment).config(a.routerConfig).run(s.runBlock).controller("MainController",n.MainController).controller("AuthController",o.AuthController).directive("acmeNavbar",d.NavbarDirective).directive("sampleDirective",i.sampleDirective)},function(e,t){"use strict";function l(e,t){"ngInject";e.state("home",{url:"/",templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"main"}).state("auth",{url:"/auth",templateUrl:"app/auth/auth.html",controller:"AuthController",controllerAs:"auth"}).state("follows",{url:"/follows",templateUrl:"app/main/follows.html",controller:"MainController",controllerAs:"main"}),t.otherwise("/")}l.$inject=["$stateProvider","$urlRouterProvider"],Object.defineProperty(t,"__esModule",{value:!0}),t.routerConfig=l},function(e,t){"use strict";function l(e){"ngInject";e.debug("runBlock end")}l.$inject=["$log"],Object.defineProperty(t,"__esModule",{value:!0}),t.runBlock=l},function(e,t){"use strict";function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var l=0;l<t.length;l++){var a=t[l];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,l,a){return l&&e(t.prototype,l),a&&e(t,a),t}}();t.MainController=function(){function e(t,a,s,n){"ngInject";l(this,e),this.$http=t,this.$scope=a,this.$cookies=s,this.$window=n,this.getMessages()}return e.$inject=["$http","$scope","$cookies","$window"],a(e,[{key:"getMessages",value:function(){var e=this;$.get("/api/message",function(t){console.log(t),e.messages=t.tweets,e.$scope.messages=t.tweets}).done(function(t){console.log("real success"),e.messages=t.tweets,e.$scope.messages=t.tweets,e.getFollowerMessages(),e.$scope.$apply(),console.log(e.$cookies.get("username")),e.$cookies.get("username")||(console.log("redirecting"),this.$window.location.href="/#/auth")}).fail(function(){})}},{key:"postMessage",value:function(){console.log("new");var e=this;$.post("/api/message",{text:this.message},function(t){e.getMessages(),console.log("success")})}},{key:"deletemessage",value:function(e){var t=this,l="application/x-www-form-urlencoded; charset=utf-8";$.ajax({type:"DELETE",url:"api/message",data:{tweetid:e},contentType:l,success:function(e){console.log("deleted"),t.getMessages()},error:function(e){console.log("failed")}})}},{key:"follow",value:function(e){console.log(e),$.post("/api/follow",{username:e},function(e){console.log("success")})}},{key:"retweet",value:function(e){var t=this;$.post("/api/retweet",{text:e.text,retweet:e.user.username},function(e){t.getMessages(),console.log("success")})}},{key:"getFollowerMessages",value:function(){var e=this;$.get("/api/followermessages",function(t){console.log(t),e.followermessages=t.tweets,e.$scope.messages=t.tweets}).done(function(t){console.log("real success"),e.followermessages=t.tweets,e.$scope.messages=t.tweets,e.$scope.$apply()})}},{key:"deletecheck",value:function(){return this.$cookies.get("username")}}]),e}()},function(e,t){"use strict";function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var l=0;l<t.length;l++){var a=t[l];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,l,a){return l&&e(t.prototype,l),a&&e(t,a),t}}();t.AuthController=function(){function e(t,a,s,n){"ngInject";l(this,e),this.$scope=t,this.$cookies=a,this.$http=s,this.$window=n}return e.$inject=["$scope","$cookies","$http","$window"],a(e,[{key:"register",value:function(){console.log("new");var e=this;$.post("/api/register",this.user,function(t){console.log("success"),console.log(t.auth),e.$cookies.put("authtoken",t.auth.uid),e.$cookies.put("username",t.auth.name),e.$window.location.href="/#"})}},{key:"login",value:function(){console.log(this.credentials);var e=this;$.post("/api/login",this.credentials,function(t){console.log("success"),console.log(t.auth),e.$cookies.put("authtoken",t.auth.uid),e.$cookies.put("username",t.auth.name),e.$window.location.href="/#"}).fail(function(t){console.log("error"),console.log(t.responseText),e.loginerror=t.responseText,e.$scope.$apply()})}}]),e}()},function(e,t){"use strict";function l(e){"ngInject";return{require:"ngModel",link:function(t,l,a,s){var n=e(a.compareTo),o=e(a.ngModel);t.$watch(a.ngModel,function(e){s.$setValidity(a.name,e===n(t))}),t.$watch(a.compareTo,function(e){s.$setValidity(a.name,e===o(t))})}}}l.$inject=["$parse"],Object.defineProperty(t,"__esModule",{value:!0}),t.sampleDirective=l},function(e,t){"use strict";function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(){"ngInject";var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:n,controllerAs:"vm",bindToController:!0};return e}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var l=0;l<t.length;l++){var a=t[l];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,l,a){return l&&e(t.prototype,l),a&&e(t,a),t}}();t.NavbarDirective=a;var n=function(){function e(t,a,s){"ngInject";l(this,e),this.$cookies=a,this.$window=s}return e.$inject=["moment","$cookies","$window"],s(e,[{key:"hidelogout",value:function(){return this.$cookies.get("username")}},{key:"logout",value:function(){this.$cookies.remove("username"),this.$cookies.remove("authtoken"),this.$window.location.href="/#/auth"}}]),e}()}]),angular.module("frontend").run(["$templateCache",function(e){e.put("app/main/follows.html",'<div class="mdl-layout mdl-js-layout"><main class=mdl-layout__content><div class=page-content><!--  input post /--><div class="acme-card-wide mdl-card mdl-shadow--2dp"><div class=mdl-card__title><h2 class=mdl-card__title-text>Post to DB Table</h2></div><div class=mdl-card__supporting-text><form action=#><div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable" id=postinput><textarea ng-model=main.message class=mdl-textfield__input type=text rows=1></textarea><label class=mdl-textfield__label for=sample5>post..</label></div></form></div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click=main.postMessage()>Tweet </a><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click=main.getMessages()>refresh</a></div></div><!--  input post /--></div><div class=mdl-layout__content style="display: table"><h1>FOLLOWS</h1><div ng-repeat="tweet in main.followermessages" class="demo-card-wide mdl-card mdl-shadow--2dp" style="margin: 10px; height: 100% !important;min-height: 107px !important; display: flex"><div class=mdl-card__supporting-text>{{tweet.text}}</div><div class="mdl-card__actions mdl-card--border">Follow: <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-upgraded=,MaterialButton,MaterialRipple data="{{tweet.user.username}} " ng-click=main.follow(tweet.user.username)>{{tweet.user.username}} <span class=mdl-button__ripple-container><span class=mdl-ripple></span></span></a> <a ng-show=tweet.retweet class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-upgraded=,MaterialButton,MaterialRipple data="{{tweet.retweet}} " ng-click=main.follow(tweet.retweet)>{{tweet.retweet}} [OP] <span class=mdl-button__ripple-container><span class=mdl-ripple></span></span></a> <a ng-show="main.deletecheck()==tweet.user.username" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-upgraded=,MaterialButton,MaterialRipple data="{{tweet._id}} " ng-click=main.deletemessage(tweet._id) style=color:red>delete <span class=mdl-button__ripple-container><span class=mdl-ripple></span></span></a></div><div class=mdl-card__menu><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" data-upgraded=,MaterialButton,MaterialRipple data={{tweet}} ng-click=main.retweet(tweet)><i style=color:green class=material-icons>share</i> <span class=mdl-button__ripple-container><span class="mdl-ripple is-animating" style="width: 92.5097px; height: 92.5097px; transform: translate(-50%, -50%) translate(16px, 26px)"></span></span></button></div></div></div></main><footer class=mdl-mini-footer><div class=mdl-mini-footer__right-section><div class=mdl-logo>Made With ♥ for 6.170</div></div></footer></div>'),e.put("app/main/main.html",'<div class="mdl-layout mdl-js-layout"><main class=mdl-layout__content><div class=page-content><!--  input post /--><div class="acme-card-wide mdl-card mdl-shadow--2dp"><div class=mdl-card__title><h2 class=mdl-card__title-text>Post to DB Table</h2></div><div class=mdl-card__supporting-text><form action=#><div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable" id=postinput><textarea ng-model=main.message class=mdl-textfield__input type=text rows=1></textarea><label class=mdl-textfield__label for=sample5>post..</label></div></form></div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click=main.postMessage()>Tweet </a><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click=main.getMessages()>refresh</a></div></div><!--  input post /--></div><div class=mdl-layout__content style="display: table"><div ng-repeat="tweet in main.messages" class="demo-card-wide mdl-card mdl-shadow--2dp" style="margin: 10px; height: 100% !important;min-height: 107px !important; display: flex"><div class=mdl-card__supporting-text>{{tweet.text}}</div><div class="mdl-card__actions mdl-card--border">Follow: <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-upgraded=,MaterialButton,MaterialRipple data="{{tweet.user.username}} " ng-click=main.follow(tweet.user.username)>{{tweet.user.username}} <span class=mdl-button__ripple-container><span class=mdl-ripple></span></span></a> <a ng-show=tweet.retweet class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-upgraded=,MaterialButton,MaterialRipple data="{{tweet.retweet}} " ng-click=main.follow(tweet.retweet)>{{tweet.retweet}} [OP] <span class=mdl-button__ripple-container><span class=mdl-ripple></span></span></a> <a ng-show="main.deletecheck()==tweet.user.username" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-upgraded=,MaterialButton,MaterialRipple data="{{tweet._id}} " ng-click=main.deletemessage(tweet._id) style=color:red>delete <span class=mdl-button__ripple-container><span class=mdl-ripple></span></span></a></div><div class=mdl-card__menu><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" data-upgraded=,MaterialButton,MaterialRipple data={{tweet}} ng-click=main.retweet(tweet)><i style=color:green class=material-icons>share</i> <span class=mdl-button__ripple-container><span class="mdl-ripple is-animating" style="width: 92.5097px; height: 92.5097px; transform: translate(-50%, -50%) translate(16px, 26px)"></span></span></button></div></div></div><div class=mdl-layout__content style="display: table"><h1>FOLLOWS</h1><div ng-repeat="tweet in main.followermessages" class="demo-card-wide mdl-card mdl-shadow--2dp" style="margin: 10px; height: 100% !important;min-height: 107px !important; display: flex"><div class=mdl-card__supporting-text>{{tweet.text}}</div><div class="mdl-card__actions mdl-card--border">Follow: <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-upgraded=,MaterialButton,MaterialRipple data="{{tweet.user.username}} " ng-click=main.follow(tweet.user.username)>{{tweet.user.username}} <span class=mdl-button__ripple-container><span class=mdl-ripple></span></span></a> <a ng-show=tweet.retweet class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-upgraded=,MaterialButton,MaterialRipple data="{{tweet.retweet}} " ng-click=main.follow(tweet.retweet)>{{tweet.retweet}} [OP] <span class=mdl-button__ripple-container><span class=mdl-ripple></span></span></a> <a ng-show="main.deletecheck()==tweet.user.username" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" data-upgraded=,MaterialButton,MaterialRipple data="{{tweet._id}} " ng-click=main.deletemessage(tweet._id) style=color:red>delete <span class=mdl-button__ripple-container><span class=mdl-ripple></span></span></a></div><div class=mdl-card__menu><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" data-upgraded=,MaterialButton,MaterialRipple data={{tweet}} ng-click=main.retweet(tweet)><i style=color:green class=material-icons>share</i> <span class=mdl-button__ripple-container><span class="mdl-ripple is-animating" style="width: 92.5097px; height: 92.5097px; transform: translate(-50%, -50%) translate(16px, 26px)"></span></span></button></div></div></div></main><footer class=mdl-mini-footer><div class=mdl-mini-footer__right-section><div class=mdl-logo>Made With ♥ for 6.170</div></div></footer></div>'),e.put("app/auth/auth.html",'<div class=page-content><!--  input post /--><div class="acme-card-wide mdl-card mdl-shadow--2dp"><div class=mdl-card__title><h2 class=mdl-card__title-text>SINGUP</h2></div><div class=mdl-card__supporting-text><form name=register ng-submit=auth.register()><div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable" id=postinput><textarea ng-model=auth.user.username class=mdl-textfield__input type=text rows=1></textarea><label class=mdl-textfield__label for=sample5>Username</label></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable" id=postinput><textarea ng-model=auth.user.password class=mdl-textfield__input type=text rows=1></textarea><label class=mdl-textfield__label for=sample5>Password</label></div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click=auth.register()>Login</a></div></form></div><div class=mdl-card__menu><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i class=material-icons>whatshot</i></button></div></div><!--  input post /--><!--  input post /--><div class="acme-card-wide mdl-card mdl-shadow--2dp"><div class=mdl-card__title><h2 class=mdl-card__title-text>Login</h2></div><div class=mdl-card__supporting-text><form name=register ng-submit=auth.login()><div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable" id=postinput><textarea ng-model=auth.credentials.username class=mdl-textfield__input type=text rows=1></textarea><label class=mdl-textfield__label for=sample5>Username</label></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable" id=postinput><textarea ng-model=auth.credentials.password class=mdl-textfield__input type=text rows=1></textarea><label class=mdl-textfield__label for=sample5>Password</label></div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click=auth.login()>Login</a><div>{{auth.loginerror}}</div></div></form></div><div class=mdl-card__menu><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"><i class=material-icons>whatshot</i></button></div></div><!--  input post /--></div>'),e.put("app/components/navbar/navbar.html",'<div><header class=mdl-layout__header><div class=mdl-layout__header-row><!-- Title --> <span class="mdl-layout-title mdl-badge" data-badge=♥>Fritter</span><!-- Add spacer, to align navigation to the right --><nav class="mdl-navigation mdl-layout--large-screen-only"><a class=mdl-navigation__link href=#>Home</a> <a class=mdl-navigation__link ng-href=#/auth>Login</a> <a class=mdl-navigation__link href=#/follows>Follows</a> <a ng-show=vm.hidelogout() ng-click=vm.logout() class=mdl-navigation__link href=#/follows>Logout</a></nav><!-- Add spacer, to align navigation to the right --><div class=mdl-layout-spacer></div><!-- Navigation. We hide it in small screens. --></div></header><div class=mdl-layout__drawer><span class=mdl-layout-title>Title</span><nav class=mdl-navigation><a class=mdl-navigation__link href=#>Home</a> <a class=mdl-navigation__link ng-href=#/auth>Login</a> <a class=mdl-navigation__link href=#/follows>Follows</a></nav></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-0b135e86fa.js.map
