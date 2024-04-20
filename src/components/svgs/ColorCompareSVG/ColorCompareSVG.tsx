import React from 'react';

interface Props {
    currentColor?: string;
    hoveredColor?: string;
}

const ColorCompareSVG = ({ currentColor = 'white', hoveredColor = 'white' }: Readonly<Props>) => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path fill={currentColor} fillRule="evenodd" clipRule="evenodd" d="M32 0.597778L0.5979 32H0V0H32V0.597778Z" />
            <path fill={hoveredColor} fillRule="evenodd" clipRule="evenodd" d="M0 31.9772L31.9772 0H32V32H0V31.9772Z" />
        </svg>
    )
}

export default ColorCompareSVG;