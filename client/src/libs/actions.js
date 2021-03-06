import store from './store.js'
import { main } from '../main.js'

function actionCreator(action) {
	return function() {
		let state = store.getState()
		state = action(state, ...arguments)
		store.setState(state)
	}
}

export const loadXhr = actionCreator((state, url, callback) => {
	const xhr = new XMLHttpRequest()

	if(!xhr) {
		throw new Error(`xhr 호출 불가`)
	}

	xhr.open(`GET`, url)
	xhr.setRequestHeader(`x-requested-with`, `XMLHttpRequest`)
	xhr.addEventListener(`readystatechange`, () => {
		if (xhr.readyState === xhr.DONE) {				
			if (xhr.status === 200 || xhr.status === 201) {
				callback(xhr.responseText)
			}
		}
	})
	xhr.send()
	return state
})

export const getXhr = url => new Promise((resolve, reject) => {
	const xhr = new XMLHttpRequest()

	if(!xhr) {
		throw new Error(`xhr 호출 불가`)
	}

	xhr.open(`GET`, `https://open-tube-api.kro.kr:32666${url}`)
	xhr.setRequestHeader(`x-requested-with`, `XMLHttpRequest`)
	xhr.addEventListener(`readystatechange`, () => {
		if (xhr.readyState === xhr.DONE) {				
			if (xhr.status === 200 || xhr.status === 201) {
				resolve(xhr.responseText)
			} else {
				reject(new Error(`500 server error`))
			}
		} 
	})
	xhr.send()
})

export const postXhr = (url, data) => new Promise((resolve, reject) => {
	const xhr = new XMLHttpRequest()

	if(!xhr) {
		throw new Error(`xhr 호출 불가`)
	}

	xhr.open(`POST`, `https://open-tube-api.kro.kr:32666${url}`)
	xhr.setRequestHeader(`x-requested-with`, `XMLHttpRequest`)
	xhr.addEventListener(`readystatechange`, () => {
		if (xhr.readyState === xhr.DONE) {				
			if (xhr.status === 200 || xhr.status === 201) {
				resolve(xhr.responseText)
			} else {
				reject(new Error(`500 server error`))
			}
		}
	})
	xhr.send(data)
})

export const xhrFirebase = actionCreator((state, path, callback) => {
	const xhr = new XMLHttpRequest()

	if(!xhr) {
		throw new Error(`xhr 호출 불가`)
	}

	xhr.open(`GET`, `https://us-central1-open-tube-4c423.cloudfunctions.net/server${path}`)
	xhr.setRequestHeader(`x-requested-with`, `XMLHttpRequest`)
	xhr.addEventListener(`readystatechange`, () => {
		if (xhr.readyState === xhr.DONE) {				
			if (xhr.status === 200 || xhr.status === 201) {
				callback(xhr.responseText)
			}
		}
	})
	xhr.send()
	return state
})

export const xhrCorsServer = path => new Promise(resolve => {
	const xhr = new XMLHttpRequest()

	if(!xhr) {
		throw new Error(`xhr 호출 불가`)
	}

	xhr.open(`GET`, `https://cors-server-v01.herokuapp.com/${path}`)
	xhr.setRequestHeader(`x-requested-with`, `XMLHttpRequest`)
	xhr.addEventListener(`readystatechange`, () => {
		if (xhr.readyState === xhr.DONE) {				
			if (xhr.status === 200 || xhr.status === 201) {
				resolve(xhr.responseText)
			}
		}
	})
	xhr.send()
})

export const logout = actionCreator(state => {
	firebase.auth().signOut().then(() => {
		state.isLogin = false
		store.setState(state)
		alert(`로그인이 필요합니다. 로그인 페이지로 이동`)
		main.renderPage(`page-login`, `/`)
	}).catch(error => {
		console.error(error)
	})

	return state
})

export const messageShow = actionCreator((state, meessage) => {
	const modal = document.createElement(`modal-message`)
	modal.message = meessage
	document.body.appendChild(modal)

	return state
})
