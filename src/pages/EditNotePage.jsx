import axios from "axios";
import { toast } from "react-toastify"; // Importamos la función toast de react-toastify para mostrar notificaciones al usuario después de actualizar la nota, ya sea de éxito o error
import { useNavigate, useParams } from "react-router-dom"; // useparam para obtener el id de la nota a editar desde la URL, y useNavigate para redirigir al usuario a otra página después de actualizar la nota
import { useState } from "react";
import { useEffect } from "react";
import NoteForm from "../components/NoteForm";
const apiURL = import.meta.env.VITE_API_URL;

const EditNotePage = () => {
    const { id } = useParams(); // Obtenemos el id de la nota a editar desde la URL, usando el hook useParams de react-router-dom
    const navigate = useNavigate(); // Hook de react-router-dom para redirigir al usuario a otra página después de actualizar la nota

    // Estado para almacenar los datos iniciales de la nota a editar, que se pasan al componente NoteForm para mostrar los valores actuales de la nota en el formulario de edición
    const [initialData, setInitialData] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        axios.get(`${apiURL}/api/notes/${id}`).then((res) => {
            // Hacemos una petición GET a la API para obtener los datos de la nota a editar, usando el id obtenido de la URL, y actualizamos el estado de initialData con los datos obtenidos para mostrar los valores actuales de la nota en el formulario de edición
            setInitialData({
                title: res.data.title,
                description: res.data.description,
            });
        });
    }, [id]);

    const handleUpdate = async (note) => {
        await axios.put(`${apiURL}/api/notes/${id}`, note).then((res) => {
            if (res.status === 200) {
                toast.success("¡Nota actualizada con éxito!", {
                    position: "bottom-right",
                    autoClose: 3000,
                    theme: "colored",
                });
                navigate("/");
            } else {
                toast.error("Error al actualizar la nota", {
                    position: "bottom-right",
                    autoClose: 3000,
                    theme: "colored",
                });
            }
        });
    };

    return (
        <div>
            <h1 className="text-5xl font-bold text-center mb-8">Editar Nota</h1>

            {/*Renderizamos el componente NoteForm, pasando los datos iniciales de la nota a editar a través de la prop initialData, y la función handleUpdate como prop onSubmit para manejar la actualización de la nota cuando se envíe el formulario*/}
            <NoteForm initialData={initialData} onSubmit={handleUpdate} />
        </div>
    );
};

export default EditNotePage;
