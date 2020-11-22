$(document).ready(onReady);
console.log('in client.js');
let date = new Date().toLocaleDateString();


function onReady() {
    console.log('in jQuery');
    console.log(date);
    getTodos();
    $('#btn-submit').on('click', submitTodo);
    // When one of these fields is red due to an error, it reverts to normal when the user begins typing.
    $('#in-name').on('keydown', function () {
        $('#in-name').removeClass('input-error');
    });
    $('#in-todo').on('keydown', function () {
        $('#in-todo').removeClass('input-error');
    });
    // Click handler for the delete button.
    $('body').on('click', '.btn-delete', deleteTodo);
    // Click handler for the completion status button.
    $('body').on('click', '.btn-complete', updateTodo);
};


// This function changes the completion status of a task when the user clicks the button on the task.
function updateTodo() {
    // id of the todo task
    let id = $(this).closest('div').data('id');
    // This is the current completion status, which is stored as data in the button.
    let completion = $(this).data('completion');
    // If it's null, make it today's date to send over to server side, if it has a date, make it null so it will end up as null on server side.
    if (!completion) {
        completion = date;
    } else {
        completion = null;
    }
    // Route to change the completion status.
    $.ajax({
        method: 'PUT',
        url: `/todos/${id}`,
        data: {
            completion: completion
        }
    }).then(function (response) {
        getTodos();
        console.log('Succesfully Changed Read Status');
    }).catch(function (error) {
        console.log('Error', error);
        alert('Something bad happened. Try again later.');
    })
};

function deleteTodo() {
    // Get the id of the task to be deleted, which is stored in it's div.
    let id = $(this).closest('div').data('id');
    console.log('in deleteTodo, id to delete:', id);
    // example found on https://www.npmjs.com/package/sweetalert2
    Swal.fire({
        title: 'Are you sure?',
        text: 'This task will go away forever!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                method: 'DELETE',
                url: `/todos/${id}`
            }).then(function (response) {
                // After it's deleted, run the get route again and update the DOM.
                getTodos();
                // Display message indicated it was deleted.
                Swal.fire(
                    'Deleted!',
                    'Your task file has been deleted.',
                    'success'
                )
            }).catch(function (error) {
                console.log('Error', error);
                alert('Something bad happened. Try again later.');
            })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // If the user clicks cancel, display a message that the deletion was cancelled.
            Swal.fire(
                'Cancelled',
                'Your task is safe :)',
                'error'
            )
        }
    })


};


function getTodos() {
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then(function (response) {
        console.log('in getTodos .then', response);
        renderTodos(response);
    }).catch(function (error) {
        console.log('error in GET', error);
    });
};

function renderTodos(todos) {
    $('#todo-div').empty();
    $('#completed-div').empty();
    for (let x of todos) {
        // If it's got a completed date, it's gonna go in the completed section with a green background.
        if (x.date_completed) {
            let $div = $(`<div class="todo-item completed-todo" data-id=${x.id}></div>`);
            $div.append(`<p class="todo-name"><b>${x.name}</b></p>`);
            $div.append(`<p>${x.todo}</p>`);
            $div.append(`<p class="todo-added">Added: ${x.date_added}</p>`);
            $div.append(`<p>Completed: ${x.date_completed}</p>`);
            $div.append(`<button class="btn-complete" data-completion="${x.date_completed}">Not Done</button>`);
            $div.append(`<button class="btn-delete">Delete To-Do</button>`);
            $('#completed-div').append($div);

        }
        // If it doesn't have a completed date, it's gonna go in the to-do section with a yellow background.
        else {
            let $div = $(`<div class="todo-item" data-id=${x.id}></div>`);
            $div.append(`<p class="todo-name"><b>${x.name}</b></p>`);
            $div.append(`<p>${x.todo}</p>`);
            $div.append(`<p class="todo-added">Added: ${x.date_added}</p>`);
            $div.append(`<p>Not Completed</p>`);
            $div.append(`<button data-completion="${x.date_completed}" class="btn-complete">Done!</button>`);
            $div.append(`<button class="btn-delete">Delete To-Do</button>`);
            $('#todo-div').append($div);
        }

    }
};

function submitTodo(event) {
    event.preventDefault();
    console.log('in submitTodo');
    let todo = {
        name: $('#in-name').val(),
        todo: $('#in-todo').val(),
        date_added: date,
    }
    // Validate that the inputs are filled out on submission.
    if (todo.name && todo.todo) {
        // Emptying any error fields.
        $('#in-error-message').empty();
        $('#in-error-message').removeClass();
        $.ajax({
            type: 'POST',
            url: '/todos',
            data: todo
        }).then(function (response) {
            console.log(response);
            getTodos();
            $('#in-name').val('');
            $('#in-todo').val('');
        }).catch(function (error) {
            console.log('error in POST', error);
        })
        // deciding which error message to display.
    } else if (!todo.name) {
        displayError('name');
    } else if (!todo.todo) {
        displayError('todo');
    }
};

// function to display an error message depending on the error
function displayError(errorName) {
    if (errorName == 'name') {
        $('#in-error-message').empty();
        $('#in-name').addClass('input-error');
        $('#in-error-message').addClass('alert alert-danger');
        $('#in-error-message').append('Please Enter a Name in the submission field.');
    } else if (errorName == 'todo') {
        $('#in-error-message').empty();
        $('#in-todo').addClass('input-error');
        $('#in-error-message').addClass('alert alert-danger');
        $('#in-error-message').append('Please Enter a To-Do in the submission field.');
    }
};