import React, { useEffect, useRef, useState } from 'react'
import './styles.css';
import useColorPickerStore from '@/store/colorPicker';
import ColorPickerIconSVG from '@/components/svgs/ColorPickerIconSVG/ColorPickerIconSVG';

const ColorPickerButton = () => {

    const [isToolActive, setIsToolActive] = useState(false);
    const currentTool = useColorPickerStore((state: any) => state.currentTool);
    const setCurrentTool = useColorPickerStore((state: any) => state.setCurrentTool);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setIsToolActive(currentTool === 'color-picker');
    }, [currentTool]);

    useEffect(() => {
        setCurrentTool(isToolActive ? 'color-picker' : null);
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