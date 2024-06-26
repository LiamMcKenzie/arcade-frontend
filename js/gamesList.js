//https://www.w3schools.com/js/js_cookies.asp
//https://medium.com/@lancelyao/browser-storage-local-storage-session-storage-cookie-indexeddb-and-websql-be6721ebe32a

function setLocalStorage(name, value) {
    localStorage.setItem(name, JSON.stringify(value));
}

function getLocalStorage(name) {
    return JSON.parse(localStorage.getItem(name));

}

var games = getLocalStorage('gamesList') || [
    {
        bannerSrc: 'img/banners/frontend progress.PNG',
        gameName: 'Game One',
        developers: 'John Doe, Jane Doe',
        className: 'Studio 5',
        year: '2020',
        downloadLink: 'downloadables/ScaredKrow 1.1.zip',
        size: '50MB'
    },
    {
        bannerSrc: 'img/banners/Capture7.PNG',
        gameName: 'Game Two',
        developers: 'Alice Smith, Bob Johnson',
        className: 'Intro App Dev',
        year: '2018',
        downloadLink: 'downloadables/ScaredKrow 1.1.zip',
        size: '75MB'
    },
    {
        bannerSrc: 'img/banners/colour palette.PNG',
        gameName: 'Game Three',
        developers: 'Michael Brown, Rachel Green',
        className: 'Game Development',
        year: '2019',
        downloadLink: 'downloadables/ScaredKrow 1.1.zip',
        size: '120MB'
    },
]

function createTableRow(game) {
    const tr = document.createElement('tr');

    const bannerCell = document.createElement('td');
    const img = document.createElement('img');
    img.src = game.bannerSrc;
    img.alt = `${game.gameName} Banner`;
    bannerCell.appendChild(img);
    tr.appendChild(bannerCell);

    const gameNameCell = document.createElement('td');
    gameNameCell.textContent = game.gameName;
    tr.appendChild(gameNameCell);

    const developersCell = document.createElement('td');
    developersCell.textContent = game.developers;
    tr.appendChild(developersCell);

    const classCell = document.createElement('td');
    classCell.textContent = game.className;
    tr.appendChild(classCell);

    const yearCell = document.createElement('td');
    yearCell.textContent = game.year;
    tr.appendChild(yearCell);

    const downloadCell = document.createElement('td');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = game.downloadLink;
    downloadAnchor.className = 'download-button';
    downloadAnchor.textContent = 'Download';
    downloadCell.appendChild(downloadAnchor);
    tr.appendChild(downloadCell);

    const sizeCell = document.createElement('td');
    sizeCell.textContent = game.size;
    tr.appendChild(sizeCell);

    return tr;
}

function addAllGameRows() {
    const tableBody = document.getElementById('game-table-body');
    games.forEach(game => {
        const newRow = createTableRow(game);
        tableBody.appendChild(newRow);
    });
}

function convertImageToBase64(file, callback) { 
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        callback(reader.result);
    });
    reader.readAsDataURL(file);
}

window.onload = addAllGameRows; //loads all the games when the page is loaded



function addGameRow(bannerSrc, gameName, developers, className, year, downloadLink) {
    const tableBody = document.getElementById('game-table-body');

    convertImageToBase64(bannerSrc, result => {
        const newGame = {
            bannerSrc: result,
            gameName: gameName,
            developers: developers,
            className: className,
            year: year,
            downloadLink: 'downloadables/ScaredKrow 1.1.zip',
            size: '60MB'
        };
        games.push(newGame);
        setLocalStorage('gamesList', games, 7);
        const newRow = createTableRow(newGame);
        tableBody.appendChild(newRow);
    });
}