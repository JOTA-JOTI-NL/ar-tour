# AR.js Location-Based Text Display

**Languages:** [Nederlands](#nederlands) | [English](#english)

---

## Nederlands

Een web-gebaseerde augmented reality applicatie die tekstmarkeringen weergeeft op basis van geolocatie met behulp van AR.js.

### Functies

- **Locatie-gebaseerde AR**: Tekst weergeven op specifieke GPS-coördinaten
- **Geofencing**: Markers alleen weergeven binnen een bepaalde straal
- **Richtingscontrole**: Tekst kan naar de gebruiker kijken of een vaste richting aanwijzen
- **Hoogteinstellingen**: Controleer de hoogte waarop tekst verschijnt
- **Real-time GPS-tracking**: Toont huidige locatie en hoogte
- **Debug-modus**: Testknop om alle markers voor te vertonen
- **JSON-configuratie**: Eenvoudige configuratie via een JavaScript-configuratiebestand
- **Mobiel-vriendelijk**: Werkt op smartphones met GPS en camera

### Bestanden

- `index.html` - Hoofd-HTML-bestand met AR.js-instellingen
- `config.js` - Configuratiebestand met markerdefinities
- `app.js` - JavaScript-logica voor AR-functionaliteit
- `README.md` - Documentatie (Engels/Nederlands)

### Configuratie

Bewerk [config.js](config.js) om uw markers aan te passen:

```javascript
{
    id: "marker1",                    // Unieke identificatie
    text: "Welkom!",                  // Tekst om weer te geven (ondersteunt \n voor regeleinden)
    latitude: 37.7749,                // GPS-breedtegraad
    longitude: -122.4194,             // GPS-lengtegraad
    elevation: 10,                    // Hoogte in meters
    geofenceRadius: 50,               // Zichtbaarheidsstraal in meters
    faceUser: true,                   // true: altijd naar gebruiker, false: vaste richting
    direction: 0,                     // Rotatie in graden (gebruikt wanneer faceUser false is)
    color: "#FFFFFF",               // Tekstkleur, HEX-waarde
    fontSize: 5,                      // Lettertype grootte
    width: 20                         // Tekstbreedte in meters
}
```

### Globale instellingen

```javascript
settings: {
    minDistance: 0,              // Minimale afstand om markers weer te geven (meters)
    maxDistance: 5000,           // Maximale afstand om markers weer te geven (meters)
    updateInterval: 1000,        // Interval voor positie-update (milliseconden)
    debug: true                  // Debug-console-logs inschakelen
}
```

### Gebruik

1. **Coördinaten bijwerken**: Bewerk [config.js](config.js) en vervang voorbeeldcoördinaten met uw gewenste locaties
2. **Tekst aanpassen**: Wijzig tekstinhoud en opmaak voor elke marker
3. **Bestanden serveren**: Gebruik een webserver met HTTPS
4. **Toegang op mobiel**: Open op smartphone met GPS en camera ingeschakeld

### Hoe het werkt

1. **GPS-tracking**: Controleert continu de GPS-locatie en hoogte van het apparaat
2. **Afstandsberekening**: Gebruikt Haversine-formule om afstand tot markers te berekenen
3. **Geofencing**: Markers zichtbaar alleen wanneer binnen geofence-radius
4. **AR-weergave**: Geeft zichtbare markers weer in augmented reality via camera
5. **Oriëntatie**: Markers kijken naar u (billboard) of wijzen vaste richting aan

### Browservereisten

- HTTPS-verbinding (vereist voor geolocatie en camera)
- Moderne browser met WebGL-ondersteuning
- Camera- en locatiemachtigingen verleend
- Aanbevolen: Chrome of Safari op mobiele apparaten

### Probleemoplossing

**Markers verschijnen niet**
- Controleer GPS-coördinaten in config.js correct zijn
- Zorg ervoor dat u zich binnen de geofence-radius bevindt
- Verleen camera- en locatiemachtigingen
- Controleer browserconsole op foutmeldingen

**GPS-nauwkeurigheidsuitgaven**
- Schakel high-accuracy-modus in apparaatinstellingen in
- Gebruik apparaat buiten met duidelijk zicht op de hemel
- Wacht 30-60 seconden tot GPS stabiel is
- Controleer hoogtescherm in infopaneel

**Camera werkt niet**
- Zorg ervoor dat HTTPS is ingeschakeld
- Verleen cameramachtigingen wanneer hierom wordt gevraagd
- Controleer dat geen andere app camera gebruikt
- Probeer pagina opnieuw te laden

### Gebruiksvoorbeelden

- Toeristinformatie: Feiten weergeven bij bezienswaardigheden
- Campustours: Bouwgegevens weergeven
- Schatzoeken: Locatiegebaseerde spellen
- Onroerend goed: Ter plaatse vastgoedinformatie
- Musea: Contextafhankelijke tentoonstellingsinformatie
- Navigatie: Routepuntrichtingen
- Evenementen: Bezoekerinformatiestations

### Tips voor aanpassing

- Gebruik `\n` voor meerdere tekstweergaven
- Pas `fontSize` (1-10) aan voor leesbaarheid op verschillende afstanden
- Gebruik contrasterende kleuren voor zichtbaarheid
- Stel geofence-straal in op basis van GPS-nauwkeurigheidsbehoeften
- Lagere `elevation` voor grondniveau, verhogen voor overhead tekst
- Schakel `debug: true` in tijdens testen om afstandslogs te zien

---

## Licentie

Dit project is gelicentieerd onder de MIT License - zie het [LICENSE](LICENSE) bestand voor details.

---

## English

A web-based augmented reality application that displays text markers based on geolocation using AR.js.

### Features

- **Location-based AR**: Display text at specific GPS coordinates
- **Geofencing**: Show markers only within a defined radius
- **Direction control**: Text can face the user or point in a specific direction
- **Elevation settings**: Control the height at which text appears
- **Real-time GPS tracking**: Shows current location and altitude
- **Debug mode**: Test button to preview all markers
- **JSON configuration**: Easy configuration through a simple JavaScript config file
- **Mobile-friendly**: Works on smartphones with GPS and camera

### Files

- `index.html` - Main HTML file with AR.js setup
- `config.js` - Configuration file with marker definitions
- `app.js` - JavaScript logic for AR functionality
- `README.md` - Documentation (English/Dutch)

### Configuration

Edit [config.js](config.js) to customize your markers:

```javascript
{
    id: "marker1",                    // Unique identifier
    text: "Welcome!",                 // Text to display (supports \n for newlines)
    latitude: 37.7749,                // GPS latitude
    longitude: -122.4194,             // GPS longitude
    elevation: 10,                    // Height in meters
    geofenceRadius: 50,               // Visibility radius in meters
    faceUser: true,                   // true: always face user, false: fixed direction
    direction: 0,                     // Rotation in degrees (used when faceUser is false)
    color: "#FFFFFF",               // Text color, HEX value
    fontSize: 5,                      // Font size
    width: 20                         // Text width in meters
}
```

### Global Settings

```javascript
settings: {
    minDistance: 0,              // Minimum distance to show markers (meters)
    maxDistance: 5000,           // Maximum distance to show markers (meters)
    updateInterval: 1000,        // Position update interval (milliseconds)
    debug: true                  // Enable debug console logs
}
```

### Usage

1. **Update coordinates**: Edit [config.js](config.js) and replace sample coordinates with your desired locations
2. **Customize text**: Modify text content and styling for each marker
3. **Serve the files**: Use a web server with HTTPS
4. **Access on mobile**: Open on smartphone with GPS and camera enabled

### How It Works

1. **GPS Tracking**: Continuously monitors device GPS location and altitude
2. **Distance Calculation**: Uses Haversine formula to calculate distance to markers
3. **Geofencing**: Markers visible only when within geofence radius
4. **AR Display**: Renders visible markers in augmented reality through camera
5. **Orientation**: Markers either face you (billboard) or point in fixed direction

### Browser Requirements

- HTTPS connection (required for geolocation and camera)
- Modern browser with WebGL support
- Camera and GPS permissions granted
- Recommended: Chrome or Safari on mobile devices

### Troubleshooting

**Markers not appearing**
- Verify GPS coordinates in config.js are correct
- Ensure you're within the geofence radius
- Grant camera and location permissions
- Check browser console for error messages

**GPS accuracy issues**
- Enable high-accuracy mode in device settings
- Use device outdoors with clear sky view
- Wait 30-60 seconds for GPS to stabilize
- Check altitude display in info panel

**Camera not working**
- Ensure HTTPS is enabled
- Grant camera permissions when prompted
- Check no other app is using camera
- Try reloading the page

### Customization Tips

- Use `\n` for multi-line text displays
- Adjust `fontSize` (1-10) for readability at different distances
- Use contrasting colors for visibility
- Set geofence radius based on GPS accuracy needs
- Lower `elevation` for ground-level, increase for overhead text
- Enable `debug: true` during testing to see distance logs

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
