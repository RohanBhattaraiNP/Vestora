// Remove or comment out the particles.js initialization code
// document.addEventListener('DOMContentLoaded', function () {
//     particlesJS('particles-js', {
//         ... particles configuration ...
//     });
// });

// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const nav = document.querySelector('nav');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', function () {
        nav.classList.toggle('active');
        this.setAttribute('aria-expanded', nav.classList.contains('active'));
    });
}

// FAQ accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-toggle i');

    question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
                otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
            }
        });

        // Toggle current item
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.className = 'fas fa-minus';
        } else {
            answer.style.maxHeight = null;
            icon.className = 'fas fa-plus';
        }
    });
});

// Waitlist form submission
const waitlistForm = document.getElementById('waitlist-form');
const formMessage = document.getElementById('form-message');

if (waitlistForm) {
    waitlistForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('email').value;

        // Simple validation
        if (!email || !email.includes('@')) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.className = 'error';
            return;
        }

        // Simulate form submission
        formMessage.textContent = 'Thank you for joining our waitlist! We\'ll be in touch soon.';
        formMessage.className = 'success';
        waitlistForm.reset();

        // In a real application, you would send this data to your server
    });
}

// 3D cube animation enhancement
const cube = document.querySelector('.cube');

if (cube) {
    // Add mouse movement effect to cube
    document.addEventListener('mousemove', function (e) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

        cube.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    // Reset cube animation when mouse leaves
    document.addEventListener('mouseleave', function () {
        cube.style.transform = 'rotateY(0deg) rotateX(0deg)';

        // Restart the rotation animation
        cube.style.animation = 'none';
        setTimeout(function () {
            cube.style.animation = 'rotate 20s infinite linear';
        }, 10);
    });
}

// Dashboard functionality
initDashboard();

// Create toast container
const toastContainer = document.createElement('div');
toastContainer.className = 'toast-container';
document.body.appendChild(toastContainer);

// Replace the deposit button alert with toast notification
const depositBtn = document.getElementById('btn-deposit');
if (depositBtn) {
    depositBtn.addEventListener('click', function () {
        showToast('Deposit Funds', 'This would open a deposit form in the full implementation.', 'info');
    });
}

// Replace the place order button alert with toast notification
const placeOrderBtn = document.getElementById('btn-place-order');
if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function () {
        showToast('Order Placed', 'Your order has been submitted successfully!', 'success');
    });
}

// Improved analytics charts with better color schemes
if (document.getElementById('performance-chart')) {
    const performanceChartOptions = {
        series: [{
            name: 'Performance',
            data: [2.4, 4.2, 6.8, 8.5, 10.2, 12.4]
        }],
        chart: {
            type: 'line',
            height: 150,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            colors: ['#36b37e']
        },
        grid: {
            borderColor: '#e9ecef',
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            labels: {
                style: {
                    colors: '#6c757d',
                    fontSize: '10px'
                }
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                formatter: function (value) {
                    return value + '%';
                },
                style: {
                    colors: '#6c757d',
                    fontSize: '10px'
                }
            }
        },
        tooltip: {
            y: {
                formatter: function (value) {
                    return value + '%';
                }
            }
        },
        markers: {
            size: 4,
            colors: ['#36b37e'],
            strokeColors: '#fff',
            strokeWidth: 2
        }
    };

    const performanceChart = new ApexCharts(document.getElementById('performance-chart'), performanceChartOptions);
    performanceChart.render();
}

if (document.getElementById('allocation-chart')) {
    const allocationChartOptions = {
        series: [45, 25, 15, 10, 5],
        chart: {
            type: 'donut',
            height: 250
        },
        labels: ['Stocks', 'ETFs', 'Bonds', 'Crypto', 'Cash'],
        colors: ['#0052cc', '#36b37e', '#00b8d9', '#6554c0', '#ffab00'],
        legend: {
            position: 'bottom',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            labels: {
                colors: '#253858'
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '60%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '12px',
                            fontFamily: 'Inter, sans-serif',
                            color: '#253858'
                        },
                        value: {
                            show: true,
                            fontSize: '16px',
                            fontFamily: 'Inter, sans-serif',
                            color: '#253858',
                            formatter: function (val) {
                                return val + '%';
                            }
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            fontSize: '14px',
                            fontFamily: 'Inter, sans-serif',
                            color: '#253858',
                            formatter: function (w) {
                                return '100%';
                            }
                        }
                    }
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const allocationChart = new ApexCharts(document.getElementById('allocation-chart'), allocationChartOptions);
    allocationChart.render();
}

if (document.getElementById('sector-chart')) {
    const sectorChartOptions = {
        series: [25, 20, 18, 15, 12, 10],
        chart: {
            type: 'donut',
            height: 250
        },
        labels: ['Technology', 'Financial', 'Healthcare', 'Consumer', 'Industrial', 'Other'],
        colors: ['#0052cc', '#00b8d9', '#36b37e', '#6554c0', '#ffab00', '#6c757d'],
        legend: {
            position: 'bottom',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            labels: {
                colors: '#253858'
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '60%'
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const sectorChart = new ApexCharts(document.getElementById('sector-chart'), sectorChartOptions);
    sectorChart.render();
}

if (document.getElementById('geography-chart')) {
    const geographyChartOptions = {
        series: [{
            data: [55, 20, 15, 8, 2]
        }],
        chart: {
            type: 'bar',
            height: 250,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                barHeight: '60%',
                distributed: true
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['United States', 'Europe', 'Asia', 'Emerging Markets', 'Other'],
            labels: {
                style: {
                    colors: '#6c757d',
                    fontSize: '10px'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: '#6c757d',
                    fontSize: '10px'
                }
            }
        },
        colors: ['#0052cc', '#00b8d9', '#36b37e', '#6554c0', '#ffab00'],
        grid: {
            borderColor: '#e9ecef',
            strokeDashArray: 4
        },
        tooltip: {
            y: {
                formatter: function (value) {
                    return value + '%';
                }
            }
        }
    };

    const geographyChart = new ApexCharts(document.getElementById('geography-chart'), geographyChartOptions);
    geographyChart.render();
}

// Initialize trade form functionality
const orderTypeSelect = document.getElementById('order-type');
const limitPriceGroup = document.getElementById('limit-price-group');

if (orderTypeSelect && limitPriceGroup) {
    orderTypeSelect.addEventListener('change', function () {
        if (this.value === 'limit' || this.value === 'stop') {
            limitPriceGroup.style.display = 'block';
        } else {
            limitPriceGroup.style.display = 'none';
        }
    });
}

// Deposit option selection
const depositOptions = document.querySelectorAll('.deposit-option');
depositOptions.forEach(option => {
    option.addEventListener('click', function () {
        depositOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
    });
});

// Cancel order functionality
const cancelButtons = document.querySelectorAll('.cancel-order');
cancelButtons.forEach(button => {
    button.addEventListener('click', function () {
        if (confirm('Are you sure you want to cancel this order?')) {
            // In a real app, this would call an API to cancel the order
            this.closest('tr').remove();
            showToast('Order Cancelled', 'Your order has been cancelled successfully.', 'success');
        }
    });
});

function initDashboard() {
    // Tab switching
    const tabs = document.querySelectorAll('.dashboard-tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const tabId = this.getAttribute('data-tab');

                // Remove active class from all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }

    // Initialize portfolio chart
    if (document.getElementById('portfolio-chart-container')) {
        const portfolioChartOptions = {
            series: [{
                name: 'Portfolio Value',
                data: [22500, 22800, 23200, 23100, 23400, 23800, 24100, 24300, 24500, 24700, 24875.65]
            }],
            chart: {
                type: 'area',
                height: 250,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2,
                colors: ['#0052cc']
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.2,
                    stops: [0, 90, 100],
                    colorStops: [
                        {
                            offset: 0,
                            color: '#0052cc',
                            opacity: 0.4
                        },
                        {
                            offset: 100,
                            color: '#0052cc',
                            opacity: 0
                        }
                    ]
                }
            },
            xaxis: {
                categories: ['Jun 1', 'Jun 5', 'Jun 10', 'Jun 15', 'Jun 20', 'Jun 25', 'Jun 30', 'Jul 5', 'Jul 10', 'Jul 15', 'Jul 20'],
                labels: {
                    style: {
                        colors: '#6c757d'
                    }
                },
                axisBorder: {
                    show: false
                }
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        return '$' + value.toLocaleString();
                    },
                    style: {
                        colors: '#6c757d'
                    }
                }
            },
            grid: {
                borderColor: '#e9ecef',
                strokeDashArray: 4,
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function (value) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        };

        const portfolioChart = new ApexCharts(document.getElementById('portfolio-chart-container'), portfolioChartOptions);
        portfolioChart.render();

        // Time filter functionality
        const timeFilters = document.querySelectorAll('.time-filter');
        if (timeFilters.length > 0) {
            timeFilters.forEach(filter => {
                filter.addEventListener('click', function () {
                    timeFilters.forEach(f => f.classList.remove('active'));
                    this.classList.add('active');

                    const period = this.getAttribute('data-period');
                    updatePortfolioChart(period, portfolioChart);
                });
            });
        }
    }

    // Populate holdings table
    const holdingsTable = document.querySelector('.holdings-table');
    if (holdingsTable) {
        const holdingsData = [
            { symbol: 'AAPL', name: 'Apple Inc.', price: 182.63, change: 1.2, value: 5478.90, type: 'stocks' },
            { symbol: 'MSFT', name: 'Microsoft Corp.', price: 338.11, change: 0.8, value: 3381.10, type: 'stocks' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 137.14, change: -0.5, value: 2742.80, type: 'stocks' },
            { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 129.96, change: 1.5, value: 3898.80, type: 'stocks' },
            { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.48, change: -2.1, value: 2484.80, type: 'stocks' },
            { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', price: 412.63, change: 0.7, value: 4126.30, type: 'etfs' },
            { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', price: 245.36, change: 0.6, value: 2453.60, type: 'etfs' }
        ];

        populateHoldings(holdingsData, holdingsTable);

        // Holdings filter functionality
        const viewOptions = document.querySelectorAll('.view-options span');
        if (viewOptions.length > 0) {
            viewOptions.forEach(option => {
                option.addEventListener('click', function () {
                    viewOptions.forEach(o => o.classList.remove('active'));
                    this.classList.add('active');

                    const filter = this.getAttribute('data-filter');
                    filterHoldings(filter, holdingsData, holdingsTable);
                });
            });
        }
    }

    // Quick action buttons
    const buyBtn = document.getElementById('btn-buy');
    const sellBtn = document.getElementById('btn-sell');
    const depositBtn = document.getElementById('btn-deposit');

    if (buyBtn) {
        buyBtn.addEventListener('click', function () {
            // Switch to trade tab and set to buy
            switchToTab('trade');
            const buyType = document.querySelector('.trade-type[data-type="buy"]');
            if (buyType) buyType.click();
        });
    }

    if (sellBtn) {
        sellBtn.addEventListener('click', function () {
            // Switch to trade tab and set to sell
            switchToTab('trade');
            const sellType = document.querySelector('.trade-type[data-type="sell"]');
            if (sellType) sellType.click();
        });
    }

    if (depositBtn) {
        depositBtn.addEventListener('click', function () {
            // Show toast notification instead of alert
            showToast('Deposit Funds', 'This would open a deposit form in the full implementation.', 'info');
        });
    }

    // Place order button
    const placeOrderBtn = document.getElementById('btn-place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function () {
            showToast('Order Placed', 'Your order has been submitted successfully!', 'success');
        });
    }
}

// Helper functions
function updatePortfolioChart(period, chart) {
    // In a real app, this would fetch data for the selected time period
    let newData;

    switch (period) {
        case '1d':
            newData = [24800, 24820, 24850, 24830, 24860, 24875.65];
            break;
        case '1w':
            newData = [24500, 24550, 24600, 24700, 24750, 24800, 24875.65];
            break;
        case '1m':
            newData = [22500, 22800, 23200, 23100, 23400, 23800, 24100, 24300, 24500, 24700, 24875.65];
            break;
        case '3m':
            newData = [21000, 21500, 22000, 22300, 22800, 23200, 23500, 24000, 24300, 24600, 24875.65];
            break;
        case '1y':
            newData = [18000, 19000, 19500, 20000, 21000, 22000, 22500, 23000, 23500, 24000, 24875.65];
            break;
        case 'all':
            newData = [10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000, 24875.65];
            break;
        default:
            newData = [24500, 24550, 24600, 24700, 24750, 24800, 24875.65];
    }

    chart.updateSeries([{
        name: 'Portfolio Value',
        data: newData
    }]);
}

function populateHoldings(data, container) {
    // Create table structure
    let html = `
        <table class="holdings-table-content">
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Change</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Add rows for each holding
    data.forEach(holding => {
        const changeClass = holding.change >= 0 ? 'positive' : 'negative';
        const changeIcon = holding.change >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';

        html += `
            <tr data-type="${holding.type}">
                <td class="symbol">${holding.symbol}</td>
                <td class="name">${holding.name}</td>
                <td class="price">$${holding.price.toFixed(2)}</td>
                <td class="change ${changeClass}">
                    <i class="fas ${changeIcon}"></i> ${Math.abs(holding.change)}%
                </td>
                <td class="value">$${holding.value.toFixed(2)}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

function filterHoldings(filter, data, container) {
    const filteredData = filter === 'all' ? data : data.filter(holding => holding.type === filter);
    populateHoldings(filteredData, container);
}

function switchToTab(tabId) {
    const tab = document.querySelector(`.tab[data-tab="${tabId}"]`);
    if (tab) tab.click();
}

function updateStockChart(period, chart) {
    // In a real app, this would fetch data for the selected time period
    let newData;

    switch (period) {
        case '1d':
            newData = [182.10, 182.25, 182.40, 182.30, 182.50, 182.63];
            break;
        case '1w':
            newData = [175.50, 176.20, 178.40, 177.80, 179.10, 180.50, 181.20, 182.63];
            break;
        case '1m':
            newData = [170.20, 172.50, 175.30, 174.80, 176.40, 178.20, 177.50, 179.30, 180.60, 181.40, 182.63];
            break;
        case '3m':
            newData = [165.10, 168.40, 170.20, 172.50, 175.30, 174.80, 176.40, 178.20, 177.50, 179.30, 180.60, 181.40, 182.63];
            break;
        case '1y':
            newData = [150.20, 155.40, 160.30, 165.10, 168.40, 170.20, 172.50, 175.30, 174.80, 176.40, 178.20, 177.50, 179.30, 180.60, 181.40, 182.63];
            break;
        default:
            newData = [175.50, 176.20, 178.40, 177.80, 179.10, 180.50, 181.20, 182.63];
    }

    chart.updateSeries([{
        name: 'Stock Price',
        data: newData
    }]);
}

function showToast(title, message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconClass = 'fas fa-info-circle';
    if (type === 'success') iconClass = 'fas fa-check-circle';
    if (type === 'error') iconClass = 'fas fa-exclamation-circle';

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="${iconClass}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    toastContainer.appendChild(toast);

    // Show the toast with a slight delay for the animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto-hide after 5 seconds
    const hideTimeout = setTimeout(() => {
        hideToast(toast);
    }, 5000);

    // Add click event to close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(hideTimeout);
        hideToast(toast);
    });
}

function hideToast(toast) {
    toast.classList.remove('show');

    // Remove from DOM after animation completes
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// Add this to optimize performance
document.addEventListener('DOMContentLoaded', function () {
    // Defer loading of non-critical scripts
    setTimeout(function () {
        const deferredScripts = ['analytics.js', 'non-critical.js'];
        deferredScripts.forEach(script => {
            const scriptEl = document.createElement('script');
            scriptEl.src = script;
            document.body.appendChild(scriptEl);
        });
    }, 3000);
});

// Add page preloading
const preloadLinks = [
    { rel: 'preload', href: 'tokenization.png', as: 'image' },
    { rel: 'preload', href: 'style.css', as: 'style' }
];

preloadLinks.forEach(link => {
    const linkEl = document.createElement('link');
    linkEl.rel = link.rel;
    linkEl.href = link.href;
    linkEl.as = link.as;
    document.head.appendChild(linkEl);
});