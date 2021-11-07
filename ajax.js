'use strict';

const fetchShow = async (url) => {
    const response = await fetch(url);
    return  await response.json();
};

const form = document.querySelector('#search-form');
const query = document.querySelector('#query');
const target = document.querySelector('#target');

form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const url = form.action + '?q=' + query.value;
    const tvShows = await fetchShow(url);
    console.log(tvShows)
    listOfShows(tvShows)
})

const listOfShows = (tvShows) => {
    target.innerHTML = '';
    tvShows.forEach(show => {
        const showInfo = show.show
        const img = (showInfo.image.medium === null) ? 'no image available' : showInfo.image.medium
        const name = (showInfo.name === null) ? 'no name' : showInfo.name
        const summary = (showInfo.summary === null) ? 'no summary' : showInfo.summary
        const genres = (showInfo.genres === null) ? 'no genres' : showInfo.genres.join(' | ')
        const offialSite = (showInfo.officialSite === null) ? 'https://www.netflix.com/fi-en/' : showInfo.officialSite

        target.innerHTML += `<article>
            <div id="left">
                <h1>${name}</h1>
          
                <h2>Overview:</h2>
                <p>${summary}</p>
          
                <p><b>Genres: </b>${genres}</p>
                <a href=${offialSite}>Link to website</a>
            </div>
            <figure>
                <img src=${img} alt="show-image"/>
            </figure>
        </article>`
    });
}
