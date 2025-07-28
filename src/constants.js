// src/constants.js
import dummyData from './data/dummyData';

// All available types
export const TYPE_OPTIONS = dummyData.map(item => item.type);

// For each type, list of its field names
export const FIELD_MAP = dummyData.reduce((acc, item) => {
  acc[item.type] = item.fields.map(f => f.name);
  return acc;
}, {});

// For each [type][field], list of its possible values
export const VALUE_MAP = dummyData.reduce((acc, item) => {
  acc[item.type] = item.fields.reduce((fm, f) => {
    fm[f.name] = f.values;
    return fm;
  }, {});
  return acc;
}, {});

// Static operator & next‑clause lists
export const OPERATOR_OPTIONS = ['=', '!=', '>', '<', 'LIKE'];
export const NEXT_OPTIONS     = ['AND', 'OR', 'END'];
