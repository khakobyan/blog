<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Post;
use Auth;
use App\Category;

class CategoryController extends Controller
{
    public function __construct()
    {
       	$this->middleware('auth');
    }

    public function index()
    {
    	$categories = Category::get();
        return response()->json(['categories' => $categories], 200);
    }

    public function myCategories()
    {
        $categories = Category::where('user_id', Auth::id())->get();
        return response()->json(['categories' => $categories], 200);
    }
    
    
    public function store(Request $request)
    {
        $arr = array(
            'user_id' => Auth::user()->id,
            'name'=>$request->name
        );

        $category = Category::create($arr);
        if($category) {
        	return response()->json(['category' => $category], 200);
        }
        	return response()->json(['message'=> 'error'], 400);
    }
    
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if ($category != null) {
            $category->update($request->all());
            $category->save();
            return response()->json([$category], 200);
        }
        return response()->json(['message' => 'error'],400);
    }
    
    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category != null) {
            $category->delete();
            return response()->json(['success'], 200);
        }
        	return response()->json(['message' => 'error'], 400);
    }

}
