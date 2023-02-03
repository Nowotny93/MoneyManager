import React from "react";
import {withRouter} from './withRouter.js'


class RegisterView extends React.Component  {

    constructor(props) {
        super(props);
    
        this.state = {
          username: "",
          password: "",
          email: "",
        };
      }

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    }
    
    handleUserNameChange = (event) => {
        this.setState({username: event.target.value});
    }

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    register = (event) => {
        event.preventDefault();
        fetch("http://localhost:8000/manager/register/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username: this.state.username, password: this.state.password, email: this.state.email}),
        })
        // // .then(isResponseOk())
        .then((data) => {
          console.log(data);
        //   this.setState({isAuthenticated: true, username: "", password: "", error: ""});
        this.props.navigate('/')
        })
        .catch((err) => {
          console.log(err);
        //   let error = "Wrong username or password."
        //   setError(error);
        });
      }

    render(){
    return (
        <div className="container">
            <div className="screen">
              <div className="screen__content">
                <form className="register" onSubmit={this.register}>
                  <div className="login__field">
                    <i className="login__icon fas fa-user"></i>
                    <input type="text" className="login__input" name="username" value={this.state.username} onChange={this.handleUserNameChange} placeholder="User name"/>
                  </div>
                  <div className="login__field">
                    <i className="login__icon fas fa-lock"></i>
                    <input type="password" className="login__input" name="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
                  </div>
                  <div className="login__field">
                    <i className="login__icon fas fa-lock"></i>
                    <input type="email" className="login__input" name="email" value={this.state.email} onChange={this.handleEmailChange} placeholder="Email"/>
                  </div>
                  <button className="button login__submit" >
                    <span className="button__text">Register Now</span>
                    <i className="button__icon fas fa-chevron-right"></i>
                  </button>		
                </form>
                <div className="social-register">
                  <h3>Money Manager</h3>
                </div>
              </div>
              <div className="screen__background">
                <span className="screen__background__shape screen__background__shape4"></span>
                <span className="screen__background__shape screen__background__shape3"></span>		
                <span className="screen__background__shape screen__background__shape2"></span>
                <span className="screen__background__shape screen__background__shape1"></span>
              </div>		
            </div>
        </div>
    )
}
}

export default withRouter(RegisterView)