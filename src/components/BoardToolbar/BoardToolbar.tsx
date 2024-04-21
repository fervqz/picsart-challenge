import './styles.css';
import React from 'react';
import ColorCompareSVG from '../svgs/ColorCompareSVG/ColorCompareSVG';
import ColorPickerButton from '@/components/ColorPickerButton/ColorPickerButton';
import IMAGES from '@/consts/images';
import useColorPickerStore, { ColorPickerStore } from '@/store/colorPicker';

const BoardToolbar = () => {

    const { currentColor, hoveredColor, setImage } = useColorPickerStore((state: ColorPickerStore) => state);

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
                {currentColor ? <p className='color-badge'>{currentColor}</p> : <p style={{ color: 'gray' }}>select a color</p>}
            </div>

            <div className='controls'>
                <select name="select-image" id="select-image" onChange={(e) => setImage(e.target.value)}>
                    {IMAGES.map((image) => (
                        <option key={image.name} value={image.src}>{image.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default BoardToolbar;