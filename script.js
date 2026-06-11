// 1. Scroll-Driven Micro-Interactions
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal(); // Initial check

// 2. Mouse Movement Reactivity for Glassmorphism
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)';
    });
});

// 3. Hero Background Parallax Effect
window.addEventListener('scroll', () => {
    const container = document.getElementById('hero-bg-container');
    if (container) {
        const scrolled = window.pageYOffset;
        container.style.transform = `translateY(${scrolled * 0.25}px)`;
    }
});

// 4. Freight Tab Interactivity
(function initFreightTabs() {
    const tabContainer = document.getElementById('freight-tabs');
    const panelContainer = document.getElementById('freight-panels');
    if (!tabContainer || !panelContainer) return;

    const tabs = tabContainer.querySelectorAll('.freight-tab');
    const panels = panelContainer.querySelectorAll('.freight-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            // Update tab active states
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Update panel active states with smooth transition
            panels.forEach(panel => {
                if (panel.getAttribute('data-panel') === target) {
                    panel.classList.add('active');
                } else {
                    panel.classList.remove('active');
                }
            });
        });
    });
})();

// 5. Choose Card tilt effect
document.querySelectorAll('.choose-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// 6. Contact form feedback animation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined text-base align-middle mr-1">check_circle</span> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        btn.style.color = '#fff';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.color = '';
            contactForm.reset();
        }, 2500);
    });
}

// 7. Interactive Scheduling & Demo Booking Modal System
(function initBookingModalSystem() {
    // 7a. Define the booking modal HTML structure
    const modalHTML = `
    <div id="booking-modal" class="fixed inset-0 z-50 flex items-center justify-center hidden opacity-0 transition-opacity duration-300">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-logi-deep-navy/60 backdrop-blur-md" id="booking-backdrop"></div>
        
        <!-- Modal Container -->
        <div class="relative w-full max-w-5xl mx-4 bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform scale-95 opacity-0 transition-all duration-300 max-h-[90vh] flex flex-col md:flex-row z-10" id="booking-container">
            
            <!-- Close Button -->
            <button id="close-booking" class="absolute top-4 right-4 text-secondary hover:text-logi-deep-navy bg-surface-container/50 hover:bg-surface-container p-2 rounded-full transition-all z-20 flex items-center justify-center animate-pulse">
                <span class="material-symbols-outlined text-xl">close</span>
            </button>

            <!-- Left Column: Info/Details -->
            <div class="w-full md:w-2/5 bg-gradient-to-br from-logi-deep-navy to-[#0d3a5c] text-white p-8 flex flex-col justify-between relative overflow-hidden">
                <div class="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-[80px]"></div>
                <div class="absolute -bottom-20 -right-20 w-40 h-40 bg-logi-vibrant-highlight/15 rounded-full blur-[80px]"></div>

                <div class="relative z-10 space-y-6">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-full bg-gradient-to-br from-logi-vibrant-highlight to-[#6F7BF7] flex items-center justify-center font-headline-md text-white font-bold text-lg shadow-lg shadow-logi-vibrant-highlight/20">
                            RB
                        </div>
                        <div>
                            <h4 class="font-headline-md text-sm font-bold text-white">Rajesh Bhimani</h4>
                            <p class="text-[10px] text-logi-vibrant-highlight font-medium uppercase tracking-wider">Director, Logibrisk</p>
                        </div>
                    </div>

                    <hr class="border-white/10">

                    <div class="space-y-4">
                        <h2 class="font-headline-lg text-xl md:text-2xl font-bold leading-tight">LogiBrisk Appointment – Consultation & Demo</h2>
                        
                        <div class="space-y-3">
                            <div class="flex items-center gap-2.5 text-xs text-white/80">
                                <span class="material-symbols-outlined text-logi-vibrant-highlight text-lg">schedule</span>
                                <span>30 min appointments</span>
                            </div>
                            <div class="flex items-center gap-2.5 text-xs text-white/80">
                                <span class="material-symbols-outlined text-logi-vibrant-highlight text-lg">videocam</span>
                                <span>Google Meet video conference info added after booking</span>
                            </div>
                        </div>
                    </div>

                    <p class="text-xs text-surface-variant leading-relaxed opacity-95">
                        Thank you for your interest in our services. Use this booking page to schedule a meeting with our team for a personalized platform demonstration and consultation.
                    </p>
                </div>

                <div class="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                    <span class="text-[9px] text-white/50 uppercase tracking-widest">Logibrisk Scheduling</span>
                    <span class="text-[9px] text-logi-vibrant-highlight flex items-center gap-1 font-semibold">
                        <span class="w-1.5 h-1.5 rounded-full bg-logi-vibrant-highlight animate-pulse"></span> Secure Booking
                    </span>
                </div>
            </div>

            <!-- Right Column: Interactive Schedule Panels -->
            <div class="w-full md:w-3/5 bg-surface-bright p-8 overflow-y-auto max-h-[80vh] md:max-h-none flex flex-col justify-between">
                
                <!-- STEP 1: Select Date & Time -->
                <div id="booking-step-schedule" class="space-y-6 flex-grow">
                    <div class="space-y-1">
                        <h3 class="font-headline-md text-base text-logi-deep-navy font-bold">Select an appointment time</h3>
                        <p class="text-[11px] text-secondary flex items-center gap-1">
                            <span class="material-symbols-outlined text-sm">public</span>
                            (GMT+00:00) Coordinated Universal Time
                        </p>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <!-- Calendar Box (7 cols) -->
                        <div class="lg:col-span-7 space-y-4">
                            <div class="flex items-center justify-between px-2">
                                <span class="font-headline-md text-sm font-bold text-logi-deep-navy" id="calendar-month-year">June 2026</span>
                                <div class="flex gap-1">
                                    <button id="prev-month" class="p-1.5 rounded-lg hover:bg-surface-container transition-colors text-secondary hover:text-logi-deep-navy">
                                        <span class="material-symbols-outlined text-base">chevron_left</span>
                                    </button>
                                    <button id="next-month" class="p-1.5 rounded-lg hover:bg-surface-container transition-colors text-secondary hover:text-logi-deep-navy">
                                        <span class="material-symbols-outlined text-base">chevron_right</span>
                                    </button>
                                </div>
                            </div>

                            <div class="grid grid-cols-7 gap-y-2 text-center text-xs">
                                <div class="text-[10px] font-bold text-secondary uppercase py-1">S</div>
                                <div class="text-[10px] font-bold text-secondary uppercase py-1">M</div>
                                <div class="text-[10px] font-bold text-secondary uppercase py-1">T</div>
                                <div class="text-[10px] font-bold text-secondary uppercase py-1">W</div>
                                <div class="text-[10px] font-bold text-secondary uppercase py-1">T</div>
                                <div class="text-[10px] font-bold text-secondary uppercase py-1">F</div>
                                <div class="text-[10px] font-bold text-secondary uppercase py-1">S</div>

                                <div class="contents" id="calendar-days"></div>
                            </div>
                        </div>

                        <!-- Slots Box (5 cols) -->
                        <div class="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-outline/10 lg:pl-6 pt-4 lg:pt-0 space-y-4">
                            <h4 class="font-headline-md text-xs font-bold text-logi-deep-navy" id="selected-day-label">Friday, June 12</h4>
                            <div class="space-y-2 overflow-y-auto max-h-[200px] pr-1" id="time-slots-container"></div>
                        </div>
                    </div>
                </div>

                <!-- STEP 2: Fill Details Form -->
                <div id="booking-step-form" class="space-y-6 flex-grow hidden">
                    <div class="space-y-1">
                        <button id="back-to-schedule" class="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                            <span class="material-symbols-outlined text-sm">arrow_back</span> Back to calendar
                        </button>
                        <h3 class="font-headline-lg text-lg text-logi-deep-navy font-bold">Confirm details</h3>
                        <p class="text-[11px] text-secondary flex items-center gap-1.5" id="booking-summary-text">
                            <span class="material-symbols-outlined text-sm text-primary">schedule</span>
                            June 12, 2026 at 9:30 AM (UTC)
                        </p>
                    </div>

                    <form class="space-y-4" id="appointment-form" onsubmit="return false;">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-logi-deep-navy text-[10px] font-bold mb-1 uppercase tracking-wider">Your Name *</label>
                                <input type="text" placeholder="John Doe" required
                                    class="w-full px-4 py-2 bg-white border border-outline/15 rounded-xl text-xs font-body-md text-logi-deep-navy placeholder:text-secondary/40 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                                    id="book-name">
                            </div>
                            <div>
                                <label class="block text-logi-deep-navy text-[10px] font-bold mb-1 uppercase tracking-wider">Email Address *</label>
                                <input type="email" placeholder="john@acme.com" required
                                    class="w-full px-4 py-2 bg-white border border-outline/15 rounded-xl text-xs font-body-md text-logi-deep-navy placeholder:text-secondary/40 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                                    id="book-email">
                            </div>
                        </div>
                        <div>
                            <label class="block text-logi-deep-navy text-[10px] font-bold mb-1 uppercase tracking-wider">Company Name</label>
                            <input type="text" placeholder="Acme Logistics"
                                class="w-full px-4 py-2 bg-white border border-outline/15 rounded-xl text-xs font-body-md text-logi-deep-navy placeholder:text-secondary/40 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all"
                                id="book-company">
                        </div>
                        <div>
                            <label class="block text-logi-deep-navy text-[10px] font-bold mb-1 uppercase tracking-wider">Requirements or Fleet Details</label>
                            <textarea placeholder="Tell us about your logistics needs..." rows="3"
                                class="w-full px-4 py-2 bg-white border border-outline/15 rounded-xl text-xs font-body-md text-logi-deep-navy placeholder:text-secondary/40 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-all resize-none"
                                id="book-notes"></textarea>
                        </div>
                        <button type="submit" id="confirm-booking-btn"
                            class="w-full px-8 py-3 rounded-xl bg-gradient-to-r from-primary via-[#6F7BF7] to-logi-vibrant-highlight text-white font-bold text-xs shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2">
                            <span class="material-symbols-outlined text-base">task_alt</span>
                            Confirm Appointment
                        </button>
                    </form>
                </div>

                <!-- STEP 3: Success Screen -->
                <div id="booking-step-success" class="space-y-6 py-8 text-center flex-grow hidden">
                    <div class="w-16 h-16 rounded-full bg-data-success/10 text-data-success flex items-center justify-center mx-auto mb-4">
                        <span class="material-symbols-outlined text-4xl">check_circle</span>
                    </div>
                    <div class="space-y-2">
                        <h3 class="font-headline-lg text-xl text-logi-deep-navy font-bold">Booking Confirmed!</h3>
                        <p class="text-xs text-secondary max-w-sm mx-auto leading-relaxed">
                            Your consultation and demo appointment has been scheduled successfully. A Google Meet invitation link is ready.
                        </p>
                    </div>
                    <div class="bg-surface-container-low p-4 rounded-2xl max-w-sm mx-auto border border-outline/5 space-y-2.5 text-left">
                        <div class="flex items-center gap-2 text-xs text-logi-deep-navy font-bold">
                            <span class="material-symbols-outlined text-primary text-base">event</span>
                            <span id="success-date-time">Friday, June 12 at 9:30 AM (UTC)</span>
                        </div>
                        <div class="flex items-center gap-2 text-xs text-secondary">
                            <span class="material-symbols-outlined text-base">video_camera_back</span>
                            <span>Google Meet: <a href="#" onclick="return false;" class="text-primary underline font-medium">meet.google.com/abc-defg-hij</a></span>
                        </div>
                    </div>
                    <button id="success-done-btn" class="px-8 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-[#004b71] transition-all">
                        Done
                    </button>
                </div>
                
                <div class="pt-6 border-t border-outline/10 text-center">
                    <p class="text-[9px] text-secondary">Powered by <span class="font-bold text-logi-deep-navy">Logibrisk Scheduling Systems</span> — © 2026</p>
                </div>
            </div>

        </div>
    </div>
    `;

    // Append modal structure to document body
    const modalWrapper = document.createElement('div');
    modalWrapper.innerHTML = modalHTML;
    document.body.appendChild(modalWrapper.firstElementChild);

    // Get references
    const modal = document.getElementById('booking-modal');
    const container = document.getElementById('booking-container');
    const backdrop = document.getElementById('booking-backdrop');
    const closeBtn = document.getElementById('close-booking');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const calendarDays = document.getElementById('calendar-days');
    const selectedDayLabel = document.getElementById('selected-day-label');
    const timeSlotsContainer = document.getElementById('time-slots-container');
    
    const stepSchedule = document.getElementById('booking-step-schedule');
    const stepForm = document.getElementById('booking-step-form');
    const stepSuccess = document.getElementById('booking-step-success');
    
    const backToScheduleBtn = document.getElementById('back-to-schedule');
    const appointmentForm = document.getElementById('appointment-form');
    const bookingSummaryText = document.getElementById('booking-summary-text');
    const successDateTimeText = document.getElementById('success-date-time');
    const successDoneBtn = document.getElementById('success-done-btn');

    // Calendar state
    let currentYear = 2026;
    let currentMonth = 5; // June
    let selectedDate = new Date(2026, 5, 12); // Default to Friday, June 12

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Render calendar helper
    function renderCalendar() {
        calendarMonthYear.textContent = `${months[currentMonth]} ${currentYear}`;
        calendarDays.innerHTML = '';

        // Day of week of first day of month
        const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
        // Total days in current month
        const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Previous month days placeholder
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDiv = document.createElement('div');
            calendarDays.appendChild(emptyDiv);
        }

        // Fill current month days
        for (let day = 1; day <= totalDays; day++) {
            const dateObj = new Date(currentYear, currentMonth, day);
            const dayOfWeek = dateObj.getDay();
            
            const dayBtn = document.createElement('button');
            dayBtn.className = 'calendar-day-btn';
            dayBtn.textContent = day;

            // Mark weekends as disabled, weekdays as available
            const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
            if (isWeekend) {
                dayBtn.classList.add('disabled');
            } else {
                dayBtn.classList.add('available');
                
                // Add event listener for available days
                dayBtn.addEventListener('click', () => {
                    selectedDate = new Date(currentYear, currentMonth, day);
                    
                    document.querySelectorAll('.calendar-day-btn').forEach(btn => btn.classList.remove('active'));
                    dayBtn.classList.add('active');
                    
                    updateSelectedDayUI();
                });
            }

            // Highlight if matches selectedDate
            if (
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getFullYear() === currentYear
            ) {
                dayBtn.classList.add('active');
            }

            calendarDays.appendChild(dayBtn);
        }
    }

    // Update selected day display and regenerate slots
    function updateSelectedDayUI() {
        const dayName = weekdays[selectedDate.getDay()];
        const monthName = months[selectedDate.getMonth()];
        const dayNum = selectedDate.getDate();
        
        selectedDayLabel.textContent = `${dayName}, ${monthName} ${dayNum}`;
        
        generateTimeSlots();
    }

    // Generate time slots based on day
    function generateTimeSlots() {
        timeSlotsContainer.innerHTML = '';
        
        const slots = [
            "9:30 AM", "10:15 AM", "11:00 AM", "11:45 AM",
            "2:30 PM", "3:15 PM", "4:00 PM", "4:45 PM"
        ];

        slots.forEach(time => {
            const slotBtn = document.createElement('button');
            slotBtn.className = 'time-slot-btn';
            slotBtn.textContent = time;
            
            slotBtn.addEventListener('click', () => {
                showStep('form');
                
                const formattedDate = `${weekdays[selectedDate.getDay()]}, ${months[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
                bookingSummaryText.innerHTML = `
                    <span class="material-symbols-outlined text-sm text-primary align-middle mr-1">schedule</span>
                    ${formattedDate} at ${time} (UTC)
                `;
                successDateTimeText.textContent = `${formattedDate} at ${time} (UTC)`;
            });

            timeSlotsContainer.appendChild(slotBtn);
        });
    }

    // Modal navigation helper
    function showStep(step) {
        stepSchedule.classList.add('hidden');
        stepForm.classList.add('hidden');
        stepSuccess.classList.add('hidden');

        if (step === 'schedule') {
            stepSchedule.classList.remove('hidden');
        } else if (step === 'form') {
            stepForm.classList.remove('hidden');
        } else if (step === 'success') {
            stepSuccess.classList.remove('hidden');
        }
    }

    // Open Modal
    function openModal() {
        showStep('schedule');
        
        currentYear = selectedDate.getFullYear();
        currentMonth = selectedDate.getMonth();
        
        renderCalendar();
        updateSelectedDayUI();

        modal.classList.remove('hidden');
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            container.classList.remove('scale-95', 'opacity-0');
        });
    }

    // Close Modal
    function closeModal() {
        modal.classList.add('opacity-0');
        container.classList.add('scale-95', 'opacity-0');
        
        setTimeout(() => {
            modal.classList.add('hidden');
            appointmentForm.reset();
        }, 300);
    }

    // Hook click events on schedule demo buttons
    function bindTriggers() {
        document.querySelectorAll('.js-schedule-demo').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });
    }

    // Event Listeners
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    backToScheduleBtn.addEventListener('click', () => {
        showStep('schedule');
    });

    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('confirm-booking-btn');
        const originalHTML = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="material-symbols-outlined text-base animate-spin">sync</span> Booking...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            showStep('success');
        }, 1500);
    });

    successDoneBtn.addEventListener('click', closeModal);

    // Initial binding
    bindTriggers();

    // Re-bind when document loads completely
    window.addEventListener('load', bindTriggers);
    document.addEventListener('DOMContentLoaded', bindTriggers);

    // Export a global method
    window.openBookingModal = openModal;
})();

// 8. Prevent FOUT / unstyled text flash for icons (smooth fade-in)
(function initFontFadeIn() {
    function showIcons() {
        document.documentElement.classList.add('fonts-loaded');
    }
    if (document.fonts) {
        document.fonts.ready.then(showIcons);
        // Fallback safety timeout if fonts take too long to load
        setTimeout(showIcons, 1200);
    } else {
        showIcons();
    }
})();
