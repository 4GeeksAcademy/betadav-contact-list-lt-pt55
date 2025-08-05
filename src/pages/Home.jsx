import { Link } from "react-router-dom";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="mb-3">
					<label htmlFor="formGroupExampleInput" className="form-label">Full Name</label>
					<input type="text" className="form-control" id="formGroupExampleInput" placeholder="Full Name" />
				</div>
				<div className="mb-3">
					<label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
					<input type="email" className="form-control" id="formGroupExampleInput2" placeholder="Enter email" />
				</div>
				<div className="mb-3">
					<label htmlFor="formGroupExampleInput" className="form-label">Phone</label>
					<input type="number" className="form-control" id="formGroupExampleInput" placeholder="Enter phone" />
				</div>
				<div className="mb-3">
					<label htmlFor="formGroupExampleInput2" className="form-label">Address</label>
					<input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Enter address" />
				</div>
				<button className="col rounded btn btn-primary" onClick={() => createContact()} type="button">Save</button>
				<Link to="/demo">
					<span className="mb-0">or get back to home</span>
				</Link>
			</div>
			
		</div>
	);
}; 