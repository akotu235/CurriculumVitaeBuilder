# Curriculum Vitae Builder <small><sub>by akotu</sub></small>

## Wymagania Wstępne

Upewnij się, że masz zainstalowane `Node.js` oraz `npm`. Jeśli nie, pobierz i zainstaluj Node.js z [oficjalnej strony](https://nodejs.org/), co automatycznie zainstaluje npm.

## Instalacja

1. **Utwórz nowy katalog dla swojego projektu CV** (jeśli jeszcze go nie masz):

   ```sh
   mkdir my-cv
   cd my-cv
   ```

2. **Zainstaluj pakiet cv-builder**:

   ```sh
   npm install cv-builder
   ```

## Edytowanie Treści

Aby dodać treść swojego CV, edytuj odpowiednie pliki znajdujące się w katalogu `contents`. Po wprowadzeniu zmian w tych plikach możesz przejść do kroku generowania pliku PDF.

Wygenerowany plik PDF jest interaktywny, co oznacza, że podane linki (adresy stron, e-maile czy numery telefonów), które zostały uzupełnione w plikach w katalogu `hrefs`, będą działać bezpośrednio w pliku PDF.

W katalogu `photo` umieść swoje zdjęcie o nazwie `photo.jpg`. To zdjęcie zostanie uwzględnione w wygenerowanym pliku PDF.


## Edytowanie Styli

Style dokumentu są zarządzane za pomocą plików CSS, które umożliwiają dostosowanie różnych aspektów wyglądu. Aby edytować wygląd swojego CV, możesz wprowadzać zmiany w kilku miejscach:
1. Ogólne Style:
    * Zmiany globalnych styli wprowadzasz w pliku `style.css` znajdującym się w katalogu `styles`.
2. Style Specyficzne dla Wersji:
    * Jeśli chcesz dostosować wygląd dla konkretnej wersji językowej, edytuj odpowiednie pliki w katalogu `contents/<nazwa_wersji>/styles/`. Pliki mają format `style_<lang>.css`, gdzie `<nazwa_wersji>` to nazwa wersji, a `<lang>` to kod języka (np. `pl` dla polskiego, `en` dla angielskiego).

Przykład ścieżki do pliku styli dla wersji polskiej:

   ```sh
   contents/main/styles/style_pl.css
   ```

## Drukowanie do PDF

Aby wygenerować pliki PDF, uruchom poniższe polecenie:

   ```sh
   npx cv-build
   ```
Po zakończeniu działania skryptu katalog z wygenerowanymi plikami PDF zostanie automatycznie otwarty.

## Przykład

[Zobacz przykładowe CV](https://raw.githubusercontent.com/akotu235/CurriculumVitaeBuilder/master/example/Imi%C4%99_Nazwisko_CV_PL.pdf)

## Dodanie Kolejnej Wersji

Aby dodać nową wersję CV (np. dla konkretnego stanowiska), postępuj zgodnie z poniższymi krokami:

1. Zainicjuj Nową Wersję CV:
   * Wykonaj poniższe polecenie, aby utworzyć nową wersję CV na podstawie wersji głównej:
   
   ```sh
   npx new-cv-version
   ```

   Polecenie to utworzy nową wersję CV w katalogu contents o podanej nazwie.

2. Dostosuj Treści i Style:
   * Dostosuj treści oraz style w nowym katalogu, aby odpowiadały specyfice nowej wersji.

3. Wydrukuj do PDF:
   * Użyj poniższego polecenia, aby wygenerować pliki PDF:

   ```sh
   npx cv-build
   ```

## License
Distributed under the MIT License. See [LICENSE](https://github.com/akotu235/CurriculumVitaeBuilder/blob/master/LICENSE) for more information.

[![GitHub](https://img.shields.io/github/license/akotu235/CurriculumVitaeBuilder)](https://github.com/akotu235/CurriculumVitaeBuilder/blob/master/LICENSE)

## Contact
Andrzej - [Report a problem or ask your question online](https://akotu235.github.io/)

Project Link: [https://github.com/akotu235/CurriculumVitaeBuilder](https://github.com/akotu235/CurriculumVitaeBuilder)
