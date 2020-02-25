$(document).ready(function(){
    var url = $('#url').val();
    var baseurl = $('#baseurl').val();
    $('#sidebar12').addClass('active'); 

    $('.js-example-basic-single').select2();

    var nameDeli='<a href="/qr">Qr</i></a>';
    $('.nameDeli').html(nameDeli);  
    
    $("#btn_add").click(function(){

        $(".formulario").show();
        $(".tablaqr").hide();
        $("#btn_add").hide();
        $('#btn-save').val("add");

        $("#codigo_qr" ).empty();
        $("#formTutees").trigger('reset');
        
        $('#tag_put').remove();
        newQr();

        var drEvent = $('#dropify-event').dropify();
            drEvent = drEvent.data('dropify');
            drEvent.resetPreview();
            drEvent.clearElement();
            drEvent.settings.defaultFile = "";
            drEvent.destroy();
            drEvent.init();

    });
    $(".btn-cancel").click(function(){

        $(".formulario").hide();
        $(".formularioSalud").hide();
        $(".tablaqr").show();
        $("#btn_add").show();

        $("#codigo_qr" ).empty();

    });

    $("#btnBuscar").click(function(){
        var table = $('#myTable').DataTable();
       
        var tipo = $("#tipo").val();
        var nivel = $("#nivel").val();
        var usuario = $("#usuario").val();

       
        $("#btnBuscar").attr("disabled", true);
 
        table.clear().draw();
 
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        });
 
        $.ajax({
            type: "POST",
            url:url + "/getTutees",
            dataType:"JSON",
            data:{tipo:tipo, nivel:nivel, usuario:usuario},
            success: function (data) {
                    console.log(data);
                    data.forEach(function(dato){
                        
                        table.row.add( [
                            "QR"+dato.id,
                            dato.name+" "+dato.surname+" "+dato.lastname,
                            dato.nivel,
                            dato.code,
                            dato.coins,
                            qr.status(dato),
                            qr.buttons(dato)
                        ] ).draw(); 
                    });
                    $("#btnBuscar").attr("disabled", false);
                
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
    });

    //display modal form for product EDIT ***************************
    $(document).on('click','.open_modal',function(){
        var qr_id = $(this).val();
        var my_url = url + '/' + qr_id;
        actions.show(my_url);
        $("#codigo_qr" ).empty();
    
    });

    $(document).on('click','.view-qr',function(){
        $('#tutorado').attr('src', '');
        var qr_id = $(this).val();
        var my_url = url + '/' + qr_id;
        actions.modal(my_url);
        $("#codigo_qr" ).empty();
        $("#modal_view").modal('show');
     
    });

    $(document).on('click','.abonar-qr',function(){
        var id = $(this).val();
        coins_modal = $('#coins_modal'+id).val();
        $("#total_coins_modal").html("$"+qr.formatNumber(coins_modal));
        $("#id_qr_modal").val(id);
        $("#modal_abono").modal('show');
        $("#form_abono").trigger('reset');
        $(".seccion-devolver").hide();
        $(".seccion-abonar").show();
        $("#lblFlag").html("Cantidad a Abonar");
        $("#inputGroup-sizing-sm").html("+");
    });

    
    $(document).on('click','.modal-salud',function(){
        var id = $(this).val();
        $("#id_qr_salud").val(id);
        $(".formularioSalud").show();
        $(".tablaqr").hide();
        $("#btn_add").hide();
        $("#id_cafeteria").val(0);
        $("#id_category").val(0);
        $("#id_cafeteria").trigger('change').val(0);
        $("#id_category").trigger('change').val(0);
        $("#id_category").attr('disabled', true);
        $("#id_supply").attr('disabled', true);
        package.deletetable();
        var my_url = baseurl + '/qr/salud/'+id;
        //CARGAR DATOS SÍ EXISTEN
        actions.show(my_url);
    });
    
    
    
    $("#btn-save-abono").click(function (e) {

        $("#btn-save-abono").attr('disabled', true);
        
        e.preventDefault();
        
        var formData = $("#form_abono").serialize();
        var state = $('#btn-save-abono').val();
        var type = "POST"; //for creating new resource
        var qr_id = $('#id_qr_modal').val();
        var my_url = baseurl + '/qr';
        if (state == "update"){
            type = "PUT"; //for updating existing resource
            my_url += '/abono/' + qr_id;
        }

        var state = $('#btn-save-abono').val();
        actions.edit_create(type,my_url,state,formData); 
        $( "#codigo_qr" ).empty();
    });

    $("#btn-save-salud").click(function (e) {
        
        $("#btn-save-salud").attr('disabled', true);
        e.preventDefault();
        
        var formData = $("#frmSupAdd").serialize();
        var state = $('#btn-save-salud').val();
        var type = "POST"; //for creating new resource
        var qr_id = $('#id_qr_salud').val();
        var my_url = baseurl + '/qr/salud';
        if (state == "update"){
            type = "PUT"; //for updating existing resource
            my_url += '/'+qr_id;
        }else{
            $("#btn-save-salud").attr('disabled', false);
            id_cafeteria_hidden = $("#id_cafeteria_hidden").val();
            id_supply_hidden = $(".id_supply_hidden").val();
            $.notifyClose();
            if (id_cafeteria_hidden == 0){
                $.notify({
                    // options
                    title: "Error!",
                    message:', No ha selecionado cafeteria.',
                },{
                    // settings
                    type: 'warning'
                });
                return;
            }
            if (id_supply_hidden == undefined){
                $("#id_supply").val(0);
                $("#id_supply").trigger('change');
                $.notify({
                    // options
                    title: "Error!",
                    message:', No ha selecionado ningun producto',
                },{
                    // settings
                    type: 'warning'
                });
                return;
            }
        }

        actions.edit_create(type,my_url,state,formData); 
    });

    $("#formTutees").on('submit',function (e) {

        e.preventDefault(); 
        $('#btn-save').attr('disabled', true);
        
        var formData = new FormData(this);
        // var formData = $("#formTutees").serialize();
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var qr_id = $('#qr_id').val();
        var my_url = baseurl + '/qr';
        var id_tutor = $('#id_tutor').val();
        var file = "file";
        if (state == "update"){
            type = "POST"; //for updating existing resource
            my_url += '/' + qr_id;
        }

        if (state != "update"){
            base_64 = $('#qr_img').attr('src');
            $('#img_base64').val(base_64);
        }
        var state = $('#btn-save').val();
        actions.edit_create(type,my_url,state,formData,file);
        $( "#codigo_qr" ).empty();
    });

    $(document).on('click','.delete-qr',function(){
        var id = $(this).val();
            var my_url = baseurl + '/qr/' + id;
            $.ajaxSetup({
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
               }
           })
            if($(this).attr('class') == 'btn btn-sm btn-outline-success delete-qr')
            {
                title= "¿Deseas activar estos Coins?";
                text="Los Coins se activaran";
                confirmButtonText="Activar";
    
                datatitle="Activados";
                datatext="activados";
                datatext2="Activacion";
            }
            else 
            {
                title= "¿Desea desactivar estos Coins?";
                text= "Los Coins se desactivaran";
                confirmButtonText="Desactivar";
    
                datatitle="Desactivados";
                datatext="desactivados";
                datatext2="Desactivacion";
    
            }
    
    
            swal({
                title: title,
                text: text,
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn btn-danger",
                confirmButtonText: confirmButtonText,
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                actions.deactivated(my_url);
                } 
                else {
                
                swal("Cancelado", datatext2+" cancelada", "error");
            
                }
        });
    });

    $(document).on('click','.eliminar-qr',function(){
        var id = $(this).val();
        //    var my_url =url + '/delete/' + id;
           var my_url = baseurl + '/qr/delete/' + id;
            $.ajaxSetup({
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
               }
           })
           
            title= "¿Desea Eliminar estos Coins?";
            text= "Los Coins se Eliminaran";
            confirmButtonText="Eliminar";

            datatitle="Eliminados";
            datatext="eliminados";
            datatext2="Eliminación";
    
            swal({
                title: title,
                text: text,
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn btn-danger",
                confirmButtonText: confirmButtonText,
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                actions.deactivated(my_url);
                } 
                else {
                
                swal("Cancelado", datatext2+" cancelada", "error");
            
                }
        });
    });

    $(".allownumericwithdecimal").on("keypress keyup blur",function (event) {
        $(this).val($(this).val().replace(/[^0-9\.]/g,''));
        if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    $("input:radio").change(function(){
        valor = $(this).val();
        if(valor == 2){
            $("#lblFlag").html("Cantidad a Abonar");
            $("#inputGroup-sizing-sm").html("+");
        }else if(valor == 3){
            $("#lblFlag").html("Cantidad a Devolver");
            $("#inputGroup-sizing-sm").html("-");
        }
    });

    $('#id_category').change(function(){

        $("#id_supply").attr('disabled', true);
        var category =$(this).val();
        
        var id_cafeteria = $("#id_cafeteria_hidden").val();
        if(category == 0 ){
            var datos = `<option value="0">Seleccionar Producto</option>`;
            $('#id_supply').html(datos);

        } else{
            $("#id_supply").val(0);
            $("#id_supply").trigger('change');
            var select =[];
            $(".rw").each(function () {
                    select.push($(this).val());
            });
            console.log(select);
            var datos = JSON.stringify(select);
            sup = $(this).val();
            $.get(`${baseurl}/dataCafeteria/${id_cafeteria}/${sup}`,{
                data:datos,
            }).done(function(data){
                $("#id_supply").attr('disabled', false);
                var datos = `<option value="0">Seleccionar Producto</option>`;
                 $.each(data, function(idx, sup) {
                    var select =[];
                        $("#list"+sup.id).each(function () {
                                select.push($(this).val());
                        });
                        if(select.length == 0){
                            datos += `<option class="opt${sup.id}" value="${sup.id}">${sup.name}</option>`;
                        }                              
                        });
                $('#id_supply').html(datos);
                }).fail( function(data) {
                        console.log(data);
                });
            }     
        });

    $('.addSupply').click(function(){

        var name = $('#id_supply').children("option:selected").text();
        var data= [{supply:$('#id_supply').children("option:selected").val(),
                    observaciones_supply:$('#observaciones_supply').val()}];
                    console.log(data);
                    if (data[0].supply == 0){
                        $.notifyClose();
                        $.notify({
                            // options
                            title: "Error!",
                            message:', No a selecionado ningun producto.',
                        },{
                            // settings
                            type: 'warning'
                        });
                    }else{
                        package.supllytable(name,data);
                    }
        
    });

    $("#id_cafeteria").change(function(){
        id_cafeteria = $(this).val();
        $("#id_category").trigger('change').val(0);

        $("#id_category").val(0);
        $("#id_category").trigger('change');

        $("#id_supply").val(0);
        $("#id_supply").trigger('change');

        $("#id_supply").attr('disabled', true);

        if(id_cafeteria > 0){
            $("#id_cafeteria_hidden").val(id_cafeteria);
            $("#id_category").attr('disabled', false);
        }else{
            $("#id_cafeteria_hidden").val(0);
            $("#id_category").attr('disabled', true);
        }
    });
});

const package={
    status: function (dato){
        if(dato.status== 1){
            statu="<span class='badge badge-success'>Activo</span>";
    
        }else{
            statu="<span class='badge badge-secondary'>Inactivo</span>";
        }
    
        return statu;
        },
    supllytable:function(name,data){
                console.log(data);
                $("#id_supply").val(0);
                $("#id_supply").trigger('change');
                var select =[];
                        $("#list"+data[0].supply).each(function () {
                                select.push($(this).val());
                        });
                        $.notifyClose();
            if(select.length > 0){
                $.notify({
                    // options
                    title: "Error!",
                    message:'Ya existe el producto en su selección',
                },{
                    // settings
                    type: 'danger'
                });
            }else{

                    var dato=`<tr id="list${data[0].supply}">
                    <td style=" word-wrap:break-word; white-space:normal !important">${name}</td>
                    <td style=" word-wrap:break-word; white-space:normal !important">${data[0].observaciones_supply}</td>
                    <input type="hidden" class="id_supply_hidden" name="id_supply_hidden[]" value="${data[0].supply}">
                    <input type="hidden" name="observaciones_supply_hidden[]" value="${data[0].observaciones_supply}">
                    <td>
                        <button id="da${data[0].supply}" value="${data[0].supply}" class="btn btn-danger rw" onclick="package.supllydelete(${data[0].supply});"><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr>`;
                
            $("#supplytable").append(dato);
            $('#id_supply').children("option:selected").hide();
            $('#id_supply').trigger('change').val(0);
            $('#observaciones_supply').val('');
         
           
        }
    },
    getsupllytable:function(data){
                // console.log(data);
                var select =[];
                        $("#list"+data.supply).each(function () {
                                select.push($(this).val());
                        });

            if(select.length > 0){
                $.notifyClose();
                $.notify({
                    // options
                    title: "Error!",
                    message:'Ya existe el producto en su selección ',
                },{
                    // settings
                    type: 'danger'
                });
            }else{

                    var dato=`<tr id="list${data.supply}">
                    <td style=" word-wrap:break-word; white-space:normal !important">${data.name}</td>
                    <td style=" word-wrap:break-word; white-space:normal !important">${data.observaciones_supply}</td>
                    <input type="hidden" name="id_supply_hidden[]" value="${data.supply}">
                    <input type="hidden" name="observaciones_supply_hidden[]" value="${data.observaciones_supply}">
                    <td>
                        <button id="da${data.supply}" value="${data.supply}" class="btn btn-danger rw" onclick="package.supllydelete(${data.supply});"><i class="fa fa-trash-o"></i></button>
                    </td>
                </tr>`;
                
            $("#supplytable").append(dato);
            $('#id_supply').children("option:selected").hide();
            $('#id_supply').trigger('change').val(0);
            $('#observaciones_supply').val('');
         
           
        }
    },
    supllydelete:function(supply){
     
        $('#id_supply').children(".opt"+supply).show();
        $('#list'+supply).remove();
    },
    deletetable: function(){
        $(".rw").each(function () {
            var no=$(this).val();
            $('#id_supply').children(".opt"+no).show();
            $('#list'+no).remove();
         });

    },
}

const qr={
    status: function (dato){
        if(dato.status== 1){
            statu="<span class='badge badge-success'>Activo</span>";
    
        }else{
            statu="<span class='badge badge-secondary'>Inactivo</span>";
        }
    
        return statu;
        },
    buttons:function(dato){
        var buttons='';

        if(dato.status== 1){
            buttons += `
            <button type="button" class="btn btn-sm btn-outline-danger modal-salud" data-toggle="tooltip" title="Salud" id="btn-salud" value="${dato.id}"><i class="fa fa-medkit"></i></button>
            <button type="button" class="btn btn-sm btn-outline-secondary open_modal" data-toggle="tooltip" title="Editar" id="btn-edit" value="${dato.id}"  ><i class="fa fa-edit"></i></button>
            <button class="btn btn-sm btn-outline-info  view-qr" data-toggle="tooltip" title="Ver Detalle" value="${dato.id}"><i class="fa fa-eye"></i></button>
            <button class="btn btn-sm btn-outline-success  abonar-qr" data-toggle="tooltip" title="Abonar" value="${dato.id}"><i class="fa fa-money"></i></button>
            <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   delete-qr" data-toggle="tooltip" title="Desactivar" data-type="confirm" value="${dato.id}"><i class="fa fa-times"></i></button>
            <input type="hidden" id="coins_modal${dato.id}" value="${dato.coins}">
            `;
        }else {
            buttons += `
                <button type="button" class="btn btn-sm btn-outline-success delete-qr" title="Activar" data-type="confirm" value="${dato.id}" ><i class="fa fa-check-square-o"></i></button>
                <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   eliminar-qr" title="Eliminar" data-type="confirm" value="${dato.id}"><i class="fa fa-trash-o"></i></button>
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
        $('#btn-save').attr('disabled', false);
        $("#btn-save-abono").attr('disabled', false);
        $("#btn-save-salud").attr('disabled', false);
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

            $("#modal_abono").modal('hide');
            if(data.data2 || data.data2 === 0){
                var dato2 = data.data2;
                var dato = data.data;
                $(".total_coins_modal").html(qr.formatNumber(dato2));
            }else{
                var dato = data;
            }

            var msj="";

            if (state == "add"){ //if user added a new record
                // console.log(data);
                base_64 = $('#img_base64').val();
                // console.log(base_64);
                downloadImg(base_64,0);
                msj="Se agrego correctamente ";
                var table = $('#myTable').DataTable();
                var rowNode= table.row.add( [
                            "QR"+dato.id,
                            dato.name+" "+dato.surname+" "+dato.lastname,
                            dato.nivel,
                            dato.code,
                            dato.coins,
                            qr.status(dato),
                            qr.buttons(dato)
                        ] ).draw().node().id = 'qr_id'+dato.id;   
                    $('#qr_id'+dato.id).css("background-color", "#c3e6cb");
                    
            }else{ //if user updated an existing record
                
                msj="Se modifico correctamente ";
                var edit = [
                    "QR"+dato.id,
                    dato.name+" "+dato.surname+" "+dato.lastname,
                    dato.nivel,
                    dato.code,
                    dato.coins,
                    qr.status(dato),
                    qr.buttons(dato)
                    ];
                    
                    $('#qr_id'+dato.id).css("background-color", "#ffdf7e");
                    
                    $('#myTable').dataTable().fnUpdate(edit,$('tr#qr_id'+dato.id)[0], undefined, false, false);
                    $('#coins_modal'+dato.id).val(dato.coins);
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
        

        if(data.length == undefined){
            //EDITAR

            $('#tag_put').remove();
            $form = $('#formTutees');
            $form.append('<input type="hidden" id="tag_put" name="_method" value="PUT">');
    
            newQr(data.code);
            var baseurl = $('#baseurl').val();
            var rutaImage = baseurl + '/images/tutees/' + data.image;
          
            var drEvent = $('#dropify-event').dropify(
                {
                  defaultFile: rutaImage
                });
                drEvent = drEvent.data('dropify');
                drEvent.resetPreview();
                drEvent.clearElement();
                drEvent.settings.defaultFile = rutaImage;
                drEvent.destroy();
                drEvent.init();
    
            $('#qr_id').val(data.id);
            $('#name').val(data.name);
            $('#surname').val(data.surname);
            $('#lastname').val(data.lastname);
            $('#id_educational_stage').val(data.id_educational_stage);
            $('#observaciones').val(data.observaciones);
            $('#gasto_diario').val(data.gasto_diario);
            $('#btn-save').val("update");
            $(".formulario").show();
            $(".tablaqr").hide();
            $("#btn_add").hide();
        }else{

            if(data != ""){
                // EDITAR SALUD
                $("#btn-save-salud").val('update');
                
                data.forEach(function(data){
                    package.getsupllytable(data);
                });
            }else{
                // GUARDAR
                $("#btn-save-salud").val('add');
            }
        }
    },
    
    modal: function(data){
        $('#qr_modal').empty();
        newQr(data.code,1);
        var url = $('#url').val();
        var baseurl = $('#baseurl').val();
        var rutaImage = baseurl + '/images/tutees/' + data.image;
        var rutaImageDefault = baseurl + '/images/default.png';
        if(data.image != "" && data.image != null){
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
                if(data.status == 0){
            
                    $('#myTable').dataTable().fnDeleteRow('#qr_id' + data.id);
                    swal("Listo!", "Informacion eliminada correctamente", "success");
                
                }else{
                    console.log(data);
                    if(data.data2){
                        var dato2 = data.data2;
                        var dato = data.data;
                        $(".total_coins_modal").html(dato2);
                    }else{
                        var dato = data;
                    }
            
                
                    var edit = [
                        "QR"+dato.id,
                        dato.name+" "+dato.surname+" "+dato.lastname,
                        dato.nivel,
                        dato.code,
                        dato.coins,
                        qr.status(dato),
                        qr.buttons(dato)
                    ];
            
                    $('#myTable').dataTable().fnUpdate(edit,$('tr#qr_id'+dato.id)[0]);
                    if(dato.status==1){
                        $('#qr_id'+dato.id).css("background-color", "#c3e6cb");
                        swal("Listo!", "Informacion activada correctamente", "success");
                    }else{
                        $('#qr_id'+dato.id).css("background-color", "#f2dede");
                        swal("Listo!", "Informacion desactivada correctamente", "success");
                    }
                }
        }
          
    },
    
    msj: function(data){
        // console.log(data);
        $('#btn-save').attr('disabled', false);
        $("#btn-save-abono").attr('disabled', false);
        $("#btn-save-salud").attr('disabled', false);
    
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

//Nuevo codigo
function newQr(cod=null,modal=null){
    if(cod == null){
        codigo = codeGenerator(10);
    }else{
        codigo = cod;
    }
    
    if(modal == null){
        $('#qr_code').val(codigo);
        new QRCode(document.getElementById('codigo_qr'), ""+codigo+"");

    }else{
        $('#qr_code_modal').val(codigo);
        new QRCode(document.getElementById('qr_modal'), ""+codigo+"");
    }

}

function codeGenerator(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

function downloadImg(img_base64,modal) {
    const linkSource = img_base64;
    const downloadLink = document.createElement("a");
    if(modal == 1){
        fileName = $('#name_modal').text();
    }else{
        fileName = $('#qr_code').val();
    }
    downloadLink.href = linkSource;
    downloadLink.download = fileName+'.jpg';
    downloadLink.click();
}

function downloadImage(){
    base_64 = $('#qr_img').attr('src');
    downloadImg(base_64,1);
}

