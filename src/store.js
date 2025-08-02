export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make lunch",
        background: null,
      }
    ],
    contacts: [
      {
        name: "David quemado",
        phone: "7"
      }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case 'add_task':

      // const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    case 'get_agendas':

      return {
        ...store,
        contacts: action.payload,
      };
    default:
      throw Error('Unknown action.');
  }
}
