'use client';

import { FC } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { SectionData } from '@/types/builder';
interface SectionRendererProps {
  section: SectionData;
  isPreview?: boolean;
}

export const SectionRenderer: FC<SectionRendererProps> = ({
  section,
  isPreview = false,
}) => {
  const renderSection = () => {
    switch (section.type) {
      case 'header':
        return (
          <header className='bg-white shadow-sm border-b'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex justify-between items-center py-4'>
                <div className='text-xl font-bold text-gray-900'>
                  {section.title}
                </div>
                <nav className='hidden md:flex space-x-8'>
                  {section.links?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className='text-gray-600 hover:text-gray-900 transition-colors'
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </header>
        );

      case 'hero':
        return (
          <section className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='grid lg:grid-cols-2 gap-12 items-center'>
                <div>
                  <h1 className='text-4xl md:text-6xl font-bold mb-6'>
                    {section.title}
                  </h1>
                  <p className='text-xl mb-8 text-blue-100'>
                    {section.description}
                  </p>
                  {section.buttonText && (
                    <Button
                      size='lg'
                      className='bg-white text-blue-600 hover:bg-gray-100'
                    >
                      {section.buttonText}
                    </Button>
                  )}
                </div>
                {section.imageUrl && (
                  <div className='relative h-96'>
                    <Image
                      src={section.imageUrl || '/placeholder.svg'}
                      alt='Hero image'
                      fill
                      className='object-cover rounded-lg'
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'features':
        return (
          <section className='py-20 bg-gray-50'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='text-center mb-16'>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                  {section.title}
                </h2>
                <p className='text-xl text-gray-600'>{section.description}</p>
              </div>
              <div className='grid md:grid-cols-3 gap-8'>
                {section.items?.map((item, index) => (
                  <div
                    key={index}
                    className='bg-white p-6 rounded-lg shadow-sm'
                  >
                    <h3 className='text-xl font-semibold mb-3 text-gray-900'>
                      {item.title}
                    </h3>
                    <p className='text-gray-600'>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'about':
        return (
          <section className='py-20'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='grid lg:grid-cols-2 gap-12 items-center'>
                <div>
                  <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
                    {section.title}
                  </h2>
                  <p className='text-lg text-gray-600'>{section.description}</p>
                </div>
                {section.imageUrl && (
                  <div className='relative h-80'>
                    <Image
                      src={section.imageUrl || '/placeholder.svg'}
                      alt='About image'
                      fill
                      className='object-cover rounded-lg'
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section className='py-20 bg-gray-50'>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='text-center mb-12'>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                  {section.title}
                </h2>
                <p className='text-xl text-gray-600'>{section.description}</p>
              </div>
              <div className='bg-white p-8 rounded-lg shadow-sm'>
                <div className='grid md:grid-cols-2 gap-6'>
                  <Input placeholder='Your Name' />
                  <Input placeholder='Your Email' />
                </div>
                <div className='mt-6'>
                  <textarea
                    className='w-full p-3 border border-gray-300 rounded-md resize-none'
                    rows={4}
                    placeholder='Your Message'
                  />
                </div>
                <div className='mt-6'>
                  <Button className='w-full'>Send Message</Button>
                </div>
              </div>
            </div>
          </section>
        );

      case 'footer':
        return (
          <footer className='bg-gray-900 text-white py-12'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='text-center'>
                <div className='text-2xl font-bold mb-4'>{section.title}</div>
                <p className='text-gray-400 mb-8'>{section.description}</p>
                <div className='flex justify-center space-x-6'>
                  {section.links?.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      className='text-gray-400 hover:text-white transition-colors'
                    >
                      {link.text}
                    </a>
                  ))}
                </div>
                <div className='mt-8 pt-8 border-t border-gray-800 text-gray-400 text-sm'>
                  © {new Date().getFullYear()} {section.title}. All rights
                  reserved.
                </div>
              </div>
            </div>
          </footer>
        );

      default:
        return (
          <div className='p-8 bg-gray-100 text-center'>
            <p className='text-gray-500'>
              Unknown section type: {section.type}
            </p>
          </div>
        );
    }
  };

  return <div className={isPreview ? '' : 'relative'}>{renderSection()}</div>;
};
