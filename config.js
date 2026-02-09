// Configuration file for AR markers (supports text, images, GLTF models, videos, audio, and HTML)
const CONFIG = {
    // Array of markers to display - supports multiple object types
    markers: [
        // TEXT MARKER EXAMPLE
        {
            id: "text-marker-1",
            type: "text", // Type: text, image, gltf, video, audio, html
            text: "Welcome to the AR Tour!",
            latitude: 52.2845823,
            longitude: 5.518673,
            elevation: 15,
            geofenceRadius: 50,
            faceUser: true,
            direction: 0,
            color: "#e2001a",
            backgroundColor: "rgba(0, 94, 168, 0.8)",
            fontSize: 20,
            width: 2
        },

        // IMAGE MARKER EXAMPLE
        {
            id: "image-marker-1",
            type: "image",
            src: "https://example.com/image.png", // Image URL
            latitude: 52.2846,
            longitude: 5.5187,
            elevation: 10,
            geofenceRadius: 50,
            faceUser: true,
            width: 5,  // Width in meters
            height: 5, // Height in meters
            opacity: 1.0
        },

        // GLTF MODEL EXAMPLE
        {
            id: "model-marker-1",
            type: "gltf",
            src: "https://example.com/model.gltf", // GLTF model URL
            latitude: 52.2847,
            longitude: 5.5188,
            elevation: 0,
            geofenceRadius: 100,
            scale: { x: 1, y: 1, z: 1 }, // Scale factors
            rotation: { x: 0, y: 0, z: 0 }, // Rotation in degrees
            animation: "none" // Animation clip name (if model has animations)
        },

        // VIDEO MARKER EXAMPLE
        {
            id: "video-marker-1",
            type: "video",
            src: "https://example.com/video.mp4", // Video URL
            latitude: 52.2848,
            longitude: 5.5189,
            elevation: 12,
            geofenceRadius: 50,
            faceUser: true,
            width: 8,
            height: 4.5,
            autoplay: true,
            loop: true,
            volume: 0.5
        },

        // AUDIO MARKER EXAMPLE
        {
            id: "audio-marker-1",
            type: "audio",
            src: "https://example.com/audio.ogg", // Audio URL
            latitude: 52.2849,
            longitude: 5.519,
            elevation: 5,
            geofenceRadius: 30,
            autoplay: true,
            loop: true,
            volume: 1.0,
            spatialSound: true, // Enable 3D spatial audio
            refDistance: 1, // Distance where audio starts to fade
            maxDistance: 20, // Max distance where audio can be heard
            visualIndicator: true // Show visual indicator for audio source
        },

        // HTML PANEL EXAMPLE
        {
            id: "html-marker-1",
            type: "html",
            content: "<h1>Interactive Panel</h1><p>This is HTML content in AR!</p>", // HTML content
            latitude: 52.285,
            longitude: 5.5191,
            elevation: 10,
            geofenceRadius: 50,
            faceUser: true,
            width: 6,
            height: 4,
            backgroundColor: "rgba(0, 94, 168, 0.9)",
            padding: 0.2
        },

        // ANIMATED GLTF WITH INTERACTION
        {
            id: "animated-model-1",
            type: "gltf",
            src: "https://example.com/model.gltf",
            latitude: 52.2851,
            longitude: 5.5192,
            elevation: 5,
            geofenceRadius: 75,
            scale: { x: 2, y: 2, z: 2 },
            rotation: { x: 0, y: 45, z: 0 },
            animation: "auto", // Play first available animation
            interactive: true // Enable click/touch interaction
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
