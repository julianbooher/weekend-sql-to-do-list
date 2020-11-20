$(document).ready(onReady);
console.log('in client.js');



function onReady(){
    console.log('in jQuery');
    let date = new Date().toLocaleDateString();
    console.log(date);
    getTodos();
    $('#btn-submit').on('click', submitTodo);
}

function getTodos(){
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then(function(response) {
        console.log('in getTodos .then', response);
        renderTodos(response);
    }).catch(function(error){
        console.log('error in GET', error);
    });
}

function renderTodos(todos){
    $('#todo-table-body').empty();
    for (let x of todos){
        let $tr = $(`<tr id="${x.id}"></tr>`);
        $tr.append(`<td>${x.name}</td>`);
        $tr.append(`<td>${x.todo}</td>`);
        $tr.append(`<td>${x.date_added}</td>`);
        // TODO if/else for null date completed
        $tr.append(`<td>${x.date_completed}</td>`);
        $tr.append(`<td><button id="btn-complete">Complete To-Do</button></td>`)
        $tr.append(`<td><button id="btn-delete">Delete To-Do</button></td>`)
        $('#todo-table-body').append($tr);
    }
}

function submitTodo(event){
    event.preventDefault();
    console.log('in submitTodo');
}