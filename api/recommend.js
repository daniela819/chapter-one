module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const book = req.body?.book;
    const genres = req.body?.genres;

    if (!book && !genres) return res.status(400).json({ error: 'Missing book or genres' });

    const prompt = book
      ? `Eres una experta en literatura. Una persona leyó "${book}"${genres ? ` y le interesan géneros como: ${genres}` : ''} y quiere saber qué leer a continuación.

IMPORTANTE: Solo recomienda libros que REALMENTE EXISTEN. El título y el autor deben ser 100% exactos y verificables. No inventes ni combines títulos. Si no estás segura de un título exacto, elige otro libro del que sí estés completamente segura.

Recomienda exactamente 3 libros reales y publicados. Responde ÚNICAMENTE en JSON válido, sin texto extra, sin markdown, sin backticks. Formato:
[{"title":"título exacto del libro","author":"nombre exacto del autor","why":"Una oración corta y específica de por qué le va a gustar si disfrutó ${book}","color":"#xxxxxx"}]

Los colores deben ser bonitos tipo #1A47B8 o #7B74D4, uno diferente por libro. Why debe ser conversacional y entusiasta, máximo 20 palabras.`
      : `Eres una experta en literatura. Recomienda exactamente 3 libros excelentes del género ${genres}.

IMPORTANTE: Solo recomienda libros que REALMENTE EXISTEN. El título y el autor deben ser 100% exactos y verificables. No inventes ni combines títulos.

Responde ÚNICAMENTE en JSON válido, sin texto extra, sin markdown, sin backticks. Formato:
[{"title":"título exacto del libro","author":"nombre exacto del autor","why":"Una oración corta y entusiasta de por qué este libro es imprescindible","color":"#xxxxxx"}]

Los colores deben ser bonitos tipo #1A47B8 o #7B74D4, uno diferente por libro. Why debe ser conversacional y entusiasta, máximo 20 palabras.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic error:', JSON.stringify(data));
      return res.status(500).json({ error: data.error?.message || 'API error' });
    }

    const text = data.content?.find(c => c.type === 'text')?.text || '[]';
    const clean = text.replace(/```json|```/g, '').trim();
    const recs = JSON.parse(clean);
    return res.status(200).json(recs);

  } catch (e) {
    console.error('Function error:', e.message, e.stack);
    return res.status(500).json({ error: e.message });
  }
}
