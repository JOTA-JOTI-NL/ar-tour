# AR Multi-Object Types Guide

This AR application supports multiple object types beyond just text. Here's a comprehensive guide to each type and its configuration options.

## Supported Object Types

### 1. 📝 Text Markers
Display text in 3D space at specific GPS locations.

```javascript
{
    id: "text-marker-1",
    type: "text",
    text: "Your text here",
    latitude: 52.2845823,
    longitude: 5.518673,
    elevation: 15,           // Height above ground (meters)
    geofenceRadius: 50,      // Visibility radius (meters)
    faceUser: true,          // Always face camera
    direction: 0,            // Rotation if not facing user (degrees)
    color: "#e2001a",      // Text color
    fontSize: 20,            // Font size multiplier
    width: 2                 // Text width
}
```

### 2. 🖼️ Image Markers
Display 2D images as billboards in AR space.

```javascript
{
    id: "image-marker-1",
    type: "image",
    src: "https://example.com/image.png",   // Image URL or path
    latitude: 52.2846,
    longitude: 5.5187,
    elevation: 10,
    geofenceRadius: 50,
    faceUser: true,                         // Billboard mode (always face camera)
    width: 5,                               // Width in meters
    height: 5,                              // Height in meters
    opacity: 1.0,                           // Transparency (0-1)
    rotation: { x: 0, y: 0, z: 0 }          // If not facing user
}
```

**Supported formats:** PNG, JPG, GIF, WebP

### 3. 🎨 GLTF 3D Models
Display and animate 3D models in AR.

```javascript
{
    id: "model-marker-1",
    type: "gltf",
    src: "https://example.com/model.gltf",  // GLTF or GLB file
    latitude: 52.2847,
    longitude: 5.5188,
    elevation: 0,
    geofenceRadius: 100,
    scale: { x: 1, y: 1, z: 1 },           // Scale factors
    rotation: { x: 0, y: 45, z: 0 },       // Rotation in degrees
    animation: "auto",                      // "auto", "none", or clip name
    interactive: true                       // Enable click interaction
}
```

**Features:**
- Full GLTF 2.0 support including PBR materials
- Automatic or manual animation playback
- Click/touch interaction support
- Supports GLB (binary GLTF) format

**Animation options:**
- `"none"` - No animation
- `"auto"` - Play first available animation
- `"clipName"` - Play specific animation clip by name

### 4. 🎬 Video Markers
Display video content on planes in AR.

```javascript
{
    id: "video-marker-1",
    type: "video",
    src: "https://example.com/video.mp4",   // Video URL
    latitude: 52.2848,
    longitude: 5.5189,
    elevation: 12,
    geofenceRadius: 50,
    faceUser: true,                         // Billboard mode
    width: 8,                               // Width in meters
    height: 4.5,                            // Height in meters
    autoplay: true,                         // Auto-start playback
    loop: true,                             // Loop video
    volume: 0.5                             // Volume (0-1)
}
```

**Supported formats:** MP4 (H.264), WebM, Ogg
**Note:** Some formats may not work on all devices due to codec support.

### 5. 🔊 Audio Markers
Place spatial or non-spatial audio at locations.

```javascript
{
    id: "audio-marker-1",
    type: "audio",
    src: "https://example.com/sound.ogg",   // Audio URL
    latitude: 52.2849,
    longitude: 5.519,
    elevation: 5,
    geofenceRadius: 30,
    autoplay: true,
    loop: true,
    volume: 1.0,                            // Volume (0-1)
    spatialSound: true,                     // Enable 3D spatial audio
    refDistance: 1,                         // Distance where audio starts to fade
    maxDistance: 20,                        // Max distance where audio can be heard
    visualIndicator: true                   // Show sphere + icon indicator
}
```

**Features:**
- 3D spatial audio with distance-based attenuation
- Visual indicators to show audio source location
- Support for both spatial and non-spatial audio

**Supported formats:** OGG, MP3, WAV

### 6. 📋 HTML Panel Markers
Display text panels with basic HTML content.

```javascript
{
    id: "html-marker-1",
    type: "html",
    content: "<h1>Title</h1><p>Description</p>",  // HTML content
    latitude: 52.285,
    longitude: 5.5191,
    elevation: 10,
    geofenceRadius: 50,
    faceUser: true,
    width: 6,                // Panel width in meters
    height: 4,               // Panel height in meters
    backgroundColor: "rgba(0, 0, 0, 0.8)",  // Background color
    padding: 0.2             // Padding in meters
}
```

**Note:** HTML is simplified to plain text for A-Frame compatibility. For full HTML rendering, consider using a library like `aframe-htmlembed-component`.

## Common Properties

All object types share these properties:

- `id` (string, required): Unique identifier
- `type` (string, required): Object type (text, image, gltf, video, audio, html)
- `latitude` (number, required): GPS latitude
- `longitude` (number, required): GPS longitude
- `elevation` (number, default: 0): Height above ground in meters
- `geofenceRadius` (number, default: 50): Visibility radius in meters

## Best Practices

### Performance
- **Limit visible markers:** Use appropriate geofence radii
- **Optimize assets:** Compress images, videos, and 3D models
- **GLTF models:** Use Draco compression for smaller file sizes
- **Videos:** Use lower resolutions for mobile (720p or less)

### User Experience
- **Elevation:** Place objects at eye level (1.5-2m) for best visibility
- **Scale:** Start with smaller scales and adjust based on distance
- **Geofencing:** Use smaller radii for detailed areas, larger for landmarks
- **Face user:** Enable `faceUser` for text and info displays

### Asset Guidelines

**Images:**
- Max resolution: 2048x2048 for mobile compatibility
- Use WebP for better compression
- Power-of-two dimensions for better performance

**3D Models:**
- Keep triangle count under 50k for mobile
- Use texture atlases to reduce draw calls
- Apply Draco compression
- Test on target devices

**Videos:**
- Max 720p for mobile devices
- Keep videos short (< 1 min) or use streaming
- Consider bandwidth limitations
- Provide fallback images

**Audio:**
- Use OGG format for best compatibility
- Keep files under 5MB
- Consider stereo vs mono based on needs

## Advanced Features

### Interactive Models
Enable click/touch interaction on GLTF models:
```javascript
{
    type: "gltf",
    interactive: true,
    // ... other properties
}
```

### Spatial Audio
Create immersive soundscapes with 3D audio:
```javascript
{
    type: "audio",
    spatialSound: true,
    refDistance: 2,      // Full volume within 2m
    maxDistance: 50,     // Inaudible beyond 50m
}
```

### Animation Control
Control GLTF animations:
```javascript
{
    type: "gltf",
    animation: "Walk",   // Specific clip name
    // or
    animation: "auto",   // Play first animation
}
```

## Future Enhancements

Potential additions to consider:
- **Particle systems** - For effects like smoke, fire, rain
- **Lines/paths** - Draw lines between GPS coordinates
- **Heatmaps** - Visualize data density
- **Point clouds** - Display LiDAR or photogrammetry data
- **Custom shaders** - Advanced visual effects
- **Web workers** - Offload processing for better performance

## Examples

See [config.js](config.js) for complete working examples of all object types.

## Troubleshooting

**Objects not appearing:**
- Check GPS permissions
- Verify geofence radius covers your location
- Check browser console for errors
- Ensure elevation is appropriate (not underground)

**Performance issues:**
- Reduce number of visible markers
- Lower video/image resolution
- Simplify 3D models
- Disable debug mode in CONFIG.settings

**CORS errors:**
- Host assets on same domain or CORS-enabled server
- Use CDN with proper CORS headers
- For local testing, run a local server

## Resources

- [A-Frame Documentation](https://aframe.io/docs/)
- [AR.js Documentation](https://ar-js-org.github.io/AR.js-Docs/)
- [GLTF Viewer](https://gltf-viewer.donmccurdy.com/)
- [GLTF Compression](https://github.khronos.org/glTF-Project-Explorer/)
