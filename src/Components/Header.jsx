import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { FaLocationArrow } from "react-icons/fa";
import { buttonColor } from "./style";

import { IoSettings, IoLogOutSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";



export default function Header() {

  const user_email = localStorage.getItem("user_email");
  const is_logged = localStorage.getItem("is_logged");
  console.log(is_logged);

  function logOut() {
    localStorage.removeItem('is_logged');
    window.location.href = "/login";

  }



  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        sticky="top"
        variant="light"
        className="shadow"
      >
        <Container>

          <Navbar.Brand className="mr-auto" href="/">
            <img src="hmsLogo.png" width="130px" alt="G-One" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="mx-auto">
              <span className="h3 text-primary">HOTEL MANAGEMENT SYSTEM</span>
            </Nav>
            <Nav className="ml-auto">
              {is_logged === "true" ? <ul className="list-group list-group-horizontal shadow">
                <li className="list-group-item"><FaUser className="text-primary" /> : <span className="fw-bold">{user_email}</span></li>
                <li className="list-group-item"><a href="/services"><IoSettings className="text-primary" size={20} /></a></li>
                <li className="list-group-item"><IoLogOutSharp className="text-primary" size={20} onClick={() => { logOut() }} /></li>

              </ul> :
                <>
                  <a href="/login">
                    <button
                      type="button"
                      className="btn "
                      style={
                        buttonColor
                      }
                    >
                      <FaLocationArrow /> LogIn{" "}
                    </button>
                  </a>
                </>}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
