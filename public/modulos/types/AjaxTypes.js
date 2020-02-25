
$(document).ready(function(){
     
    
    var nameDeli='<a href="/types">Perfiles</i></a>';
    $('.nameDeli').html(nameDeli);
    $('#sidebar10').addClass('active');  

    //get base URL *********************
    var url = $('#url').val();


    //display modal form for creating new product *********************
    $('#btn_add').click(function(){
        $('#btn-save').val("add");
        $('#typeUserForm').trigger("reset");
        $("#image").attr('src','');
        $('#myModal').modal('show');
    });




    //display modal form for product EDIT ***************************
    $(document).on('click','.open_modal',function(){
        $('#typeUserForm').trigger("reset");
        var usertype_id = $(this).val();
        var my_url = url + '/' + usertype_id;

            actions.show(my_url);
       
    });



    //create new product / update existing product ***************************
    $("#typeUserForm").on('submit',function (e) {
        console.log('button');
      
        e.preventDefault(); 
        var formData =  $("#typeUserForm").serialize();
        
        if($("#name").val().length > 30)
        {
            alert("Ingrese un nombre menor a 30 caracteres");
            return false;
        }

        //used to determine the http verb to use [add=POST], [update=PUT]
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var usertype_id = $('#usertype_id').val();;
        var my_url = url;
        if (state == "update"){
            type = "POST"; //for updating existing resource
            my_url += '/' + usertype_id;
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
                if($(this).attr('class') == 'btn btn-outline-success off-type')
                {
                    title= "¿Deseas activar este Usuario?";
                    text="El Usuario se activara";
                    confirmButtonText="Activar";

                    datatitle="Activado";
                    datatext="activado";
                    datatext2="Activacion";
                }
                else 
                {
                    title= "¿Desea desactivar este Usuario?";
                    text= "El Usuario se desactivara";
                    confirmButtonText="Desactivar";

                    datatitle="Desactivado";
                    datatext="desactivado";
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
                    swal(datatitle, "Usuario "+datatext, "success");
                    actions.deactivated(my_url);
                    } 
                    else {
                    
                    swal("Cancelado", datatext2+" cancelada", "error");
                
                    }
            });
        });

    //delete product and remove it from TABLE list ***************************
    $(document).on('click','.delete-profile',function(){
        var privada_id = $(this).val();
        var my_url = url + '/delete/' + privada_id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        swal({
            title: "¿Desea eliminar este Usuario?",
            text: "El usuario se eliminara permanentemente",
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


    //display modal form for product DETAIL ***************************
    $(document).on('click','.open_detail',function(){
        var usertype_id = $(this).val();
       
        // Populate Data in Edit Modal Form
        $.ajax({
            type: "GET",
            url: url + '/' + usertype_id,
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
    button: function(data){
           var buttons='<div class="btn-group perfilCard">';
            if(data.status== 1){
               buttons += '<a class="btn btn btn-info btn-detail" data-toggle="tooltip" title="Otorgar permisos de Perfil" href="/assignmenttype/' + data.id + '"> <i class="fa fa-list"></i></a>';
               buttons += ' <button class="btn btn-secondary btn-detail open_modal"  data-toggle="tooltip" title="Editar nombre del Perfil"  value="'+data.id+'"> <i class="fa fa-edit"></i></li></button>';
               buttons += '	<button type="button" class="btn btn-outline-danger off-type" title="Desactivar Usuario" data-type="confirm" value="'+data.id+'" ><i class="fa fa-window-close"></i></button>';
          
           }else if(data.status == 2){
               buttons+='<button type="button" class="btn btn-outline-success off-type" title="Activar Usuario" data-type="confirm" value="'+data.id+'" ><i class="fa fa-check-square-o"></i></button>'
               buttons += '<button class="btn btn-danger btn-delete delete-profile" data-toggle="tooltip" title="Desactivar Perfil" value="'+data.id+'"><i class="fa fa-trash-o"></i> </button>';
           }
           buttons+='</div></div></div></div>';
           return buttons;
    },
}
const success = {

    new_update: function (data,state){
        console.log(data);
        var typename =$('#name').val();
        
        if(data =='error en agregar datos.'){
            swal({
                title: "Datos Existentes",
                text: "El perfil: "+typename+" ya existe",
                type: "warning",

              });
        }
        else{
            var profile = '<div id="usertype_id'+data.id+'" class="card col-lg-3 col-md-6 col-sm-12 text-blue img-thumbnail text-center cardstypes mx-auto"><div class="card-body text-center"><div class="card-header"><h4 class="card-title" style="color:#17A2B8;">'+data.name+'<br>';
            profile += '<span class="badge badge-success card-text">Activo</span></h4>';
            profile += types.button(data);
        
            if (state == "add"){ 
             
              $("#products-list").append(profile);
                   
            }else{
              $("#usertype_id"+data.id).replaceWith(profile);
            }

            $('#myModal').modal('hide')
        }
        
    },

    deactivated:function(data) {
        console.log(data);
        if(data.status != 0){

            if(data.status == 1){
                var profile = '<div id="usertype_id'+data.id+'" class="card col-lg-3 col-md-6 col-sm-12 text-blue img-thumbnail text-center cardstypes mx-auto"><div class="card-body text-center"><div class="card-header"><h4 class="card-title" style="color:#17A2B8;">'+data.name+'<br>';
                profile += '<span class="badge badge-success card-text">Activo</span></h4>';
                profile += types.button(data);
                
            }else if(data.status == 2){
                var profile = '<div id="usertype_id'+data.id+'" class="card col-lg-3 col-md-6 col-sm-12 text-blue img-thumbnail text-center cardstypes mx-auto"><div class="card-body text-center"><div class="card-header"><h4 class="card-title" style="color:#17A2B8;">'+data.name+'<br>';
                profile += '<span class="badge badge-secondary card-text">Inactivo</span></h4>';
                profile += types.button(data);
            }
        
            $("#usertype_id"+data.id).replaceWith(profile);

        }else if(data.status == 0){
            $("#usertype_id"+data.id).remove();
        }
       
    },

    show: function(data){
        console.log(data);
        $('#usertype_id').val(data.id);
        $('#name').val(data.name);
        $('#typeUserImageUpdate').val(data.typeUserImage);
        $('#image').attr('src','/images/typeUsers/'+data.typeUserImage);
        $('#btn-save').val("update");
        $('#myModal').modal('show');
    },

    msj: function(data){
        console.log(data);
      
        swal({
            title: "Error!",
            text: data.responseJSON.errors.name[0],
            type: "error",
          });

    },
}



    
