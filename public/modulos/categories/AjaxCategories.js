
$(document).ready(function(){
//get base URL *********************
    
    var nameDeli='<a href="/categories">Categorias</i></a>';
    $('.nameDeli').html(nameDeli);  
    $('#sidebar9').addClass('active'); 
        var url = $('#url').val();
       
       $('#myTable').DataTable();

   
    
       //display modal form for creating new product *********************
       $('#btn_add').click(function(){
           $('#myModalLabel').html("Agregar Categoria  <i class='fa fa-tasks'></i>");
           $('#btn-save').val("add");
           $('#frmCategories').trigger("reset");
           $('#myModal').modal('show');
        
       });
       
    
   
       //display modal form for product EDIT ***************************
       $(document).on('click','#btn-edit',function(){
            $('#myModalLabel').html("Editar Categoria <i class='fa fa-tasks'></i>");
            $('#myModal').modal('show');
            var category_id = $(this).val();
            var my_url=url + '/' + category_id;
            actions.show(my_url);
       });
   
   
   
       //create new product / update existing product ***************************
       $("#btn-save").click(function (e) {
          
           e.preventDefault(); 
           var formData = {
               
               name: $('#name').val(),
                             
           }

           //used to determine the http verb to use [add=POST], [update=PUT]
           var state = $('#btn-save').val();
           var type = "POST"; //for creating new resource
           var category_id = $('#category_id').val();;
           var my_url = url;

           if (state == "update"){
               type = "PUT"; //for updating existing resource
                my_url=url + '/' + category_id;
           }
            actions.edit_create(type,my_url,state,formData);
           
           
       });

    //delete category and remove it from TABLE list ***************************
    $(document).on('click','.deleteCategory',function(){
        var privada_id = $(this).val();
        var my_url = url + '/delete/' + privada_id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        swal({
            title: "¿Desea eliminar esta Categoria",
            text: "La Categoria se eliminara permanentemente",
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
           var my_url =url + '/' + id;
            $.ajaxSetup({
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
               }
           })
            if($(this).attr('class') == 'btn btn-sm btn-outline-success delete-category')
            {
                title= "¿Deseas activar esta categoria?";
                text="La categoria se activara";
                confirmButtonText="Activar";

                datatitle="Acitvado";
                datatext="activada";
                datatext2="Activacion";
            }
            else 
            {
                title= "¿Desea desactivar esta categoria?";
                text= "La categoria se desactivara";
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
                buttons += '<button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="' +dato.id+'"  ><i class="fa fa-edit"></i></button>';
                buttons += '<button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   delete-category" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-window-close"></i></button>';
            
            }else {
                statu="<span class='badge badge-secondary'>Inactivo</span>";
                buttons += '<button type="button" class="btn btn-sm btn-outline-success delete-category" title="Activar Categoria" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button>';
                buttons += '<button type="button" class="btn btn-sm btn-outline-danger deleteCategory" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>';
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
                            text: "Categoria añadida",
                            type: "success",
                            button: "OK",
                        });
                            
                        var table = $('#myTable').DataTable();
                        var rowNode= table.row.add( [
                                'CAT'+dato.id,
                                dato.name,
                                category.status(dato),
                                category.buttons(dato),
                            ] ).draw().node().id = 'category_id'+dato.id;
                    
                        $('#category_id'+dato.id).css("background-color", "#c3e6cb");
                        $('#category_id'+dato.id).find('td:eq(0)').addClass("hidden-xs");
                        $('#category_id'+dato.id).find('td:eq(2)').addClass("hidden-xs");
                        
                        }else{ //if user updated an existing record
                        swal({
                            title: dato.name,
                            text: "Categoria modificada",
                            type: "success",
                            button: "OK",
                        });

                        var edit = [
                            'CAT'+dato.id,
                            dato.name,
                            category.status(dato),
                            category.buttons(dato),
                            ];
                            
                            $('#myTable').dataTable().fnUpdate(edit,$('tr#category_id'+dato.id)[0]);
                            $('#category_id'+dato.id).css("background-color", "#ffdf7e");
                        }
                        $('#frmCategories').trigger("reset");
                        $('#myModal').modal('hide');
                    }
            },
        show: function(data){
         
                            $('#category_id').val(data.id);
                            $('#name').val(data.name);
                            $('#btn-save').val("update");
                            $('#myModal').modal('show');
        },
        deactivated:  function(data){
            console.log(data);
            if(data.status == 0){
                $('#myTable').dataTable().fnDeleteRow('#category_id' + data.id);

                $.notify({
                    // options
                    title: "Listo!",
                    message:"Se elimino correctamente",
                },{
                    // settings
                    type: 'success'
                });
            }else if(data.status == 1 || data.status == 2){
                var dato=data;
                var edit = [
                    dato.mat+dato.id,
                    dato.name,
                    category.status(dato),
                    category.buttons(dato),
                ];

                $('#myTable').dataTable().fnUpdate(edit,$('tr#category_id'+dato.id)[0]);
                if(dato.status==1){
                    $('#category_id'+dato.id).css("background-color", "#c3e6cb");           
                }else{
                    $('#category_id'+dato.id).css("background-color", "#f2dede");
                }
            }
           
                
            },
        msj: function(data){
                console.log(data);
              
                if(data.responseJSON.errors.name){
                    $.notify({
                        // options
                        title: "Error!",
                        message:data.responseJSON.errors.name[0],
                    },{
                        // settings
                        type: 'danger'
                    });
                    $('#name').addClass('border-dange');
                }
            
        }
}