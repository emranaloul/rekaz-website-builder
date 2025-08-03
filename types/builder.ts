export type Item = {
  title: string;
  description: string;
  icon?: string;
};

export type SectionType =
  | 'header'
  | 'hero'
  | 'features'
  | 'footer'
  | 'about'
  | 'contact';

export type Link = {
  text: string;
  url: string;
};

export interface SectionData {
  id: string;
  type: SectionType;
  title: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: Array<Item>;
  links?: Array<Link>;
}

export interface BuilderState {
  sections: SectionData[];
  selectedSectionId: string | null;
}

export type BuilderAction =
  | { type: 'ADD_SECTION'; payload: SectionData }
  | {
      type: 'UPDATE_SECTION';
      payload: { id: string; data: Partial<SectionData> };
    }
  | { type: 'DELETE_SECTION'; payload: string }
  | { type: 'REORDER_SECTIONS'; payload: SectionData[] }
  | { type: 'SELECT_SECTION'; payload: string | null }
  | { type: 'LOAD_DESIGN'; payload: SectionData[] }
  | { type: 'CLEAR_DESIGN' };

export interface SectionTemplate {
  id: string;
  name: string;
  type: string;
  preview: string;
  defaultData: Omit<SectionData, 'id'>;
}
