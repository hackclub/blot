// Utilties for guides

export const slug = (file: string) =>
  file.replace('.md', '').slice(file.lastIndexOf('/') + 1)

export const description = (raw: string) => {
  let excerpt = 'No excerpt provided.'
  let nlnl = raw.trim().indexOf('\n\n')
  if (nlnl !== -1) excerpt = `${raw.slice(0, nlnl)}...`
  return excerpt
}
