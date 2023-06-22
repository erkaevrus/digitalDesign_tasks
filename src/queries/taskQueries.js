

window.onload = function () {
  document.addEventListener('click', (e) => {
    let clicked = e.target
    //POST
    if (clicked.classList.contains('post-axios')) {
      createTaskAxios()
    }
    if (clicked.classList.contains('post-xml')) {
      createTaskXML()
    }
    if (clicked.classList.contains('post-fetch')) {
      createTaskFetch()
    }
    //PUT
    if (clicked.classList.contains('put-axios')) {
      changeTaskAxios()
    }
    if (clicked.classList.contains('put-xml')) {
      changeTaskXML()
    }
    if (clicked.classList.contains('put-fetch')) {
      changeTaskFetch()
    }
    //GET
    if (clicked.classList.contains('get-axios')) {
      getTaskAxios()
    }
    if (clicked.classList.contains('get-xml')) {
      getTaskXML()
    }
    if (clicked.classList.contains('get-fetch')) {
      getTaskFetch()
    }

    //DELETE
    if (clicked.classList.contains('delete-axios')) {
      deleteTaskAxios()
    }
    if (clicked.classList.contains('delete-xml')) {
      deleteTaskXML()
    }
    if (clicked.classList.contains('delete-fetch')) {
      deleteTaskFetch()
    }
  })
}

// ---ПОЛУЧЕНИЕ ТОКЕНА---

const authData = {
  "login": "erkaev.r",
  "password": "jc63fk"
}
const BASE_URL = 'http://45.12.239.156:8081/api'
const token = await getToken(authData)

async function getToken(data) {
  try {
    const response = await axios.post(BASE_URL+'/login', data)
    const token = response.data.token
    return token
  
  } catch (error) {
    console.log(error);
  }
}


// ---СОЗДАНИЕ ПРОЕКТА ДЛЯ РАБОТЫ---

let projectId = '' //id проекта для работы с задачами

async function createProjectAxios() {
  const data = {
    "name": "ПРОЕКТ-1",
    "code": "11"
  }
  const headers = { 'authorization': `Bearer ${token}` };
  try {
    const response = await axios.post(BASE_URL + '/projects', data, {headers})
    projectId += response.data._id
  } catch (error) {
    console.log(error);
  }
}
createProjectAxios()


const tasksStorage = [] //стэк для хранение id задач в рамках одной сессии
//Создание - POST
async function createTaskAxios() {
  const data = {
    "name": "ЗАДАЧА-1",
    "description": "ВАЖНАЯ ЗАДАЧА-1",
    "projectId": `${projectId}`
  }
  const headers = { 'authorization': `Bearer ${token}` };
  try {
    const response = await axios.post(BASE_URL + '/tasks', data, {headers})
    console.log(response)
    tasksStorage.push(response.data._id)
  } catch (error) {
    console.log(error);
  }
}

const createTaskXML = () => {
  const data = {
    "name": "ЗАДАЧА-1",
    "description": "ВАЖНАЯ ЗАДАЧА-1",
    "projectId": `${projectId}`
  }
  let json = JSON.stringify(data)
  const xhr = new XMLHttpRequest()
  xhr.open('POST', BASE_URL + '/tasks')
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
  xhr.setRequestHeader('authorization', `Bearer ${token}`)
  xhr.onload = () => {
    if (xhr.status >= 400) {
        console.log('error', xhr.response)  
    } else {
        console.log(JSON.parse(xhr.response))
        tasksStorage.push(JSON.parse(xhr.response)._id)
    }
  }
  xhr.send(json)
}

async function createTaskFetch() {
  const data = {
    "name": "ЗАДАЧА-1",
    "description": "ВАЖНАЯ ЗАДАЧА-1",
    "projectId": `${projectId}`
  }
  try {
    let response = await fetch(BASE_URL + '/tasks', {
      method: 'POST',
      headers: { 
      'authorization': `Bearer ${token}`,
      'Content-type': 'application/json' 
      },
      body: JSON.stringify(data)
    })
    let result = await response.json()
    console.log(result)
    tasksStorage.push(result._id)
  } catch (error) {
    console.log(error)
  }
}


//Изменение - PUT
async function changeTaskAxios() {
  const data = {
    "_id": `${tasksStorage[tasksStorage.length - 1]}`,
    "name": "ЗАДАЧА-0000",
  }
  const headers = { 'authorization': `Bearer ${token}` };
  try {
    const response = await axios.put(BASE_URL + '/tasks', data, {headers})
    console.log(response)
  } catch (error) {
    console.log(error);
  }
}

const changeTaskXML = () => {
  const data = {
    "_id": `${tasksStorage[tasksStorage.length - 1]}`,
    "name": "ЗАДАЧА-0000",
  }
  let json = JSON.stringify(data)
  const xhr = new XMLHttpRequest()
  xhr.open('PUT', BASE_URL + '/tasks')
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
  xhr.setRequestHeader('authorization', `Bearer ${token}`)
  xhr.onload = () => {
    if (xhr.status >= 400) {
        console.log('error', xhr.response)
    } else {
        console.log(JSON.parse(xhr.response))
    }
  }
  xhr.send(json)
}

async function changeTaskFetch() {
  const data = {
    "_id": `${tasksStorage[tasksStorage.length - 1]}`,
    "name": "ЗАДАЧА-0000",
  }
  try {
    let response = await fetch(BASE_URL + '/tasks', {
      method: 'PUT',
      headers: { 
      'authorization': `Bearer ${token}`,
      'Content-type': 'application/json' 
      },
      body: JSON.stringify(data)
    })
    let result = await response.json()
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}


//Вывод - GET
async function getTaskAxios() {
  const headers = { 'authorization': `Bearer ${token}` };
  try {
    const response = await axios.get(BASE_URL + `/tasks/${tasksStorage[tasksStorage.length - 1]}`, {headers})
    console.log(response)
  } catch (error) {
    console.log(error);
  }
}

const getTaskXML = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', BASE_URL + `/tasks/${tasksStorage[tasksStorage.length - 1]}`)
  xhr.setRequestHeader('authorization', `Bearer ${token}`)
  xhr.onload = () => {
    if (xhr.status >= 400) {
        console.log('error', xhr.response)
    } else {
        console.log(JSON.parse(xhr.response))
    }
  }
  xhr.send()
}

async function getTaskFetch() {
  try {
    let response = await fetch(BASE_URL + `/tasks/${tasksStorage[tasksStorage.length - 1]}`, {
      method: 'GET',
      headers: { 
      'authorization': `Bearer ${token}`,
      },
    })
    let result = await response.json()
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}


//Удаление - DELETE
async function deleteTaskAxios() {
  const headers = { 'authorization': `Bearer ${token}` };
  try {
    const response = await axios.delete(BASE_URL + `/tasks/${tasksStorage.pop()}`, {headers})
    console.log(response)
  } catch (error) {
    console.log(error);
  }
}

const deleteTaskXML = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('DELETE', BASE_URL + `/tasks/${tasksStorage.pop()}`)
  xhr.setRequestHeader('authorization', `Bearer ${token}`)
  xhr.onload = () => {
    if (xhr.status >= 400) {
        console.log('error', xhr.response)
    } else {
        console.log(JSON.parse(xhr.response))
    }
  }
  xhr.send()
}

async function deleteTaskFetch() {
  try {
    let response = await fetch(BASE_URL + `/tasks/${tasksStorage.pop()}`, {
      method: 'DELETE',
      headers: { 
      'authorization': `Bearer ${token}`,
      },
    })
    let result = await response.json()
    console.log(result)
  } catch (error) {
    console.log(error)
  } 
}