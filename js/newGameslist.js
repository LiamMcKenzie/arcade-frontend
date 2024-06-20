//Generated using help from chatGPT with following prompt
//"using indexeddb, create an upload form for a games database, I need to store data in a struct"

//I used it for help but I still wrote this file manually

document.addEventListener('DOMContentLoaded', () => {
    //create database
    let db;
    const openRequest = indexedDB.open('gamesDB', 1);


    openRequest.onupgradeneeded = (event) => {
        db = event.target.result;
        const objectStore = db.createObjectStore('games', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('developers', 'developers', { unique: false });
        objectStore.createIndex('className', 'className', { unique: false });
        objectStore.createIndex('yearReleased', 'yearReleased', { unique: false });
        objectStore.createIndex('gameFile', 'gameFile', { unique: false });

        // Add default data
        objectStore.transaction.oncomplete = () => {
            const gamesObjectStore = db.transaction('games', 'readwrite').objectStore('games');
            gamesObjectStore.add({
                image: 'default_image.png',
                name: 'Default Game',
                developers: 'Default Developer',
                className: 'Default Class',
                yearReleased: 2000,
                gameFile: 'default_game_file.zip'
            });
        };
    };

    openRequest.onsuccess = (event) => {
        db = event.target.result;
        displayGames();
    };

    openRequest.onerror = (event) => {
        console.error('Error opening database:', event.target.errorCode);
    };

    document.getElementById('uploadModal').addEventListener('submit', (event) => {
        event.preventDefault();

        const gameImage = document.getElementById('gameImage').files[0];
        const gameName = document.getElementById('gameName').value;
        const developers = document.getElementById('developers').value;
        const className = document.getElementById('className').value;
        const yearReleased = document.getElementById('yearReleased').value;
        const gameFile = document.getElementById('gameFile').files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;

            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const gameData = e.target.result;

                const transaction = db.transaction(['games'], 'readwrite');
                const objectStore = transaction.objectStore('games');
                const gameDataObj = {
                    image: imageData,
                    name: gameName,
                    developers: developers,
                    className: className,
                    yearReleased: parseInt(yearReleased),
                    gameFile: gameData
                };
                //print(gameDataObj);
                objectStore.add(gameDataObj);
                transaction.oncomplete = () => {
                    displayGames();
                };
            };
            fileReader.readAsDataURL(gameFile);
        };
        reader.readAsDataURL(gameImage);
    });

    function displayGames() {
        const gamesTable = document.getElementById('game-table-body');
        gamesTable.innerHTML = '';

        const transaction = db.transaction(['games'], 'readonly');
        const objectStore = transaction.objectStore('games');
        objectStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                const game = cursor.value;
                const gameDiv = document.createElement('tr');
                gameDiv.innerHTML = `
                    <td><img src="${game.image}" alt="${game.image} Banner"></td>
                    <td>${game.name}</td>
                    <td>${game.developers}</td>
                    <td>${game.className}</td>
                    <td>${game.yearReleased}</td>
                    <td>
                        <a href="${game.gameFile}" class="download-button">Download</a>
                    </td>
                    <td>${game.size}</td>
                `;
                gamesTable.appendChild(gameDiv);
                cursor.continue();
            }
        };
    }

});