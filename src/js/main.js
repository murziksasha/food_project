"use strict";

window.addEventListener("DOMContentLoaded",()=>{

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

});