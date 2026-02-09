// Main application logic for AR.js location-based display with multiple object types
let userLocation = { latitude: null, longitude: null, altitude: null };
let markersLoaded = false;
let scene;
let assetManager = {}; // To track loaded assets

// Component to make elements always face the user
AFRAME.registerComponent('look-at-camera', {
    tick: function() {
        const camera = document.querySelector('[gps-projected-camera]');
        if (camera) {
            this.el.object3D.lookAt(camera.object3D.position);
        }
    }
});

// Component for interactive models
AFRAME.registerComponent('interactive-model', {
    init: function() {
        this.el.addEventListener('click', () => {
            console.log('Model clicked:', this.el.id);
            // Toggle animation or perform action
            const animationMixer = this.el.components['animation-mixer'];
            if (animationMixer) {
                animationMixer.togglePlayback();
            }
        });
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

// ===== OBJECT FACTORY FUNCTIONS =====

// Create a text marker entity
function createTextMarker(marker) {
    const entity = document.createElement('a-text');

    entity.setAttribute('value', marker.text);
    entity.setAttribute('color', marker.color || '#FFFFFF');
    entity.setAttribute('width', marker.width || 10);

    entity.setAttribute('gps-entity-place', `latitude: ${marker.latitude}; longitude: ${marker.longitude};`);
    entity.setAttribute('position', {
        x: 0,
        y: marker.elevation ?? 0,
        z: 0
    });
    entity.setAttribute('scale', `${marker.fontSize || 3} ${marker.fontSize || 3} ${marker.fontSize || 3}`);

    if (marker.faceUser) {
        entity.setAttribute('look-at', '[gps-camera]');
    } else {
        entity.setAttribute('rotation', `0 ${marker.direction || 0} 0`);
    }

    setCommonAttributes(entity, marker);
    return entity;
}

// Create an image marker entity
function createImageMarker(marker) {
    const entity = document.createElement('a-image');

    entity.setAttribute('src', marker.src);
    entity.setAttribute('width', marker.width || 5);
    entity.setAttribute('height', marker.height || marker.width || 5);
    entity.setAttribute('opacity', marker.opacity !== undefined ? marker.opacity : 1.0);

    entity.setAttribute('gps-entity-place', `latitude: ${marker.latitude}; longitude: ${marker.longitude};`);
    entity.setAttribute('position', {
        x: 0,
        y: marker.elevation ?? 0,
        z: 0
    });

    if (marker.faceUser) {
        entity.setAttribute('look-at', '[gps-camera]');
    } else if (marker.rotation) {
        entity.setAttribute('rotation', `${marker.rotation.x || 0} ${marker.rotation.y || 0} ${marker.rotation.z || 0}`);
    }

    setCommonAttributes(entity, marker);
    return entity;
}

// Create a GLTF model marker entity
function createGLTFMarker(marker) {
    const entity = document.createElement('a-entity');

    entity.setAttribute('gltf-model', marker.src);
    entity.setAttribute('gps-entity-place', `latitude: ${marker.latitude}; longitude: ${marker.longitude};`);
    entity.setAttribute('position', {
        x: 0,
        y: marker.elevation ?? 0,
        z: 0
    });

    // Set scale
    const scale = marker.scale || { x: 1, y: 1, z: 1 };
    entity.setAttribute('scale', `${scale.x} ${scale.y} ${scale.z}`);

    // Set rotation
    const rotation = marker.rotation || { x: 0, y: 0, z: 0 };
    entity.setAttribute('rotation', `${rotation.x} ${rotation.y} ${rotation.z}`);

    // Add animation if specified
    if (marker.animation && marker.animation !== 'none') {
        if (marker.animation === 'auto') {
            entity.setAttribute('animation-mixer', 'clip: *; loop: repeat');
        } else {
            entity.setAttribute('animation-mixer', `clip: ${marker.animation}; loop: repeat`);
        }
    }

    // Add interactivity
    if (marker.interactive) {
        entity.setAttribute('interactive-model', '');
        entity.setAttribute('class', 'clickable');
    }

    setCommonAttributes(entity, marker);
    return entity;
}

// Create a video marker entity
function createVideoMarker(marker) {
    // Create video asset
    const videoId = `video-${marker.id}`;
    let videoAsset = document.getElementById(videoId);
    
    if (!videoAsset) {
        videoAsset = document.createElement('video');
        videoAsset.setAttribute('id', videoId);
        videoAsset.setAttribute('src', marker.src);
        videoAsset.setAttribute('crossorigin', 'anonymous');
        
        if (marker.autoplay) videoAsset.setAttribute('autoplay', '');
        if (marker.loop) videoAsset.setAttribute('loop', '');
        videoAsset.volume = marker.volume !== undefined ? marker.volume : 0.5;
        
        const assets = document.querySelector('a-assets') || createAssetsElement();
        assets.appendChild(videoAsset);
    }

    // Create video plane
    const entity = document.createElement('a-video');
    entity.setAttribute('src', `#${videoId}`);
    entity.setAttribute('width', marker.width || 8);
    entity.setAttribute('height', marker.height || 4.5);

    entity.setAttribute('gps-entity-place', `latitude: ${marker.latitude}; longitude: ${marker.longitude};`);
    entity.setAttribute('position', {
        x: 0,
        y: marker.elevation ?? 0,
        z: 0
    });

    if (marker.faceUser) {
        entity.setAttribute('look-at', '[gps-camera]');
    }

    setCommonAttributes(entity, marker);
    return entity;
}

// Create an audio marker entity
function createAudioMarker(marker) {
    const entity = document.createElement('a-entity');

    // Set audio properties
    const soundProps = `src: ${marker.src}; autoplay: ${marker.autoplay !== false}; loop: ${marker.loop !== false}; volume: ${marker.volume !== undefined ? marker.volume : 1.0}`;
    
    if (marker.spatialSound) {
        entity.setAttribute('sound', soundProps + `; refDistance: ${marker.refDistance || 1}; maxDistance: ${marker.maxDistance || 20}; rolloffFactor: 1;`);
    } else {
        entity.setAttribute('sound', soundProps);
    }

    entity.setAttribute('gps-entity-place', `latitude: ${marker.latitude}; longitude: ${marker.longitude};`);
    entity.setAttribute('position', {
        x: 0,
        y: marker.elevation ?? 0,
        z: 0
    });

    // Add visual indicator if requested
    if (marker.visualIndicator) {
        const indicator = document.createElement('a-sphere');
        indicator.setAttribute('radius', '0.5');
        indicator.setAttribute('color', '#00AAFF');
        indicator.setAttribute('opacity', '0.6');
        indicator.setAttribute('animation', 'property: scale; to: 1.2 1.2 1.2; dir: alternate; dur: 1000; loop: true');
        entity.appendChild(indicator);

        const icon = document.createElement('a-text');
        icon.setAttribute('value', '🔊');
        icon.setAttribute('align', 'center');
        icon.setAttribute('position', '0 1 0');
        icon.setAttribute('scale', '3 3 3');
        icon.setAttribute('look-at', '[gps-camera]');
        entity.appendChild(icon);
    }

    setCommonAttributes(entity, marker);
    return entity;
}

// Create an HTML panel marker entity
function createHTMLMarker(marker) {
    // Create a-plane as background
    const entity = document.createElement('a-plane');

    entity.setAttribute('width', marker.width || 6);
    entity.setAttribute('height', marker.height || 4);
    entity.setAttribute('color', marker.backgroundColor || 'rgba(0, 0, 0, 0.8)');

    entity.setAttribute('gps-entity-place', `latitude: ${marker.latitude}; longitude: ${marker.longitude};`);
    entity.setAttribute('position', {
        x: 0,
        y: marker.elevation ?? 0,
        z: 0
    });

    // Create text content from HTML (simplified - A-Frame doesn't support full HTML rendering)
    // For full HTML, you'd need a custom component or library like aframe-htmlembed-component
    const textEntity = document.createElement('a-text');
    
    // Strip HTML tags for basic display (in production, use proper HTML-to-text library)
    const plainText = marker.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    textEntity.setAttribute('value', plainText);
    textEntity.setAttribute('align', 'center');
    textEntity.setAttribute('width', (marker.width || 6) - (marker.padding || 0.2) * 2);
    textEntity.setAttribute('color', '#FFFFFF');
    textEntity.setAttribute('position', `0 0 0.01`); // Slightly in front of plane
    
    entity.appendChild(textEntity);

    if (marker.faceUser) {
        entity.setAttribute('look-at', '[gps-camera]');
    }

    setCommonAttributes(entity, marker);
    return entity;
}

// Set common attributes for all marker types
function setCommonAttributes(entity, marker) {
    entity.setAttribute('id', marker.id);
    entity.setAttribute('data-geofence', marker.geofenceRadius || 50);
    entity.setAttribute('data-latitude', marker.latitude);
    entity.setAttribute('data-longitude', marker.longitude);
    entity.setAttribute('data-type', marker.type || 'text');
    entity.setAttribute('visible', 'true');
}

// Create assets element if it doesn't exist
function createAssetsElement() {
    let assets = document.querySelector('a-assets');
    if (!assets) {
        assets = document.createElement('a-assets');
        scene.insertBefore(assets, scene.firstChild);
    }
    return assets;
}

// Factory function to create appropriate marker based on type
function createMarker(marker) {
    const type = marker.type || 'text';
    
    switch(type.toLowerCase()) {
        case 'text':
            return createTextMarker(marker);
        case 'image':
            return createImageMarker(marker);
        case 'gltf':
        case 'model':
            return createGLTFMarker(marker);
        case 'video':
            return createVideoMarker(marker);
        case 'audio':
        case 'sound':
            return createAudioMarker(marker);
        case 'html':
        case 'panel':
            return createHTMLMarker(marker);
        default:
            console.warn(`Unknown marker type: ${type}, defaulting to text`);
            return createTextMarker(marker);
    }
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
        updateStatus(t('sceneLoaded'));

        // Get user's geolocation
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                function(position) {
                    userLocation.latitude = position.coords.latitude;
                    userLocation.longitude = position.coords.longitude;
                    userLocation.altitude = position.coords.altitude;

                    const altitudeText = userLocation.altitude !== null
                        ? ` | ${t('altitude')} ${userLocation.altitude.toFixed(1)}m`
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
                    updateStatus(t('gpsError') + ' ' + error.message);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 27000
                }
            );
        } else {
            updateStatus(t('geolocationNotSupported'));
        }
    });
}

// Load markers from configuration
function loadMarkers() {
    updateStatus(t('loadingMarkers'));

    CONFIG.markers.forEach(marker => {
        try {
            const entity = createMarker(marker);
            scene.appendChild(entity);
            console.log(`Added ${marker.type || 'text'} marker: ${marker.id} at ${marker.latitude}, ${marker.longitude}`);
        } catch (error) {
            console.error(`Failed to create marker ${marker.id}:`, error);
        }
    });

    updateMarkerCount(CONFIG.markers.length);
    updateStatus(t('ready'));
    hideLoading();

    // Set up periodic visibility updates
    setInterval(updateMarkerVisibility, CONFIG.settings.updateInterval || 1000);
}

// UI update functions
function updateStatus(status) {
    const statusEl = document.getElementById('status');
    if (statusEl) {
        statusEl.textContent = status;
        
        // Remove all status classes
        statusEl.classList.remove('status-ready', 'status-loading', 'status-error');
        
        // Apply appropriate color class based on status
        const statusLower = status.toLowerCase();
        if (statusLower.includes(t('ready').toLowerCase()) || statusLower === 'ready') {
            statusEl.classList.add('status-ready');
        } else if (statusLower.includes('error') || statusLower.includes(t('gpsError').toLowerCase()) || 
                   statusLower.includes('not supported') || statusLower.includes(t('geolocationNotSupported').toLowerCase())) {
            statusEl.classList.add('status-error');
        } else {
            statusEl.classList.add('status-loading');
        }
    }
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

function updateInfoVisibility() {
    const infoEl = document.getElementById('info');
    if (!infoEl) return;

    const debugEnabled = CONFIG && CONFIG.settings && CONFIG.settings.debug === true;
    infoEl.style.display = debugEnabled ? 'none' : '';
}

// Initialize when DOM is ready
window.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing AR...');
    initializeTranslations();
    updateInfoVisibility();
    initializeAR();
});
