"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import RevealOnScroll from "./RevealOnScroll";

interface WorldGlobeProps {
    className?: string;
}

const WorldGlobe = ({ className = "" }: WorldGlobeProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef(null);
    const pointerInteractionMovement = useRef(0);

    // Use a ref to store the varying state of markers across frames
    // Each marker has: location [lat, lon], currentSize, maxPhase (lifespan), currentPhase, speed
    const markersRef = useRef<Array<{
        location: [number, number];
        size: number;
        phase: number;
        speed: number;
        maxSize: number;
        isHQ?: boolean; // New flag for the headquarters
    }>>([{
        location: [24.7136, 46.6753], // Riyadh (HQ) initialized immediately
        size: 0.08,
        phase: 0,
        speed: 0.03, // Gently breathes
        maxSize: 0.08, // Slightly larger than others
        isHQ: true
    }]);

    useEffect(() => {
        let phi = 0;
        let width = 0;

        if (!canvasRef.current) return;

        // Predefined land locations (major cities) to ensure markers only appear on "black dots"
        const landLocations: [number, number][] = [
            [40.7128, -74.0060], // NYC
            [51.5074, -0.1278], // London
            [25.2048, 55.2708], // Dubai
            [1.3521, 103.8198], // Singapore
            [31.2304, 121.4737], // Shanghai
            [35.6762, 139.6503], // Tokyo
            [-33.8688, 151.2093], // Sydney
            [19.0760, 72.8777], // Mumbai
            [55.7558, 37.6173], // Moscow
            [48.8566, 2.3522], // Paris
            [52.5200, 13.4050], // Berlin
            [41.9028, 12.4964], // Rome
            [34.0522, -118.2437], // Los Angeles
            [41.8781, -87.6298], // Chicago
            [25.7617, -80.1918], // Miami
            [-23.5505, -46.6333], // Sao Paulo
            [-34.6037, -58.3816], // Buenos Aires
            [30.0444, 31.2357], // Cairo
            [-1.2921, 36.8219], // Nairobi
            [6.5244, 3.3792], // Lagos
            [39.9042, 116.4074], // Beijing
            [37.5665, 126.9780], // Seoul
            [13.7563, 100.5018], // Bangkok
            [-6.2088, 106.8456], // Jakarta
            [28.6139, 77.2090], // New Delhi
            [41.0082, 28.9784], // Istanbul
        ];

        const onResize = () => {
            if (canvasRef.current) {
                width = canvasRef.current.offsetWidth;
            }
        }
        window.addEventListener('resize', onResize)
        onResize()

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2 || 600 * 2,
            height: width * 2 || 600 * 2,
            phi: 0,
            theta: 0.2, // Tilted slightly to show northern hemisphere better
            dark: 0,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [1, 1, 1],
            markerColor: [0.97, 0.16, 0.26], // Matches primary color #f72a42
            glowColor: [0.8, 0.8, 0.8],
            opacity: 1,
            offset: [0, 0],
            markers: [], // We update this in onRender
            onRender: (state) => {
                // Dragging interaction logic could be added here state.phi = phi + r.current
                state.phi = phi + pointerInteractionMovement.current;

                // Allow auto rotation only if not interacting could be cool, but keeping simple for now
                phi += 0.003;

                // Dynamic Marker Logic
                // 1. Randomly spawn new markers from the landLocations list
                if (Math.random() < 0.03 && markersRef.current.length < 15) {
                    const randomCity = landLocations[Math.floor(Math.random() * landLocations.length)];
                    markersRef.current.push({
                        location: randomCity,
                        size: 0,
                        phase: 0,
                        // Slower speed for "breathing" effect
                        speed: 0.01 + Math.random() * 0.015,
                        maxSize: 0.04 + Math.random() * 0.04,
                        isHQ: false
                    });
                }

                // 2. Update existing markers (pulsate lifecycle)
                markersRef.current.forEach(m => {
                    if (m.isHQ) {
                        // HQ marker breathes continuously but never zero
                        // Increased amplitude for a "wider" pulsating wave effect
                        m.phase += 0.02;
                        m.size = 0.08 + Math.sin(m.phase) * 0.025;
                    } else {
                        // Transient markers
                        m.phase += m.speed;
                        m.size = Math.sin(m.phase) * m.maxSize;
                    }
                });

                // 3. Remove dead markers (transient ones only)
                markersRef.current = markersRef.current.filter(m => m.isHQ || m.phase < Math.PI);

                // 4. Update state
                state.markers = markersRef.current.map(m => ({
                    location: m.location,
                    size: m.size
                }));
            },
        });

        return () => {
            globe.destroy();
            window.removeEventListener('resize', onResize);
        };
    }, []);

    return (
        <div className={`relative flex items-center justify-center overflow-visible ${className}`}>

            <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%", maxWidth: "100%", aspectRatio: "1" }}
            />
        </div>
    );
};

export default WorldGlobe;
