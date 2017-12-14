@extends('layouts.app')

@section('content')

<div class="container">
  <h2 class="text-center">{{Auth::user()->name}}'s Categories</h2>
    <button type="button" class="btn btn-success btn-sm add" data-toggle="modal" data-target="#myModal">ADD NEW CATEGORY</button>
  <ul class="list-group  center-block category-list">
  	@foreach($categories as $category)
    	<li class="list-group-item col-sm-12"><div class="col-sm-6">{{$category->name}}</div>
    	 @if(Auth::user()->id == $category->user_id)
                  <div class="col-sm-6">
                   <button type="button" data-id="{{$category->id}}" class="btn btn-warning btn-sm category-edit" data-toggle="modal" data-target="#EditCategoryModal">EDIT
                    </button>
                    <button type="button" data-id="{{$category->id}}" class="btn btn-danger btn-sm category-delete" data-toggle="modal" data-target="#DeleteCategoryModal">DELETE
                    </button>
                  </div>  
                  @endif</li>
    @endforeach
  </ul>
</div>
<!-- Modal for adding category-->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Write Category Name</h4>
        </div>
        <div class="modal-body">
          <form method="POST" action="/category"> 
            {{ csrf_field() }} 
            <input type="text" class="form-control" name="name" autofocus>
            <div class="modal-footer">
            <input type="submit" value="Create" class="btn btn-default col-sm-3">
            <div class="col-sm-6"></div>
          </form>
              <button type="button" class="btn btn-default col-sm-3" data-dismiss="modal">Close</button>
              </div>
        </div>
      </div>
    </div>
  </div> 
 <!-- Modal for delete category-->
    
    <div class="container">
      <div class="modal fade" id="DeleteCategoryModal" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title text-center">DELETE CATEGORY?</h4>
            </div>
            <div class="modal-footer  text-center">
                <form action="" method="post" id="delCatForm">
                  {{ csrf_field() }} 
                  <input type="hidden" name="_method" value="DELETE">
                  <button type="submit" class="btn btn-default col-sm-3 submit" >YES</button>
              <div class="col-sm-6"></div>
                </form>
                <button type="button" class="btn btn-default col-sm-3" data-dismiss="modal">NO</button>
            </div>
          </div>
        </div>
      </div>
    </div>


          <!--Modal for editing category-->
    
    <div class="container">
      <div class="modal fade" id="EditCategoryModal" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title text-center">EDIT CATEGORY</h4>
            </div>
            <div class="modal-body">
              <form action="" method="POST" id="edCatForm">
                {{method_field('PUT')}}
                {{csrf_field()}}
                <input type="text" class="form-control" name="name" value="" id="inp" autofocus>
                </div>
                <div class="modal-footer">
                <input type="submit" class="btn btn-default col-sm-3" value="EDIT">
                <div class="col-sm-6"></div>
              </form>
                <button type="button" class="btn btn-default col-sm-3" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

  <!--category edit/delete-->
    <script type="text/javascript">
    	$(document).ready(function(){
  $('.category-delete').click(function(){
    //console.log($(this).data('id'));
    $('#delCatForm').attr('action','/category/' + $(this).data('id'));
  });
})

$(document).ready(function(){
  $('.category-edit').click(function(){
    $('#edCatForm').attr('action','/category/' + $(this).data('id'));
    $('#inp').attr('value','');
  });
});

    </script>
@endsection