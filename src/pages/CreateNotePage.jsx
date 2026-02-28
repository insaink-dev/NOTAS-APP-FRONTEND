import NoteForm from "../components/NoteForm.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

console.log(import.meta.env.VITE_API_URL);

const CreateNotePage = () => {
    const navigate = useNavigate();

    // Función para manejar la creación de una nueva nota, recibe el objeto note con los datos del formulario, hace una petición POST a la API para crear la nota en la base de datos, y muestra una notificación al usuario con el resultado de la operación
    const handleCreate = async (note) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/notes`, note).then((res) => {
                // Hacemos una petición POST a la API para crear la nota en la base de datos, usando la URL de la API importada desde las variables de entorno y concatenando el endpoint de creación de notas, pasando el objeto note con los datos del formulario como cuerpo de la petición
                if (res.status !== 201) {
                    throw new Error(`Error al crerar una nota`);
                }

                toast.success("¡Nota creada con éxito!", {
                    position: "bottom-center",
                    autoClose: 3000,
                    theme: "colored",
                });
                navigate("/");
            });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <NoteForm onSubmit={handleCreate} initialDate={{ title: "", content: "" }} />
            {/* Renderizamos el componente NoteForm, pasando la función handleCreate como prop onSubmit para manejar la creación de la nota, y un objeto vacío como initialData para que el formulario esté vacío al crear una nueva nota */}
        </div>
    );
};

export default CreateNotePage;
