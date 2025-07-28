import { useReducer } from 'react';

const initialState = { rules: [] };

function reducer(state, action) {
  const { rules } = state;

  switch (action.type) {
    case 'ADD_RULE':
      return {
        rules: [
          ...rules,
          {
            ...action.payload,
            groupStart: 0,
            groupEnd:   0,
          },
        ],
      };

    case 'REMOVE_RULE':
      return {
        rules: rules.filter(r => r.id !== action.payload),
      };

    case 'UPDATE_RULE':
      return {
        rules: rules.map(r =>
          r.id === action.payload.id
            ? { ...r, ...action.payload.updates }
            : r
        ),
      };

    case 'INCREMENT_GROUP_START':
      return {
        rules: rules.map(r =>
          r.id === action.payload
            ? { ...r, groupStart: r.groupStart + 1 }
            : r
        ),
      };

    case 'DECREMENT_GROUP_START':
      return {
        rules: rules.map(r =>
          r.id === action.payload
            ? { ...r, groupStart: Math.max(r.groupStart - 1, 0) }
            : r
        ),
      };

    case 'INCREMENT_GROUP_END':
      return {
        rules: rules.map(r =>
          r.id === action.payload
            ? { ...r, groupEnd: r.groupEnd + 1 }
            : r
        ),
      };

    case 'DECREMENT_GROUP_END':
      return {
        rules: rules.map(r =>
          r.id === action.payload
            ? { ...r, groupEnd: Math.max(r.groupEnd - 1, 0) }
            : r
        ),
      };

    default:
      return state;
  }
}

export default function useRuleBuilder() {
  return useReducer(reducer, initialState);
}
