import User from "./User.js"
import Event from "./Event.js"

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

    // Buscar eventos por palabra clave y categoria
    filterEvents(text = '', category = '') {
        const cleanText = text.trim().toLowerCase()
        const cleanCategory = category.trim().toLowerCase()

        if(!cleanText && !cleanCategory) return this.#eventLists

        return this.#eventLists.filter(event => {
            const searchText = cleanText ? event.name.toLowerCase().includes(cleanText) : true
            const searchCategory = cleanCategory ? event.category.toLowerCase() === cleanCategory : true

            return searchText && searchCategory
        })
    }

    // Obenter los eventos del usuario al cual se registro
    getUserEvents() {
        if(!this.#currentUser) return []

        const userEventsIds = this.#currentUser.registeredEvents
        return this.#eventLists.filter(e => userEventsIds.includes(e.id))
    }
}