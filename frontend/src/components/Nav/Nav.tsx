import "./Nav.css";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/notes/add");
  };
  return (
    <nav>
      <button onClick={onClick}>+ New Note</button>
    </nav>
  );
}
