export function removeQueryParam(paramName) {
  // Get the current URL
  let currentUrl = window.location.href

  // Create a URL object from the current URL
  let urlObj = new URL(currentUrl)

  // Remove the query parameter
  urlObj.searchParams.delete(paramName)

  // Get the resulting URL string, after the parameter removal
  let newUrl = urlObj.toString()

  // Update the URL displayed in the browser without reloading the page
  history.replaceState({}, null, newUrl)
}
