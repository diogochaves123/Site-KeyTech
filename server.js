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

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

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

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'KeyTech Website <noreply@keytech.com>',
            to: ['keytech.suporte@gmail.com'],
            subject: `Nova mensagem de contato - ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
                    <div style="background-color: #007bff; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                        <h2 style="margin: 0;">Nova Mensagem de Contato</h2>
                        <p style="margin: 10px 0 0 0;">KeyTech Website</p>
                    </div>
                    
                    <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h3 style="color: #333; margin-top: 0;">Detalhes do Contato:</h3>
                        
                        <div style="margin-bottom: 20px;">
                            <strong style="color: #007bff;">Nome:</strong>
                            <p style="margin: 5px 0; color: #555;">${name}</p>
                        </div>
                        
                        <div style="margin-bottom: 20px;">
                            <strong style="color: #007bff;">Email:</strong>
                            <p style="margin: 5px 0; color: #555;">${email}</p>
                        </div>
                        
                        ${company ? `
                        <div style="margin-bottom: 20px;">
                            <strong style="color: #007bff;">Empresa:</strong>
                            <p style="margin: 5px 0; color: #555;">${company}</p>
                        </div>
                        ` : ''}
                        
                        <div style="margin-bottom: 20px;">
                            <strong style="color: #007bff;">Mensagem:</strong>
                            <div style="margin: 5px 0; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #007bff; border-radius: 4px;">
                                <p style="margin: 0; color: #555; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                            <p style="color: #666; font-size: 14px; margin: 0;">
                                Esta mensagem foi enviada através do formulário de contato do website KeyTech.
                            </p>
                        </div>
                    </div>
                </div>
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