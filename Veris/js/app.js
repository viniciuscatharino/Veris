// DADOS DOS ESCRITÓRIOS DE SÃO CARLOS / SP
const officesData = [
    { 
        id: 1, 
        name: "Camfella e Amato Advogados", 
        oab: "São Carlos / SP", 
        address: "São Carlos - SP",
        time: "10 min", 
        stars: "★★★★★", 
        rating: "5.0", 
        lat: -22.0152, 
        lng: -47.8912, 
        desc: "Atuação especializada em consultoria e assessoria jurídica, Direito Cível, Trabalhista e Empresarial.",
        photos: [
            { label: "Fachada", url: "img/camfellaExt.jpg" },
            { label: "Interior", url: "img/camfellaInt.jpg" }
        ]
    },
    { 
        id: 2, 
        name: "Bravo & Arruda Sociedade de Advogados", 
        oab: "São Carlos / SP", 
        address: "São Carlos - SP",
        time: "12 min", 
        stars: "★★★★★", 
        rating: "5.0", 
        lat: -22.0185, 
        lng: -47.8894, 
        desc: "Sociedade de advogados focada em Direito Previdenciário, Trabalhista, Família e Soluções Cíveis.",
        photos: [
            { label: "Fachada", url: "img/bravoearrudaExt.jpg" },
        ]
    },
    { 
        id: 3, 
        name: "Lopes Vieira Advogados Associados", 
        oab: "São Carlos / SP", 
        address: "São Carlos - SP",
        time: "15 min", 
        stars: "★★★★★", 
        rating: "5.0", 
        lat: -22.0124, 
        lng: -47.8951, 
        desc: "Escritório especializado em planejamento tributário, defesa empresarial e contencioso cível.",
        photos: [
            { label: "Fachada", url: "img/lopesvieiraExt.jpg" },
            { label: "Interior", url: "img/lopesvieiraInt.jpg" }
        ]
    },
    { 
        id: 4, 
        name: "Burihan Advogados", 
        oab: "São Carlos / SP", 
        address: "São Carlos - SP",
        time: "10 min", 
        stars: "★★★★★", 
        rating: "5.0", 
        lat: -22.0168, 
        lng: -47.8903, 
        desc: "Atendimento focado em Direito Bancário, Defesa do Consumidor, Contratos e Cível Geral.",
        photos: [
            { label: "Fachada", url: "img/burihanExt.jpg" },
        ]
    },
    { 
        id: 5, 
        name: "GALLO ADVOCACIA", 
        oab: "São Carlos / SP", 
        address: "São Carlos - SP",
        time: "15 min", 
        stars: "★★★★★", 
        rating: "5.0", 
        lat: -22.0141, 
        lng: -47.8932, 
        desc: "Advocacia especializada, consultoria preventiva e contenciosa para pessoas físicas e jurídicas.",
        photos: [
            { label: "Fachada", url: "img/galloExt.jpg" },
            { label: "Interior", url: "img/galloInt.jpg" }
        ]
    },
    { 
        id: 6, 
        name: "Novaes Ribeiro Advogados Associados", 
        oab: "Tel: (16) 99146-9908", 
        address: "R. Padre Teixeira, 1707, Sl 02 - Centro, São Carlos/SP",
        time: "15 min", 
        stars: "★★★★★", 
        rating: "5.0 (71)", 
        lat: -22.0163, 
        lng: -47.8921, 
        desc: "Serviços jurídicos integrados com atendimento personalizado e estrutura corporativa completa no centro de São Carlos.",
        photos: [
            { label: "Fachada", url: "img/novaesExt.jpg" },
            { label: "Interior", url: "img/novaesInt.jpg" }
        ]
    }
];

let mapInstance = null;
let markersMap = {};

// 1. ALTERNÂNCIA DE TEMA (CLARO / ESCURO)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.innerText = isDark ? '☀️' : '🌙';
    }
    localStorage.setItem('veris-theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('veris-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) themeBtn.innerText = '☀️';
    }
}

// 2. ALTERNÂNCIA DE VIEWS (SINGLE PAGE APPLICATION)
function switchView(viewId) {
    document.querySelectorAll('.view-screen').forEach(screen => {
        screen.classList.remove('active');
    });

    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
    }

    document.getElementById('sidebar')?.classList.add('hidden');

    if (viewId === 'view-app' && !mapInstance) {
        setTimeout(initMap, 100);
    }
}

// 3. INICIALIZAÇÃO DO MAPA LEAFLET EM SÃO CARLOS/SP
function initMap() {
    const defaultCenter = [-22.0163, -47.8921]; // Centro de São Carlos
    mapInstance = L.map('map').setView(defaultCenter, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance);

    renderOfficeList();
}

// 4. RENDERIZAÇÃO DA LISTA DE ESCRITÓRIOS
function renderOfficeList() {
    const listContainer = document.getElementById('office-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';

    officesData.forEach((office, index) => {
        const li = document.createElement('li');
        li.className = `office-item ${index === 0 ? 'selected' : ''}`;
        
        li.innerHTML = `
            <div class="office-info-main">
                <span class="office-name-title">${office.name}</span>
                <span class="office-time-tag">⏱ ${office.time}</span>
            </div>
            <div class="office-stars">${office.stars}</div>
        `;

        li.onclick = () => selectOffice(office, li);
        listContainer.appendChild(li);

        if (mapInstance) {
            const marker = L.marker([office.lat, office.lng]).addTo(mapInstance);
            marker.bindPopup(`<b>${office.name}</b><br>${office.address}<br>Avaliação: ${office.rating}`);
            markersMap[office.id] = marker;
        }
    });

    if (officesData.length > 0) {
        selectOffice(officesData[0], listContainer.children[0]);
    }
}

// 5. SELEÇÃO DO ESCRITÓRIO: ZOOM NO MAPA E CARROSSEL DE FOTOS
function selectOffice(office, element) {
    document.querySelectorAll('.office-item').forEach(el => el.classList.remove('selected'));
    if (element) element.classList.add('selected');

    document.getElementById('detail-name').innerText = office.name;
    document.getElementById('detail-oab').innerText = `${office.oab} • ${office.address}`;
    document.getElementById('detail-desc').innerText = office.desc;
    document.getElementById('detail-badge').innerText = `★ ${office.rating} no Google Maps`;

    const carouselContainer = document.getElementById('photo-carousel');
    if (carouselContainer) {
        carouselContainer.innerHTML = '';
        office.photos.forEach((photoObj) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'photo-wrapper';
            wrapper.style.display = 'flex';
            wrapper.style.flexDirection = 'column';
            wrapper.style.alignItems = 'center';

            const img = document.createElement('img');
            img.src = photoObj.url;
            img.alt = `${photoObj.label} - ${office.name}`;
            img.className = 'carousel-img';

            const caption = document.createElement('span');
            caption.innerText = photoObj.label;
            caption.style.fontSize = '0.75rem';
            caption.style.fontWeight = '600';
            caption.style.marginTop = '4px';
            caption.style.color = 'var(--text-muted)';

            wrapper.appendChild(img);
            wrapper.appendChild(caption);
            carouselContainer.appendChild(wrapper);
        });
    }

    if (mapInstance) {
        mapInstance.flyTo([office.lat, office.lng], 16, {
            animate: true,
            duration: 1.2
        });

        if (markersMap[office.id]) {
            markersMap[office.id].openPopup();
        }
    }
}

// 6. PLANOS DE ASSINATURA
function setCycle(months, button) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    let discount = 1;
    if (months === 3) discount = 0.95;
    if (months === 6) discount = 0.90;
    if (months === 12) discount = 0.80;

    const baseStart = 59.90;
    const basePro = 129.90;
    const baseEnterprise = 239.90;

    document.getElementById('price-start').innerHTML = `R$ ${(baseStart * discount).toFixed(2).replace('.', ',')}<span>/mês</span>`;
    document.getElementById('price-pro').innerHTML = `R$ ${(basePro * discount).toFixed(2).replace('.', ',')}<span>/mês</span>`;
    document.getElementById('price-enterprise').innerHTML = `R$ ${(baseEnterprise * discount).toFixed(2).replace('.', ',')}<span>/mês</span>`;
}

// 7. LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();

    document.getElementById('menu-toggle')?.addEventListener('click', () => {
        document.getElementById('sidebar')?.classList.remove('hidden');
    });

    document.getElementById('menu-close')?.addEventListener('click', () => {
        document.getElementById('sidebar')?.classList.add('hidden');
    });
});