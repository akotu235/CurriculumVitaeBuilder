function setHtmlLangAttribute() {
    const url = new URL(window.location.href);

    const lang = url.searchParams.get('lang');

    if (lang) {
        document.documentElement.setAttribute('lang', lang);
    }
}
setHtmlLangAttribute();