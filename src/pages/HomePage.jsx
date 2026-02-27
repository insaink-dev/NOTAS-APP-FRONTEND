import { useState, useEffect } from "react";
import CardNote from "../components/CardNote.jsx";
import axios from "axios";
import formatData from "../utils/formatDate.js";
const apiURL = import.meta.env.VITE_API_URL;

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/notes`);
                setNotes(response.data);
                setLoading(false);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    };

    if (loading) return <span>Cargando...</span>;

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
            {notes.map((note) => (
                <CardNote key={note._id} title={note.title} description={note.description} id={note._id} date={formatData(note.createdAt)} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default HomePage;
