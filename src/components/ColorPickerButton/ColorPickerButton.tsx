import './styles.css';
import React, { useEffect, useRef, useState } from 'react'
import ColorPickerIconSVG from '@/components/svgs/ColorPickerIconSVG/ColorPickerIconSVG';
import useColorPickerStore, { ColorPickerStore } from '@/store/colorPicker';

const ColorPickerButton = () => {

    const [isToolActive, setIsToolActive] = useState(false);
    const { activeTool, setActiveTool } = useColorPickerStore((state: ColorPickerStore) => state);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setIsToolActive(activeTool === 'color-picker');
    }, [activeTool]);

    useEffect(() => {
        setActiveTool(isToolActive ? 'color-picker' : null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isToolActive]);

    const handleClick = () => {
        setIsToolActive(prev => !prev);
    }

    return (
        <button
            ref={buttonRef}
            className={`icon-btn ${isToolActive ? 'active' : ''}`}
            onClick={handleClick}
        >
            <ColorPickerIconSVG />
        </button>
    )
}

export default ColorPickerButton;