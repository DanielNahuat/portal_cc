$(document).ready(function(){

    var prov0 = $('#id_provider').val();

    var nameDeli='<a href="/providers">Proveedores</i></a> / <a href="/supplies/'+prov0+'">Insumos</i></a>';
    $('.nameDeli').html(nameDeli);  
    $('#sidebar2').addClass('active'); 
        var url = $('#url').val();
       
    $('#myTable').DataTable();

       //display modal form for creating new product *********************
       $('#btn_add').click(function(){
        $('#myModalLabel').html("Agregar Insumo  <i class='fa fa-cubes'></i>");
        $('#btn-save').val("add");
        $('#frmSupplies').trigger("reset");
        $('#myModal').modal('show');
     
        });

        //display modal form for product EDIT ***************************
       $(document).on('click','#btn-edit',function(){
            $('#myModalLabel').html("Editar Insumo <i class='fa fa-cubes'></i>");
            $('#myModal').modal('show');
            var supply_id = $(this).val();
            var my_url=url + '/' + supply_id;
            actions.show(my_url);
        });


        //create new product / update existing product ***************************
       $("#btn-save").click(function (e) {
          
            e.preventDefault(); 
            var formData = {
            id_provider: $('#id_provider').val(),
            id_cafeteria: $('#id_cafeteria').val(),
            id_category: $('#id_category').val(),
            cod: $('#cod').val(),
            name: $('#name').val(),
            quantity: $('#quantity').val(),   
            price: $('#price').val(),
            cost: $('#cost').val(),
            total_price: $('#total_price').val(),               
            }
            
            //used to determine the http verb to use [add=POST], [update=PUT]
            var state = $('#btn-save').val();
            var type = "POST"; //for creating new resource
            var supply_id = $('#supply_id').val();;
            var my_url = url;
            
            if (state == "update"){
                type = "PUT"; //for updating existing resource
                my_url=url + '/' + supply_id;
            }

            
              //Validate

            if("#btn-calcular"==false)
            {
                $('#btn-save')
            }
             actions.edit_create(type,my_url,state,formData);

           
        });


         //delete category and remove it from TABLE list ***************************
        $(document).on('click','.deleteSupply',function(){
            var supply_id = $(this).val();
            var my_url = url + '/delete/' + supply_id;
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            })
            swal({
                title: "¿Desea eliminar esta Insumo",
                text: "El Insumo se eliminara permanentemente",
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
       $(document).on('click','.delete-supply',function(){
            var id = $(this).val();
            var my_url =url + '/' + id;
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            })
            if($(this).attr('class') == 'btn btn-sm btn-outline-success delete-supply')
            {
                title= "¿Deseas activar este Insumo?";
                text="El insumo se activara";
                confirmButtonText="Activar";

                datatitle="Activado";
                datatext="activada";
                datatext2="Activacion";
            }
            else 
            {
                title= "¿Desea desactivar este insumo?";
                text= "El insumo se desactivara";
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
                swal(datatitle, "Insumo "+datatext, "success");
                actions.deactivated(my_url);
                } 
                else {
                
                swal("Cancelado", datatext2+" cancelada", "error");
            
                }
            });

       
        });

        
        //total
        $(".add-price").on("keyup", function() {
            price = $('#price').val();
            quantity = $('#quantity').val();

            total =  parseFloat(price) * parseFloat(quantity);
            
            $('#total_price').val(total);
            
        });

});


const supply={

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
                buttons += '<button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Editar Insumo" id="btn-edit" value="'+dato.id+'"  ><i class="fa fa-edit"></i></button>';
                buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   delete-supply" title="Desactivar Insumo" data-type="confirm" value="'+dato.id+'"><i class="fa fa-window-close"></i></button>';
            
            }else {
                statu="<span class='badge badge-secondary'>Inactivo</span>";
                buttons += '<button type="button" class="btn btn-sm btn-outline-success delete-supply" title="Activar Insumo" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button>';
                buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   deleteSupply" title="Eliminar Insumo" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>';
            }
    
            return buttons;
        }
}

const success = { 

    new_update: function (data,state){
       
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
                console.log(dato);
                if (state == "add"){ //if user added a new record
                    swal({
                        title: dato.name,
                        text: "Insumo añadido",
                        type: "success",
                        button: "OK",
                    });

                    var table = $('#myTable').DataTable();
                    var rowNode= table.row.add( [
                            'SUP'+dato.id,
                            dato.cod,
                            dato.name,
                            dato.name_prov,
                            dato.name_coffee,
                            dato.name_cat,
                            dato.quantity,
                            '$'+dato.price.toFixed(2),
                            '$'+dato.cost.toFixed(2),
                            '$'+dato.total_price.toFixed(2),
                            supply.status(dato),
                            supply.buttons(dato),
                        ] ).draw().node().id = 'supply_id'+dato.id;
                
                    $('#supply_id'+dato.id).css("background-color", "#c3e6cb");
                  
                  
                }else{ //if user updated an existing record

                    swal({
                        title: dato.name,
                        text: "Insumo modificado",
                        type: "success",
                        button: "OK",
                    });

                        var edit = [
                            'SUP'+dato.id, 
                            dato.cod,
                            dato.name,
                            dato.name_prov,
                            dato.name_coffee,
                            dato.name_cat,
                            dato.quantity,
                            '$'+dato.price.toFixed(2),
                            '$'+dato.cost.toFixed(2),
                            '$'+dato.total_price.toFixed(2),
                            supply.status(dato),
                            supply.buttons(dato),
                        ];
                        
                        $('#myTable').dataTable().fnUpdate(edit,$('tr#supply_id'+dato.id)[0]);
                        $('#supply_id'+dato.id).css("background-color", "#ffdf7e");

                }
                $('#frmSupplies').trigger("reset");
                $('#myModal').modal('hide');
            }
    },

    show: function(data){
        $('#supply_id').val(data.id);
        $('#id_provider').val(data.id_provider);
        $('#id_cafeteria').val(data.id_cafeteria);
        $('#id_category').val(data.id_category);
        $('#cod').val(data.cod);
        $('#name').val(data.name);
        $('#quantity').val(data.quantity);
        $('#price').val(data.price);
        $('#cost').val(data.cost);
        $('#total_price').val(data.total_price);
        $('#btn-save').val("update");
        $('#myModal').modal('show');
    },

    deactivated:  function(data){
        console.log(data.status);
        if(data.status == 0){
            $('#myTable').dataTable().fnDeleteRow('#supply_id' + data.id);

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
                
                'SUP'+dato.id,
                dato.cod,
                dato.name,
                dato.name_prov,
                dato.name_coffee,
                dato.name_cat, 
                dato.quantity,
                '$'+dato.price.toFixed(2),
                '$'+dato.cost.toFixed(2),
                '$'+dato.total_price.toFixed(2),
                supply.status(dato),
                supply.buttons(dato),
            ];

            $('#myTable').dataTable().fnUpdate(edit,$('tr#supply_id'+dato.id)[0]);
            if(dato.status==1){
                $('#supply_id'+dato.id).css("background-color", "#c3e6cb");
            }else{
                $('#supply_id'+dato.id).css("background-color", "#f2dede");
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