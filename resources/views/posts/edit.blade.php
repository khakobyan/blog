@extends('layouts.app')

@section('content')
<div class="container col-sm-8 post-edit-blade">
<form  method="POST" action="/posts/{{$post->id}}" enctype="multipart/form-data">
	{{method_field('PUT')}}
	{{ csrf_field() }} 
	<div class="form-group">
		<label for="postTitle">Post Title</label>
		<input type="text" class="form-control" id="postTitle" placeholder="Title" value="{{$post->title}}" required name="title">
	</div>
	<div class="form-group">
		<label for="postText">Text</label>
		<textarea maxlength="255" class="form-control" id="postText" rows="6" name="text" required>{{$post->text}}</textarea>
	</div>
	<div class="form-group">
		<label></label>
		<img width="900" height="500" src="{{url('images/'.$post->image_path)}}" id="postShowImage" alt="{{$post->image_path}}">
	</div>
	<div class="form-group">
		<label for="postImage">File Input</label>
		<input type="file" class="form-control-file" id="postImage" name="image_path">
	</div>
	<div class="form-group">
		<label for="postCategory">Select Category</label>
		<select  class="form-control" id="postCategory" name="category_id">
			@foreach($categories as $category)
				<option value="{{$category->id}}">
					{{$category->name}}
				</option>
			@endforeach 
		</select>	
	</div>
	<input class="btn btn-lg btn-info" type="submit" value="Edit">
</form>
</div>

@endsection
