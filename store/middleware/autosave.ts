import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { markSaved } from '../slices/layoutSlice';

let autosaveTimeout: NodeJS.Timeout | null = null;

export const autosaveMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);
  
  // Only trigger autosave for layout actions
  if (action.type.startsWith('layout/') && action.type !== 'layout/markSaved') {
    const state = store.getState();
    
    if (state.layout.isDirty) {
      // Clear existing timeout
      if (autosaveTimeout) {
        clearTimeout(autosaveTimeout);
      }
      
      // Set new timeout for autosave
      autosaveTimeout = setTimeout(async () => {
        try {
          // Here you would save to Contentful
          // For now, we'll just mark as saved
          await saveToContentful(state.layout.components);
          store.dispatch(markSaved());
          console.log('Layout autosaved successfully');
        } catch (error) {
          console.error('Autosave failed:', error);
        }
      }, 2000); // 2 second delay
    }
  }
  
  return result;
};

async function saveToContentful(components: any[]) {
  // This would integrate with Contentful Management API
  // For now, we'll simulate the save operation
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
}