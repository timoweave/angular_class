var app = angular.module("MovieApp", ["ngResource", "ui.router"]);

app.constant("MOVIES_JSON", "http://localhost:3000/movies");

app.config(function($stateProvider) {
    $stateProvider
        .state('createMovie', { //state for createing a new movie
            url: '/movies/create',
            templateUrl: 'partials/movie-add.html',
            controller: 'MovieCreateController'
        })
        .state('listMovies', { // state for showing all movies
            url: '/movies',
            templateUrl: 'partials/movie-list.html',
            controller: 'MovieListController'
        })
        .state('viewMovie', { //state for showing single movie
            url: '/movies/:id/view',
            templateUrl: 'partials/movie-view.html',
            controller: 'MovieViewController'
        })
        .state('editMovie', { //state for updating a movie
            url: '/movies/:id/edit',
            templateUrl: 'partials/movie-edit.html',
            controller: 'MovieEditController'
        })
        .state('about', { //state for updating a movie
            url: '/about',
            templateUrl: 'partials/movie-about.html'
        })
        .state('contact', { //state for updating a movie
            url: '/contact',
            templateUrl: 'partials/movie-contact.html'
        })
    ;
});

app.run(function($state) {
    $state.go('createMovie');
});

app.controller("MovieListController", ["$scope", "$resource", "Movies",
                                       function($scope, $resource, Movies) {
    $scope.title = "All Movies";
    $scope.message = "loading movies...";
    $scope.movies = Movies.query().$promise.then(
        function ok(response) {
            $scope.movies = response;
            $scope.message = "loaded";
        },
        function no(response) {
            $scope.message = "error " + response.status;
        }
    );
}]);

app.controller("MovieViewController", ["$scope", "$resource", "Movies", "$stateParams",
                                       function($scope, $resource, Movies, $stateParams) {
    $scope.movie_form_style = "'form-control-view-style'";
    $scope.movie = Movies.get({ id: $stateParams.id });

    $scope.submit_label = "none";
    $scope.submit_function = function none() {};
}]);

app.controller("MovieCreateController", ["$scope", "$resource", "Movies",
                                         function($scope, $resource, Movies) {
    function addMovie() {
        $scope.movie.$save(function() {
            $state.go('listMovies');
        });
    };

    $scope.movie_form_style = "'form-control-add-style'";    
    $scope.movie = new Movies();
                                             
    $scope.submit_label = "Create";
    $scope.submit_function = addMovie;
                                             
}]);

app.controller("MovieEditController", ["$scope", "$resource", "Movies", "$stateParams", "$state",
                                       function($scope, $resource, Movies, $stateParams, $state) {
   function updateMovie () {
       $scope.movie.$update(function() {
           $state.go('listMovies');
       });
   };
 
   $scope.movie_form_style = "'form-control-edit-style'";
   $scope.movie = Movies.get({ id: $stateParams.id });

   $scope.submit_label = "Save";
   $scope.submit_function = updateMovie;

}]);

app.controller("MovieMenuBarController", ["$scope", function($scope) {
    $scope.menu = {
        brand : { label : "tiny app", state : "listMovies" },
        items : [ { label : "Movies", state : "listMovies" },
                  { label : "About", state : "about" },
                  { label : "Contact", state : "contact" }
        ]
    };

}]);

app.directive("movieForm", function () {
    return {
        restrict : 'E',
        scope : { movie : "=movie",
                  submit : "=submit" },
        templateUrl : "partials/movie-form.html"
    }
});

app.directive("movieMenuBar", function () {
    return {
        restrict : "E",
        templateUrl : "partials/movie-menu-bar.html"
    }
});

app.factory("Movies", ["$resource", "MOVIES_JSON", function($resource, MOVIES_JSON) {

    return $resource(MOVIES_JSON + "/:id",
                     {id : "@_id"},
                     {update : { method : 'PUT'}});
    
}]);
