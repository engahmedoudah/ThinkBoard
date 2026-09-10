import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import NoteCardsList from "../../components/NoteCardsList/NoteCardsList";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Header />
      <main className="content container">
        <NoteCardsList />
      </main>
      <Footer />
    </div>
  );
}
