// Importamos el componente NavLink de react-router-dom para crear enlaces de navegación en la barra de navegación, NavLink nos permite aplicar estilos activos a los enlaces cuando la ruta coincide con la URL actual
import { NavLink } from "react-router-dom";

// Importamos el icono de plus de lucide-react para usarlo en el botón de crear una nota, lucide-react es una biblioteca de iconos que ofrece una amplia variedad de iconos personalizables para usar en aplicaciones React
import { PlusIcon } from "lucide-react";

const NavBar = () => {
    return (
        <header className="navbar bg-base-300 py-8 mb-10">
            <div className="w-full max-w-250 mx-auto flex items-center justify-between">
                <NavLink className="text-3xl font-bold" to="/">
                    TodoApp
                </NavLink>
                <NavLink className="btn btn-soft btn-primary font-bold text-[1.1em]" to="/createNote">
                    {/*Enlace de navegación para crear una nota, al hacer click nos redirige a la página de creación de notas, usando el componente NavLink de react-router-dom para aplicar estilos activos cuando la ruta coincide con la URL actual*/}
                    <PlusIcon />
                    Crear una nota
                </NavLink>
            </div>
        </header>
    );
};

export default NavBar;
