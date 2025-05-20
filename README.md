# Rent-a-Car – Kompleksowy system wypożyczalni samochodów

Repozytorium zawiera system do obsługi wypożyczalni samochodów, składający się z dwóch głównych części:

- **Backend** (`server/`) – REST API oparte o Spring Boot (Java 17, PostgreSQL)
- **Frontend** (`app/`) – aplikacja webowa napisana w React

---

## Jak uruchomić projekt?

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/Mark0z/rent-a-car
cd rent-a-car
```

### 2. Backend (Spring Boot)

1. Przejdź do katalogu `server`:
   ```bash
   cd server
   ```
2. Skonfiguruj plik `.env` oraz bazę danych PostgreSQL (szczegóły w kodzie lub na żądanie).
3. Uruchom backend:
   ```bash
   ./gradlew bootRun
   ```
   lub w systemie Windows:
   ```bash
   gradlew.bat bootRun
   ```

### 3. Frontend (React)

1. Przejdź do katalogu `app`:
   ```bash
   cd ../app
   ```
2. Skonfiguruj plik `.env` (np. klucz reCAPTCHA, adres backendu).
3. Zainstaluj zależności:
   ```bash
   npm install
   ```
4. Uruchom frontend:
   ```bash
   npm start
   ```
5. Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

---

## Funkcjonalności

### Frontend

- [x] Przeglądanie, filtrowanie i sortowanie samochodów
- [x] Szczegóły pojazdu, galeria zdjęć
- [x] Wieloetapowa rezerwacja
- [x] Rejestracja/logowanie użytkownika
- [x] Panel użytkownika (edycja danych, historia rezerwacji)
- [x] Panel administratora (zarządzanie użytkownikami, pojazdami, rezerwacjami, raporty)
- [x] Strona kontaktowa, regulamin, powiadomienia mailowe
- [x] Obsługa reCAPTCHA
- [ ] Testy Cypress
- [ ] Testy jednostkowe

### Backend

- [x] REST API do obsługi samochodów, użytkowników, rezerwacji
- [x] Autoryzacja i rejestracja użytkowników
- [x] Zarządzanie rezerwacjami (tworzenie, anulowanie, pobieranie)
- [x] Zarządzanie pojazdami (CRUD)
- [x] Zarządzanie użytkownikami (CRUD)
- [x] Raportowanie/statystyki
- [ ] Testy jednostkowe

---

## Endpointy API (Spring Boot)

### /auth

- `POST   /auth/register` – rejestracja użytkownika
- `POST   /auth/login` – logowanie
- `PUT    /auth/update/{id}` – aktualizacja danych użytkownika
- `POST   /auth/change-password/{id}/{oldPassword}/{newPassword}` – zmiana hasła

### /cars

- `GET    /cars/` – lista wszystkich samochodów
- `GET    /cars/top/{limit}` – najczęściej rezerwowane samochody
- `GET    /cars/{id}` – szczegóły samochodu
- `GET    /cars/available?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` – dostępne samochody w danym terminie
- `POST   /cars/` – dodanie samochodu
- `POST   /cars/collection/` – dodanie wielu samochodów
- `PUT    /cars/{id}` – edycja samochodu
- `DELETE /cars/{id}` – usunięcie samochodu

### /users

- `GET    /users/` – lista użytkowników
- `GET    /users/{id}` – szczegóły użytkownika
- `GET    /users/role/{id}` – rola użytkownika

### /reservations

- `GET    /reservations/` – lista rezerwacji
- `GET    /reservations/{id}` – szczegóły rezerwacji
- `GET    /reservations/user/{id}` – rezerwacje użytkownika
- `GET    /reservations/car/{id}` – rezerwacje samochodu
- `POST   /reservations/` – utworzenie rezerwacji
- `POST   /reservations/cancel/{id}` – anulowanie rezerwacji
- `POST   /reservations/collection` – utworzenie wielu rezerwacji

---

## Technologie

- **Backend:** Java 17, Spring Boot, Spring Data JPA, PostgreSQL, Gradle
- **Frontend:** React, Axios, Sass, EmailJS, Google reCAPTCHA, Cypress

---
