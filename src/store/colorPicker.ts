import { create } from 'zustand';
import IMAGES from '@/consts/images';

export interface ColorPickerStore {
    previewSize: number;
    activeTool: string | null;
    currentColor: string;
    hoveredColor: string;
    image: string;

    setImage: (image: string) => void;
    setPreviewSize: (size: number) => void;
    setActiveTool: (tool: string | null) => void;
    setCurrentColor: (color: string) => void;
    setHoveredColor: (color: string) => void;
}

const useColorPickerStore = create<ColorPickerStore>(set => ({

    previewSize: 15,
    activeTool: null,
    currentColor: '',
    hoveredColor: '',
    image: IMAGES[0].src,

    setImage: (image: string) => set({ image }),
    setPreviewSize: (size: number) => set({ previewSize: size }),
    setActiveTool: (tool: string | null) => set({ activeTool: tool }),
    setCurrentColor: (color: string) => set({ currentColor: color }),
    setHoveredColor: (color: string) => set({ hoveredColor: color }),

}));

export default useColorPickerStore;