// Importamos la función format de date-fns para formatear las fechas, date-fns es una biblioteca de utilidades de fecha que ofrece funciones para manipular y formatear fechas de manera sencilla en JavaScript
import { format } from "date-fns";

// Importamos el locale de español de date-fns para formatear las fechas en español, date-fns ofrece soporte para múltiples idiomas a través de sus locales, lo que nos permite formatear las fechas en el idioma deseado
import { es } from "date-fns/locale";

// isoString es una cadena de texto que representa una fecha en formato ISO, que es el formato estándar para representar fechas en JavaScript, por ejemplo: "2023-06-15T12:00:00.000Z"
const formatData = (isoString) => {
    const date = new Date(isoString);
    return format(date, "dd 'de' MMM 'de' yyyy", { locale: es }); // Usamos la función format de date-fns para formatear la fecha, pasando el objeto Date creado a partir de la cadena isoString, el formato deseado para la fecha (en este caso "dd 'de' MMM 'de' yyyy" para mostrar el día, el mes en texto y el año), y el locale de español para formatear la fecha en español
};

export default formatData;
