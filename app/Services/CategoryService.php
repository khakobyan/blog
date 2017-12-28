<?php

namespace App\Services;

use App\Category;

class CategoryService
{

    protected $categories;

    function __construct(Category $categories)
    {
    $this->categories = $categories;
    }

    public function all()
    {
        return $this->categories->all();
    }

    public function getCategoriesByUserId($id)
    {
        return $this->categories->where('user_id', $id)->get();
    }

    public function create($inputs)
    {
        $this->categories->create($inputs);
    }

    public function getById($id)
    {
        return $this->categories->where('id', $id)->first();
    }

    public function update($inputs, $id)
    {
        return $this->categories->where('id', $id)->update($inputs);
    }

    public function delete($id)
    {
        return $this->categories->where('id', $id)->delete();
    }
}
