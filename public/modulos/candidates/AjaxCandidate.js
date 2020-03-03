getData(1);

$(document).ready(function(){
    var can0 = $('#id_candidate').val();
    var nameDeli='<a href="/vacancies">Vacantes</i></a> / <a href="/candidates/'+can0+'">Candidates</i></a>';

    $('.nameDeli').html(nameDeli);
    $('#sidebar10').addClass('active');  

      //get base URL *********************
      var url = $('#url').val();


      //display modal form for creating new product *********************
      $('#btn_add').click(function(){
          $('#btn-save').val("add");
          $('#candidateForm').trigger("reset");
          $('#myModal').modal('show');
      });

       //display modal form for product EDIT ***************************
    $(document).on('click','.open_modal',function(){
        $('#candidateForm').trigger("reset");
        var candidate_id = $(this).val();
        var my_url = url + '/' + candidate_id;

            actions.show(my_url);
       
    });

     //create new product / update existing product ***************************
     $("#candidateForm").on('submit',function (e) {
        console.log('button');
      
        e.preventDefault(); 
        var formData =  $("#candidateForm").serialize();
        
        if($("#name").val().length > 30)
        {
            alert("Ingrese un nombre menor a 30 caracteres");
            return false;
        }

        //used to determine the http verb to use [add=POST], [update=PUT]
        var state = $('#btn-save').val();
        var type = "POST"; //for creating new resource
        var candidate_id = $('#candidate_id').val();;
        var my_url = url;
        if (state == "update"){
            type = "POST"; //for updating existing resource
            my_url += '/' + candidate_id;
        }
        
            console.log(formData);
        
            actions.edit_create(type,my_url,state,formData);
    
    });


    $(document).on('click','.off-candidate',function(){
        var id = $(this).val();
        var my_url =url + '/' + id;
            $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
            if($(this).attr('class') == 'btn btn-sm btn-outline-success off-candidate')
            {
                title= "¿Deseas activar esta Candidato?";
                text="La Candidato se activara";
                confirmButtonText="Activar";

                datatitle="Activado";
                datatext="activado";
                datatext2="Activacion";
            }
            else 
            {
                title= "¿Desea desactivar esta Candidato?";
                text= "La Candidato se desactivara";
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
                swal(datatitle, "Candidato "+datatext, "success");
                actions.deactivated(my_url);
                } 
                else {
                
                swal("Cancelado", datatext2+" cancelada", "error");
            
                }
        });
    });



    
     //delete product and remove it from TABLE list ***************************
     $(document).on('click','.delete-candidate',function(){
        var candidate_id = $(this).val();
        var my_url = url + '/delete/' + candidate_id;
        
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        swal({
            title: "¿Desea eliminar este Candidato?",
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



const candidates ={
    button: function(dato){
           var buttons='<div class="btn-group">';
            if(dato.status== 1){
               
                buttons += '<a class="btn btn-sm btn-outline-primary" data-toggle="tooltip" title="Ver Documentos" href=""><i class="fa fa-cubes"></i></a>';
                buttons += ' <button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="'+dato.id+'"  ><i class="fa fa-edit"></i></button>';
                buttons += ' <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-candidate" title="Deactivated" data-type="confirm" value="'+dato.id+'"><i class="fa fa-window-close"></i></button>';
          
           }else if(dato.status == 2){
       
               buttons += '<button type="button" class="btn btn-sm btn-outline-success off-candidate" title="Activated" data-type="confirm" value="'+dato.id+'" ><i class="fa fa-check-square-o"></i></button> ';
               buttons += '  <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert delete-candidate" title="Delete" data-type="confirm" value="'+dato.id+'"><i class="fa fa-trash-o"></i></button>';
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
        var candidatename =$('#name').val();
        
        if(dato =='error en agregar datos.'){
            swal({
                title: "Datos Existentes",
                text: "El candidate: "+candidatename+" ya existe",
                type: "warning",
              });
        }
        else{
            var candidate = `<tr id="candidate_id${dato.id}">
                                <td>${dato.id}</td>
                                <td>${dato.name_vacancy}</td>
                                <td>${dato.name}</td>
                                <td>${dato.last_name}</td>
                                <td>${dato.phone}</td>
                                <td>${dato.mail}</td>
                                <td>${dato.channel}</td>
                                <td>${dato.listening_test}</td>
                                <td>${dato.grammar_test}</td>
                                <td>${dato.typing_test}</td>
                                <td>${dato.personality_test}</td>
                                <td>${dato.recording}</td>
                                <td>${dato.cv}</td>
                                <td class="hidden-xs">${candidates.status(dato)}</td>
                                <td>${candidates.button(dato)}</td>
                            </tr>`;
        
            if (state == "add"){ 
              $("#candidate-list").append(candidate);
              $("#candidate_id"+dato.id).css("background-color", "#c3e6cb");    
            }else{
              $("#candidate_id"+dato.id).replaceWith(candidate);
              $("#candidate_id"+dato.id).css("background-color", "#ffdf7e");  
            }

            $('#myModal').modal('hide')
        }
        
    },

    show: function(data){
        console.log(data);
        $('#candidate_id').val(data.id);
        $('#id_vacancy').val(data.id_vacancy);
        $('#name').val(data.name);
        $('#last_name').val(data.last_name);
        $('#phone').val(data.phone);
        $('#mail').val(data.mail);
        $('#channel').val(data.channel);
        $('#listening_test').val(data.listening_test);
        $('#grammar_test').val(data.grammar_test);
        $('#typing_test').val(data.typing_test);
        $('#personality_test').val(data.personality_test);
        $('#recording').val(data.recording);
        $('#cv').val(data.cv);
        $('#btn-save').val("update");
        $('#myModal').modal('show');
    },

    
    deactivated:function(data) {
        console.log(data);
        var dato = data;
        if(dato.status != 0){

            var candidate = `<tr id="candidate_id${dato.id}">
                                <td>${dato.id}</td>
                                <td>${dato.name_vacancy}</td>
                                <td>${dato.name}</td>
                                <td>${dato.last_name}</td>
                                <td>${dato.phone}</td>
                                <td>${dato.mail}</td>
                                <td>${dato.channel}</td>
                                <td>${dato.listening_test}</td>
                                <td>${dato.grammar_test}</td>
                                <td>${dato.typing_test}</td>
                                <td>${dato.personality_test}</td>
                                <td>${dato.recording}</td>
                                <td>${dato.cv}</td>
                                <td class="hidden-xs">${candidates.status(dato)}</td>
                                <td>${candidates.button(dato)}</td>
                            </tr>`;
          
            $("#candidate_id"+dato.id).replaceWith(candidate);

        }else if(dato.status == 0){
            $("#candidate_id"+dato.id).remove();
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