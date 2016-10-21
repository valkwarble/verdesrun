import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { MainController } from './main/main.controller';
import { AuthController } from './auth/auth.controller';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';



angular.module('frontend', ['ui.router', 'toastr','ngCookies'])
  .constant('URL', 'http://localhost:5000/')
  .constant('moment', moment)
  .config(routerConfig)
  .run(runBlock)
  .controller('MainController', MainController)
  .controller('AuthController', AuthController)
  .directive('acmeNavbar', NavbarDirective) 