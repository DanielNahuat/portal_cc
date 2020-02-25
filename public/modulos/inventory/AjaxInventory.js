
$(document).ready(function(){
    //get base URL *********************
        
    $('#sidebar1').addClass('active'); 
    var url = $('#url').val();
    var baseurl = $('#baseurl').val();
           
    $('#myTable').DataTable();
 
    //display modal form for product EDIT ***************************
    $(document).on('click','#btn-edit, #btn-edit-prov',function(){
        $('#myModalLabel').html("Editar Insumo <i class='fa fa-tasks'></i>");
        var inventory_id = $(this).val();
        var my_url=url + '/' + inventory_id;
        actions.show(my_url);
    });
  
    //create new product / update existing product ***************************
    $("#btn-save").click(function (e) {
        
        e.preventDefault(); 
        var formData = $("#frmCategories").serialize();

        //used to determine the http verb to use [add=POST], [update=PUT]
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var inventory_id = $('#inventory_id').val();;
        var my_url = url;

        if (state == "update"){
            type = "PUT"; //for updating existing resource
            my_url=url + '/' + inventory_id;
        }
        actions.edit_create(type,my_url,state,formData);
    });
    //create new product / update existing product ***************************
    $("#btn-save-prov").click(function (e) {
        
        e.preventDefault(); 
        var formData = $("#frmProveedor").serialize();

        //used to determine the http verb to use [add=POST], [update=PUT]
        var state = $('#btn-save-prov').val();
        var type = "POST"; //for creating new resource
        var inventory_id = $('#inventory_id').val();;
        var my_url = baseurl;

        if (state == "update"){
            type = "PUT"; //for updating existing resource
            my_url=baseurl + '/updateProv/' + inventory_id;
        }
        actions.edit_create(type,my_url,state,formData);
    });
        
    //delete product and remove it from TABLE list ***************************
    $(document).on('click','.delete-inventory',function(){
        var id = $(this).val();
        var my_url =url + '/' + id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
    
        if($(this).attr('class') == 'btn btn-outline-success delete-inventory btn-sm')
        {
            title= "¿Deseas activar este Insumo?";
            text="El Insumo se activara";
            confirmButtonText="Activar";

            datatitle="Activado";
            datatext="activado";
            datatext2="Activacion";
        }
        else 
        {
            title= "¿Desea desactivar este Insumo?";
            text= "El Insumo se desactivara";
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
                swal(datatitle, "Insumo "+datatext, "success");
                actions.deactivated(my_url);
            } 
            else {
                swal("Cancelado", datatext2+" cancelada", "error");
            }
        });
    });
    //delete product and remove it from TABLE list ***************************
    $(document).on('click','.eliminar-inventory',function(){
        var id = $(this).val();
        var my_url =url + '/delete/' + id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
    
        title= "¿Desea Eliminar este Insumo?";
        text= "El Insumo se eliminará";
        confirmButtonText="Eliminar";

        datatitle="Eliminado";
        datatext="eliminado";
        datatext2="Eliminacion";

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
                actions.delet(my_url);
            } 
            else {
                swal("Cancelado", datatext2+" cancelada", "error");
            }
        });
    });
});
    
       
    
const inventory={
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
            buttons += `
                <button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Editar" id="btn-edit" value="${dato.id}"  data-toggle="modal" href="#myModal"><i class="fa fa-edit"></i></button>
                <button type="button" class="btn btn-sm btn-outline-primary open_modal" title="Cambiar Proveedor" id="btn-edit-prov" value="${dato.id}"  data-toggle="modal" href="#myModalProv"><i class="fa fa-cog"></i></button>
                <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   delete-inventory" title="Desactivar" data-type="confirm" value="${dato.id}"><i class="fa fa-window-close"></i></button>
            `;
        }else {
            buttons += `
                <button type="button" class="btn btn-outline-success delete-inventory btn-sm" title="Activar" data-type="confirm" value="${dato.id}" ><i class="fa fa-check-square-o"></i></button>
                <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   eliminar-inventory" title="Eliminar" data-type="confirm" value="${dato.id}"><i class="fa fa-trash-o"></i></button>
            `;
        }

        return buttons;
    },

    formatNumber:function(num){
        
        if (!num || num == 'NaN') return '-';
        if (num == 'Infinity') return '&#x221e;';
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + '$ '+num + '.' + cents);
        
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
                        text: "Insumo añadido",
                        type: "success",
                        button: "OK",
                    });
                        
                    var table = $('#myTable').DataTable();
                    var rowNode= table.row.add( [
                            dato.mat+dato.id,
                            dato.id_provider,
                            dato.id_category,
                            dato.name,
                            dato.quantity,
                            inventory.formatNumber(dato.price),
                            inventory.formatNumber(dato.cost),
                            inventory.formatNumber(dato.total_price),
                            inventory.status(dato),
                            inventory.buttons(dato),
                        ] ).draw().node().id = 'inventory_id'+dato.id;
                
                    $('#inventory_id'+dato.id).css("background-color", "#c3e6cb");
                    $('#inventory_id'+dato.id).find('td:eq(0)').addClass("hidden-xs");
                    $('#inventory_id'+dato.id).find('td:eq(2)').addClass("hidden-xs");
                
                }else{ //if user updated an existing record
                    swal({
                        title: dato.name,
                        text: "Insumo modificado",
                        type: "success",
                        button: "OK",
                    });

                    var precio = inventory.formatNumber(dato.price);
                    console.log(precio);

                    var edit = [
                        dato.mat+dato.id,
                        dato.proveedor,
                        dato.categoria,
                        dato.name,
                        dato.quantity,
                        inventory.formatNumber(dato.price),
                        inventory.formatNumber(dato.cost),
                        inventory.formatNumber(dato.total_price),
                        inventory.status(dato),
                        inventory.buttons(dato),
                    ];
                    
                    $('#myTable').dataTable().fnUpdate(edit,$('tr#inventory_id'+dato.id)[0]);
                    $('#inventory_id'+dato.id).css("background-color", "#ffdf7e");
                }
                $('#frmCategories').trigger("reset");
                $('#myModal').modal('hide');
                $('#myModalProv').modal('hide');
            break;
        }
    },
    show: function(data){
        console.log(data);
        $('#inventory_id').val(data.id);
        $('#name').val(data.name);
        $('#id_provider').val(data.id_provider);
        $('#id_provider2').val(data.id_provider);
        $('#id_category').val(data.id_category);
        $('#cantidad').val(data.quantity);
        $('#precio_compra').val(data.price);
        $('#precio_venta').val(data.cost);
        $('#total').val(data.total_price);
        $('#btn-save').val("update");
        // $('#myModal').modal('show');
    },
    deactivated:  function(data){
        console.log(data);
        var dato=data;
        var edit = [
            dato.mat+dato.id,
            dato.proveedor,
            dato.categoria,
            dato.name,
            dato.quantity,
            inventory.formatNumber(dato.price),
            inventory.formatNumber(dato.cost),
            inventory.formatNumber(dato.total_price),
            inventory.status(dato),
            inventory.buttons(dato),
        ];

        $('#myTable').dataTable().fnUpdate(edit,$('tr#inventory_id'+dato.id)[0]);
        if(dato.status==1){
            $('#inventory_id'+dato.id).css("background-color", "#c3e6cb");
        }else{
            $('#inventory_id'+dato.id).css("background-color", "#f2dede");
        }
        
    },
    delet: function(data) {
        $('#myTable').dataTable().fnDeleteRow('#inventory_id' + data.id);
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
        });
        
    }
}

$("#cantidad, #precio_compra").on('keyup', function(){
    var cantidad = $("#cantidad").val();
    var precio = $("#precio_compra").val();

    var total = cantidad * precio;

    $("#total").val(total);
});
