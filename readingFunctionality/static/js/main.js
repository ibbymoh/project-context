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
        data: {"word-choice": chosen_word,"language": language_choice,"sentence":chosen_word},
        success: function(response) {
        const re = /\d\D+/gu
        contextual_examples = response['answer'].match(re)
        $('#translation-of-word').append(response['answer'].split('1.')[0])

        for (i=0; i < contextual_examples.length; i++) {
        $('#translation-of-word').append("<br /><br />")
        $('#translation-of-word').append(contextual_examples[i])

        }



        }
        })

    });

    //###

    $('#tranformedText').on('click','.textButton', function(event) {
        chosen_word = $(event.currentTarget).text()
        console.log(chosen_word)

        $('#word-to-translate').text(chosen_word)
        language_choice = $('#language-choice-text-upload').val()
        sentence = $('#textInputSection').val()
        $('#translation-text-upload').text('')
        $.ajax ({

        type: 'GET',
        url: 'upload-text/get/translation',
        data: {"word-choice": chosen_word, "language": language_choice,"sentence": sentence},
        dataType: "json",
        success: function(response) {


        const re = /\d\D+/gu
        contextual_examples = response['answer'].match(re)
        $('#translation-text-upload').append(response['answer'].split('1.')[0])

        for (i=0; i < contextual_examples.length; i++) {
        $('#translation-text-upload').append("<br /><br />")
        $('#translation-text-upload').append(contextual_examples[i])

        }

        $('#translation-text-upload').append("<h1> Position in sentence  </h1>")
        $('#translation-text-upload').append(response['position'])


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