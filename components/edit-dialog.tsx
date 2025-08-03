import { SectionData } from '@/types/builder';
import { motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useBuilder } from '@/lib/builder-context';

type Props = {
  section: SectionData;
  setIsEditing: (isEditing: boolean) => void;
};
const EditDialog: FC<Props> = ({ section, setIsEditing }) => {
  const [editData, setEditData] = useState(section);
  const handleCancel = () => {
    setEditData(section);
    setIsEditing(false);
  };
  const { dispatch } = useBuilder();

  const updateEditData = (field: string, value: any) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const updateArrayItem = (
    arrayField: string,
    index: number,
    field: string,
    value: string
  ) => {
    setEditData((prev) => ({
      ...prev,
      [arrayField]: (
        prev[arrayField as keyof SectionData] as
          | SectionData['items']
          | SectionData['links']
      )?.map((item: any, i: number) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_SECTION',
      payload: { id: section.id, data: editData },
    });
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
    >
      <Card className='w-full max-w-2xl max-h-[80vh] overflow-y-auto'>
        <CardContent className='p-6'>
          <h3 className='text-lg font-semibold mb-4 capitalize'>
            Edit {section.type} Section
          </h3>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium mb-2'>Title</label>
              <Input
                value={editData.title}
                onChange={(e) => updateEditData('title', e.target.value)}
              />
            </div>

            {editData.description && (
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Description
                </label>
                <Textarea
                  value={editData.description}
                  onChange={(e) =>
                    updateEditData('description', e.target.value)
                  }
                  rows={3}
                />
              </div>
            )}

            {editData.imageUrl && (
              <div>
                <label className='block text-sm font-medium mb-2'>
                  Image URL
                </label>
                <Input
                  value={editData.imageUrl}
                  onChange={(e) => updateEditData('imageUrl', e.target.value)}
                  placeholder='https://example.com/image.jpg'
                />
              </div>
            )}

            {editData.buttonText && (
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium mb-2'>
                    Button Text
                  </label>
                  <Input
                    value={editData.buttonText}
                    onChange={(e) =>
                      updateEditData('buttonText', e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium mb-2'>
                    Button URL
                  </label>
                  <Input
                    value={editData.buttonUrl}
                    onChange={(e) =>
                      updateEditData('buttonUrl', e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {editData.items && (
              <div>
                <label className='block text-sm font-medium mb-2'>Items</label>
                {editData.items.map((item, index) => (
                  <div key={index} className='border p-3 rounded mb-2'>
                    <Input
                      value={item.title}
                      onChange={(e) =>
                        updateArrayItem('items', index, 'title', e.target.value)
                      }
                      placeholder='Item title'
                      className='mb-2'
                    />
                    <Textarea
                      value={item.description}
                      onChange={(e) =>
                        updateArrayItem(
                          'items',
                          index,
                          'description',
                          e.target.value
                        )
                      }
                      placeholder='Item description'
                      rows={2}
                    />
                  </div>
                ))}
              </div>
            )}

            {editData.links && (
              <div>
                <label className='block text-sm font-medium mb-2'>Links</label>
                {editData.links.map((link, index) => (
                  <div key={index} className='grid grid-cols-2 gap-2 mb-2'>
                    <Input
                      value={link.text}
                      onChange={(e) =>
                        updateArrayItem('links', index, 'text', e.target.value)
                      }
                      placeholder='Link text'
                    />
                    <Input
                      value={link.url}
                      onChange={(e) =>
                        updateArrayItem('links', index, 'url', e.target.value)
                      }
                      placeholder='Link URL'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='flex justify-end space-x-2 mt-6'>
            <Button variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EditDialog;
