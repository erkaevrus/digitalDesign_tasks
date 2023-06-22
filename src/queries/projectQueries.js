

window.onload = function () {
  document.addEventListener('click', (e) => {
    let clicked = e.target

    //POST
    if (clicked.classList.contains('post-axios')) {
      createProjectAxios()
    }
    if (clicked.classList.contains('post-xml')) {
      createProjectXML()
    }
    if (clicked.classList.contains('post-fetch')) {
      createProjectFetch()
    }
    //PUT
    if (clicked.classList.contains('put-axios')) {
      changeProjectAxios()
    }
    if (clicked.classList.contains('put-xml')) {
      changeProjectXML()
    }
    if (clicked.classList.contains('put-fetch')) {
      changeProjectFetch()
    }
    //GET
    if (clicked.classList.contains('get-axios')) {
      getProjectAxios()
    }
    if (clicked.classList.contains('get-xml')) {
      getProjectXML()
    }
    if (clicked.classList.contains('get-fetch')) {
      getProjectFetch()
    }

    //DELETE
    if (clicked.classList.contains('delete-axios')) {
      deleteProjectAxios()
    }
    if (clicked.classList.contains('delete-xml')) {
      deleteProjectXML()
    }
    if (clicked.classList.contains('delete-fetch')) {
      deleteProjectFetch()
    }
  })
}

// ---ПОЛУЧЕНИЕ ТОКЕНА---

const authData = {
  "login": "erkaev.r",
  "password": "jc63fk"
}
const BASE_URL = 'http://45.12.239.156:8081/api'

async function getToken(data) {
  try {
    const response = await axios.post(BASE_URL+'/login', data)
    const token = response.data.token
    return token
  
  } catch (error) {
    console.log(error);
  }
}

const token = await getToken(authData)
const projectStorage = [] //стэк для хранение id проекта в рамках одной сессии

//Создание - POST
async function createProjectAxios() {
  const data = {
    "name": "ПРОЕКТ-1",
    "code": "11"
  }
  const headers = { 'authorization': `Bearer ${token}` };
  try {
    const response = await axios.post(BASE_URL + '/projects', data, {headers})
    console.log(response)
    projectStorage.push(response.data._id)
  } catch (error) {
    console.log(error);
  }
}

const createProjectXML = () => {
  const data = {
    "name": "ПРОЕКТ-2",
    "code": "22"
  }
  let json = JSON.stringify(data)
  const xhr = new XMLHttpRequest()
  xhr.open('POST', BASE_URL + '/projects')
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8')
  xhr.setRequestHeader('authorization', `Bearer ${token}`)
  xhr.onload = () => {
    if (xhr.status >= 400) {
        console.log('error', xhr.response)  
    } else {
        console.log(JSON.parse(xhr.response))
        projectStorage.push(JSON.parse(xhr.response)._id)
    }
  }
  xhr.send(json)
}

async function createProjectFetch() {
  const data = {
    "name": "ПРОЕКТ-3",
    "code": "33"
  }
  try {
    let response = await fetch(BASE_URL + '/projects', {
      method: 'POST',
      headers: { 
      'authorization': `Bearer ${token}`,
      'Content-type': 'application/json' 
      },
      body: JSON.stringify(data)
    })
    let result = await response.json()
    console.log(result)
    projectStorage.push(result._id)
  } catch (error) {
    console.log(error)
  }
}


//Изменение - PUT
async function changeProjectAxios() {
  const data = {
    "_id": `${projectStorage[projectStorage.length - 1]}`,
    "name": "ПРОЕКТ-0",
    "code": "00"
  }
  const headers = { 'authorization': `Bearer ${token}` };
  try {
    const response = await axios.put(BASE_URL + '/projects', data, {headers})
    console.log(response)
  } catch (error) {
    console.log(error);
  }
}

const changeProjectXML = () => {
  const data = {
    "_id": `${projectStorage[projectStorage.length - 1]}`,
    "name": "ПРОЕКТ1",
    "code": "0000"
  }
  let json = JSON.stringify(data)
  const xhr = new XMLHttpRequest()
  xhr.open('PUT', BASE_URL + '/projects')
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

async function changeProjectFetch() {
  const data = {
    "_id": `${projectStorage[projectStorage.length - 1]}`,
    "name": "ПРОЕКТ1",
    "code": "0000"
  }
  try {
    let response = await fetch(BASE_URL + '/projects', {
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
async function getProjectAxios() {
  const headers = { 'authorization': `Bearer ${token}` };
  try {
    const response = await axios.get(BASE_URL + `/projects/${projectStorage[projectStorage.length - 1]}`, {headers})
    console.log(response)
  } catch (error) {
    console.log(error);
  }
}

const getProjectXML = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', BASE_URL + `/projects/${projectStorage[projectStorage.length - 1]}`)
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

async function getProjectFetch() {
  try {
    let response = await fetch(BASE_URL + `/projects/${projectStorage[projectStorage.length - 1]}`, {
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
async function deleteProjectAxios() {
  const headers = { 'authorization': `Bearer ${token}` };
  try {
    const response = await axios.delete(BASE_URL + `/projects/${projectStorage.pop()}`, {headers})
    console.log(response)
  } catch (error) {
    console.log(error);
  }
}

const deleteProjectXML = () => {
  const xhr = new XMLHttpRequest()
  xhr.open('DELETE', BASE_URL + `/projects/${projectStorage.pop()}`)
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

async function deleteProjectFetch() {
  try {
    let response = await fetch(BASE_URL + `/projects/${projectStorage.pop()}`, {
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

export { getToken, createProjectAxios }




