export function searchParams(query) {
  return new URL(window.location.href).searchParams.get(query)
}
