// So that Safari respects hosts file: https://apple.stackexchange.com/a/259721/234534
// 1. bun run index.ts
// 2. sudo cp new_hosts /etc/hosts

const file = await Bun.file("/etc/hosts").text();

const lines = file.split("\n");

let processedLines: string[] = [];

const ipV6 = "::1";

for (const line of lines) {
  if (
    line.startsWith("#") ||
    line.includes("localhost") ||
    line.includes("broadcasthost") ||
    !line.length
  ) {
    processedLines.push(line);
  } else if (!line.startsWith(ipV6)) {
    processedLines.push(line);
    let newLine = line.replace(/\S+/, ipV6);
    processedLines.push(newLine);
  }
}

Bun.write("new_hosts", processedLines.join("\n"));
