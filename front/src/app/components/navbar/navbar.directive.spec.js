
describe('directive navbar', function() {
  let vm;
  let element;
  let timeInMs;

  beforeEach(angular.mock.module('frontend'));

  beforeEach(inject(($compile, $rootScope) => {
    const currentDate = new Date();
    timeInMs = currentDate.setHours(currentDate.getHours() - 24);

    element = angular.element(`
      <acme-navbar "></acme-navbar>
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
  it('should have logout option', () => {
    expect(vm.hidelogout).toEqual("");

  });
});
