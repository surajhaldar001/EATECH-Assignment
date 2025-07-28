import React, { useState } from 'react';
import {
  TYPE_OPTIONS,
  FIELD_MAP,
  OPERATOR_OPTIONS,
  VALUE_MAP,
  NEXT_OPTIONS
} from '../constants';

export default function RuleItem({ rule: r, dispatch, braceMatch }) {
  const [editing, setEditing] = useState(false);
  const [type,   setType]     = useState(r.type);
  const [field,  setField]    = useState(r.field);
  const [op,     setOp]       = useState(r.operator);
  const [value,  setValue]    = useState(r.value);
  const [nextOp, setNextOp]   = useState(r.next);

  const fields = type ? FIELD_MAP[type] : [];
  const values = type && field ? VALUE_MAP[type][field] : [];

  const save = () => {
    if (!type || !field || !op || !value || !nextOp) {
      return alert('Please complete all selections before saving.');
    }
    dispatch({
      type: 'UPDATE_RULE',
      payload: {
        id: r.id,
        updates: { type, field, operator: op, value, next: nextOp }
      }
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <li className="list-group-item">
        <div className="row g-2 align-items-end">
          <div className="col">
            <select
              className="form-select"
              value={type}
              onChange={e => {
                setType(e.target.value);
                setField(''); setOp(''); setValue(''); setNextOp('');
              }}
            >
              <option value="">Select Type</option>
              {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* Field */}
          <div className="col">
            <select
              className="form-select"
              value={field}
              disabled={!type}
              onChange={e => {
                setField(e.target.value);
                setOp(''); setValue(''); setNextOp('');
              }}
            >
              <option value="">Select Field</option>
              {fields.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>

          {/* Operator */}
          <div className="col">
            <select
              className="form-select"
              value={op}
              disabled={!field}
              onChange={e => {
                setOp(e.target.value);
                setValue(''); setNextOp('');
              }}
            >
              <option value="">Select Operator</option>
              {OPERATOR_OPTIONS.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          {/* Value */}
          <div className="col">
            <select
              className="form-select"
              value={value}
              disabled={!op}
              onChange={e => {
                setValue(e.target.value);
                setNextOp('');
              }}
            >
              <option value="">Select Value</option>
              {values.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>

          {/* Next */}
          <div className="col">
            <select
              className="form-select"
              value={nextOp}
              disabled={!value}
              onChange={e => setNextOp(e.target.value)}
            >
              <option value="">Select Next Operator</option>
              {NEXT_OPTIONS.map(n => <option key={n}>{n}</option>)}
            </select>
          </div>

          <div className="col-auto">
            <button className="btn btn-primary btn-sm me-1" onClick={save}>
              Save
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  // VIEW MODE
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        {/* opening braces badges */}
        {Array.from({ length: r.groupStart }).map((_, idx) => (
          <span
            key={`s${idx}`}
            className={
              'badge me-1 ' +
              (braceMatch.startMatches[idx] ? 'bg-success' : 'bg-danger')
            }
          >
            {'{'}
          </span>
        ))}

        {r.type}--&gt;<strong>{r.field}</strong> {r.operator} <em>{r.value}</em>

        {/* closing braces badges */}
        {Array.from({ length: r.groupEnd }).map((_, idx) => (
          <span
            key={`e${idx}`}
            className={
              'badge ms-1 ' +
              (braceMatch.endMatches[idx] ? 'bg-success' : 'bg-danger')
            }
          >
            {'}'}
          </span>
        ))}

        <span className="text-secondary ms-2">[{r.next}]</span>
      </div>

      <div className="btn-group btn-group-sm">
        {/* Add open brace */}
        <button
          className="btn btn-outline-primary"
          onClick={() =>
            dispatch({ type: 'INCREMENT_GROUP_START', payload: r.id })
          }
          title="Add `{`"
        >
          {'{'}
        </button>

        {/* Remove open brace */}
        <button
          className="btn btn-outline-warning"
          onClick={() =>
            dispatch({ type: 'DECREMENT_GROUP_START', payload: r.id })
          }
          disabled={r.groupStart === 0}
          title="Remove `{`"
        >
          -{'{'}
        </button>

        {/* Add open brace */}
        <button
          className="btn btn-outline-primary"
          onClick={() =>
            dispatch({ type: 'INCREMENT_GROUP_END', payload: r.id })
          }
          title="Add `}`"
        >
          {'}'}
        </button>

        {/* Remove close brace */}
        <button
          className="btn btn-outline-warning"
          onClick={() =>
            dispatch({ type: 'DECREMENT_GROUP_END', payload: r.id })
          }
          disabled={r.groupEnd === 0}
          title="Remove `}`"
        >
          -{'}'}
        </button>

        {/* Edit rule */}
        <button
          className="btn btn-outline-secondary"
          onClick={() => setEditing(true)}
          title="Edit rule"
        >
          🖍
        </button>

        {/* Remove the entire Rule */}
        <button
          className="btn btn-outline-danger"
          onClick={() =>
            dispatch({ type: 'REMOVE_RULE', payload: r.id })
          }
          title="Remove rule"
        >
          &times;
        </button>
      </div>
    </li>
  );
}
