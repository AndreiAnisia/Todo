import 'core-js/stable';

//Selectors
var todoInput = document.getElementById('textuldat');
var todoList = document.getElementById('todo-list');
var todoButon = document.getElementById('button-addon1');
var clearButon = document.getElementById('button-addon2');

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButon.addEventListener('click', adaugaElement);
clearButon.addEventListener('click', stergeTot);
todoList.addEventListener('click', stergeElement);
todoList.addEventListener('click', modificaElement);
todoList.addEventListener('click', bifatElement);
todoInput.addEventListener('keypress', (e) => {
   if (e.key === 'Enter') {
      adaugaElement(e);
   }
});

function adaugaElement(event) {
   event.preventDefault();
   //Iau textul introdus
   var input = todoInput.value;
   if (input === '') {
   } else {
      //Creez div
      var todoDiv = document.createElement('div');
      //Creez un element din lista
      var newTodo = document.createElement('li');
      //Adaug clasa la element
      newTodo.classList.add('elementeLista');
      //Creez un textNode
      var text = document.createTextNode(input);
      //Introduc textul in elementul nostru
      newTodo.appendChild(text);
      //Add to local storage
      saveLocal(todoInput.value);
      //Buton bifat
      var butonBifat = document.createElement('button');
      butonBifat.innerHTML =
         '<a href = "#"><i class="far fa-check-circle"></i></a>';
      butonBifat.classList.add('buton-bifat');
      newTodo.appendChild(butonBifat);

      //Buton modifica
      var butonModifica = document.createElement('button');
      butonModifica.innerHTML = '<a href="#"><i class="fa fa-edit"></i></a>';
      butonModifica.classList.add('buton-modifica');
      newTodo.appendChild(butonModifica);

      //Buton sterge
      var butonSterge = document.createElement('button');
      butonSterge.innerHTML = '<a href="#"><i class="fa fa-trash"></i></a>';
      butonSterge.classList.add('buton-sterge');
      newTodo.appendChild(butonSterge);

      //Introduc elementul in lista
      todoList.appendChild(newTodo);
      todoInput.value = '';
   }
}

function stergeElement(event) {
   const e = event.target;
   if (e.classList[0] === 'buton-sterge') {
      e.parentNode.remove();
      removeTodo(e.parentNode);
   }
}
function modificaElement(event) {
   const e = event.target;
   if (e.classList[0] === 'buton-modifica') e.parentNode.remove();
}
function bifatElement(event) {
   const e = event.target;
   if (e.classList[0] === 'buton-bifat')
      e.parentElement.classList.toggle('sarcina-incheiata');
}

function stergeTot(event) {
   while (todoList.firstChild) {
      todoList.removeChild(todoList.lastChild);
   }
   removeAllTodo();
}

function saveLocal(todo) {
   //check if we already have something there
   let todos;
   if (localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.push(todo);
   localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(todo) {
   //check if we already have something there
   let todos;
   if (localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   todos.forEach(function (todo) {
      //Creez div
      var todoDiv = document.createElement('div');
      //Creez un element din lista
      var newTodo = document.createElement('li');
      //Adaug clasa la element
      newTodo.classList.add('elementeLista');
      //Creez un textNode
      var text = document.createTextNode(todo);
      //Introduc textul in elementul nostru
      newTodo.appendChild(text);
      //Buton bifat
      var butonBifat = document.createElement('button');
      butonBifat.innerHTML =
         '<a href = "#"><i class="far fa-check-circle"></i></a>';
      butonBifat.classList.add('buton-bifat');
      newTodo.appendChild(butonBifat);

      //Buton modifica
      var butonModifica = document.createElement('button');
      butonModifica.innerHTML = '<a href="#"><i class="fa fa-edit"></i></a>';
      butonModifica.classList.add('buton-modifica');
      newTodo.appendChild(butonModifica);

      //Buton sterge
      var butonSterge = document.createElement('button');
      butonSterge.innerHTML = '<a href="#"><i class="fa fa-trash"></i></a>';
      butonSterge.classList.add('buton-sterge');
      newTodo.appendChild(butonSterge);

      //Introduc elementul in lista
      todoList.appendChild(newTodo);
   });
}

function removeTodo(todo) {
   //check if we already have something there
   let todos;
   if (localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   const todoIndex = todo.innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem('todos', JSON.stringify(todos));
}

function removeAllTodo(todo) {
   let todos;
   if (localStorage.getItem('todos') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todos'));
   }
   localStorage.clear();
}
