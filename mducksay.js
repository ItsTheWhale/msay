let message = "";

if (Deno.args.length) {
    message = Deno.args.join(' ');
} else {
    const decoder = new TextDecoder();
    for await (const chunk of Deno.stdin.readable) {
        message += decoder.decode(chunk);
    }
}

let lines = message.trim().split('\n');
let maxLineWidth = 0;

if (lines.length === 1) {
    maxLineWidth = lines[0].length;
    lines[0] = "< " + lines[0] + " >";
} else {
    for (const i in lines) {
        lines[i] = lines[i].trim();
        if (lines[i].length > maxLineWidth) maxLineWidth = lines[i].length;
    }
    for (const i in lines) {
        lines[i] = ((i === '0') ?
            '/'
            : (i === String(lines.length - 1) ?
                '\\'
                : '|'
            )) + ' '.repeat(Math.ceil((maxLineWidth - lines[i].length) / 2) + 1) + lines[i] + ' '.repeat(Math.floor((maxLineWidth - lines[i].length) / 2) + 1) + ((i === '0') ?
                '\\'
                : (i === String(lines.length - 1) ?
                    '/'
                    : '|'
                ));
    }
}

console.log(`
 ${'_'.repeat(maxLineWidth + 2)}
${lines.join('\n')}
 ${'-'.repeat(maxLineWidth + 2)}
 
  __
 /  \\
< ^  \\______
 \\    ___>  /
  \\________/
     v  v
`);
