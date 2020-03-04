<table class="table table-striped text-center" id="tag_container">
    <thead class="text-white thead-yasc">
        <tr>
            <th>Client</th>
            <th>Description<th>
            <th></th>
            <th class="hidden-xs" >Status</th>
            <th>Options</th>
        </tr>
    </thead>
    <tbody id="client-list">
        @foreach ($data as $client)
        <tr id="client_id{{$client->id}}" >
            <td>{{ $client->name }}</td>
            <td>{{$client->description}}</td>
            <td style = "background:{{$client->color}}"></td>
            <td>
                @switch($client->status)
                    @case(1)
                            <td class="hidden-xs">
                                <span class='badge badge-success'>Activated</span>
                            </td>
                            <td>
                                <button type="button" class="btn btn-sm btn-outline-primary" title="Information" value="{{$client->id}}"><i class="fa fa-info-circle"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="{{$client->id}}"  ><i class="fa fa-edit"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-type" title="Deactivated" data-type="confirm" value="{{$client->id}}"><i class="fa fa-window-close"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-secondary" title="Contacts" value="{{$client->id}}"><i class="fa fa-book"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-secondary" title="Documents" value="{{$client->id}}"><i class="fa  fa-folder-open"></i></button>
                            </td>
                    @break
                    @case(2)
                            <td class="hidden-xs">
                                <span class='badge badge-secondary'>Deactivated</span>
                            </td>
                            <td>
                                <button type="button" class="btn btn-sm btn-outline-primary" title="Information" value="{{$client->id}}"><i class="fa fa-info-circle"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-success off-type" title="Activated" data-type="confirm" value="{{$client->id}}" ><i class="fa fa-check-square-o"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert deleteSettings" title="Delete" data-type="confirm" value="{{$client->id}}"><i class="fa fa-trash-o"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-secondary" title="Contacts" value="{{$client->id}}"><i class="fa fa-book"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-secondary" title="Documents" value="{{$client->id}}"><i class="fa  fa-folder-open"></i></button>
                            </td>
                    @break
                @endswitch
            </td>   
        
        </tr>
        @endforeach
    </tbody>
</table>
{!! $data->render() !!}