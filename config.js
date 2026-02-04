// Configuration file for AR text markers
const CONFIG = {
    // Array of text markers to display
    markers: [
        {
            id: "marker1",
            text: "Welcome to the AR Tour!",
            latitude: 52.2845823,
            longitude: 5.518673,
            elevation: 15,
            geofenceRadius: 50,
            faceUser: true,
            direction: 0,
            color: "#FF0000",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            fontSize: 20,
            width: 2
        },
        {
            id: "marker2",
            text: "This is a secondary marker!",
            latitude: 52.2845823,
            longitude: 5.518673,
            elevation: 15,
            geofenceRadius: 50,
            faceUser: true,
            direction: 0,
            color: "#FF0000",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            fontSize: 20,
            width: 2
        },

    ],
    // Global settings
    settings: {
        // Minimum distance in meters to show a marker
        minDistance: 0,
        // Maximum distance in meters to show a marker (increase for testing)
        maxDistance: 200,
        // Update interval for position checks (milliseconds)
        updateInterval: 1000,
        // Enable debug mode
        debug: true
    }
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
