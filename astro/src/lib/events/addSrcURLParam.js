import { loadCodeFromString } from '../loadCodeFromString.ts'

export async function addSrcURLParam() {
  const currentUrl = new URL(window.location.href)

  const srcValue = currentUrl.searchParams.get('src')

  if (!srcValue) return

  try {
    const response = await fetch(srcValue)
    const content = await response.text()

    loadCodeFromString(content)
  } catch (error) {
    console.error('Error fetching content:', error)
  }
}
