$(document).ready(function(){
    var url = $('#url').val();
    var baseUrl = $('#baseUrl').val();

    $('#sidebar3').addClass('active'); 
    $('#myTable').DataTable();

    // BTN NEW
    $('#btn_add').click(function(){
        $('#labelTitle').html("New Operator  <i class='fa fa-tasks'></i>");
        $(".formulario").show();
        $(".tablaOperator").hide();
        $("#btn_add").hide();
        $('#btn-save').val("add");
        $("#formTutees").trigger('reset');
        $('#tag_put').remove();
    });
    //BTN CANCEL
    $('.btn-cancel').click(function(){
        $('#labelTitle').html("Operators  <i class='fa fa-tasks'></i>");
        $(".formulario").hide();
        $(".tablaOperator").show();
        $("#btn_add").show();
        $("#formTutees").trigger('reset');
        $('#tag_put').remove();
    });

    $("#formOperators").on('submit',function (e) {

        e.preventDefault(); 
        $('#btn-save').attr('disabled', true);
        
        // var formData = new FormData(this);
        var formData = $("#formOperators").serialize();
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var my_url = baseUrl + '/operators';
        // var file = "file";
        // if (state == "update"){
        //     type = "POST"; //for updating existing resource
        //     my_url += '/' + qr_id;
        // }

        // if (state != "update"){
        //     base_64 = $('#qr_img').attr('src');
        //     $('#img_base64').val(base_64);
        // }
        actions.edit_create(type,my_url,state,formData);
    });





       
        
    
  

    //delete category and remove it from TABLE list ***************************
    $(document).on('click','.deleteCategory',function(){
        var id = $(this).val();
        var my_url = baseUrl + '/user/delete/' + id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        swal({
            title: "¿Desea eliminar este usuario",
            text: "El usuarioo se eliminara permanentemente",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn btn-danger",
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: true,
            closeOnCancel: false
            },
            function(isConfirm) {
            if (isConfirm) {
                actions.deactivated(my_url);
            }else {
                swal("Cancelado", "Eliminacion cancelada", "error");
            }
            });
    });
       
    //delete product and remove it from TABLE list ***************************
    $(document).on('click','.delete-category',function(){
        var id = $(this).val();
        var my_url =baseUrl + '/users/' + id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        if($(this).attr('class') == 'btn btn-sm btn-outline-success delete-category')
        {
            title= "¿Deseas activar este usuario?";
            text="El usuario se activara";
            confirmButtonText="Activar";

            datatitle="Activado";
            datatext="activada";
            datatext2="Activacion";
        }
        else 
        {
            title= "¿Desea desactivar este usuario?";
            text= "La usuario se desactivara";
            confirmButtonText="Desactivar";

            datatitle="Desactivado";
            datatext="desactivada";
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
            swal(datatitle, "Categoria "+datatext, "success");
            actions.deactivated(my_url);
            } 
            else {
            
            swal("Cancelado", datatext2+" cancelada", "error");
        
            }
        });

        
    });


    
 });      


const types ={
    button: function(dato){
           var buttons='<div class="btn-group">';
            if(dato.id_status== 1){
               buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="'+dato.id+'"><i class="fa fa-edit"></i></button>';
               buttons += '	<button type="button" class="btn btn-outline-danger off-type" title="Desactivar Usuario" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-window-close"></i></button>';
          
           }else if(dato.id_status == 2){
               buttons  +=' <button type="button" class="btn btn-sm btn-outline-success off-type" title="Activated" data-type="confirm" value="'+dato.id+'"><i class="fa fa-check-square-o"></i></button>'
               buttons  += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert deletetype" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>';
           }
           buttons+='</div>';
           return buttons;
    },
    status:function(dato){
        var status='';
        if(dato.id_status== 1){
            status +="<span class='badge badge-success'>Activated</span>";
        }else if(dato.id_status == 2){
            status +="<span class='badge badge-secondary'>Deactivated</span>";
        }
       return status;
    },
}
 


const success = { 
    new_update: function (data,state){
        console.log(data);
        
        var dato = data;
        switch (dato.No) {
            case 1:
                
            break;
        
            default:
                $('#btn-save').attr('disabled', false);

                var operator = `<tr id="operator_id${dato.id}">
                    <td>${dato.id}</td>
                    <td>${dato.email}</td>
                    <td>${dato.name}</td>
                    <td>${dato.phone}</td>
                    <td>${dato.emergency_contact_phone}</td>
                    <td>${dato.birthdate}</td>
                    <td class="hidden-xs">${types.status(dato)}</td>
                    <td>${types.button(dato)}</td>
                </tr>`;

                if (state == "add"){ 
                    $("#operator-list").append(operator);
                    $("#operator_id"+dato.id).css("background-color", "#c3e6cb");    
                }else{
                    $("#operator_id"+dato.id).replaceWith(operator);
                    $("#operator_id"+dato.id).css("background-color", "#ffdf7e");  
                }
      
                $('#formOperators').trigger("reset");
                $(".formulario").hide();
                $(".tablaOperator").show();
            break;
        }
                
    },
    show: function(data){
        console.log(data);
        // $('#school_id').val(data.id);
        $('#name').val(data.user_info.name);
        $('#lastname').val(data.user_info.last_name);
        $('#address').val(data.user_info.address);
        $('#phone').val(data.user_info.phone);
        $('#emergency_contact_name').val(data.user_info.emergency_contact_name);
        $('#emergency_contact_phone').val(data.user_info.emergency_contact_phone);
        $('#id_type_user').val(data.id_type_user);
        $('#notes').val(data.user_info.notes);
        $('#description').val(data.user_info.description);
        $('#email').val(data.email);
        $('#btn-save').val("update");
        $('#myModal').modal('show');
    },
    deactivated:  function(data){
        // console.log(data.user.status);
        if(data.user.id_status == 0){
            $('#myTable').dataTable().fnDeleteRow('#user_id' + data.user.id);

            $.notify({
                // options
                title: "Error!",
                message:"Se elimino correctamente",
            },{
                // settings
                type: 'danger'
            });
        }else if(data.user.id_status == 1 || data.user.id_status == 2){
            var dato=data;
            var edit = [
                // dato.mat+dato.id,
                // dato.name,
                dato.user.profile.name,
                dato.user.name,
                dato.user.email,
                dato.user.phone,
                category.status(dato),
                category.buttons(dato),
            ];

            $('#myTable').dataTable().fnUpdate(edit,$('tr#user_id'+dato.user.id)[0]);
            if(dato.user.id_status==1){
                $('#user_id'+dato.user.id).css("background-color", "#c3e6cb");
            }else{
                $('#user_id'+dato.user.id).css("background-color", "#f2dede");
            }
        }
       
            
        },
        msj: function(data){
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
                $('#name').addClass('border-dange');
            });
            
        }
}
       