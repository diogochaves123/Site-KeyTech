# 🚀 Guia de Deploy - KeyTech Website

## 📋 Pré-requisitos

1. **Servidor VPS** (DigitalOcean, AWS, Vultr, etc.)
2. **Domínio configurado** (`keytechsolutions.com.br`)
3. **Node.js** instalado no servidor
4. **PM2** para gerenciar o processo Node.js
5. **Nginx** como proxy reverso

## 🔧 Configuração do Servidor

### 1. Conectar ao servidor via SSH
```bash
ssh usuario@seu-servidor.com
```

### 2. Instalar Node.js (se não estiver instalado)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 3. Instalar PM2
```bash
sudo npm install -g pm2
```

### 4. Instalar Nginx
```bash
sudo apt update
sudo apt install nginx
```

## 📁 Deploy da Aplicação

### 1. Clonar o projeto
```bash
cd /var/www
sudo git clone https://github.com/seu-usuario/keytech-website.git
sudo chown -R $USER:$USER keytech-website
cd keytech-website
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
```bash
cp env.example .env
nano .env
```

Conteúdo do `.env`:
```env
RESEND_API_KEY=re_NEwXdFhk_5LVKXePhzD1oH2pYbwpQPe3A
PORT=3000
NODE_ENV=production
```

### 4. Configurar PM2
```bash
pm2 start server.js --name "keytech-api"
pm2 save
pm2 startup
```

## 🌐 Configuração do Nginx

### 1. Criar configuração do site
```bash
sudo nano /etc/nginx/sites-available/keytechsolutions.com.br
```

Conteúdo da configuração:
```nginx
# Configuração para o site principal
server {
    listen 80;
    server_name keytechsolutions.com.br www.keytechsolutions.com.br;
    
    root /var/www/keytech-website;
    index index.html;
    
    # Servir arquivos estáticos
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Configuração para API
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Configuração para subdomínio da API (opcional)
server {
    listen 80;
    server_name api.keytechsolutions.com.br;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 2. Ativar a configuração
```bash
sudo ln -s /etc/nginx/sites-available/keytechsolutions.com.br /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 🔒 Configuração SSL (HTTPS)

### 1. Instalar Certbot
```bash
sudo apt install certbot python3-certbot-nginx
```

### 2. Obter certificado SSL
```bash
sudo certbot --nginx -d keytechsolutions.com.br -d www.keytechsolutions.com.br -d api.keytechsolutions.com.br
```

## ⚙️ Configuração Final

### 1. Atualizar config.js para produção
Edite o arquivo `config.js` no servidor:

```javascript
// Configuração do ambiente
const config = {
    // URL da API - altere para sua URL de produção
    apiUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:3000' 
        : 'https://keytechsolutions.com.br', // URL da API em produção
    
    // ... resto da configuração
};
```

### 2. Reiniciar serviços
```bash
pm2 restart keytech-api
sudo systemctl restart nginx
```

## 🧪 Testando

### 1. Testar o site
Acesse: `https://keytechsolutions.com.br`

### 2. Testar a API
```bash
curl -X POST https://keytechsolutions.com.br/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@teste.com","message":"Teste"}'
```

## 📊 Monitoramento

### 1. Verificar status do PM2
```bash
pm2 status
pm2 logs keytech-api
```

### 2. Verificar logs do Nginx
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## 🔄 Atualizações

Para atualizar o site:
```bash
cd /var/www/keytech-website
git pull
npm install
pm2 restart keytech-api
```

## 🆘 Solução de Problemas

### Erro 404 na API
- Verificar se o PM2 está rodando: `pm2 status`
- Verificar logs: `pm2 logs keytech-api`
- Verificar se a porta 3000 está livre: `netstat -tlnp | grep :3000`

### Erro de CORS
- Verificar se o Nginx está configurado corretamente
- Verificar se o proxy_pass está apontando para a porta correta

### Email não enviando
- Verificar se a RESEND_API_KEY está correta
- Verificar logs do PM2 para erros de email

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs: `pm2 logs keytech-api`
2. Verifique o status: `pm2 status`
3. Reinicie os serviços se necessário 