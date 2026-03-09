/* =========================================
   LÓGICA DE FILTROS Y PAGINACIÓN
   Soporta filtro doble: especie + sexo
   ========================================= */
const itemsPerPage = 6;
let currentPage = 1;
let activeSpecies = 'all';   // all | perro | gato
let activeGender  = 'all';   // all | macho | hembra

const allCards            = Array.from(document.querySelectorAll('.filterable'));
const cardsContainer      = document.getElementById('dogs-container');
const paginationContainer = document.getElementById('pagination-controls');
const noResultsMessage    = document.getElementById('no-results-message');

function matchesFilters(card) {
    const species  = card.getAttribute('data-species');
    const category = card.getAttribute('data-category');
    const speciesOk = activeSpecies === 'all' || species  === activeSpecies;
    const genderOk  = activeGender  === 'all' || category === activeGender;
    return speciesOk && genderOk;
}

function updateDisplay() {
    const filtered = allCards.filter(matchesFilters);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    if (currentPage < 1)          currentPage = 1;

    const toShow = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    allCards.forEach(c => c.style.display = 'none');

    if (toShow.length > 0) {
        toShow.forEach(c => c.style.display = 'block');
        if (noResultsMessage) noResultsMessage.style.display = 'none';
        cardsContainer.style.display = 'grid';
    } else {
        if (noResultsMessage) noResultsMessage.style.display = 'block';
        cardsContainer.style.display = 'none';
    }
    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    if (!paginationContainer) return;
    paginationContainer.innerHTML = '';
    if (totalPages <= 1) return;

    const prev = createBtn('<i class="fas fa-chevron-left"></i>', () => {
        if (currentPage > 1) { currentPage--; updateDisplay(); }
    });
    if (currentPage === 1) prev.classList.add('disabled');
    paginationContainer.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
        const btn = createBtn(i, () => { currentPage = i; updateDisplay(); });
        if (i === currentPage) btn.classList.add('active');
        paginationContainer.appendChild(btn);
    }

    const next = createBtn('<i class="fas fa-chevron-right"></i>', () => {
        if (currentPage < totalPages) { currentPage++; updateDisplay(); }
    });
    if (currentPage === totalPages || totalPages === 0) next.classList.add('disabled');
    paginationContainer.appendChild(next);
}

function createBtn(html, onClick) {
    const btn = document.createElement('button');
    btn.innerHTML = html;
    btn.className = 'page-btn';
    btn.addEventListener('click', onClick);
    return btn;
}

document.querySelectorAll('.filter-btn[data-species]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn[data-species]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeSpecies = btn.getAttribute('data-species');
        currentPage = 1;
        updateDisplay();
    });
});

document.querySelectorAll('.filter-btn[data-gender]').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn[data-gender]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeGender = btn.getAttribute('data-gender');
        currentPage = 1;
        updateDisplay();
    });
});

if (cardsContainer) updateDisplay();
