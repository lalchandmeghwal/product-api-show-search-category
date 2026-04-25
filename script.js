

const cart = document.querySelector('.card-grid');
const form = document.querySelector('form');
const asideLi = document.querySelector('aside ul');

let categoriesSlug = '';

// show data
const getData = async (api) => {

    try {

        const response = await fetch(api);
        const data = await response.json();
        const products = data.products;


        let list = '';

        products.forEach(({ title, description, price, thumbnail }) => {


            list += `<div class="card">
            <img class="card-image" src="${thumbnail ?? ''}" alt="Wireless Headphones">
                <h3>${title ?? "No title"}</h3>
                <p>${description ?? ''}</p>
                <span class="price">$${price}</span>
        </div>`;
        });



        if (products.length === 0) {
            const search = api.split('=')[1];
            cart.innerHTML = `<h2>No products found for ${search}</h2>`;;
            return;
        };

        cart.innerHTML = list;


    } catch (err) {
        cart.innerHTML = '<h2>Something went wrong.Please try again.</h2>';
    }

};

getData('https://dummyjson.com/products');


// search data
form.addEventListener('submit', e => {
    e.preventDefault();
    const search = e.target.search.value;

    getData(`https://dummyjson.com/products/search?q=${search}`);
    categoriesSlug = '';
    showCategories();

    form.reset();

});



// show categories

const showCategories = async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const categories = await response.json();
    // style = "background: ${categoriesSlug === slug ? '#ccc' :""} ;"
    let list = '';
    categories.forEach(({ name, slug }) => {
        list += `<li api-url="${slug}" class="${categoriesSlug === slug ? 'active' : ""}"  >${name}</li>`;
    });
    asideLi.innerHTML = list;
};

showCategories();


// search categories

asideLi.addEventListener('click', e => {
    if (e.target.tagName == 'LI') {
        categoriesSlug = e.target.getAttribute('api-url');



        showCategories();

        getData(`https://dummyjson.com/products/category/${categoriesSlug}`);

    };
});



// next data
const nextBtn = document.querySelector('.next-button');
const prevBtn = document.querySelector('.prev-button');
const p = document.querySelector('.pagination-controls p');


let skip = 0;
const limit = 30;
let page = 1;


nextBtn.addEventListener('click', () => {
    if (page < 7) {
        page++;
        skip += limit;

        p.innerHTML = `Page ${page} of 7`;
        getData(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);

        categoriesSlug = '';
        showCategories();

        prevBtn.classList.add('active');

    } else {

        nextBtn.classList.add('notActive');
    }


})



prevBtn.addEventListener('click', () => {


    if (page > 1) {
        page--;
        skip -= limit;

        p.innerHTML = `Page ${page} of 7`;
        getData(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
        categoriesSlug = '';
        showCategories();

        nextBtn.classList.remove('notActive');

    } else {

        nextBtn.classList.remove('notActive');
        prevBtn.classList.remove('active');
    }


})



// Header menu show

const nav = document.querySelector('header .nav');
const close = document.querySelector('header .nav .xmark');

const ul = document.querySelector('header .nav ul');



document.querySelector('.headerMenu').addEventListener('click', e => {
    nav.style.left = 0;
});

const closeMenu = () => {
     nav.style.left ='-1000px';
}

close.addEventListener('click', closeMenu);
nav.addEventListener('click', closeMenu);

ul.addEventListener('click', e=>e.stopPropagation())




const categoriesMenu = document.querySelector('.categoriesMenu');
const sidebarBox = document.querySelector('.sidebar-box');
const closeCategory = document.querySelector('#closeCategory');

categoriesMenu.addEventListener('click', () => {
    sidebarBox.style.left = 0;
});

closeCategory.addEventListener('click', () => {
    sidebarBox.style.left = "-300px";
});



