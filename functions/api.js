const { Resend } = require('resend');

exports.handler = async (event, context) => {
  // Configurar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Responder a requisições OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Verificar se é uma requisição POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Método não permitido' })
    };
  }

  try {
    // Obter dados do corpo da requisição
    const data = JSON.parse(event.body);
    const { name, email, message } = data;

    // Validar dados obrigatórios
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          success: false, 
          message: 'Nome, email e mensagem são obrigatórios' 
        })
      };
    }

    // Inicializar Resend
    const resend = new Resend(process.env.RESEND_API_KEY || 're_NEwXdFhk_5LVKXePhzD1oH2pYbwpQPe3A');

    // Enviar email
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['diogo.24chaves@gmail.com'],
      subject: `Nova mensagem de contato - ${name}`,
      html: `
        <h2>Nova mensagem de contato do site KeyTech</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Enviado em: ${new Date().toLocaleString('pt-BR')}</em></p>
      `
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
      })
    };

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        message: 'Erro interno do servidor ao enviar email' 
      })
    };
  }
}; 