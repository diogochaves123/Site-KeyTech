// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGAÇÃO SUAVE =====
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // ===== ANIMAÇÃO DE CONTADORES =====
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
    
    // Observer para animar contadores quando entrarem na viewport
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                animateCounter(statNumber);
                statsObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // ===== MODAL DE METODOLOGIA =====
    const methodologyBtn = document.getElementById('methodologyBtn');
    const methodologyModal = document.getElementById('methodologyModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    function openMethodologyModal() {
        methodologyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMethodologyModal() {
        methodologyModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Event listeners para abrir e fechar o modal
    if (methodologyBtn) {
        methodologyBtn.addEventListener('click', openMethodologyModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeMethodologyModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeMethodologyModal);
    }

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && methodologyModal.classList.contains('active')) {
            closeMethodologyModal();
        }
    });

    // ===== CHAT WIDGET =====
    const chatButton = document.getElementById('chatButton');
    const chatPanel = document.getElementById('chatPanel');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');

    // Base de conhecimento do chat
    const chatKnowledge = {
        services: {
            'desenvolvimento web': {
                keywords: ['site', 'website', 'web', 'desenvolvimento web', 'landing page', 'e-commerce'],
                response: 'Perfeito! Desenvolvemos sites modernos e responsivos. Que tipo de site você precisa?',
                options: ['Site Institucional', 'E-commerce', 'Landing Page', 'Sistema Web', 'Falar com Especialista']
            },
            'aplicativos mobile': {
                keywords: ['app', 'aplicativo', 'mobile', 'android', 'ios', 'celular'],
                response: 'Excelente! Criamos aplicativos nativos e híbridos. Que tipo de app você tem em mente?',
                options: ['App de Vendas', 'App Empresarial', 'App de Entrega', 'App Personalizado', 'Falar com Especialista']
            },
            'cloud computing': {
                keywords: ['nuvem', 'cloud', 'servidor', 'hosting', 'aws', 'azure'],
                response: 'Ótimo! Oferecemos soluções em nuvem escaláveis. Como posso ajudar?',
                options: ['Migração para Nuvem', 'Backup na Nuvem', 'Servidores Cloud', 'Otimização de Custos', 'Falar com Especialista']
            },
            'infraestrutura de redes': {
                keywords: ['rede', 'redes', 'internet', 'wi-fi', 'roteador', 'switch'],
                response: 'Perfeito! Implementamos infraestruturas de rede robustas. Qual sua necessidade?',
                options: ['Projeto de Rede', 'Configuração de Equipamentos', 'Suporte Técnico', 'Monitoramento', 'Falar com Especialista']
            },
            'segurança de redes': {
                keywords: ['segurança', 'firewall', 'vpn', 'proteção', 'cybersecurity'],
                response: 'Excelente! Protegemos suas redes contra ameaças. Que tipo de proteção você precisa?',
                options: ['Firewall', 'VPN', 'Backup de Segurança', 'Auditoria', 'Falar com Especialista']
            },
            'manutenção técnica': {
                keywords: ['manutenção', 'computador', 'notebook', 'hardware', 'reparo', 'limpeza'],
                response: 'Perfeito! Oferecemos manutenção técnica completa. Como posso ajudar?',
                options: ['Manutenção de PC', 'Reparo de Notebook', 'Limpeza', 'Recuperação de Dados', 'Falar com Especialista']
            }
        },
        general: {
            'orcamento': {
                keywords: ['orcamento', 'preço', 'valor', 'quanto custa', 'precificação'],
                response: 'Claro! Vou te ajudar com um orçamento personalizado. Que serviço você tem interesse?',
                action: 'whatsapp'
            },
            'contato': {
                keywords: ['contato', 'falar', 'telefone', 'whatsapp', 'email'],
                response: 'Perfeito! Aqui estão nossas formas de contato:',
                action: 'contact_info'
            },
            'sobre': {
                keywords: ['sobre', 'empresa', 'quem somos', 'história', 'equipe'],
                response: 'Somos a KeyTech, especialistas em soluções tecnológicas inovadoras. Que tal conhecer mais sobre nós?',
                action: 'about_info'
            }
        }
    };

    // Toggle do chat
    if (chatButton) {
        chatButton.addEventListener('click', function() {
            chatPanel.classList.toggle('active');
            if (chatPanel.classList.contains('active')) {
                chatInput.focus();
                // Adiciona mensagem de boas-vindas se for a primeira vez
                if (chatMessages.children.length <= 1) {
                    setTimeout(() => {
                        addWelcomeMessage();
                    }, 500);
                }
            }
        });
    }

    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatPanel.classList.remove('active');
        });
    }

    // Mensagem de boas-vindas
    function addWelcomeMessage() {
        const welcomeMessage = `
            <div class="message bot">
                <p>Olá! 👋 Sou o assistente virtual da KeyTech. Como posso ajudar você hoje?</p>
                <div class="chat-options">
                    <button class="chat-option" data-service="orcamento">📋 Solicitar Orçamento</button>
                    <button class="chat-option" data-service="desenvolvimento web">🌐 Desenvolvimento Web</button>
                    <button class="chat-option" data-service="aplicativos mobile">📱 Aplicativos Mobile</button>
                    <button class="chat-option" data-service="cloud computing">☁️ Cloud Computing</button>
                    <button class="chat-option" data-service="infraestrutura de redes">🌐 Infraestrutura de Redes</button>
                    <button class="chat-option" data-service="segurança de redes">🔒 Segurança de Redes</button>
                    <button class="chat-option" data-service="manutenção técnica">🔧 Manutenção Técnica</button>
                </div>
            </div>
        `;
        chatMessages.insertAdjacentHTML('beforeend', welcomeMessage);
        
        // Adiciona event listeners aos botões
        const options = chatMessages.querySelectorAll('.chat-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                const service = this.getAttribute('data-service');
                handleServiceSelection(service);
            });
        });
    }

    // Processa seleção de serviço
    function handleServiceSelection(service) {
        // Adiciona a seleção do usuário
        addMessage(service, 'user');
        
        setTimeout(() => {
            if (service === 'orcamento') {
                addMessage('Perfeito! Vou te conectar com nossa equipe para um orçamento personalizado. 🚀', 'bot');
                setTimeout(() => {
                    addMessage('Abrindo WhatsApp...', 'bot');
                    setTimeout(() => {
                        openWhatsAppWithMessage();
                    }, 1000);
                }, 1500);
            } else if (chatKnowledge.services[service]) {
                const serviceInfo = chatKnowledge.services[service];
                addMessage(serviceInfo.response, 'bot');
                
                // Adiciona opções específicas do serviço
                setTimeout(() => {
                    const optionsHTML = serviceInfo.options.map(option => 
                        `<button class="chat-option" data-action="${option.toLowerCase()}">${option}</button>`
                    ).join('');
                    
                    const optionsMessage = `
                        <div class="message bot">
                            <div class="chat-options">
                                ${optionsHTML}
                            </div>
                        </div>
                    `;
                    chatMessages.insertAdjacentHTML('beforeend', optionsMessage);
                    
                    // Adiciona event listeners
                    const newOptions = chatMessages.querySelectorAll('.chat-option');
                    newOptions.forEach(option => {
                        option.addEventListener('click', function() {
                            const action = this.getAttribute('data-action');
                            handleActionSelection(action, service);
                        });
                    });
                }, 1000);
            }
        }, 500);
    }

    // Processa ações específicas
    function handleActionSelection(action, service) {
        addMessage(action, 'user');
        
        setTimeout(() => {
            if (action.includes('falar com especialista')) {
                addMessage('Perfeito! Vou te conectar com nosso especialista em ' + service + '. 📞', 'bot');
                setTimeout(() => {
                    addMessage('Abrindo WhatsApp...', 'bot');
                    setTimeout(() => {
                        openWhatsAppWithSpecialistMessage();
                    }, 1000);
                }, 1500);
            } else {
                addMessage('Excelente escolha! Vou te conectar com nossa equipe para detalhar sobre ' + action + '. 🚀', 'bot');
                setTimeout(() => {
                    addMessage('Abrindo WhatsApp...', 'bot');
                    setTimeout(() => {
                        openWhatsAppWithMessage();
                    }, 1000);
                }, 1500);
            }
        }, 500);
    }

    // Envio de mensagem no chat
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Adiciona mensagem do usuário
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Processa a mensagem
            setTimeout(() => {
                processUserMessage(message.toLowerCase());
            }, 500);
        }
    }

    // Processa mensagem do usuário
    function processUserMessage(message) {
        let response = null;
        let action = null;
        
        // Verifica serviços
        for (const [service, info] of Object.entries(chatKnowledge.services)) {
            if (info.keywords.some(keyword => message.includes(keyword))) {
                response = info.response;
                break;
            }
        }
        
        // Verifica intenções gerais
        if (!response) {
            for (const [intent, info] of Object.entries(chatKnowledge.general)) {
                if (info.keywords.some(keyword => message.includes(keyword))) {
                    response = info.response;
                    action = info.action;
                    break;
                }
            }
        }
        
        // Resposta padrão se não encontrou nada específico
        if (!response) {
            response = 'Interessante! Posso te ajudar com nossos serviços. Que tal começar com uma opção?';
        }
        
        addMessage(response, 'bot');
        
        // Executa ação se necessário
        if (action === 'whatsapp') {
            setTimeout(() => {
                addMessage('Vou te conectar com nossa equipe via WhatsApp! 📱', 'bot');
                setTimeout(() => {
                    openWhatsAppWithMessage();
                }, 1500);
            }, 1000);
        } else if (action === 'contact_info') {
            setTimeout(() => {
                addMessage(`📧 Email: ${KeyTechConfig.contact.email}\n📞 WhatsApp: ${KeyTechConfig.contact.phone}\n📍 ${KeyTechConfig.contact.location}`, 'bot');
            }, 1000);
        } else if (action === 'about_info') {
            setTimeout(() => {
                addMessage('Somos especialistas em tecnologia com foco em inovação e resultados. Nossa equipe é liderada por Diogo Vaz de Chaves, CEO com experiência em desenvolvimento e gestão de projetos. 🚀', 'bot');
            }, 1000);
        }
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // ===== SCROLL TO TOP =====
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== FORMULÁRIO DE CONTATO =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Get form data
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                message: formData.get('message')
            };
            
            // Update button state
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            try {
                // Send to API using configuration
                const apiUrl = getApiUrl('/api/contact');
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Success message
                    showNotification(result.message, 'success');
                    this.reset();
                } else {
                    // Error message
                    showNotification(result.message || 'Erro ao enviar mensagem. Tente novamente.', 'error');
                }
                
            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                showNotification('Erro de conexão. Verifique sua internet e tente novamente.', 'error');
            } finally {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // ===== FUNÇÃO PARA MOSTRAR NOTIFICAÇÕES =====
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    // ===== ANIMAÇÕES DE ENTRADA =====
    const animatedElements = document.querySelectorAll('.service-card, .showcase-item, .stat-item');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });

    // ===== SHOWCASE ITEMS INTERATIVOS =====
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    showcaseItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active de todos os itens
            showcaseItems.forEach(i => i.classList.remove('active'));
            // Adiciona active ao item clicado
            this.classList.add('active');
        });
    });

    // ===== MOBILE MENU =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fecha menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ===== EFEITOS DE HOVER NOS SERVIÇOS =====
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== PARALLAX EFFECT NO HERO =====
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // ===== TYPING EFFECT NO TÍTULO =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Aplica typing effect ao título principal quando a página carrega
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }

    // ===== SMOOTH SCROLL PARA TODOS OS LINKS INTERNOS =====
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Adiciona um destaque visual temporário ao elemento de destino
                if (targetId.includes('-')) { // Se for um link de serviço
                    targetElement.classList.add('highlight');
                    
                    setTimeout(() => {
                        targetElement.classList.remove('highlight');
                    }, 1000);
                }
            }
        });
    });

    // ===== LAZY LOADING PARA IMAGENS =====
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ===== PRELOADER =====
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });

    // ===== VALIDAÇÃO DE FORMULÁRIO EM TEMPO REAL =====
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove classes de erro anteriores
        field.classList.remove('error', 'success');

        // Validações específicas
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um email válido.';
            }
        }

        if (field.required && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório.';
        }

        // Aplica classes e mensagens
        if (!isValid) {
            field.classList.add('error');
            showFieldError(field, errorMessage);
        } else if (value) {
            field.classList.add('success');
            removeFieldError(field);
        }
    }

    function showFieldError(field, message) {
        removeFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.parentNode.appendChild(errorDiv);
    }

    function removeFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    // ===== MODAIS DE SERVIÇOS =====
    const serviceModals = {
        webDev: {
            modal: document.getElementById('webDevModal'),
            close: document.getElementById('webDevModalClose'),
            overlay: document.getElementById('webDevModalOverlay')
        },
        mobileDev: {
            modal: document.getElementById('mobileDevModal'),
            close: document.getElementById('mobileDevModalClose'),
            overlay: document.getElementById('mobileDevModalOverlay')
        },
        cloud: {
            modal: document.getElementById('cloudModal'),
            close: document.getElementById('cloudModalClose'),
            overlay: document.getElementById('cloudModalOverlay')
        },
        network: {
            modal: document.getElementById('networkModal'),
            close: document.getElementById('networkModalClose'),
            overlay: document.getElementById('networkModalOverlay')
        },
        security: {
            modal: document.getElementById('securityModal'),
            close: document.getElementById('securityModalClose'),
            overlay: document.getElementById('securityModalOverlay')
        },
        maintenance: {
            modal: document.getElementById('maintenanceModal'),
            close: document.getElementById('maintenanceModalClose'),
            overlay: document.getElementById('maintenanceModalOverlay')
        }
    };

    function openServiceModal(modalId) {
        const modal = serviceModals[modalId].modal;
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Anima os elementos do modal
            setTimeout(() => {
                const modalElements = modal.querySelectorAll('.modal-element');
                modalElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('animate-in');
                    }, index * 150);
                });
            }, 100);
        }
    }

    function closeServiceModal(modalId) {
        const modal = serviceModals[modalId].modal;
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Remove animações
            const modalElements = modal.querySelectorAll('.modal-element');
            modalElements.forEach(element => {
                element.classList.remove('animate-in');
            });
        }
    }

    // Event listeners para os cards de serviços
    serviceCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const modalIds = ['webDev', 'mobileDev', 'cloud', 'network', 'security', 'maintenance'];
            if (modalIds[index]) {
                openServiceModal(modalIds[index]);
            }
        });
    });

    // Event listeners específicos para os links "Saiba mais"
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Previne o comportamento padrão do link
            e.stopPropagation(); // Previne a propagação do evento para o card pai
            
            const modalIds = ['webDev', 'mobileDev', 'cloud', 'network', 'security', 'maintenance'];
            if (modalIds[index]) {
                openServiceModal(modalIds[index]);
            }
        });
    });

    // Event listeners para fechar modais
    Object.keys(serviceModals).forEach(modalId => {
        const modalData = serviceModals[modalId];
        
        if (modalData.close) {
            modalData.close.addEventListener('click', () => closeServiceModal(modalId));
        }
        
        if (modalData.overlay) {
            modalData.overlay.addEventListener('click', () => closeServiceModal(modalId));
        }
    });

    // Fechar modais com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            Object.keys(serviceModals).forEach(modalId => {
                const modal = serviceModals[modalId].modal;
                if (modal && modal.classList.contains('active')) {
                    closeServiceModal(modalId);
                }
            });
        }
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce para eventos de scroll
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

    // Aplica debounce ao scroll
    const debouncedScrollHandler = debounce(function() {
        // Código de scroll aqui
    }, 16);

    window.addEventListener('scroll', debouncedScrollHandler);

    // ===== FUNÇÃO PARA ABRIR WHATSAPP COM MENSAGEM PERSONALIZADA =====
    function openWhatsAppWithMessage() {
        const now = new Date();
        const hour = now.getHours();
        
        let greeting = '';
        if (hour >= 5 && hour < 12) {
            greeting = 'Bom dia, gostaria de solicitar um orcamento!';
        } else if (hour >= 12 && hour < 18) {
            greeting = 'Boa tarde, gostaria de solicitar um orcamento!';
        } else {
            greeting = 'Boa noite, gostaria de solicitar um orcamento!';
        }
        
        // Usa configuração do WhatsApp
        const phoneNumber = KeyTechConfig.whatsapp.phone;
        
        // Alternativa: formato sem o código do país (pode funcionar em alguns casos)
        // const phoneNumber = '54991407787';
        
        // Codifica a mensagem corretamente para URL
        const message = encodeURIComponent(greeting);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // URL alternativa para teste (sem codificação)
        const whatsappUrlSimple = `https://wa.me/${phoneNumber}?text=${greeting}`;
        
        console.log('Mensagem:', greeting);
        console.log('WhatsApp URL (codificada):', whatsappUrl);
        console.log('WhatsApp URL (simples):', whatsappUrlSimple);
        
        // Tenta abrir o WhatsApp com a versão simples primeiro
        try {
            window.open(whatsappUrlSimple, '_blank');
        } catch (error) {
            console.error('Erro com URL simples:', error);
            try {
                window.open(whatsappUrl, '_blank');
            } catch (error2) {
                console.error('Erro com URL codificada:', error2);
                // Fallback: abre WhatsApp sem mensagem
                window.open(`https://wa.me/${phoneNumber}`, '_blank');
            }
        }
    }

    // ===== FUNÇÃO ESPECÍFICA PARA "FALAR COM ESPECIALISTA" =====
    function openWhatsAppWithSpecialistMessage() {
        // Usa configuração do WhatsApp
        const phoneNumber = KeyTechConfig.whatsapp.phone;
        
        // Mensagem específica para "Falar com especialista"
        const specialistMessage = KeyTechConfig.whatsapp.messages.specialist;
        
        // Codifica a mensagem corretamente para URL
        const message = encodeURIComponent(specialistMessage);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // URL alternativa para teste (sem codificação)
        const whatsappUrlSimple = `https://wa.me/${phoneNumber}?text=${specialistMessage}`;
        
        console.log('Mensagem do Especialista:', specialistMessage);
        console.log('WhatsApp URL (codificada):', whatsappUrl);
        console.log('WhatsApp URL (simples):', whatsappUrlSimple);
        
        // Tenta abrir o WhatsApp com a versão simples primeiro
        try {
            window.open(whatsappUrlSimple, '_blank');
        } catch (error) {
            console.error('Erro com URL simples:', error);
            try {
                window.open(whatsappUrl, '_blank');
            } catch (error2) {
                console.error('Erro com URL codificada:', error2);
                // Fallback: abre WhatsApp sem mensagem
                window.open(`https://wa.me/${phoneNumber}`, '_blank');
            }
        }
    }

    // ===== FUNÇÃO DE TESTE PARA WHATSAPP =====
    function testWhatsApp() {
        const phoneNumber = KeyTechConfig.whatsapp.phone;
        const message = 'Teste de mensagem';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        console.log('Teste WhatsApp URL:', whatsappUrl);
        window.open(whatsappUrl, '_blank');
    }

    // ===== BOTÕES "SOLICITAR ORÇAMENTO" NOS CARDS PRINCIPAIS =====
    const serviceCtaButtons = document.querySelectorAll('.service-card .service-cta .btn-primary');
    
    serviceCtaButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Previne que o card pai seja clicado
            openWhatsAppWithMessage();
        });
    });

    // ===== BOTÕES "SOLICITAR ORÇAMENTO" NOS MODAIS =====
    const modalCtaButtons = document.querySelectorAll('.service-modal .cta-buttons .btn-primary');
    
    modalCtaButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Fecha o modal atual
            const currentModal = button.closest('.service-modal');
            if (currentModal) {
                currentModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            openWhatsAppWithMessage();
        });
    });

    // ===== BOTÃO "SOLICITAR ORÇAMENTO" NO HEADER =====
    const headerCtaButton = document.querySelector('.nav-actions .btn-primary');
    
    if (headerCtaButton) {
        headerCtaButton.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsAppWithMessage();
        });
    }

    // ===== BOTÕES "SOLICITAR ORÇAMENTO" NA SEÇÃO CTA =====
    const ctaSectionButtons = document.querySelectorAll('.cta .cta-buttons .btn-primary');
    
    ctaSectionButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsAppWithMessage();
        });
    });

    // ===== BOTÃO "FALAR COM ESPECIALISTA" NA SEÇÃO CTA =====
    const ctaSecondaryButtons = document.querySelectorAll('.cta .cta-buttons .btn-secondary');
    
    ctaSecondaryButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openWhatsAppWithSpecialistMessage();
        });
    });

    // ===== BOTÕES DO HERO =====
    const heroButtons = document.querySelectorAll('.hero-buttons .btn-primary');
    
    heroButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // "Começar Agora" - Abre WhatsApp com mensagem específica
            openWhatsAppWithMessage();
        });
    });

    // ===== BOTÃO "SAIBA MAIS" NO HERO =====
    const heroSecondaryButtons = document.querySelectorAll('.hero-buttons .btn-secondary');
    
    heroSecondaryButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // "Saiba Mais" - Scroll suave para a seção de serviços
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = servicesSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('KeyTech Website - JavaScript carregado com sucesso! 🚀');
}); 