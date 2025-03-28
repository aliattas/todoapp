const thingsClass = document.querySelector('.things') ;
const addElments = document.querySelector('.add') ;
const detils = document.getElementsByTagName('textarea')[0] ;
const tag  = document.getElementById('adite');
const deleteOp = document.getElementsByClassName('deleteop')[0];
const cancelDelete = document.querySelector('#cancelDelete');  
const deleteFromAll = document.querySelector('#deletefromall');
const data = document.getElementsByClassName('cards')[0];
const input = document.querySelector('.search > input')
const createObj = (tag, details, compalte) => {
    return {tag, details, compalte
}
}
console.log("cards is "   , document.querySelector(".cards "))
const cardsToDelete = new Set(); 
let work = false;

document.getElementById('add').onclick = () => {
    thingsClass.classList.add('none');
    addElments.classList.remove('none');
    data.style.display="none"
};

document.getElementById('save').onclick = () => {
    saveData();
};

document.getElementById('cancel').onclick = () => {
    cancel();
};

function cancel(){
    thingsClass.classList.remove('none');
    addElments.classList.add('none');
    data.style.display="grid"
};

data.addEventListener('click', (e) => {
    if (!work || e.target.className != 'card') return

    if (cardsToDelete.has(String(e.target.dataset.num))) {
        e.target.style.backgroundColor = 'var(--secondColor)'
        cardsToDelete.delete(String(e.target.dataset.num))
        return
    }
    e.target.style.backgroundColor = 'red'
    cardsToDelete.add(String(e.target.dataset.num))
});

function addInHtml(){
if(localStorage.length === 0)return 
    const end = JSON.parse(localStorage['data']).map((e, i) => {
        return (
        `<div class='card' data-num=${i} draggable = true> 
        <p class='down'>${e.tag}</p>
        <p class='details'>${e.details}</p>
        <div class='option'>
          <button id='showthecard' data-num=${i}  >show</button>
        <button id='deleteCard' data-num=${i} > delete</button>
        </div>
      
        </div>`
        );
    });
    data.innerHTML = end.join(' ');
};
function DeleteSelectCards() {
    const data  = JSON.parse(localStorage['data']).filter(( _ , n) => !(cardsToDelete.has(String(n))))
    localStorage['data'] = JSON.stringify(data);
    cancelDelete.click();
};

function saveData() {

    if(tag.value === ''){
            alert('you must write something  !')
            return 
    };
    
    if (localStorage.length === 0) {
        localStorage.setItem('data' , JSON.stringify([]));
    };
    
    const newData = JSON.parse(localStorage['data']);
      newData.push(createObj(tag.value, detils.value , false));
      localStorage.setItem('data'  , JSON.stringify(newData));
      addInHtml();
      cancel();
};

document.addEventListener('click', e => {
    if (e.target.id === 'showthecard') showCard(e.target.dataset['num']);
    else if (e.target.className === 'showBox') {
        thingsClass.classList.remove('none');
        data.classList.remove('none');

        document.getElementsByClassName('showBox')[0].remove()
    }
    else if (e.target.id == "deleteCard") deleteCard(e.target.dataset["num"])
});
    
    function showCard(index){
        const target = JSON.parse(localStorage['data'])[index];
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');

        div.classList.add('showBox')
        h3.innerText = target.tag;
        p.textContent = target.details;   
        div.appendChild(h3);
        div.appendChild(p);
        document.getElementsByClassName('todocont')[0].append(div);
       
        thingsClass.classList.add('none');
        data.classList.add('none');
        deleteOp.classList.add('none');
};
    
function deleteCard(index) {
    const localData = JSON.parse(localStorage.data)
    let newdata = localData.filter((e, i) => i != index)
    newdata = JSON.stringify(newdata)
    localStorage.setItem("data" , newdata)
    addInHtml();

    
}

function searchFromAll() {
    
    const value = input.value.toLowerCase();
    console.log(value)

    Array.from(data.children).forEach(e => {
        e.style.display = 'block';
        if (value == '') return
        if (!e.innerText.toLowerCase().includes(value)) e.style.display = 'none';

    }); 
};

addInHtml();
document.getElementById("searchButton").addEventListener("click", e => searchFromAll(e))
input.addEventListener("change" , e => searchFromAll( ))

document.addEventListener("DOMContentLoaded", () => {
    const cardsContainer = document.querySelector(".cards");
    
    let draggedItem = null;

    document.addEventListener("dragstart", (event) => {
        if (event.target.classList.contains("card")) {
            draggedItem = event.target;
            event.target.style.opacity = "0.5"; 
        };
    });

    document.addEventListener("dragend", (event) => {
        if (draggedItem) {
            draggedItem.style.opacity = "1"; // Restore opacity
            draggedItem = null;
        };
    });

    cardsContainer.addEventListener("dragover", (event) => {
        event.preventDefault(); // Allows dropping
    });

    cardsContainer.addEventListener("drop", (event) => {
        event.preventDefault();
        if (draggedItem) {
            cardsContainer.appendChild(draggedItem); // Move the card to the new position

        };
    });
});

