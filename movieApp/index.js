var app = angular.module("MovieApp", ["ngResource", "ui.router"]);

app.directive("movieMenuBar", function () {
    console.log("movie menu bar directive");    
    return {
        restrict : "E",
        templateUrl : "partials/movie-menu-bar.html"
    }
});

app.constant("movieConfig", {
    "host": "http://localhost:3000"
});

app.factory("Movies", ["$resource", "movieConfig", function($resource, movieConfig) {
    console.log("movie data factory");
    return $resource(movieConfig.host + "/movies" + "/:id",
                     {id : "@id"},
                     {update : { method : 'PUT'}});
    
}]);

app.directive("movieForm", function () {
    console.log("movie form directive");
    return {
        restrict : 'E',
        scope : { movie : "=movie",
                  submit_function : "&submit",
                  submit_label : "=label"},
        templateUrl : "partials/movie-form.html",
        controller : function($scope) {
            // $scope.submit_label = "hello";
            // $scope.sbumit_function = function() { console.log("hello"); };
        }
    }
});

app.config(function($stateProvider) {
    // console.log("state ui-router config");
    $stateProvider
        .state('createMovie', { //state for createing a new movie
            url: '/movies/create',
            templateUrl: 'partials/movie-add.html',
            controller: 'MovieCreateController'
        })
        .state('listMovies', { // state for showing all movies
            url: '/movies',
            templateUrl: 'partials/movie-list-table.html',
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
    console.log("run the 1st state");
    $state.go('createMovie');
});

app.controller("MovieListController", ["$scope", "$resource", "Movies", function($scope, $resource, Movies) {
    console.log("read the movie list controller");                                           
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

    $scope.deleteMovie = function(movie) {
        console.log( " delete movie id " + movie.id + " title " +  movie.title);

        var movie_gonna = Movies.get({ id: movie.id }, function() {
            console.log(" movie gonna ", movie_gonna);
            // $scope.entry is fetched from server and is an instance of Entry

            movie_gonna.$delete(function() {
                //gone forever!
            });
        });
    };
    
        
}]);

app.controller("MovieViewController", ["$scope", "$resource", "Movies", "$stateParams", "$state", function($scope, $resource, Movies, $stateParams, $state) {
    console.log("read the movie list controller");

    $scope.updateMovie = function(movie) {
        Movies.update(movie, function() {
            console.log("update movie");
            $state.go('listMovies');
       });
    };
    // $scope.movie_form_style = "'form-control-view-style'";
    $scope.movie = Movies.get({ id: $stateParams.id }, function() {
        
    });
    
    $scope.submit_label = "none";
    $scope.submit_function = function none() {};
    $scope.editMovie = function(move) {
        console.log("edit movie " + $stateParams.id);
    };
}]);

app.controller("MovieCreateController", ["$scope", "$resource", "$state", "Movies", function($scope, $resource, $state, Movies) {
    console.log("create the movie list controller");

    $scope.addMovie = function(movie) {

        console.log("add movie");
        Movies.save(movie, function() {
            console.log("added movie");
            $scope.movie = new Movies();
            $state.go('listMovies');
        });        
    };

    // $scope.movie_form_style = "'form-control-add-style'";
    $scope.movie = new Movies();
}]);

app.controller("MovieEditController", ["$scope", "$resource", "Movies", "$stateParams", "$state", function($scope, $resource, Movies, $stateParams, $state) {

    console.log("edit movie");
    $scope.updateMovie = function (movie) {
        Movies.update(movie, function() {
            console.log("update movie");
            $state.go('listMovies');
       });
    };
    
    // $scope.movie_form_style = "'form-control-edit-style'";
    $scope.movie = Movies.get({ id: $stateParams.id });
    
    $scope.submit_label = "Save";
    $scope.submit_function = updateMovie;
    
}]);

app.controller("MovieMenuBarController", ["$scope", function($scope) {
    console.log("movie menu bar at the top");
    $scope.menu = {
        brand : { label : "tiny app", state : "listMovies" },
        items : [ { label : "Movies", state : "listMovies" },
                  { label : "About", state : "about" },
                  { label : "Contact", state : "contact" }
                ]
    };
    
}]);

