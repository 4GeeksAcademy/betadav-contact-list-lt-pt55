// Import necessary components from react-router-dom and other parts of the application.
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Demo = () => {

  const [agendas, setAgendas] = useState([]);

  function createContact() {
    fetch('https://playground.4geeks.com/contact/agendas/David/contacts', {
      method: "POST",
      body: JSON.stringify({
        "name": "Marta",
        "phone": "456",
        "email": "chao@gmail.com",
        "address": "North Africa 1234"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        getContacts()
      })
  }

  function createAgenda() {
    fetch('https://playground.4geeks.com/contact/agendas/David', {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        createContact()
      })
  }

  function getContacts() {
    fetch('https://playground.4geeks.com/contact/agendas/David/contacts')
      .then((response) => {
        if (response.status === 404) {
          return createAgenda();
        }
        return response.json()
      })
      .then((data) => {
        console.log(data)
        dispatch({
          type: 'get_contacts',
          payload: data.contacts
        })
      })

  }

  function deleteContact(id) {
    fetch(`https://playground.4geeks.com/contact/agendas/David/contacts/${id}`, {
      method: "DELETE"
    })
      .then((data) => {
        dispatch({
          type: 'delete_contact',
          payload: data.contacts
        })
        getContacts();
      });

  }

  useEffect(() => {
    getContacts()
  }, [])

  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (

    <div className="container">
      <div className="d-flex flex-row-reverse my-3">
        <Link to="/">
          <button className="btn btn-primary">Add New Contact</button>
        </Link>
      </div>

      <ul className="list-group">
        {/* Map over the 'todos' array from the store and render each item as a list element */}
        {store && store.todos?.map((item) => {
          return (
            <li
              key={item.id}  // React key for list items.
              className="list-group-item d-flex justify-content-between"
              style={{ background: item.background }}>

              {/* Link to the detail page of this todo. */}
              <Link to={"/single/" + item.id}>Link to: {item.title} </Link>

              <p>Open file ./store.js to see the global store that contains and updates the list of colors</p>

              <button className="btn btn-success"
                onClick={() => dispatch({
                  type: "add_task",
                  payload: { id: item.id, color: '#ffa500' }
                })}>
                Change Color
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="list-group">
        {/* Map over the 'todos' array from the store and render each item as a list element */}
        {store && store.contacts?.map((item) => {
          return (
            <>
              <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src="https://picsum.photos/200/300" className="img-fluid rounded-start" alt="..." />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <Link to={"/single/" + item.id}>Link to: {item.slug} </Link>
                      <h5 className="card-title">Name: {item.name}</h5>
                      <p className="card-text">Address: {item.address}</p>
                      <p className="card-text">Phone: {item.phone}</p>
                      <p className="card-text">Email: {item.email}</p>
                      <button className="btn btn-success" onClick={() => createContact()}>New contact</button>
                      <button className="btn btn-warning" onClick={() => deleteContact(item.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
              {/*
                
                  <button className="btn btn-danger"
                    onClick={() => dispatch({
                      type: "delete_contact",
                      payload: { contacts: item.id }
                    })}>
                    Delete contact
                  </button>
              }

                <button className="btn btn-success" 
                  onClick={() => dispatch({
                    type: "add_task", 
                    payload: { id: item.id, color: '#ffa500' }
                  })}>
                  Change Color
                </button> */}

            </>
          );
        })}
      </ul>

    </div>
  );
};
