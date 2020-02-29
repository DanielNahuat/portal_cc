getData(1);

$(document).ready(function(){
    var can0 = $('#id_candidate').val();
    var nameDeli='<a href="/vacancies">Vacantes</i></a> / <a href="/candidates/'+can0+'">Candidates</i></a>';

    $('.nameDeli').html(nameDeli);
    $('#sidebar10').addClass('active');  




});