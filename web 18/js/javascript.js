var movies;
var currentPage = 1;
var moviesPerPage = 8;

function years() {
    var years = document.getElementById("select");
    arr_years = [];
    for (var i = 0; i < movies.length; i++) {
        arr_years[i] = movies[i].year;
    }

    var unique_years = new Set(arr_years);
    var backToArray = [...unique_years];
    backToArray.sort();
    for (var j = 0; j < backToArray.length; j++) {
        var option = document.createElement("OPTION");
        option.innerHTML = backToArray[j];
        option.value = backToArray[j];
        years.appendChild(option);
    }
}

function sec1() {
    var main_div = document.getElementById('main-sec1');
    var i = 0;
    while (i < moviesPerPage) {
        var idx = Math.floor(Math.random() * movies.length);
        if (movies[idx].info.image_url && movies[idx].info.rating > 7) {
            var div5 = document.createElement('div');
            div5.classList.add('col-lg-3', 'col-md-6', 'col-sm-12', 'mt-2', 'mb-3');

            var div6 = document.createElement('div');
            div6.classList.add('card', 'border2');
            div5.appendChild(div6);

            var img = document.createElement('img');
            img.classList.add('card-img-top', 'border2', 'gray');
            img.setAttribute('width', '400');
            img.setAttribute('height', '550');
            img.onerror = function () {
                img.src = 'data/nodata.png';
            };

            div6.appendChild(img);
            main_div.appendChild(div5);
            img.src = movies[idx].info.image_url;

            var p1 = document.createElement('P');
            p1.classList.add('card-text', 'text-black', 'h6', 'text-left', 'mt-3', 'px-2', 'cut-text');
            div6.appendChild(p1);

            var p2 = document.createElement('P');
            p2.classList.add('card-text', 'text-black', 'h6', 'mb-3', 'px-2');
            div6.appendChild(p2);

            p1.innerHTML = movies[idx].title + ' - ' + movies[idx].year;
            p2.innerHTML = 'Rating: ' + movies[idx].info.rating;

            i += 1;
        }
    }
}

function display_years(selected_filter) {
    var main_sec1 = document.getElementById('main-sec1');
    var main_sec2 = document.getElementById('main-sec2');
    main_sec1.innerHTML = '';
    main_sec2.innerHTML = '';

    var filteredMovies = filterMoviesByYear(selected_filter.value);

    for (var i = (currentPage - 1) * moviesPerPage; i < currentPage * moviesPerPage && i < filteredMovies.length; i++) {
        var movie = filteredMovies[i];
        if (movie.info.image_url) {
            var div5 = document.createElement('div');
            div5.classList.add('col-lg-3', 'col-md-6', 'col-sm-12', 'mb-3', 'mt-2');
            main_sec2.appendChild(div5);

            var div6 = document.createElement('div');
            div6.classList.add('card', 'border2');
            div5.appendChild(div6);

            var img = document.createElement('img');
            img.classList.add('card-img-top', 'border2', 'gray');
            img.setAttribute('width', '400');
            img.setAttribute('height', '550');
            img.onerror = function () {
                img.src = 'data/nodata.png';
            };

            div6.appendChild(img);

            var div7 = document.createElement('div');
            div7.classList.add('card-body');
            div6.appendChild(div7);

            var p1 = document.createElement('P');
            p1.classList.add('card-text', 'text-black', 'h6', 'text-left', 'cut-text');
            div7.appendChild(p1);

            var p2 = document.createElement('P');
            p2.classList.add('card-text', 'text-black', 'mt-3', 'font-text2', 'cut-text');
            div7.appendChild(p2);

            var p3 = document.createElement('P');
            p3.classList.add('card-text', 'text-black', 'mt-3', 'cut-text');
            div7.appendChild(p3);

            var span1 = document.createElement('SPAN');
            span1.classList.add('card-text', 'text-black', 'h6', 'text-left', 'font_menu');
            p3.appendChild(span1);

            var span2 = document.createElement('SPAN');
            span2.classList.add('card-text', 'text-black', 'text-left', 'font_menu');
            p3.appendChild(span2);

            var p4 = document.createElement('P');
            p4.classList.add('card-text', 'text-black', 'text-left', 'cut-text');
            div7.appendChild(p4);

            var span3 = document.createElement('SPAN');
            span3.classList.add('card-text', 'text-black', 'h6', 'text-left', 'font_menu');
            p4.appendChild(span3);

            var span4 = document.createElement('SPAN');
            span4.classList.add('card-text', 'text-black', 'text-left', 'font_menu');
            p4.appendChild(span4);

            img.src = movie.info.image_url;
            p1.innerHTML = 'Title: ' + movie.title + ' - ' + movie.year;
            p2.innerHTML = movie.info.plot;
            span1.innerHTML = 'Artists: ';
            span2.innerHTML = movie.info.actors;

            span3.innerHTML = 'Directors: ';
            span4.innerHTML = movie.info.directors;
        }
    }

    addPaginationLinks(Math.ceil(filteredMovies.length / moviesPerPage), main_sec2);
}

function display_search() {
    var main_sec1 = document.getElementById('main-sec1');
    var main_sec2 = document.getElementById('main-sec2');
    main_sec1.innerHTML = '';
    main_sec2.innerHTML = '';

    var input_value = document.getElementById("search").value;
    var filteredMovies = filterMoviesByTitle(input_value);

    for (var i = (currentPage - 1) * moviesPerPage; i < currentPage * moviesPerPage && i < filteredMovies.length; i++) {
        var movie = filteredMovies[i];
        if (movie.info.image_url) {
            var div5 = document.createElement('div');
            div5.classList.add('col-lg-3', 'col-md-6', 'col-sm-12', 'mb-3', 'mt-2');
            main_sec2.appendChild(div5);

            var div6 = document.createElement('div');
            div6.classList.add('card', 'border2');
            div5.appendChild(div6);

            var img = document.createElement('img');
            img.classList.add('card-img-top', 'border2', 'gray');
            img.setAttribute('width', '400');
            img.setAttribute('height', '550');
            img.onerror = function () {
                img.src = 'data/nodata.png';
            };

            div6.appendChild(img);

            var div7 = document.createElement('div');
            div7.classList.add('card-body');
            div6.appendChild(div7);

            var p1 = document.createElement('P');
            p1.classList.add('card-text', 'text-black', 'h6', 'text-left', 'cut-text');
            div7.appendChild(p1);

            var p2 = document.createElement('P');
            p2.classList.add('card-text', 'text-black', 'mt-3', 'font-text2', 'cut-text');
            div7.appendChild(p2);

            var p3 = document.createElement('P');
            p3.classList.add('card-text', 'text-black', 'mt-3', 'cut-text');
            div7.appendChild(p3);

            var span1 = document.createElement('SPAN');
            span1.classList.add('card-text', 'text-black', 'h6', 'text-left', 'font_menu');
            p3.appendChild(span1);

            var span2 = document.createElement('SPAN');
            span2.classList.add('card-text', 'text-black', 'text-left', 'font_menu');
            p3.appendChild(span2);

            var p4 = document.createElement('P');
            p4.classList.add('card-text', 'text-black', 'text-left', 'cut-text');
            div7.appendChild(p4);

            var span3 = document.createElement('SPAN');
            span3.classList.add('card-text', 'text-black', 'h6', 'text-left', 'font_menu');
            p4.appendChild(span3);

            var span4 = document.createElement('SPAN');
            span4.classList.add('card-text', 'text-black', 'text-left', 'font_menu');
            p4.appendChild(span4);

            img.src = movie.info.image_url;
            p1.innerHTML = 'Title: ' + movie.title + ' - ' + movie.year;
            p2.innerHTML = movie.info.plot;
            span1.innerHTML = 'Actors: ';
            for (var k = 0; k < 3 && k < movie.info.actors.length; k++) {
                span2.innerHTML += movie.info.actors[k] + ', ';
            }
            span3.innerHTML = 'Directors: ';
            span4.innerHTML = movie.info.directors;
        }
    }

    addPaginationLinks(Math.ceil(filteredMovies.length / moviesPerPage), main_sec2);
}

function addPaginationLinks(totalPages, container) {
    var paginationContainer = document.createElement('nav');
    paginationContainer.setAttribute('aria-label', 'Page navigation example');
    paginationContainer.innerHTML = '<ul class="pagination"></ul>';
    var paginationList = paginationContainer.querySelector('.pagination');

    var prevPageItem = document.createElement('li');
    prevPageItem.classList.add('page-item');
    var prevPageLink = document.createElement('a');
    prevPageLink.classList.add('page-link');
    prevPageLink.href = 'javascript:void(0);';
    prevPageLink.setAttribute('aria-label', 'Previous');
    prevPageLink.innerHTML = '<span aria-hidden="true">&laquo;</span>';
    prevPageLink.onclick = function () {
        currentPage = Math.max(currentPage - 1, 1);
        container.innerHTML = '';
        if (container.id === 'main-sec1') {
            sec1();
        } else {
            display_years(document.getElementById('select'));
        }
    };
    prevPageItem.appendChild(prevPageLink);
    paginationList.appendChild(prevPageItem);

    for (var i = 1; i <= totalPages; i++) {
        var pageItem = document.createElement('li');
        pageItem.classList.add('page-item');
        var pageLink = document.createElement('a');
        pageLink.classList.add('page-link');
        pageLink.href = 'javascript:void(0);';
        pageLink.innerHTML = i;
        pageLink.onclick = function () {
            currentPage = parseInt(this.innerHTML);
            container.innerHTML = '';
            if (container.id === 'main-sec1') {
                sec1();
            } else {
                display_years(document.getElementById('select'));
            }
        };
        pageItem.appendChild(pageLink);
        paginationList.appendChild(pageItem);
    }

    var nextPageItem = document.createElement('li');
    nextPageItem.classList.add('page-item');
    var nextPageLink = document.createElement('a');
    nextPageLink.classList.add('page-link');
    nextPageLink.href = 'javascript:void(0);';
    nextPageLink.setAttribute('aria-label', 'Next');
    nextPageLink.innerHTML = '<span aria-hidden="true">&raquo;</span>';
    nextPageLink.onclick = function () {
        currentPage = Math.min(currentPage + 1, totalPages);
        container.innerHTML = '';
        if (container.id === 'main-sec1') {
            sec1();
        } else {
            display_years(document.getElementById('select'));
        }
    };
    nextPageItem.appendChild(nextPageLink);
    paginationList.appendChild(nextPageItem);

    container.appendChild(paginationContainer);
}

function filterMoviesByYear(year) {
    return movies.filter(movie => movie.year == year);
}

function filterMoviesByTitle(title) {
    return movies.filter(movie => movie.title.includes(title));
}

async function read_data(file) {
    let response = await fetch(file);
    let data = await response.text();
    movies = JSON.parse(data);
    sec1();
    years();
}

read_data("https://raw.githubusercontent.com/ganjbakhshali/php_course/main/web%2018/data/moviedata.json");
