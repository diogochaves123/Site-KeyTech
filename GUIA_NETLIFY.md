# 🚀 Guia Completo - Deploy no Netlify

## 📋 Pré-requisitos

1. **Conta no Netlify** (gratuita)
2. **Repositório no GitHub** com seu código
3. **Chave API do Resend** configurada

## 🔧 Passo a Passo

### 1. Preparar o Repositório

Certifique-se de que seu repositório GitHub contém:
- ✅ `index.html`
- ✅ `script.js`
- ✅ `styles.css`
- ✅ `config.js`
- ✅ `netlify.toml`
- ✅ `functions/api.js`
- ✅ `functions/package.json`
- ✅ Pasta `img/` com todas as imagens

### 2. Fazer Login no Netlify

1. Acesse [netlify.com](https://netlify.com)
2. Clique em **"Sign up"** ou **"Log in"**
3. Faça login com sua conta GitHub

### 3. Conectar o Repositório

1. No dashboard do Netlify, clique em **"New site from Git"**
2. Escolha **"GitHub"**
3. Autorize o Netlify a acessar seus repositórios
4. Selecione seu repositório do site KeyTech

### 4. Configurar o Deploy

Na tela de configuração:

**Build settings:**
- **Build command**: Deixe em branco (não é necessário)
- **Publish directory**: Deixe como `.` (ponto)

**Deploy settings:**
- Clique em **"Show advanced"**
- Em **"Environment variables"**, adicione:
  - **Key**: `RESEND_API_KEY`
  - **Value**: `re_NEwXdFhk_5LVKXePhzD1oH2pYbwpQPe3A`

### 5. Fazer o Deploy

1. Clique em **"Deploy site"**
2. Aguarde o deploy ser concluído (2-3 minutos)
3. Seu site estará disponível em uma URL como: `https://random-name.netlify.app`

### 6. Configurar Domínio Personalizado

1. No dashboard do seu site, vá em **"Domain settings"**
2. Clique em **"Add custom domain"**
3. Digite: `keytechsolutions.com.br`
4. Siga as instruções para configurar os DNS

**Configuração DNS:**
- **Tipo**: CNAME
- **Nome**: `keytechsolutions.com.br`
- **Valor**: `seu-site.netlify.app`

### 7. Configurar HTTPS

O Netlify configura HTTPS automaticamente após a configuração do domínio.

## 🧪 Testando

### 1. Testar o Site
Acesse seu domínio e verifique se:
- ✅ O site carrega corretamente
- ✅ Todas as imagens aparecem
- ✅ O design está responsivo

### 2. Testar o Formulário
1. Preencha o formulário de contato
2. Clique em "Enviar"
3. Verifique se aparece a mensagem de sucesso
4. Verifique se o email foi recebido

### 3. Testar WhatsApp
1. Clique nos botões do WhatsApp
2. Verifique se abrem corretamente
3. Teste as mensagens pré-definidas

## 🔧 Configurações Avançadas

### Redirecionamentos Personalizados

Se precisar de redirecionamentos específicos, adicione ao `netlify.toml`:

```toml
[[redirects]]
  from = "/antiga-pagina"
  to = "/nova-pagina"
  status = 301
```

### Headers Personalizados

Para melhorar a segurança:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

## 📊 Monitoramento

### Logs de Deploy
- Acesse **"Deploys"** no dashboard
- Clique em qualquer deploy para ver os logs

### Logs de Funções
- Vá em **"Functions"** no dashboard
- Clique na função `api` para ver os logs

### Analytics
- Ative o **"Analytics"** no dashboard
- Veja estatísticas de visitantes

## 🆘 Solução de Problemas

### Erro 404 na API
- Verifique se o arquivo `functions/api.js` existe
- Verifique se o `netlify.toml` está configurado corretamente
- Verifique os logs da função

### Email não enviando
- Verifique se a variável `RESEND_API_KEY` está configurada
- Verifique os logs da função para erros
- Teste a chave API no painel do Resend

### Site não carrega
- Verifique se todos os arquivos estão no repositório
- Verifique os logs de deploy
- Verifique se o domínio está configurado corretamente

### Erro de CORS
- A função já está configurada com CORS
- Se persistir, verifique se está acessando a URL correta

## 💰 Custos

- **Netlify**: Gratuito (até 100GB de banda/mês)
- **Funções**: Gratuito (até 125.000 invocações/mês)
- **Domínio**: $10-15/ano (se não tiver)
- **Resend**: 100 emails/mês gratuitos

## 🔄 Atualizações

Para atualizar o site:
1. Faça as alterações no código
2. Commit e push para o GitHub
3. O Netlify fará deploy automático

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs no dashboard do Netlify
2. Consulte a [documentação do Netlify](https://docs.netlify.com)
3. Entre em contato com o suporte do Netlify

---

**Vantagens do Netlify:**
- ✅ Deploy automático
- ✅ HTTPS gratuito
- ✅ CDN global
- ✅ Funções serverless
- ✅ Interface amigável
- ✅ Integração com GitHub 