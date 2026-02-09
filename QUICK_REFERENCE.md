# Quick Reference - AR Object Types
## Object Type Cheat Sheet

### Text
```javascript
{ type: "text", text: "Hello", color: "#FFF", fontSize: 20 }
```

### Image
```javascript
{ type: "image", src: "url.png", width: 5, height: 5, opacity: 1.0 }
```

### GLTF Model
```javascript
{ type: "gltf", src: "model.gltf", scale: {x:1, y:1, z:1}, animation: "auto" }
```

### Video
```javascript
{ type: "video", src: "video.mp4", width: 8, height: 4.5, autoplay: true }
```

### Audio
```javascript
{ type: "audio", src: "sound.ogg", spatialSound: true, visualIndicator: true }
```

### HTML Panel
```javascript
{ type: "html", content: "<h1>Title</h1>", width: 6, height: 4 }
```

## Common Properties (All Types)

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `id` | string | ✅ | - | Unique identifier |
| `type` | string | ✅ | "text" | Object type |
| `latitude` | number | ✅ | - | GPS latitude |
| `longitude` | number | ✅ | - | GPS longitude |
| `elevation` | number | ❌ | 0 | Height above ground (m) |
| `geofenceRadius` | number | ❌ | 50 | Visibility radius (m) |
| `faceUser` | boolean | ❌ | false | Always face camera |

## Type-Specific Properties

### Text Properties
- `text`: string - Text content
- `color`: string - Hex color (#FFFFFF)
- `fontSize`: number - Size multiplier
- `width`: number - Text width
- `direction`: number - Rotation (if not faceUser)

### Image Properties
- `src`: string - Image URL
- `width`: number - Width in meters
- `height`: number - Height in meters
- `opacity`: number - Transparency (0-1)
- `rotation`: object - {x, y, z} in degrees

### GLTF Properties
- `src`: string - GLTF/GLB file URL
- `scale`: object - {x, y, z} scale factors
- `rotation`: object - {x, y, z} in degrees
- `animation`: string - "auto", "none", or clip name
- `interactive`: boolean - Enable click

### Video Properties
- `src`: string - Video URL
- `width`: number - Width in meters
- `height`: number - Height in meters
- `autoplay`: boolean - Auto-start
- `loop`: boolean - Loop playback
- `volume`: number - Volume (0-1)

### Audio Properties
- `src`: string - Audio URL
- `autoplay`: boolean - Auto-start
- `loop`: boolean - Loop playback
- `volume`: number - Volume (0-1)
- `spatialSound`: boolean - 3D audio
- `refDistance`: number - Full volume distance
- `maxDistance`: number - Max audible distance
- `visualIndicator`: boolean - Show sphere + icon

### HTML Properties
- `content`: string - HTML content
- `width`: number - Panel width (m)
- `height`: number - Panel height (m)
- `backgroundColor`: string - Background color
- `padding`: number - Padding (m)

## File Format Support

### Images
✅ PNG, JPG, JPEG, GIF, WebP, SVG
❌ TIFF, BMP (not recommended)

### 3D Models
✅ GLTF 2.0 (.gltf, .glb)
✅ Draco compression
❌ OBJ, FBX (convert to GLTF first)

### Videos
✅ MP4 (H.264), WebM, Ogg
⚠️ Device/browser dependent

### Audio
✅ OGG, MP3, WAV
⚠️ OGG recommended for best compatibility

## Performance Guidelines

| Asset Type | Mobile Max | Desktop Max | Notes |
|------------|------------|-------------|-------|
| Image resolution | 2048x2048 | 4096x4096 | Use power-of-two |
| Model triangles | 50K | 200K | Lower is better |
| Video resolution | 720p | 1080p | 30fps recommended |
| Audio bitrate | 128kbps | 256kbps | Mono for spatial |
| Simultaneous objects | 10-20 | 50+ | Use geofencing |

## Common Patterns

### Billboard Text
```javascript
{ type: "text", text: "Info", faceUser: true, elevation: 2 }
```

### Ground-Level Model
```javascript
{ type: "gltf", src: "model.gltf", elevation: 0, scale: {x:2, y:2, z:2} }
```

### Floating Video Screen
```javascript
{ type: "video", src: "video.mp4", faceUser: true, elevation: 3 }
```

### Ambient Audio Zone
```javascript
{ type: "audio", src: "ambient.ogg", spatialSound: true, loop: true, geofenceRadius: 30 }
```

### Interactive 3D Object
```javascript
{ type: "gltf", src: "model.gltf", interactive: true, animation: "auto" }
```

## Global Settings

```javascript
CONFIG.settings = {
    minDistance: 0,        // Min visibility distance (m)
    maxDistance: 200,      // Max visibility distance (m)
    updateInterval: 1000,  // Update frequency (ms)
    debug: true            // Console logging
}
```

## Debugging Tips

1. **Enable debug mode**: `CONFIG.settings.debug = true`
2. **Check browser console**: F12 or Cmd+Option+I
3. **Verify GPS**: Check info panel for coordinates
4. **Test geofence**: Temporarily increase radius
5. **Check CORS**: Ensure assets are accessible
6. **Validate JSON**: Use jsonlint.com for config.js

## Common Issues

### "Object not visible"
- Check geofenceRadius covers your location
- Verify elevation isn't underground/too high
- Ensure GPS permissions granted
- Check browser console for errors

### "Model not loading"
- Verify GLTF URL is accessible
- Check CORS headers
- Validate GLTF file (gltf-validator.com)
- Try GLB format instead

### "Video not playing"
- Check codec support for device/browser
- Ensure autoplay is enabled
- Try muted video (autoplay restrictions)
- Use MP4 with H.264 codec

### "Audio not working"
- Check volume settings
- Verify spatialSound settings
- Test with visualIndicator enabled
- Check audio format compatibility

## Useful Resources

- [A-Frame School](https://aframe.io/aframe-school/)
- [GLTF Validator](https://github.khronos.org/glTF-Validator/)
- [3D Model Repository](https://sketchfab.com/3d-models?features=downloadable)
- [Free Sound Effects](https://freesound.org/)
- [Texture Compressor](https://squoosh.app/)
