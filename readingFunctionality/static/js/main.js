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
    $('#pageNumber').val("1")
    chosen_page = Number($('#pageNumber').val())
    language_choice = $('#language-choice').val()
    var selectedFile = document.getElementById("actual-btn").files[0]
    var name = selectedFile.name

    $('#uploadButton').text(name)
    $('#pageNumber').css('background-color','white')
    var selectedFile = document.getElementById("actual-btn").files[0]
    var fd = new FormData();
    fd.append('file', selectedFile);
    fd.append('pageNumber',chosen_page)
    fd.append('language',language_choice)

    const csrftoken = getCookie('csrftoken')
    $.ajax(
    {
    type:"POST",
    url:"fileChange",
    headers: {'X-CSRFToken': csrftoken},
    data: fd,
    cache: false,
    processData: false,
    contentType: false,
    success: function(data) {

       if (language_choice == "Arabic" || language_choice == "Syriac") {

        $('#textSection').css('direction','rtl')

        } else if (language_choice == "English") {

        $('#textSection').css('direction','ltr')
    }

    const myArray = data["alpha"]

    for (let i = 0; i < myArray.length; i++) {
        $('#textSection').append(`<button type='button' class='textButton'>${myArray[i]}</button>`)

        }

    $('.textButton').addClass('btn btn-light')
    }


    })


});


//    #####
    $('#textSection').on('click','.textButton', function(event) {
        chosen_word = ($(event.currentTarget).text())
        $('#word').text(chosen_word)
        language_choice = $('#language-choice').val()

        $('#translation-of-Word').text('')
        $.ajax({

        type: 'GET',
        url: 'upload-doc/get/translation',
        data: {"word-choice": chosen_word, "language": language_choice},
        success: function(response) {
        $('#translation-of-Word').text(response['answer'])

        }


        })

    });

    //###

    $('#tranformedText').on('click','.textButton', function(event) {
        chosen_word = $(event.currentTarget).text()
        console.log(chosen_word)
        $('#word-to-translate').text(chosen_word)
        language_choice = $('#language-choice-text-upload').val()
//
        $('#translation-text-upload').text('')
        $.ajax({

        type: 'GET',
        url: 'upload-text/get/translation',
        data: {"word-choice": chosen_word, "language": language_choice},
        success: function(response) {
        $('#translation-text-upload').text(response['answer'])

        }


        })

    });


//    #######



$('#loadText').click(function(event) {
    $('.textButton').remove();
    $('#textSection').empty()
    chosen_page = Number($('#pageNumber').val())
    language_choice = $('#language-choice').val()
    if (Number.isInteger(chosen_page) && chosen_page >= 1) {
        $('#pageNumber').css('background-color','white')

        var selectedFile = document.getElementById("actual-btn").files[0]

        var fd = new FormData();
        fd.append('file', selectedFile);
        fd.append('pageNumber',chosen_page)
        fd.append('language',language_choice)

        const csrftoken = getCookie('csrftoken')
        $.ajax(
        {
        type:"POST",
        url:"fileChange",
        headers: {'X-CSRFToken': csrftoken},
        data: fd,
        cache: false,
        processData: false,
        contentType: false,
        success: function(data) {
           if (language_choice == "Arabic" || language_choice == "Syriac") {

            $('#textSection').css('direction','rtl')

            } else if (language_choice == "English") {

            $('#textSection ').css('direction','ltr')
        }

        const myArray = data["alpha"]

        for (let i = 0; i < myArray.length; i++) {
            $('#textSection').append(`<button type='button' class='textButton'>${myArray[i]}</button>`)

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
    language_choice = $('#language-choice'.val())

    if (Number.isInteger(chosen_page) && chosen_page >= 2) {
        chosen_page = chosen_page -1
        $('#pageNumber').val(chosen_page)

        var selectedFile = document.getElementById("actual-btn").files[0]

        var fd1 = new FormData();
        fd.append('file', selectedFile);
        fd.append('pageNumber',chosen_page)
        fd.append('language',language_choice)
        const csrftoken = getCookie('csrftoken')

        $.ajax(
        {
        type:"POST",
        url:"fileChange",
        headers: {'X-CSRFToken': csrftoken},
        data: fd,
        cache: false,
        processData: false,
        contentType: false,
        success: function(data) {

          if (language_choice == "Arabic" || language_choice == "Syriac") {

            $('#textSection').css('direction','rtl')

            } else if (language_choice == "English") {

            $('#textSection ').css('direction','ltr')
        }

        const myArray = data["alpha"]




        for (let i = 0; i < myArray.length; i++) {
            $('#textSection').append(`<button type='button' class='textButton'>${myArray[i]}</button>`)

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
    language_choice = $('#language-choice').val()

    if (Number.isInteger(chosen_page) && chosen_page >= 1) {
        chosen_page = chosen_page  + 1
        $('#pageNumber').val(chosen_page)

        var selectedFile = document.getElementById("actual-btn").files[0]

        var fd = new FormData();
        fd.append('file', selectedFile);
        fd.append('pageNumber',chosen_page)
        fd.append('language',language_choice)
        const csrftoken = getCookie('csrftoken')

        $.ajax(
        {
        type:"POST",
        url:"fileChange",
        headers: {'X-CSRFToken': csrftoken},
        data: fd,
        cache: false,
        processData: false,
        contentType: false,
        success: function(data) {

          if (language_choice == "Arabic" || language_choice == "Syriac") {

            $('#textSection').css('direction','rtl')

            } else if (language_choice == "English") {

            $('#textSection ').css('direction','ltr')
        }

        const myArray = data["alpha"]

        for (let i = 0; i < myArray.length; i++) {
            $('#textSection').append(`<button type='button' class='textButton'>${myArray[i]}</button>`)

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

    });


//   ####

$('#seperateText').click(function() {
    $('#tranformedText').empty()
    language_choice = $('#language-choice-text-upload').val()

     if ( language_choice == "Arabic" || language_choice == "Syriac") {

        $('#tranformedText').css('direction','rtl');

    } else {
        $('#tranformedText').css('direction','ltr')

    }

    my_text = $('#textInputSection').val().trim().split(" ")

    for (let i=0; i < my_text.length; i++ ) {
    $('#tranformedText').append(`<button type='button' class='textButton'>${my_text[i]}</button>`)


    }
    $('.textButton').addClass('btn btn-light')

});


$('#resetTextButton').click(function() {
    $('#textInputSection').val('')
    $('#tranformedText').empty()
});




});