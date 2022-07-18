(()=>{"use strict";var e={359:(e,t,i)=>{i.r(t)},851:(e,t,i)=>{i.r(t)},304:(e,t,i)=>{i.r(t)},96:function(e,t,i){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=a(i(191)),s=a(i(813)),n=a(i(617)),o=a(i(886)),l=i(170);t.default=class{constructor(){this.page=new n.default,this.dataManager=new o.default,this.cart=new r.default,this.filters={country:[],variety:[],season:[],priceRange:[],stockRange:[],favorite:[]},this.filteringData=this.dataManager.getOriginalData(),this.searchInputValue="",this.sorter=this.page.drawSorter(),this.cards=this.page.fillCardContainer(this.filteringData)}start(){this.getLocalStorage(),this.page.drawCartLabel(this.cart.getSize());const[e,t]=this.page.drawSearch();e.value=this.searchInputValue;const i=this.page.drawFilter("country",["India","China","Ceylon"]),a=this.page.drawFilter("variety",["Black","Green","White","Oolong","Puerh"]),r=this.page.drawFilter("season",["Spring","Summer","Fall","Winter"]),n=new s.default("Price",String(this.dataManager.getMinOrMax("price",!0)),String(this.dataManager.getMinOrMax("price",!1)),this.page),o=new s.default("In stock",String(this.dataManager.getMinOrMax("stock",!0)),String(this.dataManager.getMinOrMax("stock",!1)),this.page);n.reset(this.filters,"priceRange"),o.reset(this.filters,"stockRange"),this.filteringData=this.dataManager.applyFiltersToData(this.filters,this.searchInputValue,this.sorter.value),this.cards=this.page.fillCardContainer(this.filteringData);const l=this.page.drawFilter("favorite",["yes"]),c=this.page.drawResetButton("Reset filters","resetFilters"),u=this.page.drawResetButton("Reset all","resetAll");this.addClassesOnFilters("country",i),this.addClassesOnFilters("variety",a),this.addClassesOnFilters("season",r),this.addClassesOnFilters("favorite",l),this.cart.getSize()&&this.cards.filter((e=>this.cart.getItems().includes(e[0].id))).forEach((e=>{e[1].classList.add("in-cart")})),this.addListenerOnCards(this.cards),this.addListenerOnFilters("country",i),this.addListenerOnFilters("variety",a),this.addListenerOnFilters("season",r),this.addListenerOnFilters("favorite",l),e.oninput=()=>{this.searchInputValue=e.value,e.value?t.classList.add("visible"):t.classList.remove("visible"),this.rerenderCards()},t.onclick=()=>{t.classList.remove("visible"),e.value="",e.focus(),this.searchInputValue="",this.rerenderCards()},n.input1.oninput=()=>n.onInput1(),n.input2.oninput=()=>n.onInput2(),n.input1.onmouseup=()=>{n.onMouseup1(this.filters,"priceRange"),this.rerenderCards()},n.input2.onmouseup=()=>{n.onMouseup2(this.filters,"priceRange"),this.rerenderCards()},o.input1.oninput=()=>o.onInput1(),o.input2.oninput=()=>o.onInput2(),o.input1.onmouseup=()=>{o.onMouseup1(this.filters,"stockRange"),this.rerenderCards()},o.input2.onmouseup=()=>{o.onMouseup2(this.filters,"stockRange"),this.rerenderCards()},n.track.onclick=e=>{n.clickOnTrack(e,this.filters,"priceRange"),this.rerenderCards()},o.track.onclick=e=>{o.clickOnTrack(e,this.filters,"stockRange"),this.rerenderCards()},c.onclick=()=>{this.filters={country:[],variety:[],season:[],priceRange:[],stockRange:[],favorite:[]},this.removeClassesFromFilters(i),this.removeClassesFromFilters(a),this.removeClassesFromFilters(r),this.removeClassesFromFilters(l),this.searchInputValue="",e.value="",n.reset(this.filters,"priceRange"),o.reset(this.filters,"stockRange"),this.rerenderCards()},u.onclick=()=>{this.sorter.value="nameAsc",c.click(),this.cart.setItems([]),this.page.drawCartLabel(this.cart.getSize()),this.removeClassesFromCards(this.cards),localStorage.clear()},this.sorter.onchange=()=>{this.rerenderCards()},window.onload=()=>{this.filteringData.length||this.page.cardContainer.classList.add("none"),e.focus()},window.onunload=()=>{this.setLocalStorage()}}setLocalStorage(){localStorage.setItem("cart",JSON.stringify(this.cart.getItems())),localStorage.setItem("filters",JSON.stringify(this.filters)),localStorage.setItem("search",this.searchInputValue),localStorage.setItem("sorter",this.sorter.value)}getLocalStorage(){localStorage.getItem("cart")&&this.cart.setItems(JSON.parse(localStorage.getItem("cart"))),localStorage.getItem("filters")&&(this.filters=JSON.parse(localStorage.getItem("filters"))),localStorage.getItem("search")&&(this.searchInputValue=localStorage.getItem("search")),localStorage.getItem("sorter")&&(this.sorter.value=localStorage.getItem("sorter"))}addListenerOnCards(e){let t;e.forEach((e=>e[1].onclick=()=>{if(this.cart.getItems().includes(e[0].id))this.cart.removeItem(e[0].id),e[1].classList.remove("in-cart"),e[1].classList.remove("exceed-limit"),t&&(t[1].classList.remove("exceed-limit"),t=null);else{if(this.cart.addItem(e[0].id),this.cart.getSize()>l.Limits.maxCartItems)return t=e,e[1].classList.add("exceed-limit"),void this.cart.removeItem(e[0].id);e[1].classList.add("in-cart")}this.page.drawCartLabel(this.cart.getSize())}))}addClassesOnFilters(e,t){t.forEach((t=>{this.filters[e].includes(`${t.textContent}`)&&t.classList.add("selected")}))}removeClassesFromFilters(e){e.forEach((e=>{e.classList.remove("selected")}))}addClassesOnCards(e){e.forEach((e=>{this.cart.getItems().includes(e[0].id)&&e[1].classList.add("in-cart")}))}removeClassesFromCards(e){e.forEach((e=>{e[1].classList.remove("in-cart")}))}addListenerOnFilters(e,t){t.forEach((t=>t.onclick=()=>{this.filters[e].includes(`${t.textContent}`)?(this.filters[e]=this.filters[e].filter((e=>e!==`${t.textContent}`)),t.classList.remove("selected")):(this.filters[e].push(`${t.textContent}`),t.classList.add("selected")),this.rerenderCards()}))}rerenderCards(){this.filteringData=this.dataManager.applyFiltersToData(this.filters,this.searchInputValue,this.sorter.value),this.filteringData.length?(this.page.cardContainer.classList.remove("none"),this.cards=this.page.fillCardContainer(this.filteringData),this.addListenerOnCards(this.cards),this.addClassesOnCards(this.cards)):(this.page.cardContainer.innerHTML="",this.page.cardContainer.classList.add("none"))}}},886:function(e,t,i){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=a(i(301));t.default=class{constructor(){this.originalData=r.default}getOriginalData(){return[...this.originalData]}isItemInData(e,t){return!t.length||t.includes(e)}isStringInData(e,t){return!e||t.toLowerCase().includes(e.toLowerCase())}isInRange(e,t){return e>=parseInt(t[0])&&e<=parseInt(t[1])}applyFiltersToData(e,t,i){return this.originalData.filter((i=>this.isItemInData(i.country,e.country)&&this.isItemInData(i.variety,e.variety)&&this.isItemInData(i.season,e.season)&&this.isInRange(i.price,e.priceRange)&&this.isInRange(i.stock,e.stockRange)&&this.isItemInData(i.favorite,e.favorite)&&this.isStringInData(t,i.title))).sort(((e,t)=>{switch(i){case"nameAsc":return e.title.localeCompare(t.title);case"nameDesc":return t.title.localeCompare(e.title);case"yearAsc":return e.year-t.year;case"yearDesc":return t.year-e.year;case"priceAsc":return e.price-t.price;case"priceDesc":return t.price-e.price;default:return 0}}))}getMinOrMax(e,t){const i=[];return this.originalData.forEach((t=>i.push(t[e]))),t?Math.min(...i):Math.max(...i)}}},813:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0});const a=i(170);t.default=class{constructor(e,t,i,a){this.name=e,this.min=t,this.max=i,this.page=a,[this.input1,this.input2,this.value1,this.value2,this.track]=this.page.drawRangeInput(this.name,Number(this.min),Number(this.max))}onInput1(){parseInt(this.input2.value)-parseInt(this.input1.value)<=a.Limits.minInputFilterGap&&(this.input1.value=String(parseInt(this.input2.value)-a.Limits.minInputFilterGap)),this.value1.textContent=this.input1.value,this.fillColor(this.input1,this.input2,this.track)}onInput2(){parseInt(this.input2.value)-parseInt(this.input1.value)<=a.Limits.minInputFilterGap&&(this.input2.value=String(parseInt(this.input1.value)+a.Limits.minInputFilterGap)),this.value2.textContent=this.input2.value,this.fillColor(this.input1,this.input2,this.track)}onMouseup1(e,t){e[t]=[this.input1.value,this.input2.value]}onMouseup2(e,t){e[t]=[this.input1.value,this.input2.value]}clickOnTrack(e,t,i){const a=Math.round(e.offsetX/this.track.offsetWidth*(parseInt(this.input1.max)-parseInt(this.input1.min))+parseInt(this.input1.min));Math.abs(a-parseInt(this.input1.value))<Math.abs(a-parseInt(this.input2.value))?(this.input1.value=String(a),this.value1.textContent=String(a)):(this.input2.value=String(a),this.value2.textContent=String(a)),this.fillColor(this.input1,this.input2,this.track),t[i]=[this.input1.value,this.input2.value]}reset(e,t){e[t].length?(this.input1.value=e[t][0],this.value1.textContent=e[t][0],this.input2.value=e[t][1],this.value2.textContent=e[t][1]):(e[t]=[this.min,this.max],this.input1.value=this.min,this.value1.textContent=this.min,this.input2.value=this.max,this.value2.textContent=this.max),this.fillColor(this.input1,this.input2,this.track)}fillColor(e,t,i){const a=parseInt(e.value)/parseInt(e.max)*100,r=parseInt(t.value)/parseInt(e.max)*100;i.style.background=`linear-gradient(to right, #dadae5 ${a-2}% , #5fd65f ${a-2}% , #5fd65f ${r-2}%, #dadae5 ${r-2}%)`}}},301:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=[{id:1,title:"Assam Enigma",img:"./img/assam.jpg",country:"India",year:2022,season:"Summer",variety:"Black",stock:12,favorite:"yes",price:9},{id:2,title:"Gold Ceylon",img:"./img/ceylon.jpg",country:"Ceylon",year:2022,season:"Summer",variety:"Black",stock:6,favorite:"no",price:7.5},{id:3,title:"Da Hong Pao",img:"./img/da-hong-pao.jpg",country:"China",year:2021,season:"Fall",variety:"Oolong",stock:5,favorite:"yes",price:17},{id:4,title:"Jin Jun Mei",img:"./img/jin-jun-mei.jpg",country:"China",year:2021,season:"Summer",variety:"Black",stock:8,favorite:"yes",price:16.5},{id:5,title:"Long Jing",img:"./img/long-jing.jpg",country:"China",year:2022,season:"Spring",variety:"Green",stock:18,favorite:"yes",price:28},{id:6,title:"Organic Dargeeling",img:"./img/organic-darjeeling.jpg",country:"India",year:2021,season:"Fall",variety:"Black",stock:13,favorite:"yes",price:21},{id:7,title:"Ripe Puerh",img:"./img/puerh-ripe.jpg",country:"China",year:2015,season:"Fall",variety:"Puerh",stock:7,favorite:"no",price:12},{id:8,title:"Shen Puerh",img:"./img/puerh-shen.jpg",country:"China",year:2012,season:"Winter",variety:"Puerh",stock:2,favorite:"yes",price:39},{id:9,title:"Tai Ping Hou Kui",img:"./img/tai-ping-hou-kui.jpg",country:"China",year:2021,season:"Spring",variety:"Green",stock:12,favorite:"yes",price:19},{id:10,title:"Tie Guan Yin",img:"./img/tie-guan-yin.jpg",country:"China",year:2022,season:"Spring",variety:"Oolong",stock:16,favorite:"yes",price:15},{id:11,title:"Darjeeling - First Flush",img:"./img/darjeeling-first-flush.jpeg",country:"India",year:2022,season:"Spring",variety:"Black",stock:16,favorite:"yes",price:23},{id:12,title:"Bai Hao Yin Zhen",img:"./img/bai-hao-yin-zhen.jpg",country:"China",year:2022,season:"Spring",variety:"White",stock:6,favorite:"yes",price:49},{id:13,title:"Bai Mu Dan",img:"./img/bai-mu-dan.jpg",country:"China",year:2022,season:"Fall",variety:"White",stock:14,favorite:"yes",price:36},{id:14,title:"English Breakfast",img:"./img/english-breakfast.jpg",country:"India",year:2020,season:"Summer",variety:"Black",stock:12,favorite:"no",price:5},{id:15,title:"Ceylon Green Tea",img:"./img/ceylon-green-tea.jpg",country:"Ceylon",year:2021,season:"Spring",variety:"Green",stock:17,favorite:"no",price:16},{id:16,title:"Bi Luo Chun",img:"./img/bi-luo-chun.jpg",country:"China",year:2022,season:"Spring",variety:"Green",stock:12,favorite:"yes",price:21},{id:17,title:"Dian Hong",img:"./img/dian-hong.jpg",country:"China",year:2021,season:"Summer",variety:"Black",stock:17,favorite:"no",price:17},{id:18,title:"Alishan",img:"./img/alishan.jpeg",country:"China",year:2021,season:"Spring",variety:"Oolong",stock:15,favorite:"yes",price:39},{id:19,title:"Shui Xian",img:"./img/shui-xian.jpg",country:"China",year:2021,season:"Summer",variety:"Oolong",stock:7,favorite:"no",price:24},{id:20,title:"Rou Gui",img:"./img/rou-gui.jpeg",country:"China",year:2020,season:"Summer",variety:"Oolong",stock:4,favorite:"no",price:12},{id:21,title:"Shou Mei",img:"./img/shou-mei.jpg",country:"China",year:2021,season:"Fall",variety:"White",stock:1,favorite:"no",price:19}]},170:(e,t)=>{var i;Object.defineProperty(t,"__esModule",{value:!0}),t.Limits=void 0,(i=t.Limits||(t.Limits={}))[i.maxCartItems=20]="maxCartItems",i[i.minInputFilterGap=1]="minInputFilterGap"},488:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.createElement=void 0,t.createElement=function(e,t,i="",a=""){const r=document.createElement(t);return r.className=i,r.textContent=a,e&&e.append(r),r}},607:function(e,t,i){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),(new(a(i(96)).default)).start()},731:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),i(359);const a=i(488);t.default=class{constructor(e){this.data=e}createCard(){const e=(0,a.createElement)(null,"div","card");(0,a.createElement)(e,"h2","card__title",this.data.title);const t=(0,a.createElement)(e,"div","card__container_img"),i=(0,a.createElement)(t,"img","card__image");i.src=this.data.img,i.width=200,i.height=200;const r=(0,a.createElement)(e,"ul","card__list");return(0,a.createElement)(r,"li","card__list_item",`Season: ${this.data.season} ${this.data.year}`),(0,a.createElement)(r,"li","card__list_item",`In stock: ${this.data.stock}`),(0,a.createElement)(r,"li","card__list_item",`Price (100g): $${this.data.price}`),e}}},191:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(){this.items=[]}addItem(e){this.items.push(e)}removeItem(e){this.items=this.items.filter((t=>t!=e))}setItems(e){this.items=e}getItems(){return this.items}getSize(){return this.items.length}}},877:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0}),i(851);const a=i(488);t.default=class{constructor(){const e=(0,a.createElement)(document.body,"footer","footer"),t=(0,a.createElement)(e,"github"),i=(0,a.createElement)(t,"a","github__link");i.href="https://github.com/shevelevbv",i.target="_blank";const r=(0,a.createElement)(i,"img","github__logo footer__logo");r.src="./img/github.svg",r.width=30,r.height=30,(0,a.createElement)(e,"p","copyright","2022");const s=(0,a.createElement)(e,"div","rs-school"),n=(0,a.createElement)(s,"a","github__link");n.href="https://rs.school/js",n.target="_blank";const o=(0,a.createElement)(n,"img","rs-school__logo footer__logo");o.src="./img/rs_school_js.svg",o.alt="RS School Logo",o.width=70,o.height=26}}},617:function(e,t,i){var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),i(304);const r=a(i(731)),s=i(488),n=a(i(877));t.default=class{constructor(){this.header=(0,s.createElement)(document.body,"header","header"),this.main=(0,s.createElement)(document.body,"main","main"),this.cartContainer=(0,s.createElement)(null,"div","cart__container"),this.cartLabel=document.createElement("p"),this.createHeader(),this.filterContainer=(0,s.createElement)(this.main,"div","filter__container"),this.filterElements=(0,s.createElement)(this.filterContainer,"div","filter__elements"),this.resetButtonContainer=(0,s.createElement)(this.filterContainer,"div","filter__buttons_reset"),this.sectionContent=(0,s.createElement)(this.main,"section","section_content"),this.cardContainer=(0,s.createElement)(this.sectionContent,"div","container_cards"),new n.default}createHeader(){const e=(0,s.createElement)(this.header,"div","logo"),t=(0,s.createElement)(e,"div","logo__container_img"),i=(0,s.createElement)(t,"img","logo__image");i.src="./img/leaf.svg",i.width=50,i.height=50,(0,s.createElement)(e,"h1","logo__title","Tea Shop"),this.header.append(this.cartContainer);const a=(0,s.createElement)(this.cartContainer,"img","cart__logo");a.src="./img/cart.svg",a.width=40,a.height=40}drawCartLabel(e){this.cartLabel.className="cart__label",e?(this.cartLabel.classList.add("visible"),this.cartLabel.textContent=`${e}`):this.cartLabel.classList.remove("visible"),this.cartContainer.append(this.cartLabel)}drawFilter(e,t){const i=(0,s.createElement)(this.filterElements,"div",`filter filter_${e}`);(0,s.createElement)(i,"h2","filter__title",e.charAt(0).toUpperCase()+e.slice(1));const a=(0,s.createElement)(i,"div","filter__button_container"),r=[];return t.forEach((t=>{const i=(0,s.createElement)(a,"button",`button filter__button_${e}`,t);r.push(i)})),r}drawRangeInput(e,t,i){const a=(0,s.createElement)(this.filterElements,"div","filter__range_container");(0,s.createElement)(a,"h2","filter__title filter__input_title",e);const r=(0,s.createElement)(a,"div","filter__input_container"),n=(0,s.createElement)(r,"div","filter__input_track"),o=(0,s.createElement)(r,"div","filter__input_values"),l=(0,s.createElement)(r,"input","filter__input filter__input1");l.min=String(t),l.max=String(i),l.type="range",l.value=String(t);const c=(0,s.createElement)(r,"input","filter__input filter__input2");c.min=String(t),c.max=String(i),c.type="range",c.value=String(i),(0,s.createElement)(o,"span","filter__input_text","from");const u=(0,s.createElement)(o,"span","filter__input_value filter__input_value1");u.textContent=l.value,(0,s.createElement)(o,"span","filter__input_text","to");const h=(0,s.createElement)(o,"span","filter__input_value filter__input_value1");return h.textContent=c.value,[l,c,u,h,n]}drawResetButton(e,t){return(0,s.createElement)(this.resetButtonContainer,"button",`filter__button_reset filter__button_${t}`,e)}drawSearch(e=""){const t=(0,s.createElement)(this.filterElements,"div","filter__container_search"),i=(0,s.createElement)(t,"button","filter__button_search","x"),a=(0,s.createElement)(t,"input","filter__input_search");return a.type="text",a.value=e,a.autofocus=!0,a.placeholder="Search",[a,i]}drawSorter(){const e=(0,s.createElement)(null,"div","sorter");this.sectionContent.insertBefore(e,this.cardContainer),(0,s.createElement)(e,"label","sorter__label","Sort by").htmlFor="sorter";const t=(0,s.createElement)(e,"select","sorter__select");return t.id="sorter",(0,s.createElement)(t,"option","sorter__option","name A-Z").value="nameAsc",(0,s.createElement)(t,"option","sorter__option","name Z-A").value="nameDesc",(0,s.createElement)(t,"option","sorter__option","year: earliest first").value="yearAsc",(0,s.createElement)(t,"option","sorter__option","year: latest first").value="yearDesc",(0,s.createElement)(t,"option","sorter__option","price: lowest first").value="priceAsc",(0,s.createElement)(t,"option","sorter__option","price: greatest first").value="priceDesc",t}fillCardContainer(e){this.cardContainer.innerHTML="";const t=[];return e.forEach((e=>{const i=new r.default(e).createCard();this.cardContainer.append(i),t.push([e,i])})),t}}}},t={};function i(a){var r=t[a];if(void 0!==r)return r.exports;var s=t[a]={exports:{}};return e[a].call(s.exports,s,s.exports,i),s.exports}i.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i(607)})();