# 🚀 Configurando o LeadFlow do Zero

Se as coisas estão uma bagunça, siga estes **3 passos rápidos** e nada mais.

---

### Passo 1: O Script Mágico
Clique duas vezes no arquivo **`REPARAR_PROJETO.bat`** na raiz da pasta.
- Ele vai instalar o que falta.
- Ele vai criar os arquivos `.env` automáticos para você.
- Se ele der erro no final, não se preocupe, é porque falta a sua URL do Banco.

### Passo 2: A URL do Banco (Onde as coisas salvam)
1. Vá no site [Neon.tech](https://neon.tech/).
2. Copie a URL que começa com `postgresql://`.
3. Abra o arquivo `apps/backend/.env`.
4. Apague a frase `COLE_SUA_URL_DO_NEON_AQUI` e **cole** a sua URL.
5. Salve o arquivo (`Ctrl + S`).

### Passo 3: Rodar o Site
No terminal (PowerShell ou Prompt), digite:
```powershell
npm run dev
```

Agora abra no navegador:
- **Site:** `http://localhost:3002`
- **Backend:** `http://localhost:3000`

---

## ❌ "Por que meu GitHub está feio e só tem o README?"
O GitHub é apenas uma **PASTA DE ARQUIVOS**. Ele não é o seu site rodando.
- Para o site aparecer "bonito", você precisa conectar o GitHub na **Vercel** (Frontend) e no **Render** (Backend).

**Dica:** Foque em fazer o site funcionar no seu computador primeiro (Passos 1, 2 e 3 acima). Depois que funcionar, a gente sobe ele pro GitHub do jeito certo.
