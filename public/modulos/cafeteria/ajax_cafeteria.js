
var url = $('#url').val();
var baseUrl = $('#baseUrl').val();
$(document).ready(function(){
    //get base URL *********************
        
        var nameDeli='<a href="/categories">Categorias</i></a>';
        var radioState;
        $('.nameDeli').html(nameDeli);  
        $('#sidebar11').addClass('active'); 
        $('#myTable').DataTable();
        $(".pass").hide();
        $('.stage').hide();
        $('#id_stage').attr('disabled','disabled');

    
        //display modal form for creating new product *********************
        $('#btn_add').click(function(){
            $('#myModalLabel').html("Agregar Cafetería  <i class='fa fa-tasks'></i>");
            $('#tag_put').remove();
            $('#btn-save').val("add");
            $('#cafeteriaForm').trigger("reset");
            $(".pass").show();
            $(".show_pass_div").hide();
            $('#myModal').modal('show');
        
        });

        $('#id_profile').change(function(){

            if($(this).val() == 3)
            {
                $('.stage').show();
                $('#id_stage').removeAttr('disabled');
                
            }
            else
            {
                $('.stage').hide();
                $('#id_stage').attr('disabled','disabled');
            }
           

        });
        
    
    
        //display modal form for product EDIT ***************************
        $(document).on('click','#btn-edit',function(){
            $('#myModalLabel').html("Editar Cafetería <i class='fa fa-tasks'></i>");
            $('#cafeteriaForm').trigger("reset");
            $('#tag_put').remove();
            $form = $('#cafeteriaForm');
            $form.append('<input type="hidden" id="tag_put" name="_method" value="PUT">');
            $('#myModal').modal('show');
            var id_cafeteria = $(this).val();
            $('#id_cafeteria').val(id_cafeteria);
            var my_url= baseUrl + '/show/cafeteria/' + id_cafeteria;
            actions.show(my_url);
        });

        //create new product / update existing product ***************************
    $("#cafeteriaForm").on('submit',function (e) {
        
        e.preventDefault(); 
        var stageArray=[];
        var formData = new FormData(this);
        var id_cafeteria = $('#id_cafeteria').val();
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var my_url = baseUrl+'/cafeteria';
        if (state == "update")
        {
            my_url=baseUrl + '/cafeteria/' + id_cafeteria;
        }

        actions.edit_create(type,my_url,state,formData,'file');
                    
    });
    
    //delete category and remove it from TABLE list ***************************
    $(document).on('click','.deleteCategory',function(){
        var id = $(this).val();
        var my_url = baseUrl + '/cafeteria/delete/' + id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        swal({
            title: "¿Desea eliminar la cafeteria",
            text: "La cafeteria se eliminara permanentemente",
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
        var my_url =baseUrl + '/cafeteria/' + id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        if($(this).attr('class') == 'btn btn-sm btn-outline-success delete-category')
        {
            title= "¿Deseas activar la cafeteria?";
            text="La cafeteria se activara";
            confirmButtonText="Activar";

            datatitle="Activado";
            datatext="activada";
            datatext2="Activacion";
        }
        else 
        {
            title= "¿Desea desactivar esta cafeteria?";
            text= "La cafeteria se desactivara";
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
            swal(datatitle, "Cafeteria "+datatext, "success");
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
            // buttons += '<a class="btn btn-sm btn-outline-info" title="Usuarios" id="" href="'+baseUrl+'/users/'+dato.id+'"  ><i class="icon-users"></i></a>';
            buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Editar Cafeteria" id="btn-edit" value="' +dato.id+'"  ><i class="fa fa-edit"></i></button>';
            buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   delete-category" title="Desactivar Cafeteria" data-type="confirm" value="'+dato.id+'"><i class="fa fa-window-close"></i></button>';
        
        }else {
            statu="<span class='badge badge-secondary'>Inactivo</span>";
            buttons += ' <button type="button" class="btn btn-sm btn-outline-success delete-category" title="Activar Cafeteria" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button>';
            buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   deleteCategory" title="Eliminar Cafeteria" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>'
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
                        text: "Cafeteria añadida",
                        type: "success",
                        button: "OK",
                    });
                        
                    var table = $('#myTable').DataTable();
                    var rowNode= table.row.add( [
                            dato.id,
                            dato.name,
                            dato.email,
                            category.status(dato),
                            category.buttons(dato),
                        ] ).draw().node().id = 'cafeteria_id'+dato.id;
                
                    $('#cafeteria_id'+dato.id).css("background-color", "#c3e6cb");
                    $('#cafeteria_id'+dato.id).find('td:eq(0)').addClass("hidden-xs");
                    $('#cafeteria_id'+dato.id).find('td:eq(2)').addClass("hidden-xs");
                    
                    }else{ //if user updated an existing record
                    swal({
                        title: dato.name,
                        text: "Cafeteria modificado",
                        type: "success",
                        button: "OK",
                    });

                    var edit = [
                        dato.id,
                        dato.name,
                        dato.email,
                        category.status(dato),
                        category.buttons(dato),
                        ];
                        
                        $('#myTable').dataTable().fnUpdate(edit,$('tr#cafeteria_id'+dato.id)[0]);
                        $('#cafeteria_id'+dato.id).css("background-color", "#ffdf7e");
                    }
                    $('#cafeteriaForm').trigger("reset");
                    $('#myModal').modal('hide');
                }
        },
    show: function(data){
        console.log(data.stages);
        // $('#school_id').val(data.id);
        $('#name').val(data.name);
        $('#address').val(data.address);
        $('#phone').val(data.phone);
        $('#rfc').val(data.rfc);
        $('#iva').val(data.iva);
        $('#email').val(data.email);
        $('#btn-save').val("update");
        $('#myModal').modal('show');
    },
    deactivated:  function(data){
        console.log(data);
        if(data.id_status == 0){
            $('#myTable').dataTable().fnDeleteRow('#cafeteria_id' + data.id);

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
                dato.name,
                dato.email,
                category.status(dato),
                category.buttons(dato),
            ];

            $('#myTable').dataTable().fnUpdate(edit,$('tr#cafeteria_id'+dato.id)[0]);
            if(dato.id_status==1){
                $('#cafeteria_id'+dato.id).css("background-color", "#c3e6cb");
            }else{
                $('#cafeteria_id'+dato.id).css("background-color", "#f2dede");
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
       