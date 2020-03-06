<table class="table table-striped text-center" id="tag_container">
    <thead class="text-white thead-yasc">
        <tr>
            <th width="100px"></th>
            <th>Client</th>
            <th>Description</th>
            <th>Interval</th>
            <th>Minutes</th>
            <th class="hidden-xs" >Status</th>
            <th>Options</th>
        </tr>
    </thead>
    <tbody id="contact-list">
        @foreach ($data as $client)
        <tr id="client_id{{$client->id}}" >
            <td><span class="badge badge-secondary" style = "background:{{$client->color}}">&nbsp;&nbsp;&nbsp;</span></td>
            <td>{{$client->name }}</td>
            <td>{{$client->description}}</td>
            <td>{{$client->interval}}</td>
            <td>{{$client->duration}}</td>
                @switch($client->status)
                    @case(1)
                            <td class="hidden-xs">
                                <span class='badge badge-success'>Activated</span>
                            </td>
                            <td>
                                <button type="button" class="btn btn-sm btn-outline-secondary btn-edit" data-toggle="tooltip" title="Edit"  value="{{$client->id}}"  ><i class="fa fa-edit"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-type" data-toggle="tooltip" title="Deactivated" data-type="confirm" value="{{$client->id}}"><i class="fa fa-window-close"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-secondary btn_add_contacts"  data-toggle="tooltip" title="Contacts" value="{{$client->id}}"><i class="fa fa-users"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-secondary open-documents" title="Documents" data-toggle="tooltip" value="{{$client->id}}"><i class="fa  fa-folder-open"></i></button>
                            </td>
                    @break
                    @case(2)
                            <td class="hidden-xs">
                                <span class='badge badge-secondary'>Deactivated</span>
                            </td>
                            <td>
                                <button type="button" class="btn btn-sm btn-outline-success off-type" data-toggle="tooltip" title="Activated" data-type="confirm" value="{{$client->id}}" ><i class="fa fa-check-square-o"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert deleteClient" data-toggle="tooltip" title="Delete" data-type="confirm" value="{{$client->id}}"><i class="fa fa-trash-o"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-secondary btn_add_contacts" data-toggle="tooltip" title="Contacts" value="{{$client->id}}"><i class="fa fa-users"></i></button>
                                <button type="button" class="btn btn-sm btn-outline-secondary open-documents" data-toggle="tooltip" title="Documents" value="{{$client->id}}"><i class="fa  fa-folder-open"></i></button>
                            </td>
                    @break
                @endswitch 
        
        </tr>
        @endforeach
    </tbody>
</table>
{!! $data->render() !!}