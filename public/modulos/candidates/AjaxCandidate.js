getData(1);

$(document).ready(function(){
    var can0 = $('#id_candidate').val();
    var nameDeli='<a href="/vacancies">Vacantes</i></a> / <a href="/candidates/'+can0+'">Candidates</i></a>';

    $('.nameDeli').html(nameDeli);
    $('#sidebar10').addClass('active');  

      //get base URL *********************
      var url = $('#url').val();


      //display modal form for creating new product *********************
      $('#btn_add').click(function(){
          $('#btn-save').val("add");
          $('#candidateForm').trigger("reset");
          $('#myModal').modal('show');
      });

       //display modal form for product EDIT ***************************
    $(document).on('click','.open_modal',function(){
        $('#candidateForm').trigger("reset");
        var candidate_id = $(this).val();
        var my_url = url + '/' + candidate_id;

            actions.show(my_url);
       
    });

  




});