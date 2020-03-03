<div id="left-sidebar"  class="sidebar table-success">
        <div class="sidebar-scroll" style="max-height: calc(100vh - 5rem);overflow-y: auto;">
            <nav id="left-sidebar-nav" class="sidebar-nav">
                <ul id="main-menu" class="metismenu" >
                    @foreach ($menu['menuUser'] as $optionmenu)
                        <li id='sidebar{{$optionmenu->id_menu}}'><a href="{{$optionmenu->link}}"><i class="{{$optionmenu->icon}} text-danger"></i><span>{{$optionmenu->name}}</span></a> </li>
                    @endforeach
                </ul>
            </nav>
        </div>
    </div>
  