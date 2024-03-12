import { create } from "zustand";

const store = (set) => ({
  filteredTag: [],
  selectedTag: [],
  formulaResult:'0',
  setFormulaResult:(input) => set((state) => ({ formulaResult: input })),
  switchTagIsEditing: (switchIndex) =>
    set((state) => ({
      selectedTag: state.selectedTag.map((tag, i) =>
        i === switchIndex ? { ...tag, isEditing: !tag.isEditing } : tag
      ),
    })),
  setFilteredTag: (input) => set((state) => ({ filteredTag: input })),
  setSelectedTag: (input) =>
    set((state) => ({
      selectedTag: input.map((tag, i) => ({
        ...tag,
        tagIndex: i,
        isEditing: false,
      })),
    })),
  changeSelectedTagValue: (input, index) =>
    set((state) => ({
      selectedTag: state.selectedTag.map((tag, i) =>
        i === index ? { ...tag, value: input } : tag
      ),
    })),
});

export const useMyStore = create(store);
