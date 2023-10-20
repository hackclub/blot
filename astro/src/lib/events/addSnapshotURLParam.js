import { loadCodeFromString } from '../loadCodeFromString.ts'

export async function addSnapshotURLParam() {
  const currentUrl = new URL(window.location.href)

  const snapshotValue = currentUrl.searchParams.get('share')

  if (!snapshotValue) return

  try {
    const response = await fetch(`/api/art/snapshot?share=${snapshotValue}`)
    const snapshot = await response.json()

    if (snapshot.art) loadCodeFromString(snapshot.art?.code)
  } catch (error) {
    console.error('Error fetching content:', error)
  }
}
