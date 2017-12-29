<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\CategoryService;

class CategoriesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Shows all categories.
     *
     * @return json
     */
    public function allCategories(CategoryService $categoryService)
    {
        $categories = $categoryService->all();
        return response()->json(
           ['status' => 'success',
            'message' => 'Get all categories',
            'resource' => $categories]);
    }
}
