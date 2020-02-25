
$(document).ready(function(){
    //get base URL *********************

    var nameDeli='<a href="/providers">Proveedores</i></a>';
    $('.nameDeli').html(nameDeli);  
    $('#sidebar2').addClass('active'); 
        
    var url = $('#url').val();
       
    $('#myTable').DataTable();

        //display modal form for creating new product *********************
        $('#btn_add').click(function(){
            $('#myModalLabel').html("Agregar Proveedor <i class='fa fa-users'></i>");
            $('#btn-save').val("add");
            $('#frmProviders').trigger("reset");
            $('#myModal').modal('show');
        });

        //display modal form for product EDIT ***************************
       $(document).on('click','#btn-edit',function(){
        $('#myModalLabel').html("Editar Proveedor <i class='fa fa-users'></i>");
        $('#myModal').modal('show');
        var provider_id = $(this).val();
        var my_url=url + '/' + provider_id;
        actions.show(my_url);
        });

            //create new product / update existing product ***************************
       $("#btn-save").click(function (e) {  
          
            e.preventDefault(); 
            var formData = {
                id_school: $('#id_school').val(),
                id_coffeeshop: $('#id_coffeeshop').val(),
                name: $('#name').val(),
                rfc: $('#rfc').val(),
                company: $('#company').val(),
                phone: $('#phone').val(),
                email: $('#email').val(),              
            }

            //used to determine the http verb to use [add=POST], [update=PUT]
            var state = $('#btn-save').val();
            var type = "POST"; //for creating new resource
            var provider_id = $('#provider_id').val();;
            var my_url = url;

            if (state == "update"){
                type = "PUT"; //for updating existing resource
                my_url=url + '/' + provider_id;
            }


              //Validate
           var email_validate = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
           var rfc_validate = /^[a-zA-Z]{3,4}(\d{6})((\D|\d){3})?$/;
           var phone_validate = /^[\(]?[\+]?(\d{2}|\d{3})[\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\*\.\-\s]){3}|(\d{2}[\*\.\-\s]){4}|(\d{4}[\*\.\-\s]){2})|\d{8}|\d{10}|\d{12}$/;

        //    if (!rfc_validate.test($('#rfc').val().trim())) 
        //    {
        //        swal({
        //            title: "Ingrese un RFC valido",
        //              type: "warning",
                     
                     
        //            });
        //        return false;
        //    }
           
          if (!phone_validate.test($('#phone').val().trim())) 
           {
               swal({
                   title: "Ingrese un telefono valido",
                     type: "warning",
                     text: "(Lada)Numero Telefonico"
                     
                   });
               return false;
           }
           else if (!email_validate.test($('#email').val().trim())) 
           {
               swal({
                   title: "Ingrese un correo valido",
                     type: "warning"
                     
                   });
               return false;
           } else {
            
            actions.edit_create(type,my_url,state,formData);
           }
        
        });

         //delete provider and remove it from TABLE list ***************************
        $(document).on('click','.deleteProvider',function(){
                var provider_id = $(this).val();
                var my_url = url + '/delete/' + provider_id;
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    }
                })
                swal({
                    title: "¿Desea eliminar este Proveedor",
                    text: "El Proveedor se eliminara permanentemente",
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
       $(document).on('click','.delete-provider',function(){

            var id = $(this).val();
            var my_url =url + '/' + id;
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            })
            if($(this).attr('class') == 'btn btn-sm btn-outline-success delete-provider')
            {
                title= "¿Deseas activar este proveedor?";
                text="El proveedor se activara";
                confirmButtonText="Activar";

                datatitle="Acitvado";
                datatext="activada";
                datatext2="Activacion";
            }
            else 
            {
                title= "¿Desea desactivar este proveedor?";
                text= "El proveedor se desactivara";
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
                swal(datatitle, "Proveedor "+datatext, "success");
                actions.deactivated(my_url);
                } 
                else {
                
                swal("Proveedor ", datatext2+" cancelada", "error");
            
                }
            });

       
        });


        
     
        

});

const provider={

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
                statu="<span class='badge badge-success'>Activo</span>";
                buttons += '<a class="btn btn-sm btn-outline-primary" data-toggle="tooltip" title="Ver insumos del proveedor" href="/supplies/'+dato.id+'"><i class="fa fa-cubes"></i></a>';
                buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="' +dato.id+'"  ><i class="fa fa-edit"></i></button>';
                buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   delete-provider" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-window-close"></i></button>';
            
            }else {
                statu="<span class='badge badge-secondary'>Inactivo</span>";
                buttons += ' <button type="button" class="btn btn-sm btn-outline-success delete-provider" title="Activar Categoria" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button>';
                buttons += ' <button type="button" class="btn btn-sm btn-outline-danger deleteProvider" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>';
            }
    
            return buttons;
    }



}


const success = {
    new_update: function (data,state){
        console.log(data)
        switch(data.No) {
            case 1:
                
                if(data.msg[0].name != ''){
                    $.notify({
                        // options
                        title: "Error!",
                        message:data.msg[0].name,
                    },{
                        // settings
                        type: 'danger'
                    });
                }

                if(data.msg[0].rfc != ''){
                    $.notify({
                        // options
                        title: "Error!",
                        message:data.msg[0].rfc,
                    },{
                        // settings
                        type: 'danger'
                    });
                }

                if(data.msg[0].email != ''){
                    $.notify({
                        // options
                        title: "Error!",
                        message:data.msg[0].email,
                    },{
                        // settings
                        type: 'danger'
                    });
                }
              
              break;
              default:
                var dato = data;
                console.log(dato.status);
                if (state == "add"){ //if user added a new record
                swal({
                    title: dato.name,
                    text: "Proveedor añadido",
                    type: "success",
                    button: "OK",
                });
                    
                var table = $('#myTable').DataTable();
                var rowNode= table.row.add( [
                        'PRO'+dato.id,
                        dato.name,
                        dato.name_school,
                        dato.name_coffee,
                        dato.rfc,
                        dato.company,
                        dato.phone,
                        dato.email,
                        provider.status(dato),
                        provider.buttons(dato),
                    ] ).draw().node().id = 'provider_id'+dato.id;
                   
                $('#provider_id'+dato.id).css("background-color", "#c3e6cb");
                $('#provider_id'+dato.id).find('td:eq(0)').addClass("hidden-md");
                $('#provider_id'+dato.id).find('td:eq(2)').addClass("hidden-md");
                $('#provider_id'+dato.id).find('td:eq(3)').addClass("hidden-md");
                $('#provider_id'+dato.id).find('td:eq(4)').addClass("hidden-md");
                $('#provider_id'+dato.id).find('td:eq(5)').addClass("hidden-xs");
                $('#provider_id'+dato.id).find('td:eq(6)').addClass("hidden-xs");
                $('#provider_id'+dato.id).find('td:eq(7)').addClass("hidden-md");
              
                }else{ //if user updated an existing record
                swal({
                    title: dato.name,
                    text: "Proveedor modificado",
                    type: "success",
                    button: "OK",
                });

                var edit = [
                    'PRO'+dato.id,
                    dato.name,
                    dato.name_school,
                    dato.name_coffee,
                    dato.rfc,
                    dato.company,
                    dato.phone,
                    dato.email,
                    provider.status(dato),
                    provider.buttons(dato),
                    ];
                    
                    $('#myTable').dataTable().fnUpdate(edit, $('tr#provider_id'+dato.id)[0]);
                    $('#provider_id'+dato.id).css("background-color", "#ffdf7e");
                    $('#provider_id'+dato.id).find('td:eq(0)').addClass("hidden-md");
                    $('#provider_id'+dato.id).find('td:eq(2)').addClass("hidden-md");
                    $('#provider_id'+dato.id).find('td:eq(3)').addClass("hidden-md");
                    $('#provider_id'+dato.id).find('td:eq(4)').addClass("hidden-md");
                    $('#provider_id'+dato.id).find('td:eq(5)').addClass("hidden-xs");
                    $('#provider_id'+dato.id).find('td:eq(6)').addClass("hidden-xs");
                    $('#provider_id'+dato.id).find('td:eq(7)').addClass("hidden-md");
                }
                $('#frmProviders').trigger("reset");
                $('#myModal').modal('hide');
            }
    },

    show: function(data){
         
        $('#provider_id').val(data.id);
        $('#id_school').val(data.id_school);
        $('#id_coffeeshop').val(data.id_coffeeshop);
        $('#name').val(data.name);
        $('#rfc').val(data.rfc);
        $('#company').val(data.company);
        $('#phone').val(data.phone);
        $('#email').val(data.email);
        $('#btn-save').val("update");
        $('#myModal').modal('show');
    },

    deactivated:  function(data){
        console.log(data);
        if(data.status == 0){
            $('#myTable').dataTable().fnDeleteRow('#provider_id' + data.id);

            $.notify({
                // options
                title: "Error!",
                message:"Se elimino correctamente",
            },{
                // settings
                type: 'danger'
            });
        }else if(data.status == 1 || data.status == 2){
            var dato=data;
            var edit = [
                'PRO'+dato.id,
                    dato.name,
                    dato.name_school,
                    dato.name_coffee,
                    dato.rfc,
                    dato.company,
                    dato.phone,
                    dato.email,
                    provider.status(dato),
                    provider.buttons(dato),
            ];

            $('#myTable').dataTable().fnUpdate(edit,$('tr#provider_id'+dato.id)[0]);
            if(dato.status==1){
                $('#provider_id'+dato.id).css("background-color", "#c3e6cb");
                $('#provider_id'+dato.id).find('td:eq(0)').addClass("hidden-md");
                $('#provider_id'+dato.id).find('td:eq(2)').addClass("hidden-md");
                $('#provider_id'+dato.id).find('td:eq(3)').addClass("hidden-md");
                $('#provider_id'+dato.id).find('td:eq(4)').addClass("hidden-md");
                $('#provider_id'+dato.id).find('td:eq(5)').addClass("hidden-xs");
                $('#provider_id'+dato.id).find('td:eq(6)').addClass("hidden-xs");
                $('#provider_id'+dato.id).find('td:eq(7)').addClass("hidden-md");
            }else{
                $('#provider_id'+dato.id).css("background-color", "#f2dede");
                $('#provider_id'+dato.id).find('td:eq(0)').addClass("hidden-md");
                $('#provider_id'+dato.id).find('td:eq(2)').addClass("hidden-md");
                $('#provider_id'+dato.id).find('td:eq(3)').addClass("hidden-md");
                $('#provider_id'+dato.id).find('td:eq(4)').addClass("hidden-md");
                $('#provider_id'+dato.id).find('td:eq(5)').addClass("hidden-xs");
                $('#provider_id'+dato.id).find('td:eq(6)').addClass("hidden-xs");
                $('#provider_id'+dato.id).find('td:eq(7)').addClass("hidden-md");
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