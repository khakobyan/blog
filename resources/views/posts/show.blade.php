@extends('layouts.app')

@section('content')
<div class="container-fluid text-center">
	<div class="jumbotron"><h2>{{$post->title}}</h2></div>
	<img class="img-rounded"  width="800px" src="{{url('images/'.$post->image_path)}}" alt="{{$post->image_path}}">
	<h4>{{$post->text}}</h4>
</div>
<div class="container-fluid well">
	@if(Auth::user()->id == $post->user_id)
	<button type="button" data-id="{{$post->id}}" class="btn btn-warning btn-sm post-edit" data-toggle="modal" data-target="#EditPostModal">EDIT</button>
    <button type="button" data-id="{{$post->id}}" class="btn btn-danger btn-sm post-delete" data-toggle="modal" data-target="#DeletePostModal">DELETE</button>
    @endif
</div>

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
              <form action="{{-- {{'post/'.$post->id.'/edit'}} --}}" method="POST" id="edPostForm">
                {{method_field('GET')}}
                {{csrf_field()}}
                <input type="submit" value="EDIT">
              </form>
            </div>
            <div>
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
                  <button type="submit" class="btn btn-default submit" >YES</button>
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


<script type="text/javascript">
$(document).ready(function(){
  $('.post-delete').click(function(){
    $('#delPostForm').attr('action','/post/' + $(this).data('id'));
  });
});

$(document).ready(function(){
  $('.post-edit').click(function(){
    $('#edPostForm').attr('action',$(this).data('id')+'/edit');
  })
})

</script>


@endsection
