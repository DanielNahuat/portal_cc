getData(1);

$(document).ready(function(){

    var nameDeli='<a href="/vacancies">Vacancies</i></a>';
    $('.nameDeli').html(nameDeli);
    $('#sidebar9').addClass('active');  

    //get base URL *********************
    var url = $('#url').val();

    
    //display modal form for creating new product *********************
    $('#btn_add').click(function(){
        $('#btn-save').val("add");
        $('#vacancyForm').trigger("reset");
        $('#myModal').modal('show');
    });

    
    //display modal form for product EDIT ***************************
    $(document).on('click','.open_modal',function(){
        $('#vacancyForm').trigger("reset");
        var vacancy_id = $(this).val();
        var my_url = url + '/' + vacancy_id;

        actions.show(my_url);
       
    });

    //create new product / update existing product ***************************
    $("#vacancyForm").on('submit',function (e) {
        console.log('button');
      
        e.preventDefault(); 
        var formData =  $("#vacancyForm").serialize();
        
        if($("#name").val().length > 30)
        {
            alert("Ingrese un nombre menor a 30 caracteres");
            return false;
        }

        //used to determine the http verb to use [add=POST], [update=PUT]
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var vacancy_id = $('#vacancy_id').val();;
        var my_url = url;
        if (state == "update"){
            type = "POST"; //for updating existing resource
            my_url += '/' + vacancy_id;
        }
        
            console.log(formData);
        
            actions.edit_create(type,my_url,state,formData);
    
    });

    $(document).on('click','.off-vacancy',function(){
        var id = $(this).val();
        var my_url =url + '/' + id;
            $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
            if($(this).attr('class') == 'btn btn-sm btn-outline-success off-vacancy')
            {
                title= "¿Deseas activar esta Vacante?";
                text="La vacante se activara";
                confirmButtonText="Activar";

                datatitle="Activado";
                datatext="activado";
                datatext2="Activacion";
            }
            else 
            {
                title= "¿Desea desactivar esta vacante?";
                text= "La vacante se desactivara";
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
                swal(datatitle, "Vacante "+datatext, "success");
                actions.deactivated(my_url);
                } 
                else {
                
                swal("Cancelado", datatext2+" cancelada", "error");
            
                }
        });
    });

     //delete product and remove it from TABLE list ***************************
     $(document).on('click','.delete-vacancy',function(){
        var vacancy_id = $(this).val();
        var my_url = url + '/delete/' + vacancy_id;
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        swal({
            title: "¿Desea eliminar esta Vacante?",
            text: "La vacante se eliminara permanentemente",
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


});



const vacancies ={
    button: function(dato){
           var buttons='<div class="btn-group">';
            if(dato.status== 1){
                buttons += '<a class="btn btn-sm btn-outline-primary" data-toggle="tooltip" title="Ver Candidatos" href="/candidates/'+dato.id+'"><i class="fa fa-users"></i></a>';
               buttons += '<button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="'+dato.id+'"  ><i class="fa fa-edit"></i></button>';
               buttons += '	<button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-vacancy" title="Deactivated" data-type="confirm" value="'+dato.id+'"><i class="fa fa-window-close"></i></button>';
          
           }else if(dato.status == 2){
           
               buttons+='<button type="button" class="btn btn-sm btn-outline-success off-vacancy" title="Activated" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button>'
               buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert delete-vacancy" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>';
           }
           buttons+='</div>';
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
}

const success = {

    new_update: function (data,state){
        console.log(data);
        var dato = data;
        var vacancyname =$('#name').val();
        
        if(dato =='error en agregar datos.'){
            swal({
                title: "Datos Existentes",
                text: "La vacante: "+vacancyname+" ya existe",
                type: "warning",

              });
        }
        else{
            var vacancy = `<tr id="vacancy_id${dato.id}">
                                <td>${dato.id}</td>
                                <td>${dato.name}</td>
                                <td>${dato.description}</td>
                                <td class="hidden-xs">${vacancies.status(dato)}</td>
                                <td>${vacancies.button(dato)}</td>
                            </tr>`;
        
            if (state == "add"){ 
              $("#vacancy-list").append(vacancy);
              $("#vacancy_id"+dato.id).css("background-color", "#c3e6cb");    
            }else{
              $("#vacancy_id"+dato.id).replaceWith(vacancy);
              $("#vacancy_id"+dato.id).css("background-color", "#ffdf7e");  
            }

            $('#myModal').modal('hide')
        }
        
    },
    
    show: function(data){
        console.log(data);
        $('#vacancy_id').val(data.id);
        $('#name').val(data.name);
        $('#description').val(data.description);
        $('#btn-save').val("update");
        $('#myModal').modal('show');
    },

    deactivated:function(data) {
        console.log(data);
        var dato = data;
        if(dato.status != 0){
            var vacancy = `<tr id="vacancy_id${dato.id}">
                                <td>${dato.id}</td>
                                <td>${dato.name}</td>
                                <td>${dato.description}</td>
                                <td class="hidden-xs">${vacancies.status(dato)}</td>
                                <td>${vacancies.button(dato)}</td>
                            </tr>`;
          
            $("#vacancy_id"+dato.id).replaceWith(vacancy);

        }else if(dato.status == 0){
            $("#vacancy_id"+dato.id).remove();
        }
       
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