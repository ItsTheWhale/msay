let message = "";

if (Deno.args.length) {
    message = Deno.args.join(' ');
} else {
    const decoder = new TextDecoder();
    for await (const chunk of Deno.stdin.readable) {
        message += decoder.decode(chunk);
    }
}

console.log(` ${'_'.repeat(message.length + 2)}
< ${message} >
 ${'-'.repeat(message.length + 2)}
     \\ /     
  ____|____   ____
 /         \\  \\  /
|  ^        \\_\/ /
 \\_____________/`);
