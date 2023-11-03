import { filter } from 'fuzzaldrin'

export default function Search({ images }) {
  return (
    <input
      autoComplete="off"
      id="search"
      placeholder="Search gallery"
      type="text"
      onChange={event => {
        const query = event.target.value
        const results = filter(images, query, { key: 'title' })
        return results
      }}
    />
  )
}
