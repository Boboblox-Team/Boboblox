

# Tropical Island — 3D Explorable World with Multiplayer

## Overview
Replace the current placeholder cube with a full low-poly 3D tropical island that players can walk around using WASD/touch controls, seeing other players as avatars in real-time.

## Architecture

```text
┌─────────────────────────────────────────────┐
│  TropicalIsland.tsx (R3F Canvas)            │
│  ├── Sky + Ocean plane                      │
│  ├── Island terrain (low-poly mesh)         │
│  ├── Props: palm trees, rocks, huts         │
│  ├── LocalPlayer (WASD + touch joystick)    │
│  ├── RemotePlayers (Supabase Presence)      │
│  └── HUD overlay (leave btn, minimap, chat) │
└─────────────────────────────────────────────┘
```

## Steps

### 1. Build the island environment
- Migrate from raw Three.js to `@react-three/fiber` + `@react-three/drei` (already in the project)
- Create procedural low-poly terrain: a flat-ish island mesh with gentle hills, surrounded by a water plane
- Add `Sky` from drei for a sunny tropical sky
- Scatter low-poly palm trees (simple trunk cylinder + leaf cones), rocks, and a small hut — all built with basic Three.js geometries and bright Boboblox-style colors
- Ambient + directional lighting with soft shadows

### 2. Player movement (LocalPlayer)
- First-person or third-person camera with a simple capsule avatar
- WASD keyboard controls for movement, mouse for looking around
- On mobile: virtual joystick (touch) in bottom-left, drag-to-look on the right half
- Collision with terrain so the player stays on the island
- Spawn at a beach location

### 3. Real-time multiplayer avatars
- Use Supabase Realtime Presence (same pattern as `usePresence` hook) to broadcast player position + rotation every ~100ms
- Render other players as colored capsules with username labels floating above
- Smoothly interpolate remote player positions (lerp)

### 4. HUD / UI overlay
- "Leave Island" button (top-left, already exists)
- Player count badge (top-right)
- Simple text chat box (bottom, optional — phase 2)
- Mobile joystick (bottom-left, only on touch devices)

### 5. Performance
- Keep total triangle count low (<10K) for mobile compatibility
- Use `instancedMesh` for repeated objects (trees, rocks)
- Throttle presence updates to 10 Hz
- Frustum culling enabled by default in R3F

## Files to create/modify
| File | Action |
|------|--------|
| `src/pages/islands/TropicalIsland.tsx` | Rewrite with R3F Canvas, island scene, player controls |
| `src/components/island/IslandTerrain.tsx` | New — procedural low-poly island mesh |
| `src/components/island/PalmTree.tsx` | New — reusable low-poly palm tree |
| `src/components/island/Ocean.tsx` | New — animated water plane |
| `src/components/island/LocalPlayer.tsx` | New — WASD + touch movement, camera follow |
| `src/components/island/RemotePlayers.tsx` | New — renders other players from presence |
| `src/components/island/IslandHUD.tsx` | New — UI overlay (leave, player count, joystick) |
| `src/hooks/useIslandPresence.ts` | New — broadcasts/receives player positions via Realtime Presence |

