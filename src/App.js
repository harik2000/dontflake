import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import config from "./config";


function App() {
  const history = useHistory();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }
  
    setIsAuthenticating(false);
  }
  
  
  async function handleLogout() {
    await Auth.signOut();
  
    userHasAuthenticated(false);
    history.push("/login");
  }
  
  return (
    !isAuthenticating && (
      <div className="App-container">
      <div className="navbar_container">
        <Navbar fluid collapseOnSelect className="authentic_navbar">

        <div className="text"> 
          <Navbar.Brand className="">

            <Link to="/"><div className="logo">DontFlake</div></Link>

          </Navbar.Brand>


          <Navbar.Collapse>

            <Nav pullRight>
              {isAuthenticated
                ? (
                  <>
                   <LinkContainer to="/events">
                   <Button variant="outline-primary" className="button_css">Create Hangout</Button>
                    </LinkContainer>
                    <LinkContainer to="/settings">
                    <Button variant="outline-primary" className="button_css">Settings</Button>
                    </LinkContainer>
                      <Button variant="outline-primary" className="button_css" onClick={handleLogout}>Logout</Button>
                  </>
                ) : (
                  <>
                   
                    <LinkContainer to="/login">
                      <Button variant="outline-primary" className="button_css">Login</Button>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                      <Button variant="outline-primary" className="button_css" classname="signup">Sign up</Button>
                    </LinkContainer>
                  </>
                )}
            </Nav>

          </Navbar.Collapse>
          </div>

        </Navbar>

        <AppContext.Provider
          value={{ isAuthenticated, userHasAuthenticated }}
        >
          <Routes />
        </AppContext.Provider>
      </div>

      </div>
    )
  );
}
export default App;