import React from 'react';
import useRuleBuilder from '../hooks/useRuleBuilder';
import RuleForm    from './RuleForm';
import RuleList    from './RuleList';
import QueryPreview from './QueryPreview';

export default function RuleBuilder() {
  const [state, dispatch] = useRuleBuilder();
const lastOp = state.rules.length? state.rules[state.rules.length-1].next:''
  return (
    <>
      <RuleForm dispatch={dispatch} lastOp={lastOp}/>
      <RuleList state={state} dispatch={dispatch} />
      <QueryPreview rules={state.rules} />
    </>
  );
}
