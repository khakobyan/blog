<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Http\Requests\PostRequest;
use Auth;
use App\Post;
use App\Category;
use Illuminate\Support\Facades\Storage;
use File;
use DB;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct(Post $post, Category $category)
    {
        $this->middleware('auth');
        $this->post = $post;
        $this->category = $category;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $posts = Post::all();
        // //dd($posts);
        // return view('posts',['posts'=>$posts]);
        $posts = Post::where('user_id',Auth::user()->id)->get();
        return view('posts.index')->with('posts',$posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::all();
        return view('posts.create',['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // dd($request->all());
        //$user = Auth::user()->id;
        $default_image = 'empty.jpg';
        $path = public_path('/images');
        if ($image = $request->file('image_path')) {
            $image_name = time().'.'.$image->getClientOriginalExtension();
            $image->move($path,$image_name);
        };
        //dd(Auth::user());
        $arr = array(
                'title'=>$request->post_title,
                'text'=>$request->post_text,
                'category_id'=>$request->post_category,
                'user_id'=>Auth::user()->id,
                'image_path'=>$image=isset($image_name)?$image_name:$default_image
        );
        
        if ($this->post->create($arr)) {
            return redirect('/home')->with('message','Post created');
       }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Post::where('id', $id)->first();
        if ($post != null) {

            return view('posts.show')->with('post',$post);
        }
        return redirect()->back()->with('message','Something went wrong');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)//, Category $category)
    {

        $categories = Category::get();
        $post = Post::find($id);
        if ($post != null) {
            return view('posts.edit')->with(['post'=> $post, 'categories'=> $categories]); //, compact('post'))->with('category', $category);
        }
        return redirect()->back()->with('message','Something went wrong');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    { 
        $post = Post::find($id);
        $default_image = 'empty.jpg';   
        $image_path = public_path('/images').'/'.$post->image_path;
        $image = $request->file('post_image');
        if ($post->image_path != $default_image && !is_null($image)) {
            File::delete($image_path);
        };


        $default_image = $post->image_path;
        $path = public_path('/images');
        if ($image = $request->file('post_image')) {
            $image_name = time().'.'.$image->getClientOriginalExtension();
            $image->move($path,$image_name);
        };
        $arr=array(
            'title' => $request->post_title,
            'text' => $request->post_text,
            'image_path'=>$image=isset($image_name)?$image_name:$default_image,
            'category_id' => $request->post_category
        );
        if ($request != null) {
            $post->update($arr);

            $post->save();
            return redirect('/home');
        }
        return redirect()->back()->with('message','Something went wrong');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
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
            return redirect('/home');
        }

        return redirect()->back()->with('message','Something went wrong');
    }
}
