app.factory('global', function ($http) {
	let vm = this;
	
	let _filmsF = [];
	let _filmsId = 1;

	return {
		getFilms: function () {
			return _filmsF;
		},
		getFilmsId: function () {
			return _filmsId;
		},
		setFilmsId: function (filmsId) {
			if (filmsId < _filmsId) alert('error');
			else _filmsId = filmsId;
		}
	}
	
})
