/**
 * Презентація-розвага «WTF» — Зображення строго по центру, назва та оцінка справа, моноширні таймер і очки
 */

const CARDS_DECK = [
  {
    id: 'sata_cable',
    title: 'SATA-кабель',
    description: 'Кабель для підключення жорстких дисків та SSD накопичувачів до материнської плати ПК.',
    image: './assets/images/item_2_sata_cable.webp',
    difficulty: 1
  },
  {
    id: 'm2_ssd',
    title: 'Твердотільний накопичувач M.2 NVMe SSD',
    description: 'Швидкісний компактний модуль енергонезалежної пам\'яті для ПК та ноутбуків.',
    image: './assets/images/item_6_m2_ssd.webp',
    difficulty: 1
  },
  {
    id: 'thermal_paste',
    title: 'Теплопровідна паста',
    description: 'Склад для заповнення мікрозазорів між чипом процесора та радіатором охолодження.',
    image: './assets/images/item_14_thermal_paste.webp',
    difficulty: 2
  },
  {
    id: 'kanifol',
    title: 'Соснова каніфоль',
    description: 'Тверда смола для знімання оксидів з металу та якісного лудження дротів під час паяння.',
    image: './assets/images/item_5_kanifol.webp',
    difficulty: 2
  },
  {
    id: 'tire_levers',
    title: 'Велосипедні бортувальні лопатки',
    description: 'Міцні важелі для легкого знімання та монтажу покришки на велосипедний обід.',
    image: './assets/images/item_7_tire_levers.webp',
    difficulty: 1
  },
  {
    id: 'anchor_bolt',
    title: 'Розпірний анкерний болт',
    description: 'Силове металеве кріплення, що розклинюється всередині бетону чи цегли для важких конструкцій.',
    image: './assets/images/item_15_anchor_bolt.webp',
    difficulty: 3
  },
  {
    id: 'heat_shrink',
    title: 'Термоусадочна ізоляційна трубка',
    description: 'Полімерна трубка, яка стискається при нагріванні для герметичної ізоляції з\'єднань дротів.',
    image: './assets/images/item_12_heat_shrink.webp',
    difficulty: 1
  },
  {
    id: 'brake_pads',
    title: 'Гальмівні колодки обідного гальма',
    description: 'Гумові вставки із замінними картриджами, які затискають обід колеса для гальмування.',
    image: './assets/images/item_13_brake_pads.webp',
    difficulty: 4
  },
  {
    id: 'presta_valve',
    title: 'Ніпель Presta',
    description: 'Велосипедний ніпель, який дозволяє накачати тонкий велосипедний ніпель Presta автонасосом.',
    image: './assets/images/item_3_presta_valve.webp',
    difficulty: 1
  },
  {
    id: 'spoke_wrench',
    title: 'Спицевий ключ для велосипедних коліс',
    description: 'Ключ із прорізами для регулювання натягу спиць та усунення викривлень обода колеса.',
    image: './assets/images/item_16_spoke_wrench.webp',
    difficulty: 4
  },
  {
    id: 'screw_extractor',
    title: 'Екстрактор для викручування зламаних болтів',
    description: 'Інструмент із лівою спіральною різьбою для викручування заламаних та злизаних кріплень.',
    image: './assets/images/item_1_screw_extractor.webp',
    difficulty: 5
  },
  {
    id: 'pocket_saw',
    title: 'Кишенькова ланцюгова туристична пила',
    description: 'Гнучкий сталевий ланцюг із двома ручками для швидкого пиляння дров у поході.',
    image: './assets/images/item_10_pocket_saw.webp',
    difficulty: 1
  },
  {
    id: 'wheel_lock',
    title: 'Ключ-адаптер для автомобільних болтів-секреток',
    description: 'Спеціальна насадка з унікальним фігурним візерунком для захисту коліс від крадіжки.',
    image: './assets/images/item_4_wheel_lock.webp',
    difficulty: 3
  },
  {
    id: 'chain_gauge',
    title: 'Індикатор зносу велосипедного ланцюга',
    description: 'Шаблон з двома щупами для перевірки розтягування ланок та контролю зносу ланцюга.',
    image: './assets/images/item_11_chain_gauge.webp',
    difficulty: 5
  },
  {
    id: 'cmos_jumper',
    title: 'Перемикач-джампер BIOS/CMOS',
    description: 'Маленька перемичка для замикання контактів та скидання налаштувань материнської плати.',
    image: './assets/images/item_9_cmos_jumper.webp',
    difficulty: 5
  },
  {
    id: 'tap_die',
    title: 'Метчик та плашка',
    description: 'Інструменти для нарізання нової та відновлення пошкодженої внутрішньої й зовнішньої різьби.',
    image: './assets/images/item_8_tap_die.webp',
    difficulty: 5
  },
  {
    id: 'ceramic_fuse',
    title: 'Запобіжник циліндричний керамічний',
    description: 'Електричний захисний елемент у міцному керамічному корпусі для автоматичного розмикання кола при перевантаженні.',
    image: './assets/images/item_17_ceramic_fuse.webp',
    difficulty: 2
  }
];

class WTFPresentationApp {
  constructor() {
    this.gameStarted = false;
    this.deck = [];
    this.currentIndex = 0;
    this.isRevealed = false;

    // Timer & Scoring
    this.timerInterval = null;
    this.cardSeconds = 0;
    this.selectedAccuracy = null; // No option preselected by default
    this.cardScores = [];
    this.totalScore = 0;

    this.initDOM();
    this.bindEvents();
    this.renderInitialState();
  }

  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  initDOM() {
    this.mainViewport = document.getElementById('mainViewport');
    this.slideBadge = document.getElementById('slideBadge');
    this.progressBar = document.getElementById('progressBar');
    this.nextBtn = document.getElementById('nextBtn');
    this.fullscreenBtn = document.getElementById('fullscreenBtn');
    this.timerBadge = document.getElementById('timerBadge');
    this.scoreBadge = document.getElementById('scoreBadge');
    this.startModal = document.getElementById('startModal');
    this.startGameBtn = document.getElementById('startGameBtn');
    this.appFooter = document.getElementById('appFooter');
    this.resultsModal = document.getElementById('resultsModal');
  }

  renderInitialState() {
    this.slideBadge.textContent = `0 / ${CARDS_DECK.length}`;
    this.progressBar.style.width = `0%`;
    this.nextBtn.disabled = true;
    this.nextBtn.classList.add('disabled');
    if (this.appFooter) {
      this.appFooter.classList.add('hidden');
    }
    this.mainViewport.innerHTML = '';
  }

  bindEvents() {
    if (this.startGameBtn) {
      this.startGameBtn.addEventListener('click', () => this.startGame());
    }
    this.nextBtn.addEventListener('click', () => this.handleNext());
    this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Ignore key navigation if modals are open or game not started
      if (!this.gameStarted) return;
      if (this.startModal && !this.startModal.classList.contains('hidden')) return;
      if (this.resultsModal && !this.resultsModal.classList.contains('hidden')) return;

      if (e.code === 'Space' || e.code === 'ArrowRight') {
        e.preventDefault();
        this.handleNext();
      }
    });
  }

  startGame() {
    if (window.soundEngine) window.soundEngine.playClick();
    this.gameStarted = true;
    this.deck = this.shuffleArray([...CARDS_DECK]);
    this.currentIndex = 0;
    this.isRevealed = false;
    this.selectedAccuracy = null;
    this.cardScores = [];
    this.totalScore = 0;
    this.scoreBadge.textContent = `⭐ 0 очок`;

    if (this.startModal) {
      this.startModal.classList.add('hidden');
    }
    if (this.appFooter) {
      this.appFooter.classList.remove('hidden');
    }
    this.render();
    this.startCardTimer();
  }

  startCardTimer() {
    this.stopCardTimer();
    this.cardSeconds = 0;
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      this.cardSeconds++;
      this.updateTimerDisplay();
    }, 1000);
  }

  stopCardTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    const mins = Math.floor(this.cardSeconds / 60).toString().padStart(2, '0');
    const secs = (this.cardSeconds % 60).toString().padStart(2, '0');
    this.timerBadge.textContent = `⏱️ ${mins}:${secs}`;
  }

  handleNext() {
    if (!this.gameStarted) return;

    // Block action if card is revealed but no result option has been chosen yet
    if (this.isRevealed && this.selectedAccuracy === null) {
      return;
    }

    if (window.soundEngine) window.soundEngine.playClick();

    if (!this.isRevealed) {
      // 1st Click: Reveal title on the right side panel & stop timer
      this.isRevealed = true;
      this.stopCardTimer();
      if (window.soundEngine) window.soundEngine.playReveal();
      this.render();
    } else {
      // 2nd Click: Calculate score for current card & advance to next
      this.calculateCurrentCardScore();

      if (this.currentIndex < this.deck.length - 1) {
        this.currentIndex++;
        this.isRevealed = false;
        this.selectedAccuracy = null;
        if (window.soundEngine) window.soundEngine.playSlide();
        this.render();
        this.startCardTimer();
      } else {
        this.showFinalResults();
      }
    }
  }

  calculateCurrentCardScore() {
    const item = this.deck[this.currentIndex];
    const difficulty = item.difficulty || 3;

    let timeMult = 1.0;
    if (this.cardSeconds <= 20) {
      timeMult = 1.5;
    } else if (this.cardSeconds <= 50) {
      timeMult = 1.2;
    }

    const accuracyMap = { 0: 0, 1: 0.33, 2: 0.67, 3: 1.0, 4: 1.33 };
    const effectiveAccLevel = this.selectedAccuracy !== null ? this.selectedAccuracy : 0;
    const accFactor = accuracyMap[effectiveAccLevel] !== undefined ? accuracyMap[effectiveAccLevel] : 0;

    const basePoints = difficulty * 20;
    const finalPoints = Math.round(basePoints * timeMult * accFactor);

    this.cardScores[this.currentIndex] = {
      title: item.title,
      difficulty,
      seconds: this.cardSeconds,
      timeMult,
      accuracyLevel: effectiveAccLevel,
      points: finalPoints
    };

    const prevScore = this.totalScore;
    this.totalScore = this.cardScores.reduce((acc, curr) => acc + (curr ? curr.points : 0), 0);
    this.animateScoreIncrease(prevScore, this.totalScore);

    if (finalPoints > 80) {
      this.triggerConfettiBurst();
    }
  }

  triggerConfettiBurst() {
    const rect = this.scoreBadge.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const colors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#3b82f6', '#14b8a6', '#f43f5e'];

    // Single burst wave of 40 confetti particles, twice as slow (4.4s animation)
    for (let i = 0; i < 40; i++) {
      const el = document.createElement('div');
      el.className = 'mini-confetti';

      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = Math.random() * Math.PI * 2;
      const distance = 25 + Math.random() * 100;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = (Math.random() - 0.5) * 720;
      const size = 6 + Math.random() * 6;

      el.style.backgroundColor = color;
      el.style.left = `${centerX}px`;
      el.style.top = `${centerY}px`;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.borderRadius = Math.random() > 0.4 ? '50%' : '2px';
      el.style.setProperty('--tx', `${tx}px`);
      el.style.setProperty('--ty', `${ty}px`);
      el.style.setProperty('--rot', `${rot}deg`);

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }
  }

  animateScoreIncrease(startVal, endVal) {
    if (startVal === endVal) {
      this.scoreBadge.textContent = `⭐ ${endVal} очок`;
      return;
    }

    this.scoreBadge.classList.remove('pulsing');
    void this.scoreBadge.offsetWidth; // Trigger reflow
    this.scoreBadge.classList.add('pulsing');

    const duration = 600; // ms
    const startTime = performance.now();

    const updateStep = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const currentVal = Math.round(startVal + (endVal - startVal) * easeProgress);

      this.scoreBadge.textContent = `⭐ ${currentVal} очок`;

      if (progress < 1) {
        requestAnimationFrame(updateStep);
      } else {
        this.scoreBadge.textContent = `⭐ ${endVal} очок`;
        setTimeout(() => this.scoreBadge.classList.remove('pulsing'), 100);
      }
    };

    requestAnimationFrame(updateStep);
  }

  getDifficultyHtml(level) {
    const colors = ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444'];
    let squares = '';
    for (let i = 0; i < 5; i++) {
      const isFilled = i < level;
      const color = colors[i];
      squares += `<span class="diff-square ${isFilled ? 'filled' : ''}" style="${isFilled ? `background-color: ${color}; border-color: ${color};` : ''}"></span>`;
    }
    return `
      <div class="difficulty-tag">
        <span class="diff-label">Складність:</span>
        <div class="diff-squares">${squares}</div>
      </div>
    `;
  }

  render() {
    const item = this.deck[this.currentIndex];
    const total = this.deck.length;
    const progressPct = ((this.currentIndex + 1) / total) * 100;

    this.slideBadge.textContent = `${this.currentIndex + 1} / ${total}`;
    this.progressBar.style.width = `${progressPct}%`;
    this.nextBtn.textContent = 'Далі';

    // Lock 'Далі' button if revealed and no option selected yet
    if (this.isRevealed && this.selectedAccuracy === null) {
      this.nextBtn.disabled = true;
      this.nextBtn.classList.add('disabled');
    } else {
      this.nextBtn.disabled = false;
      this.nextBtn.classList.remove('disabled');
    }

    this.mainViewport.innerHTML = `
      <div class="img-wrapper">
        <div class="img-container">
          <img src="${item.image}" alt="Загадка #${this.currentIndex + 1}" class="slide-img">
          ${this.getDifficultyHtml(item.difficulty)}

          ${this.isRevealed
        ? `
              <!-- Desktop Right Panel -->
              <div class="right-panel">
                <div class="title-block">
                  <h2 class="card-title-text">${item.title}</h2>
                  <p class="card-desc-text">${item.description}</p>
                </div>
                <div class="accuracy-block">
                  <span class="accuracy-label">Результат</span>
                  <div class="accuracy-buttons-grid">
                    <button class="acc-btn ${this.selectedAccuracy === 0 ? 'selected' : ''}" data-acc="0"><span>Зовсім ні</span></button>
                    <button class="acc-btn ${this.selectedAccuracy === 1 ? 'selected' : ''}" data-acc="1"><span>Трохи є</span></button>
                    <button class="acc-btn ${this.selectedAccuracy === 2 ? 'selected' : ''}" data-acc="2"><span>Більш менш</span></button>
                    <button class="acc-btn ${this.selectedAccuracy === 3 ? 'selected' : ''}" data-acc="3"><span>Точно</span></button>
                    <button class="acc-btn ${this.selectedAccuracy === 4 ? 'selected' : ''}" data-acc="4" title="Точно назвала назву + пояснила де й як вживається"><span>Експерт</span></button>
                  </div>
                </div>
              </div>

              <!-- Mobile Bottom Sheet Modal -->
              <div class="mobile-bottom-sheet">
                <div class="mobile-sheet-content">
                  <div class="mobile-title-block">
                    <h2 class="mobile-card-title">${item.title}</h2>
                    <p class="mobile-card-desc">${item.description}</p>
                  </div>
                  <div class="mobile-accuracy-block">
                    <span class="accuracy-label">Результат</span>
                    <div class="accuracy-buttons-grid">
                      <button class="acc-btn ${this.selectedAccuracy === 0 ? 'selected' : ''}" data-acc="0"><span>Зовсім ні</span></button>
                      <button class="acc-btn ${this.selectedAccuracy === 1 ? 'selected' : ''}" data-acc="1"><span>Трохи є</span></button>
                      <button class="acc-btn ${this.selectedAccuracy === 2 ? 'selected' : ''}" data-acc="2"><span>Більш менш</span></button>
                      <button class="acc-btn ${this.selectedAccuracy === 3 ? 'selected' : ''}" data-acc="3"><span>Точно</span></button>
                      <button class="acc-btn ${this.selectedAccuracy === 4 ? 'selected' : ''}" data-acc="4" title="Точно назвала назву + пояснила де й як вживається"><span>Експерт</span></button>
                    </div>
                  </div>
                </div>
              </div>
            `
        : ''
      }
        </div>
      </div>
    `;

    if (this.isRevealed) {
      this.bindAccuracyEvents();
    }
  }

  bindAccuracyEvents() {
    const btns = this.mainViewport.querySelectorAll('.acc-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (window.soundEngine) window.soundEngine.playClick();
        const accVal = parseInt(e.currentTarget.dataset.acc, 10);
        this.selectedAccuracy = accVal;

        btns.forEach(b => {
          if (parseInt(b.dataset.acc, 10) === accVal) {
            b.classList.add('selected');
          } else {
            b.classList.remove('selected');
          }
        });

        // Enable 'Далі' button as soon as an option is selected
        this.nextBtn.disabled = false;
        this.nextBtn.classList.remove('disabled');
      });
    });
  }

  showFinalResults() {
    this.stopCardTimer();

    // Clear main viewport (remove image and side/mobile panel) when results are shown
    this.mainViewport.innerHTML = '';
    if (this.appFooter) {
      this.appFooter.classList.add('hidden');
    }

    document.getElementById('finalScoreNum').textContent = `${this.totalScore} очок`;

    let rankTitle = '🏆 Гран-Майстер Механіки';
    if (this.totalScore > 1800) {
      rankTitle = '⚡ Абсолютний WTF is This Експерт Всесвіту';
    } else if (this.totalScore > 1200) {
      rankTitle = '🛠️ Гуру Гаражних Таємниць';
    } else if (this.totalScore > 600) {
      rankTitle = '🎯 Знавець Технічних Дрібниць';
    } else {
      rankTitle = '🎨 Творчий Аматор';
    }
    document.getElementById('finalRankBadge').textContent = rankTitle;

    const accLabelMap = { 0: 'Зовсім ні', 1: 'Трохи є', 2: 'Більш менш', 3: 'Точно', 4: 'Експерт' };

    const breakdownEl = document.getElementById('resultsBreakdown');
    breakdownEl.innerHTML = this.cardScores.map((sc, idx) => `
      <div class="breakdown-row">
        <div class="breakdown-info">
          <strong class="breakdown-title">${idx + 1}. ${sc.title}</strong>
          <div class="breakdown-meta">
            Складність: ${sc.difficulty}/5 | Час: ${sc.seconds}с (${sc.timeMult}x) | Відповідь: <strong>${accLabelMap[sc.accuracyLevel] || 'Зовсім ні'}</strong>
          </div>
        </div>
        <strong class="breakdown-points">+${sc.points}</strong>
      </div>
    `).join('');

    this.resultsModal.classList.remove('hidden');
    if (window.soundEngine) window.soundEngine.playScore('exact');
  }

  restartGame() {
    this.resultsModal.classList.add('hidden');
    this.startGame();
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new WTFPresentationApp();
});
