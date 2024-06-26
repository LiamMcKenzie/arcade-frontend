const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);

    updateButtonIcon(isDarkMode)
};

document.addEventListener("DOMContentLoaded", (event) => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    updateButtonIcon(localStorage.getItem('darkMode') === 'true');
});

function updateButtonIcon(isDarkMode) {
    const darkModeIcon = document.querySelector('.toggle-dark-mode img');

    if (isDarkMode) {
        darkModeIcon.src = 'img/circle-half-stroke-solid(dark).svg';
    }else {
        darkModeIcon.src = 'img/circle-half-stroke-solid(light).svg';
    }
};
