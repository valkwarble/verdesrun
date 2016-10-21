export function config ($logProvider, toastrConfig, $authProvider, URL) {
  'ngInject';
  $authProvider.signupUrl = URL+'api/auth/register';
}
