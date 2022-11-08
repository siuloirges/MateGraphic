function sendEval(){
    eval = document.getElementById("eval").value.replaceAll(' ', '').replaceAll('^', '**').toLowerCase()

    // console.log(eval)
    
    var requestOptions = { method: 'GET', redirect: 'follow' };

    let timerInterval
        Swal.fire({
        title: 'Calculando respuesta',
        icon: 'info',
        html: '<b></b>',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
        })

        console.log(eval)
      
        fetch(`https://opt-api.herokuapp.com/optimize?funtion=${eval}`, requestOptions)
        .then(response => response.text())
        .then(result => {

            const obj = JSON.parse(result);
            window.location.href = ".\\result.html?id="+obj.idName+"&eval="+eval+"&min="+obj.puntos;

        })
        .catch(error => console.log('error', error));
}

function getImage(){


    var id = getParameterByName('id');

    console.log(id)

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      data = getParameterByName('min').replaceAll("'", '').replaceAll("b", '')
      eval = getParameterByName('eval')
      const obj = JSON.parse(data);
      document.getElementById('resp').innerHTML = "El punto minimo para " +eval+" es: "+obj.min

      
      
      fetch("https://opt-api.herokuapp.com/imageByIdName?idName="+id, requestOptions)
        .then(response => response.text())
        .then(result => {
            document.getElementById('base64image').setAttribute('src','data:image/jpeg;base64, '+result)
            document.getElementById('base64image').setAttribute('style','display:block; width:400px;height:400px;margin: 0px;')
        })
        .catch(error => console.log('error', error));

}
getImage()

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}