const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Resend } = require('resend');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('.')); // Serve static files from current directory

// Debug: Check if API key is loaded
console.log('Resend API Key loaded:', process.env.RESEND_API_KEY ? 'Yes' : 'No');
if (process.env.RESEND_API_KEY) {
    console.log('API Key starts with:', process.env.RESEND_API_KEY.substring(0, 10) + '...');
} else {
    console.error('ERROR: RESEND_API_KEY not found in environment variables');
}

// Initialize Resend with the new API key
const resend = new Resend('re_NEwXdFhk_5LVKXePhzD1oH2pYbwpQPe3A');

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, company, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Nome, email e mensagem são obrigatórios'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Formato de email inválido'
            });
        }

        // Send email using Resend with the new API key
        console.log('Dados do formulário recebidos:', { name, email, company, message });
        
        try {
            const { data, error } = await resend.emails.send({
                from: 'onboarding@resend.dev',
                to: ['keytech.suporte@gmail.com'],
                subject: `Nova mensagem de contato - ${name}`,
                html: `
                    <h2>Nova Mensagem de Contato - KeyTech</h2>
                    <p><strong>Nome:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    ${company ? `<p><strong>Empresa:</strong> ${company}</p>` : ''}
                    <p><strong>Mensagem:</strong></p>
                    <p>${message}</p>
                `
            });

            if (error) {
                console.error('Erro ao enviar email:', error);
                return res.status(500).json({
                    success: false,
                    message: 'Erro interno do servidor ao enviar email'
                });
            }

            console.log('Email enviado com sucesso:', data);
        } catch (emailError) {
            console.error('Erro ao enviar email:', emailError);
            return res.status(500).json({
                success: false,
                message: 'Erro interno do servidor ao enviar email'
            });
        }
        
        res.json({
            success: true,
            message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
        });

    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno do servidor'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Servidor funcionando corretamente' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
}); 