const departments = [
    {
        id: "1",
        name: "Pessoal",
        employees: [
            { name: "FERNANDA BORTOLOTO", ramal: "2017", role: "Setor Pessoal" },
            { name: "GENILDA GOMES", ramal: "2032", role: "Setor Pessoal" },
            { name: "LUCIANA SATIRO", ramal: "2026", role: "Setor Pessoal" },
            { name: "MARINA REIS", ramal: "2027", role: "Setor Pessoal" }
        ]
    },
    {
        id: "2",
        name: "Fiscal",
        employees: [
            { name: "ARTHUR COSTA", ramal: "2016", role: "Setor Fiscal" },
            { name: "CAMILA DIAS", ramal: "2019", role: "Setor Fiscal" },
            { name: "CARLOS SILVA", ramal: "2028", role: "Setor Fiscal" },
            { name: "LUCELIA COSTA", ramal: "2029", role: "Setor Fiscal" },
            { name: "LUCIANA SOARES", ramal: "2022", role: "Setor Fiscal" },
            { name: "PATRICIA ALVES", ramal: "2021", role: "Setor Fiscal" }
        ]
    },
    {
        id: "3",
        name: "Contábil",
        employees: [
            { name: "ANGELICA SANTOS", ramal: "2014", role: "Setor Contábil" },
            { name: "GRAZIELE ALVES", ramal: "2031", role: "Setor Contábil" },
            { name: "KENIA ROCHA", ramal: "2018", role: "Setor Contábil" },
            { name: "PRISCILA GOMES", ramal: "2012", role: "Setor Contábil" }
        ]
    },
    {
        id: "4",
        name: "Financeiro",
        employees: [
            { name: "LORRAYNE SANTOS", ramal: "2020", role: "Setor Financeiro" }
        ]
    },
    {
        id: "5",
        name: "Outros Setores",
        employees: [
            { name: "RYAN OLIVEIRA", ramal: "2013", role: "TI" },
            { name: "MARA RODRIGUES", ramal: "2023", role: "Conformidade e Legalização" },
            { name: "LUDHIANA SOUZA", ramal: "2030", role: "Conformidade e Legalização" },
            { name: "MARIA JOSE", ramal: "2024", role: "Comercial" }
        ]
    },
    {
        id: "*",
        name: "Diretoria",
        employees: [
            { name: "ANDREZZA MOREIRA", ramal: "2011", role: "Diretora" },
            { name: "PATRICIA JOTA", ramal: "2025", role: "Diretora de Operações" }
        ]
    }
];

// Sort employees alphabetically in each department
departments.forEach(dept => {
    dept.employees.sort((a, b) => a.name.localeCompare(b.name));
});

// DOM Elements
const contentArea = document.getElementById('contentArea');
const searchInput = document.getElementById('searchInput');
const themeSwitch = document.getElementById('themeSwitch');
const themeIcon = document.getElementById('themeIcon');
const mainLogo = document.getElementById('mainLogo');

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Default to light if no saved theme
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        updateThemeUI('dark');
    } else {
        document.body.removeAttribute('data-theme');
        updateThemeUI('light');
    }
}

function updateThemeUI(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('ph-moon');
        themeIcon.classList.add('ph-sun');
        mainLogo.src = 'logo ACMAIS CCBPOE Dark.png';
    } else {
        themeIcon.classList.remove('ph-sun');
        themeIcon.classList.add('ph-moon');
        mainLogo.src = 'logo ACMAIS CCBPOE Light.png';
    }
}

themeSwitch.addEventListener('click', () => {
    const isDark = document.body.hasAttribute('data-theme');
    if (isDark) {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateThemeUI('light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeUI('dark');
    }
});

// Rendering Functions
function createEmployeeCard(employee) {
    return `
        <div class="employee-card">
            <div class="employee-info">
                <span class="employee-name">${employee.name}</span>
                <span class="employee-role">${employee.role}</span>
            </div>
            <a href="tel:${employee.ramal}" class="ramal-badge" title="Clique para ligar">
                <i class="ph ph-phone"></i>
                ${employee.ramal}
            </a>
        </div>
    `;
}

function renderDepartments(searchTerm = '') {
    contentArea.innerHTML = '';
    const lowerTerm = searchTerm.toLowerCase();
    let hasResults = false;

    departments.forEach(dept => {
        const filteredEmployees = dept.employees.filter(emp => 
            emp.name.toLowerCase().includes(lowerTerm) || 
            emp.ramal.includes(lowerTerm) ||
            emp.role.toLowerCase().includes(lowerTerm) ||
            dept.name.toLowerCase().includes(lowerTerm)
        );

        if (filteredEmployees.length > 0) {
            hasResults = true;
            
            const deptSection = document.createElement('div');
            deptSection.className = 'department-section';
            
            let numberHtml = '';
            if (dept.id !== "*") {
                numberHtml = `<div class="department-number">${dept.id}</div>`;
            } else {
                numberHtml = `<div class="department-number" style="background: var(--text-muted);"><i class="ph ph-briefcase"></i></div>`;
            }

            const cardsHtml = filteredEmployees.map(emp => createEmployeeCard(emp)).join('');

            deptSection.innerHTML = `
                <div class="department-header">
                    ${numberHtml}
                    <h3 class="department-title">${dept.name}</h3>
                </div>
                <div class="cards-grid">
                    ${cardsHtml}
                </div>
            `;
            
            contentArea.appendChild(deptSection);
        }
    });

    if (!hasResults) {
        contentArea.innerHTML = `
            <div class="no-results">
                <i class="ph ph-smiley-sad" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary);"></i>
                <p>Nenhum ramal ou colaborador encontrado para "<strong>${searchTerm}</strong>".</p>
            </div>
        `;
    }
}

// Search Event Listener
searchInput.addEventListener('input', (e) => {
    renderDepartments(e.target.value);
});

// Initialize
initTheme();
renderDepartments();
