// src/components/RuleForm.jsx
import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  TYPE_OPTIONS,
  FIELD_MAP,
  OPERATOR_OPTIONS,
  VALUE_MAP,
  NEXT_OPTIONS
} from '../constants';

export default function RuleForm({ dispatch, lastOp }) {
  const [type,   setType]   = useState('');
  const [field,  setField]  = useState('');
  const [op,     setOp]     = useState('');
  const [value,  setValue]  = useState('');
  const [nextOp, setNextOp] = useState('');

  const fields   = type   ? FIELD_MAP[type]           : [];
  const values   = type&&field ? VALUE_MAP[type][field] : [];

  const handleAdd = e => {
    e.preventDefault();
    if (!type||!field||!op||!value||!nextOp) {
      return alert('Please select every dropdown before adding.');
    }
    dispatch({
      type: 'ADD_RULE',
      payload: {
        id: uuid(),
        type,
        field,
        operator: op,
        value,
        next: nextOp
      }
    });
    // reset
    setType(''); setField(''); setOp(''); setValue(''); setNextOp('');
  };

  return (
    <form className="row g-2 align-items-end mb-4 p-2 border border-2 rounded-2" onSubmit={handleAdd} style={{border:'var(--bs-list-group-border-width) solid var(--bs-list-group-border-color)'}}>
      <div className="col-sm">
        <label className="form-label" htmlFor='type'>Type</label>
        <select
          className="form-select"
          value={type}
          onChange={e => {
            setType(e.target.value);
            setField(''); setOp(''); setValue(''); setNextOp('');
          }}
          id='type'
          name='type'
        >
          <option value="">Select Type</option>
          {TYPE_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="col-sm">
        <label className="form-label" htmlFor='field'>Field</label>
        <select
          className="form-select"
          value={field}
          disabled={!type}
          onChange={e => {
            setField(e.target.value);
            setOp(''); setValue(''); setNextOp('');
          }}
          id='field'
          name='field'
        >
          <option value="">Select Field</option>
          {fields.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>

      <div className="col-sm">
        <label className="form-label" htmlFor='operator'>Operator</label>
        <select
          className="form-select"
          value={op}
          disabled={!field}
          onChange={e => {
            setOp(e.target.value);
            setValue(''); setNextOp('');
          }}
          id='operator'
          name='operator'
        >
          <option value="">Select Operator</option>
          {OPERATOR_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div className="col-sm">
        <label className="form-label" htmlFor='value'>Value</label>
        <select
          className="form-select"
          value={value}
          disabled={!op}
          onChange={e => {
            setValue(e.target.value);
            setNextOp('');
          }}
          id='value'
          name='value'
        >
          <option value="">Select Value</option>
          {values.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <div className="col-sm">
        <label className="form-label" htmlFor='next'>Next</label>
        <select
          className="form-select"
          value={nextOp}
          disabled={!value}
          onChange={e => setNextOp(e.target.value)}
          id='next'
          name='next'
        >
          <option value="">Select Next Operator</option>
          {NEXT_OPTIONS.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      <div className="col-auto">
        <button type="submit" className="btn btn-success" disabled={lastOp==='END'}>+ Add</button>
      </div>
    </form>
  );
}
