const thingsClass = document.querySelector('.things') ;
const addElments = document.querySelector('.add') ;
const detils = document.getElementsByTagName('textarea')[0] ;
const tag  = document.getElementById('adite');
const deleteOp = document.getElementsByClassName('deleteop')[0];
const cansleDelete = document.querySelector('#cansleDelete');  
const deleteFromAll = document.querySelector('#deletefromall');
const data = document.getElementsByClassName('cards')[0];

const cardsToDelete = new Set(); 
let work = false;

document.getElementById('add').onclick = () => {
    thingsClass.classList.add('none');
    addElments.classList.remove('none');
};

document.getElementById('save').onclick = () => {
    saveData();
}

document.getElementById('cansle').onclick = () => {
    cansle();
}

function cansle(){
    thingsClass.classList.remove('none');
    addElments.classList.add('none');
}

data.addEventListener('click' , (e) => {
    if(!work || e.target.className != 'card')return 

    if(cardsToDelete.has(String(e.target.dataset.num))){
        e.target.style.backgroundColor = 'var(--secondColor)'
        cardsToDelete.delete(String(e.target.dataset.num))
        return
    }
    e.target.style.backgroundColor = 'red'
    cardsToDelete.add(String(e.target.dataset.num))
})

function addInHtml(){
if(localStorage.length === 0)return 
  const end = JSON.parse(localStorage['data']).map((e , i) => {
      return (
        `<div class='card' data-num=${i} draggable = 'true'> 
        <p class='down'>${e.tag}</p>
        <p>${e.detils}</p>
        <button id='showthecard' data-num=${i}  >show</button>
        </div>`
      )
    })
    data.innerHTML = end.join(' ');
}

document.getElementById('delete').onclick = () => {
    work = true;
    thingsClass.classList.add('none');
    deleteOp.classList.remove('none');
}

cansleDelete.onclick = () => {
    work = false;
    const calss = cansleDelete.dataset.data;
    document.querySelector('.' + calss ).classList.add('none');
    thingsClass.classList.remove('none');
    addInHtml();
}

deleteFromAll.onclick  = () => DeleteSelectCards();

function DeleteSelectCards() {
    const data  = JSON.parse(localStorage['data']).filter(( _ , n) => !(cardsToDelete.has(String(n))))
    localStorage['data'] = JSON.stringify(data);
    cansleDelete.click();
}

function saveData(){
    if(tag.value ==''){
            alert('you must write something in the subject !')
            return 
    }
    
    const obj = {
        'tag' : tag.value , 
        'detils' : detils.value , 
        'compalte' : false
    }
  
    if(localStorage.length == 0){
        localStorage.setItem('data' , JSON.stringify([]));
    }
    
      const newData = JSON.parse(localStorage['data']);
      newData.push(obj);
      localStorage.setItem('data'  , JSON.stringify(newData));
      addInHtml();
      cansle();
    }
    document.addEventListener('click' , e => {
       if(e.target.id === 'showthecard')showCard(e.target.dataset['num']);
       else if(e.target.className === 'showBox'){
            thingsClass.classList.remove('none');
            data.classList.remove('none');

            document.getElementsByClassName('showBox')[0].remove()
        }
    })
    
    function showCard(index){
        const target = JSON.parse(localStorage['data'])[index];
        const div = document.createElement('div');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');

        div.classList.add('showBox')
        h3.innerText = target.tag;
        p.textContent = target.detils;   
        div.appendChild(h3);
        div.appendChild(p);
        document.getElementsByClassName('todocont')[0].append(div);
       
        thingsClass.classList.add('none');
        data.classList.add('none');
        deleteOp.classList.add('none');
    }
    document.querySelector('.search > input').addEventListener('onkeypress' , searchFromAll )
function searchFromAll() {
    const value = this.value ; 

    Array.from(data.children).forEach(e => {
    console.log('change')
    e.style.display = 'block' ;
    if(value == '')return 
    if(!e.innerText.includes(value)) e.style.display = 'none' ; 

    }) 
    }

addInHtml();