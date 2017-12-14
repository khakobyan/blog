<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use User;

class SocialProvider extends Model
{
   	protected $table = 'providers';
   	protected $fillable = ['provider_id','provider'];

   	public function user()
   	{
   		return $this->belongsTo(User::class);
   	}
}
