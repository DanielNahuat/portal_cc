$(document).ready(function(){

    $(".btn_add").click(function(){

        $("#form-clients").show();
        $(".table-clients").hide();
        $(".btn_add").hide();


    });

    $(".btn_cancel").click(function(){

        $("#form-clients").hide();
        $(".table-clients").show();
        $(".btn_add").show();


    });

});