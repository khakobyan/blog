<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\User;

class UsersController extends Controller
{
    private $user;
    public $successStatus = 200;
    
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * User registration.
     *
     * @param  $request
     * @return json
     */
    public function register(Request $request)
    {
        $inputs = $request->all();
        $confirmation_code = str_random(30);
        $user = User::create([
            'name' => $inputs['name'],
            'email' => $inputs['email'],
            'password' => bcrypt($inputs['password']),
            'confirmation_code' => $confirmation_code
        ]);
        Auth::login($user);
        return response()->json(
          ['status' => 'success',
          'message' => 'User created successfully',
          'resourse' => $user,
          'user' => Auth::user()], 200
        );
    }

    /**
     * User login
     *
     * @param $request
     * @return mixed
     */
    public function login(Request $request)
    {
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')->accessToken;
            return response()->json(['success' => $success, 'user' => $user], $this->successStatus);
        }
        else{
            return response()->json(['error' => 'Unauthorised'], 401);
        }
    }

    /**
     * User logout.
     *
     * @return json
     */
    public function logout(){
        Auth::logout();
        return response()->json(['message' => 'success']);
    }


    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    }
}
