// ============================================================================
// ENZO STUDIOS V1 PREMIUM - CÉREBRO GLOBAL 
// ============================================================================
const express = require('express');
const cors = require('cors');

const app = express();

// Permite conexões de qualquer telemóvel ou PC
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '15mb' }));

// ============================================================================
// 🔑 COFRE DE CHAVES DE GUERRA
// ============================================================================
const GROQ_API_KEY = "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";
const FAL_API_TOKEN = "5e066a3c-a272-40a8-8e28-d45acdfcba23:f05d38e674119fa5614b3db0f57cc4e4"; 

const verificaLogin = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ erro: "Acesso Negado: Carga de dados vazia." });
    }
    next(); 
};

const CONHECIMENTO_ENZO_IA = `
Você é a 'Enzo IA', Assistente Técnico Sênior da Enzo Studios V1.
Criador: Comandante Enzo. Especialidade: Programação Roblox Luau.
Responda de forma clara, profissional e forneça códigos otimizados.
`;

// ============================================================================
// 🤖 ROTAS DE INTELIGÊNCIA ARTIFICIAL
// ============================================================================

// 💬 1. ENZO IA CORE (Chat)
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
    } catch (e) { res.status(500).json({ erro: "Falha de conexão com o núcleo Groq." }); }
});

// 💻 2. LUA FORGE (Código)
app.post('/api/lua', verificaLogin, async (req, res) => {
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: "Retorne APENAS o código Luau formatado, sem introduções ou explicações. Apenas código." }, 
                    { role: "user", content: req.body.prompt }
                ],
                temperature: 0.1
            })
        });
        const data = await response.json();
        res.json({ resposta: data.choices[0].message.content });
    } catch (e) { res.status(500).json({ erro: "Erro na Forja Lua." }); }
});

// 🎵 3. ESTÚDIO LYRIA (Áudio Real Fal.ai)
app.post('/api/audio', verificaLogin, async (req, res) => {
    try {
        const response = await fetch('https://fal.run/fal-ai/stable-audio', {
            method: 'POST',
            headers: { 'Authorization': `Key ${FAL_API_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: req.body.prompt, seconds_total: 15 })
        });
        const data = await response.json();
        res.json({ status: "success", audio_url: data.audio_file.url });
    } catch (e) { res.status(500).json({ erro: "Falha na geração de áudio." }); }
});

// 🎬 4. DIRETOR VEO (Vídeo Real Fal.ai)
app.post('/api/video', verificaLogin, async (req, res) => {
    try {
        const response = await fetch('https://fal.run/fal-ai/fast-svd/text-to-video', {
            method: 'POST',
            headers: { 'Authorization': `Key ${FAL_API_TOKEN}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: req.body.prompt })
        });
        const data = await response.json();
        res.json({ status: "success", video_url: data.video.url });
    } catch (e) { res.status(500).json({ erro: "Falha na renderização de vídeo." }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 BACKEND V1 GLOBAL ONLINE (Porta ${PORT})`);
});
