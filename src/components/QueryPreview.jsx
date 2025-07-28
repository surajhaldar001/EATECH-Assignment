import React from 'react';
import { generateQueryJSON } from '../utils/queryGenerator';

export default function QueryPreview({ rules }) {
  return (
    <div>
      <h5>Live Query Preview</h5>
      <pre className="p-3 bg-light">
        {generateQueryJSON(rules)}
      </pre>
    </div>
  );
}
