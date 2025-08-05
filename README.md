# KeyTech - Soluções Tecnológicas Inovadoras

Website da KeyTech com funcionalidades completas incluindo formulário de contato integrado com Resend para envio de emails.

## 🚀 Funcionalidades

- **Design Responsivo**: Interface moderna e adaptável para todos os dispositivos
- **Seção de Serviços**: Apresentação detalhada dos serviços oferecidos
- **Chat Widget**: Sistema de chat interativo com opções de contato
- **Formulário de Contato**: Integração com Resend para envio de emails
- **Navegação Suave**: Scroll automático para seções específicas
- **Modais Interativos**: Apresentação detalhada de metodologia e serviços

## 📧 Funcionalidade de Email

O formulário de contato está integrado com a plataforma **Resend** para envio automático de emails para `keytech.suporte@gmail.com`.

### Configuração do Email

1. **Criar conta no Resend**:
   - Acesse [resend.com](https://resend.com)
   - Crie uma conta gratuita
   - Obtenha sua chave API

2. **Configurar variáveis de ambiente**:
   ```bash
   # Copie o arquivo de exemplo
   cp env.example .env
   
   # Edite o arquivo .env e adicione sua chave API
   RESEND_API_KEY=re_sua_chave_api_aqui
   ```

3. **Instalar dependências**:
   ```bash
   npm install
   ```

4. **Executar o servidor**:
   ```bash
   # Desenvolvimento (com auto-reload)
   npm run dev
   
   # Produção
   npm start
   ```

5. **Acessar o website**:
   - Abra [http://localhost:3000](http://localhost:3000)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com animações
- **JavaScript**: Interatividade e funcionalidades dinâmicas

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **Resend**: Plataforma de envio de emails
- **CORS**: Cross-origin resource sharing

## 📁 Estrutura do Projeto

```
Site KeyTech/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript frontend
├── server.js           # Servidor Node.js
├── package.json        # Dependências Node.js
├── env.example         # Exemplo de variáveis de ambiente
├── img/                # Imagens do projeto
└── README.md           # Documentação
```

## 🔧 Configuração de Desenvolvimento

### Pré-requisitos
- Node.js (versão 14 ou superior)
- NPM ou Yarn
- Conta no Resend

### Passos para Configuração

1. **Clone o repositório** (se aplicável)
2. **Instale as dependências**:
   ```bash
   npm install
   ```
3. **Configure as variáveis de ambiente**:
   ```bash
   cp env.example .env
   # Edite o arquivo .env com sua chave API do Resend
   ```
4. **Execute o servidor**:
   ```bash
   npm run dev
   ```

## 📧 Como Funciona o Sistema de Email

1. **Usuário preenche o formulário** na seção de contato
2. **Dados são enviados** para o endpoint `/api/contact`
3. **Servidor valida** os dados recebidos
4. **Email é enviado** via Resend para `keytech.suporte@gmail.com`
5. **Notificação** é exibida para o usuário

### Template do Email

O email enviado inclui:
- Nome do contato
- Email do contato
- Empresa (opcional)
- Mensagem
- Formatação HTML profissional

## 🎨 Personalização

### Cores e Estilos
As cores principais estão definidas como variáveis CSS no arquivo `styles.css`:
```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --accent-color: #28a745;
    --text-color: #333;
    --light-bg: #f8f9fa;
}
```

### Modificando o Template de Email
O template do email pode ser personalizado no arquivo `server.js`, na função que envia o email via Resend.

## 🚀 Deploy

### Opções de Deploy

1. **Vercel** (Recomendado):
   - Conecte seu repositório
   - Configure as variáveis de ambiente
   - Deploy automático

2. **Netlify**:
   - Upload dos arquivos
   - Configure as variáveis de ambiente
   - Deploy manual

3. **Heroku**:
   - Conecte o repositório
   - Configure as variáveis de ambiente
   - Deploy automático

### Variáveis de Ambiente para Produção
Certifique-se de configurar:
- `RESEND_API_KEY`: Sua chave API do Resend
- `PORT`: Porta do servidor (opcional)

## 📞 Suporte

Para dúvidas ou problemas:
- Email: keytech.suporte@gmail.com
- LinkedIn: [Diogo Chaves](https://www.linkedin.com/in/diogo-chaves2003/)
- Instagram: [@go.keytech](https://www.instagram.com/go.keytech/)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**KeyTech** - Transformando o futuro com tecnologia inovadora e soluções personalizadas. 
