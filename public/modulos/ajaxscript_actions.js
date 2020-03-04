const actions ={
    edit_create:function(type,my_url,state,formData, actions = ''){
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    }
                })
            if(actions==="file"){
                
                    $.ajax({
                        type: type,
                        url: my_url,
                        data: formData,
                        dataType: 'json',
                        contentType: false,       
                        cache: false,             
                        processData:false, 
                        success: function (data) {
                            success.new_update(data,state,actions);
                            
                        },
                        error: function (data) {
                            console.log('Error:', data);
                            success.msj(data);
                        }
                    });

             }else{

                $.ajax({
                    type: type,
                    url: my_url,
                    data: formData,
                    dataType: 'json',
                    success: function (data) {
                        success.new_update(data,state,actions);
                    },
                    error: function (data) {
                        console.log('Error:', data);
                        success.msj(data);
                    }
                });
            }
    },
    show:function(my_url,action = ''){
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    }
                })
                // Populate Data in Edit Modal Form
                $.ajax({
                    type: "GET",
                    url:my_url,
                    success: function (data) {
                        success.show(data,action);
                    },
                    error: function (data) {
                        console.log('Error:', data);
                    }
                });
    },

    activated: function(my_url){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        $.ajax({
            type: "PUT",
            url: my_url,
            success: function (data) {
                success.activated(data)
            },

            error: function (data) {
                console.log('Error:', data);
                
            }
        });
    },
    
    deactivated: function(my_url) {
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
                    }
                })
                $.ajax({
                    type: "DELETE",
                    url: my_url,
                    success: function (data) {
                        success.deactivated(data);
                    },
                    error: function (data) {
                        console.log('Error:', data);
                    }
                });
    },

    delet: function(my_url){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        $.ajax({
            type: "DELETE",
            url: my_url,
            success: function (data) {
                success.delet(data);
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
    },
    modal:function(my_url,action = ''){
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
            }
        })
        // Populate Data in Edit Modal Form
        $.ajax({
            type: "GET",
            url:my_url,
            success: function (data) {
                success.modal(data,action);
            },
            error: function (data) {
                console.log('Error:', data);
            }
        });
    },
}

function messages(title,type, text ='')
{
    swal({
        title: title,
        type: type,
        text: text
        
    });
}

function RestrictSpace() {
    if (event.keyCode == 32) {
        return false;
    }
}

const operations = {

    formatNumber: function (num) {
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
    },
}

$(".allownumericwithdecimal").on("keypress keyup blur",function (event) {
    $(this).val($(this).val().replace(/[^0-9\.]/g,''));
    if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
});

$(window).on('hashchange', function() {
    if (window.location.hash) {
        var page = window.location.hash.replace('#', '');
        if (page == Number.NaN || page <= 0) {
            return false;
        }else{
            getData(page);
        }
    }
});


    $(document).on('click', '.pagination a',function(event)
    {
        event.preventDefault();

        $('li').removeClass('active');
        $(this).parent('li').addClass('active');

        var myurl = $(this).attr('href');
        var page=$(this).attr('href').split('page=')[1];

        getData(page);
    });


    $(document).on('click', '.search-query',function(event)
    {
        event.preventDefault();
        getData(1);
    });
  
    function getData(page){
        var search = $('#search').val()
        var type =$('#typesearch').val();
                $('.table-responsive').hide();
                $('.loading-table').show();
        $.ajax(
        {
            url: '?page=' + page,
            data:{dato:search,type:type},
            type: "get",
            datatype: "html"
        }).done(function(data){
            $('.pagination').remove();
            $("#tag_container").empty().html(data);
            location.hash = page;
            $('.table-responsive').show();
            $('.loading-table').hide();
        }).fail(function(jqXHR, ajaxOptions, thrownError){
              alert('No response from server');
        });
    }

    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip();   
    });