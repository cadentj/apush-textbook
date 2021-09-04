/*!
* Start Bootstrap - Grayscale v7.0.3 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
//


let displayedPages = 0;
let rowCounter = 0;

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

    loadData("one");
    loadData("nine");

});

function replaceText(element) {
  element.innerHTML = dataset[displayedPages][0];
  console.log(dataset[displayedPages][0])
  displayedPages++;
}

function createRow() {
  let div = document.createElement('div');
  div.className = 'row row-refrence gx-4 mb-5 mb-lg-4 justify-content-center';
  return div;
}


function loadData(value){

	let template = document.getElementById('template');

  let div = createRow();


  let innerColumn = createPagesTemplate(value, template);
  div.appendChild(innerColumn);


  if (displayedPages % 2 ==1) {
    document.getElementsByClassName("row-refrence")[rowCounter].appendChild(innerColumn);
    rowCounter++;
  } else {
    document.getElementById('items').appendChild(div);
  }


  displayedPages++;


}

function createNewData(value) {
  for (let i = 0; i < dataset.length; i++) {
    if (dataset[i][0] === value) {
      loadData(value);
    }
  }
}

function createPagesTemplate(whichPages, template) {

  let innerDiv = document.createElement('div');

  for (let i = 0; i < dataset.length; i++) {
    let title = dataset[i][0];

    if (title === whichPages) {
      innerDiv.className = 'col-lg-6 remove-column';
      innerDiv.innerHTML = template.innerHTML.replace('{{title}}', title);
      break;
    }
  }
  console.log(whichPages);

  return innerDiv;
}

function searchValue() {
  let value = document.getElementById('textInput').value;
  clearPage();
  createNewData(value);

}


function clearPage() {
  let rows = document.getElementsByClassName('row-refrence');
  for (let i = 0; i < rows.length; i++) {
    rows[i].remove();
  }
  displayedPages = 0;
}

function resetPages() {
  let columns = document.getElementsByClassName('remove-column');

  for (let i = 0; i < dataset.length; i++) {
    columns[i].style.display = 'block';
  }
}


let input = document.getElementById("textInput");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchButton").click();
  }
});
