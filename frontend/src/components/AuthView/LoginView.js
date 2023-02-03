import React from "react";
import './LoginView.css';
import {withRouter} from './withRouter.js'

class LoginView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      csrf: "",
      username: "",
      password: "",
      error: "",
      isAuthenticated: false,
    };
  }

  
  componentDidMount = () => {
    this.getSession();
  }

  getCSRF = () => {
    fetch("http://localhost:8000/manager/csrf/", {
      credentials: "include",
    })
    .then((res) => {
      let csrfToken = res.headers.get("X-CSRFToken");
      this.setState({csrf: csrfToken});
      console.log(csrfToken);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getSession = () => {
    fetch("http://localhost:8000/manager/session/", {
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.isAuthenticated) {
        this.setState({isAuthenticated: true});
      } else {
        this.setState({isAuthenticated: false});
        this.getCSRF();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  whoami = () => {
    fetch("http://localhost:8000/manager/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("You are logged in as: " + data.username);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value});
  }

  handleUserNameChange = (event) => {
    this.setState({username: event.target.value});
  }

  isResponseOk(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  login = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/manager/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.state.csrf,
      },
      credentials: "include",
      body: JSON.stringify({username: this.state.username, password: this.state.password}),
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({isAuthenticated: true, username: "", password: "", error: ""});
      this.props.navigate('/home')

    })
    .catch((err) => {
      console.log(err);
      this.setState({error: "Wrong username or password."});
    });
    
  }

  logout = () => {
    fetch("http://localhost:8000/manager/logout/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
    .then(this.isResponseOk)
    .then((data) => {
      console.log(data);
      this.setState({isAuthenticated: false});
      this.getCSRF();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  navigateReg = (event) => {
    event.preventDefault()
    this.props.navigate('/register')
  }

  render() {

    if (!this.state.isAuthenticated) {
      return (
        <div className="container">
          {/* <button className="btn btn-primary mr-2" onClick={this.whoami}>WhoAmI</button>
          <button className="btn btn-danger" onClick={this.logout}>Log out</button> */}
          <div className="screen">
            <div className="screen__content">
              <form className="login" onSubmit={this.login}>
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input type="text" className="login__input" name="username" value={this.state.username} onChange={this.handleUserNameChange} placeholder="User name"/>
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input type="password" className="login__input" name="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password"/>
                </div>
                <div>
                 {this.state.error &&
                   <small className="text-danger">
                     {this.state.error}
                   </small>
                 }
               </div>
                <button className="button login__submit" >
                  <span className="button__text">Log In Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>		
              </form>
              <div className="social-login">
                <h3>Money Manager</h3>
                <h4 className="registerLabel" onClick={this.navigateReg}>Register</h4>
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
      );
    }
  }
}

export default withRouter(LoginView);