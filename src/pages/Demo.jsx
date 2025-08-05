// Import necessary components from react-router-dom and other parts of the application.
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Demo = () => {

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
        <Link to="/addNewUser">
          <button className="btn btn-primary">Add New Contact</button>
        </Link>
      </div>

      <ul className="list-group">
        {/* Map over the 'todos' array from the store and render each item as a list element */}
        {store && store.contacts?.map((contact) => {
          return (
            <div className="card mb-3" key={contact.id}>
              <div className="row">
                <div className="col-2 m-2 d-flex justify-content-center">
                  <img src="https://picsum.photos/100/100" className="img-fluid rounded-circle" alt="..." />
                </div>
                <div className="col-6 d-flex row">
                  <h5><Link to={"/single/" + contact.id}> {contact.name} </Link></h5>
                  <p><i className="fa-solid fa-location-dot"></i> {contact.address}</p>
                  <p><i className="fa-solid fa-phone-flip"></i> {contact.phone}</p>
                  <p><i className="fa-solid fa-envelope"></i> {contact.email}</p>
                </div>
                <div className="col-4 d-flex align-items-start justify-content-end">
                  <button className="btn"><i className="fa-solid fa-pencil"></i></button>
                  <button className="btn" onClick={() => deleteContact(contact.id)}><i className="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
            </div>
          );
        })}
      </ul>

    </div>
  );
};
