# 🚀 Guia de Deploy - KeyTech Website

## Configuração para Produção

### 1. Configurar o Servidor

Para que o formulário funcione para qualquer pessoa, você precisa:

1. **Hospedar o servidor Node.js** em um serviço como:
   - Heroku
   - Vercel
   - Railway
   - DigitalOcean
   - AWS
   - Google Cloud

2. **Configurar as variáveis de ambiente** no seu servidor de produção:
   ```env
   RESEND_API_KEY=sua_chave_api_aqui
   PORT=3000
   ```

### 2. Atualizar Configurações

#### Para Deploy Local (Desenvolvimento):
- O arquivo `config.js` já está configurado para detectar automaticamente se está rodando em localhost
- Funciona automaticamente com `http://localhost:3000`

#### Para Deploy em Produção:
1. **Subir o servidor** para um serviço de hospedagem
2. **Atualizar o arquivo `config.js`** com a URL do seu servidor:

```javascript
// Exemplo para produção
const config = {
    // Substitua pela URL do seu servidor
    apiUrl: 'https://seu-servidor.herokuapp.com', // ou sua URL
    
    // Resto das configurações permanece igual
    whatsapp: {
        phone: '5554991407787',
        messages: {
            greeting: 'Olá! Gostaria de solicitar um orçamento!',
            specialist: 'Olá, queria falar com um especialista!'
        }
    },
    contact: {
        email: 'keytech.suporte@gmail.com',
        phone: '(54) 991407787',
        location: 'Soledade, RS'
    }
};
```

### 3. Opções de Deploy

#### Opção 1: Heroku (Recomendado para iniciantes)
```bash
# Instalar Heroku CLI
# Criar app no Heroku
heroku create keytech-website

# Configurar variáveis de ambiente
heroku config:set RESEND_API_KEY=sua_chave_api_aqui

# Deploy
git add .
git commit -m "Deploy para produção"
git push heroku main
```

#### Opção 2: Vercel
1. Conectar repositório no Vercel
2. Configurar variáveis de ambiente no dashboard
3. Deploy automático

#### Opção 3: Railway
1. Conectar repositório no Railway
2. Configurar variáveis de ambiente
3. Deploy automático

### 4. Configuração do Domínio

Após o deploy, você pode:
1. **Usar a URL fornecida pelo serviço** (ex: `https://keytech-website.herokuapp.com`)
2. **Configurar um domínio personalizado** (ex: `https://keytechsolutions.com.br`)

### 5. Teste Final

Após o deploy:
1. Acesse seu site
2. Teste o formulário de contato
3. Verifique se os emails estão sendo enviados
4. Teste os botões do WhatsApp

### 6. Estrutura de Arquivos para Deploy

```
Site KeyTech/
├── server.js          # Servidor Node.js
├── package.json       # Dependências
├── config.js          # Configurações
├── script.js          # JavaScript do frontend
├── index.html         # Página principal
├── styles.css         # Estilos
├── img/               # Imagens
└── .env               # Variáveis de ambiente (não commitado)
```

### 7. Troubleshooting

#### Problema: Formulário não funciona
- Verifique se o servidor está rodando
- Confirme se a URL da API está correta no `config.js`
- Verifique os logs do servidor

#### Problema: Emails não são enviados
- Confirme se a chave API do Resend está configurada
- Verifique se o domínio está verificado no Resend
- Teste a chave API no painel do Resend

#### Problema: WhatsApp não abre
- Verifique se o número está no formato correto (código do país + DDD + número)
- Teste o link manualmente

### 8. Manutenção

- **Monitoramento**: Configure alertas para downtime
- **Backup**: Mantenha backup do código e banco de dados
- **Atualizações**: Mantenha as dependências atualizadas
- **Logs**: Monitore os logs do servidor regularmente

---

**Nota**: Este guia assume que você tem conhecimento básico de deploy. Se precisar de ajuda específica com algum serviço, consulte a documentação oficial. 