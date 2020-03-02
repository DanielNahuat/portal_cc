getData(1);
$(document).ready(function(){
     
    
    var nameDeli='<a href="/settings">Settings</i></a>';
    $('.nameDeli').html(nameDeli);
    $('#sidebar10').addClass('active');  

    //get base URL *********************
    var url = $('#url').val();


    //display modal form for creating new product *********************
    $('#btn_add').click(function(){
        $('#btn-save').val("add");
        $('#settingsForm').trigger("reset");
        $("#image").attr('src','');
        $('#myModal').modal('show');
    });




    //display modal form for product EDIT ***************************
    $(document).on('click','.open_modal',function(){
        $('#settingsForm').trigger("reset");
        var settings_id = $(this).val();
        var my_url = url + '/' + settings_id;

            actions.show(my_url);
       
    });



    //create new product / update existing product ***************************
    $("#settingsForm").on('submit',function (e) {
        console.log('button');
      
        e.preventDefault(); 
        var formData =  $("#settingsForm").serialize();
        
        if($("#name").val().length > 30)
        {
            alert("Enter a name less than 30 characters");
            return false;
        }

        if($("#type").val().length > 30)
        {
            alert("Enter a type less than 30 characters");
            return false;
        }

        //used to determine the http verb to use [add=POST], [update=PUT]
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var settings_id = $('#settings_id').val();;
        var my_url = url;
        if (state == "update"){
            type = "POST"; //for updating existing resource
            my_url += '/' + settings_id;
        }
        
            console.log(formData);
        
            actions.edit_create(type,my_url,state,formData);
    
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
                    title= "Do you want to activate this option?";
                    text="The Option will be activated";
                    confirmButtonText="Activate";

                    datatitle="Activated";
                    datatext="activated";
                    datatext2="Activation";
                }
                else 
                {
                    title= "Do you want to disable this option?";
                    text= "The Option will be deactivated";
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
const types ={
    button: function(dato){
           var buttons='<div class="btn-group">';
            if(dato.status== 1){
               buttons += ' <button class="btn btn-secondary btn-detail open_modal"  data-toggle="tooltip" title="Editar nombre del Perfil"  value="'+dato.id+'"> <i class="fa fa-edit"></i></li></button>';
               buttons += '	<button type="button" class="btn btn-outline-danger off-type" title="Desactivar Usuario" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-window-close"></i></button>';
          
           }else if(dato.status == 2){
               buttons+='<button type="button" class="btn btn-outline-success off-type" title="Activar Usuario" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button>'
               buttons += '<button class="btn btn-danger btn-delete delete-profile" data-toggle="tooltip" title="Desactivar Perfil" value="'+dato.id+'"><i class="fa fa-trash-o"></i> </button>';
           }
           buttons+='</div>';
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
        var typename =$('#name').val();
        var type =$('#type').val();

        
        if(dato =='error en agregar datos.'){
            swal({
                title: "Datos Existentes",
                text: "El perfil: "+typename+" ya existe",
                type: "warning",

              });
        }
        else{
            var settings = `<tr id="settings_id${dato.id}">
                                <td>${dato.id}</td>
                                <td>${dato.name}</td>
                                <td>${dato.type}</td>
                                <td class="hidden-xs">${types.status(dato)}</td>
                                <td>${types.button(dato)}</td>
                            </tr>`;
        
            if (state == "add"){ 
              $("#settings-list").append(settings);
              $("#settings_id"+dato.id).css("background-color", "#c3e6cb");    
            }else{
              $("#settings_id"+dato.id).replaceWith(settings);
              $("#settings_id"+dato.id).css("background-color", "#ffdf7e");  
            }

            $('#myModal').modal('hide')
        }
        
    },

    deactivated:function(data) {
        console.log(data);
        var dato = data;
        if(dato.status != 0){
            var profile = `<tr id="settings_id${dato.id}">
                                <td>${dato.id}</td>
                                <td>${dato.name}</td>
                                <td>${dato.type}</td>
                                <td class="hidden-xs">${types.status(dato)}</td>
                                <td>${types.button(dato)}</td>
                            </tr>`;
          
            $("#settings_id"+dato.id).replaceWith(profile);
            if(dato.status == 1){
                color ="#c3e6cb";
            }else if(dato.status == 2){
                color ="#ed969e";
            }
            $("#settings_id"+dato.id).css("background-color", color); 

        }else if(dato.status == 0){
            $("#settings_id"+dato.id).remove();
        }
       
    },

    show: function(data){
        console.log(data);
        $('#settings_id').val(data.id);
        $('#name').val(data.name);
        // $('#typeUserImageUpdate').val(data.typeUserImage);
        // $('#image').attr('src','/images/typeUsers/'+data.typeUserImage);
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



    
