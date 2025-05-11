// JS для першої сторінки 
const background = document.querySelector('.parallax-background');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  const moveX = (0.5 - x) * 20; 
  const moveY = (0.5 - y) * 20; 

  background.style.transform = `translate(${ -5 + moveX }%, ${ -5 + moveY }%)`;
});


// JS для сторінки з картинками
    const imageNames = [
  'one.jpg', 'two.jpg', 'three.jpg', 'four.jpg',
  'five.jpg', 'six.jpg', 'seven.jpg', 'eight.jpg',
  'nine.jpg', 'ten.jpg', 'eleven.jpg', 'twelve.jpg'
];

const images = imageNames.map(name => ({
  src: name,
  alt: name.split('.')[0]
}));

let cards = [];
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createCard(image) {
  const card = document.createElement('div');
  card.classList.add('card');

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');

  const img = document.createElement('img');
  img.src = image.src;
  img.alt = image.alt;
  cardBack.appendChild(img);

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);

  card.dataset.image = image.src;

  card.addEventListener('click', () => {
    if (
      flippedCards.length < 2 &&
      !card.classList.contains('flipped') &&
      !card.classList.contains('matched')
    ) {
      card.classList.add('flipped');
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        setTimeout(checkMatch, 800);
      }
    }
  });

  return card;
}

function startGame() {
  const gameContainer = document.getElementById('game-container');
  gameContainer.innerHTML = '';

  const allImages = shuffle([...images, ...images]);
  cards = allImages.map(createCard);

  cards.forEach(card => gameContainer.appendChild(card));
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.image === card2.dataset.image) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    if (matchedCards.length === cards.length) {
      setTimeout(showMessage, 500);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }
  flippedCards = [];
}

function showMessage() {
  document.getElementById('message-box').style.display = 'block';
}

function handleFeedback(liked) {
  const message = liked ? 'Дякуємо за оцінку!' : 'Дякуємо за увагу!';
  document.getElementById('message-box').innerHTML = `<p>${message}</p>`;
  setTimeout(() => {
    document.getElementById('message-box').style.display = 'none';
  }, 3000);
}

window.onload = startGame;



/* стилі для розповіді */
const container = document.getElementById('container');
const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');
const timerElement = document.getElementById('timer');

const scenes = [
  { text: "Ти прокидаєшся у фіолетовому світі снів. Який шлях обереш?", options: ["Стежка туманів", "Кам’яний міст", "Зачароване поле"] },
  { text: "Туман відкриває ворота до міста привидів. Що зробиш?", options: ["Увійдеш сміливо", "Постукаєш", "Почекаєш"] },
  { text: "Міст скрипить під ногами, і дракон здіймається в небо. Далі?", options: ["Вклонишся", "Закричиш", "Втечеш"] },
  { text: "Поле сяє кристалами. Один блимає яскравіше. Доторкнешся?", options: ["Так", "Ні", "Пройдеш повз"] },
  { text: "Ти отримуєш магічний камінь. Що зробиш з ним?", options: ["Збережеш", "Активуєш", "Покладеш на землю"] },
  { text: "Місто оживає, а жителі шепочуть твоє ім’я. Як реагуєш?", options: ["Здрастуєш їх", "Мовчиш", "Тікаєш"] },
  { text: "Дракон опускається перед тобою. Він щось охороняє. Що зробиш?", options: ["Поговориш", "Даси дарунок", "Спробуєш пройти"] },
  { text: "Кристал відкриває портал у глибини океану. Що далі?", options: ["Пірнаєш", "Оглядаєш берег", "Кличеш когось"] },
  { text: "Ти пливеш повз затонуле місто. Попереду — світло. Що робиш?", options: ["Пливеш до нього", "Звертаєш", "Зупиняєшся"] },
  { text: "Світло — це очі істоти. Вона говорить мовою думок. Відповіси?", options: ["Так", "Ні", "Запитаєш ім’я"] },
  { text: "Істота передає частину сили. Куди її спрямуєш?", options: ["У серце", "В розум", "В руки"] },
  { text: "Повернувшись, бачиш дзеркало. Воно оживає. Що зробиш?", options: ["Увійдеш", "Розіб’єш", "Залишиш"] },
  { text: "За дзеркалом — храм з енергією часу. Торкнешся ядра?", options: ["Так", "Ні", "Запитаєш дозволу"] },
  { text: "Час зупинився. Лиш одна мить — вибрати одне бажання. Що обереш?", options: ["Безсмертя", "Знання", "Кохання"] },
  { text: "Кінець: Ти став легендою світу снів. Історія твоя розповідатиметься вічно...", options: ["Вітаююю..."] }
];
function choose(option) {
  sceneIndex++;
  if (sceneIndex >= scenes.length) {
    clearInterval(timer);
    window.location.href = "tell.html";
    return;
  }
  renderScene();
}
let sceneIndex = 0;
let timeLeft = 30;
let timer;

function startTimer() {
  timeLeft = 30;
  timerElement.textContent = `Час: ${timeLeft}`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Час: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      resetGame("⏳ Час вийшов! Почни знову.");
    }
  }, 1000);
}

function renderScene() {
  const scene = scenes[sceneIndex];
  container.classList.remove('show');
  setTimeout(() => {
    storyElement.textContent = scene.text;
    choicesElement.innerHTML = scene.options.map((opt, i) =>
      `<button onclick="choose(${i})">${opt}</button>`
    ).join('');
    container.classList.add('show');
    startTimer();
  }, 300);
}


function resetGame(message) {
  alert(message);
  sceneIndex = 0;
  renderScene();
}

renderScene();
