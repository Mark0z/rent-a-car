# RentDrive – aplikacja do wypożyczania samochodów

RentDrive to nowoczesna aplikacja webowa umożliwiająca rezerwację i zarządzanie wynajmem samochodów. Projekt powstał w oparciu o React i pozwala zarówno klientom, jak i administratorom na wygodne korzystanie z funkcjonalności wypożyczalni.

## Jak uruchomić projekt?

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/Mark0z/rent-a-car
   ```
2. Przejdź do katalogu projektu:
   ```bash
   cd app
   ```
3. Zainstaluj zależności:
   ```bash
   npm install
   ```
4. Utwórz plik `.env` i skonfiguruj wymagane zmienne środowiskowe (np. klucz reCAPTCHA).
5. Uruchom aplikację:
   ```bash
   npm start
   ```
6. Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## Funkcjonalności

- [x] Przeglądanie dostępnych samochodów
- [x] Filtrowanie i sortowanie pojazdów (typ paliwa, skrzynia biegów, cena)
- [x] Szczegóły pojazdu (opis, zdjęcia, dostępność)
- [x] Wieloetapowy proces rezerwacji (wybór dat, pojazdu, autoryzacja, podsumowanie)
- [x] Rejestracja i logowanie użytkownika
- [x] Panel użytkownika (edycja danych, zmiana hasła, historia rezerwacji)
- [x] Panel administratora:
  - [x] Zarządzanie użytkownikami
  - [x] Zarządzanie pojazdami
  - [x] Zarządzanie rezerwacjami
  - [x] Raporty i statystyki
- [x] Strona kontaktowa z formularzem i mapą
- [x] Strona z regulaminem najmu
- [x] Powiadomienia mailowe o rezerwacji
- [x] Obsługa reCAPTCHA przy rezerwacji
- [ ] Testy Cypress
- [ ] Testy jednostkowe

## Technologie

- Axios 
- Cypress
- EmailJS
- Google reCAPTCHA
- React
- Sass

