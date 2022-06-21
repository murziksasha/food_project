"use strict";


window.addEventListener("DOMContentLoaded",()=>{

  const imgExmAnimate = document.querySelector('.header__logo img');
  const logoAniamtion = imgExmAnimate.animate([
    {transform: 'translateY(0)'},
    {transform: 'translateY(-50px)'},
    {transform: 'translateY(50px)'},
    {transform: 'translateY(0)'}
  ], {
    duration: 3000,
    iterations: Infinity
  });

  tabsOnSite();
  counterOnSite();
  modalShow();
  showCards();

  function tabsOnSite() {
    const tabContent = document.querySelectorAll('.tabcontent'),
    tabHead = document.querySelector('.tabheader__items'),
    tabHeadItems = document.querySelectorAll('.tabheader__item');


function hideContent () {
tabContent.forEach((item)=>{
  item.classList.remove('show', 'fade');
  item.classList.add ("hide", "fade");
});

tabHeadItems.forEach((item, i) =>{
  item.classList.remove('tabheader__item_active');
})
}

function showContent (def= 0) {
tabContent[def].classList.remove('hide');
tabContent[def].classList.add('show');
tabHeadItems[def].classList.add('tabheader__item_active');

}

function tabsToggle(event) {
event.addEventListener('click', (e) => {

  if(e.target && e.target.classList.contains('tabheader__item')){
    tabHeadItems.forEach((item, i)=> {
      if(e.target == item){
        hideContent();
        showContent(i);
      }
    });
  } else {
    return;
  }
})
}

hideContent();
showContent();
tabsToggle(tabHead);

  }

  function counterOnSite(){
    const endDate = new Date('2022-06-16');

 
    setClock(endDate);
    


    function setClock(endDate){
      const days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

            updateClock();

            function updateClock () {
              const t =  differenceOfTime(endDate);

              days.textContent = getZero(t.days);
              hours.textContent = getZero(t.hours);
              minutes.textContent = getZero(t.minutes);
              seconds.textContent = getZero(t.seconds);

              if(t.total <= 0) {
                clearInterval(timeInterval);

                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
              }
            }

    }

    function getZero (num){
      if (num >= 0 && num < 10) {
        return `0${num}`;
      }else {
        return num;
      }
    }

    function differenceOfTime(endDate){
      const nowDate = Date.now(),
            differenceOfTime = endDate - nowDate,
            days = Math.floor(differenceOfTime / (1000 * 60 * 60 * 24)),
            hours = Math.floor(differenceOfTime / (1000 * 60 * 60)  % 24),
            minutes = Math.floor(differenceOfTime / ( 1000 * 60) % 60),
            seconds = Math.floor((differenceOfTime / 1000) % 60);


      return {
        'total': differenceOfTime,
        days,
        hours,
        minutes,
        seconds
      };
    }






  }

  function modalShow() {



    const modal  = document.querySelector('.modal'),
          btns = document.querySelectorAll('[data-modal]'),
          modalClose = document.querySelector('[data-close]');



    btns.forEach((btn)=>{
      btn.addEventListener('click', (e)=>{
        superShow();

      })
    })

    modalClose.addEventListener('click', (e)=>{
      superClose();
    });

    function superClose (elem = modal) {
      elem.classList.remove('show')
      elem.classList.add('hide');
      document.body.style.overflow = '';

    }

    function superShow (elem = modal) {
      elem.classList.add('show')
      elem.classList.remove('hide');
      document.body.style.overflow = 'hidden';
      clearInterval(delayModal);
    }

    modal.addEventListener('click', (e) => {
      if(e.target === modal){
        superClose();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')){
        superClose();

      }
    });

    // const delayModal = setTimeout(superShow, 5000);

    function showModalByScroll() {

        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
          superShow();
          window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    showModalByScroll();

  }

  function showCards() {
    const CardsParentDiv = document.querySelector('.menu__field .container');

    class CardsForSite {
      constructor(src, alt, title, descr, price, ...classes){
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.transfer = 32;
        this.classes = classes;
      }

      changeToUah() {
        return this.price = this.price * this.transfer;
      }

      render(parentSelector) {
        const element = document.createElement('div');
        if(this.classes.length === 0) {
            element.classList.add('menu__item')
        } else {
          this.classes.forEach(className => {
            element.classList.add(className);
          })
        }


        element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.changeToUah()}</span> грн/день</div>
          </div>
        `;
        parentSelector.append(element);
      }
    };

    const tabsOne = new CardsForSite(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
      10,
      'menu__item'
      
    ).render(CardsParentDiv);

    const tabsTwo = new CardsForSite(
      "img/tabs/elite.jpg",
      "elite",
      'Меню "Премиум"',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      20,
      'menu__item'
    ).render(CardsParentDiv);

    const tabsThree = new CardsForSite(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков. ',
      16,
      'menu__item'
    ).render(CardsParentDiv);

  }





});