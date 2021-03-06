app.factory('globalDetails', function ($http) {
	let vm = this;
	
	let _filmsD = [];
	let _filmsId = 1;

	return {
		getFilms: function () {
			return _filmsD;
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