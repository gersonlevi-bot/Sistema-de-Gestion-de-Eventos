// Clase Vista de eventos
export default class EventView {
    constructor() {
        // vistas
        this.viewLogin = document.getElementById('view-login')
        this.viewDashboard = document.getElementById('view-dashboard')
        // Dashboard: Contenido dinámico 
        this.eventGrid = document.getElementById('event-grid')
        this.dashboardTitle = document.getElementById('dashboard-title')
        this.dashboardSubtitle = document.getElementById('dashboard-subtitle')
        this.badgeCount = document.getElementById('badge-count')
        this.filterBar = document.getElementById('filter-bar')
        // Modal emergente
        this.modalContainer = document.getElementById('modal-container')
        this.modalTitle = document.getElementById('modal-title')
        this.modalDescription = document.getElementById('modal-description')
    }

    // Methods
    // Cambiar de vista
    toggleScreens(showDashboard) {
        this.viewLogin.classList.toggle('hidden', showDashboard)
        this.viewDashboard.classList.toggle('hidden', !showDashboard)
    }

    // Renderiza la vista mostrando todos los eventos
    renderCatalog(events, registeredIds) {
        this.eventGrid.innerHTML = ''

        events.forEach(e => {
            const card = document.createElement('article')
            card.className = 'card-evento'
            card.innerHTML = `
                <h3>${e.name}</h3>
                <p>${e.date}</p>
                <p><strong>${e.location}</strong></p>
                <span class= "badge" >${e.category}</span>
            `

            const actionBtn = document.createElement('button')
            actionBtn.type = 'button'

            if(registeredIds.includes(e.id)) {
                Object.assign(actionBtn, {textContent: 'Inscrito', className: 'btn btn-disabled', disabled: true})
            } else if(e.availablePlace === 0) {
                Object.assign(actionBtn, {textContent: 'Agotado', className: 'btn btn-disabled', disabled: true})    
            } else {
                Object.assign(actionBtn, {textContent: 'Inscribirse', className: 'btn btn-primary', disabled: false}) 
                actionBtn.dataset.id = e.id
            }

            card.appendChild(actionBtn)
            this.eventGrid.appendChild(card) 
        });
    }

    // Mostrar modal emergente
    showModal(event) {
        this.modalContainer.classList.remove('hidden')

        this.modalTitle.textContent = `Confirmar Inscripción a: ${event.name}`
        this.modalDescription.textContent = `El evento inicia el dia ${event.date} en ${event.location}`  
    }

    // Ocultar modal emergente
    hideModal() { this.modalContainer.classList.add('hidden')}
}