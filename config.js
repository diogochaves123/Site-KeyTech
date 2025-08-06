// Configuração do ambiente
const config = {
    // URL da API - altere para sua URL de produção
    apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : window.location.origin,
    
    // Configurações do WhatsApp
    whatsapp: {
        phone: '5554991407787', // Formato: código do país + DDD + número
        messages: {
            greeting: 'Olá! Gostaria de solicitar um orçamento!',
            specialist: 'Olá, queria falar com um especialista!'
        }
    },
    
    // Configurações de contato
    contact: {
        email: 'keytech.suporte@gmail.com',
        phone: '(54) 991407787',
        location: 'Soledade, RS'
    }
};

// Função para obter URL da API
function getApiUrl(endpoint) {
    return `${config.apiUrl}${endpoint}`;
}

// Exporta para uso global
window.KeyTechConfig = config;
window.getApiUrl = getApiUrl; 