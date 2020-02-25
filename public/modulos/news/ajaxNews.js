$(document).ready(function(){

    var nameDeli='<a href="/news">News</i></a>';
    $('.nameDeli').html(nameDeli);  
    $('#sidebar').addClass('active'); 

    var url = $('#url').val();
    $('#myTable').DataTable();

    //display modal form for creating new product *********************
    $('#btn_add').click(function(){
        $('#myModalLabel').html("Agregar New <i class='fa fa-tasks'></i>");
        $('#btn-save').val("add");
        $('#frmNews').trigger("reset");
        $('#myModal').modal('show');
    });

      //display modal form for product EDIT ***************************
    $(document).on('click','#btn-edit',function(){
        $('#myModalLabel').html("Editar New <i class='fa fa-tasks'></i>");
        $('#myModal').modal('show');
        var news_id = $(this).val();
        var my_url=url + '/' + news_id;
        actions.show(my_url);
    });

      //create new product / update existing product ***************************
    $("#btn-save").click(function (e) {  
          
        e.preventDefault(); 
        var formData = {
            id_cafeteria: $('#id_cafeteria').val(),
            id_product: $('#id_product').val(),
            description: $('#description').val(),
            date_start: $('#date_start').val(),
            date_end: $('#date_end').val(),
        }

        //used to determine the http verb to use [add=POST], [update=PUT]
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var news_id = $('#news_id').val();;
        var my_url = url;

        if (state == "update"){
            type = "PUT"; //for updating existing resource
            my_url=url + '/' + news_id;
        }

        actions.edit_create(type,my_url,state,formData);
    
    });

       //delete news and remove it from TABLE list ***************************
    $(document).on('click','.deleteNew',function(){
        var news_id = $(this).val();
        var my_url = url + '/delete/' + news_id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        swal({
            title: "¿Desea eliminar este New",
            text: "El New se eliminara permanentemente",
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
                 $(document).on('click','.delete-new',function(){

                    var id = $(this).val();
                    var my_url =url + '/' + id;
                    $.ajaxSetup({
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                        }
                    })
                    if($(this).attr('class') == 'btn btn-sm btn-outline-success delete-new')
                    {
                        title= "¿Deseas activar este New?";
                        text="El New se activara";
                        confirmButtonText="Activar";
        
                        datatitle="Acitvado";
                        datatext="activada";
                        datatext2="Activacion";
                    }
                    else 
                    {
                        title= "¿Desea desactivar este New?";
                        text= "El New se desactivara";
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
                        swal(datatitle, "New "+datatext, "success");
                        actions.deactivated(my_url);
                        } 
                        else {
                        
                        swal("New ", datatext2+" cancelada", "error");
                    
                        }
                    });
        
               
                });

});

const news={
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
            buttons += '<button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="'+dato.id+'" ><i class="fa fa-edit"></i></button>';
            buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   delete-new" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-window-close"></i></button>';
        
        }else {
            statu="<span class='badge badge-secondary'>Inactivo</span>";
            buttons += '<button type="button" class="btn btn-sm btn-outline-success delete-new" title="Activar New" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button>';
            buttons += ' <button type="button" class="btn btn-sm btn-outline-danger deleteNew" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>';
        }

        return buttons;
    },
}


const success = {
    new_update: function (data,state){
        console.log(data)
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
                console.log(dato.status);
                if (state == "add"){ //if user added a new record
                swal({
                    title: dato.id_product,
                    text: "New añadido",
                    type: "success",
                    button: "OK",
                });
                    
                var table = $('#myTable').DataTable();
                var rowNode= table.row.add( [
                        'NEW'+dato.id,
                        dato.name_coffee,
                        dato.id_product,
                        dato.description,
                        dato.date_start,
                        dato.date_end,
                        news.status(dato),
                        news.buttons(dato),
                    ] ).draw().node().id = 'news_id'+dato.id;
                   
                $('#news_id'+dato.id).css("background-color", "#c3e6cb");
              
                }else{ //if user updated an existing record
                swal({
                    title: dato.id_product,
                    text: "New modificado",
                    type: "success",
                    button: "OK",
                });

                var edit = [
                    'NEW'+dato.id,
                    dato.name_coffee,
                    dato.id_product,
                    dato.description,
                    dato.date_start,
                    dato.date_end,
                    news.status(dato),
                    news.buttons(dato),
                    ];
                    
                    $('#myTable').dataTable().fnUpdate(edit, $('tr#news_id'+dato.id)[0]);
                    $('#news_id'+dato.id).css("background-color", "#ffdf7e");
                }
                $('#frmNews').trigger("reset");
                $('#myModal').modal('hide');
        }
    },

    
    show: function(data){
        $('#news_id').val(data.id);
        $('#id_product').val(data.id_product);
        $('#description').val(data.description);
        $('#date_start').val(data.date_start);
        $('#date_end').val(data.date_end);
        $('#btn-save').val("update");
        $('#myModal').modal('show');
    },

    deactivated:  function(data){
        console.log(data);
        if(data.status == 0){
            $('#myTable').dataTable().fnDeleteRow('#news_id' + data.id);

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
                'NEW'+dato.id,
                dato.name_coffee,
                dato.id_product,
                dato.description,
                dato.date_start,
                dato.date_end,
                news.status(dato),
                news.buttons(dato),
            ];

            $('#myTable').dataTable().fnUpdate(edit,$('tr#news_id'+dato.id)[0]);
            if(dato.status==1){
                $('#news_id'+dato.id).css("background-color", "#c3e6cb");
            }else{
                $('#news_id'+dato.id).css("background-color", "#f2dede");
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
        
    },

}