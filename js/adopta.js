/* =========================================
   LÓGICA DE FILTROS Y PAGINACIÓN
   ========================================= */
const itemsPerPage = 6; 
let currentPage = 1;
let currentFilter = 'all';

const allDogs = Array.from(document.querySelectorAll('.filterable'));
const dogsContainer = document.getElementById('dogs-container');
const paginationContainer = document.getElementById('pagination-controls');
const filterButtons = document.querySelectorAll('.filter-btn');
const noResultsMessage = document.getElementById('no-results-message');

function updateDisplay() {
    const filteredDogs = allDogs.filter(dog => {
        if (currentFilter === 'all') return true;
        return dog.getAttribute('data-category') === currentFilter;
    });

    const totalPages = Math.ceil(filteredDogs.length / itemsPerPage);
    
    if (currentPage > totalPages) currentPage = totalPages || 1;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dogsToShow = filteredDogs.slice(startIndex, endIndex);

    allDogs.forEach(dog => dog.style.display = 'none');

    if (dogsToShow.length > 0) {
        dogsToShow.forEach(dog => dog.style.display = 'block');
        if(noResultsMessage) noResultsMessage.style.display = 'none';
        dogsContainer.style.display = 'grid'; 
    } else {
        if(noResultsMessage) noResultsMessage.style.display = 'block';
        dogsContainer.style.display = 'none';
    }
    
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    if(!paginationContainer) return;
    paginationContainer.innerHTML = ''; 

    if (totalPages <= 1) return;

    const prevBtn = createPaginationBtn('<i class="fas fa-chevron-left"></i>', () => {
        if (currentPage > 1) { currentPage--; updateDisplay(); }
    });
    if (currentPage === 1) prevBtn.classList.add('disabled');
    paginationContainer.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = createPaginationBtn(i, () => {
            currentPage = i;
            updateDisplay();
        });
        if (i === currentPage) pageBtn.classList.add('active');
        paginationContainer.appendChild(pageBtn);
    }

    const nextBtn = createPaginationBtn('<i class="fas fa-chevron-right"></i>', () => {
        if (currentPage < totalPages) { currentPage++; updateDisplay(); }
    });
    if (currentPage === totalPages || totalPages === 0) nextBtn.classList.add('disabled');
    paginationContainer.appendChild(nextBtn);
}

function createPaginationBtn(text, onClick) {
    const btn = document.createElement('button');
    btn.innerHTML = text;
    btn.className = 'page-btn';
    btn.addEventListener('click', onClick);
    return btn;
}

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        currentPage = 1;
        updateDisplay();
    });
});

// Inicializar al cargar
if (dogsContainer) updateDisplay();