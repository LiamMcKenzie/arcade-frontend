var games = [
    {
        bannerSrc: 'img/banners/frontend progress.PNG',
        gameName: 'Game One',
        developers: 'John Doe, Jane Doe',
        studio: 'Studio 5',
        year: '2020',
        downloadLink: 'downloadables/ScaredKrow 1.1.zip',
        size: '50MB'
    },
    {
        bannerSrc: 'img/banners/Capture7.PNG',
        gameName: 'Game Two',
        developers: 'Alice Smith, Bob Johnson',
        studio: 'Intro App Dev',
        year: '2018',
        downloadLink: 'downloadables/ScaredKrow 1.1.zip',
        size: '75MB'
    },
    {
        bannerSrc: 'img/banners/colour palette.PNG',
        gameName: 'Game Three',
        developers: 'Michael Brown, Rachel Green',
        studio: 'Game Development',
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

    const studioCell = document.createElement('td');
    studioCell.textContent = game.studio;
    tr.appendChild(studioCell);

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

window.onload = addAllGameRows; //loads all the games when the page is loaded

function addGameRow() {
    const tableBody = document.getElementById('game-table-body');
    const newGame = {
        bannerSrc: 'img/banners/new_game.PNG',
        gameName: 'Game Three',
        developers: 'New Dev, Another Dev',
        studio: 'Studio 9',
        year: '2022',
        downloadLink: 'new_path',
        size: '60MB'
    };
    games.push(newGame);
    const newRow = createTableRow(newGame);
    tableBody.appendChild(newRow);
}