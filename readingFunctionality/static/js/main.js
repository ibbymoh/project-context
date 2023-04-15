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

$('#actual-btn').change(function() {

    var selectedFile = document.getElementById("actual-btn").files[0]
    var name = selectedFile.name
    var size = selectedFile.size
    var type = selectedFile.type

    $('#uploadButton').text(name)

    var fd = new FormData();
    fd.append( 'file', selectedFile);
    const csrftoken = getCookie('csrftoken')
    $.ajax(
    {
    type:"POST",
    url:"fileChange",
    headers: {'X-CSRFToken': csrftoken},
    data: fd,
    cache: false,
    contentType: 'multipart/form-data',
    processData: false,
    contentType: false,
    success: function(data) {

    $('#textSection').val("");


    const myArray = data["alpha"].split(" ")
    for (let i = 0; i < myArray.length; i++) {
        $('#textSection').append(`<button type='button' class='textButton'>${myArray[i]}</button>`)
        $('#textSection').append(" ")
        }

    $('.textButton').addClass('btn btn-light')
    }




    })
});

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



});