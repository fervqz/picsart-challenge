import { create } from 'zustand';

const useColorPickerStore = create((set) => ({

    previewSize: 15,
    currentTool: null,
    currentColor: null,
    hoveredColor: 'white',
    image: '/img/beach.jpg',

    setImage: (image: string) => set({ image }),
    setPreviewSize: (size: number) => set({ previewSize: size }),
    setCurrentTool: (tool: string) => set({ currentTool: tool }),
    setCurrentColor: (color: string) => set({ currentColor: color }),
    setHoveredColor: (color: string) => set({ hoveredColor: color }),
}));

export default useColorPickerStore;