// Main JS for GaoMing Engineering Testing System

document.addEventListener('DOMContentLoaded', () => {
    // Determine current page to highlight sidebar
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        if (link.getAttribute('href') && path.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });

    // Login Form Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = loginForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = '登录中...';
            btn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        });
    }

    // Projects Handling - Search
    const searchInput = document.getElementById('projectSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(term) ? '' : 'none';
            });
        });
    }

    // Initialize Charts (Mock) using simple DOM manipulation if needed
    // In a real app we would use Chart.js or ECharts
    renderCharts();

    // Tab Handling
    const tabItems = document.querySelectorAll('.tab-item');
    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            const container = item.closest('.tabs-container');
            if (container) {
                container.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
                item.classList.add('active');
                // Logic to switch content would go here
            }
        });
    });

    // Modal Handling
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // Auto-fill Current Date
    const dateInputs = document.querySelectorAll('input[type="date"]');
    if (dateInputs.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(input => {
            if (!input.value) input.value = today;
        });
    }
});

function renderCharts() {
    // Placeholder function for future chart implementation
    const chartContainer = document.getElementById('mainChart');
    if (chartContainer) {
        // Just for demo purposes, we do nothing or could add a simple CSS bar chart
    }
}

function deleteRow(btn) {
    if (confirm('确定要删除这条记录吗？')) {
        const row = btn.closest('tr');
        row.remove();
        // Update stats calls would go here
    }
}

function exportReport() {
    alert('正在生成检测报告PDF...');
    setTimeout(() => {
        alert('报告生成成功！已开始下载。');
    }, 1500);
}

function saveEntry() {
    const btn = document.querySelector('.btn-primary');
    if (!btn) return;

    const originalText = btn.innerText;

    btn.innerText = '保存中...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = originalText;
        btn.disabled = false;
        alert('数据保存成功！');
        // Reset form if needed
        // document.querySelector('form').reset();
    }, 1000);
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// File Upload Simulation
function selectStaticFile() {
    // Create a dummy file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.dat,.txt,.csv';
    input.onchange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            alert(`已选择文件: ${file.name}\n正在解析数据...`);
            setTimeout(() => {
                alert('解析成功！数据已自动填入。');
            }, 1000);
        }
    };
    input.click();
}

function generateReport() {
    showModal('reportModal');
}

// Add Sample Row for Indoor Entrustment
function addSampleRow() {
    const tbody = document.getElementById('sampleListBody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" class="form-control" style="height: 32px;"></td>
        <td><input type="text" class="form-control" style="height: 32px;"></td>
        <td><input type="number" class="form-control" style="height: 32px; width: 60px;" value="1"></td>
        <td>
            <select class="form-control" style="height: 32px;">
                <option>混凝土抗压</option>
                <option>抗折</option>
                <option>钢筋拉伸</option>
            </select>
        </td>
        <td><i class="fa-solid fa-trash text-danger" style="cursor: pointer;" onclick="this.closest('tr').remove()"></i></td>
    `;
    tbody.appendChild(tr);
}

// Add Component Row for Site Entrustment
function addSiteComponentRow() {
    const tbody = document.getElementById('siteComponentListBody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" class="form-control" style="height: 32px;" value="New Component"></td>
        <td>
            <select class="form-control" style="height: 32px;">
                <option>回弹法</option>
                <option>超声回弹综合法</option>
                <option>钢筋扫描</option>
            </select>
        </td>
        <td><input type="number" class="form-control" style="height: 32px; width: 80px;" value="1"></td>
        <td><i class="fa-solid fa-trash text-danger" style="cursor: pointer;" onclick="this.closest('tr').remove()"></i></td>
    `;
    tbody.appendChild(tr);
}
