@extends('layouts.app')

@section('content')

<div class="container">
	  <h2 class="text-center">{{Auth::user()->name}}'s Posts</h2>
	  <a href="/post/create" class="btn btn-success btn-sm add_post">CREATE NEW POST</a>
	  <ul class="list-group post-list center-block">
  	@foreach($posts as $post)
    	<li class="list-group-item col-sm-12"><a class="post-titles col-sm-6" href="/post/{{$post->id}}">{{$post->title}}</a>
    		@if(Auth::user()->id == $post->user_id)
        <div class="col-sm-6">
          <button type="button" data-id="{{$post->id}}" class="btn btn-warning btn-sm post-edit" data-toggle="modal" data-target="#EditPostModal">EDIT</button>
          <button type="button" data-id="{{$post->id}}" class="btn btn-danger btn-sm post-delete" data-toggle="modal" data-target="#DeletePostModal">DELETE</button>
          </div>
        	@endif
		</li>
    @endforeach
  </ul>
<!--MODAL FOR EDITING POST-->

    <div class="container">
      <div class="modal fade" id="EditPostModal" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title text-center">DO YOU  WANT EDIT THE POST?</h4>
            </div>
            <div class="modal-footer">
              <div class="col-sm-6">
              <form action="" method="POST" id="edPostForm">
                {{method_field('GET')}}
                {{csrf_field()}}
                <input class="btn btn-default col-sm-4"  type="submit" value="Edit">
              </form>
            </div>
            <div class="col-sm-6">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
          </div>
        </div>
      </div>
    </div>

     <!--MODAL FOR DELETING POST-->

   <div class="container">
      <div class="modal fade" id="DeletePostModal" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title text-center">DELETE POST?</h4>
            </div>
            <div class="modal-footer  text-center">
              <div class="col-sm-6">
                <form action="" method="post" id="delPostForm">
                  {{ csrf_field() }} 
                  <input type="hidden" name="_method" value="DELETE">
                  <button type="submit" class="btn btn-default col-sm-4 submit" >YES</button>
                </form>
              </div>
              <div class="col-sm-6">
                <button type="button" class="btn btn-default" data-dismiss="modal">NO</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


</div>

<!--Post edit/delete-->
<script type="text/javascript">
$(document).ready(function(){
  $('.post-delete').click(function(){
    $('#delPostForm').attr('action','/post/' + $(this).data('id'));
  });
});

$(document).ready(function(){
  $('.post-edit').click(function(){
    $('#edPostForm').attr('action','post/' + $(this).data('id')+'/edit');
  })
})

</script>
@endsection