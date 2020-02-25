$(document).ready(function(){
    var url = $('#url').val();
    var baseurl = $('#baseurl').val();
    $('#sidebar5').addClass('active'); 

    var nameDeli='<a href="/cortes">Cortes</i></a>';
    $('.nameDeli').html(nameDeli);  

    //ORDERNAMIENTO DE LA TABLA
    var table = $('#myTable').DataTable();
    table
    .columns( 0 )
    .order( 'desc' )
    .draw();

    //MOSTRAR MODAL PARA AGREGAR
    $("#btn_add").click(function(){

        $("#myModalLabel").html("Nuevo Corte");
        $('#btn-save').val("add");
        $("#form_cortes").trigger('reset');
        $("#modal_cortes").modal("show");
        $("#cantidad_corte").val("");


    });

    // //LIMPIAR INPUT
    // $("#cantidad_corte").click(function(){
    //     $(this).val("");
    // });


    //display modal form for product EDIT ***************************
    $(document).on('click','.open_modal',function(){
        var corte_id = $(this).val();
        var my_url = url + '/' + corte_id;
        actions.show(my_url);
    });

    //GUARDAR
    $("#cortesForm").on('submit',function (e) {

        e.preventDefault(); 
        
        // var formData = new FormData(this);
        var formData = $("#cortesForm").serialize();
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var corte_id = $('#corte_id').val();
        var my_url = baseurl + '/cortes';

        if (state == "update"){
            type = "PUT"; //for updating existing resource
            my_url += '/' + corte_id;
        }

        actions.edit_create(type,my_url,state,formData);
    });

    $(document).on('click','.closed',function(){
        var id = $(this).val();
        var my_url = url + '/' + id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })

        swal({
            title: "¿Desea Cerrar este Corte?",
            text: "El Corte se Cerrará",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn btn-danger",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: true,
            closeOnCancel: false
        },
        
        function(isConfirm) {
            if (isConfirm) {
                actions.deactivated(my_url);
            } 
            else {
                swal("Cancelado", " Operación Cancelada", "error");
            }
        });
    });



    $(".allownumericwithdecimal").on("keypress keyup blur",function (event) {
        $(this).val($(this).val().replace(/[^0-9\.]/g,''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    $("#btnBuscar").click(function(){
       
        var fechaInicio = $("#fechaInicio").val();
        var fechaFin = $("#fechaFin").val();
 
        if(fechaInicio != "" && fechaFin != ""){
 
            if(fechaFin < fechaInicio){
                swal({
                    title: "Fechas No Válidas",
                    type: "error",
                    text: "La fecha Fin no puede ser menor a la fecha Inicio"
                });
                return;
            }
        }
       
        $("#btnBuscar").attr("disabled", true);
 
        table.clear().draw();
 
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });
 
        $.ajax({
            type: "POST",
            url:url + "/getCortes",
            dataType:"JSON",
            data:{fechaInicio:fechaInicio, fechaFin:fechaFin},
            success: function (data) {
 
                console.log(data);

                data.forEach(function(dato){
                    
                    table.row.add( [
                        dato.id,
                            dato.cafeteria,
                            '$'+corte.formatNumber(dato.cantidad_corte),
                            dato.inicio,
                            dato.fin,
                            dato.cliente,
                            corte.status(dato),
                            corte.buttons(dato)
                    ] ).draw(); 
                });
                $("#btnBuscar").attr("disabled", false);
                
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
    });

  
});



const corte={
    status: function (dato){
        if(dato.status== 1){
            statu="<span class='badge badge-success'>Activo</span>";
    
        }else{
            statu="<span class='badge badge-danger'>Cerrado</span>";
        }
    
        return statu;
        },
    buttons:function(dato){
        var buttons='';

        if(dato.status== 1){
            buttons += `
                <button type="button" class="btn  btn-outline-secondary open_modal" data-toggle="tooltip" title="Editar" id="btn-edit" value="${dato.id}"  ><i class="fa fa-edit"></i></button>
                <a class="btn  btn-outline-info  view-sale" data-toggle="tooltip" title="Ver Detalle" href="/saleDetail/${dato.id}"><i class="fa fa-eye"></i></a>
                <button type="button" class="btn  btn-outline-danger js-sweetalert  closed" data-toggle="tooltip" title="Cerrar Corte" data-type="confirm" value="${dato.id}"><i class="fa icon-ban"></i></button>
            `;
        }else {
            buttons += `
                <a class="btn  btn-outline-info  view-sale" data-toggle="tooltip" title="Ver Detalle" href="/saleDetail/${dato.id}"><i class="fa fa-eye"></i></a>
            `;
        }

        return buttons;
    },

    formatNumber:function(num){
        
        if (!num || num == 'NaN') return '0.00';
        if (num == 'Infinity') return '&#x221e;';
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + ''+num + '.' + cents);
        
    }

}


const success = { 
    new_update: function (data,state){
        $.notifyClose();
        switch(data.No) {
            case 1:
               $.notify({
                   // options
                   title: "Error!",
                   message:data.msg,
               },{
                   // settings
                   type: 'danger'
               });
              break;
            case 2:
               $.notify({
                   // options
                   title: "Error!",
                   message:data.msg,
               },{
                   // settings
                   type: 'danger'
               });
              break;
            case 3:
               $.notify({
                   // options
                   title: "Listo!",
                   message:data.msg,
               },{
                   // settings
                   type: 'success'
               });
               $("#id_qr_salud").val("");
               $(".formularioSalud").hide();
               $(".tablaqr").show();
               $("#btn_add").show();
               $("#formSalud").trigger('reset');
               package.deletetable();
               $('#qr_id'+data.id_qr).css("background-color", "#ffdf7e");
              break;
            default:

            $("#modal_cortes").modal('hide');
            if(data.data2 || data.data2 === 0){
                var dato2 = data.data2;
                var dato = data.data;
            }else{
                var dato = data;
            }

            var msj="";

            if (state == "add"){ //if user added a new record
                // console.log(data);
                msj="Se agrego correctamente ";
                var table = $('#myTable').DataTable();
                var rowNode= table.row.add( [
                            dato.id,
                            dato.cafeteria,
                            '$'+corte.formatNumber(dato.cantidad_corte),
                            dato.inicio,
                            dato.fin,
                            dato.cliente,
                            corte.status(dato),
                            corte.buttons(dato)
                        ] ).draw().node().id = 'corte_id'+dato.id;   
                    $('#corte_id'+dato.id).css("background-color", "#c3e6cb");
                    
                    
            }else{ //if user updated an existing record
                
                msj="Se modifico correctamente ";
                var edit = [
                    dato.id,
                    dato.cafeteria,
                    '$'+corte.formatNumber(dato.cantidad_corte),
                    dato.inicio,
                    dato.fin,
                    dato.cliente,
                    corte.status(dato),
                    corte.buttons(dato)
                    ];
                    
                    $('#corte_id'+dato.id).css("background-color", "#ffdf7e");
                    
                    $('#myTable').dataTable().fnUpdate(edit,$('tr#corte_id'+dato.id)[0], undefined, false, false);
            }

            $(".formulario").hide();
            $(".tablaqr").show();
            $("#btn_add").show();

            $.notify({
                // options
                title: "Listo!",
                message: msj,
            },{
                // settings
                type: 'success'
            });
            $('#frmqr').trigger("reset");
        }
    },
    
    show: function(data){
        
        console.log(data);
        $("#myModalLabel").html("Editar Corte");
        $("#btn-save").val('update');
        $("#modal_cortes").modal('show');

        $("#cantidad_corte").val(data.cantidad_corte);
        $("#corte_id").val(data.id);

    },
    
    modal: function(data){
        $('#qr_modal').empty();
        newQr(data.code,1);
        var url = $('#url').val();
        var baseurl = $('#baseurl').val();
        var rutaImage = baseurl + '/images/tutees/' + data.image;
        var rutaImageDefault = baseurl + '/images/default.png';
        if(data.image != ""){
            rutaImage = rutaImage;
        }else{
            rutaImage = rutaImageDefault;
        }
        var qrUrl=url+"/code/"+data.code;
        $("#wa").attr("href", "https://api.whatsapp.com/send?phone=&text="+qrUrl);
        $('#qr_modal').val(data.id);
        $('#name_modal').html( data.name+" "+data.surname+" "+data.lastname,);
        $('#coins_modal').html(data.coins);

        $('#tutorado').attr('src',rutaImage);
    },
    deactivated: function(data) {

        switch(data.No) {
            case 1:
                swal("Error", "Este Usuario ya tiene una cuenta con coins", "error");
              break;
            default:
               
                dato = data;
            
                var edit = [
                    dato.id,
                    dato.cafeteria,
                    '$'+corte.formatNumber(dato.cantidad_corte),
                    dato.inicio,
                    dato.fin,
                    dato.cliente,
                    corte.status(dato),
                    corte.buttons(dato)
                ];
        
                $('#myTable').dataTable().fnUpdate(edit,$('tr#corte_id'+dato.id)[0]);
             
                $('#corte_id'+dato.id).css("background-color", "#f2dede");
                swal("Listo!", "Corte Cerrado con éxito", "success");
                
                
        }
          
    },
    
    msj: function(data){
        // console.log(data);
    
        $.notifyClose();
        $.each(data.responseJSON.errors,function (k,message) {
            $.notify({
                // options
                title: "Error!",
                message:message,
            },{
                // settings
                type: 'danger'
            });
        });
    },
}
