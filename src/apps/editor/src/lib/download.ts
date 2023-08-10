export default function download(filename: string, data: string | Blob) {
    if(typeof data === "string") data = new Blob([data], { type: "text/plain" });
  
    const link = document.createElement("a"); // Or maybe get it from the current document
    link.href = URL.createObjectURL(data as Blob);
    link.download = `${filename}`;
    link.click();
    URL.revokeObjectURL(link.href);
}