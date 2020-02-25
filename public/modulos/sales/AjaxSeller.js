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
      


        $('.backto').click(function(){
            $('#myModalLabel').html("");
            $('#formCliente').trigger("reset");
            $('#search').val(0);
            $('#quantity').val(1);
            $('#cost').val(0);
            purchase.deletetable();
            $("#id_category").val(0);
            $(".seccionProducto").hide();
        })

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
                                    $.notify({
                                        // options
                                        title: "Listo!",
                                        message:"Venta realizada con exito",
                                    },{
                                        // settings
                                        type: 'success'
                                    });
            
                                    $('#myModalLabel').html("");
                                    $('#formCliente').trigger("reset");
                                    $('#search').val(0);
                                    $('#quantity').val(1);
                                    $('#cost').val(0);
                                    purchase.deletetable();
                                    $("#id_category").val(0);
                                    $(".seccionProducto").hide();
                                 break;
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