import User from "./User"
import Event from "./Event";

// Clase Gestor de eventos
export default class Manager {
    #eventLists
    #currentUser

    constructor(){
        this.#eventLists = []
        this.#currentUser = null
    }

    // Getters
    get eventLists() {return this.#eventLists}
    get currentUser() {return this.#currentUser}

    // Setters
    set currentUser(user) {
        if(user != null && !(user instanceof User)) return false

        this.#currentUser = user
    }

    // Methods
    // Agregar evento a lista
    addEvent(event) {
        for(let e of this.#eventLists) {
            if(e.id === event.id) return false
        }

        this.#eventLists.push(event) 
        return true
    }

    // Buscar eventos por palara clave y categoria
    filterEvents(text = '', category = '') {
        const cleanText = text.trim().toLowerCase()
        const cleanCategory = category.trim().toLowerCase()

        if(!cleanText && !cleanCategory) return this.#eventLists

        return this.#eventLists.filter(item => {
            const searchText = cleanText ? item.name.toLowerCase().includes(cleanText) : true
            const searchCategory = cleanCategory ? item.category.toLowerCase()() === cleanCategory : true

            return searchText && searchCategory
        })
    }
}