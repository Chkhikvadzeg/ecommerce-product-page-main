document.querySelector('.menu-button').addEventListener('click', () => {
    document.querySelector('.header__nav').classList.add('active');
    document.querySelector('.bg-black').classList.add('active');
    document.body.style.overflow = 'hidden';
})

document.querySelector('.close-menu').addEventListener('click', () => {
    document.querySelector('.header__nav').classList.remove('active');
    document.querySelector('.bg-black').classList.remove('active');
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
})

const secondaryPhotos = document.querySelectorAll('.secondary-photos-img-container');
secondaryPhotos.forEach(photo => photo.addEventListener('click', () => {
    secondaryPhotos.forEach(secondaryPhoto => secondaryPhoto.classList.remove('active'));
    photo.classList.add('active');
    let number = photo.children[0].src.split('-')[5];
    if(!document.querySelector('.bigger-photos').classList.contains('active')) {
        document.querySelector('.main-photo > img').src = `./images/image-product-${number}.jpg`;
    }else {
        document.querySelector('.bigger-photos').querySelector('.main-photo > img').src = `./images/image-product-${number}.jpg`;
    }
}))

const cartButton = document.querySelector('.cart-button');
cartButton.addEventListener('click', () => {
    cartButton.parentElement.classList.toggle('active');
})

document.querySelectorAll('.main-photo')[0].addEventListener('click', () => {
    if(document.body.clientWidth > 1024){
        document.querySelector('.bg-black').classList.add('active');
        document.querySelector('.bigger-photos').classList.add('active');
        secondaryPhotos.forEach(secondaryPhoto => secondaryPhoto.classList.remove('active'));
        let number = parseInt(document.querySelector('.main-photo > img').src.split('-')[2]) - 1;
        document.querySelector('.bigger-photos').querySelector('.main-photo > img').src = document.querySelector('.main-photo > img').src;
        document.querySelector('.bigger-photos')?.querySelectorAll('.secondary-photos-img-container')[number].classList.add('active');
    }
})

document.querySelector('.close-bigger-photos').addEventListener('click', () => {
    document.querySelector('.bg-black').classList.remove('active');
    document.querySelector('.bigger-photos').classList.remove('active');
    const biggerPhotoSrc = document.querySelector('.bigger-photos > .main-photo > img').src;
    document.querySelector('.main-photo > img').src = biggerPhotoSrc;
    let number = parseInt(biggerPhotoSrc.split('-')[5]) - 1;
    document.querySelectorAll('.main__photos .secondary-photos-img-container')[number].classList.add('active');
})

document.querySelector('.arrow-bigger-left').addEventListener('click', () => {
    let number = parseInt(document.querySelector('.bigger-photos > .main-photo > img').src.split('-')[5]) - 1;
    let currentSecondaryNumber = parseInt(document.querySelector('.bigger-photos > .main-photo > img').src.split('-')[5]) - 2;
    if(number == 0) {
        number = document.querySelectorAll('.bigger-photos .secondary-photos-img-container').length ;
    }
    if(currentSecondaryNumber < 0){
        currentSecondaryNumber = document.querySelectorAll('.bigger-photos .secondary-photos-img-container').length - 1;
    }
    document.querySelector('.bigger-photos > .main-photo > img').src = `./images/image-product-${number}.jpg`;
    document.querySelectorAll('.bigger-photos .secondary-photos-img-container').forEach(secondaryPhoto => secondaryPhoto.classList.remove('active'));
    let currentSecondaryPhoto = document.querySelectorAll('.bigger-photos .secondary-photos-img-container')[currentSecondaryNumber];
    currentSecondaryPhoto.classList.add('active');
})

document.querySelector('.arrow-bigger-right').addEventListener('click', () => {
    let number = parseInt(document.querySelector('.bigger-photos > .main-photo > img').src.split('-')[5]) + 1;
    if(number > document.querySelectorAll('.bigger-photos .secondary-photos-img-container').length){
        number = 1;
    }
    document.querySelector('.bigger-photos > .main-photo > img').src = `./images/image-product-${number}.jpg`;
    document.querySelectorAll('.bigger-photos .secondary-photos-img-container').forEach(secondaryPhoto => secondaryPhoto.classList.remove('active'));
    let currentSecondaryPhoto = document.querySelectorAll('.bigger-photos .secondary-photos-img-container')[number - 1];
    currentSecondaryPhoto.classList.add('active');
})

document.querySelector('.arrow-left').addEventListener('click', () => {
    let number = parseInt(document.querySelector('.main-photo > img').src.split('-')[5]) - 1;
    if(number == 0) {
        number = document.querySelectorAll('.main__photos .secondary-photos-img-container').length ;
    }
    document.querySelector('.main-photo > img').src = `./images/image-product-${number}.jpg`;
    document.querySelectorAll('.main__photos .secondary-photos-img-container').forEach(secondaryPhoto => secondaryPhoto.classList.remove('active'));
    let currentSecondaryPhoto = document.querySelectorAll('.main__photos .secondary-photos-img-container')[number - 1];
    currentSecondaryPhoto.classList.add('active');
})

document.querySelector('.arrow-right').addEventListener('click', () => {
    let number = parseInt(document.querySelector('.main-photo > img').src.split('-')[5]) + 1;
    if(number > document.querySelectorAll('.main__photos .secondary-photos-img-container').length){
        number = 1;
    }
    document.querySelector('.main-photo > img').src = `./images/image-product-${number}.jpg`;
    document.querySelectorAll('.main__photos .secondary-photos-img-container').forEach(secondaryPhoto => secondaryPhoto.classList.remove('active'));
    let currentSecondaryPhoto = document.querySelectorAll('.main__photos .secondary-photos-img-container')[number - 1];
    currentSecondaryPhoto.classList.add('active');
})

const plusButton = document.querySelector('.plus');
const minusButton = document.querySelector('.minus');
const quantity = document.querySelector('.quantity');
plusButton.addEventListener('click', () => {
    quantity.value = parseInt(quantity.value) + 1;
})

minusButton.addEventListener('click', () => {
    if(quantity.value > 0){
        quantity.value = parseInt(quantity.value) - 1;
    }
})


const sneakersQuantity = document.querySelector('.cart__items-content-quantity');
const totalPrice = document.querySelector('.total-price');
const addToCartButton = document.querySelector('.add-to-cart-button');
addToCartButton.addEventListener('click', () => {
    if(quantity.value > 0){
        document.querySelector('.cart__items-none').style.display = 'none'
        document.querySelector('.cart__items-content').style.display = 'flex'
        sneakersQuantity.innerHTML = parseInt(sneakersQuantity.innerHTML) + parseInt(quantity.value);
        totalPrice.innerHTML = `$${+document.querySelector('.total-price').innerHTML.split('$')[1] + parseInt(quantity.value) * +document.querySelector('.product__info-price-new').innerHTML.split('$')[1]}.00`;
        cartButton.setAttribute('data-count', sneakersQuantity.innerHTML);
        cartButton.classList.add('active');
        quantity.value = 0;
    }
})

const removeItemsButton = document.querySelector('.remove-items');
removeItemsButton.addEventListener('click', () => {
    sneakersQuantity.innerHTML = 0;
    totalPrice.innerHTML = '$0.00';
    document.querySelector('.cart__items-content').style.display = 'none';
    document.querySelector('.cart__items-none').style.display = 'block';
    cartButton.classList.remove('active');
    cartButton.setAttribute('data-count', 0);
})

document.querySelector('.bg-black').addEventListener("click", function (e) {
    let biggerPhotos = document.querySelector('.bigger-photos');
    biggerPhotos.classList.remove("active");
    document.querySelector(".header__nav").classList.remove("active");
    document.querySelector(".bg-black").classList.remove("active");
});
