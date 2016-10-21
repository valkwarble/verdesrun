export function NavbarDirective() {
  'ngInject';

  let directive = {
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

class NavbarController {
  constructor (moment, $cookies, $window) {
    'ngInject';
    this.$cookies =$cookies;
    this.$window = $window;
    // "this.creationDate" is available by directive option "bindToController: true"
    //this.relativeDate = moment(this.creationDate).fromNow();
  }
  hidelogout(){  
    return this.$cookies.get('username');       
  }
  logout(){  
     this.$cookies.remove('username');       
     this.$cookies.remove('authtoken');  
     this.$window.location.href = '/#/auth';
  }
}
