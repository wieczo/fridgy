# fridgy

![image](https://user-images.githubusercontent.com/2473614/51619035-b610f780-1f2f-11e9-8a0c-d6e1f6e108e7.png)

## Varianten

### Cloud
1. POS Konsole       (Fridge-Bouncer)
2. Backend-Server  (Fridge-Manager)

Beide kommunizieren via REST. Die POS Konsole erhält beim Start bzw. alle x Minuten die folgenden Daten vom Backend: Produktliste und Nutzerliste. Wird ein Kauf abgeschlossen, so sendet die POS Konsole eine ORDER an den Backend Server mit Nutzer-Kennung + Warenkorb. Dadurch dass die Konsole nur vom Server via PULL Daten zieht kann die Konsole einfach auch in internen Netzwerken platziert werden, während das Backend in der Cloud läuft.

# POS Hardware
__Raspberry mit Display und NFC Reader__
_Alternative_: einfaches Android Tablet mit einem NFC Reader an Board

# POS UX
Ablauf der GUI wäre:
- Bildschirm zeig Info an, dass man sich anmelden soll "Lock-Screen"
- Nutzer hält NFC Chip an Gerät -> Bildschirm zeigt angemeldeten Nutzer inkl. Kontostand + Produktauswahl
- Nutzer klickt Produkte an :arrow_right: Diese landen im Warenkorb
- Nutzer klickt auf Checkout :arrow_right: Order wird an Server gesendet und Feedback an Nutzer ob erfolgreich gebucht. 
  - **Wenn ja** :arrow_right: 
  - **Else**: Rücksprung nach x Sekunden auf "Lock-Screen"
  - Alternativ: Abbruch -> Sprung auf Lock-Screen

## Inspiration / Code Beispiel

https://developer.okta.com/blog/2018/02/15/build-crud-app-vuejs-node

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
