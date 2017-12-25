<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post;
use App\Category;
use Auth;
use File;

class PostController extends Controller
{
    public function __construct(Post $post, Category $category)
    {
        $this->middleware('auth');
        $this->post = $post;
        $this->category = $category;
    }

    public function userPosts()
    {
        $user_posts = Post::where('user_id',Auth::user()->id)->get();
        return response()->json(['posts'=>$user_posts], 200);
    }

    public function allPosts()
    {
    	$all_posts = Post::with('category')->get();
        return response()->json(['posts' => $all_posts], 200);
    }

    public function store(Request $request)
    {
        $default_image = 'empty.jpg';
        $path = public_path('/images');
        if ($image = $request->file('image_path')) {
            $image_name = time().'.'.$image->getClientOriginalExtension();
            $image->move($path,$image_name);
        };
        $inputs = array(
                'title'=>$request->title,
                'text'=>$request->text,
                'category_id'=>$request->category_id,
                'user_id'=>Auth::user()->id,
                'image_path'=>$image=isset($image_name)?$image_name:$default_image
        );
        if ($this->post->create($inputs)) {
            return response()->json(['added_post' => $inputs], 201);
       	}
       	return response()->json(['error' => 'Something went wrong!'], 400);
    }

    public function show($id)
    {
        $post=$this->post->where('id',$id)->first();
        return response()->json(['post' => $post], 200);
    }
    
    public function update(Request $request, $id)
    {
        $post = Post::find($id);
        $image_name = 'empty.jpg';
        if ($image =  $request->file('image_path')) {
            $path = public_path('/images');
            $image_name = time().'.'.$image->getClientOriginalExtension();
            $image->move($path, $image_name);
        }
        $inputs = $request->except('_method');
        $inputs['image_path'] = $image_name;
        if($result = $post->update($inputs)) {
            $inputs['category'] = Category::where('id', $request->category_id)->get();
            return response()->json(['edited_post' => $inputs]);
        }
        return response()->json(['error' => 'Something went wrong!']);
    }


    public function destroy($id)
    {
        $post = Post::find($id);
        $default_image = 'empty.jpg';
        $image_path = public_path('/images').'/'.$post->image_path;
        if ($post->image_path != $default_image) {
            File::delete($image_path);
        };

        if ($post != null) {
            $post->delete();
            return response()->json(['deleted_post_id' => $id], 200);
        }
        return response()->json(['error' => 'Something went wrong!'], 400);
    }
}
