import { useState, useEffect } from "react";
import CardNote from "../components/CardNote.jsx";
import axios from "axios";
import formatData from "../utils/formatDate.js";
const apiURL = import.meta.env.VITE_API_URL;

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect para cargar las notas desde la API al montar el componente, hace una petición GET a la API para obtener las notas almacenadas en la base de datos, y actualiza el estado de notes con los datos obtenidos, también maneja el estado de loading para mostrar un mensaje de carga mientras se obtienen los datos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiURL}/api/notes`);
                setNotes(response.data); // Actualizamos el estado de notes con los datos obtenidos de la API
                setLoading(false); // Actualizamos el estado de loading a false para indicar que ya se han cargado los datos
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    // Función para manejar la eliminación de una nota, recibe el id de la nota a eliminar, actualiza el estado de notes filtrando la nota eliminada, esta función se pasa como prop onDelete al componente CardNote para eliminar la nota desde la UI después de eliminarla de la base de datos
    const handleDelete = (id) => {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    };

    // Si el estado de loading es true, mostramos un mensaje de carga mientras se obtienen los datos de la API
    if (loading) return <span>Cargando...</span>;

    return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
            {/*Contenedor para las notas, con un grid responsive que se adapta al tamaño de la pantalla, mostrando una columna en pantallas pequeñas y hasta 4 columnas en pantallas grandes, con un gap de 4 entre las tarjetas de las notas*/}

            {notes.map((note) => (
                <CardNote key={note._id} title={note.title} description={note.description} id={note._id} date={formatData(note.createdAt)} onDelete={handleDelete} />
                // Renderizamos el componente CardNote para cada nota en el estado de notes, pasando las props necesarias como title, description, id, date formateada con la función formatData, y la función handleDelete para eliminar la nota desde la UI después de eliminarla de la base de datos
            ))}
        </div>
    );
};

export default HomePage;
