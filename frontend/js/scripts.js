$(function() {
  function indexCars() {
    $.ajax({
        url: 'http://localhost:5000/index_cars',
        method: 'GET',
        dataType: 'json',
        success: listCars,
        error: () => {
            alert("Erro no backend!");
        }
    });

    function listCars(cars) {
      $('#carTableContent').empty();
      showContent('carTable');

      for (var i in cars) {
          line = `<tr>
            <td>${cars[i].model}</td>
            <td>${cars[i].car_type}</td>
            <td>${cars[i].brand}</td>
            </tr>`;
          $('#carTableContent').append(line);
      }
    }
  }

  function showContent(indentifier) {
    $('#carTable').addClass('d-none');
    $('#initialContent').addClass('d-none');
    $(`#${indentifier}`).removeClass('d-none');
  }

  $(document).on('click', '#linkHome', () => {
    showContent('initialContent');
  });

  $(document).on('click', '#linkIndexCars', () => {
    indexCars();
  });

  $(document).on('click', '#btnCreateCar', () => {
    model = $('#modelField').val();
    car_type = $('#carTypeField').val();
    brand = $('#brandField').val();

    if(model !== '' || car_type !== '' || brand !== '') {
      var data = JSON.stringify({ model: model, car_type: car_type, brand: brand});
    }

    $.ajax({
      url: 'http://localhost:5000/create_car',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      data: data,
      success: insertCar,
      error: includeError,
    });

    function insertCar(returnedData) {
      if (returnedData.result === 'success') {
        $('#modelField').val('');
        $('#carTypeField').val('');
        $('#brandField').val('');

        alert('Carro inserido com sucesso!');
      } else {
        alert(`${returnedData.result}: ${returnedData.details}`)
      }
    }

    function includeError(returnedData) {
      alert(`${returnedData.result}: ${returnedData.details}`);
    }

    $(`#modalCreateCar`).on('hide.bs.modal', (e) => {
      if (! $('#carTable').hasClass('d-none')) {
        indexCars();
      }
    });

  });

  showContent('initialContent');
});