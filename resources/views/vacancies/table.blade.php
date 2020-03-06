<table class="table table-striped text-center" id="tag_container">
    <thead class="text-white thead-yasc">
        <tr>
            <th width="100px">ID</th>
            <th>Name</th>
            <th>Description</th>
            <th class="hidden-xs" >Status</th>
            <th>Options</th>
        </tr>
    </thead>
  <tbody id="vacancy-list">
        @foreach ($data as $vacancy)
        <tr id="vacancy_id{{$vacancy->id}}">
            <td>{{ $vacancy->id }}</td>
            <td>{{ $vacancy->name }}</td>
            <td>{{ $vacancy->description }}</td>
            @switch($vacancy->status)
                @case(1)
                    <td class="hidden-xs">
                        <span class='badge badge-success'>Activated</span>
                    </td>
                    <td>
                        <a class="btn btn-sm btn-outline-primary" data-toggle="tooltip" title="Ver Candidatos" href="{{ action('CandidateController@index', ['id' => $vacancy->id]) }}"><i class="fa fa-users"></i></a>
                        <button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="{{$vacancy->id}}"  ><i class="fa fa-edit"></i></button>
                        <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-vacancy" title="Deactivated" data-type="confirm" value="{{$vacancy->id}}"><i class="fa fa-window-close"></i></button>
                    </td>
                @break
                @case(2)
                <td class="hidden-xs">
                    <span class='badge badge-secondary'>Deactivated</span>
                </td>
                <td>
                    <button type="button" class="btn btn-sm btn-outline-success off-vacancy" title="Activated" data-type="confirm" value="{{$vacancy->id}}" ><i class="fa fa-check-square-o"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert delete-vacancy" title="Delete" data-type="confirm" value="{{$vacancy->id}}"><i class="fa fa-trash-o"></i></button>
                </td>
                @break
            @endswitch
        </tr>
        @endforeach
    </tbody>
</table>
{!! $data->render() !!}