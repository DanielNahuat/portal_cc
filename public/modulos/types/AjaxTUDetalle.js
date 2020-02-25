
$(document).ready(function(){
    var url = $('#url').val();
    var nameDeli='<a href="/types">Perfiles</i></a> / <a href="'+url+'">Asignacion de perfiles</i></a>';
    $('.nameDeli').html(nameDeli);
    $('#sidebar5').addClass('active');       
            //create new product / update existing product ***************************
    $(".add-option").click(function (e) {
        id_menu= $(this).val();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })

        e.preventDefault(); 
        var formData = {
            id_type_user:$('#id_typeuser').val(),
        }

        //used to determine the http verb to use [update=PUT]
        var usertype_id = id_menu;;
        var my_url = url;
        var type = "PUT"; //for updating existing resource
            my_url += '/' + usertype_id;
     
        console.log(formData);
       
        swal({
            title: "¿Estas seguro que deseas habilitar este acceso?",
            type: "success",
            showCancelButton: true,
            confirmButtonClass: "btn btn-succes",
            confirmButtonText: "Habilitar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: false
            
          },
          function(isConfirm) {
            if (isConfirm) {
              swal("Habilitado", "Acceso habilitado","success");
              $.ajax({
                type: type,
                url: my_url,
                data: formData,
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    var product = "<button type='button' value="+data.id+" id='optionmenu"+data.id+"' class='btn btn-success delete-option'><i class='fa fa-unlock'></i></button></h1>";
                    $("#optionmenu" + usertype_id).replaceWith(product);
                },
                error: function (data) {
                    console.log('Error:', data);
                    
                }
            });
            } else {
                swal("Cancelado", "Operacion cancelada", "info");
             
            }
          });
       
       
    });



       //delete product and remove it from TABLE list ***************************
       $(document).on('click','.delete-option',function(){
           var detailfood_id = $(this).val();
            $.ajaxSetup({
               headers: {
                   'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
               }
           })

           swal({
            title: "¿Estas seguro que deseas deshabilitar este acceso?",
            type: "error",
            showCancelButton: true,
            confirmButtonClass: "btn btn-succes",
            confirmButtonText: "Deshabilitar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: false
            
          },
          function(isConfirm) {
            if (isConfirm) {
              swal("Deshabilitado", "Acceso deshabilitado","error");
              $.ajax({
                type: "DELETE",
                url: url + '/' + detailfood_id,
                success: function (data) {
                    console.log(data);
                    location.reload();
                    var product = "<button type='button' value="+data.id+" id='optionmenu"+data.id+"' class='btn btn-danger delete-order'><i class='clip-unlocked'></i></button></h1>";
                     $("#optionmenu" + usertype_id).replaceWith(product);
               
                },
                error: function (data) {
                    console.log('Error:', data);
                }
            });
            
            } else {
                swal("Cancelado", "Operacion cancelada", "info");
             
            }
          });

          
       });
       
   });