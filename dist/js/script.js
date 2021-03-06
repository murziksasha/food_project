/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


window.addEventListener("DOMContentLoaded", () => {
  const imgExmAnimate = document.querySelector('.header__logo img');
  const logoAniamtion = imgExmAnimate.animate([{
    transform: 'translateY(0)'
  }, {
    transform: 'translateY(-50px)'
  }, {
    transform: 'translateY(50px)'
  }, {
    transform: 'translateY(0)'
  }], {
    duration: 3000,
    iterations: Infinity
  });
  tabsOnSite();
  counterOnSite();
  modalShow();
  showCards();
<<<<<<< HEAD
=======
  formSender();
>>>>>>> df99a6df2f22afdbe0ec10decc30a9cfbac8f0a0

  function tabsOnSite() {
    const tabContent = document.querySelectorAll('.tabcontent'),
          tabHead = document.querySelector('.tabheader__items'),
          tabHeadItems = document.querySelectorAll('.tabheader__item');

    function hideContent() {
      tabContent.forEach(item => {
        item.classList.remove('show', 'fade');
        item.classList.add("hide", "fade");
      });
      tabHeadItems.forEach((item, i) => {
        item.classList.remove('tabheader__item_active');
      });
    }

    function showContent(def = 0) {
      tabContent[def].classList.remove('hide');
      tabContent[def].classList.add('show');
      tabHeadItems[def].classList.add('tabheader__item_active');
    }

    function tabsToggle(event) {
      event.addEventListener('click', e => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
          tabHeadItems.forEach((item, i) => {
            if (e.target == item) {
              hideContent();
              showContent(i);
            }
          });
        } else {
          return;
        }
      });
    }

    hideContent();
    showContent();
    tabsToggle(tabHead);
  }

  function counterOnSite() {
    const endDate = new Date('2022-06-16');
    setClock(endDate);

    function setClock(endDate) {
      const days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
      updateClock();

      function updateClock() {
        const t = differenceOfTime(endDate);
        days.textContent = getZero(t.days);
        hours.textContent = getZero(t.hours);
        minutes.textContent = getZero(t.minutes);
        seconds.textContent = getZero(t.seconds);

        if (t.total <= 0) {
          clearInterval(timeInterval);
          days.textContent = '00';
          hours.textContent = '00';
          minutes.textContent = '00';
          seconds.textContent = '00';
        }
      }
    }

    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }

    function differenceOfTime(endDate) {
      const nowDate = Date.now(),
            differenceOfTime = endDate - nowDate,
            days = Math.floor(differenceOfTime / (1000 * 60 * 60 * 24)),
            hours = Math.floor(differenceOfTime / (1000 * 60 * 60) % 24),
            minutes = Math.floor(differenceOfTime / (1000 * 60) % 60),
            seconds = Math.floor(differenceOfTime / 1000 % 60);
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
    const modal = document.querySelector('.modal'),
          btns = document.querySelectorAll('[data-modal]');
    btns.forEach(btn => {
      btn.addEventListener('click', e => {
        superShow();
      });
    });
    modal.addEventListener('click', e => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
        superClose();
      }
    });

    function superClose(elem = modal) {
      elem.classList.remove('show');
      elem.classList.add('hide');
      document.body.style.overflow = '';
    }

    const delayModal = setTimeout(superShow, 50000);

    function superShow(elem = modal) {
      elem.classList.add('show');
      elem.classList.remove('hide');
      document.body.style.overflow = 'hidden';
    }

    modal.addEventListener('click', e => {
      if (e.target === modal) {
        superClose();
      }
    });
    document.addEventListener('keydown', e => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
        superClose();
      }
<<<<<<< HEAD
    }); // const delayModal = setTimeout(superShow, 5000);
=======
    });
>>>>>>> df99a6df2f22afdbe0ec10decc30a9cfbac8f0a0

    function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
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
      constructor(src, alt, title, descr, price, ...classes) {
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

        if (this.classes.length === 0) {
          element.classList.add('menu__item');
        } else {
          this.classes.forEach(className => {
            element.classList.add(className);
          });
        }

        element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">????????:</div>
              <div class="menu__item-total"><span>${this.changeToUah()}</span> ??????/????????</div>
          </div>
        `;
        parentSelector.append(element);
      }

    }

    ;
    const tabsOne = new CardsForSite("img/tabs/vegy.jpg", "vegy", '???????? "????????????"', '???????? "????????????" - ?????? ?????????? ???????????? ?? ?????????????????????????? ????????: ???????????? ???????????? ???????????? ?? ??????????????. ?????????????? ???????????????? ?? ???????????????? ??????????. ?????? ?????????????????? ?????????? ?????????????? ?? ?????????????????????? ?????????? ?? ?????????????? ??????????????????!', 10, 'menu__item').render(CardsParentDiv);
    const tabsTwo = new CardsForSite("img/tabs/elite.jpg", "elite", '???????? "??????????????"', '?? ???????? ???????????????????? ???? ???????????????????? ???? ???????????? ???????????????? ???????????? ????????????????, ???? ?? ???????????????????????? ???????????????????? ????????. ?????????????? ????????, ????????????????????????, ???????????? - ?????????????????????? ???????? ?????? ???????????? ?? ????????????????!', 20, 'menu__item').render(CardsParentDiv);
    const tabsThree = new CardsForSite("img/tabs/post.jpg", "post", '???????? "??????????????"', '???????? ???????????????????? - ?????? ???????????????????? ???????????? ????????????????????????: ???????????? ???????????????????? ?????????????????? ?????????????????? ??????????????????????????, ???????????? ???? ??????????????, ????????, ???????????? ?????? ????????????, ???????????????????? ???????????????????? ???????????? ???? ???????? ???????? ?? ?????????????????? ???????????????????????????? ??????????????. ', 16, 'menu__item').render(CardsParentDiv);
  }
<<<<<<< HEAD
=======

  function formSender() {
    const forms = document.querySelectorAll('form');
    const message = {
      loading: 'Loading...',
      success: 'Thank you we will to call you!',
      failure: 'Sorry, something wrong'
    };
    forms.forEach(item => {
      postData(item);
    });

    function postData(form) {
      form.addEventListener('submit', e => {
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
        formData.forEach((value, key) => {
          object[key] = value;
        });
        const json = JSON.stringify(object);
        request.send(json);
        request.addEventListener('load', () => {
          if (request.status === 200) {
            console.log(request.response);
            statusMessage.textContent = message.success;
            form.reset();
            setTimeout(() => {
              statusMessage.remove();
            }, 3000);
          } else {
            statusMessage.textContent = message.failure;
          }
        });
      });
    }
  }
>>>>>>> df99a6df2f22afdbe0ec10decc30a9cfbac8f0a0
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map