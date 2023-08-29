export default async function fetch(
  pathToFile,
  username = 'hackclub',
  repository = 'haxidraw',
  branch = 'main'
) {
  const apiUrl = `https://api.github.com/repos/${username}/${repository}/contents/${pathToFile}?ref=${branch}`
  const response = await fetch(apiUrl)
  if (!response.ok)
    throw new Error(`Failed to retrieve file. Status code: ${response.status}`)
  const json = await response.json()
  const content = atob(json.content)
  return content
}
