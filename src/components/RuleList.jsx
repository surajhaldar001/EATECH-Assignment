import React from 'react';
import RuleItem from './RuleItem';

export default function RuleList({ state, dispatch }) {
  const { rules } = state;

  const stack = [];
  const matches = rules.map(r => ({
    startMatches: Array(r.groupStart).fill(false),
    endMatches:   Array(r.groupEnd).fill(false),
  }));

  rules.forEach((r, i) => {
    // match starts
    for (let s = 0; s < r.groupStart; s++) {
      stack.push({ ruleIndex: i, startPos: s });
    }
    // match ends
    for (let e = 0; e < r.groupEnd; e++) {
      const top = stack.pop();
      if (top) {
        // mark matched
        matches[top.ruleIndex].startMatches[top.startPos] = true;
        matches[i].endMatches[e] = true;
      }
      
    }
  });

  if (rules.length === 0) {
    return <p className="text-muted">No rules yet.</p>;
  }

  return (
    <ul className="list-group mb-4">
      {rules.map((r, i) => (
        <RuleItem
          key={r.id}
          rule={r}
          dispatch={dispatch}
          braceMatch={matches[i]}
        />
      ))}
    </ul>
  );
}
