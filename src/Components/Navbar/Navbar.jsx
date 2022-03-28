import { Link } from "react-router-dom";
import styled from "styled-components";
const Nav_div = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
  & > a {
    text-decoration: none;
  }
`;
export const Navbar = () => {
  return (
    <Nav_div className="navbar">
      <Link className="navbarHome" to={"/"}>
        Home
      </Link>
      <Link className="navbarLoginSignUp" to={"/loginsignup"}>
        Login/Sign Up
      </Link>
    </Nav_div>
  );
};
