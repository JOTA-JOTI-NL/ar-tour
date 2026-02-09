// Internationalization (i18n) for AR Application
// Scouting Nederland AR Tour - Multi-language support

const translations = {
    en: {
        // Loading and initialization
        loadingAR: "Loading AR experience...",
        initializing: "Initializing...",
        sceneLoaded: "Scene loaded",
        gettingGPS: "Getting GPS...",
        loadingMarkers: "Loading markers...",
        ready: "Ready",
        
        // Info panel labels
        status: "Status:",
        location: "Location:",
        markersLoaded: "Markers loaded:",
        visibleMarkers: "Visible markers:",
        
        // Errors
        gpsError: "GPS error:",
        geolocationNotSupported: "Geolocation not supported",
        
        // Alt text
        altitude: "Alt:"
    },
    nl: {
        // Laden en initialisatie
        loadingAR: "AR-ervaring laden...",
        initializing: "Initialiseren...",
        sceneLoaded: "Scène geladen",
        gettingGPS: "GPS ophalen...",
        loadingMarkers: "Markers laden...",
        ready: "Klaar",
        
        // Info paneel labels
        status: "Status:",
        location: "Locatie:",
        markersLoaded: "Markers geladen:",
        visibleMarkers: "Zichtbare markers:",
        
        // Fouten
        gpsError: "GPS fout:",
        geolocationNotSupported: "Geolocatie niet ondersteund",
        
        // Alt tekst
        altitude: "Hoogte:"
    },
    de: {
        // Laden und Initialisierung
        loadingAR: "AR-Erlebnis wird geladen...",
        initializing: "Initialisierung...",
        sceneLoaded: "Szene geladen",
        gettingGPS: "GPS wird abgerufen...",
        loadingMarkers: "Markierungen werden geladen...",
        ready: "Bereit",
        
        // Info-Panel-Labels
        status: "Status:",
        location: "Standort:",
        markersLoaded: "Markierungen geladen:",
        visibleMarkers: "Sichtbare Markierungen:",
        
        // Fehler
        gpsError: "GPS-Fehler:",
        geolocationNotSupported: "Geolokalisierung nicht unterstützt",
        
        // Alt-Text
        altitude: "Höhe:"
    },
    fr: {
        // Chargement et initialisation
        loadingAR: "Chargement de l'expérience AR...",
        initializing: "Initialisation...",
        sceneLoaded: "Scène chargée",
        gettingGPS: "Obtention du GPS...",
        loadingMarkers: "Chargement des marqueurs...",
        ready: "Prêt",
        
        // Étiquettes du panneau d'informations
        status: "Statut :",
        location: "Emplacement :",
        markersLoaded: "Marqueurs chargés :",
        visibleMarkers: "Marqueurs visibles :",
        
        // Erreurs
        gpsError: "Erreur GPS :",
        geolocationNotSupported: "Géolocalisation non prise en charge",
        
        // Texte alt
        altitude: "Alt :"
    },
    it: {
        // Caricamento e inizializzazione
        loadingAR: "Caricamento esperienza AR...",
        initializing: "Inizializzazione...",
        sceneLoaded: "Scena caricata",
        gettingGPS: "Recupero GPS...",
        loadingMarkers: "Caricamento marcatori...",
        ready: "Pronto",
        
        // Etichette pannello informazioni
        status: "Stato:",
        location: "Posizione:",
        markersLoaded: "Marcatori caricati:",
        visibleMarkers: "Marcatori visibili:",
        
        // Errori
        gpsError: "Errore GPS:",
        geolocationNotSupported: "Geolocalizzazione non supportata",
        
        // Testo alt
        altitude: "Alt:"
    }
};

// Detect browser language and get appropriate translations
function getUserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0]; // Get primary language code (e.g., 'en' from 'en-US')
    
    // Return translations for detected language, or default to English
    return translations[langCode] || translations.en;
}

// Get translation function
function t(key) {
    const lang = getUserLanguage();
    return lang[key] || translations.en[key] || key;
}

// Initialize translations when DOM is ready
function initializeTranslations() {
    // Update static HTML text
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
        loadingEl.childNodes[0].textContent = t('loadingAR');
    }
    
    // Update info panel labels
    const infoDiv = document.getElementById('info');
    if (infoDiv) {
        const divs = infoDiv.querySelectorAll('div');
        if (divs[0]) divs[0].childNodes[0].textContent = t('status') + ' ';
        if (divs[1]) divs[1].childNodes[0].textContent = t('location') + ' ';
        if (divs[2]) divs[2].childNodes[0].textContent = t('markersLoaded') + ' ';
        if (divs[3]) divs[3].childNodes[0].textContent = t('visibleMarkers') + ' ';
    }
    
    // Update status to initializing
    updateStatus(t('initializing'));
    updateLocation(t('gettingGPS'));
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { t, initializeTranslations };
}
