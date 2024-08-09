document.addEventListener('DOMContentLoaded', () => {
    const language = document.documentElement.getAttribute('lang');
    const contentsPath = 'contents/texts/' + language + '/';

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

    const loadFile = (id, file) => {
        fetch(contentsPath + file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error(`Błąd podczas ładowania pliku ${file}:`, error));
    };

    const loadHrefs = (id, file) => {
        fetch('contents/hrefs/' + file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).href = data;
            })
            .catch(error => console.error(`Błąd podczas ładowania pliku ${file}:`, error));
    };

    const loadHeaders = (id, file) => {
        fetch(contentsPath + 'headers/' + file)
            .then(response => response.text())
            .then(data => {
                document.getElementById(id).innerHTML = data;
            })
            .catch(error => console.error(`Błąd podczas ładowania pliku ${file}:`, error));
    };

    fetch('contents/technologies/technologies-list.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('technologies-list').innerHTML = data;
        })
        .catch(error => console.error(`Błąd podczas ładowania pliku technologies-list.html:`, error));

    contents.forEach(({id, file}) => loadFile(id, file));
    hrefs.forEach(({id, file}) => loadHrefs(id, file));
    headers.forEach(({id, file}) => loadHeaders(id, file));

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = "text/css"
    link.href = '/styles/style_' + language + '.css';
    document.head.appendChild(link);

    fetch(contentsPath + 'name.txt')
        .then(response => response.text())
        .then(name => {
            document.title = name.replace(/ /g, '_') + '_CV_' + language.toUpperCase();
        })
        .catch(error => console.error(`Błąd podczas ładowania pliku name.txt:`, error));

});