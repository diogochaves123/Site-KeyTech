# 🚀 Configuração Rápida - Sistema de Email KeyTech

## 📋 Passos para Configurar o Sistema de Email

### 1. Criar Conta no Resend
1. Acesse [resend.com](https://resend.com)
2. Crie uma conta gratuita
3. Vá para "API Keys" no painel
4. Crie uma nova chave API
5. Copie a chave (começa com `re_`)

### 2. Configurar Variáveis de Ambiente
```bash
# Copie o arquivo de exemplo
cp env.example .env

# Edite o arquivo .env e adicione sua chave API
RESEND_API_KEY=re_sua_chave_api_aqui
```

### 3. Instalar Dependências
```bash
npm install
```

### 4. Executar o Servidor
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# OU Produção
npm start
```

### 5. Testar o Sistema
1. Abra [http://localhost:3000](http://localhost:3000)
2. Vá para a seção "Contato"
3. Preencha o formulário
4. Clique em "Enviar Mensagem"
5. Verifique se o email foi enviado para `keytech.suporte@gmail.com`

## 🔧 Configurações Adicionais

### Alterar Email de Destino
No arquivo `server.js`, linha 45, altere:
```javascript
to: ['keytech.suporte@gmail.com'],
```

### Personalizar Template do Email
Edite o HTML do email no arquivo `server.js`, linhas 47-85.

### Alterar Porta do Servidor
No arquivo `.env`:
```bash
PORT=3000
```

## 🚨 Solução de Problemas

### Erro: "RESEND_API_KEY is not defined"
- Verifique se o arquivo `.env` existe
- Confirme se a chave API está correta
- Reinicie o servidor

### Erro: "Email not sent"
- Verifique se a chave API do Resend é válida
- Confirme se o email de destino está correto
- Verifique os logs do servidor

### Erro: "Cannot find module"
- Execute `npm install` novamente
- Verifique se o Node.js está atualizado

## 📞 Suporte
- Email: keytech.suporte@gmail.com
- LinkedIn: [Diogo Chaves](https://www.linkedin.com/in/diogo-chaves2003/)

---

**✅ Sistema configurado com sucesso!** 