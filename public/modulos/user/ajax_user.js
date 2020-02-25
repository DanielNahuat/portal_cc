
var url = $('#url').val();
var baseUrl = $('#baseUrl').val();
$(document).ready(function(){
    //get base URL *********************
        
        var nameDeli='<a href="/school">Escuelas</i></a>';
        var radioState;
        $('.nameDeli').html(nameDeli);  
        $('#sidebar11').addClass('active'); 
        $('#myTable').DataTable();
        $(".pass").hide();
        $('.stage').hide();
        $('#id_stage').attr('disabled','disabled');
        $('.cafeteria').hide();
        $('#id_cafeteria').attr('disabled','disabled');


        function disablePassInput()
        {
            $('#password').attr('disabled','disabled');
            $('#confirm_password').attr('disabled','disabled');
        }

        function enablePassInput()
        {
            $('#password').removeAttr('disabled');
            $('#confirm_password').removeAttr('disabled');
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
    
    
        //display modal form for creating new product *********************
        $('#btn_add').click(function(){
            $('#myModalLabel').html("Agregar Usuario  <i class='fa fa-tasks'></i>");
            enablePassInput()
            $('#tag_put').remove();
            $('.stage').hide();
            $('.cafeteria').hide();
            $('#btn-save').val("add");
            $('#userForm').trigger("reset");
            $(".pass").show();
            $(".show_pass_div").hide();
            $('#myModal').modal('show');
        
        });

        $('#id_profile').change(function(){

            $('#id_cafeteria').attr('disabled','disabled');
            $('#id_stage').attr('disabled','disabled');

            if($(this).val() == 4)
            {
                $('.stage').show();
                $('.cafeteria').hide();
                $('#id_stage').removeAttr('disabled');
                
            }
            else if(($(this).val() == 5 | $(this).val() == 6))
            {
                $('.cafeteria').show();
                $('.stage').hide();
                $('#id_cafeteria').removeAttr('disabled');
            }
            else
            {
                $('.stage').hide();
                $('.cafeteria').hide();
            }
           

        });

        $(document).on('click','#abonar-qr',function(){
            var id_user = $(this).val();
            $("#id_qr_modal").val(id_user);
            var my_url= baseUrl + '/getUserCoins/' + id_user;
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            })
            // Populate Data in Edit Modal Form
            $.ajax({
                type: "GET",
                url:my_url,
                success: function (data) {
                    // success.show(data,action);
                    $('.total_coins_modal').text(data);

                },
                error: function (data) {
                    console.log('Error:', data);
                }
            });
            $("#user").val(id_user);
            $("#mm").modal('show');
            $("#form_abono").trigger('reset');
            $("#inputGroup-sizing-sm").html("+");
            $('#btn-save-abono').val('add');
            $(".seccion-devolver").hide();
            $(".seccion-abonar").show();
        });
        
    
    
        //display modal form for product EDIT ***************************
        $(document).on('click','#btn-edit',function(){
            $('#myModalLabel').html("Editar Usuario <i class='fa fa-tasks'></i>");
            $('#userForm').trigger("reset");
            disablePassInput()
            $('#tag_put').remove();
            $form = $('#userForm');
            $form.append('<input type="hidden" id="tag_put" name="_method" value="PUT">');
            $('#myModal').modal('show');
            $(".show_pass_div").show();
            $(".pass").hide();
            var id_user = $(this).val();
            $('#id_user').val(id_user);
            var my_url= baseUrl + '/user/' + id_user;
            actions.show(my_url);
        });

            //create new product / update existing product ***************************
        $("#userForm").on('submit',function (e) {
            
            e.preventDefault(); 
            var stageArray=[];
            var formData = new FormData(this);
            var id_user = $('#id_user').val();
            var state = $('#btn-save').val();
            var type = "POST"; //for creating new resource
            var my_url = baseUrl+'/users';
            if (state == "update")
            {
                my_url=baseUrl + '/users/' + id_user;
            }

            actions.edit_create(type,my_url,state,formData,'file');
                        
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
            $('#btn-save-abono').val('add');
        }else if(valor == 3){
            $("#lblFlag").html("Cantidad a Devolver");
            $("#inputGroup-sizing-sm").html("-");
            $('#btn-save-abono').val('refund');
        }
    });

    $("#form_abono").on('submit',function (e) {
        
        var action = $('#btn-save-abono').val();
        e.preventDefault();
        var user_id = $('#user').val();
        var formData = new FormData(this);
        if(action === 'add')
        {
            var type = "POST"; //for updating existing resource
            var my_url = baseUrl + '/users/addCoins/' + user_id;
        }
        else if(action === 'refund')
        {
            var type = "POST"; //for updating existing resource
            var my_url = baseUrl + '/users/refundCoins/' + user_id;
        }

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })       
        $.ajax({
            type: type,
            url: my_url,
            data: formData,
            dataType: 'json',
            contentType: false,       
            cache: false,             
            processData:false, 
            success: function (data) {
                $.notifyClose();
                $.notify({
                    // options
                    title: "Correcto!",
                    message:'Abono agregado correctamente',
                },{
                    // settings
                    type: 'success'
                });
                $('.total_coins_modal').text(data);
                $("#form_abono").trigger('reset');
                $(".seccion-devolver").hide();
                $(".seccion-abonar").show();
                $("#mm").modal('hide');
            
            },
            error: function (data) {
                success.msj(data);
                
                $("#form_abono").trigger('reset');
                $(".seccion-devolver").hide();
                $(".seccion-abonar").show();
                $("#mm").modal('hide');
                

            }
            }); 

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


     
 const category={
    status: function (dato){
        if(dato.user.id_status== 1){
            statu="<span class='badge badge-success'>Activo</span>";
    
        }else{
            statu="<span class='badge badge-secondary'>Inactivo</span>";
        }
    
        return statu;
        },
    buttons:function(dato){
        var buttons='';
// console.log(dato)
        if(dato.user.id_status== 1){
            statu="<span class='badge badge-success'>Activo</span>";
            if(dato.user.id_profile == 3 || dato.user.id_profile == 4 || dato.user.id_profile == 4  && dato.authUser.id_profile == 2)  buttons += ' <button class="btn btn-sm btn-outline-success open_modal" id="abonar-qr" title="Abonar" value="'+dato.user.id+'"><i class="fa fa-money"></i></button>'
            // buttons += '<a class="btn btn-sm btn-outline-info" title="Usuarios" id="" href="'+baseUrl+'/users/'+dato.id+'"  ><i class="icon-users"></i></a>';
            buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Editar Categoria" id="btn-edit" value="' +dato.user.id+'"  ><i class="fa fa-edit"></i></button>';
            buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   delete-category" title="Desactivar Categoria" data-type="confirm" value="'+dato.user.id+'"><i class="fa fa-window-close"></i></button>';
        
        }else {
            statu="<span class='badge badge-secondary'>Inactivo</span>";
            buttons += ' <button type="button" class="btn btn-sm btn-outline-success delete-category" title="Activar Categoria" data-type="confirm" value="'+dato.user.id+'" ><i class="fa fa-check-square-o"></i></button>';
            buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   deleteCategory" title="Eliminar Categoria" data-type="confirm" value="'+dato.user.id+'"><i class="fa fa-trash-o"></i></button>'
        }

        return buttons;
    }

}
 


const success = { 
    new_update: function (data,state){
            console.log(data);
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
                  default:
                    var dato = data;
                    if (state == "add"){ //if user added a new record
                    swal({
                        title: dato.user.name,
                        text: "Usuario añadido",
                        type: "success",
                        button: "OK",
                    });
                        
                    var table = $('#myTable').DataTable();
                    var rowNode= table.row.add( [
                            dato.user.profile.name,
                            dato.user.name,
                            dato.user.email,
                            dato.user.phone,
                            category.status(dato),
                            category.buttons(dato),
                        ] ).draw().node().id = 'user_id'+dato.user.id;
                
                    $('#user_id'+dato.user.id).css("background-color", "#c3e6cb");
                    $('#user_id'+dato.user.id).find('td:eq(0)').addClass("hidden-xs");
                    $('#user_id'+dato.user.id).find('td:eq(2)').addClass("hidden-xs");
                    
                    }else{ //if user updated an existing record
                    swal({
                        title: dato.name,
                        text: "Usuario modificado",
                        type: "success",
                        button: "OK",
                    });

                    var edit = [
                        dato.user.profile.name,
                        dato.user.name,
                        dato.user.email,
                        dato.user.phone,
                        category.status(dato),
                        category.buttons(dato),
                        ];
                        
                        $('#myTable').dataTable().fnUpdate(edit,$('tr#user_id'+dato.user.id)[0]);
                        $('#user_id'+dato.user.id).css("background-color", "#ffdf7e");
                    }
                    $('#userForm').trigger("reset");
                    $('#myModal').modal('hide');
                }
        },
    show: function(data){
        // console.log(data.stages);
        // $('#school_id').val(data.id);
        $('#name').val(data.name);
        $('#surname').val(data.surname);
        $('#lastname').val(data.lastname);
        $('#address').val(data.address);
        $('#phone').val(data.phone);
        $('#email').val(data.email);
        $('#id_profile').val(data.id_profile);
        if(data.id_profile == 4)
        {
            $('.stage').show();
            $('#id_stage').removeAttr('disabled');
            $('#id_stage').val(data.id_stage);
        }
        else if(data.id_profile == 5 | data.id_profile == 6)
        {
            $('.cafeteria').show();
            $('#id_cafeteria').removeAttr('disabled');
            $('#id_cafeteria').val(data.id_cafeteria);
        }
        else
        {
            $('.stage').hide();
            $('#id_stage').attr('disabled','disabled');

        }
        $.each(data.stages, function( index, value ) {
            // console.log(value);
            // alert( index + ": " + value );
            $("#"+value).prop("checked",true);
        });
        // $("#Primaria").prop("checked",data.primaria);
        // $("#Secundaria").prop("checked",data.secundaria);
        // $("#Preparatoria").prop("checked",data.preparatoria);
        // $("#Universidad").prop("checked",data.universidad);
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
       