// Configuração do ambiente
const config = {
    // URL da API - usa a mesma origem do site
    apiUrl: window.location.origin,
    
    // Configurações do WhatsApp
    whatsapp: {
        phone: '5554991407787', // Formato: código do país + DDD + número
        messages: {
            greeting: 'Olá! Gostaria de solicitar um orçamento!',
            specialist: 'Olá, queria falar com um especialista!',
            // Mensagens específicas para serviços
            services: {
                'desenvolvimento web': {
                    'site institucional': 'Olá, estou interessado em saber mais sobre um Site Institucional.',
                    'e-commerce': 'Olá, estou interessado em saber mais sobre um E-commerce.',
                    'landing page': 'Olá, estou interessado em saber mais sobre uma Landing Page.',
                    'sistema web': 'Olá, estou interessado em saber mais sobre um Sistema Web.',
                    'falar com especialista': 'Olá, gostaria de falar com um especialista em Desenvolvimento Web.'
                },
                'aplicativos mobile': {
                    'app de vendas': 'Olá, estou interessado em saber mais sobre um App de Vendas.',
                    'app empresarial': 'Olá, estou interessado em saber mais sobre um App Empresarial.',
                    'app de entrega': 'Olá, estou interessado em saber mais sobre um App de Entrega.',
                    'app personalizado': 'Olá, estou interessado em saber mais sobre um App Personalizado.',
                    'falar com especialista': 'Olá, gostaria de falar com um especialista em Aplicativos Mobile.'
                },
                'cloud computing': {
                    'migração para nuvem': 'Olá, estou interessado em saber mais sobre Migração para Nuvem.',
                    'backup na nuvem': 'Olá, estou interessado em saber mais sobre Backup na Nuvem.',
                    'servidores cloud': 'Olá, estou interessado em saber mais sobre Servidores Cloud.',
                    'otimização de custos': 'Olá, estou interessado em saber mais sobre Otimização de Custos em Cloud.',
                    'falar com especialista': 'Olá, gostaria de falar com um especialista em Cloud Computing.'
                },
                'infraestrutura de redes': {
                    'projeto de rede': 'Olá, estou interessado em saber mais sobre Projeto de Rede.',
                    'configuração de equipamentos': 'Olá, estou interessado em saber mais sobre Configuração de Equipamentos de Rede.',
                    'suporte técnico': 'Olá, estou interessado em saber mais sobre Suporte Técnico de Redes.',
                    'monitoramento': 'Olá, estou interessado em saber mais sobre Monitoramento de Rede.',
                    'falar com especialista': 'Olá, gostaria de falar com um especialista em Infraestrutura de Redes.'
                },
                'segurança de redes': {
                    'firewall': 'Olá, estou interessado em saber mais sobre soluções de Firewall.',
                    'vpn': 'Olá, estou interessado em saber mais sobre VPN.',
                    'backup de segurança': 'Olá, estou interessado em saber mais sobre Backup de Segurança.',
                    'auditoria': 'Olá, estou interessado em saber mais sobre Auditoria de Segurança.',
                    'falar com especialista': 'Olá, gostaria de falar com um especialista em Segurança de Redes.'
                },
                'manutenção técnica': {
                    'manutenção de pc': 'Olá, estou interessado em saber mais sobre Manutenção de PC.',
                    'reparo de notebook': 'Olá, estou interessado em saber mais sobre Reparo de Notebook.',
                    'limpeza': 'Olá, estou interessado em saber mais sobre Limpeza de Computadores.',
                    'recuperação de dados': 'Olá, estou interessado em saber mais sobre Recuperação de Dados.',
                    'falar com especialista': 'Olá, gostaria de falar com um especialista em Manutenção Técnica.'
                }
            }
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