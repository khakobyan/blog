@extends('layouts.app')

@section('content')
    <div class="container-fluid col-sm-3 categories-container">
        <div class="row">
              <h2 class="categories_headname">Categories</h2>
              <ul class="list-group">
                @foreach($categories as $category)
                <li class="list-group-item text-center">{{$category->name}}</li>
                @endforeach
              </ul>
            </div>
        </div>
    </div>
    <div class="container-fluid col-sm-8 posts-container">
        <div class="row">
            <h2 class="text-center">Posts</h2>
            <div class="panel panel-default all_posts_panel text-center">
            @foreach($posts as $post)
                <div class="panel panel-default col-sm-4 post-panel">
                    <div class="panel-heading"><a class="post-titles" href="/post/{{$post->id}}">{{$post->title}}</a></div>
                    <div class="panel-body"><a href="/post/{{$post->id}}"><img widt="260" height="160" src="{{'images/'.$post->image_path}}"></a>
                    </div>
                    <div class="panel-footer">{{$post->category->name}}</div>
                </div> 
            @endforeach                   
            </div>
        </div>
    </div>
@endsection
