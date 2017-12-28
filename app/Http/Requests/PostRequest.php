<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Auth;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|max:255',
            'text' => 'required|max:255',
            'category_id' => 'required',
        ];
    }

    public function  inputs()
    {   
        $inputs = $this->except(['_token', '_method']);

        $inputs['user_id'] = Auth::id();
        
        if($this->hasFile('image_path')) {   
            $image = $this->file('image_path');
            $inputs['image_path'] = time().'.'.$image->getClientOriginalExtension();
            $image->move(public_path('/images'), $inputs['image_path']);
        } else {
            $inputs['image_path'] = 'empty.jpg';
        }
        return $inputs;
    }
}
