//Generated using help from chatGPT with following prompt
//"using indexeddb, create an upload form for a games database, I need to store data in a struct"

document.addEventListener('DOMContentLoaded', () => {
    const dbName = 'gamesDB';
    const dbVersion = 1;
    let db;

    const openRequest = indexedDB.open(dbName, dbVersion);

    openRequest.onupgradeneeded = (event) => {
        db = event.target.result;
        const objectStore = db.createObjectStore('games', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('developers', 'developers', { unique: false });
        objectStore.createIndex('companyName', 'companyName', { unique: false });
        objectStore.createIndex('yearReleased', 'yearReleased', { unique: false });
        objectStore.createIndex('gameFile', 'gameFile', { unique: false });

        // Add default data
        objectStore.transaction.oncomplete = () => {
            const gamesObjectStore = db.transaction('games', 'readwrite').objectStore('games');
            gamesObjectStore.add({
                image: 'default_image.png',
                name: 'Default Game',
                developers: 'Default Developer',
                companyName: 'Default Company',
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

    document.getElementById('uploadForm').addEventListener('submit', (event) => {
        event.preventDefault();
        
        const gameImage = document.getElementById('gameImage').files[0];
        const gameName = document.getElementById('gameName').value;
        const developers = document.getElementById('developers').value;
        const companyName = document.getElementById('companyName').value;
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
                    companyName: companyName,
                    yearReleased: parseInt(yearReleased),
                    gameFile: gameData
                };
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
        const gamesList = document.getElementById('gamesList');
        gamesList.innerHTML = '';

        const transaction = db.transaction(['games'], 'readonly');
        const objectStore = transaction.objectStore('games');
        objectStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                const game = cursor.value;
                const gameDiv = document.createElement('div');
                gameDiv.innerHTML = `
                    <img src="${game.image}" alt="${game.name}" width="100">
                    <p><strong>Name:</strong> ${game.name}</p>
                    <p><strong>Developers:</strong> ${game.developers}</p>
                    <p><strong>Company Name:</strong> ${game.companyName}</p>
                    <p><strong>Year Released:</strong> ${game.yearReleased}</p>
                    <a href="${game.gameFile}" download="${game.name}">Download Game</a>
                `;
                gamesList.appendChild(gameDiv);
                cursor.continue();
            }
        };
    }
});
