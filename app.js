// Main application logic for AR.js location-based text display
let userLocation = { latitude: null, longitude: null, altitude: null };
let markersLoaded = false;
let scene;

// Component to make text always face the user
AFRAME.registerComponent('look-at-camera', {
    tick: function() {
        const camera = document.querySelector('[gps-projected-camera]');
        if (camera) {
            this.el.object3D.lookAt(camera.object3D.position);
        }
    }
});

// Calculate distance between two coordinates using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
}

// Create a text marker entity
function createTextMarker(marker) {
    const entity = document.createElement('a-text');

    // Set text properties
    entity.setAttribute('value', marker.text);
    //entity.setAttribute('align', 'center');
    entity.setAttribute('color', marker.color || '#FFFFFF');
    entity.setAttribute('width', marker.width || 10);
    //entity.setAttribute('wrap-count', 40);

    // Set GPS position - AR.js will handle the positioning
    entity.setAttribute('gps-entity-place', 'latitude: ' + marker.latitude + '; longitude: ' + marker.longitude + ';');

    // Position (y is elevation)
    entity.object3D.position.set(0, marker.elevation || 0, 0);

    // Set scale for better visibility
    entity.setAttribute('scale', `${marker.fontSize || 3} ${marker.fontSize || 3} ${marker.fontSize || 3}`);

    // Handle rotation/direction
    if (marker.faceUser) {
        entity.setAttribute('look-at', '[gps-camera]');
    } else {
        entity.setAttribute('rotation', `0 ${marker.direction || 0} 0`);
    }

    entity.setAttribute('id', marker.id);
    entity.setAttribute('data-geofence', marker.geofenceRadius || 50);
    entity.setAttribute('data-latitude', marker.latitude);
    entity.setAttribute('data-longitude', marker.longitude);
    entity.setAttribute('visible', 'true');

    return entity;
}

// Check if marker is within geofence
function isWithinGeofence(marker) {
    if (!userLocation.latitude || !userLocation.longitude) {
        return false;
    }

    const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        marker.latitude,
        marker.longitude
    );

    const geofence = marker.geofenceRadius || 50;
    return distance <= geofence;
}

// Update marker visibility based on user location
function updateMarkerVisibility() {
    if (!userLocation.latitude || !userLocation.longitude) {
        return;
    }

    let visibleCount = 0;

    CONFIG.markers.forEach(markerConfig => {
        const entity = document.getElementById(markerConfig.id);
        if (entity) {
            const distance = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                markerConfig.latitude,
                markerConfig.longitude
            );

            const withinGeofence = distance <= markerConfig.geofenceRadius;
            const withinRange = distance >= CONFIG.settings.minDistance &&
                distance <= CONFIG.settings.maxDistance;

            const shouldBeVisible = withinGeofence && withinRange;
            entity.setAttribute('visible', shouldBeVisible);

            if (shouldBeVisible) visibleCount++;

            if (CONFIG.settings.debug) {
                console.log(`Marker ${markerConfig.id}: distance=${distance.toFixed(2)}m, geofence=${markerConfig.geofenceRadius}m, visible=${shouldBeVisible}`);
            }
        }
    });

    updateVisibleCount(visibleCount);
}

// Initialize AR scene
function initializeAR() {
    scene = document.querySelector('a-scene');

    if (!scene) {
        console.error('Scene not found');
        return;
    }

    // Wait for AR.js to be ready
    scene.addEventListener('loaded', function() {
        console.log('AR.js scene loaded');
        updateStatus('Scene loaded');

        // Get user's geolocation
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                function(position) {
                    userLocation.latitude = position.coords.latitude;
                    userLocation.longitude = position.coords.longitude;
                    userLocation.altitude = position.coords.altitude;

                    const altitudeText = userLocation.altitude !== null
                        ? ` | Alt: ${userLocation.altitude.toFixed(1)}m`
                        : '';
                    updateLocation(`${userLocation.latitude.toFixed(6)}, ${userLocation.longitude.toFixed(6)}${altitudeText}`);

                    if (!markersLoaded) {
                        loadMarkers();
                        markersLoaded = true;
                    }

                    updateMarkerVisibility();
                },
                function(error) {
                    console.error('Geolocation error:', error);
                    updateStatus('GPS error: ' + error.message);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 27000
                }
            );
        } else {
            updateStatus('Geolocation not supported');
        }
    });
}

// Load markers from configuration
function loadMarkers() {
    updateStatus('Loading markers...');

    CONFIG.markers.forEach(marker => {
        const entity = createTextMarker(marker);
        scene.appendChild(entity);
        console.log(`Added marker: ${marker.id} at ${marker.latitude}, ${marker.longitude}`);
    });

    updateMarkerCount(CONFIG.markers.length);
    updateStatus('Ready');
    hideLoading();

    // Set up periodic visibility updates
    setInterval(updateMarkerVisibility, CONFIG.settings.updateInterval || 1000);
}

// UI update functions
function updateStatus(status) {
    const statusEl = document.getElementById('status');
    if (statusEl) statusEl.textContent = status;
}

function updateLocation(location) {
    const locationEl = document.getElementById('location');
    if (locationEl) locationEl.textContent = location;
}

function updateMarkerCount(count) {
    const countEl = document.getElementById('markerCount');
    if (countEl) countEl.textContent = count;
}

function updateVisibleCount(count) {
    const countEl = document.getElementById('visibleCount');
    if (countEl) countEl.textContent = count;
}

function hideLoading() {
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
        setTimeout(() => {
            loadingEl.style.display = 'none';
        }, 1000);
    }
}

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing AR...');
    initializeAR();
});
