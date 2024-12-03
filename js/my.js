           //****ТАЙМЕР */
const x = document.querySelectorAll(".container table");
// console.log(x)
let h = document.getElementById("h");
let m = document.getElementById("m");
let s = document.getElementById("s");

setInterval(tic,1000);

function tic(params) {
    let d = new Date();
    let hours = 23 - d.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    let min = 59 - d.getMinutes();
    if (min < 10) {
        min = "0" + min
    }
    let sec = 59 - d.getSeconds();
    if (sec < 10) {
        sec = "0" + sec
    }
    h.innerHTML = hours+":";
    m.innerHTML = min+":";
    s.innerHTML = sec+"";
}

let form = document.forms.calculator;

form.money.oninput = calculater;
form.mounths.onchange = calculater;
form.interest.oninput = calculater;

function calculater(params) {
    let initial = form.money.value;
    let interest = form.interest.value *0.01;
    let years = form.mounths.value / 12;
    let result = Math.round(initial * (1 + interest) ** years);
    let height = result / initial * 100 + 'px';

    document.getElementById("money-before").innerHTML = form.money.value;
    document.getElementById("money-after").innerHTML = result;   
    document.getElementById("height-after").style.height = height;
}
calculater();

// *********** ВСЕ КАРТОЧКИ********
const chosEl = document.querySelectorAll(".content-block > div");
// console.log(chosEl);
//***ПЕРЕМЕННАЯ ДЛЯ СЧЁТЧИКА */
const counterEl = document.querySelector(".choes-block span");
// ***ПЕРЕМЕННАЯ ДЛЯ СЧЁТЧИКА СУММЫ
const totalEl = document.querySelector("#total");

// ПОЛУЧЕНИЕ ЗНАЧЕНИЙ ДЛЯ СЧЁТЧИКА
const choseState = {
    countElements:0,
    setCountElements(value) {
    this.countElements += value;
    counterEl.innerText = this.countElements;
}
}
// ПОЛУЧЕНИЕ ЗНАЧЕНИЙ ДЛЯ СЧЁТЧИКА СУММЫ
const totalState = {
    totalElements:0,
    setTotalElenents(value) {
    totalState.totalElements += value;
    totalEl.innerText = this.totalElements;
    }
}
const evenFun = (e) => {
    if (e.target.className === "") {
        e.target.className = "choes-element";
        //СОБЫТИЕ ДЛЯ СЧЁТЧИКА +
        choseState.setCountElements(1);
        //СОБЫТИЕ ДЛЯ СЧЁТЧИКА СУММЫ +
        totalState.setTotalElenents(+e.target.innerText);
    }
    else {
        e.target.className = "";
        //СОБЫТИЕ ДЛЯ СЧЁТЧИКА -
        choseState.setCountElements(-1);
        //СОБЫТИЕ ДЛЯ СЧЁТЧИКА СУММЫ -
        totalState.setTotalElenents(-e.target.innerText);
    }
};

for (let i=0; i < chosEl.length; i++)
//***ВКЛЮЧЕНИЕ ФУНКЦИИ "КЛИК"
  chosEl[i].addEventListener('click', evenFun);
//***ОТКЛЮЧЕНИЕ ФУНКЦИИ "КЛИК"
  chosEl[2].removeEventListener("click", evenFun); 


// *****КАЛЬКУЛЯТОР ВИЗИТОК******

let typePaper = {
    "Выберите бумагу": 0,
    "Мелованная бумага": 6.8,
    "Бумага повышенной белизны": 40.5,
    "Prestige Лён": 45,
};
let typeColor = {
    "Выберите цветность": { file: 0, print: 0 },
    "Односторонняя чёрно-белая": { file: 110, print: 14 },
    "Двусторонняя чёрно-белая": { file: 220, print: 28 },
    "Односторонняя цветная": { file: 110, print: 37 },
    "Лицевая - цветная, оборотная - ч/б": { file: 220, print: 51 },
    "Двусторонняя цветная": { file: 220, print: 74 },
};

function insertOptions(list, parent) {
    let html = "";
    for (type in list) {
        html += '<option value="' + type + '">' + type + "</option>";
    }
    getById(parent).innerHTML = html;
}


function calculate() {
    let tirSize = getById("card-quantity").value / 30;
    let pricePaper = typePaper[getById("card-paper").value] * tirSize;
    let colorForm = getById("card-color").value;
    let priceForm = typeColor[colorForm]["file"];
    let pricePrint = typeColor[colorForm]["print"] * tirSize;

    let sum = priceForm + pricePaper + pricePrint;
    getById("final-price").textContent = sum;

}

getById("card-color").addEventListener('change', function () {
    let selectedValue = this.selectedIndex;

    document.querySelectorAll('img[id^="card-"]').forEach(function (image) {
        image.style.display = "none";
    });

    if (selectedValue > 0) {
        getById('card-' + selectedValue).style.display = 'block';
    }
});

getById("calc").addEventListener('change', function () {
    calculate();
});

document.addEventListener("DOMContentLoaded", function () {
    insertOptions(typePaper, "card-paper");
    insertOptions(typeColor, "card-color");
});

function getById(id) {
    return document.getElementById(id);
}

                  //*****ПОСТЫ****

const postsBlock = document.querySelector(".posts-block-container")
// const postsTitle = document.querySelector(".posts-block-container h3")
// const postsBody = document.querySelector(".posts-block-container span")
//***КНОПКА ВЫЗОВА ПОСТОВ */
const btn = document.querySelector(".posts-block button")
btn.onclick = addPosts;
// const btnr = document.querySelector(".posts-block a")
// btnr.onclick = clearPosts;
// ФУНКЦИЯ ПРОЧТЕНИЯ ДАННЫХ
function addPosts(){
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then((data) => {
        for (el of data)
            addPost(el.title, el.body)
            
        console.log(data)
    })
    .catch((error) => console.log(error.message))
}
// function clearPosts() {
//     fetch("https://jsonplaceholder.typicode.com/posts")
//         .then(res => res.json())
//         .then((data) => {
//             for (el of data)
//                 clearPosts(0, 0)

//             console.log(data)
//         })
//         .catch((error) => console.log(error.message))
// }
     function addPost(title, body){
         const postTitle = document.createElement("h3")
         const postBody = document.createElement("span")
         const postItem = document.createElement("p")
        
         postTitle.innerText = title
         postBody.innerText = body
         postItem.append(postTitle, postBody) 
         postsBlock.append(postItem) 
     }

    //  ФУНКЦИЯ СОЗДАНИЯ ПОСТА
function createPost(title, body, userId){
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title,
        body,
        userId,
    }),
    headers: {'Content-type': 'application/json; charset=UTF-8',},
})
    .then((response) => {
        console.log(response);
        return response.json();}
        )
    .then((json) => console.log(json))
}
createPost("WWW", "RRR", 13)





// function updatePost(title, body) {
//     const postTitle = document.updateElement("h3")
//     const postBody = document.updateElement("span")
//     const postItem = document.updateElement("p")
//     postTitle.innerText = title
//     postBody.innerText = body
//     postItem.append(postTitle, postBody)
//     postsBlock.append(postItem)
// }
 // fetch("https://jsonplaceholder.typicode.com/posts")
//     .then(res => res.json())
//     .then((data)=> {
//         for(el of data)
//         addPost(el.title, el.body)
//          console.log(data)
//      })
//      .catch(error=>console.log(error.message))






// let form = document.forms.vclc;

// form.card_quantity.oninput = total;
// form.card_paper.onchange = total;
// form.card_color.onchange = total;

// function total(params) {
//     let card_quantity = form.card_quantity.value*200;
//     let card_paper = form.card_paper.value;
//     let card_color = form.card_color.value;
    
//     let result = Math.round(card_quantity+card_paper+card_color)
//     document.getElementById("final_price").innerHTML = result;
// }
// total();
// function total() {
//     let tirSize,
//         pricePaper = 0,
//         priceForma = 0,
//         pricePrint = 0,
//         sum = 0,
//         color_format = "";
//     let typePaper = {
//         "Выберите бумагу": 0,
//         "Мелованная бумага": 6.8,
//         "Бумага повышенной белизны": 40.5,
//         "Prestige Лён": 45
//     };
//     let typeColor = {
//         "Выберите цветность": { file: 0, print: 0 },
//         "Односторонняя чёрно-белая": { file: 110, print: 14 },
//         "Двусторонняя чёрно-белая": { file: 220, print: 28 },
//         "Односторонняя цветная": { file: 110, print: 37 },
//         "Лицевая - цветная, оборотная - ч/б": { file: 220, print: 51 },
//         "Двусторонняя цветная": { file: 220, print: 74 }
//     };
//     insertPaper();
//     function insertPaper(params) {
//         let html = "";
//         for (type in typePaper)
//             html += '<option value ="' + type + '">' + type + "</option>";
//         $("#card-paper").append(html);
//     }
//     insertColor();
//     function insertColor(params) {
//         let html = "";
//         for (color in typeColor)
//             html += '<option value ="' + color + '">' + color + "</option>";
//         $("#card-color").append(html);
//     }

//     (".vclc").change(function () {
//         tirSize = $("#card-quantity").val() / 30;
//         // alert(tirSize);
//         pricePaper = typePaper[$("#card-paper").val()] * tirSize;
//         old_color_format = color_format;
//         color_format = $("#card-color").val();
//         priceForma = typeColor[color_format]["file"];
//         pricePrint = typeColor[color_format]["print"] * tirSize;
//         sum = pricePaper + priceForma + pricePrint;
//         ("#final_price").text(sum);
//         if (color_format != old_color_format) {
//             ("img").hide();
//             if (color_format == "Односторонняя чёрно-белая")
//                 $("#card_1_0").show("slow");
//             if (color_format == "Двусторонняя чёрно-белая")
//                 $("#card_1_1").show("slow");
//             if (color_format == "Односторонняя цветная")
//                 $("#card_4_0").show("slow");
//             if (color_format == "Лицевая - цветная, оборотная - ч/б")
//                 $("#card_4_1").show("slow");
//             if (color_format == "Двусторонняя цветная")
//                 $("#card_4_4").show("slow");
//         }
//     })


// };