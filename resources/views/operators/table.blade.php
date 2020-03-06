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
        @if(count($data) > 0)
            <tr id="table-row" class="text-center" style="display:none;">
                <th colspan="8" class="text-center">
                    <h2><span class="badge  badge-pill badge-info">Data Not Found</span></h2>
                </th>
            </tr>
        @endif
      @foreach($data as $op)
        <tr id="operator_id{{$op->id}}"  class="rowType">
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
                        <button type="button" class="btn btn-sm btn-outline-secondary btn-edit" data-toggle="tooltip" title="Edit" value="{{$op->id}}"  ><i class="fa fa-edit"></i></button>
                        <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert delete-op" data-toggle="tooltip" title="Desactivated" data-type="confirm" value="{{$op->id}}"><i class="fa fa-window-close"></i></button>
                    </td>
                @break
                @case(2)
                <td class="hidden-xs">
                    <span class='badge badge-secondary'>Desactivated</span>
                </td>
                <td>
                    <button type="button" class="btn btn-sm btn-outline-success delete-op" title="Activated" data-toggle="tooltip" data-type="confirm" value="{{$op->id}}" ><i class="fa fa-check-square-o"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert destroy-op" data-toggle="tooltip" title="Delete" data-type="confirm" value="{{$op->id}}"><i class="fa fa-trash-o"></i></button>
                </td>
                @break
            @endswitch
        </tr>
      @endforeach
    </tbody>
</table>
{!! $data->render() !!}