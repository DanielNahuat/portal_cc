$(document).ready(function(){
    //get base URL *********************
        
        var nameDeli='<a href="/purchase">Compras</i></a>';
        $('.nameDeli').html(nameDeli);  
        $('#sidebar7').addClass('active'); 
        $("#id_category").prop('disabled', true);
        $("#id_supply").prop('disabled', true);
        $(".NewSupply").prop('disabled', true);
        $("#cost").prop('disabled', true);
        
        
            var url = $('#url').val();
            var baseurl = $('#baseurl').val();
           $('#myTable').DataTable();
    
           //display modal form for creating new product *********************
           $('#btn_add').click(function(){
               $('#myModalLabel').html("Nuevo Compra  <i class='fa fa-tasks'></i>");
               $('#frmPack').trigger("reset");
               $('#btn-save').val("add");
               $('#id_provider').prop('disabled', false);
               $('.NewProvider').prop('disabled', false);
               $("#id_category").prop('disabled', true);
               $("#id_supply").prop('disabled', true);
               $(".NewSupply").prop('disabled', true);
               purchase.deletetable();
               $('.table-responsive').hide();
               $('#btn_add').hide();
               $('.Detail').hide();
               $('.frmNew').show();
            
           });

        $('.NewSupply').click(function(){
            $('#btn-save-supply').val("add");
            $('#frmSupplies').trigger("reset");
            $('#myModal').modal('show');    
         
        });

        $('.NewProvider').click(function(){
            $('#btn-save-provider').val("add");
            $('#frmProviders').trigger("reset");
            $('#myModal2').modal('show');
        });

           $('.backto').click(function(){
                $('#myModalLabel').html("");
                $('#frmPack').trigger("reset");
                $('.frmNew').hide();
                purchase.deletetable();
                $("#id_category").val(0);
                $('.detail').hide();
                $('.table-responsive').show();
                $('#btn_add').show();
                
                
           })

            //display modal form for product EDIT ***************************
            $(document).on('click','#btn-edit',function(){
                    $('#myModalLabel').html("Editar Compra <i class='fa fa-tasks'></i>");
                    var purchase_id = $(this).val();
                    var my_url=url + '/' + purchase_id;
                    actions.show(my_url);
            });

            $(document).on('click','.detailpurchase',function(){
                var purchase_id = $(this).val();
                var my_url=url + '/' + purchase_id;
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
               var purchase_id = $('#purchase_id').val();;
               var my_url = url;
    
               if (state == "update"){
                   type = "PUT"; //for updating existing resource
                    my_url=url + '/' + purchase_id;
               }
                actions.edit_create(type,my_url,state,formData);
               
               
           });
             //create new product / update existing product ***************************
            $("#btn-save-supply").click(function (e) {
            
            e.preventDefault(); 
            var formData = {
            id_provider: $('#id_provider').val(),
            id_cafeteria: 1,
            id_category: $('#id_category').val(),
            cod: $('#codS').val(),
            name: $('#nameS').val(),
            quantity:0,   
            price: $('#priceS').val(),
            cost: $('#costS').val(),
            total_price:0,               
            }
            
            //used to determine the http verb to use [add=POST], [update=PUT]
            var state = $('#btn-save-supply').val();
            var type = "POST"; //for creating new resource
            var my_url = baseurl+'/supplies-modal';

            actions.edit_create(type,my_url,state,formData);
        
        
            });
        
            $("#btn-save-provider").click(function (e) {  
            
                e.preventDefault(); 
                var formData = {
                    name: $('#name').val(),
                    rfc: $('#rfc').val(),
                    company: $('#company').val(),
                    phone: $('#phone').val(),
                    email: $('#email').val(),              
                }

                //used to determine the http verb to use [add=POST], [update=PUT]
                var state = $('#btn-save-provider').val();
                var type = "POST"; //for creating new resource
                var my_url = baseurl+'/providers';

                //Validate
            var email_validate = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
            var rfc_validate = /^[a-zA-Z]{3,4}(\d{6})((\D|\d){3})?$/;
            var phone_validate = /^[\(]?[\+]?(\d{2}|\d{3})[\)]?[\s]?((\d{6}|\d{8})|(\d{3}[\*\.\-\s]){3}|(\d{2}[\*\.\-\s]){4}|(\d{4}[\*\.\-\s]){2})|\d{8}|\d{10}|\d{12}$/;

            if (!rfc_validate.test($('#rfc').val().trim())) 
            {
                swal({
                    title: "Ingrese un RFC valido",
                        type: "warning",
                        
                        
                    });
                return false;
            }
            
            else if (!phone_validate.test($('#phone').val().trim())) 
            {
                swal({
                    title: "Ingrese un telefono valido",
                        type: "warning",
                        text: "(Lada)Numero Telefonico"
                        
                    });
                return false;
            }
            else if (!email_validate.test($('#email').val().trim())) 
            {
                swal({
                    title: "Ingrese un correo valido",
                        type: "warning"
                        
                    });
                return false;
            } else {
                
                actions.edit_create(type,my_url,state,formData);
            }
            
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
                title: "¿Desea cancelar esta Compra",
                text: "La Compra se cancelara permanentemente",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn btn-danger",
                confirmButtonText: "Si",
                cancelButtonText: "No",
                closeOnConfirm: true,
                closeOnCancel: false
              },
              function(isConfirm) {
                if (isConfirm) {
                    actions.deactivated(my_url);
                }else {
                   swal("Cancelado", "Cancelacion anulada", "error");
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
               
                    title= "¿Deseas finalizar esta Compra?";
                    text="El Compra se finalizara";
                    confirmButtonText="Finalizar";
    
                    datatitle="Finalizada";
                    datatext="finalizada";
                    datatext2="Finalizar";
    
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
           $('#id_provider').change(function(){
            var provider =$(this).val();
                purchase.selectcategory(provider); 
            });
           $('#id_category').change(function(){
            var category =$(this).val();
            if(category == 0 ){
                var datos = `<option value="0">Insumos</option>`;
                $('#id_supply').html(datos);
                $("#id_supply").prop('disabled', true);
                $(".NewSupply").prop('disabled', true);

            } else{
                var select =[];
                $(".rw").each(function () {
                        select.push($(this).val());
                });
                console.log(select);
                var datos = JSON.stringify(select);
                sup = $(this).val();
                
                $.get(`${baseurl}/datasupply/${sup}`,{
                    data:$('#id_provider').val(),
                }).done(function(data){
                   purchase.selectsupply(data);
                    }).fail( function(data) {
                            console.log(data);
                    });
                }     
            });
           $('#id_supply').change(function(){
                var supply =$(this).val();
                if(supply >0){
                    $.get(`${baseurl}/dataOneSupply/${supply}`).done(function(data){
                        console.log(data.cost);
                        $('#costSup').val(data.cost);
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
                                    message:', No a selecionado ningun insumo.',
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
                    buttons += '<button type="button" class="btn btn-sm btn-outline-info detailpurchase" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-eye"></i></button>';
                    buttons += '<button type="button" class="btn btn-sm btn-outline-danger deletepurchase" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>';
              break;
            case 2:
                    buttons += '<button type="button" class="btn btn-sm btn-outline-success delete-purchase" title="Activar Compra" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button>';
                    buttons += '<button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="' +dato.id+'"  ><i class="fa fa-edit"></i></button>';
                    buttons += '<button type="button" class="btn btn-sm btn-outline-info detailpurchase" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-eye"></i></button>';
                    buttons += '<button type="button" class="btn btn-sm btn-outline-danger deletepurchase" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>';
              break;
            default:
                    buttons += '<button type="button" class="btn btn-sm btn-outline-info detailpurchase" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-eye"></i></button>';
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
                    title: "Error!",
                    message:'Ya existe el producto en el ',
                },{
                    // settings
                    type: 'danger'
                });
            }else{  var qc = data[0].quantity*data[0].cost;
                    var dato=`<tr id="list${data[0].supply}">
                    <td>${name}</td>
                    <td>$${parseFloat(data[0].cost).toFixed(2)}</td>
                    <td>${data[0].quantity}</td>
                    <td>$${parseFloat(qc).toFixed(2)}</td>
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
            $('#quantity').val(0);
            
            var cost= parseFloat($('#cost').val());
            var total = cost + qc;
            $('#cost').val(total.toFixed(2));
    
          

            
            
    }
        

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
                id_school:$('#id_school').val(),
                id_provider:$('#id_provider').val(),
                id_school:$('#id_school').val(),
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
                    console.log(data);
                    console.log(data.cost);
                    switch(data.mat) {
                        case "SUP":
                                $.notify({
                                    // options
                                    title: "Listo!",
                                    message:'Insumo: '+data.name+' agregado',
                                },{
                                    // settings
                                    type: 'success'
                                });
                                dato = `<option class="opt${data.id} table-success" value="${data.id}">${data.name}</option>`;
                                $('#id_supply').append(dato);
                                $('#id_supply').val(data.id);
                                $('#id_supply').trigger('change');
                                $('#frmSupplies').trigger("reset");
                                $('#myModal').modal('hide'); 
                        break;
                        case "PRO":
                                $.notify({
                                    // options
                                    title: "Listo!",
                                    message:'Proveedor: '+data.name+'agregado',
                                },{
                                    // settings
                                    type: 'success'
                                });
                                dato = `<option class="opt${data.id} table-success" value="${data.id}">${data.name}</option>`;
                                $('#id_provider').append(dato);
                                $('#id_provider').val(data.id);
                                $("#id_provider").prop('disabled', true);
                                $('#id_provider').trigger('change');
                                $('#frmProviders').trigger("reset");
                                $('#myModal2').modal('hide'); 
                            
                        break;
                        case "PUR":
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
                                            'PUR'+dato.id,
                                            dato.provider,
                                            '$'+operations.formatNumber(dato.cost),
                                            purchase.status(dato),
                                            dato.dateC,
                                            dato.dateU,
                                            purchase.buttons(dato),
                                        ] ).draw().node().id = 'purchase_id'+dato.id;
                                
                                    $('#purchase_id'+dato.id).css("background-color", "#c3e6cb");
                                    $('#purchase_id'+dato.id).find('td:eq(0)').addClass("hidden-xs");
                                    $('#purchase_id'+dato.id).find('td:eq(2)').addClass("hidden-xs");
                                    
                                    }else{ //if user updated an existing record
                                    swal({
                                        title: dato.name,
                                        text: "Compra modificado",
                                        type: "success",
                                        button: "OK",
                                    });
            
                                    var edit = [
                                        'PUR'+dato.id,
                                        dato.provider,
                                        dato.cost,
                                        purchase.status(dato),
                                        dato.dateC,
                                        dato.dateU,
                                        purchase.buttons(dato),
                                        ];
                                        
                                        $('#myTable').dataTable().fnUpdate(edit,$('tr#purchase_id'+dato.id)[0], undefined, false, false);
                                        $('#purchase_id'+dato.id).css("background-color", "#ffdf7e");
                                    }
                                        $('#myModalLabel').html("");
                                        $('#frmPack').trigger("reset");
                                        $('.frmNew').hide();
                                        purchase.deletetable();
                                        $("#id_category").val(0)
                                        $('.table-responsive').show();
                                        $('#btn_add').show();
                                }
                        break;
                      
                    }
                },
            show: function(data){
                                $('#purchase_id').val(data.aditional.id);
                                $('#id_provider').val(data.aditional.id_provider);
                                $('#id_provider').trigger('change');
                                $('#cost').val(data.aditional.cost.toFixed(2));
                                var dato = '';
                                $.each(data.detailaditional, function (index, da) {
                                        var dato2 = `<tr id="list${da.id_supply}">
                                        <td>${da.name}</td>
                                        <td>$${da.cost.toFixed(2)}</td>
                                        <td>${da.quantity}</td>
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
                                $('#provider').html(data.provider.name);
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
                                                                <div class="col-sm-3 text-center">${da.cost}</div>
                                                                <div class="col-sm-3 text-center">${da.quantity}</div>
                                                                <div class="col-sm-3 text-center">${da.total}</div>
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
                        'PUR'+dato.id,
                        dato.provider,
                        dato.cost,
                        purchase.status(dato),
                        dato.dateC,
                        dato.dateU,
                        purchase.buttons(dato),
                    ];
    
                    $('#myTable').dataTable().fnUpdate(edit,$('tr#purchase_id'+dato.id)[0]);
                    if(dato.status==1){
                        $('#purchase_id'+dato.id).css("background-color", "#c3e6cb");
                    }else if(dato.status== 3){
                        $('#purchase_id'+dato.id).css("background-color", "#f5c6cb");
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