app.controller('detailsCtrl', function ($http, $filter, globalDetails, global) {
	let vm = this;
	vm.filmsDet = [];
	vm.filmsDet = globalDetails.getFilms();
	vm.films = [];
	vm.filmsFavorite = global.getFilms();
	vm.selectedKey = {};

	$http.get('https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=62ea0c662081d0b490eb46e2ff1746ef').then(function (response) {
		vm.films = response.data.results;
	});
	$http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=62ea0c662081d0b490eb46e2ff1746ef').then(function (resp) {
		vm.genres = resp.data.genres;
		console.log(vm.genres);
		vm.genres.unshift({
			id: 'unselect',
			name: 'All genres'
		});
		vm.selectedKey = vm.genres[0];
	})

	vm.addFilm = function (index) {
		if (vm.filmsFavorite.indexOf(vm.filmsDet[index]) === -1) {
			vm.filmsFavorite.push(vm.filmsDet[index]);
			//			working with localStorage part 2
			let title1 = vm.filmsFavorite[index];
			let id1 = vm.filmsFavorite[index];
			let release_date1 = vm.filmsFavorite[index];
			let newMovie = new Movie(title1, id1, release_date1);
			let str1 = JSON.stringify(newMovie);
			localStorage.setItem('results', JSON.stringify(newMovie));
		} else {
			alert('You have already add this movie!');
		}
	}
	vm.showDetails = function (index) {
		$('#btnFilms').show();
		$('#btnF').hide();
		if (vm.filmsDet.length == 0) {
			vm.filmsDet.push(vm.films[index]);
		} else {
			vm.filmsDet.splice(0, 1, vm.films[index]);
		}
	}
})
