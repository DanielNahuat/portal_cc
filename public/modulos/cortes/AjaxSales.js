$(document).ready(function(){
    //get base URL *********************
        
        var url = $('#url').val();
        var baseurl = $('#baseurl').val();
        $('#myTable').DataTable();

            //ORDERNAMIENTO DE LA TABLA
        var table = $('#myTable').DataTable();
        table
        .columns( 0 )
        .order( 'desc' )
        .draw();
        
        
        //display modal form for creating new product *********************
        $('#btn_add').click(function(){
            $('#myModalLabel').html("Nuevo Venta  <i class='fa fa-tasks'></i>");
            $('#frmPack').trigger("reset");
            $('#cost').val(0);
            $('#btn-save').val("add");
            purchase.deletetable();
            $('.table-responsive').hide();
            $('#btn_add').hide();
            $('.Detail').hide();
            $('.frmNew').show();
            $('.tituloTabla').hide();
        
        });


        $('.backto').click(function(){
            $('#myModalLabel').html("");
            $('#frmPack').trigger("reset");
            $('.frmNew').hide();
            $('#cost').val(0);
            purchase.deletetable();
            $("#id_category").val(0);
            $('.detail').hide();
            $('.table-responsive').show();
            $('#btn_add').show();
            $('.tituloTabla').show();
            
        })


        $(document).on('click','.detailpurchase',function(){
            var sale_id = $(this).val();
            var my_url=baseurl + '/sales/' + sale_id;
            actions.modal(my_url);
        });

        $("#btnBuscar").click(function(){
       
            var id = $("#id").val();
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
                url:baseurl + "/saleDetail/getSales",
                dataType:"JSON",
                data:{fechaInicio:fechaInicio, fechaFin:fechaFin, id:id},
                success: function (data) {
    
                    data.forEach(function(dato){
                        
                        table.row.add( [
                            'SAL'+dato.id,
                            dato.caf,
                            dato.client,
                            '$'+purchase.formatNumber(dato.cost),
                            purchase.status(dato),
                            dato.dateC,
                            dato.dateU,
                            purchase.buttons(dato),
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

const purchase={
    
    deletetable: function(){
        $(".rw").each(function () {
            var no=$(this).val();
            $('#id_supply').children(".opt"+no).show();
            $('#list'+no).remove();
         });

    },
    formatNumber:function(num){
        
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
        return (((sign) ? '' : '-') + ''+num + '.' + cents);
        
    },
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

        buttons += `<button type="button" class="btn btn-sm btn-outline-info detailpurchase" title="Detail" data-type="confirm" value="${dato.id}"><i class="fa fa-eye"></i></button>`;

        return buttons;
    },
    
   
}

const success = { 
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
}