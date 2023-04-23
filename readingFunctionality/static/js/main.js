$(document).ready(function() {


//used to get the cookies on the page
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
///////
$('#actual-btn').change(function() {
    $('.textButton').remove();
    $('#textSection').empty()
    $('#pageNumber').val("")
    var selectedFile = document.getElementById("actual-btn").files[0]
    var name = selectedFile.name

    $('#uploadButton').text(name)

//    var fd = new FormData();
//    fd.append('file', selectedFile);
//    fd.append('pageNumber',0);

//    const csrftoken = getCookie('csrftoken')
//    $.ajax(
//    {
//    type:"POST",
//    url:"fileChange",
//    headers: {'X-CSRFToken': csrftoken},
//    data: fd,
//    cache: false,
//    contentType: false,
//    processData: false,
//    success: function(data) {
//
//    $('#textSection').val("");

//
//    const myArray = data["alpha"].split(" ")
//    for (let i = 0; i < myArray.length; i++) {
//        $('#textSection').append(`<button type='button' class='textButton'>${myArray[i]}</button>`)
//        $('#textSection').append(" ")
//        }
//
//    $('.textButton').addClass('btn btn-light')
//    }




//    })
});


//    #####
    $('#textSection').on('click','.textButton', function(event) {
        chosen_word = ($(event.currentTarget).text())
        $('#word').text(chosen_word)

        $('#translation-of-Word').text('')
        $.ajax({

        type: 'GET',
        url: 'get/translation',
        data: {"word-choice": chosen_word},
        success: function(response) {
        $('#translation-of-Word').text(response['answer'])

        }


        })

    });

//    #######



$('#loadText').click(function(event) {
    $('.textButton').remove();
    $('#textSection').empty()
    chosen_page = Number($('#pageNumber').val())

    if (Number.isInteger(chosen_page) && chosen_page >= 1) {
        $('#pageNumber').css('background-color','white')

        var selectedFile = document.getElementById("actual-btn").files[0]

        var fd1 = new FormData();
        fd1.append('file', selectedFile);
        fd1.append('pageNumber',chosen_page)
        const csrftoken = getCookie('csrftoken')

        $.ajax(
        {
        type:"POST",
        url:"fileChange",
        headers: {'X-CSRFToken': csrftoken},
        data: fd1,
        cache: false,
        processData: false,
        contentType: false,
        success: function(data) {

//        $('#textSection').val("");


        const myArray = data["alpha"]

        for (let i = 0; i < myArray.length; i++) {
            $('#textSection').append(`<button type='button' class='textButton'>${myArray[i]}</button>`)
            $('#textSection').append(" ")
            }

        $('.textButton').addClass('btn btn-light')
        }


        })

    } else if ($('#pageNumber').val() == '') {

    $('#pageNumber').css('background-color','red')

    alert("please enter a page number")



    } else {

    alert("please enter a valid page number")

    }

    })

//#####
$('#previousPage').click(function(event) {
    $('.textButton').remove();
    $('#textSection').empty()
    chosen_page = Number($('#pageNumber').val())

    if (Number.isInteger(chosen_page) && chosen_page >= 2) {
        chosen_page = chosen_page -1
        $('#pageNumber').val(chosen_page)

        var selectedFile = document.getElementById("actual-btn").files[0]

        var fd1 = new FormData();
        fd1.append('file', selectedFile);
        fd1.append('pageNumber',chosen_page)
        const csrftoken = getCookie('csrftoken')

        $.ajax(
        {
        type:"POST",
        url:"fileChange",
        headers: {'X-CSRFToken': csrftoken},
        data: fd1,
        cache: false,
        processData: false,
        contentType: false,
        success: function(data) {

//        $('#textSection').val("");


        const myArray = data["alpha"]

        for (let i = 0; i < myArray.length; i++) {
            $('#textSection').append(`<button type='button' class='textButton'>${myArray[i]}</button>`)
            $('#textSection').append(" ")
            }

        $('.textButton').addClass('btn btn-light')
        }


        })

    } else if (Number.isInteger(chosen_page) && chosen_page == 0) {


    } else {

    alert("please enter a valid page number")

    }

    })

//#####


$('#nextPage').click(function(event) {
    $('.textButton').remove();
    $('#textSection').empty()
    chosen_page = Number($('#pageNumber').val())

    if (Number.isInteger(chosen_page) && chosen_page >= 1) {
        chosen_page = chosen_page  + 1
        $('#pageNumber').val(chosen_page)

        var selectedFile = document.getElementById("actual-btn").files[0]

        var fd1 = new FormData();
        fd1.append('file', selectedFile);
        fd1.append('pageNumber',chosen_page)
        const csrftoken = getCookie('csrftoken')

        $.ajax(
        {
        type:"POST",
        url:"fileChange",
        headers: {'X-CSRFToken': csrftoken},
        data: fd1,
        cache: false,
        processData: false,
        contentType: false,
        success: function(data) {

//        $('#textSection').val("");


        const myArray = data["alpha"]

        for (let i = 0; i < myArray.length; i++) {
            $('#textSection').append(`<button type='button' class='textButton'>${myArray[i]}</button>`)
            $('#textSection').append(" ")
            }

        $('.textButton').addClass('btn btn-light')
        },
        error: function(date) {
         alert("please enter a valid page number")

        }


        })

    } else if (Number.isInteger(chosen_page) && chosen_page == 0) {


    } else {

    alert("This page number does not exist in the document uploaded")

    }

    })








});