/**
 * Author: George Nyakundi
 * Date: 29/01/2019
 * Role: Perform queries to https://swapi.co/api/
 * 
 * and displays a list of the Star Wars characters’ attributes (at least 3) in a table.
 *  When a user clicks on an element, they should be able to view all the details for the selected character.
 *  The user should be allowed to open a character’s details in a new tab.
 *   The detail view should have a favorites feature where they can pick up to 5 favorites from of the list.
 * They should also be able to remove a character from their list of favorites.
 * If a character is marked as a favorite, this should be indicated in the list view with a heart icon.

 */

async function fetchData() {

    const records = await fetch('https://swapi.co/api/people/');
    const people_records = await records.json();

    return people_records;
}



async function loadPage() {
    let all_people = await fetchData();
    let all_people_result = all_people.results
    var tbody = document.getElementById('tbody');


    for (var i = 0; i < all_people_result.length; i++) {
        let id_to_use = i + 1;

        // let tr = "<tr><td>" + id_to_use + "</td> <td>" + all_people_result[i]['name'] + "</td> <td>" + all_people_result[i]['birth_year'] + "</td><td>" + all_people_result[i]['gender'] + "</td><td>" + all_people_result[i]['skin_color'] + "</td><td>" + '<a target="_blank" rel="noopener noreferrer" href="' + window.location.href + "details.html?" + id_to_use + '">View Details</a>' + "</td><td>" + '<button type="button" class="btn btn-primary" onclick="markFavorite(' + id_to_use + ')"><span id="favorite_id"><i class="fas fa-heart"></i></span></button>' + "</td></tr>";
        // tbody.innerHTML += tr;

        let tr = "<tr><td>" + id_to_use + "</td> <td>" + all_people_result[i]['name'] + "</td> <td>" + all_people_result[i]['birth_year'] + "</td><td>" + all_people_result[i]['gender'] + "</td><td>" + all_people_result[i]['skin_color'] + "</td><td>" + '<a target="_blank" rel="noopener noreferrer" href="' + window.location.href + "details.html?" + id_to_use + '">View Details</a>' + "</td><td>"
        let favorite_id_style = 'favorite_' + id_to_use
        if (isFavorite(id_to_use)) {
            tr += '<button type="button" class="btn btn-primary" onclick="markFavoriteMain' + '(' + id_to_use + ')' + '"><span id="' + favorite_id_style + '" style="color:Tomato;"><i class="fas fa-heart"></i></span></button>'
        } else {
            tr += '<button type="button" class="btn btn-primary" onclick="markFavoriteMain' + '(' + id_to_use + ')' + '"><span id="' + favorite_id_style + '" style="color:White;"><i class="fas fa-heart"></i></span></button>'
        }

        tr += "</td></tr>";

        tbody.innerHTML += tr;
    }



    console.log(all_people)

}
/**
 * Check if main page else use that function that accepts id
 */

var dashboardPathWithSlash = window.location.pathname
var lastSlash = dashboardPathWithSlash.lastIndexOf('/');
var dashboardPath = dashboardPathWithSlash.slice(lastSlash + 1, -5);

if (dashboardPath == '' || dashboardPath == 'index') {
    loadPage()
} else if (dashboardPath == 'details') {
    var id_to_use = (window.location.search).split('?')[1]
    loadDetailsSingle(id_to_use);
}

/**
 * 
 */

async function fetchDataSingle(id) {
    let url = 'https://swapi.co/api/people/' + id + '/'
    const person = await fetch(url);
    const person_record = await person.json();

    return person_record;
}

function upperCaseFirst(someword) {
    return someword.charAt(0).toUpperCase() + someword.slice(1);
}

async function loadDetailsSingle(id) {

    let person_details = await fetchDataSingle(id);

    var person_details_div = document.getElementById('person_details');

    var details = '<div class="card-header"> <b>Name:  ' + person_details['name'] + '</b></div>'
    details += '<div class="card-body">'
    details += '<p class="card-text"><b>Gender:</b>  ' + '&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + upperCaseFirst(person_details['gender']) + '</p>'
    details += '<p class="card-text"><b>Eye Color: </b>  ' + '&emsp;&nbsp;' + upperCaseFirst(person_details['eye_color']) + '</p>'
    details += '<p class="card-text"><b>Hair Color:</b>   ' + '&emsp;' + upperCaseFirst(person_details['hair_color']) + '</p>'
    details += '<p class="card-text"><b>Skin Color: </b>  ' + '&emsp;' + upperCaseFirst(person_details['skin_color']) + '</p>'
    details += '<p class="card-text"><b>Height: </b>  ' + '&emsp;&emsp;&nbsp;&nbsp;' + person_details['height'] + '</p>'
    details += '<p class="card-text"><b>Birth Year: </b>  ' + '&emsp;' + person_details['birth_year'] + '</p>'

    let favorite_key = 'favorite_' + id
    if (isFavorite(id)) {
        details += '  <div class="card-body">'
        details += '<button type="button" class="btn btn-primary" onclick="markFavorite(' + id + ')"><span id="favorite_id" style="color:Tomato;"><i class="fas fa-heart"></i></span></button> &nbsp;'
        // details += '<button type="button" class="btn btn-danger" onclick="removeFavorites(' + id + ')">Delete from Favorites</button>'
        details += ' </div>'
    } else {
        details += '  <div class="card-body">'
        details += '<button type="button" class="btn btn-primary" onclick="markFavorite(' + id + ')"><span id="favorite_id"><i class="fas fa-heart"></i></span></button> &nbsp;'
        // details += '<button type="button" class="btn btn-danger " onclick="removeFavorites(' + id + ')"disabled>Delete from Favorites</button>'
        details += ' </div>'
    }



    details += '</div>'

    person_details_div.innerHTML += details;


    // console.log(person_details)
}
/**
 * The Details view should have a favorites feature where a user can pick up to 5 favorites.
 * 
 */
function markFavorite(id) {
    let favorite_id_number = 'favorite_' + id;
    if (localStorage.getItem(favorite_id_number) == null) {
        if (no_of_positive_favorites() != 5 && no_of_positive_favorites() < 5) {
            localStorage.setItem(favorite_id_number, true)
        }

    } else {
        if (!JSON.parse(localStorage.getItem(favorite_id_number))) {
            if (no_of_positive_favorites() != 5 && no_of_positive_favorites() < 5) {
                localStorage.setItem(favorite_id_number, true)
            }

        } else {
            localStorage.setItem(favorite_id_number, false)
        }
    }

    if (JSON.parse(localStorage.getItem(favorite_id_number))) {
        var favorite_id = document.getElementById('favorite_id');
        favorite_id.style.color = 'Tomato'
    } else {
        var favorite_id = document.getElementById('favorite_id');
        favorite_id.style.color = 'white'
    }
}

function markFavoriteMain(id) {
    let favorite_id_number = 'favorite_' + id;
    if (localStorage.getItem(favorite_id_number) == null) {
        if (no_of_positive_favorites() != 5 && no_of_positive_favorites() < 5) {
            localStorage.setItem(favorite_id_number, true)
        }

    } else {
        if (!JSON.parse(localStorage.getItem(favorite_id_number))) {
            if (no_of_positive_favorites() != 5 && no_of_positive_favorites() < 5) {
                localStorage.setItem(favorite_id_number, true)
            }

        } else {
            localStorage.setItem(favorite_id_number, false)
        }
    }

    // var favorite_id_number = 'favorite_'+id;

    if (JSON.parse(localStorage.getItem(favorite_id_number))) {

        var favorite_id = document.getElementById(favorite_id_number);
        favorite_id.style.color = 'Tomato'
    } else {
        var favorite_id = document.getElementById(favorite_id_number);
        favorite_id.style.color = 'white'
    }
}



/**
 * we'll be calling this function to get the favorites from the local storage and append a heart icon next to it.
 */
function isFavorite(id) {
    let favorite_id_to_check = 'favorite_' + id;
    if (localStorage.getItem(favorite_id_to_check) == null) {
        return false;
    } else {
        if (JSON.parse(localStorage.getItem(favorite_id_to_check))) {
            return true;
        } else {
            return false;
        }
    }



}

/**
 * This function will be for removing a character from the favorites stored in localstorage
 */
function removeFavorites(id) {
    if (localStorage.getItem(id) == nul) {
        localStorage.setItem(id, false)
    } else {
        if (localStorage.getItem) {
            localStorage.setItem(id, false)
        }
    }
    var favorite_id = document.getElementById('favorite_id');
    favorite_id.style.color = '';

}

/*
 *Check number of Favorites with positive
 */

function no_of_positive_favorites() {
    var number_of_favorites = 0;
    $.each(localStorage, function (key, value) {
        if (key.substr(0, 8) == 'favorite') {
            if (JSON.parse(value)) {
                number_of_favorites++
            }
        }
        // key magic
        // value magic

    });
    return number_of_favorites;
}