// Mi Kinder Feliz - JavaScript Principal
document.addEventListener('DOMContentLoaded', function() {    
    // VARIABLES GLOBALES

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    // Variables del carousel de servicios
    let currentServiceSlide = 0;
    const serviceCards = document.querySelectorAll('.service-card');
    const carouselTrack = document.querySelector('.carousel-track');
    const totalServiceCards = serviceCards.length;
    
    // Variables del scroll
    let ticking = false;    
    // NAVEGACIÓN MÓVIL

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu móvil
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menu
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });    
    // SLIDER HERO

    function showSlide(index) {
        // Ocultar todas las slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Mostrar slide actual
        if (slides[index]) {
            slides[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    // Event listeners para navegación del slider
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Event listeners para los dots
    dots.forEach((dot, index) => {
        dot.addEventListener('class', function() {
            showSlide(index);
        });
    });
    
    // Auto-play del slider
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pausar auto-play al hacer hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }    
    // CAROUSEL DE SERVICIOS

    function updateServiceCarousel() {
        if (carouselTrack) {
            const cardWidth = 320; // width + gap
            const translateX = -currentServiceSlide * cardWidth;
            carouselTrack.style.transform = `translateX(${translateX}px)`;
        }
    }
    
    function nextService() {
        if (currentServiceSlide < totalServiceCards - 1) {
            currentServiceSlide++;
            updateServiceCarousel();
        }
    }
    
    function prevService() {
        if (currentServiceSlide > 0) {
            currentServiceSlide--;
            updateServiceCarousel();
        }
    }
    
    // Event listeners para carousel de servicios
    const nextServiceBtn = document.querySelector('.carousel-btn.next');
    const prevServiceBtn = document.querySelector('.carousel-btn.prev');
    
    if (nextServiceBtn) {
        nextServiceBtn.addEventListener('click', nextService);
    }
    
    if (prevServiceBtn) {
        prevServiceBtn.addEventListener('click', prevService);
    }
    
    // Auto-scroll del carousel de servicios
    let serviceInterval = setInterval(function() {
        if (currentServiceSlide >= totalServiceCards - 1) {
            currentServiceSlide = 0;
        } else {
            currentServiceSlide++;
        }
        updateServiceCarousel();
    }, 4000);
    
    // Pausar auto-scroll al hacer hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', function() {
            clearInterval(serviceInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', function() {
            serviceInterval = setInterval(function() {
                if (currentServiceSlide >= totalServiceCards - 1) {
                    currentServiceSlide = 0;
                } else {
                    currentServiceSlide++;
                }
                updateServiceCarousel();
            }, 4000);
        });
    }    
    // ACORDEÓN

    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const content = document.querySelector(target);
            const icon = this.querySelector('i');
            
            // Cerrar otros acordeones
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this) {
                    const otherTarget = otherHeader.getAttribute('data-target');
                    const otherContent = document.querySelector(otherTarget);
                    const otherIcon = otherHeader.querySelector('i');
                    
                    if (otherContent) {
                        otherContent.style.maxHeight = '0';
                    }
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                    otherHeader.classList.remove('active');
                }
            });
            
            // Toggle acordeón actual
            if (content) {
                if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                    content.style.maxHeight = '0';
                    if (icon) {
                        icon.style.transform = 'rotate(0deg)';
                    }
                    this.classList.remove('active');
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    if (icon) {
                        icon.style.transform = 'rotate(45deg)';
                    }
                    this.classList.add('active');
                }
            }
        });
    });    
    // FORMULARIO DE CONTACTO

    const contactForm = document.getElementById('contactForm');
    
    function validateField(field, errorMessage) {
        const value = field.value.trim();
        const errorSpan = field.parentNode.querySelector('.error-message');
        
        if (!value) {
            field.classList.add('error');
            if (errorSpan) {
                errorSpan.textContent = errorMessage;
                errorSpan.classList.add('show');
            }
            return false;
        } else {
            field.classList.remove('error');
            if (errorSpan) {
                errorSpan.textContent = '';
                errorSpan.classList.remove('show');
            }
            return true;
        }
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function validatePhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    if (contactForm) {
        const nombre = document.getElementById('nombre');
        const email = document.getElementById('email');
        const telefono = document.getElementById('telefono');
        const mensaje = document.getElementById('mensaje');
        
        // Validación en tiempo real
        if (nombre) {
            nombre.addEventListener('blur', function() {
                validateField(this, 'Por favor ingresa tu nombre');
            });
        }
        
        if (email) {
            email.addEventListener('blur', function() {
                const value = this.value.trim();
                const errorSpan = this.parentNode.querySelector('.error-message');
                
                if (!value) {
                    this.classList.add('error');
                    if (errorSpan) {
                        errorSpan.textContent = 'Por favor ingresa tu email';
                        errorSpan.classList.add('show');
                    }
                } else if (!validateEmail(value)) {
                    this.classList.add('error');
                    if (errorSpan) {
                        errorSpan.textContent = 'Por favor ingresa un email válido';
                        errorSpan.classList.add('show');
                    }
                } else {
                    this.classList.remove('error');
                    if (errorSpan) {
                        errorSpan.textContent = '';
                        errorSpan.classList.remove('show');
                    }
                }
            });
        }
        
        if (telefono) {
            telefono.addEventListener('blur', function() {
                const value = this.value.trim();
                const errorSpan = this.parentNode.querySelector('.error-message');
                
                if (!value) {
                    this.classList.add('error');
                    if (errorSpan) {
                        errorSpan.textContent = 'Por favor ingresa tu teléfono';
                        errorSpan.classList.add('show');
                    }
                } else if (!validatePhone(value)) {
                    this.classList.add('error');
                    if (errorSpan) {
                        errorSpan.textContent = 'Por favor ingresa un teléfono válido';
                        errorSpan.classList.add('show');
                    }
                } else {
                    this.classList.remove('error');
                    if (errorSpan) {
                        errorSpan.textContent = '';
                        errorSpan.classList.remove('show');
                    }
                }
            });
        }
        
        if (mensaje) {
            mensaje.addEventListener('blur', function() {
                validateField(this, 'Por favor ingresa tu mensaje');
            });
        }
        
        // Envío del formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            // Validar todos los campos
            if (nombre && !validateField(nombre, 'Por favor ingresa tu nombre')) {
                isValid = false;
            }
            
            if (email) {
                const emailValue = email.value.trim();
                const emailErrorSpan = email.parentNode.querySelector('.error-message');
                
                if (!emailValue) {
                    email.classList.add('error');
                    if (emailErrorSpan) {
                        emailErrorSpan.textContent = 'Por favor ingresa tu email';
                        emailErrorSpan.classList.add('show');
                    }
                    isValid = false;
                } else if (!validateEmail(emailValue)) {
                    email.classList.add('error');
                    if (emailErrorSpan) {
                        emailErrorSpan.textContent = 'Por favor ingresa un email válido';
                        emailErrorSpan.classList.add('show');
                    }
                    isValid = false;
                }
            }
            
            if (telefono) {
                const phoneValue = telefono.value.trim();
                const phoneErrorSpan = telefono.parentNode.querySelector('.error-message');
                
                if (!phoneValue) {
                    telefono.classList.add('error');
                    if (phoneErrorSpan) {
                        phoneErrorSpan.textContent = 'Por favor ingresa tu teléfono';
                        phoneErrorSpan.classList.add('show');
                    }
                    isValid = false;
                } else if (!validatePhone(phoneValue)) {
                    telefono.classList.add('error');
                    if (phoneErrorSpan) {
                        phoneErrorSpan.textContent = 'Por favor ingresa un teléfono válido';
                        phoneErrorSpan.classList.add('show');
                    }
                    isValid = false;
                }
            }
            
            if (mensaje && !validateField(mensaje, 'Por favor ingresa tu mensaje')) {
                isValid = false;
            }
            
            if (isValid) {
                // Simular envío del formulario
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Enviando...';
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    alert('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');
                    contactForm.reset();
                    
                    // Limpiar clases de error
                    const fields = contactForm.querySelectorAll('input, textarea');
                    fields.forEach(field => {
                        field.classList.remove('error');
                        const errorSpan = field.parentNode.querySelector('.error-message');
                        if (errorSpan) {
                            errorSpan.textContent = '';
                            errorSpan.classList.remove('show');
                        }
                    });
                    
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }    
    // SCROLL SUAVE Y NAVEGACIÓN

    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    // Event listeners para navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScroll(href);
            }
        });
    });    
    // BOTÓN VOLVER ARRIBA

    const backToTopBtn = document.getElementById('btn-back-to-top');
    
    function updateBackToTopButton() {
        if (!ticking) {
            requestAnimationFrame(function() {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('show');
                } else {
                    backToTopBtn.classList.remove('show');
                }
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateBackToTopButton);
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }    
    // MODAL PROMOCIONAL

    const modal = document.getElementById('modal-promo');
    const closeModal = document.querySelector('.close-modal');
    const btnModal = document.querySelector('.btn-modal');

    setTimeout(function() {
        if (modal) {
            modal.classList.add('show');
        }
    }, 3000);
    
    // Cerrar modal
    function hideModal() {
        if (modal) {
            modal.classList.remove('show');
        }
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }
    
    if (btnModal) {
        btnModal.addEventListener('click', function() {
            hideModal();
            smoothScroll('#contacto');
        });
    }
    
    // Cerrar modal al hacer click fuera de él
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }    
    // EFECTOS DE SCROLL Y ANIMACIONES

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                
                if (entry.target.classList.contains('service-card') || 
                    entry.target.classList.contains('feature-item')) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-bounce');
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll(
        '.service-card, .feature-item, .about-text, .contact-info, .gallery-item'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });    
    // GALERÍA FANCYBOX

    if (typeof $.fancybox !== 'undefined') {
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
                "slideShow",
                "thumbs",
                "zoom",
                "fullScreen",
                "close"
            ],
            loop: true,
            protect: true
        });
    }    
    // EFECTOS HOVER ADICIONALES

    const hoverElements = document.querySelectorAll('.service-card, .gallery-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('hover-effect');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('hover-effect');
        });
    });    
    // MANEJO DE ERRORES Y FALLBACKS

    window.addEventListener('error', function(e) {
        console.warn('Error capturado:', e.message);
    });
    
    if (!window.IntersectionObserver) {
        elementsToAnimate.forEach(element => {
            element.classList.add('animate-fadeInUp');
        });
    }    


    console.log('Mi Kinder Feliz - JavaScript cargado correctamente');
    
    // Inicializar carousel de servicios
    updateServiceCarousel();
    
    // Agregar clase loaded al body para CSS
    document.body.classList.add('loaded');});
// FUNCIONES UTILITARIAS GLOBALES
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}