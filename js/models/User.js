// Clase Usuario
export default class User {
    #email
    #registeredEvents

    constructor(email) {
        this.#email = email
        this.#registeredEvents = []
    }

    //  Getters
    get email() {return this.#email}
    get registeredEvents() {return this.#registeredEvents}

    // Methods
    // Registrarse en evento
    registerInEvent(id) {
        if(this.#registeredEvents.includes(id)) return false
        
        this.#registeredEvents.push(id)
        return true
    }

    // Cancelar Inscripción
    cancelRegistration(id) {
        this.#registeredEvents = this.#registeredEvents.filter(itemId => itemId !== id)
    }
}