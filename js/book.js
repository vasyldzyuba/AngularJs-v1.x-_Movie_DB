app.controller('bookCtrl', function ($http, $filter, global, globalDetails) {

	let vm = this;
	vm.films = [];
	vm.filmsFavorite = global.getFilms();
	vm.filmsDet = [];
	vm.filmsDet = globalDetails.getFilms();
	vm.pagination = {};
	vm.pagination.itemsPerPage = 10;
	vm.pagination.currentPage = 1;
	vm.selectedKey = {};

	vm.filterFn = function (con) {
		if (vm.selectedKey.id !== 'unselect') {
			return con.genre_ids.indexOf(vm.selectedKey.id) > -1;
		} else {
			return true;
		}
	};

	//	filter for searching by films title
	vm.returnPages = function () {
		let array = $filter('filter')(vm.films, {
			title: vm.search
		});
		array = $filter('filter')(array, vm.filterFn);
		return array.length;
	}

	//geting films and everything about them
	$http.get('https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=62ea0c662081d0b490eb46e2ff1746ef').then(function (response) {
		vm.films = response.data.results;
	});



	//geting genres
	$http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=62ea0c662081d0b490eb46e2ff1746ef').then(function (resp) {
		vm.genres = resp.data.genres;
		console.log(vm.genres);
		vm.genres.unshift({
			id: 'unselect',
			name: 'All genres'
		});
		vm.selectedKey = vm.genres[0];
	})



	//	working with localStorage part 1 
	function Movie(title, id, release_date) {
		this.title = title;
		this.id = id;
		this.release_date = release_date;
	}

	//	adding films to favorite
	vm.addFilm = function (index) {
		if (vm.filmsFavorite.indexOf(vm.films[index]) === -1) {
			vm.filmsFavorite.push(vm.films[index]);
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



	//pagination
	vm.previous = function () {
		if (vm.pagination.currentPage > 1) {
			vm.pagination.currentPage--;
		}
	};

	vm.next = function () {
		if (vm.pagination.currentPage < vm.func()) {
			vm.pagination.currentPage++;
		}
	};

	vm.func = function () {
		return Math.ceil(vm.returnPages() / vm.pagination.itemsPerPage);
	};


	$(document).ready(function () {
		$(window).bind("scroll", function () {
			if ($(this).scrollTop() > 200) {
				$(".back-to-top").fadeIn(400);
			} else {
				$('.back-to-top').fadeOut(400);
			}
		});
		$('.back-to-top').click(function () {
			$('html, body').animate({
				scrollTop: '0px'
			}, 800);
		});

		//	showing details of selected film
		vm.showDetails = function (index) {
			$('#btnFilms').show();
			$('#btnF').show();
			if (vm.filmsDet.length == 0) {
				vm.filmsDet.push(vm.films[index]);
			} else {
				vm.filmsDet.splice(0, 1, vm.films[index]);
			}
		}

		$('#btnF').click(function () {
			$(this).hide();
			$('#btnFilms').show();
		})
		$('#btnFilms').click(function () {
			$(this).hide();
			$('#btnF').show();
		})
		$('.logo').animate({
			top: '0'
		}, 1200, 'easeOutElastic')
	})
})
app.filter('range', function () {
	return function (input, total) {
		total = parseInt(total);
		for (var i = 0; i < total; i++)
			input.push(i);
		return input;
	};
});
