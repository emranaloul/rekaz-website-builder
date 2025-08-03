'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { sectionTemplates } from '@/lib/sections';
import { useBuilder } from '@/lib/builder-context';
import { SectionTemplate } from '@/types/builder';

export function SectionLibrary() {
  const { dispatch } = useBuilder();

  const addSection = (template: SectionTemplate) => {
    const newSection = {
      ...template.defaultData,
      id: crypto.randomUUID(),
    };
    dispatch({ type: 'ADD_SECTION', payload: newSection });
  };

  return (
    <div className='w-80 bg-gray-50 border-r border-gray-200 p-4 overflow-y-auto'>
      <h2 className='text-lg font-semibold mb-4 text-gray-800'>
        Section Library
      </h2>
      <div className='space-y-3'>
        {sectionTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className='hover:shadow-md transition-shadow cursor-pointer group'>
              <CardContent className='p-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex-1'>
                    <div className='text-sm font-medium text-gray-700 mb-1'>
                      {template.name}
                    </div>
                    <div className='text-xs text-gray-500'>
                      {template.preview}
                    </div>
                  </div>
                  <Button
                    size='sm'
                    variant='ghost'
                    className='opacity-0 group-hover:opacity-100 transition-opacity'
                    onClick={() => addSection(template)}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
