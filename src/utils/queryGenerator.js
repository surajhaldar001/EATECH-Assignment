export function generateQueryJSON(rules) {
    const lines = [];
    let indent = 1;
    const pad = level => '  '.repeat(Math.abs(level));
    if (rules.length > 0)
        lines.push('{')
    rules.forEach(r => {
        // open braces
        for (let i = 0; i < r.groupStart; i++) {
            lines.push(pad(indent) + '{');
            indent++;
        }

        // rule line
        const content = [
            `Type: ${r.type}`,
            `Field: ${r.field}`,
            `Operator: ${r.operator}`,
            `Value: ${r.value}`,
            `Next: ${r.next}`
        ].join(', ');
        lines.push(pad(indent) + `{${content}}`);

        // close braces
        for (let i = 0; i < r.groupEnd; i++) {
            indent--;
            lines.push(pad(indent) + '}');
        }
    });

    //Sample use case
    let str = '';
    rules.forEach((r, i) => {
        if (r.groupStart) str += '('.repeat(r.groupStart);
        str += `${r.field} ${r.operator} ${r.value}`;
        if (r.groupEnd) str += ')'.repeat(r.groupEnd);
        if (r.next && i < rules.length - 1) {
            str += ` ${r.next} `;
        }
    });
    console.log(`Sample usecase:- ${str}`)

    
    if (lines.length > 1)
        lines.push('}')

    return lines.length
        ? lines.join('\n')
        : '— no rules defined —';


}
