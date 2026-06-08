import Event from '../models/Event.js'
import User from '../models/User.js'
import Manager from '../models/Manager.js'
import EventView from '../view/EventView.js'

// Clase controladora que contiene todos los eventos
export default class AppControllers {
    #model
    #view
    #isShowingCatalog
    #selectedEventIdForModal 

    // model => manager
    // view => EventView
    constructor(model, view) {
        this.#model = model
        this.#view = view
        this.#isShowingCatalog = true // Rastrea en qué pestaña está el usuario
        this.#selectedEventIdForModal = null
        this.#initEvents()
    }

    // Renderiza la pestaña activa sincronizando el estado con el modelo
    #renderCurrentTab() {
        const registered = this.#model.currentUser.registeredEvents
        
        if (this.#isShowingCatalog) {
            this.#view.dashboardTitle.textContent = 'Próximos Eventos'
            this.#view.renderCatalog(this.#model.eventLists, registered)
        } else {
            this.#view.dashboardTitle.textContent = 'Mis Inscripciones Activas'
            
            const userEvents = this.#model.getUserEvents()
            this.#view.renderCatalog(userEvents, []) 
            
            // posible ajuste por clase erronea
            const buttons = this.#view.eventGrid.querySelectorAll('.btn-primary')
            buttons.forEach(btn => {
                btn.className = 'btn btn-danger'
                btn.textContent = 'Cancelar Inscripción'
                btn.dataset.id = btn.dataset.id
            })
        }
    }
    
    // Actualiza la interfaz y el contador de la barra lateral
    #updateInterface() {
        this.#view.badgeCount.textContent = this.#model.currentUser.registeredEvents.length
        this.#renderCurrentTab()
    }

    // Dentro de el metodo #initEvents() albergamos todos los eventos de escucha
    #initEvents() {
        // Manejo del login
        const login = document.getElementById('form-login')
        login.addEventListener('submit', (function(e) {
            e.preventDefault()
        
            const email = document.getElementById('input-email').value.trim()
            const psw = document.getElementById('input-password').value.trim()

            if(email === '' && psw === '' || email && psw === '' || email === '' && psw) {
                document.getElementById('error-email').classList.remove('hidden')
                document.getElementById('error-password').classList.remove('hidden')
                return
            } else {
                document.getElementById('error-email').classList.add('hidden')
                document.getElementById('error-password').classList.add('hidden')
            }
            const newUser = new User(email)
            this.#model.currentUser = newUser

            this.#view.toggleScreens(true)
            this.#renderCurrentTab()
        }).bind(this))

        // Busqueda en tiempo real
        const searchText = document.getElementById('search-input')
        const searchCategory = document.getElementById('category-select')

        const handleFilter = () => {
            if (!this.#isShowingCatalog) return

            const filtered = this.#model.filterEvents(searchText.value ,searchCategory.value)
            this.#view.renderCatalog(filtered, this.#model.currentUser.registeredEvents)
        }

        searchText.addEventListener('input', handleFilter)
        searchCategory.addEventListener('change', handleFilter)

        // Barra lateral de navegación
        const nav = document.querySelector('.sidebar-nav')
        nav.addEventListener('click', e => {
            const allEventsBtn = document.getElementById('nav-catalog')
            const myRegistrationsBtn = document.getElementById('nav-registrations')

            if(e.target.id === 'nav-catalog') {
                this.#isShowingCatalog = true
                allEventsBtn.classList.add('active')
                myRegistrationsBtn.classList.remove('active')
                this.#view.filterBar.classList.remove('hidden')
                this.#renderCurrentTab()
            }

            if(e.target.id === 'nav-registrations') {
                this.#isShowingCatalog = false
                myRegistrationsBtn.classList.add('active')
                allEventsBtn.classList.remove('active')
                this.#view.filterBar.classList.add('hidden')
                this.#renderCurrentTab()
            }

            // Cierre de sesión
            document.getElementById('btn-logout').addEventListener('click', () => {
                this.#model.currentUser = null
                this.#isShowingCatalog = true
                document.getElementById('form-login').reset()
                document.getElementById('nav-catalog').classList.add('active')
                document.getElementById('nav-registrations').classList.remove('active')
                this.#view.filterBar.classList.remove('hidden')
                this.#view.toggleScreens(false)
            })

            // clics en botones dinamicos
            this.#view.eventGrid.addEventListener('click', e => {
                if(!e.target.classList.contains('btn')) return 

                const eventId = parseInt(e.target.dataset.id)
                if(isNaN(eventId)) return

                const targetEvent = this.#model.eventLists.find(e => e.id === eventId)
                if(!targetEvent) return

                // Lógica si hace clic en Inscribirse
                if(e.target.classList.contains('btn-primary')) {
                    if (targetEvent.availablePlace > 0) {
                    this.#selectedEventIdForModal = eventId
                    this.#view.showModal(targetEvent)
                }
                }

                // Lógica si hace clic en Cancelar
                if(e.target.classList.contains('btn-danger')) {
                    this.#model.currentUser.cancelRegistration(eventId)
                    targetEvent.increaseAvailablePlace()
                    this.#updateInterface()
                }
            })

            // EVENTOS DEL PROPIO COMPONENTE MODAL (CANCELAR / CONFIRMAR FORMULARIO)
            document.getElementById('btn-modal-cancel').addEventListener('click', () => {
            this.#selectedEventIdForModal = null
            this.#view.hideModal()
            })

            const modalForm = document.getElementById('form-confirm-inscription')
            modalForm.addEventListener('submit', e => {
                e.preventDefault()
                
                if (this.#selectedEventIdForModal !== null) {
                    const eventId = this.#selectedEventIdForModal
                    const targetEvent = this.#model.eventLists.find(evt => evt.id === eventId)
                    
                    if (targetEvent) {
                        const success = this.#model.currentUser.registerInEvent(eventId)
                        if (success) {
                            targetEvent.reduceAvailablePlace()
                            this.#updateInterface()
                        }
                    }
                }
                
                this.#selectedEventIdForModal = null
                this.#view.hideModal()
            })
            
        })
    
    }
    
}