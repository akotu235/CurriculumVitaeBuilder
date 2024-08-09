# Curriculum Vitae Builder <small><sub>by akotu</sub></small>

## Edytowanie treści

Aby dodać treść swojego CV, edytuj odpowiednie pliki znajdujące się w katalogu `contents`. Po wprowadzeniu zmian w tych plikach, możesz przejść do kroku generowania pliku PDF.

Wygenerowany plik PDF jest interaktywny, co oznacza, że podane linki, takie jak adresy stron, e-maile czy numery telefonów, które zostały uzupełnione w plikach znajdujących się w katalogu `contents/hrefs`, będą działać bezpośrednio w pliku PDF.

W katalogu `contents/photo` umieść swoje zdjęcie o nazwie `photo.jpg`. To zdjęcie zostanie uwzględnione w wygenerowanym pliku PDF.


## Edytowanie styli

Aby dostosować wygląd swojego CV, możesz edytować style znajdujące się w katalogu styles. Możesz modyfikować ogólne style lub style specyficzne dla konkretnej wersji językowej, aby poprawić wygląd dokumentu zgodnie z własnymi potrzebami. Wszelkie zmiany w wyglądzie dokumentu, takie jak zmiana rozmiaru tekstu czy inne stylizacje, można wprowadzać w plikach CSS.

## Drukowanie do PDF

Aby wygenerować plik PDF, postępuj zgodnie z poniższymi krokami:

### Wymagania wstępne

Upewnij się, że masz zainstalowane Node.js oraz npm. Jeśli nie, pobierz i zainstaluj Node.js z [oficjalnej strony](https://nodejs.org/), co automatycznie zainstaluje npm.

### Instalacja zależności

1. Otwórz terminal i przejdź do katalogu, w którym znajduje się plik `package.json`.
2. Uruchom polecenie:

```sh
npm install
```

To polecenie pobierze i zainstaluje wszystkie zależności potrzebne do działania skryptu.

### Uruchamianie skryptu

Po zainstalowaniu zależności możesz uruchomić skrypt do generowania pliku PDF:

```sh
node print_to_pdf.js
```
Po zakończeniu działania skryptu, katalog z wygenerowanymi plikami PDF zostanie automatycznie otwarty.

## Przykład

[Zobacz przykładowe CV](https://raw.githubusercontent.com/akotu235/CurriculumVitaeBuilder/master/example/Imi%C4%99_Nazwisko_CV_PL.pdf)

## License
Distributed under the MIT License. See [LICENSE](https://github.com/akotu235/CurriculumVitaeBuilder/blob/master/LICENSE) for more information.

[![GitHub](https://img.shields.io/github/license/akotu235/CurriculumVitaeBuilder)](https://github.com/akotu235/CurriculumVitaeBuilder/blob/master/LICENSE)

## Contact
Andrew - [Report a problem or ask your question online](https://akotu235.github.io/)

Project Link: [https://github.com/akotu235/CurriculumVitaeBuilder](https://github.com/akotu235/CurriculumVitaeBuilder)
