getData(1);

$(document).ready(function(){
    
    var nameDeli='<a href="/training">Training</i></a>';
    $('.nameDeli').html(nameDeli);
    $('#sidebar10').addClass('active');  

    //get base URL *********************
    var url = $('#url').val();
     $('.js-example-basic-single').select2();
    $('.js-example-basic-multiple').select2();


    //display modal form for creating new product *********************
    $('#btn_add').click(function(){
        $('#btn-save').val("add");
        $('#traineeNewForm').trigger("reset");
        $('#myModalLabel').html(`Create New Trainee `);
        // $("#image").attr('src','');
        $(".bodyIndex").hide();
        $('#formCU').show();
        
    });
       //display modal form for creating new product *********************
    $('.cancel-cu').click(function(){
        $('#btn-save').val("add");
        $('#traineeNewForm').trigger("reset");
        $('#myModalLabel').html(`Create New Trainee`);
        // $("#image").attr('src','');
        $('#formCU').hide();
        $(".bodyIndex").show();
    });

    $('#dateSearch').change(function(){
        //  $('#daySearch').val(),
        var date = $('#dateSearch').val();
         date = moment(date).format('YYYY/MM/DD');
        var fecha = new Date(date);
        fecha = new Date(fecha.setHours(0,0,0,0));
        var weekday = fecha.getDay();
         $('#daySearch').val(weekday);
         $('#daySearch').trigger('change');

        training.get_data(1);
    });

    $('.trainingSearch').change(function(){
        training.get_data(1);
    });

    //function to change the schedule every day by selecting start_Sunday
    $('#start_sunday').change(function(){
        var start_sunday = $('#start_sunday').val();
        $('#start_monday').val(start_sunday);
        $('#start_monday').trigger('change');
        $('#start_tuesday').val(start_sunday);
        $('#start_tuesday').trigger('change');
        $('#start_wednesday').val(start_sunday);
        $('#start_wednesday').trigger('change');
        $('#start_thursday').val(start_sunday);
        $('#start_thursday').trigger('change');
        $('#start_friday').val(start_sunday);
        $('#start_friday').trigger('change');
        $('#start_saturday').val(start_sunday);
        $('#start_saturday').trigger('change');
    });

     //function to change the schedule every day by selecting end_Sunday
     $('#end_sunday').change(function(){
        var end_sunday = $('#end_sunday').val();
        $('#end_monday').val(end_sunday);
        $('#end_monday').trigger('change');
        $('#end_tuesday').val(end_sunday);
        $('#end_tuesday').trigger('change');
        $('#end_wednesday').val(end_sunday);
        $('#end_wednesday').trigger('change');
        $('#end_thursday').val(end_sunday);
        $('#end_thursday').trigger('change');
        $('#end_friday').val(end_sunday);
        $('#end_friday').trigger('change');
        $('#end_saturday').val(end_sunday);
        $('#end_saturday').trigger('change');
    });

    //display modal form for product EDIT ***************************
    $(document).on('click','.open_modal',function(){
        $('#traineeNewForm').trigger("reset");
        var training_id = $(this).val();
        var my_url = url + '/' + training_id;

            actions.show(my_url);
       
    });



    //create new product / update existing product ***************************
    $("#traineeNewForm").on('submit',function (e) {
        console.log('button');
      
        e.preventDefault(); 
        var formData =  $("#traineeNewForm").serialize();

        //used to determine the http verb to use [add=POST], [update=PUT]
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var training_id = $('#training_id').val();;
        var my_url = url;
        if (state == "update"){
            type = "POST"; //for updating existing resource
            my_url += '/' + training_id;
        }
        
            console.log(formData);
        
            actions.edit_create(type,my_url,state,formData);
    
    });

        $(document).on('click','.off-type',function(){
            var id = $(this).val();
            var my_url =url + '/' + id;
                $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                }
            })
                if($(this).attr('class') == 'btn btn-sm btn-outline-success off-type')
                {
                    title= "Do you want to activate this option?";
                    text="The Option will be activated";
                    confirmButtonText="Activate";

                    datatitle="Activated";
                    datatext="activated";
                    datatext2="Activation";
                }
                else 
                {
                    title= "Do you want to disable this option?";
                    text= "The Option will be deactivated";
                    confirmButtonText="Desactivar";

                    datatitle="Deactivated";
                    datatext="deactivated";
                    datatext2="Deactivation";

                }
    

                swal({
                    title: title,
                    text: text,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn btn-danger",
                    confirmButtonText: confirmButtonText,
                    cancelButtonText: "Cancel",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                    swal(datatitle, "Option "+datatext, "success");
                    actions.deactivated(my_url);
                    } 
                    else {
                    
                    swal("Cancelled", datatext2+" cancelled", "error");
                
                    }
            });
        });

    //delete product and remove it from TABLE list ***************************
    $(document).on('click','.deleteSettings',function(){
        var privada_id = $(this).val();
        var my_url = url + '/delete/' + privada_id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        swal({
            title: "Are you sure you wish to delete this option?",
            text: "All records with this option will be modified",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn btn-danger",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            closeOnConfirm: true,
            closeOnCancel: false
          },
          function(isConfirm) {
            if (isConfirm) {
                actions.deactivated(my_url);
            }else {
               swal("Cancelled", "Deletion Canceled", "error");
            }
          });
        });


    //display modal form for product DETAIL ***************************
    $(document).on('click','.open_detail',function(){
        var training_id = $(this).val();
       
        // Populate Data in Edit Modal Form
        $.ajax({
            type: "GET",
            url: url + '/' + training_id,
            success: function (data) {
                console.log(data);
                $(".modal-body-detail").html(data);
                $('#myModal2').modal('show');
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
    });
    
});
const training ={
    button: function(dato){
           var buttons='';
            if(dato.status== 1){
               buttons += ' <button class="btn  btn-sm btn-outline-secondary open_modal"  data-toggle="tooltip" title="Edit"  value="'+dato.id+'"> <i class="fa fa-edit"></i></li></button>';
               buttons += '	<button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-type" title="Deactivated" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-window-close"></i></button>';
          
           }else if(dato.status == 2){
               buttons+='<button type="button" class="btn btn-sm btn-outline-success off-type" title="Activated" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button>'
               buttons += '<button class="btn btn-sm btn-outline-danger js-sweetalert deleteSettings" data-toggle="tooltip" title="Delete" value="'+dato.id+'"><i class="fa fa-trash-o"></i> </button>';
           }
           return buttons;
    },
    status:function(dato){
        var status='';
        if(dato.status== 1){
            status +="<span class='badge badge-success'>Activated</span>";
        }else if(dato.status == 2){
            status +="<span class='badge badge-secondary'>Deactivated</span>";
        }
       return status;
    },
    get_data: function(page){
        var formData={
            day: $('#daySearch').val(),
            // client:$('#clientSearch').val(),
            date:$('#dateSearch').val(),
            // operator:$('#operatorSearch').val(),
        }
        console.log(formData);
        $.ajax(
        {
            url: '?page=' + page,
            data:formData,
            type: "get",
            datatype: "html"
        }).done(function(data){
            $('.pagination').remove();
            $("#tag_container").empty().html(data);
            location.hash = page;
        }).fail(function(jqXHR, ajaxOptions, thrownError){
              alert('No response from server');
        });
    }
}
const success = {

    new_update: function (data,state){
        console.log(data);
        var dato = data;
        var typename =$('#name').val();
        var type =$('#id_option').val();

        switch (dato.No) {
            case 1:
                swal({
                    title: "Datos Existentes",
                    text: dato.msg,
                    type: "warning",
    
                  });
                break;
            case 2:
            
            break;
        
            default:
                var setting = `<tr id="training_id${dato.id}">
                    <td>${dato.id}</td>
                    <td>${dato.name}</td>
                    <td>${dato.option}</td>
                    <td class="hidden-xs">${settings2.status(dato)}</td>
                    <td>${settings2.button(dato)}</td>
                </tr>`;

                if (state == "add"){ 
                    $("#settings-list").append(setting);
                    $("#training_id"+dato.id).css("background-color", "#c3e6cb");    
                }else{
                    $("#training_id"+dato.id).replaceWith(setting);
                    $("#training_id"+dato.id).css("background-color", "#ffdf7e");  
                }
                $('#formCU').hide();
                $(".bodyIndex").show();
                break;
        }
        
    },

    deactivated:function(data) {
        console.log(data);
        var dato = data;
        if(dato.status != 0){
            var setting = `<tr id="training_id${dato.id}">
                <td>${dato.id}</td>
                <td>${dato.name}</td>
                <td>${dato.option}</td>
                <td class="hidden-xs">${settings2.status(dato)}</td>
                <td>${settings2.button(dato)}</td>
            </tr>`;
          
            $("#training_id"+dato.id).replaceWith(setting);
            if(dato.status == 1){
                color ="#c3e6cb";
            }else if(dato.status == 2){
                color ="#ed969e";
            }
            $("#training_id"+dato.id).css("background-color", color); 

        }else if(dato.status == 0){
            $("#training_id"+dato.id).remove();
        }
       
    },

    show: function(data){
        console.log(data);
        $('#training_id').val(data.id);
        $('#name').val(data.name);
        $('#id_option').val(data.id_option);
        $('#btn-save').val("update");
        $('#myModalLabel').html(`Update Settings <i class="fa fa-user-plus"></i>`);
        $('#myModal').modal('show');
    },

    msj: function(data){
        console.log(data);
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

    },
}



    
