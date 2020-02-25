$(document).ready(function(){
    //get base URL *********************
        
        var nameDeli='<a href="/sales">Ventas</i></a>';
        $('.nameDeli').html(nameDeli);  
        $('#sidebar8').addClass('active'); 
        $("#cost").prop('disabled', true);
        $('.js-example-basic-single').select2();
        
        
        var url = $('#url').val();
        var baseurl = $('#baseurl').val();
        $('#myTable').DataTable();
      
        
        //display modal form for creating new product *********************
        $('#btn_add').click(function(){
            $('#myModalLabel').html("Nuevo Venta  <i class='fa fa-tasks'></i>");
            $('#formCliente').trigger("reset");
            $('#search').val(0);
            $('#quantity').val(1);
            $('#cost').val(0);
            $('#btn-save').val("add");
            $(".seccionProducto").hide();
            purchase.deletetable();
            $('.table-responsive').hide();
            $('#btn_add').hide();
            $('.Detail').hide();
            $('.frmNew').show();
            $('.tituloTabla').hide();
            $("#msgObservaciones").html(""); 
        });


        $('.backto').click(function(){
            $('#myModalLabel').html("");
            $('#formCliente').trigger("reset");
            $('.frmNew').hide();
            $('#search').val(0);
            $('#quantity').val(1);
            $('#cost').val(0);
            purchase.deletetable();
            $("#id_category").val(0);
            $('.detail').hide();
            $('.table-responsive').show();
            $('#btn_add').show();
            $('.tituloTabla').show();
            
        })

            //display modal form for product EDIT ***************************
            $(document).on('click','#btn-edit',function(){
                    $('#myModalLabel').html("Editar Compra <i class='fa fa-tasks'></i>");
                    var sale_id = $(this).val();
                    var my_url=url + '/' + sale_id;
                    actions.show(my_url);
            });

            $(document).on('click','.detailpurchase',function(){
                var sale_id = $(this).val();
                var my_url=url + '/' + sale_id;
                actions.modal(my_url);
             });

        //create new product / update existing product ***************************
        $("#btn-save").click(function (e) {
    
            e.preventDefault(); 
            var formData={
                aditional:purchase.datapurchase(),
                detailaditional:purchase.datadetailpurchase(),
            }

            console.log(formData);
            //used to determine the http verb to use [add=POST], [update=PUT]
            var state = $('#btn-save').val();
            var type = "POST"; //for creating new resource
            var my_url = url;

            if (state == "update"){
                type = "PUT"; //for updating existing resource
                my_url=url + '/';
            }
            actions.edit_create(type,my_url,state,formData);
        });
        
            //delete purchase and remove it from TABLE list ***************************
            $(document).on('click','.deletepurchase',function(){
            var privada_id = $(this).val();
            var my_url = url + '/delete/' + privada_id;
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            })
            swal({
                title: "¿Desea eliminar este Compra",
                text: "La Compra se eliminara permanentemente",
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
           $(document).on('click','.delete-purchase',function(){
               var id = $(this).val();
               var my_url =url + '/' + id;
                $.ajaxSetup({
                   headers: {
                       'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                   }
               })
               
                    title= "¿Deseas activar este Compra?";
                    text="El Compra se activara";
                    confirmButtonText="Activar";
    
                    datatitle="Acitvado";
                    datatext="activada";
                    datatext2="Activacion";
    
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
                    swal(datatitle, "Compra "+datatext, "success");
                    actions.deactivated(my_url);
                    } 
                    else {
                    
                    swal("Cancelado", datatext2+" cancelada", "error");
                
                    }
                });
           });

        $('#id_category').change(function(){
            var baseurl = $('#baseurl').val();
            var category =$(this).val();
            if(category == 0 ){
                var datos = `<option value="0">Insumos</option>`;
                $('#id_supply').html(datos);

            } else{
                var select =[];
                $(".rw").each(function () {
                        select.push($(this).val());
                });
                console.log(select);
                var datos = JSON.stringify(select);
                sup = $(this).val();
                $.get(`${baseurl}/dataPfC/${sup}`,{
                    data:datos,
                }).done(function(data){
                    console.log(data);
                    var datos = `<option value="0">Insumos</option>`;
                        $.each(data, function(idx, sup) {
                        var select =[];
                            $("#list"+sup.id).each(function () {
                                    select.push($(this).val());
                            });
                            if(select.length == 0){
                                datos += `<option class="opt${sup.id}" value="${sup.id}">${sup.name}</option>`;
                            }                              
                            });
                    $('#id_supply').html(datos);
                    }).fail( function(data) {
                            console.log(data);
                    });
                }     
        });

        $("#id_client, #search").click(function(){
            $(this).val('');
        });
        $("#id_client").keyup(function(){
            $('#id_supply').val(0);
            $('#id_supply').trigger('change');
        });
        $("#formCliente").submit(function(e){
            e.preventDefault();

            var id_client = $("#id_client").val();

            if(id_client != "" && id_client != "0"){
                $(".seccionProducto").show();
            }else{
                $(".seccionProducto").hide();
            }
            
            $.get(`${baseurl}/getObservaciones/${id_client}`).done(function(data){
  
                if(data.No == 1){
                    
                    $.notify({
                        // options
                        title: "Alerta!",
                        message: data.msg,
                    },{
                        // settings
                        type: 'warning'
                    });    
                }else{
                    $("#msgObservaciones").html(data.observaciones); 
                }
            }).fail( function(data) {
                        console.log(data);
                });

            $.get(`${baseurl}/dataOneClient/${id_client}`).done(function(data){
                if(data.coins === 0){
                    swal('Saldo Insuficiente', 'No tiene saldo para realizar esta acción', 'error');
                }
            }).fail( function(data) {
                        console.log(data); 
                }); 
        });
        
        $('#id_supply').change(function(){
            var supply =$(this).val();
            var id_qr = $("#id_client").val();
            $.notifyClose();

            if(id_qr == 0){
                $("#id_client").focus();
                $("#msgObservaciones").html(""); 
                $.notify({
                    // options
                    title: "Alerta!",
                    message: "Agregar Cliente",
                },{
                    // settings
                    type: 'warning'
                });    
            }else{
                if(supply >0){
                    $.get(`${baseurl}/dataOneSupplyQR/${supply}/${id_qr}`).done(function(data){
    
                      
                        if(data.No == 1){
    
                            $('#id_supply').val(0);
                            $('#id_supply').trigger('change');
                            
                            $.notify({
                                // options
                                title: "Alerta!",
                                message: data.msg,
                            },{
                                // settings
                                type: 'warning'
                            });    
                        }else{

                            
                            $('#costSup').val(data.cost);
                        }
                        }).fail( function(data) {
                                console.log(data);
                        });
                }else{
                    $('#costSup').val(0);
                }     
            }
        });
            

        $('#search').change(function(){
            var supply =$("#search").val();
            var id_qr = $("#id_client").val();
            if(supply > 0){
                $.get(`${baseurl}/dataOneSupplyQR/${supply}/${id_qr}`).done(function(data){
                    console.log(data);
                    $.notifyClose();
                    
                    if(data.No == 1){
        
                        $('#id_supply').val(0);
                        $('#id_supply').trigger('change');
                        
                        $.notify({
                            // options
                            title: "Alerta!",
                            message: data.msg,
                        },{
                            // settings
                            type: 'warning'
                        });    
                    }else{
                        $('#costSup').val(data.cost);
                        $('#id_supply').val(supply);
                        $('#id_supply').select2().trigger('change');

                        var name = $('#id_supply').children("option:selected").text();
                        var data= [{supply:$('#id_supply').children("option:selected").val(), 
                                    quantity: $('#quantity').val(),
                                    cost:$('#costSup').val()}];
            
                            if(data[0].quantity < 1 || data[0].quantity == ""){
                                $.notify({
                                    // options
                                    title: "Error!",
                                    message:', La Cantidad debe ser mayor a "0".',
                                },{
                                    // settings
                                    type: 'warning'
                                });    
                            }else if (data[0].supply == 0){
                                $.notify({
                                    // options
                                    title: "Error!",
                                    message:', No ha selecionado ningun insumo.',
                                },{
                                    // settings
                                    type: 'warning'
                                });
                            }else if(data[0].cost < 0 ||  data[0].cost == "" ){
                                $.notify({
                                    // options
                                    title: "Error!",
                                    message:', El Precio debe ser mayor a "0".',
                                },{
                                    // settings
                                    type: 'warning'
                                });   
                            }else{
                                purchase.supllytable(name,data);
                            }
                    }

                    }).fail( function(data) {
                            console.log(data); 
                });
            }else{
                
                $('#costSup').val(0);
            }     
        });

        $('.addSupply').click(function(){

            var name = $('#id_supply').children("option:selected").text();
            var data= [{supply:$('#id_supply').children("option:selected").val(), 
                        quantity: $('#quantity').val(),
                        cost:$('#costSup').val()}];
            console.log(data);
            $.notifyClose();
             if($("#id_client").val() == 0 || $("#id_client").val() ==""){
                $.notify({
                    // options
                    title: "Aviso!",
                    message:', Debe agregar un cliente para realizar venta',
                },{
                    // settings
                    type: 'warning'
                });   
            }else if(data[0].quantity < 1 || data[0].quantity == ""){
                $.notify({
                    // options
                    title: "Aviso!",
                    message:', La Cantidad debe ser mayor a "0".',
                },{
                    // settings
                    type: 'warning'
                });    
            }else if (data[0].supply == 0){
                $.notify({
                    // options
                    title: "Aviso!",
                    message:', No ha selecionado ningun insumo.',
                },{
                    // settings
                    type: 'warning'
                });
            }else if(data[0].cost < 0 ||  data[0].cost == "" ){
                $.notify({
                    // options
                    title: "Aviso!",
                    message:', El Precio debe ser mayor a "0".',
                },{
                    // settings
                    type: 'warning'
                });   
            }else{
                purchase.supllytable(name,data);
            }
            
        });

});
const purchase={
    status: function (dato){

        switch(dato.status) {
            case 1:
                    statu="<span class='badge badge-success'>Activo</span>";
              break;
            case 2:
                    statu="<span class='badge badge-warning'>Por Terminar</span>";
              break;
            default:
                    statu="<span class='badge badge-danger'>Cancelada</span>";
        }
    
        return statu;
        },
    buttons:function(dato){
        var buttons='';

        switch(dato.status) {
            case 1:
                buttons += `
                    <td>
                        <button type="button" class="btn btn-sm btn-outline-info detailpurchase" title="Detalle" data-type="confirm" value="${dato.id}"><i class="fa fa-eye"></i></button>
                        <button type="button" class="btn btn-sm btn-outline-danger deletepurchase" title="Cancelar" data-type="confirm" value="${dato.id}"><i class="fa fa-trash-o"></i></button>
                        
                    </td>
                `;
              break;
            case 2:
                    buttons += '<button type="button" class="btn btn-sm btn-outline-success delete-purchase" title="Activar Compra" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button>';
                    buttons += '<button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="' +dato.id+'"  ><i class="fa fa-edit"></i></button>';
                    buttons += '<button type="button" class="btn btn-sm btn-outline-info detailpurchase" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-eye"></i></button>';
                    buttons += '<button type="button" class="btn btn-sm btn-outline-danger deletepurchase" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>';
              break;
            default:
                    buttons += '<button type="button" class="btn btn-sm btn-outline-info detailpurchase" title="Detalle" data-type="confirm" value="'+dato.id+'"><i class="fa fa-eye"></i></button>';
        }

        return buttons;
    },
    supllytable:function(name,data){
                console.log(data);
                var select =[];
                        $("#list"+data[0].supply).each(function () {
                                select.push($(this).val());
                        });

            if(select.length > 0){
                $.notify({
                    // options
                    title: "Aviso!",
                    message:'Se actualizo la cantidad',
                },{
                    // settings
                    type: 'warning'
                });
                var q = $("#infq"+data[0].supply).val();
                var qc = $("#infqc"+data[0].supply).val();
                var qc2 = data[0].quantity*data[0].cost;
                var tq= parseFloat(q) + parseFloat(data[0].quantity);
                var tqc= parseFloat(qc) + parseFloat(qc2);

                
                var dato=`<td>${name}</td>
                <td>$${operations.formatNumber(data[0].cost)}</td>
                <td>${tq}</td>
                <td>$${operations.formatNumber(tqc)}</td>
                <td>
                    <button id="da${data[0].supply}" value="${data[0].supply}" class="btn btn-danger rw" onclick="purchase.supllydelete(${data[0].supply});"><i class="fa fa-trash-o"></i></button>
                    <input id="infq${data[0].supply}" type="hidden" value="${tq}">
                    <input id="infc${data[0].supply}"  type="hidden" value="${data[0].cost}"> 
                    <input id="infqc${data[0].supply}" class="qc" type="hidden"  value="${tqc}"> 
                </td>`;

                $("#list"+data[0].supply).html(dato);
                
                var cost= parseFloat($('#cost').val());
                var total = cost + qc2;
                $('#cost').val(total.toFixed(2));

            }else{  var qc = data[0].quantity*data[0].cost;
                    var dato=`<tr id="list${data[0].supply}">
                    <td>${name}</td>
                    <td>$${operations.formatNumber(data[0].cost)}</td>
                    <td>${data[0].quantity}</td>
                    <td>$${operations.formatNumber(qc)}</td>
                    <td>
                        <button id="da${data[0].supply}" value="${data[0].supply}" class="btn btn-danger rw" onclick="purchase.supllydelete(${data[0].supply});"><i class="fa fa-trash-o"></i></button>
                        <input id="infq${data[0].supply}" type="hidden" value="${data[0].quantity}">
                        <input id="infc${data[0].supply}"  type="hidden" value="${data[0].cost}"> 
                        <input id="infqc${data[0].supply}" class="qc" type="hidden"  value="${qc}"> 
                    </td>
                    </tr>`;

           
            $("#supplytable").append(dato);
            $('#id_supply').children("option:selected").hide();
            $('#id_supply').val(0);
            $('#id_supply').trigger('change');
            
            
            var cost= parseFloat($('#cost').val());
            var total = cost + qc;
            $('#cost').val(total.toFixed(2));    
            
    }
        
    $('#search').val('');
    $('#quantity').val(1);
    },
    supllydelete:function(supply){
        var qc= $('#infqc'+supply).val();
        var costo = parseFloat($('#cost').val());
        var total = costo - qc;
       
        $('#cost').val(total.toFixed(2));
        $('#id_supply').children(".opt"+supply).show();
        $('#list'+supply).remove();
    },
    datapurchase:function(){
        var pack ={
                id_client: $('#id_client').val(),
                cost:$('#cost').val(),
        }

        return pack;
    },
    datadetailpurchase:function(){
        var select =[];
        $(".rw").each(function () {
           var no=$(this).val();
           var no2=$("#infq"+no).val();
           var no4=$("#infc"+no).val();
           var no5=$("#infqc"+no).val();
                detail={
                    supply:no,
                    quantity:no2,
                    cost:no4,
                    total_price:no5,
                }
                select.push(detail);
        });
        
        return JSON.stringify(select);
    }, 
    deletetable: function(){
        $(".rw").each(function () {
            var no=$(this).val();
            $('#id_supply').children(".opt"+no).show();
            $('#list'+no).remove();
         });

    },
    selectcategory: function(data,keyC=''){
            if(provider == 0 ){
                $("#id_category").prop('disabled', true);
            }else{
                $("#id_category").prop('disabled', false);
                $("#id_provider").prop('disabled', true);
                $(".NewProvider").prop('disabled', true);
            }
    },
    selectsupply: function(data,keyS=''){
        console.log(data);
        var datos = `<option value="0">Insumos</option>`;
         $.each(data, function(idx, sup) {
            var select =[];
                $("#list"+sup.id).each(function () {
                        select.push($(this).val());
                });
                if(select.length == 0){
                    datos += `<option class="opt${sup.id}" value="${sup.id}">${sup.name}</option>`;
                }                              
                });
        $('#id_supply').html(datos);
        $("#id_supply").prop('disabled', false);
        $(".NewSupply").prop('disabled', false);
    },
   
}

const success = { 
            new_update: function (data,state){
                    $.notifyClose();
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
                                        text: "Compra añadido",
                                        type: "success",
                                        button: "OK",
                                    });
                                        
                                    var table = $('#myTable').DataTable();
                                    var rowNode= table.row.add( [
                                            'SAL'+dato.id,
                                            dato.caf,
                                            dato.client,
                                            '$'+operations.formatNumber(dato.cost),
                                            purchase.status(dato),
                                            dato.dateC,
                                            dato.dateU,
                                            purchase.buttons(dato),
                                        ] ).draw().node().id = 'sale_id'+dato.id;
                                
                                    $('#sale_id'+dato.id).css("background-color", "#c3e6cb");
                                    $('#sale_id'+dato.id).find('td:eq(0)').addClass("hidden-xs");
                                    $('#sale_id'+dato.id).find('td:eq(2)').addClass("hidden-xs");
                                    
                                    }else{ //if user updated an existing record
                                    swal({
                                        title: dato.name,
                                        text: "Compra modificado",
                                        type: "success",
                                        button: "OK",
                                    });
            
                                    var edit = [
                                        'SAL'+dato.id,
                                        dato.caf,
                                        dato.client,
                                        operations.formatNumber(dato.cost),,
                                        purchase.status(dato),
                                        dato.dateC,
                                        dato.dateU,
                                        purchase.buttons(dato),
                                        ];
                                        
                                        $('#myTable').dataTable().fnUpdate(edit,$('tr#sale_id'+dato.id)[0], undefined, false, false);
                                        $('#sale_id'+dato.id).css("background-color", "#ffdf7e");
                                    }
                                        $('#myModalLabel').html("");
                                        $('#frmPack').trigger("reset");
                                        $('.frmNew').hide();
                                        $('.tituloTabla').show();
                                        $('#cost').val(0);
                                        purchase.deletetable();
                                        $("#id_category").val(0)
                                        $('.table-responsive').show();
                                        $('#btn_add').show();
                                 break;
                                }
                },
            show: function(data){
                                $('#sale_id').val(data.aditional.id);
                                $('#id_provider').val(data.aditional.id_provider);
                                $('#id_provider').trigger('change');
                                $('#cost').val(data.aditional.cost.toFixed(2));
                                var dato = '';
                                $.each(data.detailaditional, function (index, da) {
                                        var dato2 = `<tr id="list${da.id_supply}">
                                        <td>${da.name}</td>
                                        <td>${da.quantity}</td>
                                        <td>$${da.cost.toFixed(2)}</td>
                                        <td>$${da.total.toFixed(2)}</td>
                                        <td>
                                            <button id="da${da.id_supply}" value="${da.id_supply}" class="btn btn-danger rw" onclick="purchase.supllydelete(${da.id_supply});"><i class="fa fa-trash-o"></i></button>
                                            <input id="infq${da.id_supply}" type="hidden" value="${da.quantity}">
                                            <input id="infc${da.id_supply}"  type="hidden" value="${da.cost}"> 
                                            <input id="infqc${da.id_supply}" class="qc" type="hidden"  value="${da.total.toFixed(2)}"> 
                                        </td>
                                    </tr>`;
                                    dato += dato2;
                                    });
                                $("#supplytable").append(dato);

                                $('#btn_add').hide();
                                $('.table-responsive').hide();
                                $('.frmNew').show();
                                $('#btn-save').val("update");
                                
                },
            modal: function(data){
                console.log(data);
                                $('.optionD').remove();
                                $('#school').html(data.coffe.name);
                                $('#provider').html(data.client.name);
                                $('#costD').html('$'+data.aditional.cost.toFixed(2));
                                $('#dateC').html(data.aditional.created_at);
                                $('#dateU').html(data.aditional.updated_at);
                                var dato =`<li class="list-group-item active">
                                                    <div class="col-sm-12">
                                                        <div class="row">
                                                            <div class="col-sm-3 text-center">Insumo</div>
                                                            <div class="col-sm-3 text-center">Costo</div>
                                                            <div class="col-sm-3 text-center"># Pzas</div>
                                                            <div class="col-sm-3 text-center">Costo * # Pzas</div>
                                                        </div>
                                                    </div>
                                                </li>`;
                                $.each(data.detailaditional, function (index, da) {
                                    var dato2=` <li class="list-group-item optionD">
                                                        <div class="col-sm-12">
                                                            <div class="row">
                                                                <div class="col-sm-3 text-center">${da.name}</div>
                                                                <div class="col-sm-3 text-center">$${operations.formatNumber(da.cost)}</div>
                                                                <div class="col-sm-3 text-center">${da.quantity}</div>
                                                                <div class="col-sm-3 text-center">$${operations.formatNumber(da.total)}</div>
                                                            </div>
                                                        </div>
                                                    </li>`;
                                    dato+=dato2;
                                });
                                $("#detailPUR").html(dato);
                                $('#btn_add').hide();
                                $('.table-responsive').hide();
                                $('.frmNew').hide();
                                $('.detail').show();
                                

                },
            deactivated:  function(data){
                console.log(data);
            
                    var dato=data;
                    var edit = [
                        'SAL'+dato.id,
                        dato.caf,
                        dato.client,
                        '$'+operations.formatNumber(dato.cost),
                        purchase.status(dato),
                        dato.dateC,
                        dato.dateU,
                        purchase.buttons(dato),
                    ];
    
                    $('#myTable').dataTable().fnUpdate(edit,$('tr#sale_id'+dato.id)[0]);
                    if(dato.status==1){
                        $('#sale_id'+dato.id).css("background-color", "#c3e6cb");
                    }else if(dato.status== 3){
                        $('#sale_id'+dato.id).css("background-color", "#f5c6cb");
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
                });
                
                }
    }