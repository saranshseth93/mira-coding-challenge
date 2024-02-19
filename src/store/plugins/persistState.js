// src/store/plugins/persistState.js
export function persistState(storageKey = 'appState') {
  return store => {
    // Attempt to load and parse the saved state
    const storedState = localStorage.getItem(storageKey)
    if (storedState) {
      const parsedState = JSON.parse(storedState, (key, value) => {
        // Custom parsing logic could go here
        // For example, converting timestamps back into Date objects
        if (key === 'created_at') {
          return new Date(value)
        }
        return value
      })
      store.replaceState(Object.assign(store.state, parsedState))
    }

    store.subscribe((mutation, state) => {
      // Convert and save the state to localStorage
      localStorage.setItem(storageKey, JSON.stringify(state, (key, value) => {
        // Custom stringification logic could go here
        // This is useful if you need to handle special object types
        // For now, we don't need any customization
        return value
      }))
    })
  }
}
