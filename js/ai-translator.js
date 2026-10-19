/**
 * Módulo de Segurança LGPD e Tradução por IA (Veris.AI)
 */

// Filtro Regex para Anonimização
function anonymizePersonalData(text) {
    let sanitized = text;

    // Ocultar CPF (000.000.000-00)
    sanitized = sanitized.replace(/\d{3}\.\d{3}\.\d{3}-\d{2}/g, '[CPF_PROTEGIDO]');
    
    // Ocultar CNPJ (00.000.000/0000-00)
    sanitized = sanitized.replace(/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/g, '[CNPJ_PROTEGIDO]');

    // Ocultar E-mails
    sanitized = sanitized.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL_PROTEGIDO]');

    // Ocultar Telefones
    sanitized = sanitized.replace(/(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}[-\s]?\d{4}/g, '[TELEFONE_PROTEGIDO]');

    return sanitized;
}

// Simulador do Assistente "Veris Clarity"
function simplifyLegalese(legalTerm) {
    const dictionary = {
        "litisconsórcio": "quando duas ou mais pessoas entram juntas com o mesmo processo na Justiça",
        "sucumbência": "a obrigação de pagar os honorários do advogado da outra parte quando se perde o processo",
        "habeas corpus": "um pedido urgente ao juiz para garantir a liberdade de alguém que foi preso injustamente",
        "usucapião": "o direito de se tornar dono de um imóvel por morar nele durante muitos anos sem contestação"
    };

    const termLower = legalTerm.toLowerCase().trim();
    return dictionary[termLower] || "Termo jurídico em análise pela Veris.AI.";
}