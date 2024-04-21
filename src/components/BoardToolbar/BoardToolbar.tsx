import './styles.css';
import React from 'react';
import ColorCompareSVG from '../svgs/ColorCompareSVG/ColorCompareSVG';
import ColorPickerButton from '@/components/ColorPickerButton/ColorPickerButton';
import CopySVG from '@/components/svgs/CopySVG/CopySVG';
import IMAGES from '@/consts/images';
import useColorPickerStore, { ColorPickerStore } from '@/store/colorPicker';

const CopyButton = () => {

    const { currentColor } = useColorPickerStore((state: ColorPickerStore) => state);
    const [showCopied, setShowCopied] = React.useState(false);

    const handleClick = () => {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
        navigator.clipboard.writeText(currentColor);
    }

    return (
        <button className='copy-btn' onClick={handleClick}>
            <CopySVG />
            {showCopied && <span>Copied!</span>}
        </button>
    )
}

const BoardToolbar = () => {

    const {
        currentColor,
        hoveredColor,
        setImage,
    } = useColorPickerStore((state: ColorPickerStore) => state);

    return (
        <div className="toolbar">

            <ColorPickerButton />

            <div className='compare-container'>
                <div className='compare-colors'>
                    <ColorCompareSVG
                        currentColor={currentColor}
                        hoveredColor={hoveredColor}
                    />
                </div>
                {currentColor
                    ? <p className='color-badge'>
                        <b>{currentColor}</b>
                        <CopyButton />
                    </p>
                    : <p className='color-badge' style={{ color: 'gray' }}>select a color</p>
                }
            </div>

            <div className='controls'>
                <select name="select-image" id="select-image" onChange={(e) => setImage(e.target.value)}>
                    {IMAGES.map((image) => (
                        <option key={image.name} value={image.src}>{image.name}</option>
                    ))}
                </select>
            </div>
        </div >
    )
}

export default BoardToolbar;