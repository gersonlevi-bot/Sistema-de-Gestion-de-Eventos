// Clase Evento
export default class Event {
    #id
    #name
    #date
    #category
    #location
    #availablePlace

    constructor(id, name, date, category, location, availablePlace) {
        this.#id = id
        this.#name = name
        this.#date = date
        this.#category = category  
        this.#location = location
        this.#availablePlace = availablePlace
    }

    // Getters
    get id() {return this.#id}
    get name() {return this.#name}
    get date() {return this.#date}
    get category() {return this.#category}
    get location() {return this.#location}
    get availablePlace() {return this.#availablePlace}

    // Methods
    // Reducir cupos disponibles
    reduceAvailablePlace() {
        if(this.#availablePlace > 0) {
            this.#availablePlace -= 1
            return true
        }

        return false  
    }

    // Incremetar cupos disponibles
    increaseAvailablePlace() {this.#availablePlace += 1}
}