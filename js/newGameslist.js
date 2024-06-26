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
                image: 'img/banners/fresh catch.png',
                name: 'Fresh Catch',
                developers: 'Liam McKenzie',
                className: 'Mobile App Dev',
                yearReleased: 2023,
                gameFile: 'https://mckeld3.itch.io/fresh-catch'
            });
            gamesObjectStore.add({
                image: 'img/banners/scaredkrow.PNG',
                name: 'ScaredKrow',
                developers: 'Liam McKenzie, Johnathan Glasgow, Devon Henderson, Carlson Lee',
                className: 'Game Development',
                yearReleased: 2024,
                gameFile: 'https://mckeld3.itch.io/scaredkrow'
            });
            gamesObjectStore.add({
                image: 'img/banners/shotty.png',
                name: 'Shotty',
                developers: 'Liam McKenzie, Johnathan Glasgow',
                className: 'Game Development',
                yearReleased: 2024,
                gameFile: 'https://mckeld3.itch.io/shotty'
            });
            gamesObjectStore.add({
                image: 'img/banners/gostra.png',
                name: 'Gostra',
                developers: 'Liam McKenzie, Palin Wiseman, Johnathan Glasgow',
                className: 'Game Development',
                yearReleased: 2024,
                gameFile: 'https://mckeld3.itch.io/gostra'
            });
            gamesObjectStore.add({
                image: 'img/banners/renewify.png',
                name: 'Renewify',
                developers: 'Liam McKenzie, Palin Wiseman, Chase Bennett-Hill, Carlson Lee',
                className: 'Studio 5/6',
                yearReleased: 2024,
                gameFile: 'https://mckeld3.itch.io/renewify'
            });
        };
    };

    openRequest.onsuccess = (event) => {
        db = event.target.result;
        displayGames();
        background();
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
        const gameFile = document.getElementById('gameFile').value;


        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;

            const transaction = db.transaction(['games'], 'readwrite');
            const objectStore = transaction.objectStore('games');
            const gameDataObj = {
                image: imageData,
                name: gameName,
                developers: developers,
                className: className,
                yearReleased: parseInt(yearReleased),
                gameFile: gameFile
            };
            //print(gameDataObj);
            objectStore.add(gameDataObj);
            transaction.oncomplete = () => {
                displayGames();
                document.getElementById('uploadModal').style.display = 'none';
            };

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
                    <td><img src="${game.image}" alt="${game.image}  Banner"></td>
                    <td>${game.name}</td>
                    <td>${game.developers}</td>
                    <td>${game.className}</td>
                    <td>${game.yearReleased}</td>
                    <td>
                        <a href="${game.gameFile}" target="_blank" class="download-button">Download</a>
                    </td>
                    
                `;
                //<td>${game.size}</td>
                gamesTable.appendChild(gameDiv);
                cursor.continue();
            }
        };
    }

    function background()
    {
        const transaction = db.transaction(['games'], 'readonly');
        const objectStore = transaction.objectStore('games');
        const games = [];

        objectStore.openCursor().onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
                games.push(cursor.value.image);
                cursor.continue();
            } else {
                console.log(games);
                if (games != null)
                {
                    const randomIndex = Math.floor(Math.random() * games.length);

                    const randomBanner = games[randomIndex];
                    document.querySelector('.background').style.backgroundImage = `url('${randomBanner}')`;
                }
            }
        };
    }

});