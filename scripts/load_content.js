document.addEventListener('DOMContentLoaded', () => {
    const language = document.documentElement.getAttribute('lang');
    const url = new URL(window.location.href);
    const version = url.searchParams.get('version') || 'main';
    const contentsPath = 'contents/' + version + '/';
    const textsPath = contentsPath + 'texts/' + language + '/';
    const headersPath = textsPath + 'headers/';
    const hrefsPath = contentsPath + 'hrefs/';
    const photoPath = contentsPath + 'photo/photo.jpg';
    const technologiesPath = contentsPath + 'technologies/';
    const stylesPath = contentsPath + '/styles/style_' + language + '.css';


    const contents = [
        {id: 'name', file: 'name.txt'},
        {id: 'about', file: 'about.txt'},
        {id: 'position', file: 'position.txt'},
        {id: 'location', file: 'location.txt'},
        {id: 'web', file: 'web.txt'},
        {id: 'mail', file: 'mail.txt'},
        {id: 'phone', file: 'phone.txt'},
        {id: 'agreement', file: 'agreement.txt'},
        {id: 'education-table', file: 'education-table.html'},
        {id: 'languages-list', file: 'languages-list.html'},
        {id: 'skills-list', file: 'skills-list.html'},
        {id: 'work-table', file: 'work-table.html'}
    ];

    const hrefs = [
        {id: 'location-href', file: 'location.txt'},
        {id: 'web-href', file: 'web.txt'},
        {id: 'mail-href', file: 'mail.txt'},
        {id: 'phone-href', file: 'phone.txt'}
    ];

    const headers = [
        {id: 'contact-header', file: 'contact.txt'},
        {id: 'education-header', file: 'education.txt'},
        {id: 'languages-header', file: 'languages.txt'},
        {id: 'skills-header', file: 'skills.txt'},
        {id: 'summary-header', file: 'summary.txt'},
        {id: 'technologies-header', file: 'technologies.txt'},
        {id: 'work-history-header', file: 'work-history.txt'},
        {id: 'date-header', file: 'date.txt'},
        {id: 'company-name-header', file: 'company-name.txt'},
        {id: 'position-header', file: 'position.txt'},
        {id: 'location-header', file: 'location.txt'}
    ];

    const loadTexts = (id, file) => {
        fetch(textsPath + file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error(`Błąd podczas ładowania pliku ${file}:`, error));
    };

    const loadHrefs = (id, file) => {
        fetch(hrefsPath + file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).href = data;
            })
            .catch(error => console.error(`Błąd podczas ładowania pliku ${file}:`, error));
    };

    const loadHeaders = (id, file) => {
        fetch(headersPath + file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error(`Błąd podczas ładowania pliku ${file}:`, error));
    };

    fetch(technologiesPath + 'technologies-list.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('technologies-list').innerHTML = data;
        })
        .catch(error => console.error(`Błąd podczas ładowania pliku technologies-list.html:`, error));

    fetch(contentsPath + 'name.txt')
        .then(response => response.text())
        .then(name => {
            document.title = name.replace(/ /g, '_') + '_CV_' + language.toUpperCase();
        })
        .catch(error => console.error(`Błąd podczas ładowania pliku name.txt:`, error));

    contents.forEach(({id, file}) => loadTexts(id, file));
    hrefs.forEach(({id, file}) => loadHrefs(id, file));
    headers.forEach(({id, file}) => loadHeaders(id, file));

    document.getElementById("photo").src = photoPath;

    function checkStyleFileExists() {
        return fetch(stylesPath, { method: 'HEAD' })
            .then(response => response.ok)
            .catch(() => false);
    }

    checkStyleFileExists().then(exists => {
        if (exists) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = stylesPath;
            document.head.appendChild(link);
        }
    });
});