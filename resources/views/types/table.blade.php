<table class="table table-striped text-center" id="tag_container">
    <thead class="text-white thead-yasc">
        <tr>
            <th width="100px">ID</th>
            <th>Name</th>
            <th class="hidden-xs" >Status</th>
            <th>Options</th>
        </tr>
    </thead>
    <tbody id="usertype-list">
        @foreach ($data as $type)
        <tr id="usertype_id{{$type->id}}" class="rowType">
            <td>{{ $type->id }}</td>
            <td>{{ $type->name }}</td>
            @switch($type->status)
                @case(1)
                    <td class="hidden-xs">
                        <span class='badge badge-success'>Activated</span>
                    </td>
                    <td>
                        <a class="btn btn-sm btn-outline-primary" data-toggle="tooltip" title="Assignament Type" id="btn-edit" href="/assignmenttype/{{$type->id}}"  ><i class="fa fa-info-circle"></i></a>
                        <button type="button" class="btn btn-sm btn-outline-secondary open_modal" data-toggle="tooltip" title="Edit" id="btn-edit" value="{{$type->id}}"  ><i class="fa fa-edit"></i></button>
                        <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-type" data-toggle="tooltip" title="Deactivated" data-type="confirm" value="{{$type->id}}"><i class="fa fa-window-close"></i></button>
                    </td>
                @break
                @case(2)
                <td class="hidden-xs">
                    <span class='badge badge-secondary'>Deactivated</span>
                </td>
                <td>
                    <button type="button" class="btn btn-sm btn-outline-success off-type" title="Activated" data-toggle="tooltip" data-type="confirm" value="{{$type->id}}" ><i class="fa fa-check-square-o"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert deletetype" data-toggle="tooltip" title="Delete" data-type="confirm" value="{{$type->id}}"><i class="fa fa-trash-o"></i></button>
                </td>
                @break
            @endswitch
        </tr>
        @endforeach
    </tbody>
</table>
@if(count($data) == 0)
            <div id="table-row" class="col-sm-12 text-center">
        @else
            <div id="table-row" class="col-sm-12 text-center" style="display:none">
        @endif
            <h2 class="text-center"><span class="badge badge-info">Data Not Found</span></h2>
        </div>

        
{!! $data->render() !!}