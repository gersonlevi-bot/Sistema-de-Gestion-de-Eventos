import Manager from './models/Manager.js';
import EventView from './view/EventView.js';
import AppControllers from './controllers/AppControllers.js';
import Event from './models/Event.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar las capas del MVC
    const model = new Manager();
    const view = new EventView();
    const controller = new AppControllers(model, view);

    // 2. Inyectar datos de prueba cargados para el año 2026
    const eventosSemilla = [
        new Event(
            1, 
            "Conferencia Blockchain Latam 2026", 
            "15 de Julio, 2026", 
            "Tecnología", 
            "Centro de Convenciones, Lima", 
            25
        ),
        new Event(
            2, 
            "Simposio de Inteligencia Artificial", 
            "22 de Agosto, 2026", 
            "Tecnología", 
            "Auditorio Principal UNMSM", 
            0 // Evento que aparecerá como "Agotado" automáticamente
        ),
        new Event(
            3, 
            "Cumbre de Biotecnología y Salud", 
            "05 de Septiembre, 2026", 
            "Ciencia", 
            "Hotel Westin, San Isidro", 
            12
        ),
        new Event(
            4, 
            "Foro de E-commerce y Negocios Digitales", 
            "18 de Octubre, 2026", 
            "Negocios", 
            "Cámara de Comercio de Lima", 
            40
        ),
        new Event(
            5, 
            "Workshop: Finanzas para Startups", 
            "12 de Noviembre, 2026", 
            "Negocios", 
            "Co-working WeWork, Miraflores", 
            8
        )
    ];

    // Cargar los eventos dentro del Manager de forma limpia
    eventosSemilla.forEach(evento => model.addEvent(evento));

    console.log("EventPro 2026: Arquitectura SPA-MVC inicializada correctamente.");
});
