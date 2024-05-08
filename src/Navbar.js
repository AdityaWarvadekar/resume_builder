import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const resume = props.resume;
    const PORT = "https://resume-builder-9nte.onrender.com";
    const loginRef = useRef(null);
    const signUpRef = useRef(null);

    const [login, setLogin] = useState({
        uName: "",
        pwd: ""
    });
    const [signup, setSignup] = useState({
        uName: "",
        pwd: "",
        cpwd: ""
    });



    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`${PORT}/login`, {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
                username: login.uName,
                password: login.pwd
            })
        });
        const json = await response.json();
        console.log("RESPONSE::: ", json);
        if (json.status === 'ok') {
            localStorage.setItem("token", json.authToken);
            alert("Logged in Sucessfully");
            window.location.href = "/";
            setLogin({
                uName: "",
                pwd: ""
            });
        }
        else
            alert(json.status + ":" + json.msg);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        if(signup.pwd!==signup.cpwd){
            alert("Passwords Don't Match!");
            return;
        }
        const response = await fetch(`${PORT}/signup`, {method: "POST", headers:{
        "Content-Type": "application/json"
        },body: JSON.stringify({
            username: signup.uName,
            password: signup.pwd
        })});
        const json = await response.json();
        if(json.status==='ok'){
            alert("Signed Up Successfully!");
            window.location.reload();
            setSignup({
                uName: "",
                pwd: "",
                cpwd: ""
            });
        }
        else
            alert(json.status," : ",json.msg);
    };


    const loginModal = () => {
        return (
            <>
                <button type="button" class="btn btn-primary d-none" ref={loginRef} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                                <form onSubmit={handleLogin}>
                                    <div class="form-group my-3">
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" class="form-control" id="exampleInputEmail1" name="uName" value={login.uName} onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })} aria-describedby="emailHelp" placeholder="Enter email" />
                                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" name="pwd" value={login.pwd} onChange={(e) => { setLogin({ ...login, [e.target.name]: e.target.value }) }} id="exampleInputPassword1" placeholder="Password" />
                                    </div>


                                    <button type="submit" class="btn btn-primary my-3" style={{ marginLeft: "40%" }}>Login</button>

                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const signUpModal = () => {
        return (
            <>
                <button type="button" class="btn btn-primary d-none" ref={signUpRef} data-bs-toggle="modal" data-bs-target="#signupModal">
                    Launch demo modal
                </button>
                <div class="modal fade" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Sign Up</h5>
                                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                                <form onSubmit={handleSignup}>
                                    <div class="form-group my-3">
                                        <label for="exaeInputEmail1">Email address</label>
                                        <input type="email" class="form-control" id="exaeInputEmail1" name="uName" value={signup.uName} onChange={(e) => setSignup({ ...signup, [e.target.name]: e.target.value })} aria-describedby="emailHelp" placeholder="Enter email" />
                                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleItPassword1">Password</label>
                                        <input type="password" class="form-control" name="pwd" value={signup.pwd} onChange={(e) => { setSignup({ ...signup, [e.target.name]: e.target.value }) }} id="exampleItPassword1" placeholder="Password" />
                                    </div>
                                    <div class="form-group my-3">
                                        <label for="exampleIPassword1">Confirm Password</label>
                                        <input type="password" class="form-control" name="cpwd" value={signup.cpwd} onChange={(e) => { setSignup({ ...signup, [e.target.name]: e.target.value }) }} id="exampleIPassword1" placeholder="Confirm Password" />
                                        <small id="emailHelp" class="form-text" style={{ color: signup.cpwd !== "" && signup.cpwd === signup.pwd ? "green" : "red", display: signup.cpwd !== "" ? "" : "none" }}>{signup.cpwd && signup.cpwd === signup.pwd ? "Passwords match" : "Passwords do not match!"}</small>
                                    </div>
                                    {/* <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                    </div> */}

                                    <button type="submit" class="btn btn-primary my-3" style={{ marginLeft: "40%" }}>Signup</button>

                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {loginModal()}
            {signUpModal()}
            <div className='d-flex p-2 justify-content-center sticky-top' style={{ backgroundColor: "#222831", boxShadow: "0 5px 10px" }}>
                <div style={{ display: localStorage.getItem("token") ? "none" : "" }}>
                    <button className='btn btn-primary mx-3' onClick={() => { loginRef.current.click() }}>Login</button>
                    <button className='btn btn-success mx-3' onClick={() => { signUpRef.current.click() }}>Signup</button>
                </div>
                <div style={{ display: localStorage.getItem("token") ? "" : "none" }}>
                    <button className='btn btn-warning mx-3' onClick={() => { localStorage.clear(); sessionStorage.clear(); window.location.reload() }}>Logout</button>
                </div>
            </div>
        </>
    )
}

export default Navbar