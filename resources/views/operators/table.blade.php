<table class="table table-striped text-center" id="tag_container">
    <thead class="text-white thead-yasc">
        <tr>
            <th width="100px">ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Emergency Contact</th>
            <th>Birthday</th>
            <th class="hidden-xs" >Status</th>
            <th>Options</th>
        </tr>
    </thead>
    <tbody id="operator-list">
      @foreach($data as $op)
        <tr id="operator_id{{$op->id}}">
            <td>{{$op->id}}</td>
            <td>{{$op->email}}</td>
            <td>{{$op->name}}</td>
            <td>{{$op->phone}}</td>
            <td>{{$op->emergency_contact_phone}}</td>
            <td>{{$op->birthdate}}</td>
            @switch($op->id_status)
                @case(1)
                    <td class="hidden-xs">
                        <span class='badge badge-success'>Activated</span>
                    </td>
                    <td>
                        <a class="btn btn-sm btn-outline-primary" data-toggle="tooltip" title="Assignament Type" id="btn-edit" href="/assignmenttype/{{$op->id}}"  ><i class="fa fa-info-circle"></i></a>
                        <button type="button" class="btn btn-sm btn-outline-secondary open_modal" data-toggle="tooltip" title="Edit" id="btn-edit" value="{{$op->id}}"  ><i class="fa fa-edit"></i></button>
                        <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-type" data-toggle="tooltip" title="Deactivated" data-type="confirm" value="{{$op->id}}"><i class="fa fa-window-close"></i></button>
                    </td>
                @break
                @case(2)
                <td class="hidden-xs">
                    <span class='badge badge-secondary'>Desactivated</span>
                </td>
                <td>
                    <button type="button" class="btn btn-sm btn-outline-success off-type" title="Activated" data-toggle="tooltip" data-type="confirm" value="{{$op->id}}" ><i class="fa fa-check-square-o"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert deletetype" data-toggle="tooltip" title="Delete" data-type="confirm" value="{{$op->id}}"><i class="fa fa-trash-o"></i></button>
                </td>
                @break
            @endswitch
        </tr>
      @endforeach
    </tbody>
</table>
{!! $data->render() !!}