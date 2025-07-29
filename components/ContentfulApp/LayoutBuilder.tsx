'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { RootState } from '@/store';
import {
  addComponent,
  removeComponent,
  reorderComponents,
  undo,
  redo,
  loadLayout,
} from '@/store/slices/layoutSlice';
import { LayoutComponent } from '@/types/contentful';
import styles from './LayoutBuilder.module.css';

const AVAILABLE_COMPONENTS = [
  {
    type: 'hero' as const,
    title: 'Hero Block',
    description: 'Large header with background image, heading, subtitle, and CTA',
  },
  {
    type: 'twoColumn' as const,
    title: 'Two Column Row',
    description: 'Left column with text content, right column with image',
  },
  {
    type: 'imageGrid' as const,
    title: '2x2 Image Grid',
    description: 'Grid of four optimized images from Contentful',
  },
];

interface SortableComponentProps {
  component: LayoutComponent;
  onRemove: (id: string) => void;
}

function SortableComponent({ component, onRemove }: SortableComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getComponentDisplay = (type: string) => {
    switch (type) {
      case 'hero':
        return 'Hero Block';
      case 'twoColumn':
        return 'Two Column Row';
      case 'imageGrid':
        return '2x2 Image Grid';
      default:
        return type;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.draggableComponent}
      {...attributes}
      {...listeners}
    >
      <div className={styles.componentHeader}>
        <span className={styles.componentType}>
          {getComponentDisplay(component.type)}
        </span>
        <button
          className={styles.removeButton}
          onClick={() => onRemove(component.id)}
        >
          Remove
        </button>
      </div>
      
      <div className={styles.componentPreview}>
        Content ID: {component.contentId}
        <br />
        Component will render based on Contentful data
      </div>
    </div>
  );
}

export default function LayoutBuilder() {
  const dispatch = useDispatch();
  const { components, historyIndex, history, isDirty, lastSaved } = useSelector(
    (state: RootState) => state.layout
  );
  
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    // Load initial layout from Contentful or localStorage
    const savedLayout = localStorage.getItem('contentful-layout');
    if (savedLayout) {
      try {
        const parsed = JSON.parse(savedLayout);
        dispatch(loadLayout(parsed));
      } catch (error) {
        console.error('Failed to load saved layout:', error);
      }
    }
  }, [dispatch]);

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedItem(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedItem(null);

    if (!over) return;

    // Handle adding new component from sidebar
    if (active.id.toString().startsWith('component-')) {
      const componentType = active.id.toString().replace('component-', '') as 'hero' | 'twoColumn' | 'imageGrid';
      
      const newComponent: LayoutComponent = {
        id: `${componentType}-${Date.now()}`,
        type: componentType,
        contentId: `sample-${componentType}-content-id`,
      };
      
      dispatch(addComponent(newComponent));
      return;
    }

    // Handle reordering existing components
    if (active.id !== over.id) {
      dispatch(reorderComponents({
        activeId: active.id as string,
        overId: over.id as string,
      }));
    }
  };

  const handleRemoveComponent = (id: string) => {
    dispatch(removeComponent(id));
  };

  const handleUndo = () => {
    dispatch(undo());
  };

  const handleRedo = () => {
    dispatch(redo());
  };

  const handleSave = async () => {
    // Here you would save to Contentful Management API
    localStorage.setItem('contentful-layout', JSON.stringify(components));
    console.log('Layout saved:', components);
  };

  const handlePreview = () => {
    // Open preview in new tab
    const previewUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/landing/page-1`;
    window.open(previewUrl, '_blank');
  };

  const getSaveStatus = () => {
    if (isDirty) {
      return { text: 'Unsaved changes', className: styles.saving };
    }
    if (lastSaved) {
      const timeSince = Math.floor((Date.now() - lastSaved) / 1000);
      return { 
        text: `Saved ${timeSince}s ago`, 
        className: styles.saved 
      };
    }
    return { text: 'No changes', className: '' };
  };

  const saveStatus = getSaveStatus();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>Available Components</h2>
          
          <div className={styles.componentList}>
            {AVAILABLE_COMPONENTS.map((component) => (
              <div
                key={`component-${component.type}`}
                className={styles.componentItem}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', `component-${component.type}`);
                }}
              >
                <div className={styles.componentTitle}>{component.title}</div>
                <div className={styles.componentDescription}>
                  {component.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mainArea}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <button
                className={styles.button}
                onClick={handleUndo}
                disabled={historyIndex <= 0}
              >
                Undo
              </button>
              <button
                className={styles.button}
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
              >
                Redo
              </button>
            </div>
            
            <div className={styles.toolbarRight}>
              <div className={`${styles.saveStatus} ${saveStatus.className}`}>
                {saveStatus.text}
              </div>
              <button
                className={`${styles.button} ${styles.buttonSecondary}`}
                onClick={handlePreview}
              >
                Preview
              </button>
              <button
                className={styles.button}
                onClick={handleSave}
              >
                Save Layout
              </button>
            </div>
          </div>

          <div className={styles.canvas}>
            <SortableContext
              items={components.map((c: LayoutComponent) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className={`${styles.dropZone} ${draggedItem ? styles.dragOver : ''}`}>
                {components.length === 0 ? (
                  <div className={styles.emptyState}>
                    <div className={styles.emptyStateIcon}>📋</div>
                    <h3>Start Building Your Layout</h3>
                    <p>Drag components from the sidebar to create your page layout</p>
                  </div>
                ) : (
                  components.map((component: LayoutComponent) => (
                    <SortableComponent
                      key={component.id}
                      component={component}
                      onRemove={handleRemoveComponent}
                    />
                  ))
                )}
              </div>
            </SortableContext>
          </div>
        </div>
      </div>
    </DndContext>
  );
}