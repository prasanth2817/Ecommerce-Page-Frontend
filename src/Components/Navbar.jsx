import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

function Header() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const userDataFromToken = jwtDecode(token);
        setUserData(userDataFromToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        toast.error("Invalid token. Please login again.");
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
        setUserData(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, [isLoggedIn, setIsLoggedIn]);

  const homepage = () => {
    navigate("/");
  };

  // Function to handle authentication change (login/logout)
  const handleAuthenticationChange = () => {
    if (isLoggedIn) {
      sessionStorage.removeItem("token");
      setIsLoggedIn(false);
    } else {
      navigate("/login");
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow-xl lg:px-12">
      <Container fluid>
        <Navbar.Brand href="/" className='font-serif'>EagleCart</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown disabled title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
        
        {isLoggedIn && (
            <div className="products-text">
              {userData?.firstName} {userData?.lastName}
            </div>
          )}
          <span className="d-flex gap:2rem">
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <i className="fa-solid fa-circle-user fa-2xl"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleAuthenticationChange}>
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                  {isLoggedIn ? "Logout" : "Login"}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/profile">
                  <i className="fa-solid fa-user"></i> Profile
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            </span>
            </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;