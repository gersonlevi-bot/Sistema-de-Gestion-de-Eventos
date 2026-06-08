import Event from '../models/Event.js'
import User from '../models/User.js'
import Manager from '../models/Manager.js'
import EventView from '../view/EventView.js'

class AppControllers {
    #model
    #view

    constructor(model, view) {
        this.#model = model
        this.#view = view
        this.#initEvents()
    }

    #initEvents() {
        const login = document.getElementById('form-login')
        login.addEventListener('submit', e => {
            e.preventDefault()

            const email = document.getElementById('input-email').value
            const newUser = new User(email)
            this.#model.currentUser = newUser

            this.#view.toggleScreens(true)
            this.#view.renderCatalog(this.#view.eventLists, this.#model.currentUser.registeredEvents)
        })

        const searchText = document.getElementById('search-input')
        const searchCategory = document.getElementById('category-select')

        searchText.addEventListener('input', () => {
            const textValue = searchText.value
            const categotyValue = searchCategory.value

            const filtered = this.#model.filterEvents(textValue, categotyValue)
            this.#view.renderCatalog(filtered, this.#model.currentUser.registeredEvents)
        })

        const nav = document.querySelector('.sidebar-nav')
        nav.addEventListener('click', e => {
            if(e.target.id === 'nav-catalog') {
                this.#model.filterEvents('','')
                this.#view.renderCatalog(this.#view.eventLists, this.#model.currentUser.registeredEvents)
            }

            if(e.target.id === 'nav-registrations') {
                this.#model.renderCatalog(this.#view.eventLists ,this.#model.currentUser.registeredEvents)
                this.#model.eventGrid.forEach(event => {
                    event.forEach(e => {
                        e.actionBtn.textContent = 'Cancelar'
                    })
                });
            }
        })
    
    }
}