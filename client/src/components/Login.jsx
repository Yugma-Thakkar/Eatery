import React from 'react'

const Login = () => {
    // basic login page
    return (
        <div>
            <form className="my-5">
                <div className="container w-50">
                    <h1 className="my-5">Welcome back to Eatery !!!</h1>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label for="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-5">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button type="button" className="btn btn-primary my-3">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;