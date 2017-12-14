@extends('layouts.app')

@section('content')
<div class="container col-sm-8">
<form method="POST" action="/post" enctype="multipart/form-data">
	{{ csrf_field() }} 
	<div class="form-group">
		<label for="postTitle">Post Title</label>
		<input type="text" class="form-control" id="postTitle" placeholder="Title" name="post_title" required>
	</div>
	<div class="form-group">
		<label for="postText">Text</label>
		<textarea class="form-control" id="postText" rows="6" name="post_text" required></textarea>
	</div>
	<div class="form-group">
		<label for="postImage">File Input</label>
		<input type="file" class="form-control-file" id="postImage" name="image_path">
	</div>
	<div class="form-group">
		<label for="postCategory">Select Category</label>
		<select  class="form-control" id="postCategory" name="post_category">
			@foreach($categories as $category)
				<option value="{{$category->id}}">
					{{$category->name}}
				</option>
			@endforeach
		</select>	
	</div>
	<button type="submit" class="btn btn-primary">Share</button>
	
</form>
</div>
@endsection
