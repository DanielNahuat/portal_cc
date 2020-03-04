
$(document).ready(function(){
     
    
    var nameDeli='<a href="/clients">Clients</i></a>';
    $('.nameDeli').html(nameDeli);
    $('#sidebar10').addClass('active');  

    //get base URL *********************
    var url = $('#url').val();  

    //display modal form for creating new product *********************
    $('#btn_add').click(function(){
        $('#labelTitle').html("New Client  <i class='fa fa-plus'></i>");
        $(".formulario").show();
        $(".formulario_contacts").hide();
        $('#btn-save').val("add");
        $(".tableClient").hide();
        $('#btn_add').hide();
        $('#formClients').trigger("reset");
        $('#tag_put').remove();
    
    });

    $('.btn-cancel').click(function(){
        $('#labelTitle').html("Client  <i class='fa fa-briefcase'></i>");
        $(".formulario").hide();
        $(".tableClient").show();
        $('#btn_add').show();
        $(".formulario_contacts").hide();
        $('#formClients').trigger("reset");
        $('#tag_put').remove();
    
    });

    //Add Contacts
    $('#btn_add_contacts').click(function(){
        $('#labelTitle').html("Add Contacts  <i class='fa fa-plus'></i>");
        $(".formulario").hide();
        $(".formulario_contacts").show();
        $(".tableClient").hide();
        $('#btn_add').hide();
        $('#formClients').trigger("reset");
        $('#tag_put').remove();
    });


    //create new product / update existing product ***************************
    $("#formClients").on('submit',function (e) {
        console.log('button');
      
        e.preventDefault(); 
        var formData =  $("#formClients").serialize();
     

        //used to determine the http verb to use [add=POST], [update=PUT]
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var client_id = $('#client_id').val();
        var my_url = url;
        if (state == "update"){
            type = "PUT"; //for updating existing resource
            my_url += '/' + client_id;
            $('#myModal').modal('hide');
        }
            console.log(formData);
            actions.edit_create(type,my_url,state,formData);   
            $('#labelTitle').html("Client  <i class='fa fa-briefcase'></i>");
            $(".formulario").hide();
            $(".tableClient").show();
            $('#btn_add').show();
            $(".formulario_contacts").hide();
            $('#formClients').trigger("reset");
            $('#tag_put').remove();
    
    });

     //display modal form for product EDIT ***************************
     $(document).on('click','.btn-edit',function(){
        $('#labelTitle').html("Edit Client  <i class='fa fa-briefcase'></i>");
        $(".formulario").show();
        $(".formulario_contacts").hide();
        $('#btn-save').val("update");
        $(".tableClient").hide();
        $('#btn_add').hide();
        $('#formClients').trigger("reset");
        $('#tag_put').remove();

        var client_id = $(this).val();
        var my_url = url + '/' + client_id;

            actions.show(my_url);
       
    });

        $(document).on('click','.off-type',function(){
            var id = $(this).val();
            var my_url =url + '/' + id;
                $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            })
                if($(this).attr('class') == 'btn btn-sm btn-outline-success off-type')
                {
                    title= "Do you want to activate this client?";
                    text="The client will be activated";
                    confirmButtonText="Activate";

                    datatitle="Activated";
                    datatext="activated";
                    datatext2="Activation";
                }
                else 
                {
                    title= "Do you want to disable this client?";
                    text= "The client will be deactivated";
                    confirmButtonText="Deactivate";

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
                    swal(datatitle, "Client "+datatext, "success");
                    actions.deactivated(my_url);
                    } 
                    else {
                    
                    swal("Cancelled", datatext2+" cancelled", "error");
                
                    }
            });
        });

    //delete product and remove it from TABLE list ***************************
    $(document).on('click','.deleteSettings',function(){
        var privada_id = $(this).val();
        var my_url = url + '/delete/' + privada_id;
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


    //display modal form for product DETAIL ***************************
    $(document).on('click','.open_detail',function(){
        var settings_id = $(this).val();
       
        // Populate Data in Edit Modal Form
        $.ajax({
            type: "GET",
            url: url + '/' + settings_id,
            success: function (data) {
                console.log(data);
                $(".modal-body-detail").html(data);
                $('#myModal2').modal('show');
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
    });
    
});
const clients ={
    button: function(dato){
           var buttons='';
            if(dato.status== 1){
               buttons += ' <button type="button" class="btn btn-sm btn-outline-primary" title="Information" value="'+dato.id+'"> <i class="fa fa-info-circle"></i></li></button>';
               buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary btn-edit" title="Edit" value="'+dato.id+'"> <i class="fa fa-edit"></i></li></button>';
               buttons += '	<button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-type" title="Deactivated" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-window-close"></i></button>';
               buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary" title="Contacts" value="'+dato.id+'"> <i class="fa fa-book"></i> </button>';
               buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary" title="Documents" value="'+dato.id+'"> <i class="fa fa-folder-open"></i> </button>';
          
           }else if(dato.status == 2){
               buttons += ' <button type="button" class="btn btn-sm btn-outline-primary" title="Information" value="'+dato.id+'"> <i class="fa fa-info-circle"></i></li></button>';
               buttons += ' <button type="button" class="btn btn-sm btn-outline-success off-type" title="Activated" data-type="confirm" value="'+dato.id+'" > <i class="fa fa-check-square-o"></i></button>'
               buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert deleteSettings" title="Delete" data-type="confirm" value="'+dato.id+'"> <i class="fa fa-trash-o"></i> </button>';
               buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary" title="Contacts" value="'+dato.id+'"> <i class="fa fa-book"></i> </button>';
               buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary" title="Documents" value="'+dato.id+'"> <i class="fa fa-folder-open"></i> </button>';
           }
           return buttons;
    },
    status:function(dato){
        var status='';
        if(dato.status== 1){
            status +="<span class='badge badge-success'>Activated</span>";
        }else if(dato.status == 2){
            status +="<span class='badge badge-secondary'>Deactivated</span>";
        }
       return status;
    },
}
const success = {

    new_update: function (data,state){
        console.log(data);
        var dato = data;
        var clientname =$('#name').val();
        var type =$('#type').val();

        
        if(dato =='error en agregar datos.'){
            swal({
                title: "Datos Existentes",
                text: "El perfil: "+clientname+" ya existe",
                type: "warning",

              });
        }
        else{
            var client = `<tr id="client_id${dato.id}">
                                <td>${dato.name}</td>
                                <td>${dato.description}</td>
                                <td><span class="badge badge-secondary" style = "background:${dato.color}">&nbsp;&nbsp;&nbsp;</span></td>
                                <td></td>
                                <td class="hidden-xs">${clients.status(dato)}</td>
                                <td>${clients.button(dato)}</td>
                            </tr>`;
        
            if (state == "add"){ 
              $("#client-list").append(client);
              $("#client_id"+dato.id).css("background-color", "#c3e6cb");    
            }else{
              $("#client_id"+dato.id).replaceWith(client);
              $("#client_id"+dato.id).css("background-color", "#ffdf7e");  
            }

            $('#myModal').modal('hide')
        }
        
    },

    deactivated:function(data) {
        console.log(data);
        var dato = data;
        if(dato.status != 0){
            var client = `<tr id="client_id${dato.id}">
                                <td>${dato.name}</td>
                                <td>${dato.description}</td>
                                <td><span class="badge badge-secondary" style = "background:${dato.color}">&nbsp;&nbsp;&nbsp;</span></td>
                                <td></td>
                                <td class="hidden-xs">${clients.status(dato)}</td>
                                <td>${clients.button(dato)}</td>
                            </tr>`;
          
            $("#client_id"+dato.id).replaceWith(client);
            if(dato.status == 1){
                color ="#c3e6cb";
            }else if(dato.status == 2){
                color ="#ed969e";
            }
            $("#client_id"+dato.id).css("background-color", color); 

        }else if(dato.status == 0){
            $("#client_id"+dato.id).remove();
        }
       
    },

    show: function(data){
       
        console.log(data);
        $('#client_id').val(data.id_client);
        $('#name').val(data.name);
        $('#description').val(data.description);
        $('#color').val(data.color);
        $('#interval').val(data.interval);
        $('#duration').val(data.duration);
        $('#btn-save').val("update");
        $('#myModal').modal('show');
    },

    msj: function(data){
        console.log(data);
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



    
