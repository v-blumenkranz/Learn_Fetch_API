const postList = document.querySelector('.post-list')
const addPostForm = document.querySelector('.add-post-form')
const titleValue = document.querySelector('#title')
const bodyValue = document.querySelector('#body')
let output = ''

const url = 'https://jsonplaceholder.typicode.com/posts'

const renderPosts = (posts) => {
    posts.forEach((post) => {
        output += `    
            <div class="card mt-4 col-md-6 bg-light">
                <div class="card-body" data-id="${post.id}">
                    <h5 class="card-title">${post.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${post.dateTime}</h6>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="card-link" id="post-edit">Edit</a>
                    <a href="#" class="card-link" id="post-delete">Delete</a>
                </div>
            </div>
            `
    })
    postList.innerHTML = output
}

//Get
fetch(url)
    .then((res) => res.json())
    .then((posts) => {
        renderPosts(posts)
    })


postList.addEventListener('click', (e) => {
    let deleteButtonIsPressed = e.target.id == 'post-delete'
    let editButtonIsPressed = e.target.id == 'post-edit'

    let id = e.target.parentElement.dataset.id
    //Delete

    if(deleteButtonIsPressed) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        }).then((res) => res.json())
            .then(() => location.reload())
    }

    if(editButtonIsPressed) {
        const parent = e.target.parentElement
        const titleContent = parent.querySelector('.card-title').textContent
        const bodyContent = parent.querySelector('.card-text').textContent
        titleValue.value = titleContent;
        bodyValue.value = bodyContent;
    }
})

//Create
addPostForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch(url, {
        method: 'POST',
        headers:  {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue.value,
            body: bodyValue.value,
            userId: 1
        })
    }).then((res) => res.json())
        .then((data) => {
            const dataArray = []
            dataArray.push(data)
            renderPosts(dataArray)
        })
})