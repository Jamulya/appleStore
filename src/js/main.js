let url = 'http://localhost:3000/products'

let overlay = document.querySelector('.overlay')
let addBtn = document.querySelector('.add-btn')
let formClose = document.querySelector('.form__close')
let productsRow = document.querySelector('.products__row')
let form = document.querySelector('.form')
let seeAll = document.querySelector('.products__see')




addBtn.addEventListener('click', function () {
    overlay.style.display = 'block'
    form.style.display = 'flex'
})

formClose.addEventListener('click', function () {
    overlay.style.display = 'none'
    form.style.display = 'none'

})

overlay.addEventListener('click', function (e) {
    if (e.target.className.includes('overlay')) {
        overlay.style.display = 'none'
        form.style.display = 'node'

    }
})


//products__row
const getProducts = (all) => {
    productsRow.innerHTML = ''
    fetch(url + `${all ? '' : '?_limit=4' }`)
    .then((res) => res.json())
    .then((res) =>{
        res.forEach((item) => {
            productsRow.innerHTML += `
            <div class="products__card">
            <img src="${item.image}" alt="" class="products__card-img">
            <h3 class="products__card-title">
                ${item.title}
            </h3>
            <p class="products__card-price">
                $${item.price}
            </p>
            <div class="products__card-btns">
                <button class="products__card-btn">
                    Buy
                </button>
                <button class="products__card-btn">
                    Change
                </button>
                <button data-id = "${item.id}" type = 'button' class="products__card-btn products__card-delete">
                    Delete
                </button>
            </div>

        </div>
            `
        })
        

        //функция delete
        let deleteBtns = document.querySelectorAll('.products__card-delete')
        Array.from(deleteBtns).forEach((btn) => {
            btn.addEventListener('click', () => {
                fetch(url + `/${btn.dataset.id}`, {
                    method: 'DELETE'
                }).then(() => {
                    getProducts()
                }).catch(() => alert('Ошибка при удалении'))
            })
        })


    } ).catch((err) => alert(err))

}
getProducts()


//form
form.addEventListener('submit', (e) => {
    e.preventDefault()

//получение из база данных
    let product = {
        title: e.target[0].value,
        price: e.target[1].value,
        memory: e.target[2].value,
        image: e.target[3].value
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(product)
    }).then(() => {
        e.target[0].value = ''
        e.target[1].value = ''
        e.target[2].value = ''
        e.target[3].value = ''
        overlay.style.display = 'none'

        getProducts()
    })
    .catch(() => alert('Ошибка при добавлении'))
})

//seeAll
seeAll.addEventListener('click', () => {
    // console.log(seeAll.children);
    // seeAll.children[0].textContent = 'Hide All'
    if(seeAll.children[0].textContent === 'See All'){
        getProducts('all')
        seeAll.children[0].textContent ='Hide All'
    }else{
        seeAll.children[0].textContent = 'See All'
        getProducts()
    }
})


