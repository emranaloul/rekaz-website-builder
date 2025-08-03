'use client';

import { useState, FC } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit3, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionRenderer } from './section-renderer';
import { useBuilder } from '@/lib/builder-context';
import type { SectionData } from '@/types/builder';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import EditDialog from './edit-dialog';

interface EditableSectionProps {
  section: SectionData;
  index: number;
}

export const EditableSection: FC<EditableSectionProps> = ({
  section,
  index,
}) => {
  const { state, dispatch } = useBuilder();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(section);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isSelected = state.selectedSectionId === section.id;

  const handleSelect = () => {
    dispatch({
      type: 'SELECT_SECTION',
      payload: isSelected ? null : section.id,
    });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_SECTION', payload: section.id });
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(section);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
    >
      <div className='absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity'>
        <div className='flex space-x-2'>
          <Button
            size='sm'
            variant='secondary'
            className='h-8 w-8 p-0'
            {...attributes}
            {...listeners}
          >
            <GripVertical className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='secondary'
            className='h-8 w-8 p-0'
            onClick={handleEdit}
          >
            <Edit3 className='h-4 w-4' />
          </Button>
          <Button
            size='sm'
            variant='destructive'
            className='h-8 w-8 p-0'
            onClick={handleDelete}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <div onClick={handleSelect} className='cursor-pointer'>
        <SectionRenderer section={section} />
      </div>

      {isEditing && (
        <EditDialog section={editData} setIsEditing={setIsEditing} />
      )}
    </motion.div>
  );
};
