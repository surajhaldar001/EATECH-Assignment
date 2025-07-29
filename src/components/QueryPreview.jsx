import React from 'react';
import { generateQueryJSON } from '../utils/queryGenerator';

export default function QueryPreview({ rules }) {
  return (
    <div className='w-100 overflow-auto'>
      <h5>Live Query Preview</h5>
      <pre className="p-3 bg-light"
      style={{
          maxHeight: '200px',   // cap the height
          maxWidth: '100%',     // cap the width to parent
          overflow: 'auto',     // enable both vertical & horizontal scrolling
          whiteSpace: 'pre',    // preserve all spacing and enable horizontal scroll
        }}
      >
        {generateQueryJSON(rules)}
      </pre>
    </div>
  );
}
