# 🚀 Guia Simples - Deploy no keytechsolutions.com.br

## 📋 O que você precisa fazer

Para que o formulário funcione em `keytechsolutions.com.br`, você precisa hospedar o servidor Node.js no mesmo domínio.

## 🔧 Opções de Deploy

### Opção 1: VPS (Servidor Virtual) - Mais Controle

#### 1. Contratar um VPS
- **DigitalOcean**: $5/mês
- **Vultr**: $3.50/mês  
- **Linode**: $5/mês
- **AWS EC2**: $3-5/mês

#### 2. Configurar o servidor
```bash
# Conectar via SSH
ssh root@seu-servidor.com

# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 (gerenciador de processos)
sudo npm install -g pm2

# Instalar Nginx
sudo apt update
sudo apt install nginx
```

#### 3. Fazer upload dos arquivos
```bash
# Criar pasta
mkdir -p /var/www/keytech
cd /var/www/keytech

# Upload dos arquivos (via FTP ou Git)
# - server.js
# - package.json
# - config.js
# - index.html
# - script.js
# - styles.css
# - pasta img/

# Instalar dependências
npm install

# Criar arquivo .env
echo "RESEND_API_KEY=re_NEwXdFhk_5LVKXePhzD1oH2pYbwpQPe3A" > .env
echo "PORT=3000" >> .env
```

#### 4. Configurar Nginx
```bash
sudo nano /etc/nginx/sites-available/keytechsolutions.com.br
```

**Conteúdo:**
```nginx
server {
    listen 80;
    server_name keytechsolutions.com.br www.keytechsolutions.com.br;
    
    root /var/www/keytech;
    index index.html;
    
    # Servir arquivos estáticos
    location / {
        try_files $uri $uri/ =404;
    }
    
    # API - redirecionar para Node.js
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 5. Ativar configuração
```bash
sudo ln -s /etc/nginx/sites-available/keytechsolutions.com.br /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 6. Iniciar o servidor Node.js
```bash
cd /var/www/keytech
pm2 start server.js --name "keytech-api"
pm2 save
pm2 startup
```

#### 7. Configurar SSL (HTTPS)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d keytechsolutions.com.br -d www.keytechsolutions.com.br
```

### Opção 2: Serviços de Hospedagem - Mais Fácil

#### Vercel (Recomendado - Gratuito)
1. Acesse [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente:
   - `RESEND_API_KEY`: `re_NEwXdFhk_5LVKXePhzD1oH2pYbwpQPe3A`
4. Deploy automático

#### Railway
1. Acesse [railway.app](https://railway.app)
2. Conecte seu repositório
3. Configure variáveis de ambiente
4. Deploy automático

#### Heroku
1. Acesse [heroku.com](https://heroku.com)
2. Crie um novo app
3. Conecte o repositório
4. Configure variáveis de ambiente
5. Deploy

## 🔄 Após o Deploy

### 1. Testar o site
Acesse: `https://keytechsolutions.com.br`

### 2. Testar o formulário
- Preencha o formulário de contato
- Verifique se o email é enviado

### 3. Testar WhatsApp
- Clique nos botões do WhatsApp
- Verifique se abrem corretamente

## 🆘 Se algo não funcionar

### Erro 404 na API
- Verifique se o servidor Node.js está rodando
- Verifique se o Nginx está configurado corretamente
- Verifique os logs: `pm2 logs keytech-api`

### Email não enviando
- Verifique se a RESEND_API_KEY está correta
- Verifique se o domínio está verificado no Resend

### Site não carrega
- Verifique se o domínio está apontando para o servidor correto
- Verifique se o Nginx está rodando: `sudo systemctl status nginx`

## 💰 Custos Estimados

- **VPS**: $3-5/mês
- **Domínio**: $10-15/ano
- **SSL**: Gratuito (Let's Encrypt)
- **Resend**: 100 emails/mês gratuitos

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs do servidor
2. Teste a API diretamente
3. Verifique a configuração do domínio

---

**Dica**: Se você não tem experiência com servidores, recomendo começar com **Vercel** ou **Railway** - são mais fáceis de configurar! 