// Import necessary components from react-router-dom and other parts of the application.
import { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.

export const Demo = () => {

  const [agendas, setAgendas] = useState([]);

  function getAgendas() {
    fetch('https://playground.4geeks.com/contact/agendas/David/contacts')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        dispatch({
          type: 'get_agendas',
          payload: data.contacts
        })
      });
  }

  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer()

  return (
    <div className="container">
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
            <li
              key={item.id}  // React key for list items.
              className="list-group-item d-flex justify-content-between"
              style={{ background: item.background }}>
                
                <Link to={"/single/" + item.id}>Link to: {item.slug} </Link>
                <p>
                  {item.name}
                </p>
                <p>
                  {item.phone}
                </p>

              {/* Link to the detail page of this todo. */}
              

              {/* <button className="btn btn-success" 
                onClick={() => dispatch({
                  type: "add_task", 
                  payload: { id: item.id, color: '#ffa500' }
                })}>
                Change Color
              </button> */}
            </li>
          );
        })}
      </ul>
      <button className="btn btn-danger" onClick={() => getAgendas()}>Get agendas</button>

      {/* <div className="card mb-3" style={{maxWidth: '540px'}}>
				<div className="row g-0">
					<div className="col-md-4">
						<img src="https://picsum.photos/200/300" className="img-fluid rounded-start" alt="..."/>
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h5 className="card-title">Card title</h5>
							<p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
							<p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              <button className="btn btn-success" 
                onClick={() => dispatch({
                  type: "add_task", 
                  payload: { id: item.id, color: '#ffa500' }
                })}>
                Change Color
              </button>
						</div>
					</div>
				</div>
			</div> */}

      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
