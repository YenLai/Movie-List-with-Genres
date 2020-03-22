(function (){
    const BASE_URL = 'https://movie-list.alphacamp.io'
    const INDEX_URL = BASE_URL + '/api/v1/movies/'
    const POSTER_URL = BASE_URL + '/posters/'
    const data = []
    const movieList = document.getElementById('movie-list')
    const moviePanel = document.getElementById('movie-panel')


    axios.get(INDEX_URL).then((response) => {
        data.push(...response.data.results)
        console.log(data)
        DisplayCategory()
    }).catch((err) => console.log(err))
    
    const category = {
        "1": "Action",
        "2": "Adventure",
        "3": "Animation",
        "4": "Comedy",
        "5": "Crime",
        "6": "Documentary",
        "7": "Drama",
        "8": "Family",
        "9": "Fantasy",
        "10": "History",
        "11": "Horror",
        "12": "Music",
        "13": "Mystery",
        "14": "Romance",
        "15": "Science Fiction",
        "16": "TV Movie",
        "17": "Thriller",
        "18": "War",
        "19": "Western"
    }
    
    function DisplayCategory(){
        const arr = Object.values(category)
        let htmlContent = ``
        for(let i=0;i<arr.length;i++){
            htmlContent += `
              <li class="nav-item">
                <a class="nav-link" href="#" data-toggle="pill" data-id="${i+1}">${arr[i]}</a>  
              </li>
              `
        }
        movieList.innerHTML = htmlContent
    }

    movieList.addEventListener('click', (event)=>{
        let id = event.target.dataset.id
        let results = []
    
        data.forEach(movie => {
            if(movie.genres.includes(Number(id)))
                results.push(movie)
        })
        console.log(results)
        DisplayMovie(results)
    })



    function DisplayMovie(data){
        let htmlContent = `<div class=" row">`
        for( let movie of data){
            htmlContent += `
            <div class="card mr-2 mb-2" style="width: 14rem;">
                <img src="${POSTER_URL}${movie.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h6 class="card-title">${movie.title}</h6>
                    <div id="movie-tag">`
            for(let tag of movie.genres){
                htmlContent += `
                <span class="badge badge-secondary">${category[tag]}</span>
                `
            }
            htmlContent +=
                   ` </div>
                </div>
            </div>
            `
        }
        htmlContent += `</div>`

        moviePanel.innerHTML = htmlContent
    }

})()