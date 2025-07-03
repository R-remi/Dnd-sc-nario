export async function exportSummary(history, ollama) {
    const summaryPrompt = `Résumé de la session :\n\n${history.map(h =>
        (h.role === 'user' ? "Joueur : " : "MJ : ") + h.content
    ).join("\n")}\n\nFais un résumé clair et concis de cette session.`;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    try {
        const response = await ollama.generate(summaryPrompt);
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 10;
        const maxWidth = pageWidth - margin * 2;
        const lineHeight = 10;
        let y = 20;

        doc.text("Résumé de la session :", margin, y);
        y += lineHeight;

        const lines = doc.splitTextToSize(response, maxWidth);
        for (const line of lines) {
            if (y + lineHeight > doc.internal.pageSize.getHeight() - margin) {
                doc.addPage();
                y = margin;
            }
            doc.text(line, margin, y);
            y += lineHeight;
        }

        doc.save("resume_session.pdf");
    } catch (err) {
        console.error("Erreur lors de la génération du résumé :", err);
    }
}
