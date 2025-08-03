'use client';

import { motion } from 'framer-motion';
import { SectionLibrary } from './section-library';
import { PreviewArea } from './preview-area';
import { ImportExport } from './import-export';
import { BuilderProvider } from '@/lib/builder-context';
import { Toaster } from './ui/sonner';

export function WebsiteBuilder() {
  return (
    <BuilderProvider>
      <Toaster />
      <div className='h-screen flex bg-gray-100'>
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='flex flex-col'
        >
          <SectionLibrary />
          <ImportExport />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='flex-1 flex flex-col'
        >
          <header className='bg-white border-b border-gray-200 px-6 py-4'>
            <h1 className='text-2xl font-bold text-gray-900'>
              Website Builder
            </h1>
            <p className='text-sm text-gray-600'>
              Drag, drop, and customize your website sections
            </p>
          </header>

          <PreviewArea />
        </motion.div>
      </div>
    </BuilderProvider>
  );
}
