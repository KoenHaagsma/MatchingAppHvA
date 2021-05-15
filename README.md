# Blok Tech

## Overzicht

Dit is mijn matching app feature voor project tech, mijn feature moet uiteindelijk gedeelte gaan worden van een groter geheel dat uiteindelijk een hele matching app moet gaan worden.
Dit doen we in groepjes i.p.v. individueel.
In deze readme lees je wat er gebruikt is en hoe je dit installeert, ook zijn er verwijzingen naar mijn wiki voor wat diepere informatie.

## Table of contents

-   [Opdracht](##Opdracht)
-   [Concept](##Concept)
-   [Installatie](##Installatie)
-   [Packages/Dependecies](##Packages/dependecies)
-   [License](##License)

## Opdracht

De opdracht is om een matching app te maken en dan niet de standaard matching app waar meteen iedereen aan denk zoals Tinder. Nee je mag zelf bepalen waarop je gaat matchen en hoe je dat gaat doen. Eerst ga je zelf een feature uitwerken die in zo'n app zou kunnen zitten en daarna ga je in een groep met meerdere studenten de hele applicatie in elkaar zetten, zodat het uiteindelijk één geheel is die goed functioneerd en er verzorgt uit ziet.

## Concept

De feature die ik zelf wil gaan uitwerken is een feature waarin je mensen kan zien die overeenkomen met jouw interesses, er moet nog een bottom line bedacht worden en hoe mensen gematched worden. Hiervoor ga ik kijken naar verschillende methoden om mensen te matchen, maar ik denk dat ik het ga doen op basis van code interests & framework interests, hierdoor worden programmeurs gematched aan mensen die dezelfde interesses hebben op basis van code.

## Installatie

1. Open je terminal of de terminal in je IDE in mijn geval [VsCode](https://github.com/KoenHaagsma/MatchingAppHvA/wiki/Text-editor)

2. Clone repository <br><br>
   `git clone https://github.com/KoenHaagsma/MatchingAppHvA.git`

3. Ga naar de geclonde repository <br><br>
   `cd /MatchingAppHvA`

4. Maak een .env file aan (om data in te voeren die lokaal moet blijven, zoals database wachtwoorden.) <br><br>
   `touch .env`

5. Installeer de packages die in het project zitten. <br><br>
   `npm install`

6. Start de applicatie voor development <br><br>
   `npm run dev`

7. Open de server op je localhost via de browser en typ in je browser: localhost:1337 of als je de poort hebt veranderd vul op de plaats van 1337 je eigen poort in.

## Packages/dependecies

### dependecies

-   [body-parser](https://www.npmjs.com/package/body-parser)
-   [chalk](https://www.npmjs.com/package/chalk)
-   [connect-flash](https://www.npmjs.com/package/connect-flash)
-   [dotenv](https://www.npmjs.com/package/dotenv)
-   [express](https://www.npmjs.com/package/express)
-   [express-messages](https://www.npmjs.com/package/express-messages)
-   [express-session](https://www.npmjs.com/package/express-session)
-   [express-validator](https://www.npmjs.com/package/express-validator)
-   [mongoose](https://www.npmjs.com/package/mongoose)
-   [multer](https://www.npmjs.com/package/multer)
-   [node](https://www.npmjs.com/package/node)
-   [pug](https://www.npmjs.com/package/pug)
-   [slug](https://www.npmjs.com/package/slug)

### dev dependecies

-   [concurrently](https://www.npmjs.com/package/concurrently)
-   [node-sass](https://www.npmjs.com/package/node-sass)
-   [nodemon](https://www.npmjs.com/package/nodemon)

## License

[MIT License](https://github.com/KoenHaagsma/MatchingAppHvA/blob/main/LICENSE) wordt gebruikt tenzij anders wordt vermeld.
