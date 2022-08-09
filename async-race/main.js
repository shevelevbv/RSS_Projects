(()=>{"use strict";var t=function(t,e,n,r){return new(n||(n=Promise))((function(a,o){function i(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,s)}c((r=r.apply(t,e||[])).next())}))},e=function(t,e){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!((a=(a=i.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=e.call(t,i)}catch(t){o=[6,t],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},n=function(){function n(){var r=this;this.getCars=function(n,a){return t(r,void 0,void 0,(function(){var t,r;return e(this,(function(e){switch(e.label){case 0:return[4,fetch("".concat(this.garageURL,"?_page=").concat(n,"&_limit=").concat(a))];case 1:return t=e.sent(),r={},[4,t.json()];case 2:return[2,(r.cars=e.sent(),r.total=Number(t.headers.get("X-Total-Count")),r)]}}))}))},this.getCar=function(n){return t(r,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,fetch("".concat(this.garageURL,"/").concat(n))];case 1:return[2,t.sent().json()]}}))}))},this.createCar=function(a){return t(r,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,fetch(this.garageURL,{method:n.HTTPMethods.post,body:JSON.stringify(a),headers:{"Content-Type":"application/json"}})];case 1:return t.sent(),[2]}}))}))},this.removeCar=function(a){return t(r,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,fetch("".concat(this.garageURL,"/").concat(a),{method:n.HTTPMethods.delete})];case 1:return t.sent(),[2]}}))}))},this.updateCar=function(n,a){return t(r,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,fetch("".concat(this.garageURL,"/").concat(n),{method:"PUT",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}})];case 1:return t.sent(),[2]}}))}))},this.makeCars=function(){for(var t=[],e=0;e<n.numCarsToGenerate;e+=1){for(var a=r.models[Math.floor(Math.random()*r.models.length)],o=r.makes[Math.floor(Math.random()*r.makes.length)],i="0123456789ABCDEF",s="#",c=0;c<6;c+=1)s+=i[Math.floor(Math.random()*i.length)];t.push({name:"".concat(a," ").concat(o),color:s})}return t},this.generateCars=function(){return t(r,void 0,void 0,(function(){var n=this;return e(this,(function(r){return Promise.all(this.makeCars().map((function(r){return t(n,void 0,void 0,(function(){return e(this,(function(t){return[2,this.createCar(r)]}))}))}))),[2]}))}))},this.startEngine=function(a){return t(r,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,fetch("".concat(this.engineURL,"?id=").concat(a,"&status=").concat(n.engineStatuses.started),{method:n.HTTPMethods.patch})];case 1:return[2,t.sent().json()]}}))}))},this.stopEngine=function(a){return t(r,void 0,void 0,(function(){return e(this,(function(t){switch(t.label){case 0:return[4,fetch("".concat(this.engineURL,"?id=").concat(a,"&status=").concat(n.engineStatuses.stopped),{method:n.HTTPMethods.patch})];case 1:return[2,t.sent().json()]}}))}))},this.moveCar=function(a){return t(r,void 0,void 0,(function(){var t;return e(this,(function(e){switch(e.label){case 0:return[4,fetch("".concat(this.engineURL,"?id=").concat(a,"&status=").concat(n.engineStatuses.drive),{method:n.HTTPMethods.patch}).catch()];case 1:return[2,(t=e.sent()).status===n.statusSuccess?t.json():{success:!1}]}}))}))},this.serverURL="http://127.0.0.1:3000/",this.garageURL="".concat(this.serverURL,"garage"),this.engineURL="".concat(this.serverURL,"engine"),this.models=["Volvo","Chevrolet","Jaguar","Peugeot","Renault","Mustang","Fiat","Kia","Volkswagen","Nissan"],this.makes=["Rio","F","Logan","Passat","Lacetti","XC60","GT","Panda","Beetle","308"]}return n.numCarsToGenerate=100,n.engineStatuses={started:"started",drive:"drive",stopped:"stopped"},n.HTTPMethods={get:"GET",post:"POST",put:"PUT",patch:"PATCH",delete:"DELETE"},n.statusSuccess=200,n}();const r=n;const a=function(t){var e=this;this.updateState=function(t){return n=e,r=void 0,o=function(){return function(t,e){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!((a=(a=i.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=e.call(t,i)}catch(t){o=[6,t],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}(this,(function(e){switch(e.label){case 0:return[4,this.cars=t];case 1:return e.sent(),[2]}}))},new((a=void 0)||(a=Promise))((function(t,e){function i(t){try{c(o.next(t))}catch(t){e(t)}}function s(t){try{c(o.throw(t))}catch(t){e(t)}}function c(e){var n;e.done?t(e.value):(n=e.value,n instanceof a?n:new a((function(t){t(n)}))).then(i,s)}c((o=o.apply(n,r||[])).next())}));var n,r,a,o},this.cars=t};function o(t,e,n,r){void 0===n&&(n=""),void 0===r&&(r="");var a=document.createElement(e);return a.className=n,a.textContent=r,t&&t.append(a),a}const i=function(t){var e=this;this.renderCar=function(t){var n=o(null,"div","car__icon_container");o(n,"div","car__inner-layer"),n.id="car_".concat(t);var r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("class","icon car__icon"),r.style.fill=e.carObject.color;var a=document.createElementNS("http://www.w3.org/2000/svg","use");return a.setAttributeNS("http://www.w3.org/1999/xlink","href","./img/sprite.svg#car"),r.append(a),n.append(r),n},this.carObject=t};const s=function(){function t(){var e=this;this.renderGarage=function(n,r){e.garageContainer.innerHTML="",n.append(e.garageContainer),o(e.garageContainer,"div","create-tools_container").append(e.createCarTextInput,e.createCarColorInput,e.createCarButton);var a=o(e.garageContainer,"div","update-tools_container");e.updateCarTextInput.disabled=!0,e.updateCarColorInput.disabled=!0,e.updateCarButton.disabled=!0,a.append(e.updateCarTextInput,e.updateCarColorInput,e.updateCarButton),e.createCarTextInput.type="text",e.updateCarTextInput.type="text",e.createCarColorInput.type="color",e.updateCarColorInput.type="color",o(e.garageContainer,"h2","title__total","Garage (".concat(r,")")),o(e.garageContainer,"h3","title__page","Page #".concat(e.pageCount)),o(e.garageContainer,"div","action_button_container").append(e.raceButton,e.resetButton,e.generateButton);var i=1===e.pageCount;e.backButton.disabled=!!i,r<=t.carsPerPage*e.pageCount?e.nextButton.disabled=!0:e.nextButton.disabled=!1,e.garageContainer.append(e.carControlsContainer),o(e.garageContainer,"div","nav-buttons_container").append(e.backButton,e.nextButton)},this.renderCarContainers=function(t){return n=e,r=void 0,o=function(){var e=this;return function(t,e){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!((a=(a=i.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=e.call(t,i)}catch(t){o=[6,t],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}}(this,(function(n){switch(n.label){case 0:return this.carControlsContainer.innerHTML="",[4,t];case 1:return n.sent().cars.forEach((function(t){return e.renderCarContainer(t)})),[2]}}))},new((a=void 0)||(a=Promise))((function(t,e){function i(t){try{c(o.next(t))}catch(t){e(t)}}function s(t){try{c(o.throw(t))}catch(t){e(t)}}function c(e){var n;e.done?t(e.value):(n=e.value,n instanceof a?n:new a((function(t){t(n)}))).then(i,s)}c((o=o.apply(n,r||[])).next())}));var n,r,a,o},this.renderCarContainer=function(t){var n=o(e.carControlsContainer,"div","container"),r=o(n,"div","car__controls");o(r,"button","car__button_select","SELECT").id="button_select_".concat(t.id),o(r,"button","car__button_remove","REMOVE").id="button_remove_".concat(t.id),o(r,"span","car__span_name",t.name);var a=o(n,"div","car__track_container");o(a,"button","button button_engine button_start","A").id="button_start_".concat(t.id);var s=o(a,"button","button button_engine button_stop","B");s.id="button_stop_".concat(t.id),s.disabled=!0;var c=o(a,"div","car__track");c.append(new i(t).renderCar(t.id));var u=o(c,"div","flag__icon_container");u.id="flag_".concat(t.id),o(u,"img","flag__icon").src="./img/checkerboard.svg"},this.garageContainer=o(null,"div","garage-container"),this.createCarTextInput=o(null,"input","input__text"),this.createCarColorInput=o(null,"input","input__color"),this.createCarButton=o(null,"button","button button_create","CREATE"),this.updateCarTextInput=o(null,"input","input__text"),this.updateCarColorInput=o(null,"input","input__color"),this.carControlsContainer=o(null,"div","car__objects_container"),this.updateCarButton=o(null,"button","button","UPDATE"),this.raceButton=o(null,"button","button","RACE"),this.resetButton=o(null,"button","button","RESET"),this.generateButton=o(null,"button","button button_generate","GENERATE CARS"),this.backButton=o(null,"button","button button_back","BACK"),this.nextButton=o(null,"button","button button_next","NEXT"),this.pageCount=1}return t.carsPerPage=7,t}(),c=function(){},u=function(){var t=this;this.renderHeader=function(){o(document.body,"header","header").append(t.toGarageButton,t.toWinnersButton)},this.renderMain=function(){document.body.append(t.main)},this.resetMain=function(){t.main.innerHTML=""},this.toGarageButton=o(null,"button","button header__button","TO GARAGE"),this.toWinnersButton=o(null,"button","button header__button","TO WINNERS"),this.main=o(null,"main","main")};var l=function(t,e,n,r){return new(n||(n=Promise))((function(a,o){function i(t){try{c(r.next(t))}catch(t){o(t)}}function s(t){try{c(r.throw(t))}catch(t){o(t)}}function c(t){var e;t.done?a(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(i,s)}c((r=r.apply(t,e||[])).next())}))},d=function(t,e){var n,r,a,o,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(o){return function(s){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;i;)try{if(n=1,r&&(a=2&o[0]?r.return:o[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;switch(r=0,a&&(o=[2&o[0],a.value]),o[0]){case 0:case 1:a=o;break;case 4:return i.label++,{value:o[1],done:!1};case 5:i.label++,r=o[1],o=[0];continue;case 7:o=i.ops.pop(),i.trys.pop();continue;default:if(!((a=(a=i.trys).length>0&&a[a.length-1])||6!==o[0]&&2!==o[0])){i=0;continue}if(3===o[0]&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(6===o[0]&&i.label<a[1]){i.label=a[1],a=o;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(o);break}a[2]&&i.ops.pop(),i.trys.pop();continue}o=e.call(t,i)}catch(t){o=[6,t],r=0}finally{n=a=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,s])}}},h=function(){function t(){var e=this;this.startApp=function(){e.page.renderHeader(),e.page.renderMain(),e.selectView(),window.onload=function(){return alert("Привет, уважаемый проверяющий!\nЕсли есть возможность, проверь, пожалуйста, в среду или в четверг")}},this.selectView=function(){e.page.toGarageButton.addEventListener("click",e.showGarage),e.page.toWinnersButton.addEventListener("click",e.showWinners),e.addListeners(),e.operateInGarage()},this.operateInGarage=function(){e.renderUpdatedCars()},this.showGarage=function(){e.garage.garageContainer.style.display="block"},this.showWinners=function(){e.garage.garageContainer.style.display="none"},this.addListeners=function(){e.garage.createCarButton.addEventListener("click",e.createCar),e.garage.updateCarButton.addEventListener("click",e.updateCar),e.page.main.addEventListener("click",e.handleEventsOnMain)},this.handleEventsOnMain=function(t){return l(e,void 0,void 0,(function(){var e,n;return d(this,(function(r){return(e=t.target).classList.contains("car__button_select")?this.selectCar(t):e.classList.contains("car__button_remove")?this.removeCar(t):e.classList.contains("button_next")?(this.garage.pageCount+=1,this.renderUpdatedCars()):e.classList.contains("button_back")?(this.garage.pageCount-=1,this.renderUpdatedCars()):e.classList.contains("button_generate")?(this.connector.generateCars(),this.renderUpdatedCars()):e.classList.contains("button_start")?(n=Number(e.id.split("button_start_")[1]),this.start(n)):e.classList.contains("button_stop")&&(n=Number(e.id.split("button_stop_")[1]),this.stop(n)),[2]}))}))},this.selectCar=function(t){return l(e,void 0,void 0,(function(){var e;return d(this,(function(n){switch(n.label){case 0:return this.carId=Number(t.target.id.split("button_select_")[1]),[4,this.connector.getCar(this.carId)];case 1:return e=n.sent(),this.garage.updateCarTextInput.value=e.name,this.garage.updateCarColorInput.value=e.color,this.garage.updateCarTextInput.disabled=!1,this.garage.updateCarColorInput.disabled=!1,this.garage.updateCarButton.disabled=!1,[2]}}))}))},this.createCar=function(){return l(e,void 0,void 0,(function(){var t;return d(this,(function(e){switch(e.label){case 0:return t={name:this.garage.createCarTextInput.value,color:this.garage.createCarColorInput.value},[4,this.connector.createCar(t)];case 1:return e.sent(),this.renderUpdatedCars(),[2]}}))}))},this.updateCar=function(){return l(e,void 0,void 0,(function(){var t;return d(this,(function(e){switch(e.label){case 0:return t={name:this.garage.updateCarTextInput.value,color:this.garage.updateCarColorInput.value},[4,this.connector.updateCar(this.carId,t)];case 1:return e.sent(),[4,this.renderUpdatedCars()];case 2:return e.sent(),this.garage.updateCarTextInput.disabled=!0,this.garage.updateCarColorInput.disabled=!0,this.garage.updateCarTextInput.value="",this.garage.updateCarColorInput.value="#000000",this.garage.updateCarButton.disabled=!0,[2]}}))}))},this.removeCar=function(t){return l(e,void 0,void 0,(function(){var e;return d(this,(function(n){switch(n.label){case 0:return e=Number(t.target.id.split("button_remove_")[1]),[4,this.connector.removeCar(e)];case 1:return n.sent(),this.renderUpdatedCars(),[2]}}))}))},this.renderUpdatedCars=function(){return l(e,void 0,void 0,(function(){var t;return d(this,(function(e){switch(e.label){case 0:return[4,this.state.updateState(this.connector.getCars(this.garage.pageCount,s.carsPerPage))];case 1:return e.sent(),[4,this.state.cars];case 2:return t=e.sent().total,this.garage.renderGarage(this.page.main,t),[4,this.garage.renderCarContainers(this.state.cars)];case 3:return e.sent(),[2]}}))}))},this.start=function(n){return l(e,void 0,void 0,(function(){var e,r,a,o,i,s,c,u,l,h;return d(this,(function(d){switch(d.label){case 0:return e=document.getElementById("button_start_".concat(n)),r=document.getElementById("button_stop_".concat(n)),e.disabled=!0,r.disabled=!1,[4,this.connector.startEngine(n)];case 1:return a=d.sent(),o=a.velocity,i=a.distance,s=Math.round(i/o),c=document.getElementById("car_".concat(n)),u=document.getElementById("flag_".concat(n)),l=t.getDistanceBetweenElements(c,u),this.animationID=t.animate(c,l,s),[4,this.connector.moveCar(n)];case 2:return(h=d.sent().success)||window.cancelAnimationFrame(this.animationID.id),[2,{success:h,id:n,time:s}]}}))}))},this.stop=function(t){return l(e,void 0,void 0,(function(){var e,n,r;return d(this,(function(a){switch(a.label){case 0:return e=document.getElementById("car_".concat(t)),n=document.getElementById("button_start_".concat(t)),r=document.getElementById("button_stop_".concat(t)),n.disabled=!1,r.disabled=!0,[4,this.connector.stopEngine(t)];case 1:return a.sent(),e.style.transform="translateX(0)",this.animationID&&window.cancelAnimationFrame(this.animationID.id),[2]}}))}))},this.page=new u,this.connector=new r,this.garage=new s,this.state=new a(this.connector.getCars(this.garage.pageCount,s.carsPerPage)),this.winners=new c,this.carId=0,this.animationID={id:0}}return t.animate=function(t,e,n){var r=t,a=0,o={id:0},i=function(t){a||(a=t);var s=t-a,c=Math.round(s/n*e);r.style.transform="translateX(".concat(Math.min(c,e),"px)"),c<e&&(o.id=window.requestAnimationFrame(i))};return o.id=window.requestAnimationFrame(i),o},t.getPositionAtCenter=function(t){var e=t.getBoundingClientRect(),n=e.top;return{x:e.left+e.width/2,y:n+e.height/2}},t.getDistanceBetweenElements=function(e,n){var r=t.getPositionAtCenter(e),a=t.getPositionAtCenter(n);return Math.hypot(r.x-a.x,r.y-a.y)},t}();(new h).startApp()})();