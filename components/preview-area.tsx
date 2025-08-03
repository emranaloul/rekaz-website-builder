'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { EditableSection } from './editable-section';
import { useBuilder } from '@/lib/builder-context';

export const PreviewArea = () => {
  const { state, dispatch } = useBuilder();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = state.sections.findIndex(
        (section) => section.id === active.id
      );
      const newIndex = state.sections.findIndex(
        (section) => section.id === over.id
      );

      const newSections = arrayMove(state.sections, oldIndex, newIndex);
      dispatch({ type: 'REORDER_SECTIONS', payload: newSections });
    }
  };

  if (state.sections.length === 0) {
    return (
      <div className='flex-1 flex items-center justify-center bg-gray-50'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className='text-center'
        >
          <div className='text-6xl mb-4'>🎨</div>
          <h3 className='text-xl font-semibold text-gray-700 mb-2'>
            Start Building Your Website
          </h3>
          <p className='text-gray-500'>
            Click on sections from the library to add them to your page
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='flex-1 overflow-y-auto bg-white'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={state.sections.map((section) => section.id)}
          strategy={verticalListSortingStrategy}
        >
          <AnimatePresence>
            {state.sections.map((section, index) => (
              <EditableSection
                key={section.id}
                section={section}
                index={index}
              />
            ))}
          </AnimatePresence>
        </SortableContext>
      </DndContext>
    </div>
  );
};
