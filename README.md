# AR.js Location-Based Multi-Object Display

**Languages:** [Nederlands](#nederlands) | [English](#english)

---

## Nederlands

Een web-gebaseerde augmented reality applicatie die meerdere types AR-objecten (tekst, afbeeldingen, 3D-modellen, video's, audio en HTML-panelen) weergeeft op specifieke GPS-locaties met behulp van AR.js.

### Functies

- **🎨 Meerdere Objecttypen**: Ondersteuning voor tekst, afbeeldingen, GLTF 3D-modellen, video's, ruimtelijke audio en HTML-panelen
- **📍 Locatie-gebaseerde AR**: Objecten weergeven op specifieke GPS-coördinaten
- **🔒 Geofencing**: Objecten alleen weergeven binnen opgegeven straal
- **🎯 Richtingscontrole**: Objecten kunnen naar gebruiker kijken of vaste richting aanwijzen
- **⬆️ Hoogteinstellingen**: Controleer hoogte waarop objecten verschijnen
- **📱 Real-time GPS-tracking**: Toont huidige locatie en hoogte
- **🎬 Animaties**: Ondersteuning voor GLTF-modelanimaties
- **🔊 Ruimtelijke Audio**: 3D positionele audio met afstandsverzwakking
- **👆 Interactiviteit**: Klik/aanraak interactie-ondersteuning voor 3D-modellen
- **📋 JSON-configuratie**: Eenvoudige configuratie via JavaScript-bestand
- **📱 Mobiel-vriendelijk**: Werkt op smartphones met GPS en camera

### Ondersteunde Objecttypen

1. **Tekst** - Tekst weergeven in 3D-ruimte
2. **Afbeeldingen** - 2D-afbeeldingen als billboards
3. **GLTF-modellen** - Volledige 3D-modellen met animaties
4. **Video's** - Video-inhoud op vlakken
5. **Audio** - Ruimtelijke of niet-ruimtelijke audio-markers
6. **HTML-panelen** - Tekstpanelen met basis HTML-inhoud

📖 **Zie [OBJECT_TYPES.md](OBJECT_TYPES.md) voor gedetailleerde documentatie over elk type**

### Snelstart

1. **Coördinaten bijwerken**: Bewerk [config.js](config.js) en vervang voorbeeldcoördinaten met uw gewenste locaties
2. **Objecttypen kiezen**: Voeg markers toe met verschillende types (text, image, gltf, video, audio, html)
3. **Bestanden serveren**: Gebruik een webserver met HTTPS
4. **Toegang op mobiel**: Open op smartphone met GPS en camera ingeschakeld

### Basis Configuratievoorbeelden

**Tekstmarker:**
```javascript
{
    id: "text-1",
    type: "text",
    text: "Welkom!",
    latitude: 37.7749,
    longitude: -122.4194,
    elevation: 10,
    geofenceRadius: 50,
    faceUser: true,
    color: "#FF0000",
    fontSize: 20
}
```

**Afbeeldingsmarker:**
```javascript
{
    id: "image-1",
    type: "image",
    src: "https://example.com/image.png",
    latitude: 37.7750,
    longitude: -122.4195,
    elevation: 10,
    geofenceRadius: 50,
    width: 5,
    height: 5
}
```

**GLTF-model:**
```javascript
{
    id: "model-1",
    type: "gltf",
    src: "https://example.com/model.gltf",
    latitude: 37.7751,
    longitude: -122.4196,
    elevation: 0,
    scale: { x: 1, y: 1, z: 1 },
    animation: "auto",
    interactive: true
}
```

📖 **Zie [config.js](config.js) voor complete voorbeelden van alle objecttypen**

### Bestanden

- `index.html` - Hoofd-HTML-bestand met AR.js-instellingen en bibliotheken
- `config.js` - Configuratiebestand met markerdefinities
- `app.js` - JavaScript-logica voor AR-functionaliteit
- `OBJECT_TYPES.md` - Uitgebreide handleiding voor alle objecttypen
- `README.md` - Documentatie (Engels/Nederlands)

### Globale Instellingen

```javascript
settings: {
    minDistance: 0,              // Minimale afstand om markers weer te geven (meters)
    maxDistance: 200,            // Maximale afstand om markers weer te geven (meters)
    updateInterval: 1000,        // Interval voor positie-update (milliseconden)
    debug: true                  // Debug-console-logs inschakelen
}
```

### Hoe het Werkt

1. **GPS-tracking**: Controleert continu GPS-locatie en hoogte van apparaat
2. **Afstandsberekening**: Gebruikt Haversine-formule om afstand tot markers te berekenen
3. **Geofencing**: Objecten zichtbaar alleen wanneer binnen geofence-radius
4. **AR-weergave**: Geeft zichtbare objecten weer in augmented reality via camera
5. **Object Factory**: Creëert geschikte AR-entiteit op basis van objecttype
6. **Asset Management**: Laadt dynamisch afbeeldingen, video's, modellen en audio

### Browservereisten

- HTTPS-verbinding (vereist voor geolocatie en camera)
- Moderne browser met WebGL-ondersteuning
- Camera- en locatiemachtigingen verleend
- Aanbevolen: Chrome of Safari op mobiele apparaten

### Prestatietips

- Gebruik geschikte geofence-stralen om zichtbare objecten te beperken
- Optimaliseer 3D-modellen (< 50k driehoeken)
- Comprimeer afbeeldingen (WebP-formaat, max 2048x2048)
- Gebruik lagere resolutie video's (720p of minder)
- Schakel Draco-compressie in voor GLTF-modellen

### Probleemoplossing

**Objecten verschijnen niet:**
- Controleer GPS-coördinaten in config.js correct zijn
- Zorg ervoor dat u zich binnen geofence-radius bevindt
- Verleen camera- en locatiemachtigingen
- Controleer browserconsole op foutmeldingen
- Controleer dat hoogte geschikt is (niet ondergronds)

### Gebruiksvoorbeelden

- **Toerisme**: 3D-modellen van historische gebouwen op hun oorspronkelijke locatie
- **Musea**: Video's en audio bij tentoonstellingsstukken
- **Vastgoed**: 3D-visualisaties van geplande bouwprojecten
- **Evenementen**: Interactieve informatiezuilen met video en audio
- **Onderwijs**: Campus tours met multimedia-inhoud
- **Kunst**: AR-kunstinstallaties op specifieke locaties
- **Navigatie**: Visuele wegwijzers met 3D-pijlen en video-instructies

### Licentie

Dit project is gelicentieerd onder de MIT License - zie het [LICENSE](LICENSE) bestand voor details.

---

## English

A web-based augmented reality application that displays multiple types of AR objects (text, images, 3D models, videos, audio, and HTML panels) at specific GPS locations using AR.js.

### Features

- **🎨 Multiple Object Types**: Support for text, images, GLTF 3D models, videos, spatial audio, and HTML panels
- **📍 Location-Based AR**: Display objects at specific GPS coordinates
- **🔒 Geofencing**: Show objects only within specified radius
- **🎯 Direction Control**: Objects can face user or point in fixed direction
- **⬆️ Elevation Settings**: Control height at which objects appear
- **📱 Real-time GPS Tracking**: Shows current location and altitude
- **🎬 Animations**: Support for GLTF model animations
- **🔊 Spatial Audio**: 3D positional audio with distance attenuation
- **👆 Interactivity**: Click/touch interaction support for 3D models
- **📋 JSON Configuration**: Easy configuration via JavaScript file
- **📱 Mobile-Friendly**: Works on smartphones with GPS and camera

### Supported Object Types

1. **Text** - Display text in 3D space
2. **Images** - 2D images as billboards
3. **GLTF Models** - Full 3D models with animations
4. **Videos** - Video content on planes
5. **Audio** - Spatial or non-spatial audio markers
6. **HTML Panels** - Text panels with basic HTML content

📖 **See [OBJECT_TYPES.md](OBJECT_TYPES.md) for detailed documentation on each type**

### Quick Start

1. **Update coordinates**: Edit [config.js](config.js) and replace example coordinates with your desired locations
2. **Choose object types**: Add markers with different types (text, image, gltf, video, audio, html)
3. **Serve files**: Use a web server with HTTPS
4. **Access on mobile**: Open on smartphone with GPS and camera enabled

### Basic Configuration Examples

**Text Marker:**
```javascript
{
    id: "text-1",
    type: "text",
    text: "Welcome!",
    latitude: 37.7749,
    longitude: -122.4194,
    elevation: 10,
    geofenceRadius: 50,
    faceUser: true,
    color: "#FF0000",
    fontSize: 20
}
```

**Image Marker:**
```javascript
{
    id: "image-1",
    type: "image",
    src: "https://example.com/image.png",
    latitude: 37.7750,
    longitude: -122.4195,
    elevation: 10,
    geofenceRadius: 50,
    width: 5,
    height: 5
}
```

**GLTF Model:**
```javascript
{
    id: "model-1",
    type: "gltf",
    src: "https://example.com/model.gltf",
    latitude: 37.7751,
    longitude: -122.4196,
    elevation: 0,
    scale: { x: 1, y: 1, z: 1 },
    animation: "auto",
    interactive: true
}
```

📖 **See [config.js](config.js) for complete examples of all object types**

### Files

- `index.html` - Main HTML file with AR.js setup and libraries
- `config.js` - Configuration file with marker definitions
- `app.js` - JavaScript logic for AR functionality
- `OBJECT_TYPES.md` - Comprehensive guide to all object types
- `README.md` - Documentation (English/Dutch)

### Global Settings

```javascript
settings: {
    minDistance: 0,              // Minimum distance to show markers (meters)
    maxDistance: 200,            // Maximum distance to show markers (meters)
    updateInterval: 1000,        // Position update interval (milliseconds)
    debug: true                  // Enable debug console logs
}
```

### How It Works

1. **GPS Tracking**: Continuously monitors device GPS location and altitude
2. **Distance Calculation**: Uses Haversine formula to calculate distance to markers
3. **Geofencing**: Objects visible only when within geofence radius
4. **AR Display**: Renders visible objects in augmented reality via camera
5. **Object Factory**: Creates appropriate AR entity based on object type
6. **Asset Management**: Dynamically loads images, videos, models, and audio

### Browser Requirements

- HTTPS connection (required for geolocation and camera)
- Modern browser with WebGL support
- Camera and location permissions granted
- Recommended: Chrome or Safari on mobile devices

### Performance Tips

- Use appropriate geofence radii to limit visible objects
- Optimize 3D models (< 50k triangles)
- Compress images (WebP format, max 2048x2048)
- Use lower resolution videos (720p or less)
- Enable Draco compression for GLTF models

### Troubleshooting

**Objects not appearing:**
- Check GPS coordinates in config.js are correct
- Ensure you're within the geofence radius
- Grant camera and location permissions
- Check browser console for errors
- Verify elevation is appropriate (not underground)
