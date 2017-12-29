<?php

namespace App\Services;

use App\Post;
use Illuminate\Support\Facades\Input;
use File;

class PostService
{
    protected $posts;

    function __construct(Post $posts)
    {
        $this->posts = $posts;
    }

    public function getAllPosts()
    {
        return $this->posts
                    ->with('category')
                    ->get();
    }

    public function getPostsByUserId($id)
    {
        return $this->posts
                ->orderBy('created_at', 'desc')
                ->where('user_id', $id)
                ->with('category')
                ->with('user')
                ->get();
    }

    public function create($inputs)
    {
        return $this->posts->create($inputs);           
    }

    public function getById($id)
    {
        return $this->posts
                ->where('id', $id)
                ->with('category')
                ->with('user')
                ->first();
    }

    public function update($inputs, $id)
    {
        $post = $this->posts->find($id);
        $default_image = 'empty.jpg';   
        $image_path = public_path('/images').'/'.$post->image_path;
        $image = $inputs['image_path'];
        if ($post->image_path != $default_image && !is_null($image)) {
            File::delete($image_path);
        };
        return $this->posts
                ->where('id', $id)
                ->with('category')
                ->with('user')
                ->update($inputs);
    }
    public function delete($id)
    {
        $post = $this->posts->find($id);
        $default_image = 'empty.jpg';
        $image_path = public_path('/images').'/'.$post->image_path;
        if ($post->image_path != $default_image) {
            File::delete($image_path);
        };
        $this->posts->where('id', $id)->delete();
    }
}
