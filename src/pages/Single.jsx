// Import necessary hooks and components from react-router-dom and other libraries.
import { Link, useParams } from "react-router-dom";  // To use link for navigation and useParams to get URL parameters
import PropTypes from "prop-types";  // To define prop types for this component
import rigoImageUrl from "../assets/img/rigo-baby.jpg"  // Import an image asset
import useGlobalReducer from "../hooks/useGlobalReducer";  // Import a custom hook for accessing the global state

// Define and export the Single component which displays individual item details.
export const Single = props => {
  // Access the global state using the custom hook.
  const { store } = useGlobalReducer()

  // Retrieve the 'theId' URL parameter using useParams hook.
  const { theId } = useParams()
  const singleContact = store.contacts.find(contact => contact.id === parseInt(theId));

  return (
    <div className="d-flex row justify-content-center">
      {/* Display the title of the todo element dynamically retrieved from the store using theId. */}

      <div className="card mt-4" style={{width: "18rem"}}>
        <img src="https://picsum.photos/100/100" className="card-img-top" alt="..."/>
          <div className="card-body">
            <p className="card-text"><strong>Name:</strong> {singleContact?.name}</p>
            <p className="card-text"><strong>Address:</strong> {singleContact?.address}</p>
            <p className="card-text"><strong>Phone:</strong> {singleContact?.phone}</p>
            <p className="card-text"><strong>Email:</strong> {singleContact?.email}</p>
          </div>
      </div>

      <hr className="my-4" />  {/* A horizontal rule for visual separation. */}

      {/* A Link component acts as an anchor tag but is used for client-side routing to prevent page reloads. */}
      <div className="d-flex justify-content-center">
        <Link to="/">
        <span className="btn btn-primary btn-lg " href="#" role="button">
          Back home
        </span>
      </Link>
      </div>
    </div>
  );
};

// Use PropTypes to validate the props passed to this component, ensuring reliable behavior.
Single.propTypes = {
  // Although 'match' prop is defined here, it is not used in the component.
  // Consider removing or using it as needed.
  match: PropTypes.object
};
