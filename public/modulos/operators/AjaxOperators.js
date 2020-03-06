$(document).ready(function(){
    getData(1);
    var url = $('#url').val();
    var baseUrl = $('#baseUrl').val();
    var radioState;

    $('#sidebar3').addClass('active'); 
    $('#myTable').DataTable();
    $('.js-example-basic-single').select2();
    $(".pass").hide();
    function disablePassInput()
    {
        $('#password').attr('disabled','disabled');
        $('#password_confirmation').attr('disabled','disabled');
    }

    function enablePassInput()
    {
        $('#password').removeAttr('disabled');
        $('#password_confirmation').removeAttr('disabled');
    }


    $("#show_pass").on("click", function(e) {
        if (radioState === this) {
            $(".pass").hide();
            disablePassInput()
            this.checked = false;
            radioState = null;
        } else {
            $(".pass").show();
            enablePassInput()
            console.log("false");
            radioState = this;
        }
    });

    // BTN NEW
    $('#btn_add').click(function(){
        $('#labelTitle').html("New Operator  <i class='fa fa-tasks'></i>");
        $(".formulario").show();
        $(".tablaOperator").hide();
        $("#btn_add").hide();
        $('#btn-save').val("add");
        $("#formOperators").trigger('reset');
        $('#tag_put').remove();
        enablePassInput();
        $(".pass").show();
        $(".show_pass_div").hide();
        $('#id_client').val("");
        $('#id_client').trigger('change');

        var drEvent = $('#dropify-event').dropify();
        drEvent = drEvent.data('dropify');
        drEvent.resetPreview();
        drEvent.clearElement();
        drEvent.settings.defaultFile = "";
        drEvent.destroy();
        drEvent.init();
    });
    //BTN CANCEL
    $('.btn-cancel').click(function(){
        $('#labelTitle').html("Operators  <i class='fa fa-tasks'></i>");
        $(".formulario").hide();
        $(".tablaOperator").show();
        $("#btn_add").show();
        $("#formOperators").trigger('reset');
        $('#tag_put').remove();
    });

    //SAVE OPERATOR
    $("#formOperators").on('submit',function (e) {

        e.preventDefault(); 
        $('#btn-save').attr('disabled', true);
        
        var formData = new FormData(this);
        // var formData = $("#formOperators").serialize();
        var state = $('#btn-save').val();
        var id = $('#id_hidden').val();
        var type = "POST"; //for creating new resource
        var my_url = baseUrl + '/operators';
        var file = "file";
        if (state == "update"){
            type = "POST"; //for updating existing resource
            my_url += '/' + id;
        }

        actions.edit_create(type,my_url,state,formData, file);
    });

     //SHOW
     $(document).on('click','.btn-edit',function(){
        var id = $(this).val();
        var my_url = url + '/' + id;

        $('#labelTitle').html("Edit Operator  <i class='fa fa-tasks'></i>");
        $(".formulario").show();
        $(".tablaOperator").hide();
        $("#btn_add").hide();
        $('#btn-save').val("update");
        $("#formOperators").trigger('reset');
        $('#tag_put').remove();
        disablePassInput();
        $(".show_pass_div").show();
        $(".pass").hide();

        actions.show(my_url);
    });

    //DELETE
    $(document).on('click','.delete-op',function(){
        var id = $(this).val();
        var my_url =url + '/' + id;
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            })
        if($(this).attr('class') == 'btn btn-sm btn-outline-success delete-op'){
            title= "Do you want to activate this operator?";
            text="Operator will be activated";
            confirmButtonText="Activate";

            datatitle="Activated";
            datatext="activated";
            datatext2="Activation";
        }else {
            title= "Do you want to disable this Operator?";
            text= "Operator will be deactivated";
            confirmButtonText="Desactivar";

            datatitle="Deactivated";
            datatext="deactivated";
            datatext2="Deactivation";
        }

        swal({
            title: title,
            text: text,
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn btn-danger",
            confirmButtonText: confirmButtonText,
            cancelButtonText: "Cancel",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function(isConfirm) {
            if (isConfirm) {
                swal(datatitle, "Option "+datatext, "success");
                actions.deactivated(my_url);
            } 
            else {
            swal("Cancelled", datatext2+" cancelled", "error");
            }
        });
    });

    $(document).on('click','.destroy-op',function(){
        var id = $(this).val();
        var my_url = url + '/delete/' + id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        swal({
            title: "Are you sure you wish to delete this option?",
            text: "All records with this option will be modified",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn btn-danger",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: false
        },
        function(isConfirm) {
            if (isConfirm) {
                actions.deactivated(my_url);
            }else {
            swal("Cancelled", "Deletion Canceled", "error");
            }
        });
    });

    $("#btn-nick-generate").click(function(e){
        e.preventDefault();

        var name = $("#name").val();
        var last_name = $("#last_name").val();
        
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        $.ajax({
            type:"POST",
            url:baseUrl+'/generate',
            data:{name:name, last_name:last_name},
            dataType:"json",
            success: function(data){
                var html = "";
                if(data.No){
                    $.notify({
                        // options
                        title: "Error!",
                        message:data.msg,
                    },{
                        // settings
                        type: 'danger'
                    });
                }else{
                    html += `<option value="">Seleccionar</option> `;
                    data.forEach(function(data){
                        html += `<option value="${data}">${data}</option> `;
                    });
                    $("#sugerencias").html(html);
                    $(".seccion-sugerencia").show();
                }
            },
            error: function(err){
                $(".seccion-sugerencia").hide();
                console.log(err);
            }
        });
    });

    $("#sugerencias").change(function(){
        valor = $(this).val();
        if(valor != ""){
            $("#nickname").val(valor);
            $("#email").val(valor);
            $("#password").val(valor + "*2020");
            $("#password_confirmation").val(valor + "*2020");
        }
    });

 });      


const types ={
    button: function(dato){
           var buttons='<div>';
            if(dato.id_status== 1){
               buttons += ` <button type="button" class="btn btn-sm btn-outline-secondary btn-edit" data-toggle="tooltip" title="Edit" value="${dato.id}"  ><i class="fa fa-edit"></i></button>
                            <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert delete-op" data-toggle="tooltip" title="Desactivated" data-type="confirm" value="${dato.id}"><i class="fa fa-window-close"></i></button>
               ` ;
          
           }else if(dato.id_status == 2){
               buttons  += `<button type="button" class="btn btn-sm btn-outline-success delete-op" title="Activated" data-toggle="tooltip" data-type="confirm" value="${dato.id}" ><i class="fa fa-check-square-o"></i></button>
                            <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert destroy-op" data-toggle="tooltip" title="Delete" data-type="confirm" value="${dato.id}"><i class="fa fa-trash-o"></i></button>`
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
        $('#btn-save').attr('disabled', false);
        var dato = data;
       
        switch(dato) {
            case 2:
                $.notify({
                    // options
                    title: "Error!",
                    message:data[0].name,
                },{
                    // settings
                    type: 'danger'
                });
            break;
        
            default:

                if(dato.emergency_contact_phone != null){
                    emergency_contact_phone = dato.emergency_contact_phone;
                }else{
                    emergency_contact_phone = "";
                }

                var operator = `<tr id="operator_id${dato.id}" class="rowType">
                    <td>${dato.id}</td>
                    <td>${dato.email}</td>
                    <td>${dato.name}</td>
                    <td>${dato.phone}</td>
                    <td>${emergency_contact_phone}</td>
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
                $("#btn_add").show();

                if ($('.rowType').length == 0) {
                    $('#table-row').show();
                }
            break;
        }
                
    },
    show: function(data){
        console.log(data);
        $('#tag_put').remove();
        $form = $('#formOperators');
        $form.append('<input type="hidden" id="tag_put" name="_method" value="PUT">');
        var baseUrl = $('#baseUrl').val();
        var rutaImage = baseUrl + '/images/operators/' + data.image;
          
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

        $('#email').val(data.email);
        $('#id_client').val(data.id_client);
        $('#id_client').trigger('change');
        $('#nickname').val(data.nickname);
        $('#id_hidden').val(data.id);
        $('#name').val(data.name);
        $('#last_name').val(data.last_name);
        $('#entrance_date').val(data.entrance_date);
        $('#address').val(data.address);
        $('#gender').val(data.gender);
        $('#phone').val(data.phone);
        $('#birthdate').val(data.birthdate);
        $('#emergency_contact_name').val(data.emergency_contact_name);
        $('#emergency_contact_phone').val(data.emergency_contact_phone);
        $('#notes').val(data.notes);
        $('#description').val(data.description);

       
    
    },
    deactivated:  function(data){
        console.log(data);
        var dato = data;
        if(dato.id_status != 0){

            if(dato.emergency_contact_phone != null){
                emergency_contact_phone = dato.emergency_contact_phone;
            }else{
                emergency_contact_phone = "";
            }
            var operator = `<tr id="operator_id${dato.id}">
                <td>${dato.id}</td>
                <td>${dato.email}</td>
                <td>${dato.name}</td>
                <td>${dato.phone}</td>
                <td>${emergency_contact_phone}</td>
                <td>${dato.birthdate}</td>
                <td class="hidden-xs">${types.status(dato)}</td>
                <td>${types.button(dato)}</td>
            </tr>`;
          
            $("#operator_id"+dato.id).replaceWith(operator);
            if(dato.id_status == 1){
                color ="#c3e6cb";
            }else if(dato.id_status == 2){
                color ="#ed969e";
            }
            $("#operator_id"+dato.id).css("background-color", color);  
            
        }else if(dato.id_status == 0){
            
            $("#operator_id"+dato.id).remove();
            if ($('.rowType').length == 0) {
                $('#table-row').show();
              }
        }
       
            
    },
        msj: function(data){
            $('#btn-save').attr('disabled', false);
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
       