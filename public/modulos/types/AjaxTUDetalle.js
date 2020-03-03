
$(document).ready(function(){
    var url = $('#url').val();
    var nameDeli='<a href="/types">Users Types</i></a> / <a href="'+url+'">Detail User Type</i></a>';
    $('.nameDeli').html(nameDeli);
    $('#sidebar1').addClass('active');  

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
        var formData ={
            data:types.datadetailactions(),
            id_menu:$("#id_menu").val(),
        } 
        
        
        //used to determine the http verb to use [add=POST], [update=PUT]
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var usertype_id = $('#usertype_id').val();
        var my_url = url;
        if (state == "update"){
            type = "PUT"; //for updating existing resource
            my_url += '/' + usertype_id;
        }
        
            console.log(formData);
        
            actions.edit_create(type,my_url,state,formData);
    
    });

    //delete product and remove it from TABLE list ***************************
    $(document).on('click','.delete-profile',function(){
        var privada_id = $(this).val();
        var my_url = url + '/' + privada_id;
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
     datadetailactions:function(){
        var select =[];
        $(".rw:checked").each(function () {
                var no=$(this).val();
                select.push(no);     
        });
        console.log(select);
        return JSON.stringify(select);
        
    },
}
const success = {

    new_update: function (data,state){
        console.log(data);
        var dato = data;
        var typename =$('#name').val();
        
        if(dato.no == 1){
            swal("Error", dato.msg, "error");
        }else{
            var product = "<button type='button' value="+dato.id+" id='optionmenu"+dato.id+"' class='btn btn-success delete-profile'><i class='fa fa-unlock'></i></button></h1>";
            $("#optionmenu"+dato.id).replaceWith(product);

            $('#myModal').modal('hide')
        }
        
    },

    deactivated:function(data) {
        location.reload();
       
    },

    show: function(data){
        console.log(data);
        $('#usertype_id').val(data.id);
        $('#id_menu').val(data.id_menu);
        var dato = '';
        $.each(data.ActionCat, function (index, da) {
            var dato2 = `<div class="form-check col-sm-6">
                            <label class="form-check-label">
                            <input type="checkbox" class="form-check-input rw" id="check${da.id}" value="${da.id}">${da.name}
                            </label>
                        </div>`;
            dato += dato2;
        });
        $('#mbody').html(dato);

        $.each(data.ActionDetail, function (index, de) {
            $("#check"+de.id).prop("checked", true);
        });

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



    
