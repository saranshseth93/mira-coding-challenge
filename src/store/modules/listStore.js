function generateUuid () {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
}

const defaultStates = () => {
  return {
    list: [
      {
        uuid: generateUuid(),
        type: 'note',
        title: 'Hello World',
        value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut erat eros, auctor sit amet molestie eget, rhoncus sit amet erat. Vivamus leo magna, semper eu sollicitudin eget, ornare ut velit. \n\nVivamus elementum placerat orci. Phasellus sollicitudin massa aliquam, sodales erat ac, volutpat dui. Sed ut purus vulputate, fermentum nunc eget, consectetur mauris.',
        created_at: Date.parse('2024-01-24T13:53:00')
      },
      {
        uuid: generateUuid(),
        type: 'checklist',
        title: null,
        created_at: Date.parse('2024-01-24T15:13:00'),
        value: [
          {
            label: 'Do laundry',
            done: false
          },
          {
            label: 'Cook dinner',
            done: true
          },
          {
            label: 'Walk dog',
            done: false
          }
        ]
      }
    ]
  }
}

export default {
  namespaced: true,
  state: defaultStates(),
  mutations: {
    addListItem (state, payload) {
      payload.uuid = generateUuid()
      payload.created_at = Date.now()
      state.list.push(payload)
    },
    removeListItem (state, key) {
      state.list.splice(key, 1)
    },
    updateListItemLabel(state, { uuid, label }) {
      const itemIndex = state.list.findIndex(item => item.uuid === uuid)
      if (itemIndex !== -1) {
        state.list[itemIndex].label = label
      }
    }
  },
  getters: {
    getList: state => state.list
  }
}
