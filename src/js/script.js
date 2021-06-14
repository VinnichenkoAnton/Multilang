'use strict';
let arrLang = {
    'en': {
        'about': 'Episode I',
        'descr': 'The Phantom Menace',
        'photo': 'Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute. Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo. While the Congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict….'
    },
    'ru': {
        'about': 'Эпизод I',
        'descr': 'Скрытая угроза',
        'photo': 'Неспокойные времена настали для Галактической Республики. Налогообложение торговых путей к отдаленным солнечным системам стало причиной раздоров. В стремлении добиться своего обуянная алчностью Торговая Федерация с помощью мощных боевых кораблей взяла в кольцо блокады маленькую планету Набу, лишив её всех поставок. В то время как члены Конгресса Республики ведут напряженные дебаты в связи с тревожными событиями, Верховный канцлер втайне от всех поручил двум рыцарям-джедаям — хранителям мира и справедливости в Галактике — урегулировать конфликт…'
    },
    'uk': {
        'about': 'Епізод I',
        'descr': 'Прихована загроза',
        'photo': 'Смута поглинула Галактичну Республіку. Оподаткування торгових шляхів до віддалених сонячних систем стало причиною чвар. У прагненні домогтися свого жадібна Торгова Федерація за допомогою потужних бойових кораблів взяла в кільце блокади маленьку планету Набу, позбавивши її всіх поставок. У той час як члени Конгресу Республіки ведуть напружені дебати у зв\'язку з тривожними подіями, Верховний канцлер таємно відправив двох лицарів джедаїв, хранителів миру і справедливості в Галактиці - врегулювати конфлікт….'
    }
};

const buttons = document.querySelectorAll('.lang__item');
const texts = document.querySelectorAll('.text__about, .text__descr, .text__photo');



window.addEventListener('DOMContentLoaded', () => {

    function translatedTextRender() {
        let currentLanguage = localStorage.getItem('language');
        texts.forEach(text => {
            text.textContent = arrLang[currentLanguage][text.getAttribute('key')];
        });
    }

    function langChange() {
        let currentLanguage = localStorage.getItem('language');

        if(!currentLanguage) {
            localStorage.setItem('language', 'ru');
        }
        translatedTextRender();

        buttons.forEach(item => {
            if(item.getAttribute('id') === localStorage.getItem('language')){
                item.classList.add('lang__item_active');
            } else {
                item.classList.remove('lang__item_active');
            }

            item.addEventListener('click', () => {
                document.querySelector('.lang__item_active').classList.remove('lang__item_active');
                item.classList.add('lang__item_active');
                
                if(item.getAttribute('id') === 'uk') {
                    localStorage.clear();
                    localStorage.setItem('language', 'uk');
                } else if(item.getAttribute('id') === 'en') {
                    localStorage.clear();
                    localStorage.setItem('language', 'en');
                } else if(item.getAttribute('id') === 'ru') {
                    localStorage.clear();
                    localStorage.setItem('language', 'ru');
                }

                translatedTextRender();
            });
        });
    }
    langChange();





    function stars() {
        const canvas = document.getElementById('c');
        const c = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        class Star {
        constructor() {
            this.x = Math.random() * canvas.width - canvas.width / 2;
            this.y = Math.random() * canvas.height - canvas.height / 2;
            this.px, this.py;
            this.z = Math.random() * 4;
        }
        update() {
            this.px = this.x;
            this.py = this.y;
            this.z += speed;
            this.x += this.x * (speed * 0.2) * this.z;
            this.y += this.y * (speed * 0.2) * this.z;
            if (this.x > canvas.width / 2 + 50 || this.x < -canvas.width / 2 - 50 ||
            this.y > canvas.height / 2 + 50 || this.y < -canvas.height / 2 - 50) {
            this.x = Math.random() * canvas.width - canvas.width / 2;
            this.y = Math.random() * canvas.height - canvas.height / 2;
            this.px = this.x;
            this.py = this.y;
            this.z = 0;
            }
        }
        show() {
            c.lineWidth = this.z;
            c.beginPath();
            c.moveTo(this.x, this.y);
            c.lineTo(this.px, this.py);
            c.stroke();
        }
        }

        let speed = 0.005;
        let speed_inc = 0.0002;
        let stars = [];
        for (let i = 0; i < 1000; i++) stars.push(new Star());
        c.fillStyle = 'rgba(0, 0, 0, 0.4)';
        c.strokeStyle = 'rgb(255, 255, 255, 1)';
        c.translate(canvas.width / 2, canvas.height / 2);

        function draw() {
        requestAnimationFrame(draw);
        c.fillRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        for (let s of stars) {
            s.update();
            s.show();
        }
        if (speed >= 0.005) {
            speed += speed_inc
            if (speed > 0.1) 
            speed_inc = -0.0004;
        }
        }
        draw();
    }
    stars();

});