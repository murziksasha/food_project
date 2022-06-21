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
  formSender();
  slider();
  calculator();

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
    const endDate = new Date('2022-07-01');

 
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
          btns = document.querySelectorAll('[data-modal]');



    btns.forEach((btn)=>{
      btn.addEventListener('click', (e)=>{
        superShow();

      })
    })

    modal.addEventListener('click', (e)=>{
      if(e.target === modal || e.target.getAttribute('data-close') == ''){
        superClose();
      }
    });

    function superClose (elem = modal) {
      elem.classList.remove('show')
      elem.classList.add('hide');
      document.body.style.overflow = '';

    }
  

    const delayModal = setTimeout(superShow, 50000);


    function superShow (elem = modal) {
      elem.classList.add('show')
      elem.classList.remove('hide');
      document.body.style.overflow = 'hidden';
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

    

    function showModalByScroll() {

        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
          superShow();
          window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    showModalByScroll();

  }

  async function getResource(url) {
    const res = await fetch(url);

    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
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

    getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price }) => {
        new CardsForSite(img, altimg, title, descr, price ).render(CardsParentDiv);
      })
    });

  }

  const postData = async (url, data ) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });
    return await res.json();
  };

  function formSender(){

     const forms = document.querySelectorAll('form');
     const message = {
      loading: 'Loading...',
      success: 'Thank you we will to call you!',
      failure: 'Sorry, something wrong'
     };

     forms.forEach(item => {
      postData(item);
     });
     
     function postData (form){
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);



        const request = new XMLHttpRequest();

        request.open('POST', 'server.php');

        request.setRequestHeader('Content-type', 'appliction/json');
        const formData = new FormData(form);

        const object = {};
        formData.forEach((value, key)=>{
          object[key] = value;
        });

        const json = JSON.stringify(object);

        fetch('server.php',{
          method: "POST",
          headers: {
            'Content-type' : 'application/json'
          },
          body: formData
        }).then (data => data.text())
        .then(data => {
            console.log(data);
            statusMessage.textContent = message.success;
            statusMessage.remove();
        }).catch (() => {
          statusMessage.textContent = message.failure;
        })

      });
     }

  }

  function slider() {
    const prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider');

          let slideIndex = 1;

          showSlides(slideIndex);

    if(slides.length < 10) {
      total.textContent = `0${slides.length}`;
    } else {
      total.textContent = slides.length;
    }

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
      `;
      if(i == 0) {
        dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
    }

    function showSlides (n){
      if (n > slides.length) {
        slideIndex = 1;
      } 

      if ( n < 1) {
        slideIndex = slides.length;
      }

      slides.forEach(item => item.style.display = 'none');

      slides[slideIndex - 1].style.display = 'block';

      if(slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }
    }

    function plusSlides (n) {
      showSlides(slideIndex += n);
    }

    const prevMove = (n = -1)=>{

     prev.addEventListener('click', ()=> {
      plusSlides(n);
      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = '1';
    });
  }

    const nextMove = (n = 1)=>{
      next.addEventListener('click', ()=> {
      plusSlides(n);
      dots.forEach(dot => dot.style.opacity = '.5');
      dots[slideIndex - 1].style.opacity = '1';
    });
  }

  nextMove();
  prevMove();

    dots.forEach(dot => {
      dot.addEventListener('click', (e) =>{
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;

        showSlides(slideTo);
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideTo - 1].style.opacity = '1';

      })  
    })


  }

  function calculator() {
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio = 1.375;

    if(localStorage.getItem('sex')){
      sex = localStorage.getItem('sex');
    } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
    } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if (elem.getAttribute('id') === localStorage.getItem('sex')){
          elem.classList.add(activeClass);
        }
        if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
          elem.classList.add(activeClass);
        }
      });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    


    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____'; // Можете придумать что угодно
            return;
        }
        if (sex === 'female') {
          result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(selector, activeClass) {
      const elements = document.querySelectorAll(`${selector}`);

      elements.forEach(elem=>{
        elem.addEventListener('click', (e) =>{
          if ( e.target.getAttribute('data-ratio')) {
            ratio = +e.target.getAttribute('data-ratio');
            localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
          } else {
            sex = e.target.getAttribute ('id');
            localStorage.setItem('sex', e.target.getAttribute ('id'));
          }
  
          elements.forEach(elem=>{
            elem.classList.remove(activeClass);
          });
  
          e.target.classList.add(activeClass);
  
          calcTotal();
        });
      })
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation (selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {

        if(input.value.match(/\D/g)) {
          input.style.border = '1px solid red';
        } else {
          input.style.border = 'none';
        }
        switch(input.getAttribute('id')) {
          case 'height':
            height = +input.value;
            break;
          case 'weight':
            weight = +input.value;
            break;
          case 'age':
            age = +input.value;
            break;

        }

      calcTotal();

      });

    }

    getDynamicInformation ('#height');
    getDynamicInformation ('#weight');
    getDynamicInformation ('#age');

  


  }







});