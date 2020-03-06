<table class="table table-striped text-center" id="tag_container">
    <thead class="text-white thead-yasc">
        <tr>
            <th width="100px">ID</th>
            <th>Vacante</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Mail</th>
            <th>Channel</th>
            <th>Listening Test</th>
            <th>Grammar Test</th>
            <th>Typing Test</th>
            <th>Personality Test</th>
            <th>Recording</th>
            <th>CV</th>
            <th class="hidden-xs" >Status</th>
            <th>Options</th>
        </tr>
    </thead>
    <tbody id="candidate-list">
        @foreach ($data as $candidate)
        <tr id="candidate_id{{$candidate->id}}">
            <td>{{ $candidate->id }}</td>
            <td>{{ $candidate->name_vacancy }}</td>
            <td>{{ $candidate->name}}</td>
            <td>{{ $candidate->last_name}}</td>
            <td>{{ $candidate->phone }}</td>
            <td>{{ $candidate->mail }}</td>
            <td>{{ $candidate->channel }}</td>
            <td>{{ $candidate->listening_test }}</td>
            <td>{{ $candidate->grammar_test }}</td>
            <td>{{ $candidate->typing_test }}</td>
            <td>{{ $candidate->personality_test }}</td>
            <td>{{ $candidate->recording }}</td>
            <td>{{ $candidate->cv }}</td>
            @switch($candidate->status)
                @case(1)
                    <td class="hidden-xs">
                        <span class='badge badge-success'>Activated</span>
                    </td>
                    <td>
                        <a class="btn btn-sm btn-outline-primary" data-toggle="tooltip" title="Ver Documentos" href=""><i class="fa fa-cubes"></i></a>
                        <button type="button" class="btn btn-sm btn-outline-secondary open_modal" title="Edit" id="btn-edit" value="{{$candidate->id}}"  ><i class="fa fa-edit"></i></button>
                        <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert off-candidate" title="Deactivated" data-type="confirm" value="{{$candidate->id}}"><i class="fa fa-window-close"></i></button>
                    </td>
                @break
                @case(2)
                <td class="hidden-xs">
                    <span class='badge badge-secondary'>Deactivated</span>
                </td>
                <td>
                    <button type="button" class="btn btn-sm btn-outline-success off-candidate" title="Activated" data-type="confirm" value="{{$candidate->id}}" ><i class="fa fa-check-square-o"></i></button>
                    <button type="button" class="btn btn-sm btn-outline-danger js-sweetalert delete-candidate" title="Delete" data-type="confirm" value="{{$candidate->id}}"><i class="fa fa-trash-o"></i></button>
                </td>
                @break
            @endswitch
        </tr>
        @endforeach
    </tbody>
</table>
{!! $data->render() !!}