document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggler ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const themeIcon = themeToggleButton.querySelector('i');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    }

    // Apply initial theme based on localStorage or system preference
    if (currentTheme) {
        applyTheme(currentTheme);
    } else if (prefersDarkScheme.matches) {
         applyTheme('dark');
    } else {
         applyTheme('light'); // Default to light
    }

    // Listener for button click
    themeToggleButton.addEventListener('click', () => {
        let newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Optional: Listen for changes in system preference
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only change if user hasn't manually set a theme via the button
        if (!localStorage.getItem('theme')) {
             applyTheme(e.matches ? 'dark' : 'light');
        }
    });


    // --- Filter Button Active State ---
    const tagLists = document.querySelectorAll('.tag-list');

    tagLists.forEach(list => {
        const buttons = list.querySelectorAll('.tag-button');

        list.addEventListener('click', (event) => {
            const clickedButton = event.target.closest('.tag-button');

            if (!clickedButton || !list.contains(clickedButton)) {
                return;
            }

            event.preventDefault();

            buttons.forEach(button => {
                button.classList.remove('active');
            });

            clickedButton.classList.add('active');

            console.log(`Filter group updated. Active button: ${clickedButton.textContent.trim()}`);
        });
    });

}); // End DOMContentLoaded listener

