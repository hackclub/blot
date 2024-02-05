export function extractFrontmatter(markdown) {
  // Regular expression to match frontmatter: starts with ---, ends with ---, and captures content in-between
  const frontmatterRegex = /^---\n([\s\S]+?)\n---/;
  const match = markdown.match(frontmatterRegex);

  if (!match) {
    return null; // or {} depending on how you want to handle documents without frontmatter
  }

  const frontmatterContent = match[1];
  const lines = frontmatterContent.split('\n');
  const frontmatter = {};

  lines.forEach(line => {
    const [key, ...value] = line.split(': ');
    frontmatter[key] = value.join(': '); // Re-join in case there are colons in the value
  });

  return frontmatter;
}