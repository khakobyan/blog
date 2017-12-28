<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;

class CategoriesController extends Controller
{
    protected $categoryService;    

    public function __construct(CategoryService $categoryService)
    {
        $this->middleware('auth');
        $this->categoryService = $categoryService;
    }

    /**
     * Shows all categories.
     *
     * @return json
     */
    public function allCategories()
    {
        $categories = $this->categoryService->all();
        return response()->json(
           ['status' => 'success',
            'message' => 'Get all categories',
           	'resource' => $categories]);
    }
}
