"use client";
import { useEffect, useState, useRef } from "react";

const GoogleMapSection = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track if it's client-side
  const mapRef = useRef(null); // Persist map instance across renders
  const scriptSrc =
    "https://apis.mapmyindia.com/advancedmaps/v1/759f46e37e51dcfa59a47df0fd93c340/map_load?v=1.5";

  // Ensuring we are on the client side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Load the MapmyIndia script only on the client side
    const loadMapScript = () => {
      if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
        const script = document.createElement("script");
        script.src = scriptSrc;
        script.async = true;

        script.onload = () => {
          console.log("MapmyIndia script loaded successfully.");
          setScriptLoaded(true);
        };

        script.onerror = () => {
          console.error("Failed to load the MapmyIndia script.");
        };

        document.body.appendChild(script);
      } else {
        console.log("Script already loaded.");
        setScriptLoaded(true);
      }
    };

    if (isClient) loadMapScript();
  }, [isClient]);

  useEffect(() => {
    if (scriptLoaded && isClient && !mapRef.current) {
      // Delay initialization to ensure hydration is complete
      const initializeMap = () => {
        if (window.MapmyIndia) {
          console.log("Initializing map...");
          try {
            mapRef.current = new window.MapmyIndia.Map("map", {
              center: [28.6448, 77.216721], // Example coordinates
              zoom: 12,
            });
          } catch (error) {
            console.error("Error initializing MapmyIndia map:", error);
          }
        } else {
          console.error("MapmyIndia object not found. Retrying...");
          setTimeout(initializeMap, 500); // Retry after 500ms
        }
      };

      // Ensure that the map initializes only after the page is hydrated
      setTimeout(initializeMap, 100); // Delay initialization
    }
  }, [scriptLoaded, isClient]);

  // If not client, don't render map-related components
  if (!isClient) return null;

  return (
    <div>
      <p className="text-[20px] font-bold">Google Map Section</p>
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default GoogleMapSection;
