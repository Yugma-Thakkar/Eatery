import React from "react";
import Navbar from "./Navbar";

const Register = () => {
    return (
        // basic register page
        <div>
            <Navbar></Navbar>
            <form className="my-5">
                <div className="container w-50">

                    <h1 className="my-5">Register Now</h1>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">First Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Last Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Phone Number</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-floating mb-5">
                        <input type="password" className="form-control" placeholder="Password" />
                        <label htmlFor="floatingPassword">Confirm Password</label>
                    </div>
                    <button type="button" className="btn btn-primary my-3">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register;
