import "./MainLayout.css";
import Home from "../pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import UpdateNote from "../pages/UpdateNote/UpdateNote";
import AddNewNote from "../pages/AddNewNote/AddNewNote";
import ShowNoteDetails from "../pages/ShowNoteDetails/ShowNoteDetails";

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes/:id" element={<ShowNoteDetails />} />
        <Route path="/notes/add" element={<AddNewNote />} />
        <Route path="/notes/edit/:id" element={<UpdateNote />} />
      </Routes>
    </div>
  );
}
