/**
 * Constructs and returns Navbar Directive
 * used to set up controller for nav view
 * @returns- Navbar Directive
 */
export function NavbarDirective() {
  'ngInject';

  let directive = {
    restrict: 'E',
    templateUrl: 'app/components/navbar/navbar.html',
    scope: {
        
    },
    controller: NavbarController,
    controllerAs: 'vm',
    bindToController: true
  };

  return directive;
}

/**
 * Constructs and returns Navbar Controller class
 * used to control logout button visibility 
 * @returns- Navbar Controller object
 */
class NavbarController {
  constructor (moment, $cookies, $window) {
    'ngInject';
    this.$cookies =$cookies;
    this.$window = $window;
  }
  /**
   * hide logout if user is not logged in 
   */
  hidelogout(){  
    return this.$cookies.get('username');       
  }
  /**
   * logout user and redirect to auth page
   */
  logout(){  
     this.$cookies.remove('username');       
     this.$cookies.remove('authtoken');  
     this.$window.location.href = '/#/auth';
  }
}
