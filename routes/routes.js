myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/', {
		templateUrl: 'views/all-matches.html',
		controller: 'AllMatches'
	}).
	when('/details/:roundID/:matchID', {
		templateUrl: 'views/details.html',
		controller: 'DetailsController'
	}).
	when('/teamlist', {
		templateUrl: 'views/team-list.html',
		controller: 'ListController'
	}).when('/teamstats/:teamName', {
		templateUrl: 'views/team-stats.html',
		controller: 'StatsController'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);