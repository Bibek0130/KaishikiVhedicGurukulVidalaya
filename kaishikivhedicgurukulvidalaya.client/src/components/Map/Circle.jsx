/* eslint-disable complexity */
import {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef
} from 'react';

import { GoogleMapsContext, latLngEquals } from '@vis.gl/react-google-maps';

function useCircle(props) {
    const {
        onClick,
        onDrag,
        onDragStart,
        onDragEnd,
        onMouseOver,
        onMouseOut,
        onRadiusChanged,
        onCenterChanged,
        radius,
        center,
        ...circleOptions
    } = props;

    // Store callbacks safely
    const callbacks = useRef({});
    Object.assign(callbacks.current, {
        onClick,
        onDrag,
        onDragStart,
        onDragEnd,
        onMouseOver,
        onMouseOut,
        onRadiusChanged,
        onCenterChanged
    });

    const circleRef = useRef(null);

    // Create circle once Google is available
    useEffect(() => {
        if (!window.google || !window.google.maps) return;

        if (!circleRef.current) {
            circleRef.current = new window.google.maps.Circle();
        }
    }, []);

    const map = useContext(GoogleMapsContext)?.map;

    // Set options
    useEffect(() => {
        const circle = circleRef.current;
        if (!circle) return;

        circle.setOptions(circleOptions);
    }, [circleOptions]);

    // Update center
    useEffect(() => {
        const circle = circleRef.current;
        if (!circle || !center) return;

        if (!latLngEquals(center, circle.getCenter())) {
            circle.setCenter(center);
        }
    }, [center]);

    // Update radius
    useEffect(() => {
        const circle = circleRef.current;
        if (!circle || radius == null) return;

        if (radius !== circle.getRadius()) {
            circle.setRadius(radius);
        }
    }, [radius]);

    // Attach to map
    useEffect(() => {
        const circle = circleRef.current;
        if (!circle || !map) {
            if (map === undefined) {
                console.error('<Circle> has to be inside a Map component.');
            }
            return;
        }

        circle.setMap(map);

        return () => {
            circle.setMap(null);
        };
    }, [map]);

    // Event listeners
    useEffect(() => {
        const circle = circleRef.current;
        if (!circle || !window.google) return;

        const gme = window.google.maps.event;

        const listeners = [
            ['click', 'onClick'],
            ['drag', 'onDrag'],
            ['dragstart', 'onDragStart'],
            ['dragend', 'onDragEnd'],
            ['mouseover', 'onMouseOver'],
            ['mouseout', 'onMouseOut']
        ].map(([eventName, eventCallback]) =>
            gme.addListener(circle, eventName, (e) => {
                const callback = callbacks.current[eventCallback];
                if (callback) callback(e);
            })
        );

        listeners.push(
            gme.addListener(circle, 'radius_changed', () => {
                const newRadius = circle.getRadius();
                callbacks.current.onRadiusChanged?.(newRadius);
            })
        );

        listeners.push(
            gme.addListener(circle, 'center_changed', () => {
                const newCenter = circle.getCenter();
                callbacks.current.onCenterChanged?.(newCenter);
            })
        );

        return () => {
            listeners.forEach((l) => l.remove());
        };
    }, []);

    return circleRef.current;
}

/**
 * Circle Component
 */
export const Circle = forwardRef((props, ref) => {
    const circle = useCircle(props);

    useImperativeHandle(ref, () => circle, [circle]);

    return null;
});