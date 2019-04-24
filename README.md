Meetup Web Components erstellen mit Angular
===========================================

Beispiel Web Component für das Meetup vom 25.04.2019 bei PROFFIX Software AG in Wangs.

Inbetriebnahme
--------------
Die Software wurde mit der [Angular CLI](https://cli.angular.io) und [VisualStudio Code](https://code.visualstudio.com) erstellt.
1. Installation [NodeJS](https://nodejs.org)
2. Installation Angular CLI: `npm install @angular/cli -g`
3. Dieses Repository clonen oder herunterladen
4. [VisualStudio Code](https://code.visualstudio.com) installieren
5. Empfohlene Erweiterungen in VisualStudio nach dem das Repository geöffnet wurde
6. Abhängigkeiten installieren: `npm install` (im Projekt-Verzeichnis)

Debugging
---------
1. Entwicklungsserver starten: `ng serve --aot` (im Projekt-Verzeichnis)
2. Software aufrufen: http://localhost:4200 (oder `F5` in VisualStudio Code)


Vorgehen WebComponent erstellen
===============================

Projekt  erstellen
------------------
1. Angular Projekt erstellen
2. `ng add @angular/elements`
3. Wenn Classic Browser Support (ES5): `npm i document-register-element@1.8.1`

Neue Component erstellen
------------------------
1. Normale Component mit @Input und @Output
2. Styles alle im Component-(S)CSS, damit diese ins JS compiled werden

WebComponent registrieren
-------------------------
1. AppComponent entfernen (inkl. Referenzen in AppModule, auch Bootstrap wird manuell ausgeführt)
2. Im AppModule zu entryComponents hinzufügen
3. Registrierung in AppModule des CustomElements
4. Bootstrapping manuell auslösen

WebComponent testen
-------------------
1. WebComponent direkt in "index.html" einbinden

Buildvorgang
------------
1. Output Hashing in "angular.json" deaktivieren
2. concat als Dev Dep installieren: `npm i concat --save-dev`
3. Build-Task in package.json anpassen: `ng build --prod && concat ./dist/WeatherWebComponent/{runtime,es2015-polyfills,polyfills,scripts,main}.js -o ./dist/weathercomponent.js`
