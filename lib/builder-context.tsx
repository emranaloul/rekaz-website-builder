'use client';

import type React from 'react';
import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { BuilderState, BuilderAction } from '@/types/builder';

const initialState: BuilderState = {
  sections: [],
  selectedSectionId: null,
};

function builderReducer(
  state: BuilderState,
  action: BuilderAction
): BuilderState {
  switch (action.type) {
    case 'ADD_SECTION':
      return {
        ...state,
        sections: [...state.sections, action.payload],
      };

    case 'UPDATE_SECTION':
      return {
        ...state,
        sections: state.sections.map((section) =>
          section.id === action.payload.id
            ? { ...section, ...action.payload.data }
            : section
        ),
      };

    case 'DELETE_SECTION':
      return {
        ...state,
        sections: state.sections.filter(
          (section) => section.id !== action.payload
        ),
        selectedSectionId:
          state.selectedSectionId === action.payload
            ? null
            : state.selectedSectionId,
      };

    case 'REORDER_SECTIONS':
      return {
        ...state,
        sections: action.payload,
      };

    case 'SELECT_SECTION':
      return {
        ...state,
        selectedSectionId: action.payload,
      };

    case 'LOAD_DESIGN':
      return {
        ...state,
        sections: action.payload,
        selectedSectionId: null,
      };

    case 'CLEAR_DESIGN':
      return initialState;

    default:
      return state;
  }
}

const BuilderContext = createContext<{
  state: BuilderState;
  dispatch: React.Dispatch<BuilderAction>;
} | null>(null);

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(builderReducer, initialState);

  return (
    <BuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}
