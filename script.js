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
        const submitButton = waitlistForm.querySelector('button[type="submit"]');

        // Disable button during submission
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // Form submission using fetch API
        fetch(waitlistForm.action, {
            method: 'POST',
            body: new FormData(waitlistForm),
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Success message
                formMessage.innerHTML = '<p class="success-message">Thank you for joining our waitlist! We\'ll be in touch soon.</p>';
                waitlistForm.reset();

                // Track conversion for SEO
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'waitlist_signup', {
                        'event_category': 'engagement',
                        'event_label': 'waitlist'
                    });
                }

                // Store in localStorage to show personalized message on return
                localStorage.setItem('waitlistSignup', 'true');
                localStorage.setItem('waitlistEmail', email);
            })
            .catch(error => {
                // Error message
                formMessage.innerHTML = '<p class="error-message">Oops! Something went wrong. Please try again or contact us directly.</p>';
                console.error('Error:', error);
            })
            .finally(() => {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = 'Join Waitlist';
            });
    });
}

// Check if user previously signed up
if (localStorage.getItem('waitlistSignup') === 'true') {
    const email = localStorage.getItem('waitlistEmail');
    const waitlistSection = document.getElementById('waitlist');

    if (waitlistSection) {
        const container = waitlistSection.querySelector('.container');
        const existingForm = waitlistSection.querySelector('#waitlist-form');

        if (existingForm && container) {
            // Replace form with personalized message
            const thankYouMessage = document.createElement('div');
            thankYouMessage.className = 'thank-you-message';
            thankYouMessage.innerHTML = `
                <h3>Thank You for Joining Our Waitlist!</h3>
                <p>We've received your email (${email}) and will notify you when we launch.</p>
                <p>Want to increase your chances of early access? Share Vestora Finance with others:</p>
                <div class="social-share">
                    <a href="https://twitter.com/intent/tweet?text=I%20just%20joined%20the%20waitlist%20for%20Vestora%20Finance%2C%20a%20revolutionary%20decentralized%20stock%20exchange.%20Join%20me!&url=https://vestora.finance" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-twitter"></i> Share on Twitter
                    </a>
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://vestora.finance" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-linkedin"></i> Share on LinkedIn
                    </a>
                </div>
            `;

            // Replace form with thank you message
            container.replaceChild(thankYouMessage, existingForm);
        }
    }
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
document.addEventListener('DOMContentLoaded', function () {
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.dashboard-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all content
            contents.forEach(content => content.classList.remove('active'));
            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Market tab functionality
    if (document.querySelector('.market-tab')) {
        const marketTabs = document.querySelectorAll('.market-tab');
        const marketContents = document.querySelectorAll('.market-content');

        marketTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                marketTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');

                // Hide all content
                marketContents.forEach(content => content.classList.remove('active'));
                // Show corresponding content
                const market = tab.getAttribute('data-market');
                document.getElementById(`${market}-market`).classList.add('active');
            });
        });
    }

    // Region tab switching
    if (document.querySelector('.region-tab')) {
        const regionTabs = document.querySelectorAll('.region-tab');

        regionTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Find parent market content
                const marketContent = tab.closest('.market-content');
                // Remove active class from all region tabs in this market
                marketContent.querySelectorAll('.region-tab').forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                tab.classList.add('active');
            });
        });
    }

    // Trade form functionality
    const tradeForm = document.querySelector('.trade-form');
    if (tradeForm) {
        const quantityInput = tradeForm.querySelector('input[type="number"][min="1"]');
        const priceInput = tradeForm.querySelector('input[type="number"][step="0.01"]');
        const totalValue = tradeForm.querySelector('.total-value');
        const sideBtns = tradeForm.querySelectorAll('.side-btn');

        // Calculate total
        const calculateTotal = () => {
            const quantity = parseFloat(quantityInput.value) || 0;
            const price = parseFloat(priceInput.value) || 0;
            const total = (quantity * price).toFixed(2);
            totalValue.textContent = `$${total}`;
        };

        // Update total when inputs change
        quantityInput.addEventListener('input', calculateTotal);
        priceInput.addEventListener('input', calculateTotal);

        // Side button toggle
        sideBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sideBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Initialize chart
        initializeChart();
    }

    // Copy address functionality
    const copyBtn = document.querySelector('.btn-icon[title="Copy address"]');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const addressInput = document.querySelector('.address-input input');
            addressInput.select();
            document.execCommand('copy');

            // Show copied tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'copy-tooltip';
            tooltip.textContent = 'Copied!';
            copyBtn.appendChild(tooltip);

            // Remove tooltip after 2 seconds
            setTimeout(() => {
                tooltip.remove();
            }, 2000);
        });
    }
});

// Initialize stock chart
function initializeChart() {
    const chartElement = document.getElementById('stock-chart');
    if (!chartElement) return;

    // Sample data for the chart
    const stockData = generateStockData();

    const options = {
        series: [{
            name: 'AAPL',
            data: stockData
        }],
        chart: {
            type: 'area',
            height: 350,
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
            type: 'datetime',
            labels: {
                formatter: function (value) {
                    return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    });
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
                    return '$' + value.toFixed(2);
                }
            }
        },
        tooltip: {
            x: {
                format: 'MMM dd'
            },
            y: {
                formatter: function (value) {
                    return '$' + value.toFixed(2);
                }
            },
            theme: 'light'
        },
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        }
    };

    // Initialize ApexCharts
    if (typeof ApexCharts !== 'undefined') {
        const chart = new ApexCharts(chartElement, options);
        chart.render();
    } else {
        // Fallback if ApexCharts is not loaded
        chartElement.innerHTML = '<div class="chart-fallback">Chart loading...</div>';

        // Try to load ApexCharts dynamically
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/apexcharts@3.35.0/dist/apexcharts.min.js';
        script.onload = function () {
            const chart = new ApexCharts(chartElement, options);
            chart.render();
        };
        document.head.appendChild(script);
    }
}

// Generate sample stock data
function generateStockData() {
    const data = [];
    let date = new Date();
    date.setDate(date.getDate() - 30); // Start from 30 days ago

    let value = 175 + Math.random() * 10;

    for (let i = 0; i < 30; i++) {
        date.setDate(date.getDate() + 1);

        // Random walk with slight upward bias
        value = value + (Math.random() - 0.45) * 5;

        // Ensure value stays within reasonable range
        value = Math.max(value, 165);
        value = Math.min(value, 195);

        data.push([date.getTime(), parseFloat(value.toFixed(2))]);
    }

    return data;
}

// Add these styles to your CSS
const additionalStyles = `
/* Chart Styles */
.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.stock-info h3 {
    font-size: 18px;
    margin-bottom: 5px;
}

.stock-price {
    font-size: 16px;
    font-weight: 500;
}

.timeframe-selector {
    display: flex;
    gap: 5px;
}

.timeframe-btn {
    padding: 5px 10px;
    font-size: 13px;
    border: 1px solid var(--border-color);
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
}

.timeframe-btn.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.chart-fallback {
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-light);
    font-size: 16px;
    background: var(--bg-color);
    border-radius: 8px;
}

/* Side Button Styles */
.side-selector {
    display: flex;
    gap: 10px;
    margin-bottom: 15px;
}

.side-btn {
    flex: 1;
    padding: 8px;
    font-size: 14px;
    border: 1px solid var(--border-color);
    background: transparent;
    border-radius: 4px;
    cursor: pointer;
}

.side-btn.buy.active {
    background: rgba(54, 179, 126, 0.1);
    color: var(--accent-color);
    border-color: var(--accent-color);
}

.side-btn.sell.active {
    background: rgba(255, 86, 48, 0.1);
    color: var(--error-color);
    border-color: var(--error-color);
}

/* Copy tooltip */
.address-input {
    position: relative;
    display: flex;
    align-items: center;
}

.address-input input {
    flex: 1;
    padding-right: 40px;
}

.btn-icon {
    position: absolute;
    right: 10px;
    background: transparent;
    border: none;
    color: var(--text-light);
    cursor: pointer;
    font-size: 16px;
}

.copy-tooltip {
    position: absolute;
    top: -30px;
    right: 0;
    background: var(--text-color);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    animation: fadeIn 0.3s ease;
}

.copy-tooltip:after {
    content: '';
    position: absolute;
    bottom: -5px;
    right: 10px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--text-color);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Responsive adjustments */
@media (max-width: 1200px) {
    .trade-container {
        grid-template-columns: 1fr;
    }
    
    .portfolio-overview {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
    
    .wallet-overview {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .dashboard-tabs {
        overflow-x: auto;
        padding-bottom: 5px;
    }
    
    .tab {
        white-space: nowrap;
    }
    
    .dashboard-content {
        height: auto;
        max-height: 800px;
    }
}
`;

// Add the styles to the document
const styleElement = document.createElement('style');
styleElement.textContent = additionalStyles;
document.head.appendChild(styleElement);

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
if (depositOptions.length > 0) {
    depositOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selected class from all options
            depositOptions.forEach(opt => opt.classList.remove('selected'));

            // Add selected class to clicked option
            option.classList.add('selected');

            // Check the radio button
            const radio = option.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });
}

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

// Advanced SEO Performance Optimization

// Core Web Vitals & User Experience Optimization
document.addEventListener('DOMContentLoaded', function () {
    // Deferred loading of non-critical resources
    setTimeout(function () {
        // Load non-critical CSS
        const deferredStyles = document.createElement('link');
        deferredStyles.rel = 'stylesheet';
        deferredStyles.href = 'non-critical.css';
        document.head.appendChild(deferredStyles);

        // Load non-critical scripts
        const deferredScripts = [
            'analytics.js',
            'https://cdn.jsdelivr.net/npm/apexcharts@3.35.0/dist/apexcharts.min.js'
        ];

        deferredScripts.forEach(script => {
            const scriptEl = document.createElement('script');
            scriptEl.src = script;
            document.body.appendChild(scriptEl);
        });
    }, 2000);

    // Initialize intersection observer for lazy loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without intersection observer
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    }

    // Add schema markup dynamically based on content
    addDynamicSchema();

    // Track user engagement for SEO signals
    trackUserEngagement();

    // Optimize for Core Web Vitals
    optimizeCoreWebVitals();
});

// Schema enhancement based on page content
function addDynamicSchema() {
    // Create organization schema
    const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Vestora Finance",
        "url": "https://vestora.finance",
        "logo": "https://vestora.finance/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "info@vestora.fi",
            "contactType": "customer service"
        }
    };

    // Add schema to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(orgSchema);
    document.head.appendChild(script);
}

// Track user engagement metrics
function trackUserEngagement() {
    // Record time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        const timeOnPage = (Date.now() - startTime) / 1000;
        // Send to analytics (would implement actual analytics call here)
        console.log(`Time on page: ${timeOnPage} seconds`);
    });

    // Track scroll depth
    let maxScroll = 0;
    document.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
        }
    });
}

// Optimize for Core Web Vitals
function optimizeCoreWebVitals() {
    // Optimize Largest Contentful Paint (LCP)
    document.querySelectorAll('.hero-content, .hero-image').forEach(el => {
        el.style.contentVisibility = 'auto';
    });

    // Optimize First Input Delay (FID)
    const longTasks = [];
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            longTasks.push({
                name: entry.name,
                duration: entry.duration,
                startTime: entry.startTime
            });
        }
    });

    observer.observe({ entryTypes: ['longtask'] });

    // Optimize Cumulative Layout Shift (CLS)
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) return;

        img.style.aspectRatio = img.width / img.height;
    });
}

// Add structured URLs for SEO
function addCanonicalLinksToDOM() {
    // Get current URL segments
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment.length > 0);

    // Build breadcrumb data
    if (segments.length > 0) {
        const breadcrumbData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": []
        };

        let currentPath = '';

        // Add home
        breadcrumbData.itemListElement.push({
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin
        });

        // Add each path segment
        segments.forEach((segment, index) => {
            currentPath += `/${segment}`;
            breadcrumbData.itemListElement.push({
                "@type": "ListItem",
                "position": index + 2,
                "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
                "item": `${window.location.origin}${currentPath}`
            });
        });

        // Add breadcrumb schema
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(breadcrumbData);
        document.head.appendChild(script);
    }
}

// Call when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addCanonicalLinksToDOM);
} else {
    addCanonicalLinksToDOM();
}

// Deposit method tabs
const depositMethodTabs = document.querySelectorAll('.deposit-method-tab');
const depositMethodContents = document.querySelectorAll('.deposit-method-content');

if (depositMethodTabs.length > 0) {
    depositMethodTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const method = tab.getAttribute('data-method');

            // Remove active class from all tabs and contents
            depositMethodTabs.forEach(t => t.classList.remove('active'));
            depositMethodContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${method}-method`).classList.add('active');
        });
    });
}

// Bank option selection
const bankOptions = document.querySelectorAll('.bank-option');
if (bankOptions.length > 0) {
    bankOptions.forEach(option => {
        option.addEventListener('click', () => {
            bankOptions.forEach(opt => opt.classList.remove('selected'));
            if (!option.classList.contains('add-new')) {
                option.classList.add('selected');
            } else {
                // Handle add new bank logic
                console.log('Add new bank clicked');
            }
        });
    });
}

// Orders tab switching
const ordersTabs = document.querySelectorAll('.orders-tab');
const ordersContents = document.querySelectorAll('.orders-content');

if (ordersTabs.length > 0) {
    ordersTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const ordersType = tab.getAttribute('data-orders');

            // Remove active class from all tabs and contents
            ordersTabs.forEach(t => t.classList.remove('active'));
            ordersContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${ordersType}-orders`).classList.add('active');
        });
    });
}

// Market orders filter
const filterSelect = document.querySelector('.filter-select');
if (filterSelect) {
    filterSelect.addEventListener('change', () => {
        const selectedSymbol = filterSelect.value;
        const orderRows = document.querySelectorAll('.market-orders-table tbody tr');

        orderRows.forEach(row => {
            const symbol = row.querySelector('td').textContent;
            if (selectedSymbol === 'all' || symbol === selectedSymbol) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
}

// Buy/Sell buttons in market orders
const marketActionButtons = document.querySelectorAll('.market-orders-table .btn-buy, .market-orders-table .btn-sell');
if (marketActionButtons.length > 0) {
    marketActionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('tr');
            const symbol = row.querySelector('td:first-child').textContent;
            const price = row.querySelector('td:nth-child(2)').textContent;
            const quantity = row.querySelector('td:nth-child(3)').textContent;

            // Switch to trade tab
            const tradeTab = document.querySelector('.tab[data-tab="trade"]');
            if (tradeTab) tradeTab.click();

            // Fill in the trade form
            setTimeout(() => {
                const symbolInput = document.querySelector('.trade-form input[placeholder="Enter stock symbol"]');
                const quantityInput = document.querySelector('.trade-form input[type="number"][min="1"]');
                const priceInput = document.querySelector('.trade-form input[type="number"][step="0.01"]');
                const sideBtns = document.querySelectorAll('.side-btn');

                if (symbolInput) symbolInput.value = symbol;
                if (quantityInput) quantityInput.value = quantity;
                if (priceInput) priceInput.value = price.replace('$', '');

                // Set the correct side (buy/sell)
                if (sideBtns.length > 0) {
                    if (button.classList.contains('btn-buy')) {
                        sideBtns[0].click(); // Buy button
                    } else {
                        sideBtns[1].click(); // Sell button
                    }
                }

                // Calculate total
                if (quantityInput && priceInput) {
                    const event = new Event('input');
                    quantityInput.dispatchEvent(event);
                }
            }, 100);
        });
    });
}

// Card input formatting
const cardNumberInput = document.querySelector('.card-input input');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 16) value = value.slice(0, 16);

        // Format with spaces
        const parts = [];
        for (let i = 0; i < value.length; i += 4) {
            parts.push(value.slice(i, i + 4));
        }
        e.target.value = parts.join(' ');
    });
}

// Expiry date formatting
const expiryInput = document.querySelector('.card-details input[placeholder="MM/YY"]');
if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);

        if (value.length > 2) {
            e.target.value = value.slice(0, 2) + '/' + value.slice(2);
        } else {
            e.target.value = value;
        }
    });
}

// CVC formatting
const cvcInput = document.querySelector('.card-details input[placeholder="CVC"]');
if (cvcInput) {
    cvcInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 3) value = value.slice(0, 3);
        e.target.value = value;
    });
}

// Initialize stock chart with more realistic data
function initializeChart() {
    const chartElement = document.getElementById('stock-chart');
    if (!chartElement) return;

    // Generate more realistic stock data
    const stockData = generateRealisticStockData();

    const options = {
        series: [{
            name: 'AAPL',
            data: stockData
        }],
        chart: {
            type: 'area',
            height: 350,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800
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
            type: 'datetime',
            labels: {
                formatter: function (value) {
                    return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
                    return '$' + value.toFixed(2);
                }
            }
        },
        tooltip: {
            x: {
                format: 'HH:mm'
            },
            y: {
                formatter: function (value) {
                    return '$' + value.toFixed(2);
                }
            },
            theme: 'light',
            style: {
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif'
            }
        },
        grid: {
            borderColor: '#f1f1f1',
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        },
        markers: {
            size: 0,
            strokeWidth: 0
        }
    };

    const chart = new ApexCharts(chartElement, options);
    chart.render();

    // Time period buttons
    const timeButtons = document.querySelectorAll('.time-btn');
    if (timeButtons.length > 0) {
        timeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                timeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update chart data based on time period
                const period = btn.getAttribute('data-time');
                let newData;

                switch (period) {
                    case '1d':
                        newData = generateRealisticStockData(24); // 24 hours
                        break;
                    case '1w':
                        newData = generateRealisticStockData(7 * 24); // 7 days
                        break;
                    case '1m':
                        newData = generateRealisticStockData(30 * 24); // 30 days
                        break;
                    case '3m':
                        newData = generateRealisticStockData(90 * 24); // 90 days
                        break;
                    case '1y':
                        newData = generateRealisticStockData(365 * 24); // 1 year
                        break;
                    default:
                        newData = generateRealisticStockData();
                }

                chart.updateSeries([{
                    name: 'AAPL',
                    data: newData
                }]);
            });
        });
    }
}

// Generate realistic stock data
function generateRealisticStockData(points = 48) {
    const data = [];
    let price = 182.50; // Starting price
    const volatility = 0.01; // 1% volatility
    const trend = 0.0002; // Slight upward trend

    const now = new Date();
    const msPerPoint = (24 * 60 * 60 * 1000) / points;

    for (let i = points; i > 0; i--) {
        const time = new Date(now.getTime() - (i * msPerPoint));

        // Random walk with slight trend
        const change = (Math.random() - 0.5) * volatility + trend;
        price = price * (1 + change);

        // Add some market patterns
        // Morning dip
        if (time.getHours() === 10) price *= 0.998;
        // Lunch dip
        if (time.getHours() === 12) price *= 0.997;
        // Afternoon rally
        if (time.getHours() === 15) price *= 1.002;

        data.push({
            x: time.getTime(),
            y: parseFloat(price.toFixed(2))
        });
    }

    return data;
}

// Call chart initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all dashboard functionality
    initializeChart();

    // Load ApexCharts if not already loaded
    if (typeof ApexCharts === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/apexcharts@3.35.0/dist/apexcharts.min.js';
        script.onload = initializeChart;
        document.head.appendChild(script);
    }
});

// Global Market Tab Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Market tab switching
    const marketTabs = document.querySelectorAll('.market-tab');
    const marketContents = document.querySelectorAll('.market-content');

    marketTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            marketTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all content
            marketContents.forEach(content => content.classList.remove('active'));
            // Show corresponding content
            const market = tab.getAttribute('data-market');
            document.getElementById(`${market}-market`).classList.add('active');
        });
    });

    // Region tab switching
    const regionTabs = document.querySelectorAll('.region-tab');

    regionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Find parent market content
            const marketContent = tab.closest('.market-content');
            // Remove active class from all region tabs in this market
            marketContent.querySelectorAll('.region-tab').forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Filter table rows based on region (this would be implemented with actual data)
            const region = tab.getAttribute('data-region');
            // Implementation would filter the table rows
        });
    });
});