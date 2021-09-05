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

    initialLoad();

});

function initialLoad() {
  for (let i = 0; i < 4; i++) {
    loadData(dataset[i][0]);
  }
}

function parseToPageNumber(value) {
  for (let i = 0; i < dataset.length; i++) {
    let title = dataset[i][0];
    if (value === title) {
      let dashLocation = title.search("-");
      let firstPage = title.substring(0, dashLocation);
      let lastPage = title.substring(dashLocation + 1, title.length);
      let pageArray = [parseInt(firstPage), parseInt(lastPage)];
      console.log(pageArray);
      return pageArray;
    }
  }

}

function createRow() {
  let div = document.createElement('div');
  div.className = 'row row-refrence gx-4 mb-2 mb-lg-4 justify-content-center';
  return div;
}


function loadMore() {
  for (let i = 0; i < 2; i++) {
    loadData(dataset[displayedPages][0].toLowerCase());
  }
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
    if (dataset[i][0].toLowerCase() === value) {
      loadData(value);
    }
  }
}

function createPagesTemplate(whichPages, template) {
  console.log("yay");
  let innerDiv = document.createElement('div');

  for (let i = 0; i < dataset.length; i++) {
    let title = dataset[i][0];
    let pdf = dataset[i][1];
    let drive = dataset[i][2];
    let image = dataset[i][3];


    if (title.toLowerCase() === whichPages.toLowerCase()) {
      innerDiv.className = 'col-lg-6 remove-column';
      innerDiv.innerHTML = template.innerHTML.replace('{{title}}', title).replace('{{image-location}}', image).replace('{{pdf-link}}', pdf).replace('{{drive-link}}', drive);

      break;
    }
  }

  return innerDiv;
}

function searchValue() {
  let value = document.getElementById('textInput').value;
  let intValue = parseInt(value);
  clearPage();


  if (isNaN(intValue)) {
    if (!searchTerms(value)) {
      createNewData(value.toLowerCase());
    } else {
      createNewData(searchTerms(value).toLowerCase());
    }
  } else {
    for (let i = 0; i < dataset.length; i++) {
      let title = dataset[i][0];
      let bounds = parseToPageNumber(title);
      if (intValue <= bounds[1] && intValue >= bounds[0]) {
        createNewData(title);
      }
    }
  }


}

function searchTerms(value) {
  for (let i = 0; i < dataset.length; i++) {
    let terms = dataset[i][4];
    for (let j = 0; j < terms.length; j++) {
      if (terms[j].toLowerCase() === value) {
        return dataset[i][0];
      }
    }
  }
  return false;
}


function clearPage() {
  let rows = document.getElementsByClassName('row-refrence');
  let x = rows.length;
  for (let i = 0; i < x; i++) {
    rows[0].remove();
  }
  displayedPages = 0;
  rowCounter = 0;
}

//remake this
function resetPages() {
  clearPage();
  console.log(displayedPages);
  initialLoad();
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
