<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
	

    protected $table = 'posts';

    protected $fillable = ['title','text','image_path','category_id','user_id'];
    
    public function category()
    {
        return $this->belongsTo('App\Category');
    }

    public function user()
    {
    	return $this->belongsTo('App\User');
    }
}
