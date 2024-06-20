// So that Safari respects hosts file
// sudo cp new_hosts /etc/hosts

const file = await Bun.file("/etc/hosts").text();

const lines = file.split("\n");

let processedLines: string[] = [];

const ipV6Localhost = "::1";

for (const line of lines) {
  if (
    line.startsWith("#") ||
    line.includes("localhost") ||
    line.includes("broadcasthost") ||
    !line.length
  ) {
    processedLines.push(line);
  } else if (!line.startsWith(ipV6Localhost)) {
    processedLines.push(line);
    let newLine = line.replace(/\S+/, ipV6Localhost);
    processedLines.push(newLine);
  }
}

Bun.write("new_hosts", processedLines.join("\n"));
