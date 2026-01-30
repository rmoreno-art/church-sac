/**
 * Função para copiar texto para a área de transferência
 * @param {string} elementId - ID do elemento que contém o texto a copiar
 * @param {string} successMessage - Mensagem a mostrar quando a cópia é bem sucedida
 */
function copyToClipboard(elementId, successMessage) {
    const element = document.getElementById(elementId);
    const text = element.textContent.trim();
    
    // Tenta usar a API moderna do Clipboard
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
            .then(() => {
                showCopyFeedback(successMessage);
            })
            .catch(err => {
                console.error('Erro ao copiar: ', err);
                fallbackCopyText(text, successMessage);
            });
    } else {
        // Fallback para navegadores mais antigos
        fallbackCopyText(text, successMessage);
    }
}

/**
 * Método alternativo para copiar texto (para navegadores mais antigos)
 * @param {string} text - Texto a copiar
 * @param {string} successMessage - Mensagem a mostrar
 */
function fallbackCopyText(text, successMessage) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Torna o elemento invisível
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    
    // Seleciona e copia o texto
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback(successMessage);
        } else {
            showCopyFeedback("Não foi possível copiar. Tente manualmente.", true);
        }
    } catch (err) {
        console.error('Erro ao copiar: ', err);
        showCopyFeedback("Não foi possível copiar. Tente manualmente.", true);
    }
    
    // Remove o elemento temporário
    document.body.removeChild(textArea);
}

/**
 * Mostra feedback visual após a cópia
 * @param {string} message - Mensagem a mostrar
 * @param {boolean} isError - Se é uma mensagem de erro
 */
function showCopyFeedback(message, isError = false) {
    // Cria elemento de feedback
    const feedback = document.createElement('div');
    feedback.textContent = message;
    feedback.style.position = 'fixed';
    feedback.style.top = '20px';
    feedback.style.right = '20px';
    feedback.style.padding = '15px 20px';
    feedback.style.borderRadius = '8px';
    feedback.style.color = 'white';
    feedback.style.backgroundColor = isError ? '#e74c3c' : '#27ae60';
    feedback.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    feedback.style.zIndex = '1000';
    feedback.style.fontWeight = '500';
    feedback.style.transition = 'opacity 0.3s ease';
    feedback.style.opacity = '0';
    
    document.body.appendChild(feedback);
    
    // Anima a entrada
    setTimeout(() => {
        feedback.style.opacity = '1';
    }, 10);
    
    // Remove após 3 segundos
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

/**
 * Adiciona efeito visual ao botão quando clicado
 */
document.addEventListener('DOMContentLoaded', function() {
    // Adiciona evento de clique a todos os botões de copiar
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Adiciona efeito visual temporário
            this.style.transform = 'scale(0.95)';
            this.style.backgroundColor = '#1a4a8f';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            setTimeout(() => {
                this.style.backgroundColor = '';
            }, 300);
        });
    });
    
    // Adiciona efeito de foco para acessibilidade
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('copy-button')) {
                focusedElement.style.outline = '2px solid #2c6bb3';
                focusedElement.style.outlineOffset = '2px';
                
                // Remove o outline quando perde o foco
                focusedElement.addEventListener('blur', function() {
                    this.style.outline = '';
                }, { once: true });
            }
        }
    });
});

/**
 * Função para animar os cartões quando entram na viewport
 */
function animateCardsOnScroll() {
    const cards = document.querySelectorAll('.method-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Inicia animação dos cartões quando a página carrega
document.addEventListener('DOMContentLoaded', animateCardsOnScroll);