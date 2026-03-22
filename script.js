/* ============================================
   LISANDRA EVENTOS — JavaScript + Lis IA
   ============================================ */

'use strict';

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
  }
});

// ===== SPLASH SCREEN =====
const splashScreen = document.getElementById('splashScreen');
const splashEnterBtn = document.getElementById('splashEnterBtn');

// Partículas no splash
(function createSplashParticles() {
  const c = document.getElementById('splashParticles');
  if (!c) return;
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.animationDuration = (8 + Math.random() * 14) + 's';
    p.style.width = (1 + Math.random() * 3) + 'px';
    p.style.height = p.style.width;
    c.appendChild(p);
  }
})();

splashEnterBtn && splashEnterBtn.addEventListener('click', () => {
  // 1. Anima o fecho do splash
  splashScreen.classList.add('hiding');
  setTimeout(() => splashScreen.classList.add('hidden'), 800);

  // 2. Pequeno "unlock" de áudio — toca silêncio para desbloquear o contexto de áudio
  if (window.speechSynthesis) {
    const unlock = new SpeechSynthesisUtterance('');
    unlock.volume = 0;
    window.speechSynthesis.speak(unlock);
  }

  // 3. Arranca a sequência de boas-vindas
  startWelcomeSequence();
});

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 12 + 's';
    p.style.animationDuration = (10 + Math.random() * 15) + 's';
    p.style.width = (1 + Math.random() * 3) + 'px';
    p.style.height = p.style.width;
    container.appendChild(p);
  }
}
createParticles();

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const countersStarted = new Set();
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted.has(entry.target)) {
      countersStarted.add(entry.target);
      animateCounter(entry.target, parseInt(entry.target.dataset.target));
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => observer.observe(el));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .stat-item, .about-grid, .contact-item').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== PORTFOLIO FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      const show = filter === 'all' || item.dataset.category === filter;
      item.style.opacity = show ? '1' : '0';
      item.style.transform = show ? 'scale(1)' : 'scale(0.95)';
      item.style.pointerEvents = show ? 'all' : 'none';
      setTimeout(() => item.classList.toggle('hidden', !show), 400);
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
contactForm && contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = '✓ Enviado com Sucesso!';
  btn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
  btn.style.color = '#000';
  setTimeout(() => {
    btn.textContent = 'Enviar Pedido';
    btn.style.background = '';
    btn.style.color = '';
    contactForm.reset();
  }, 3000);
});

// ===== LIS IA MODAL =====
const lisModal = document.getElementById('lisModal');
const lisFab = document.getElementById('lisFab');
const lisClose = document.getElementById('lisClose');
const openLisBtn = document.getElementById('openLisBtn');
const openLisFooter = document.getElementById('openLisFooter');

function openLis() {
  lisModal.classList.add('open');
  document.getElementById('lisInput').focus();
}

function closeLis() {
  lisModal.classList.remove('open');
}

lisFab.addEventListener('click', openLis);
lisClose.addEventListener('click', closeLis);
openLisBtn && openLisBtn.addEventListener('click', openLis);
openLisFooter && openLisFooter.addEventListener('click', openLis);

// Botão consultoria → abre Lis IA com pergunta sobre consultoria
const consultLisBtn = document.getElementById('consultLisBtn');
consultLisBtn && consultLisBtn.addEventListener('click', () => {
  openLis();
  setTimeout(() => sendMessage('Quero saber mais sobre consultoria'), 400);
});

// ===== LIS IA BRAIN =====
const LIS_RESPONSES = {
  saudacao: [
    "Olá! Sou a Lis IA, assistente virtual da Lisandra Eventos. Como posso ajudar hoje? 😊",
    "Bem-vindo(a)! Estou aqui para ajudar com tudo sobre os nossos serviços de eventos."
  ],
  orcamento: [
    "Adoramos ajudar a criar eventos inesquecíveis! Para preparar um orçamento personalizado, preciso de algumas informações:\n\n• Que tipo de evento está a planear?\n• Qual a data prevista?\n• Quantos convidados espera?\n\nPode dizer-me isso? 📋"
  ],
  casamento: [
    "Os nossos casamentos são verdadeiramente mágicos! ✨\n\nTrabalhamos cada detalhe com a máxima elegância:\n• Decoração temática personalizada\n• Gestão completa do evento\n• Catering premium\n• Entretenimento ao vivo\n• Protocolo e cerimonial\n\nQual a data que está a pensar? Adorávamos conhecer a vossa história!"
  ],
  corporativo: [
    "A Lisandra Eventos tem vasta experiência em eventos corporativos! 🏢\n\nDispomos de:\n• Conferências e seminários\n• Lançamentos de produtos\n• Galas e jantares de gala\n• Team building\n• Eventos institucionais\n\nTrabalhámos com empresas como Sonangol, Unitel e muitas outras. Que tipo de evento tem em mente?"
  ],
  servicos: [
    "Oferecemos uma gama completa de serviços premium:\n\n✦ Eventos Corporativos\n✦ Casamentos de Luxo\n✦ Shows & Concursos\n✦ Gestão de Imagem e Protocolo\n✦ Eventos VIP & Premium\n✦ Parcerias Estratégicas\n\nQual destes mais lhe interessa?"
  ],
  contacto: [
    "Pode entrar em contacto connosco através de:\n\n📱 WhatsApp: +244 900 000 000\n✉️ Email: geral@lisandraeventos.ao\n📍 Localização: Luanda, Talatona\n\nOu preencha o formulário de contacto no nosso site. Respondemos em menos de 24 horas! ⚡"
  ],
  preco: [
    "Os nossos preços são personalizados conforme as especificações de cada evento.\n\nFatores que influenciam o orçamento:\n• Tipo e dimensão do evento\n• Data e localização\n• Número de convidados\n• Serviços incluídos\n\nPara receber um orçamento detalhado e sem compromisso, diga-me mais sobre o seu evento! 💼"
  ],
  localizacao: [
    "Estamos localizados em Luanda, Angola — especificamente em Talatona, Sul de Luanda.\n\nOperamos em todo o território nacional e também fazemos eventos internacionais para a diáspora angolana. 🌍"
  ],
  consultoria: [
    "A nossa Consultoria de Eventos é um serviço premium de acompanhamento estratégico! 🎯\n\nTemos 3 modalidades:\n\n✦ Consultoria Corporativa — estratégia, protocolo e gestão de imagem para empresas\n✦ Consultoria 360° — acompanhamento total, equipa dedicada, acesso 24/7\n✦ Consultoria de Cerimónias — casamentos, festas e eventos privados\n\nO processo começa com uma reunião diagnóstico GRATUITA. Quer agendar?"
  ],
  vantagens: [
    "Trabalhar connosco tem vantagens únicas no mercado:\n\n✦ Mais de 12 anos de experiência comprovada\n✦ Equipa dedicada exclusivamente ao seu evento\n✦ Rede premium de fornecedores e parceiros\n✦ Acompanhamento completo do início ao fim\n✦ Metodologia própria com resultados garantidos\n✦ Única empresa de eventos em Angola com assistente IA\n\nJá trabalhámos com mais de 200 clientes satisfeitos! 🏆"
  ],
  agradecimento: [
    "É sempre um prazer! Estamos aqui para tornar o seu evento verdadeiramente inesquecível. ✦\n\nHá mais alguma coisa em que possa ajudar?",
    "Obrigada! A Lisandra Eventos está comprometida a superar sempre as suas expectativas. 💛"
  ],
  default: [
    "Que excelente questão! Para dar-lhe a melhor resposta, pode elaborar um pouco mais sobre o que pretende?\n\nAlternativamente, pode contactar a nossa equipa directamente pelo WhatsApp: +244 900 000 000",
    "Compreendo. Para informações mais detalhadas sobre esse assunto, recomendo falar directamente com a nossa equipa no WhatsApp ou preencher o formulário de contacto.",
    "Ótima pergunta! A nossa equipa terá muito gosto em ajudar. Pode contactar-nos pelo email geral@lisandraeventos.ao ou WhatsApp +244 900 000 000. 😊"
  ]
};

function getLisResponse(input) {
  const text = input.toLowerCase();

  if (/olá|oi|bom dia|boa tarde|boa noite|hello|hi/.test(text)) return pick(LIS_RESPONSES.saudacao);
  if (/orçamento|quote|preço estimat|quanto custa/.test(text)) return pick(LIS_RESPONSES.orcamento);
  if (/casamento|noivado|bodas|wedding/.test(text)) return pick(LIS_RESPONSES.casamento);
  if (/corporativ|empresa|negóci|conference|conferência|institucional/.test(text)) return pick(LIS_RESPONSES.corporativo);
  if (/serviç|oferecem|fazem|disponível/.test(text)) return pick(LIS_RESPONSES.servicos);
  if (/contacto|contactar|telefone|whatsapp|email|localiza|onde ficam/.test(text)) return pick(LIS_RESPONSES.contacto);
  if (/preço|valor|custo|quanto|price/.test(text)) return pick(LIS_RESPONSES.preco);
  if (/luanda|angola|localiza|onde/.test(text)) return pick(LIS_RESPONSES.localizacao);
  if (/obrigad|thank|merci/.test(text)) return pick(LIS_RESPONSES.agradecimento);
  if (/consultori|assessori|estratégi|aconselh/.test(text)) return pick(LIS_RESPONSES.consultoria);
  if (/vantag|porquê|porque|diferenci|motivo|razão|melhor/.test(text)) return pick(LIS_RESPONSES.vantagens);

  return pick(LIS_RESPONSES.default);
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ===== CHAT FUNCTIONS =====
const lisMessages = document.getElementById('lisMessages');

function addMessage(text, isUser = false) {
  const msg = document.createElement('div');
  msg.className = `lis-msg ${isUser ? 'user' : 'bot'}`;

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.textContent = isUser ? 'Tu' : '✦';

  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';

  // Convert newlines to paragraphs
  text.split('\n').forEach(line => {
    if (line.trim()) {
      const p = document.createElement('p');
      p.textContent = line;
      bubble.appendChild(p);
    }
  });

  if (isUser) {
    msg.appendChild(bubble);
    msg.appendChild(avatar);
  } else {
    msg.appendChild(avatar);
    msg.appendChild(bubble);
  }

  lisMessages.appendChild(msg);
  lisMessages.scrollTop = lisMessages.scrollHeight;
}

function showTyping() {
  const typing = document.createElement('div');
  typing.className = 'lis-msg bot typing-msg';
  typing.innerHTML = `
    <div class="msg-avatar">✦</div>
    <div class="msg-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>`;
  lisMessages.appendChild(typing);
  lisMessages.scrollTop = lisMessages.scrollHeight;
  return typing;
}

function sendMessage(text) {
  if (!text.trim()) return;

  // Remove quick replies
  document.querySelectorAll('.lis-quick-replies').forEach(el => el.remove());

  // Add user message
  addMessage(text, true);
  document.getElementById('lisInput').value = '';

  // Show typing
  const typing = showTyping();

  // Simulate thinking time
  const delay = 800 + Math.random() * 600;
  setTimeout(() => {
    typing.remove();
    const respFn = window.getLisResponsePatched || getLisResponse;
    const response = respFn(text);
    addMessage(response, false);

    // Speak response if speech is active
    speak(response);
  }, delay);
}

// ===== SEND EVENTS =====
document.getElementById('lisSend').addEventListener('click', () => {
  sendMessage(document.getElementById('lisInput').value);
});

document.getElementById('lisInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage(document.getElementById('lisInput').value);
  }
});

document.querySelectorAll('.quick-reply').forEach(btn => {
  btn.addEventListener('click', () => sendMessage(btn.dataset.msg));
});

// ===== VOICE (Speech API) =====
const voiceBtn = document.getElementById('voiceBtn');
const voiceIndicator = document.getElementById('voiceIndicator');
let recognition = null;
let isListening = false;

// Cache de vozes carregadas
let _cachedVoices = [];

function loadVoices() {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      _cachedVoices = voices;
      resolve(voices);
    } else {
      // Algumas versões do browser carregam as vozes de forma assíncrona
      window.speechSynthesis.onvoiceschanged = () => {
        _cachedVoices = window.speechSynthesis.getVoices();
        resolve(_cachedVoices);
      };
      // Fallback timeout — fala mesmo sem seleccionar voz específica
      setTimeout(() => resolve(_cachedVoices), 1500);
    }
  });
}

function pickBestVoice(voices) {
  // Prioridade: feminina PT-PT > feminina PT-BR > qualquer PT > qualquer disponível
  return (
    voices.find(v => v.lang === 'pt-PT' && /female|feminino|woman/i.test(v.name)) ||
    voices.find(v => v.lang === 'pt-PT') ||
    voices.find(v => v.lang === 'pt-BR' && /female|feminino|woman/i.test(v.name)) ||
    voices.find(v => v.lang.startsWith('pt')) ||
    voices.find(v => /female|feminino/i.test(v.name)) ||
    voices[0] || null
  );
}

// Text-to-Speech — async para garantir que as vozes estão carregadas
async function speak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();

  // Remove emojis e símbolos especiais
  const cleanText = text
    .replace(/[\u{1F300}-\u{1FFFF}]/gu, '')
    .replace(/[✦★◈◆▶]/g, '')
    .replace(/•/g, ',')
    .replace(/\n+/g, '. ')
    .trim();

  if (!cleanText) return;

  const voices = _cachedVoices.length > 0 ? _cachedVoices : await loadVoices();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'pt-PT';
  utterance.rate = 0.92;
  utterance.pitch = 1.1;
  utterance.volume = 1.0;

  const voice = pickBestVoice(voices);
  if (voice) utterance.voice = voice;

  // Mostra animação de voz no botão enquanto fala
  voiceBtn.classList.add('speaking');
  utterance.onend = () => voiceBtn.classList.remove('speaking');
  utterance.onerror = () => voiceBtn.classList.remove('speaking');

  window.speechSynthesis.speak(utterance);
}

// Carrega vozes logo no início (background)
if (window.speechSynthesis) loadVoices();

// Speech Recognition
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = 'pt-PT';
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    isListening = true;
    voiceBtn.classList.add('listening');
    voiceIndicator.classList.add('active');
  };

  recognition.onend = () => {
    isListening = false;
    voiceBtn.classList.remove('listening');
    voiceIndicator.classList.remove('active');
  };

  recognition.onerror = () => {
    isListening = false;
    voiceBtn.classList.remove('listening');
    voiceIndicator.classList.remove('active');
  };

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    document.getElementById('lisInput').value = transcript;
    sendMessage(transcript);
  };

  voiceBtn.addEventListener('click', () => {
    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (err) {
        console.warn('Voice recognition error:', err);
      }
    }
  });
} else {
  voiceBtn.title = 'Reconhecimento de voz não suportado neste browser';
  voiceBtn.style.opacity = '0.4';
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 80;
    const bottom = top + section.offsetHeight;
    const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);
    if (link) {
      link.style.color = (scrollY >= top && scrollY < bottom) ? 'var(--gold)' : '';
    }
  });
});

// ===== IMAGE FALLBACK (for missing images, show elegant placeholder) =====
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', function() {
    // Create a canvas-based placeholder
    this.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.cssText = `
      width: 100%; height: 100%; min-height: 200px;
      background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Playfair Display', serif;
      color: rgba(201,168,76,0.4);
      font-size: 1rem;
      letter-spacing: 2px;
      border: 1px solid rgba(201,168,76,0.1);
      border-radius: inherit;
    `;
    placeholder.textContent = 'LISANDRA EVENTOS';
    this.parentNode.insertBefore(placeholder, this.nextSibling);
  });
});

// ===== FACEBOOK EMBED FALLBACK =====
// If Facebook iframe fails to load (blocked by browser), show the fallback card
const fbIframe = document.querySelector('.facebook-embed-wrap iframe');
const fbFallback = document.querySelector('.fb-fallback');

if (fbIframe && fbFallback) {
  // Show fallback after 5s if iframe hasn't loaded
  const fbTimer = setTimeout(() => {
    fbIframe.style.display = 'none';
    fbFallback.style.display = 'flex';
  }, 5000);

  fbIframe.addEventListener('load', () => {
    clearTimeout(fbTimer);
    // Check if iframe loaded real content or error
    try {
      const iframeDoc = fbIframe.contentDocument || fbIframe.contentWindow.document;
      if (!iframeDoc || iframeDoc.body.innerHTML === '') {
        fbIframe.style.display = 'none';
        fbFallback.style.display = 'flex';
      }
    } catch (e) {
      // Cross-origin: assume it loaded fine
      clearTimeout(fbTimer);
    }
  });

  fbIframe.addEventListener('error', () => {
    clearTimeout(fbTimer);
    fbIframe.style.display = 'none';
    fbFallback.style.display = 'flex';
  });
}

// ===== INSTAGRAM EMBED RELOAD =====
// Reload Instagram embeds script if loaded after page init
if (window.instgrm) {
  window.instgrm.Embeds.process();
}

// ===== SEQUÊNCIA DE BOAS-VINDAS COM VOZ =====
function startWelcomeSequence() {
  const MSG1 = "Olá! Bem-vindo à Lisandra Eventos! Sou a Lis IA, a sua assistente virtual. Estou aqui para o ajudar!";

  const MSG2 = "Trabalhar connosco tem vantagens únicas:\n\n✦ Mais de 12 anos a criar eventos inesquecíveis em Angola\n✦ Equipa dedicada exclusivamente ao seu evento\n✦ Rede premium dos melhores fornecedores\n✦ Consultoria estratégica gratuita na 1ª reunião\n✦ Presença em todo o território nacional\n✦ A única empresa de eventos em Angola com IA integrada\n\nComo posso ajudar hoje?";

  const VOICE1 = "Olá! Bem-vindo à Lisandra Eventos. Sou a Lis IA, a sua assistente virtual inteligente.";
  const VOICE2 = "Trabalhar connosco tem vantagens únicas. Temos mais de doze anos a criar eventos inesquecíveis em Angola. Oferecemos equipa dedicada exclusivamente ao seu evento, rede dos melhores fornecedores premium, e consultoria estratégica gratuita na primeira reunião. Somos a única empresa de eventos em Angola com inteligência artificial integrada. Como posso ajudar hoje?";

  // Abre o chat
  openLis();

  // Msg 1 + voz imediata
  setTimeout(() => {
    addMessage(MSG1, false);
    speak(VOICE1);

    // Msg 2 com animação de typing, depois voz
    setTimeout(() => {
      const typing = showTyping();
      setTimeout(() => {
        typing.remove();
        addMessage(MSG2, false);
        speak(VOICE2);

        // Quick replies finais
        const qr = document.createElement('div');
        qr.className = 'lis-quick-replies';
        qr.innerHTML = `
          <button class="quick-reply" data-msg="Quero agendar uma consultoria gratuita">📅 Consultoria Grátis</button>
          <button class="quick-reply" data-msg="Que serviços oferecem?">🎉 Ver Serviços</button>
          <button class="quick-reply" data-msg="Quero fazer um orçamento">💰 Pedir Orçamento</button>
          <button class="quick-reply" data-msg="Quero organizar um casamento">💍 Casamento</button>
        `;
        lisMessages.appendChild(qr);
        lisMessages.scrollTop = lisMessages.scrollHeight;
        qr.querySelectorAll('.quick-reply').forEach(btn => {
          btn.addEventListener('click', () => sendMessage(btn.dataset.msg));
        });
      }, 2000);
    }, 3200);
  }, 600);
}

// Resposta especial para "agendar consultoria gratuita"
const _origGetLisResponse = getLisResponse;
// Patch para capturar a frase de consultoria gratuita
const getLisResponsePatched = (input) => {
  const t = input.toLowerCase();
  if (/agendar|marcação|marcar|reunião|reuniao/.test(t) && /consult|grat|free/.test(t)) {
    return "Óptima decisão! A nossa reunião de consultoria é totalmente gratuita e sem compromisso.\n\nPara agendar, partilhe connosco:\n• O seu nome\n• Tipo de evento que está a planear\n• Data aproximada\n• Contacto telefónico\n\nOu ligue directamente: +244 900 000 000\nOu preencha o formulário de contacto no site. A nossa equipa entrará em contacto em menos de 2 horas! ⚡";
  }
  return _origGetLisResponse(input);
};

// Substitui a função global
window.getLisResponsePatched = getLisResponsePatched;

// ===== INIT =====
console.log('%c✦ Lisandra Eventos — Lis IA ready', 'color: #C9A84C; font-size: 14px; font-weight: bold;');
