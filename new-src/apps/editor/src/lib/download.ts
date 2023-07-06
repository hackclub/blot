export default function download(filename: string, text: string) {
    const blob = new Blob([text], { type: "text/plain" });
  
    var link = document.createElement("a"); // Or maybe get it from the current document
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}`;
    link.click();
    URL.revokeObjectURL(link.href);
}