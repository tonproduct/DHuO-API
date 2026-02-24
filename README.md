# Projeto Template

Template Next.js com design system, tokens, bridge Figma ↔ Claude Code e deploy no Vercel.

---

## O que está incluso

- **Next.js 15** + React 19 + TypeScript
- **Tailwind CSS v4** configurado
- **shadcn/ui** com componentes prontos
- **Design system** completo com tokens de cor, tipografia, raio, motion e componentes
- **Bridge Figma ↔ Claude Code** via WebSocket (relay local)
- **Figma Plugin** pronto para usar localmente
- **Scripts** de geração de tokens e variáveis Figma
- **vercel.json** com fix de roteamento para SPA
- **MCP** do shadcn configurado para o Claude Code

---

## Pré-requisitos

Antes de começar, instale tudo abaixo. Faça na ordem.

### 1. Node.js

Acesse [nodejs.org](https://nodejs.org) e baixe a versão **LTS** (a recomendada).
Após instalar, abra o terminal e confirme:

```bash
node -v
npm -v
```

Ambos devem mostrar um número de versão.

---

### 2. Git

Acesse [git-scm.com](https://git-scm.com) e baixe o instalador para o seu sistema.
Após instalar:

```bash
git --version
```

---

### 3. VS Code

Acesse [code.visualstudio.com](https://code.visualstudio.com) e instale.

---

### 4. Claude Code

Com o Node.js instalado, abra o terminal e rode:

```bash
npm install -g @anthropic/claude-code
```

Após instalar, autentique:

```bash
claude
```

Vai abrir o navegador para você fazer login com sua conta Anthropic.

---

### 5. Figma Desktop

Baixe o app **Figma Desktop** em [figma.com/downloads](https://www.figma.com/downloads).
O plugin local só funciona no app desktop, não no navegador.

---

## Configurando o projeto

### Passo 1 — Copie o template

Copie a pasta `projetotemplate` para onde você quiser trabalhar. Exemplo:

```
C:\Users\seunome\projetos\meu-novo-projeto
```

> Ou renomeie a pasta para o nome do seu projeto.

---

### Passo 2 — Abra no VS Code

Abra o VS Code, vá em **File > Open Folder** e selecione a pasta do projeto.

---

### Passo 3 — Instale as dependências

No terminal integrado do VS Code (**Ctrl + `**):

```bash
npm install
```

Aguarde terminar.

---

### Passo 4 — Rode o projeto

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.
Você verá a página inicial. O design system está em [http://localhost:3000/design-system](http://localhost:3000/design-system).

---

## Usando o Claude Code

### Passo 1 — Abra o Claude Code no terminal

Dentro da pasta do projeto:

```bash
claude
```

O Claude Code vai abrir no terminal, já lendo os arquivos do projeto.

### Passo 2 — Use normalmente

Exemplos do que você pode pedir:

```
Crie uma landing page para uma clínica odontológica
```

```
Adicione um componente de navbar com logo e menu mobile
```

```
Aplique o tema vermelho no projeto usando o theme.config.ts
```

O Claude Code tem permissões pré-configuradas no `.claude/settings.json` e o MCP do shadcn já está ativo via `.mcp.json`.

---

## Bridge Figma ↔ Claude Code

Esta é a parte mais poderosa do template: você aponta um componente no Figma e o Claude Code gera o código para você.

### Como funciona

```
Figma Desktop (plugin) ──WebSocket──> relay.js (porta 3055) ──> Claude Code
```

### Passo 1 — Instale o plugin localmente no Figma

1. Abra o **Figma Desktop**
2. Vá em um arquivo qualquer
3. Clique em **Menu** (ícone Figma no canto superior esquerdo) > **Plugins** > **Development** > **Import plugin from manifest...**
4. Navegue até a pasta do seu projeto e selecione o arquivo `manifest.json`
5. O plugin aparecerá como **"Modern Button Components"** na lista de plugins de desenvolvimento

---

### Passo 2 — Suba o relay WebSocket

Em um terminal separado (deixe rodando):

```bash
npm run relay
```

Você verá:
```
[relay] WebSocket relay running on ws://localhost:3055
[relay] Waiting for Figma plugin and Claude to connect…
```

> Mantenha esse terminal aberto enquanto trabalha.

---

### Passo 3 — Ative o plugin no Figma

1. No Figma Desktop, abra o arquivo do seu projeto
2. Clique em **Menu > Plugins > Development > Modern Button Components**
3. O painel do plugin abrirá — ele se conecta automaticamente ao relay na porta 3055

---

### Passo 4 — Envie dados do Figma para o projeto

Com o plugin aberto no Figma:

1. Selecione um componente ou frame no Figma
2. No painel do plugin, clique em **Send to Claude** (ou o botão de envio disponível)
3. Em outro terminal, dentro da pasta do projeto, rode:

```bash
npm run figma:send
```

Os dados do componente selecionado chegam ao projeto para o Claude Code usar como referência.

---

### Passo 5 — Peça ao Claude Code para implementar

No terminal do Claude Code:

```
Implemente o componente que acabou de chegar do Figma
```

---

## Trabalhando com tokens e tema

### Aplicar um tema diferente

Edite o arquivo `theme.config.ts` na raiz com as cores do projeto e rode:

```bash
npm run theme
```

Isso propaga as cores para os tokens CSS em `src/tokens/`.

### Gerar variáveis para o Figma

```bash
node scripts/generate-figma-variables.js
```

Isso gera o arquivo `tokens.figma.json` que pode ser importado no Figma como variáveis.

### Gerar tokens.json

```bash
node scripts/generate-tokens-json.js
```

---

## Subindo no GitHub

### Passo 1 — Crie uma conta no GitHub

Acesse [github.com](https://github.com) e crie uma conta gratuita se ainda não tiver.

---

### Passo 2 — Crie um novo repositório

1. No GitHub, clique no **+** no canto superior direito > **New repository**
2. Dê um nome ao repositório (ex: `meu-projeto`)
3. Deixe como **Private** ou **Public** (sua escolha)
4. **Não** marque nenhuma opção de inicialização (README, .gitignore, etc.)
5. Clique em **Create repository**

---

### Passo 3 — Configure seu Git (primeira vez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"
```

---

### Passo 4 — Conecte e envie

No terminal, dentro da pasta do projeto:

```bash
git remote add origin https://github.com/seu-usuario/meu-projeto.git
git branch -M main
git push -u origin main
```

> Substitua `seu-usuario` e `meu-projeto` pelos valores reais.

O GitHub vai pedir seu usuário e senha. Para a senha, use um **Personal Access Token**:
- GitHub > Settings > Developer Settings > Personal access tokens > Tokens (classic) > Generate new token
- Marque a permissão `repo` e gere o token
- Use o token no lugar da senha

---

### Enviando atualizações no dia a dia

```bash
git add .
git commit -m "descrição do que você fez"
git push
```

---

## Deploy no Vercel

### Passo 1 — Crie uma conta no Vercel

Acesse [vercel.com](https://vercel.com) e faça login **com sua conta GitHub** (mais fácil assim).

---

### Passo 2 — Importe o projeto

1. No dashboard do Vercel, clique em **Add New > Project**
2. Clique em **Import** ao lado do repositório `meu-projeto`
3. Na tela de configuração:
   - **Framework Preset**: Next.js (detectado automaticamente)
   - **Root Directory**: deixe em branco (raiz)
   - **Build Command**: `npm run build` (padrão)
   - **Output Directory**: deixe em branco (padrão do Next.js)
4. Clique em **Deploy**

---

### Passo 3 — Aguarde o deploy

O Vercel vai buildar e publicar. Em 1-2 minutos você terá uma URL pública do tipo:

```
https://meu-projeto.vercel.app
```

---

### Deploy automático

A partir de agora, **todo `git push` na branch `main` faz deploy automático** no Vercel.

---

### Por que o vercel.json está aqui

O arquivo `vercel.json` contém:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

Isso corrige um bug onde rotas como `/design-system/colors` retornavam 404 no Vercel. Com esse arquivo, todas as rotas são redirecionadas corretamente para o Next.js.

---

## Estrutura do projeto

```
projetotemplate/
├── .claude/
│   └── settings.json          # Permissões pré-configuradas do Claude Code
├── .mcp.json                  # MCP do shadcn para o Claude Code
├── figma-scripts/             # Scripts para gerar assets no Figma
├── scripts/                   # Scripts de tokens e tema
├── src/
│   ├── app/
│   │   ├── design-system/     # Visualizador do design system
│   │   ├── globals.css        # CSS global com tokens importados
│   │   ├── layout.tsx         # Layout raiz
│   │   └── page.tsx           # Página inicial
│   ├── components/ui/         # Componentes shadcn/ui
│   ├── lib/utils.ts           # Utilitário cn()
│   └── tokens/                # Tokens CSS (primitives, semantic, theme)
├── code.js                    # Código do plugin Figma
├── ui.html                    # UI do plugin Figma
├── manifest.json              # Manifesto do plugin Figma
├── relay.js                   # Servidor WebSocket bridge
├── figma-send.js              # Script de envio Figma → projeto
├── theme.config.ts            # Configuração de tema/cores
├── tokens.json                # Tokens exportados
├── tokens.figma.json          # Tokens para importar no Figma
├── components.json            # Config do shadcn/ui
└── vercel.json                # Fix de roteamento para Vercel
```

---

## Dúvidas frequentes

**O relay não conecta com o Figma**
Verifique se o `npm run relay` está rodando no terminal antes de abrir o plugin no Figma. O Figma Desktop precisa estar aberto (não o Figma no navegador).

**O plugin não aparece no Figma**
O plugin só fica disponível no arquivo onde foi importado. Repita o processo de importar o `manifest.json` em cada arquivo novo.

**Erro 404 no Vercel em rotas específicas**
Confirme que o `vercel.json` foi enviado junto com o código. Ele precisa estar na raiz do repositório.

**Claude Code não está rodando os comandos automaticamente**
O `.claude/settings.json` já tem as permissões necessárias. Se algum comando novo precisar de aprovação, o Claude Code vai perguntar — basta aprovar.

**Como adicionar um novo componente shadcn/ui**
```bash
npx shadcn@latest add nome-do-componente
```
Exemplo: `npx shadcn@latest add sheet`
