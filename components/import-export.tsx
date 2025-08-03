'use client';

import type React from 'react';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBuilder } from '@/lib/builder-context';
import type { SectionData } from '@/types/builder';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { toast } from 'sonner';

export function ImportExport() {
  const { state, dispatch } = useBuilder();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const exportDesign = () => {
    const designData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
      sections: state.sections,
    };

    const blob = new Blob([JSON.stringify(designData, null, 2)], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `website-design-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importDesign = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const designData = JSON.parse(content);

        if (designData.sections && Array.isArray(designData.sections)) {
          dispatch({
            type: 'LOAD_DESIGN',
            payload: designData.sections as SectionData[],
          });
          ``;
        } else {
          toast.error('Invalid design file format');
        }
      } catch (error) {
        toast.error('Failed to parse design file');
      }
    };
    reader.readAsText(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearDesign = () => {
    dispatch({ type: 'CLEAR_DESIGN' });
    setIsOpen(false);
  };

  return (
    <div className='border-t border-gray-200 p-4 bg-white'>
      <h3 className='text-sm font-medium text-gray-700 mb-3'>
        Design Management
      </h3>

      <div className='space-y-2'>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={exportDesign}
            disabled={state.sections.length === 0}
            className='w-full justify-start bg-transparent'
            variant='outline'
          >
            <Download className='h-4 w-4 mr-2' />
            Export Design
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className='w-full justify-start'
            variant='outline'
          >
            <Upload className='h-4 w-4 mr-2' />
            Import Design
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button
                disabled={state.sections.length === 0}
                className='w-full justify-start bg-transparent'
                variant='outline'
              >
                <Trash2 className='h-4 w-4 mr-2' />
                Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className='sm:max-w-[470px]'>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear Confirmation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to clear all sections? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearDesign} className='ml-2'>
                  Clear All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </motion.div>
      </div>

      <input
        ref={fileInputRef}
        type='file'
        accept='.json'
        onChange={importDesign}
        className='hidden'
      />

      {state.sections.length > 0 && (
        <div className='mt-3 pt-3 border-t border-gray-100'>
          <div className='text-xs text-gray-500'>
            {state.sections.length} section
            {state.sections.length !== 1 ? 's' : ''} in design
          </div>
        </div>
      )}
    </div>
  );
}
