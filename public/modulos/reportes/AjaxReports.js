$(document).ready(function(){
    //get base URL *********************
    $('#sidebar4').addClass('active');  
    var url = $('#url').val();
    var urlbase=$('#baseurl').val();
   
   $("#school_id").change(function(){
       var id=$(this).val();
       var my_url = urlbase + '/cafeterias/' + id;
       selectCafeterias(my_url,cafe_id = '');
       selectUsuarios(my_url,user_id = '');
   });

   $("#cafe_id").change(function(){
       var id=$(this).val();

       if( id > 0){
           $("#mov_id").val('all');
           $("#mov_id").trigger('change');
           $("#mov_id").attr('disabled', true);
        }else{
            $("#mov_id").attr('disabled', false);
       }
   });

   $("#fechaInicio").change(function(){
       
       fechaInicio = $(this).val();
       $("#fechaFin").attr("min", fechaInicio);
   });


   var table = $('#myTable').DataTable();
   
   $("#btnBuscar").click(function(){
       
       var school_id = $("#school_id").val();
       var cafe_id = $("#cafe_id").val();
       var user_id = $("#user_id").val();
       var mov_id = $("#mov_id").val();
       var fechaInicio = $("#fechaInicio").val();
       var fechaFin = $("#fechaFin").val();

       if(fechaInicio != "" && fechaFin != ""){

           if(fechaFin < fechaInicio){
               swal({
                   title: "Fechas No Válidas",
                   type: "error",
                   text: "La fecha Fin no puede ser menor a la fecha Inicio"
               });
               return;
           }
       }
      
       $("#btnBuscar").attr("disabled", true);

       table.clear().draw();

       $.ajaxSetup({
           headers: {
               'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
           }
       });

       $.ajax({
           type: "POST",
           url:url + "/getMovement",
           dataType:"JSON",
           data:{school_id:school_id, cafe_id:cafe_id, user_id:user_id,mov_id:mov_id, fechaInicio:fechaInicio, fechaFin:fechaFin},
           success: function (data) {

                    buttons = "";

                   data.forEach(function(dato){

                    if(dato.id_movement == 4){
                        buttons = `
                        <td>
                            <button type="button" class="btn btn-outline-info js-sweetalert modal-ver-detalles" title="Ver Detalles" onclick=showModal(${dato.id}) data-type="confirm" value="${dato.id}"><i class="fa fa-eye"></i></button>
                        </td>
                    `;
                    }else{
                        buttons = `<td></td>`;
                    }
                       
                       table.row.add( [
                           dato.mat+dato.id,
                           dato.name_user,
                           dato.name_tutee,
                           dato.description,
                           formatNumber(dato.saldo),
                           formatNumber(dato.saldo_anterior),
                           dato.created_at,
                           buttons
                       ] ).draw(); 
                   });
                   $("#btnBuscar").attr("disabled", false);
               
           },
           error: function (data) {
               console.log('Error:', data);
           }
       });
   });

});

function showModal(id){
   
    var id = id;
    var url = $('#url').val();
    
    var my_url = url + '/' + id;
    actions.modal(my_url);
    $("#codigo_qr" ).empty();
    $("#modal_view").modal('show');
 
}

function selectCafeterias(my_url,cafe_id = ''){
   $.ajaxSetup({
       headers: {
           'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
       }
   })

   $.ajax({
       type: "GET",
       url:my_url,
       success: function (data) {
           var dataselect='<option value="all">Seleccione la Cafeteria</option>';
           $.each(data.cafe, function(i, d) {
               dataselect+='<option value="' + d.id + '">' + d.name + '</option>';
           });
           $('#cafe_id').html(dataselect);
           if(cafe_id>0){
               $('#cafe_id').val(cafe_id).trigger('change'); 
           }
         
       },
       error: function (data) {
           console.log('Error:', data);
       }
   });
}
function selectUsuarios(my_url,user_id = ''){
   $.ajaxSetup({
       headers: {
           'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
       }
   })

   $.ajax({
       type: "GET",
       url:my_url,
       success: function (data) {
           var dataselect='<option value="all">Seleccionar Usuario</option>';
           $.each(data.user, function(i, d) {
               dataselect+='<option value="' + d.id + '">' + d.name + '</option>';
           });
           $('#user_id').html(dataselect);
           if(user_id>0){
               $('#user_id').val(user_id).trigger('change'); 
           }
         
       },
       error: function (data) {
           console.log('Error:', data);
       }
   });
}

//Nuevo codigo
function newQr(cod=null,modal=null){
    if(cod == null){
        codigo = codeGenerator(10);
    }else{
        codigo = cod;
    }
    
    if(modal == null){
        $('#qr_code').val(codigo);
        new QRCode(document.getElementById('codigo_qr'), ""+codigo+"");

    }else{
        $('#qr_code_modal').val(codigo);
        new QRCode(document.getElementById('qr_modal'), ""+codigo+"");
    }

}


function codeGenerator(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

function formatNumber(num) {
    if (!num || num == 'NaN') return '0.00';
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
    return (((sign) ? '' : '-') + num + '.' + cents);
}

const success = { 

    modal: function(dato){
        console.log(dato);

        data = dato.mov;
        detalle = dato.detail;

        $('#qr_modal').empty();
        newQr(data.code,1);

        var url = $('#url').val();
        var baseurl = $('#baseurl').val();
        var rutaImage = baseurl + '/images/tutees/' + data.image;
        var rutaImageDefault = baseurl + '/images/default.png';
        if(data.image != "" && data.image != null){
            rutaImage = rutaImage;
        }else{
            rutaImage = rutaImageDefault;
        }

        $('#qr_modal').val(data.id);
        $('#name_tutorado_modal').html( data.tutee_name+" "+data.surname+" "+data.lastname);
        $('#nivel_modal').html(data.nivel);
        $('#total_modal').html("$"+formatNumber(data.total_compra));
        $('#cafe_modal').html(data.cafe_name);
        $('#fecha_modal').html(data.fecha);

        $('#tutorado').attr('src',rutaImage);

        html = "";
        detalle.forEach(function(data){
            console.log(data);
            html += `
                <tr>
                    <td>${data.id}</td>
                    <td>${data.name}</td>
                    <td>x${data.quantity}</td>
                    <td>$ ${formatNumber(data.cost)}</td>
                    <td>$ ${formatNumber(data.total_price)}</td>
                </tr>
            `;
        })
        $("#seccionDetalle").html(html);
    },
    
}