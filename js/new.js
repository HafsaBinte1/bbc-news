const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories;`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
}

const displayCategories = categories => {
    categories.forEach(categorie => {
        // console.log(categorie)
        const categoriesContainer = document.getElementById('categories-container');
        const li = document.createElement('li');
        creatLi.classList.add('nav-item');
        li.innerHTML = `
        <a onclick="loadNews(${categorie.category_id
            })" class="nav-link active pe-5" aria-current="page" href="#">${categorie.category_name}</a>
        `
        categoriesContainer.appendChild(li);
    })
}

const loadNews = (id) => {
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}
const displayNews = newses => {
    const sortData = newses.sort((a, b) => b.total_view - a.total_view)
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    const foundContainer = document.getElementById('found-container');
    foundContainer.innerText =`${newses.length} News Found`;
    if (newses.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No News Found!',
        })
        toggleSpinner(false);
        newsContainer.innerHTML = '';
        return
    }
    sortData.forEach(news => {
        // console.log(news);

        const creatDiv = document.createElement('div');
        creatDiv.classList.add('row', 'margin');
        creatDiv.innerHTML = `
        <div class="col-md-4">
            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title fs-3">${news.title
            }</h5>
                <p class="card-text details">${news.details}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
            <div class="row row-cols-lg-3 row-cols-md-3 row-cols-sm-3">
                <div>
                    <img src="${news.author.img}" class="rounded-circle author-image mt-3" alt="..."><span class="ms-1 fs-5 ms-3">${news.author.name ? news.author.name : 'No Author Found'}</span>
                </div>
                <div class="mt-4">
                    <iconify-icon icon="akar-icons:eye"></iconify-icon><span>${news.total_view ? news.total_view : 'No views Today'}</span>
                </div>
                <div class="mt-4">
                    <button onclick="loadModal('${news._id}')" type="button" class="btn btn-white text-primary fs-4 fw-bold " data-bs-toggle="modal"        data-bs-target="#exampleModal">
                    >>>
                    </button>
                </div>
            </div>

        </div>
        
        `
        newsContainer.appendChild(creatDiv);
        toggleSpinner(false);
    })
}

const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading === true) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none');
    }
}

const loadModal = (id) => {
    // console.log(id)
    const url =`https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data?.data[0]))
}
const displayModal = news => {
    const displayContainer = document.getElementById('display-container');
    displayContainer.innerHTML = `
    <div class="card p-5 border-primary">
    <img src="${news?.image_url ? news?.image_url : ''}" class="card-img-top" alt="news-img">
    <div class="card-body">
        <h5 class="card-title">${news?.title}</h5>
         <p class="card-text">${news?.details
        }</p>
    </div>
    </div>
    `
}

loadNews(01);

loadCategories();