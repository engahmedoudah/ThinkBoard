import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">
          <Link to="/">ThinkBoard</Link>
        </h1>
        <Nav />
      </div>
    </header>
  );
}
