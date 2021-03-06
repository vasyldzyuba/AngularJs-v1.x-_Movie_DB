let app = angular.module('app', ['ngRoute']);
app.config(function ($routeProvider) {

	$routeProvider.when('/', {
		templateUrl: '/book.html',
		controller: 'bookCtrl',
		controllerAs: 'book'
	});
	$routeProvider.when('/favorite', {
		templateUrl: '/favorite.html',
		controller: 'favoriteCtrl',
		controllerAs: 'favorite'
	});
	$routeProvider.when('/details', {
		templateUrl: '/details.html',
		controller: 'detailsCtrl',
		controllerAs: 'details'
	});


})
