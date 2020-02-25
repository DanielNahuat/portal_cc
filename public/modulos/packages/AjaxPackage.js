$(document).ready(function(){
    //get base URL *********************
        
        var nameDeli='<a href="/package">Paquetes</i></a>';
        $('.nameDeli').html(nameDeli);  
        $('#sidebar3').addClass('active'); 
            var url = $('#url').val();
            var baseurl = $('#baseurl').val();
           $('#myTable').DataTable();
    
           //display modal form for creating new product *********************
           $('#btn_add').click(function(){
               $('#myModalLabel').html("Nuevo Paquete  <i class='fa fa-tasks'></i>");
               $('#frmPack').trigger("reset");
               $('#btn-save').val("add");
               package.deletetable();
               $('.table-responsive').hide();
               $('#btn_add').hide();
               $('.frmNew').show();
               $('#myModal').modal('show');
            
           });

           $('.backto').click(function(){
                $('#myModalLabel').html("");
                $('#frmPack').trigger("reset");
                $('.frmNew').hide();
                package.deletetable();
                $("#id_category").val(0)
                $('.table-responsive').show();
                $('#btn_add').show();
                
           })

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
        
            //display modal form for product EDIT ***************************
            $(document).on('click','#btn-edit',function(){
                    $('#myModalLabel').html("Editar Paquete <i class='fa fa-tasks'></i>");
                    $('#myModal').modal('show');
                    var package_id = $(this).val();
                    var my_url=url + '/' + package_id;
                    actions.show(my_url);
            });
           //create new product / update existing product ***************************
           $("#btn-save").click(function (e) {
        
               e.preventDefault(); 
               var formData={
                   aditional:package.datapackage(),
                   detailaditional:package.datadetailpackage(),
               }
               console.log(formData);
               //used to determine the http verb to use [add=POST], [update=PUT]
               var state = $('#btn-save').val();
               var type = "POST"; //for creating new resource
               var package_id = $('#package_id').val();;
               var my_url = url;
    
               if (state == "update"){
                   type = "PUT"; //for updating existing resource
                    my_url=url + '/' + package_id;
               }
                actions.edit_create(type,my_url,state,formData);
               
               
           });
    
            //delete package and remove it from TABLE list ***************************
            $(document).on('click','.deletepackage',function(){
            var privada_id = $(this).val();
            var my_url = url + '/delete/' + privada_id;
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            })
            swal({
                title: "¿Desea eliminar este Paquete",
                text: "La Paquete se eliminara permanentemente",
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
           $(document).on('click','.delete-package',function(){
               var id = $(this).val();
               var my_url =url + '/' + id;
                $.ajaxSetup({
                   headers: {
                       'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                   }
               })
                if($(this).attr('class') == 'btn btn-sm btn-outline-success delete-package')
                {
                    title= "¿Deseas activar este Paquete?";
                    text="El Paquete se activara";
                    confirmButtonText="Activar";
    
                    datatitle="Acitvado";
                    datatext="activada";
                    datatext2="Activacion";
                }
                else 
                {
                    title= "¿Desea desactivar esta Paquete?";
                    text= "El Paquete se desactivara";
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
                    swal(datatitle, "Paquete "+datatext, "success");
                    actions.deactivated(my_url);
                    } 
                    else {
                    
                    swal("Cancelado", datatext2+" cancelada", "error");
                
                    }
                });
    
              
           });
    
           $('#id_category').change(function(){
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
                $.get(`${baseurl}/dataPfC/${sup}`).done(function(data){
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


            $('.addSupply').click(function(){

                var name = $('#id_supply').children("option:selected").text();
                var data= [{supply:$('#id_supply').children("option:selected").val(), 
                            quantity: $('#quantity').val(), cost:$('#costSup').val()}];
                            console.log(data);
                            if(data[0].quantity < 1){
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
                            }else{
                                package.supllytable(name,data);
                            }
             
            });

});
 
const package={
    status: function (dato){
        if(dato.status== 1){
            statu="<span class='badge badge-success'>Activo</span>";
    
        }else{
            statu="<span class='badge badge-secondary'>Inactivo</span>";
        }
    
        return statu;
        },
    type: function(dato){
            if (dato.type == 1){
                type ='<span class="badge badge-primary">Promocion</span>';
            }else if(dato.type == 2){
                type ='<span class="badge badge-secondary">Paquete</span>';
            }   
            return type;
    },
    buttons:function(dato){
        var buttons='';

        if(dato.status== 1){
            statu="<span class='badge badge-success'>Activo</span>";
            buttons += '<button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="' +dato.id+'"  ><i class="fa fa-edit"></i></button>';
            buttons += '<button type="button" class="btn btn-sm btn-outline-danger js-sweetalert   delete-package" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-window-close"></i></button>';
        
        }else {
            statu="<span class='badge badge-secondary'>Inactivo</span>";
            buttons += '<button type="button" class="btn btn-sm btn-outline-success delete-package" title="Activar Paquete" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button>';
            buttons += '<button type="button" class="btn btn-sm btn-outline-danger deletepackage" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>';
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
            }else{
                    var qc = data[0].quantity*data[0].cost;

                    var dato=`<tr id="list${data[0].supply}">
                    <td>${name}</td>
                    <td>$${parseFloat(data[0].cost).toFixed(2)}</td>
                    <td>${data[0].quantity}</td>
                    <td>$${parseFloat(qc).toFixed(2)}</td>
                    <td>
                        <button id="da${data[0].supply}" value="${data[0].supply}" class="btn btn-danger rw" onclick="package.supllydelete(${data[0].supply});"><i class="fa fa-trash-o"></i></button>
                        <input id="infq${data[0].supply}" type="hidden" name="quantity[]" value="${data[0].quantity}">
                        <input id="infqc${data[0].supply}" type="hidden" name="qc[]" value="${parseFloat(qc).toFixed(2)}">
                    </td>
                </tr>`;
                
            $("#supplytable").append(dato);
            $('#id_supply').children("option:selected").hide();
            $('#id_supply').trigger('change').val(0);
            $('#quantity').val(0);
            var cost= parseFloat($('#cost').val());
            var total = cost + qc;
            console.log(total);
            $('#cost').val(parseFloat(total).toFixed(2));
    }
        

    },
    supllydelete:function(supply){
        var qc= $('#infqc'+supply).val();
        var costo = parseFloat($('#cost').val());
        var total = costo - qc;
        $('#cost').val(parseFloat(total).toFixed(2));
        $('#id_supply').children(".opt"+supply).show();
        $('#list'+supply).remove();
    },
    datapackage:function(){
        var pack ={
                name:$('#name').val(),
                id_school:$('#id_school').val(),
                type:$('#type').val(),
                cost:$('#cost').val(),
                price:$('#price').val(),
                dateS:$('#dateS').val(),
                dateE:$('#dateE').val(),
        }

        return pack;
    },
    datadetailpackage:function(){
        var select =[];
        $(".rw").each(function () {
           var no=$(this).val();
           var no2=$("#infq"+$(this).val()).val()
                detail={
                    supply:no,
                    quantity:no2,
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
                                text: "Paquete añadido",
                                type: "success",
                                button: "OK",
                            });
                           
                            var table = $('#myTable').DataTable();
                            var rowNode= table.row.add( [
                                    'PCK'+dato.id,
                                    package.type(dato),
                                    dato.name,
                                    dato.cost,
                                    dato.price,
                                    package.status(dato),
                                    package.buttons(dato),
                                ] ).draw().node().id = 'package_id'+dato.id;
                        
                            $('#package_id'+dato.id).css("background-color", "#c3e6cb");
                            $('#package_id'+dato.id).find('td:eq(0)').addClass("hidden-xs");
                            $('#package_id'+dato.id).find('td:eq(2)').addClass("hidden-xs");
                            
                            }else{ //if user updated an existing record
                            swal({
                                title: dato.name,
                                text: "Paquete modificado",
                                type: "success",
                                button: "OK",
                            });
    
                            var edit = [
                                'PCK'+dato.id,
                                package.type(dato),
                                dato.name,
                                dato.cost,
                                dato.price,
                                package.status(dato),
                                package.buttons(dato),
                                ];
                                
                                $('#myTable').dataTable().fnUpdate(edit,$('tr#package_id'+dato.id)[0], undefined, false, false);
                                $('#package_id'+dato.id).css("background-color", "#ffdf7e");
                            }
                                $('#myModalLabel').html("");
                                $('#frmPack').trigger("reset");
                                $('.frmNew').hide();
                                package.deletetable();
                                $("#id_category").val(0)
                                $('.table-responsive').show();
                                $('#btn_add').show();
                        }
                },
            show: function(data){
                console.log(data);
                                $('#package_id').val(data.aditional.id);
                                $('#name').val(data.aditional.name);
                                $('#id_school').val(data.aditional.id_school);
                                $('#type').val(data.aditional.type);
                                $('#cost').val(parseFloat(data.aditional.cost).toFixed(2));
                                $('#price').val(data.aditional.price);
                                $('#dateS').val(data.aditional.dateS);
                                $('#dateE').val(data.aditional.dateE);

                                $.each(data.detailaditional, function (index, da) {
                                    var dato=`<tr id="list${da.id_supply}">
                                                <td>${da.name}</td>
                                                <td>$${parseFloat(da.cost).toFixed(2)}</td>
                                                <td>${da.quantity}</td>
                                                <td>$${parseFloat(da.total_price).toFixed(2)}</td>
                                                <td>
                                                    <button id="da${da.id_supply}" value="${da.id_supply}" class="btn btn-danger rw" onclick="package.supllydelete(${da.id_supply});"><i class="fa fa-trash-o"></i></button>
                                                    <input id="infq${da.id_supply}" type="hidden" name="quantity[]" value="${da.quantity}">
                                                    <input id="infqc${da.id_supply}" type="hidden" name="qc[]" value="${parseFloat(da.total_price).toFixed(2)}">
                                                </td>
                                            </tr>`;
                                    $("#supplytable").append(dato);

                                    });
                               

                                $('#btn_add').hide();
                                $('.table-responsive').hide();
                                $('.frmNew').show();
                                $('#btn-save').val("update");
                                $('#myModal').modal('show');
                },
            deactivated:  function(data){
                console.log(data);
                if(data.status == 0){
                    $('#myTable').dataTable().fnDeleteRow('#package_id' + data.id);
    
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
                        'PCK'+dato.id,
                         package.type(dato),
                         dato.name,
                         dato.cost,
                         dato.price,
                         package.status(dato),
                         package.buttons(dato),
                    ];
    
                    $('#myTable').dataTable().fnUpdate(edit,$('tr#package_id'+dato.id)[0]);
                    if(dato.status==1){
                        $('#package_id'+dato.id).css("background-color", "#c3e6cb");
                    }else{
                        $('#package_id'+dato.id).css("background-color", "#f2dede");
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
                    });
                }
    }