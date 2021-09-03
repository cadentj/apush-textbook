/*!
* Start Bootstrap - Grayscale v7.0.3 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
//


let displayedPages = 0;

window.addEventListener('DOMContentLoaded', event => {
console.log(document.length);
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    //preload first couple of chapters
    replaceText(document.getElementById('firstBox'));
    replaceText(document.getElementById('secondBox'));

    loadData();

});

function replaceText(element) {
  element.innerHTML = dataset[displayedPages][0];
  console.log(dataset[displayedPages][0])
  displayedPages++;
}

function createRow() {
  let div = document.createElement('div');
  div.className = 'row gx-4 mb-5 mb-lg-4 justify-content-center';
  return div;
}

function loadData(){

  let flag = true;
  if (displayedPages >= 9) {
    flag = false;
    return false;
  }


	let template = document.getElementById('template');

  div = createRow();

  document.getElementById('items').appendChild(div);

  for (let i = 0; i < 2; i++) {
    if (!flag) {return false;}
    let item = dataset[i];

    let div = document.createElement('div');

  	div.className = 'col-lg-6';
  	div.innerHTML = template.innerHTML.replace('{{title}}', dataset[displayedPages][0]);

  	document.getElementById('items').appendChild(div);

    displayedPages++;
    console.log(displayedPages);
  }



}

function openInNewTab(){
  window.open("../pdfs/essay.pdf");
}
