// ============================================================================
// ENZO STUDIOS V1 - BACKEND MILITAR (SEGURO E PODEROSO)
// ============================================================================
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' })); // Aceita ordens de qualquer lugar (Netlify, Firebase, Local)
app.use(express.json({ limit: '15mb' }));

// ============================================================================
// 🔑 COFRE FORTE (As suas chaves agora estão seguras aqui no PC/Servidor)
// ============================================================================
const GROQ_API_KEY = "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";
const FAL_API_TOKEN = "f947e828-a1ab-4704-90b6-5c1a1842baf8:25b4a436c84fcb4766af1d6526438736"; 

const verificaLogin = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ erro: "Acesso Negado: Carga vazia." });
    }
    next(); 
};

const CONHECIMENTO_ENZO_IA = `Você é a 'Enzo IA', Assistente Técnico Sênior da Enzo Studios V1. Especialidade: Programação Roblox Luau.`;

// 💬 1. ROTA DO CHAT
app.post('/api/chat', verificaLogin, async (req, res) => {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "system", content: CONHECIMENTO_ENZO_IA }, { role: "user", content: req.body.prompt }],
                temperature: 0.3 
            })
        });
        const data = await response.json();
        res.json({ resposta: data.choices[0].message.content });
    } catch (e) { res.status(500).json({ erro: "Erro nos servidores Groq." }); }
});

// 💻 2. ROTA DA FORJA LUA
app.post('/api/lua', verificaLogin, async (req, res) => {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "system", content: "Retorne APENAS o código Luau formatado." }, { role: "user", content: req.body.prompt }],
                temperature: 0.1 
            })
        });
        const data = await response.json();
        res.json({ resposta: data.choices[0].message.content });
    } catch (e) { res.status(500).json({ erro: "Erro na Forja." }); }
});

// 🎬 3. ROTA DO VÍDEO (FAL.AI)
app.post('/api/video', verificaLogin, async (req, res) => {
    try {
        console.log(`[VÍDEO] Pedido recebido: ${req.body.prompt}`);
        const response = await fetch('https://fal.run/fal-ai/fast-svd/text-to-video', {
            method: 'POST',
            headers: { 'Authorization': `Key ${FAL_API_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: req.body.prompt })
        });
        const data = await response.json();
        res.json({ status: "success", video_url: data.video.url });
    } catch (e) { res.status(500).json({ erro: "Falha ao gerar o Vídeo." }); }
});

// 🎵 4. ROTA DO ÁUDIO (FAL.AI)
app.post('/api/audio', verificaLogin, async (req, res) => {
    try {
        console.log(`[ÁUDIO] Pedido recebido: ${req.body.prompt}`);
        const response = await fetch('https://fal.run/fal-ai/stable-audio', {
            method: 'POST',
            headers: { 'Authorization': `Key ${FAL_API_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: req.body.prompt, seconds_total: 15 })
        });
        const data = await response.json();
        res.json({ status: "success", audio_url: data.audio_file.url });
    } catch (e) { res.status(500).json({ erro: "Falha ao compilar o Áudio." }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 BACKEND V1 GLOBAL ONLINE (Porta ${PORT})`);
});