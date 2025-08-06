import { Link, useParams } from "react-router-dom";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useState } from "react";

export const EditContacts = () => {

    const { store } = useGlobalReducer()
    const { Id } = useParams()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')

    function editContact(id) {
            fetch(`https://playground.4geeks.com/contact/agendas/David/contacts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        "name": name,
        "phone": phone,
        "email": email,
        "address": address
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        setName('')
        setPhone('')
        setEmail('')
        setAddress('')
      })
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center">
                <h1>Add a new contact</h1>
            </div>
            <div className="row">
                {name == '' ?
                    <div className="alert alert-danger" role="alert">
                        Debes completar todos los
                    </div>
                    : null}

                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="formGroupExampleInput" placeholder="Full Name" value={name} onChange={(e) => {
                        setName(e.target.value)
                    }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                    <input type="email" className="form-control" id="formGroupExampleInput2" placeholder="Enter email" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Phone</label>
                    <input type="number" className="form-control" id="formGroupExampleInput" placeholder="Enter phone" value={phone} onChange={(e) => {
                        setPhone(e.target.value)
                    }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Address</label>
                    <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter address" value={address} onChange={(e) => {
                        setAddress(e.target.value)
                    }} />
                </div>
                <button className="col rounded btn btn-primary" onClick={() => editContact(Id)} type="button">Save</button>
                <Link to="/">
                    <span className="mb-0">or get back to home</span>
                </Link>
            </div>

        </div>
    );
}; 