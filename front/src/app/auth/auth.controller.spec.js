
describe('controller auth', function() {
  let vm;
  let element;
  let timeInMs;

  beforeEach(angular.mock.module('frontend'));

  beforeEach(inject(($compile, $rootScope) => {
    const currentDate = new Date();
    timeInMs = currentDate.setHours(currentDate.getHours() - 24);

    element = angular.element(`
      <div class="page-content" style= "top: 73px;
    position: relative;
    left: 25%;">
    <!--  input post /-->
      <div class="acme-card-wide mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">SINGUP</h2>
        </div>
        <div class="mdl-card__supporting-text">
          <form name="register" ng-submit ="auth.register()" >
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable" id="postinput">
              <textarea ng-model="auth.user.username" class="mdl-textfield__input" type="text" rows= "1" id="" ></textarea>
              <label class="mdl-textfield__label" for="sample5">Username</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable" id="postinput">
              <textarea ng-model="auth.user.password" class="mdl-textfield__input" type="text" rows= "1" id="" ></textarea>
              <label class="mdl-textfield__label" for="sample5">Password</label>
            </div>
            <div class="mdl-card__actions mdl-card--border">
              <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click="auth.register()">
                Register
              </a>
            </div>
          </form>
        </div>
        
        <div class="mdl-card__menu">
          <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i class="material-icons">whatshot</i>
          </button>
        </div>
      </div>

        <!--  input post /-->
        <!--  input post /-->
      <div class="acme-card-wide mdl-card mdl-shadow--2dp">
        <div class="mdl-card__title">
          <h2 class="mdl-card__title-text">Login</h2>
        </div>
        <div class="mdl-card__supporting-text">
          <form name="register" ng-submit ="auth.login()" >
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable" id="postinput">
              <textarea ng-model="auth.credentials.username" class="mdl-textfield__input" type="text" rows= "1" id="" ></textarea>
              <label class="mdl-textfield__label" for="sample5">Username</label>
            </div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable" id="postinput">
              <textarea ng-model="auth.credentials.password" class="mdl-textfield__input" type="text" rows= "1" id="" ></textarea>
              <label class="mdl-textfield__label" for="sample5">Password</label>
            </div>
            <div class="mdl-card__actions mdl-card--border">
              <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" ng-click="auth.login()">
                Login
              </a>
              <div>{{auth.loginerror}}</div>
            </div>
          </form>
        </div>
        
        <div class="mdl-card__menu">
          <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
            <i class="material-icons">whatshot</i>
          </button>
        </div>
      </div>

        <!--  input post /-->
    </div>


    `);

    $compile(element)($rootScope.$new());
    $rootScope.$digest();
    vm = element.isolateScope().vm;
  }));

  it('should be compiled', () => {
    expect(element.html()).not.toEqual(null);
  });

  it('should have isolate scope object with instanciate members', () => {
    expect(vm).toEqual(jasmine.any(Object));

  });
  it('should have register option', () => {
    expect(vm.auth.credentials).toEqual({username:"",password:"" });

  });
    it('should have login option', () => {
    expect(vm.auth.user).toEqual({username:"",password:"" });

  });
});
