<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Services\CategoryService;
use Auth;

class UserCategoriesController extends Controller
{
    protected $categoryService;    

    public function __construct(CategoryService $categoryService)
    {
        $this->middleware('auth');
        $this->categoryService = $categoryService;
    }

    /**
     * Show all categories by user id.
     *
     * @return json
     */
    public function index()
    {
        $id = auth()->id();
        $categories = $this->categoryService->getCategoriesByUserId($id);
        return response()->json(
           ['status' => 'success',
            'message' => 'Get user categories',
            'resource' => $categories]);
    }
    
    /**
     * Store a newly created category in storage.
     *
     * @param $request
     * @return json
     */
    public function store(CategoryRequest $request)
    {
        $inputs = $request->inputs();
        $this->categoryService->create($inputs);
        return response()->json(
           ['status' => 'success',
            'message' => 'Category created successfully',
            'resource' => $inputs]);
    }
    
    /**
     * Update category.
     *
     * @param $request $id
     * @return json
     */
    public function update(CategoryRequest $request, $id)
    {
        $inputs = $request->inputs();
        $category = $this->categoryService->update($inputs, $id);
        return response()->json(
           ['status' => 'success',
            'message' => 'Category updated successfully',
            'resource' => $inputs]);
    }
    
    /**
     * Delete category.
     *
     * @param  $id
     * @return json
     */
    public function destroy($id)
    {
        $this->categoryService->delete($id);
        return response()->json(
           ['status' => 'success',
            'message' => 'Category deleted successfully',
            'resource' => null]);
    }
}
