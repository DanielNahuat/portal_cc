
$(document).ready(function(){
     
    
    var nameDeli='<a href="/clients">Clients</i></a>';
    $('.nameDeli').html(nameDeli);
    $('#sidebar10').addClass('active');  

    //get base URL *********************
    var url = $('#url').val();  

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })

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
        $('#labelTitle').html("Clients  <i class='fa fa-briefcase'></i>");
        $(".formulario").hide();
        $(".tableClient").show();
        $('#btn_add').show();
        $(".formulario_contacts").hide();
        $('#formClients').trigger("reset");
        $('#tag_put').remove();
    
    });

    //Add Contacts
    $('.btn_add_contacts').click(function(){
        $('#labelTitle').html("Add Contacts  <i class='fa fa-plus'></i>");
        $(".formulario").hide();
        $(".formulario_contacts").show();
        $(".tableClient").hide();
        $('#btn_add').hide();
        $('#formContacts').trigger("reset");

        var id = $(this).val();
        $('#tag_put').remove();
        $('#client_id_contacts').val(id);
        //Show the contacts table
        var my_url = url + '/contacts/show/' + id;
        actions.show(my_url)


    });

    $('.btn-cancel-contacts').click(function(){
        $('#labelTitle').html("Clients  <i class='fa fa-briefcase'></i>");
        $(".formulario").hide();
        $(".tableClient").show();
        $('#btn_add').show();
        $(".formulario_contacts").hide();
        $('#formContacts').trigger("reset");
        $('#tag_put').remove();
    });


    //Create Clients
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

    //Create Contacts for Clients
    $("#formContacts").on('submit',function (e) {
        console.log('button');
      
        e.preventDefault(); 
        var formData =  $("#formContacts").serialize();

        //used to determine the http verb to use [add=POST], [update=PUT]
        var state = $('#btn-save-contacts').val();
        var type = "POST"; //for creating new resource
        var client_id_contacts = $('#client_id_contacts').val();
        console.log(client_id_contacts);
        var my_url = url + '/contacts';
        if (state == "update"){
            type = "PUT"; //for updating existing resource
            my_url += '/';
            $('#myModal').modal('hide');
        }
            console.log(formData);
            actions.edit_create(type,my_url,state,formData);   
            $('#labelTitle').html("Clients  <i class='fa fa-briefcase'></i>");
            $(".formulario").hide();
            $(".tableClient").show();
            $('#btn_add').show();
            $(".formulario_contacts").hide();
            $('#formContacts').trigger("reset");
            $('#tag_put').remove();
    });

    //Modal of Documents
    $('.open-documents').click(function(){
        $('#formContacts').trigger("reset");
        $('#formClients').trigger("reset");

        // $("#image").attr('src','');
        $('#modalDocuments').modal('show');
        var id = $(this).val();
        $('#client_id_document').val(id);
        var my_url = url + '/document/show/' + id;
        actions.show(my_url)

    });

    $('.close-documents').click(function(){
        $('#doc').trigger("reset");

        $('#modalDocuments').modal('hide');

    });

    //Create documents
    $("#formDocuments").on('submit',function (e) {
        console.log('button');
      
        e.preventDefault(); 
        // $('#btn-save-documents').attr('disabled', true);
        
        var formData = new FormData(this);
        // var formData = $("#formOperators").serialize();
        var state = $('#btn-save-documents').val();
        var id = $('#client_id_document').val();
        var type = "POST"; //for creating new resource
        var my_url = url + '/document/' + id;
        var file = "file";
        if (state == "update"){
            type = "POST"; //for updating existing resource
            my_url += '/' + id;
        }
        actions.edit_create(type,my_url,state,formData, file);
    });
    


    //Edit Client
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

    //Activate or Deactivated
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

    //Delete Client
    $(document).on('click','.deleteClient',function(){
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

    
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Constante Buttons para la tabla Clientes
const clients ={
    button: function(dato){
           var buttons='';
            if(dato.status== 1){
              
               buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary btn-edit" data-toggle="tooltip" title="Edit" value="'+dato.id+'"> <i class="fa fa-edit"></i></li></button>';
               buttons += '	<button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-type" data-toggle="tooltip" title="Deactivated" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-window-close"></i></button>';
               buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary btn_add_contacts" data-toggle="tooltip" title="Contacts" value="'+dato.id+'"> <i class="fa fa-users"></i> </button>';
               buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="tooltip" title="Documents" value="'+dato.id+'"> <i class="fa fa-folder-open"></i> </button>';
          
           }else if(dato.status == 2){
             
               buttons += ' <button type="button" class="btn btn-sm btn-outline-success off-type" data-toggle="tooltip" title="Activated" data-type="confirm" value="'+dato.id+'" > <i class="fa fa-check-square-o"></i></button>'
               buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert deleteClient" data-toggle="tooltip" title="Delete" data-type="confirm" value="'+dato.id+'"> <i class="fa fa-trash-o"></i> </button>';
               buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary btn_add_contacts" data-toggle="tooltip" title="Contacts" value="'+dato.id+'"> <i class="fa fa-users"></i> </button>';
               buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary" data-toggle="tooltip" title="Documents" value="'+dato.id+'"> <i class="fa fa-folder-open"></i> </button>';
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
//Constante Buttons para la tabla de Contactos

const contacts ={
    button: function(dato){
           var buttons='';
            if(dato.status== 1){
              
               buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary btn-edit-contact" data-toggle="tooltip" title="Edit" value="'+dato.id+'"> <i class="fa fa-edit"></i></li></button>';
               buttons += '	<button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-type-contact" data-toggle="tooltip" title="Deactivated" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-window-close"></i></button>';
          
           }else if(dato.status == 2){
             
               buttons += ' <button type="button" class="btn btn-sm btn-outline-success off-type-contact" data-toggle="tooltip" title="Activated" data-type="confirm" value="'+dato.id+'" > <i class="fa fa-check-square-o"></i></button>'
               buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert deleteContact" data-toggle="tooltip" title="Delete" data-type="confirm" value="'+dato.id+'"> <i class="fa fa-trash-o"></i> </button>';
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

            var client = `<tr id="client_id${dato.id}">
                                <td><span class="badge badge-secondary" style = "background:${dato.color}">&nbsp;&nbsp;&nbsp;</span></td>
                                <td>${dato.name}</td>
                                <td>${dato.description}</td>
                                <td>${dato.interval}</td>
                                <td>${dato.duration}</td>
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
        
    },

    deactivated:function(data) {
        console.log(data);
        var dato = data;
        if(dato.status != 0){
            var client = `<tr id="client_id${dato.id}">
                                <td><span class="badge badge-secondary" style = "background:${dato.color}">&nbsp;&nbsp;&nbsp;</span></td>
                                <td>${dato.name}</td>
                                <td>${dato.description}</td>
                                <td>${dato.interval}</td>
                                <td>${dato.duration}</td>
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

    show: function(dato){
        switch (dato.flag) {
            case 1:
                 var data = dato.client;
                console.log(data);
                $('#client_id').val(data.id_client);
                $('#name').val(data.name);
                $('#description').val(data.description);
                $('#color').val(data.color);
                $('#interval').val(data.interval);
                $('#duration').val(data.duration);
                $('#btn-save').val("update");
                $('#myModal').modal('show');
             
            case 2:
                var contact = "";
                dato.contact.forEach(function(data){
                    contact += `
                   
                        <tr id="client_id${data.id}">
                            <td>${data.name}</td>
                            <td>${data.description}</td>
                            <td>${data.phone}</td>
                            <td>${data.email}</td>
                            <td class="hidden-xs">${contacts.status(data)}</td>
                            <td>${contacts.button(data)}</td>
                        </tr>
                        `;
                })
                $('#contact-list').html(contact);
        
            case 3:
            
            var document = "";
            dato.document.forEach(function(data){
                document += `
               
                    <tr id="client_id${data.id}">
                        <td>${data.name}</td>

                    </tr>
                    `;
            })
            $('#document-list').html(document);
              
          }
    
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



    
