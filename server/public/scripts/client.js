$(document).ready(onReady);
console.log('in client.js');
let date = new Date().toLocaleDateString();


function onReady(){
    console.log('in jQuery');
    console.log(date);
    getTodos();
    $('#btn-submit').on('click', submitTodo);
    // When these fields is red due to an error, it reverts to normal when the user begins typing.
    $('#in-name').on('keydown', function(){
        $('#in-name').removeClass('input-error');
    });
    $('#in-todo').on('keydown', function(){
        $('#in-todo').removeClass('input-error');
    });
    $('body').on('click', '.btn-delete', deleteTodo);
}

function deleteTodo(){
    let id = $(this).closest('tr').data('id');
    console.log('in deleteTodo, id to delete:', id );
    $.ajax({
        method: 'DELETE',
        url: `/todos/${id}`
      }).then( function(response) {
        getTodos();
        console.log('Succesfully Deleted');
      }).catch( function(error){
        console.log('Error', error);
        alert('Something bad happened. Try again later.');
      })
}

function getTodos(){
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then(function(response) {
        console.log('in getTodos .then', response);
        renderTodos(response);3
    }).catch(function(error){
        console.log('error in GET', error);
    });
}

function renderTodos(todos){
    $('#todo-table-body').empty();
    for (let x of todos){
        let $tr = $(`<tr data-id="${x.id}"></tr>`);
        $tr.append(`<td>${x.name}</td>`);
        $tr.append(`<td>${x.todo}</td>`);
        $tr.append(`<td>${x.date_added}</td>`);
        if(x.date_completed){
            $tr.append(`<td>${x.date_completed}</td>`);
        } else {
            $tr.append(`<td>Not completed</td>`);
        }
        $tr.append(`<td><button id="btn-complete">Complete To-Do</button></td>`)
        $tr.append(`<td><button class="btn-delete">Delete To-Do</button></td>`)
        $('#todo-table-body').append($tr);
    }
}

function submitTodo(event){
    event.preventDefault();
    console.log('in submitTodo');
    let todo = {
        name: $('#in-name').val(),
        todo: $('#in-todo').val(),
        date_added: date,
    }
    // Validate that the inputs are filled out on submission.
    if (todo.name && todo.todo){
        // Emptying any error fields.
        $('#in-error-message').empty();
        $('#in-error-message').removeClass()
        $.ajax({
            type: 'POST',
            url: '/todos',
            data: todo
        }).then(function(response){
            console.log(response);
            getTodos();
        }).catch(function(error){
            console.log('error in POST', error);
        })
    } else if (!todo.name) {
        displayError('name');
    } else if (!todo.todo){
        displayError('todo');
    }
}

// function to display an error message depending on the error
function displayError(errorName){
    if (errorName == 'name'){
        $('#in-error-message').empty();
        $('#in-name').addClass('input-error');
        $('#in-error-message').addClass('alert alert-danger');
        $('#in-error-message').append('Please Enter a Name in the submission field.');
    } else if (errorName == 'todo'){
        $('#in-error-message').empty();
        $('#in-todo').addClass('input-error');
        $('#in-error-message').addClass('alert alert-danger');
        $('#in-error-message').append('Please Enter a To-Do in the submission field.');    
    }
}