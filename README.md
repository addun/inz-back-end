# Back-end
Druga odsłona aplikacji działającej po stronie serwera. Zmiany w porównaniu z [poprzednią wersją](https://github.com/inzadrianbury/back-end-deprecated) to:
* zmiana języka programowania na języka JavaScript uruchamianego na platformie NodeJS
* przejście z bazy relacyjnej na bazę nieralacyjną (MySQL -> MongoDB)


## Wymagania
* NodeJS 9.8.0
* MongoDB 3.7.1

## Konfiguracja
Aplikacja posiada dwa wbudowane profile konfiguracyjne: profil deweloperski oraz profil produkcyjny

### Profil deweloperski
Konfiguracja deweloperska znajduje się w pliku: `./src/configuration/development.js`

### Profil produkcyjny
Ustawienia aplikacji konfiguruje się za pomocą zmiennych środowiskowych

| Zmienna środowiskowa 	| Opis              	| Przykład  	|
|----------------------	|-------------------	|-----------	|
| AUTH_USER            	| Login użytkownika 	| admin     	|
| AUTH_PASSWORD        	| Hasło użytkownika 	| password  	|
| DB_HOST              	| Host bazy danych  	| localhost 	|
| DB_NAME              	| Nazwa bazy danych 	| moja_baza 	|


## Uruchomienie aplikacji
```bash
$ npm install

# Uruchomienie aplikacji z konfiguracją deweloperską
$ npm start-dev 

# Uruchomienie aplikacji z konfiguracją produkcyjną
$ npm start-prod 
```
