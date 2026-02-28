import { SquarePen, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const CardNote = ({ title, description, date, id, onDelete }) => {
    const navigate = useNavigate();
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const deleteNote = async () => {
        try {
            // Eliminando la nota de la DB con axios, importamos la URL de la API desde las variables de entorno para no hardcodearla, y concatenamos el endpoint con el id de la nota a eliminar
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/notes/${id}`).then((res) => {
                if (res.status !== 200) {
                    throw new Error("Error al eliminar la nota");
                }

                // Toast sirve para mostrar una notificación al usuario
                toast.success("¡Nota eliminada con éxito", {
                    position: "bottom-right",
                    autoClose: 3000,
                    theme: "colored",
                });

                // Eliminamos la nota desde el front desde la UI
                if (onDelete) onDelete(id);

                // cerrar el modal de confirmación de eliminación, cambiando el estado de showConfirmModal a false
                setShowConfirmModal(false);
            });
        } catch (error) {
            console.log(error);
            toast.error("Error al eliminar la nota", {
                position: "bottom-right",
                autoClose: 3000,
                theme: "colored",
            });
        }
    };

    return (
        <>
            <div className="card bg-base-300 w-full">
                <div className="card-body">
                    <h2 className="card-title text-accent font-bold lg:text-2xl">{title}</h2>
                    <p className="text-amber-50">{description}</p>
                    <div className="flex justify-between items-center mt-6">
                        <time dateTime={date}>{date}</time>
                        <div className="flex gap-4">
                            <SquarePen className="text-white cursor-pointer" onClick={() => navigate(`/editNote/${id}`)}></SquarePen>{" "}
                            {/* El icono de editar, al hacer
                            click nos redirige a la página de edición de la nota, pasando el id de la nota por la URL */}
                            <Trash onClick={() => setShowConfirmModal(true)} className="text-red-400 cursor-pointer"></Trash> //{" "}
                            {/*El icono de eliminar, al hacer click
                            muestra el modal de confirmación de eliminación, cambiando el estado de showConfirmModal a true*/}
                        </div>
                    </div>
                </div>
            </div>

            {/*Si el estado de showConfirmModal es true, renderizamos el componente DeleteConfirmationModal, pasando el título de la nota, la función deleteNote y la función setShowConfirmModal para cerrar el modal al cancelar o eliminar la nota*/}
            {showConfirmModal && <DeleteConfirmationModal title={title} deleteNote={deleteNote} setShowConfirmModal={setShowConfirmModal} />}
        </>
    );
};

export default CardNote;
