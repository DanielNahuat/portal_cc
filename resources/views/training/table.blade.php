<table class="table table-striped text-center" id="tag_container">
    <thead class="text-white thead-yasc">
        <tr>
            <th width="100px">ID</th>
            <th>Name</th>
            <th class="hidden-xs" >Type</th>
            <th class="hidden-xs" >Status</th>
            <th>Options</th>
        </tr>
    </thead>
    <tbody id="settings-list">
        @foreach ($data as $setting)
        <tr id="settings_id{{$setting->id}}">
            <td>{{ $setting->id }}</td>
            <td>{{ $setting->name }}</td>              
            <td class="hidden-xs">{{ $setting->option }}</td>
            @switch($setting->status)
                @case(1)
                    <td class="hidden-xs">
                        <span class='badge badge-success'>Activated</span>
                    </td>
                    <td>
                        <button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="{{$setting->id}}"  ><i class="fa fa-edit"></i></button>
                        <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-type" title="Deactivated" data-type="confirm" value="{{$setting->id}}"><i class="fa fa-window-close"></i></button>
                    </td>
                @break
                @case(2)
                <td class="hidden-xs">
                    <span class='badge badge-secondary'>Deactivated</span>
                </td>
                <td>
                    <button type="button" class="btn btn-sm btn-outline-success off-type" title="Activated" data-type="confirm" value="{{$setting->id}}" ><i class="fa fa-check-square-o"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert deleteSettings" title="Delete" data-type="confirm" value="{{$setting->id}}"><i class="fa fa-trash-o"></i></button>
                </td>
                @break
            @endswitch
        </tr>
        @endforeach
    </tbody>
</table>
{!! $data->render() !!}