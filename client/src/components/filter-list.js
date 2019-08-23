import { html, render } from 'lit-html'
import i18next from 'i18next'

import { main } from '../main.js'
import store from '../libs/store.js'

export class FilterList extends HTMLElement {
	constructor() {
		super()
	}
    
	connectedCallback() {
		render(this.render(), this)
	}
    
	clickRequestReport() {
		return {
			handleEvent() {
				const modal = document.querySelector(`modal-request-report`)
				
				if(store.getState().isLogin) {
					modal.show()
					return
				}

				alert(`로그인이 필요합니다. 로그인 페이지로 이동`)
				main.connectLoginNoLoad(`login`)
			},
			capture: false,
		}
	}

	render() {
		return html`
        <h2 class="category-title">Reports</h2>
        <div class="category-desc">
            ${i18next.t(`FILTER_DESC`)}
        </div>
        <h3 class="category-filter-1">
            Report Step
        </h3>
        <ul class="filter-ul">
            <li><input type="checkbox" id="li1" checked/><label for="li1">대기 중</label></li>
			<li><input type="checkbox" id="li2" checked/><label for="li2">분석 중</label></li>
			<li><input type="checkbox" id="li3" checked/><label for="li3">분석 완료</label></li>
        </ul>
        <button class="btn-request-report" @click=${this.clickRequestReport()}>${i18next.t(`BTN_REQUEST_REPORT`)}</button>
        `
	}
}

customElements.define(`filter-list`, FilterList)
