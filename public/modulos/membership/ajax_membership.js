var baseUrl = $('#baseUrl').val();
$(document).ready(function(){
    //get base URL *********************
        
    var nameDeli='<a href="/categories">Categorias</i></a>';
    $('.nameDeli').html(nameDeli);  
    $('#sidebar13').addClass('active'); 
    var url = $('#url').val();
    // var baseUrl = $('#baseUrl').val();
    
    $('#myTable').DataTable();
    $('.schoolDiv').hide();
    $('.membershipDiv').hide();
       
        
    //display modal form for creating new product *********************
    $('#btn_add').click(function(){
        $('#myModalLabel').html("Agregar Membresias  <i class='fa fa-tasks'></i>");
        $('#tag_put').remove();
        $('.schoolDiv').show();
        $('.membershipDiv').show();
        $('#btn-save').val("add");
        $('#membershipForm').trigger("reset");
        $('#myModal').modal('show');
    });

           
        
       
    //display modal form for product EDIT ***************************
    $(document).on('click','#btn-edit',function(){
        $('#myModalLabel').html("Editar Tipo de Membresia <i class='fa fa-tasks'></i>");
        $('#membershipForm').trigger("reset");
        $('.schoolDiv').hide();
        $('#tag_put').remove();
        $form = $('#membershipForm');
        $form.append('<input type="hidden" id="tag_put" name="_method" value="PUT">');
        $('#myModal').modal('show');
        var membership_id = $(this).val();
        console.log(membership_id)
        $('#id_membership').val(membership_id);
        var my_url=baseUrl + '/membership/' + membership_id;
        actions.show(my_url);
    });
       
       
       
    //create new product / update existing product ***************************
    $("#membershipForm").on('submit',function (e) {
        
        e.preventDefault(); 
        var formData = new FormData(this);
        var membership_id = $('#id_membership').val();
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var my_url = baseUrl+'/membership';
        if (state == "update")
        {
            my_url=baseUrl + '/membership/' + membership_id;
        }

        actions.edit_create(type,my_url,state,formData,'file');
                    
    });
    
    //delete category and remove it from TABLE list ***************************
    $(document).on('click','.deleteCategory',function(){
        var id = $(this).val();
        var my_url = baseUrl + '/membership/delete/' + id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        swal({
            title: "¿Desea eliminar el registro de membresia",
            text: "La membresia se eliminara permanentemente",
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
        var my_url =baseUrl + '/membership/' + id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        if($(this).attr('class') == 'btn btn-sm btn-outline-success delete-category')
        {
            title= "¿Deseas activar esta membresia?";
            text="La membresia se activara";
            confirmButtonText="Activar";

            datatitle="Acitvado";
            datatext="activada";
            datatext2="Activacion";
        }
        else 
        {
            title= "¿Desea desactivar esta membresia?";
            text= "La membresia se desactivara";
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
            swal(datatitle, "membresia "+datatext, "success");
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
                if(dato.id_status== 1){
                    statu="<span class='badge badge-success'>Activo</span>";
            
                }else{
                    statu="<span class='badge badge-secondary'>Inactivo</span>";
                }
            
                return statu;
                },
            buttons:function(dato){
                var buttons='';
        // console.log(dato)
                if(dato.id_status== 1){
                    statu="<span class='badge badge-success'>Activo</span>";
                    // buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Editar Membresia" id="btn-edit" value="' +dato.id+'"  ><i class="fa fa-edit"></i></button>';
                    buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   delete-category" title="Desactivar Categoria" data-type="confirm" value="'+dato.id+'"><i class="fa fa-window-close"></i></button>';
                
                }else {
                    statu="<span class='badge badge-secondary'>Inactivo</span>";
                    // buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Editar Membresia" id="btn-edit" value="' +dato.id+'"  ><i class="fa fa-edit"></i></button>';
                    // buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   deleteCategory" title="Eliminar Escuela" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>'
                    buttons += '<button type="button" class="btn btn-sm btn-outline-success delete-category" title="Activar Membresia" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button>';

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
                                title: dato.name,
                                text: "Membresia añadida",
                                type: "success",
                                button: "OK",
                            });
                                
                            var table = $('#myTable').DataTable();
                            var rowNode= table.row.add( [
                                    dato.id,
                                    dato.school.name,
                                    dato.type_membership.name,
                                    dato.date_start,
                                    dato.date_end,
                                    category.status(dato),
                                    category.buttons(dato),
                                ] ).draw().node().id = 'membership_id'+dato.id;
                        
                            $('#membership_id'+dato.id).css("background-color", "#c3e6cb");
                            $('#membership_id'+dato.id).find('td:eq(0)').addClass("hidden-xs");
                            $('#membership_id'+dato.id).find('td:eq(2)').addClass("hidden-xs");
                            
                            }else{ //if user updated an existing record
                            swal({
                                title: dato.name,
                                text: "Categoria modificada",
                                type: "success",
                                button: "OK",
                            });
    
                            var edit = [
                                dato.id,
                                dato.school.name,
                                dato.type_membership.name,
                                dato.date_start,
                                dato.date_end,
                                category.status(dato),
                                category.buttons(dato),
                                ];
                                
                                $('#myTable').dataTable().fnUpdate(edit,$('tr#membership_id'+dato.id)[0]);
                                $('#membership_id'+dato.id).css("background-color", "#ffdf7e");
                            }
                            $('#membershipForm').trigger("reset");
                            $('#myModal').modal('hide');
                        }
                },
            show: function(data){
                $('#id_type_membership').val(data.type_membership.id);
                $('#btn-save').val("update");
                $('#myModal').modal('show');
            },
            deactivated:  function(data){
                console.log(data);
                if(data.id_status == 0){
                    $('#myTable').dataTable().fnDeleteRow('#membership_id' + data.id);
    
                    $.notify({
                        // options
                        title: "Error!",
                        message:"Se elimino correctamente",
                    },{
                        // settings
                        type: 'danger'
                    });
                }else if(data.id_status == 1 || data.id_status == 2){
                    var dato=data;
                    var edit = [
                        // dato.mat+dato.id,
                        // dato.name,
                        dato.id,
                        dato.school.name,
                        dato.type_membership.name,
                        dato.date_start,
                        dato.date_end,
                        category.status(dato),
                        category.buttons(dato),
                    ];
    
                    $('#myTable').dataTable().fnUpdate(edit,$('tr#membership_id'+dato.id)[0]);
                    if(dato.status==1){
                        $('#membership_id'+dato.id).css("background-color", "#c3e6cb");
                    }else{
                        $('#membership_id'+dato.id).css("background-color", "#f2dede");
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