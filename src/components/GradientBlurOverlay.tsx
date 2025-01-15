import * as React from "react";
import { CSSProperties } from 'react';

// Define prop types
interface GradientBlurOverlayProps {
    width?: string;
    height?: string;
    baseColor?: string;
    gradients?: { stop: string; opacity: number; blur: number }[];
    fadeDirection?: 'top' | 'bottom' | 'left' | 'right';
    position?: 'absolute' | 'relative' | 'fixed' | 'sticky';
    zIndex?: number;
    style?: CSSProperties; // Add this to allow inline styles
}

// Functional component with explicit return type
const GradientBlurOverlay: React.FC<GradientBlurOverlayProps> = ({
    width = '100%',
    height = '100%',
    baseColor = 'rgb(0, 0, 0)',
    gradients = [
        { stop: '0%', opacity: 0, blur: 64 },
        { stop: '12.5%', opacity: 0, blur: 32 },
        { stop: '25%', opacity: 0, blur: 16 },
        { stop: '37.5%', opacity: 0, blur: 8 },
        { stop: '50%', opacity: 0, blur: 4 },
        { stop: '62.5%', opacity: 0, blur: 2 },
        { stop: '75%', opacity: 0, blur: 1 },
        { stop: '87.5%', opacity: 0, blur: 0.5 },
    ],
    fadeDirection = 'top',
    position = 'absolute',
    zIndex = 0,
    style = {}, // Default empty object for custom styles
}): JSX.Element => {
    // Determine gradient direction based on fadeDirection
    const gradientDirection = {
        top: 'to top',
        bottom: 'to bottom',
        left: 'to left',
        right: 'to right',
    }[fadeDirection];

    return (
        <div
            style={{
                position,
                zIndex,
                width,
                height,
                background: `linear-gradient(${gradientDirection}, ${baseColor} / 0 0%, ${baseColor} / 0 100%)`,
                ...style, // Merge custom styles
            }}
        >
            {gradients.map((gradient, index) => (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        zIndex: index + 1,
                        inset: 0,
                        maskImage: `linear-gradient(${gradientDirection}, ${baseColor} ${gradient.stop}, rgba(0, 0, 0, ${gradient.opacity}) ${gradient.stop})`,
                        WebkitMaskImage: `linear-gradient(${gradientDirection}, ${baseColor} ${gradient.stop}, rgba(0, 0, 0, ${gradient.opacity}) ${gradient.stop})`,
                        backdropFilter: `blur(${gradient.blur}px)`,
                    }}
                />
            ))}
        </div>
    );
};

export default GradientBlurOverlay;