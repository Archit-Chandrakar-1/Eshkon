import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LayoutComponent } from '@/types/contentful';

interface LayoutState {
  components: LayoutComponent[];
  history: LayoutComponent[][];
  historyIndex: number;
  isDirty: boolean;
  lastSaved: number | null;
}

const initialState: LayoutState = {
  components: [],
  history: [[]],
  historyIndex: 0,
  isDirty: false,
  lastSaved: null,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setComponents: (state, action: PayloadAction<LayoutComponent[]>) => {
      state.components = action.payload;
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push([...action.payload]);
      state.historyIndex = state.history.length - 1;
      state.isDirty = true;
    },
    addComponent: (state, action: PayloadAction<LayoutComponent>) => {
      state.components.push(action.payload);
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push([...state.components]);
      state.historyIndex = state.history.length - 1;
      state.isDirty = true;
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      state.components = state.components.filter(comp => comp.id !== action.payload);
      state.history = state.history.slice(0, state.historyIndex + 1);
      state.history.push([...state.components]);
      state.historyIndex = state.history.length - 1;
      state.isDirty = true;
    },
    reorderComponents: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      const { activeId, overId } = action.payload;
      const activeIndex = state.components.findIndex(comp => comp.id === activeId);
      const overIndex = state.components.findIndex(comp => comp.id === overId);
      
      if (activeIndex !== -1 && overIndex !== -1) {
        const newComponents = [...state.components];
        const [movedComponent] = newComponents.splice(activeIndex, 1);
        newComponents.splice(overIndex, 0, movedComponent);
        state.components = newComponents;
        
        state.history = state.history.slice(0, state.historyIndex + 1);
        state.history.push([...state.components]);
        state.historyIndex = state.history.length - 1;
        state.isDirty = true;
      }
    },
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
        state.components = [...state.history[state.historyIndex]];
        state.isDirty = true;
      }
    },
    redo: (state) => {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex += 1;
        state.components = [...state.history[state.historyIndex]];
        state.isDirty = true;
      }
    },
    markSaved: (state) => {
      state.isDirty = false;
      state.lastSaved = Date.now();
    },
    loadLayout: (state, action: PayloadAction<LayoutComponent[]>) => {
      state.components = action.payload;
      state.history = [action.payload];
      state.historyIndex = 0;
      state.isDirty = false;
      state.lastSaved = Date.now();
    },
  },
});

export const {
  setComponents,
  addComponent,
  removeComponent,
  reorderComponents,
  undo,
  redo,
  markSaved,
  loadLayout,
} = layoutSlice.actions;

export default layoutSlice.reducer;