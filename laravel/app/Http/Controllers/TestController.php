<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class TestController extends Controller
{
    public function test()
    {
        $cache = Redis::get('datalocations');
        if ($cache) {
            return response()->json(json_decode($cache), 200);
        }
        $villages = DB::table('indonesia_villages')->get(['id', 'name', 'meta']);
        $provinces = DB::table('indonesia_provinces')->get(['id', 'name', 'meta']);
        $districts = DB::table('indonesia_districts')->get(['id', 'name', 'meta']);
        $cities = DB::table('indonesia_cities')->get(['id', 'name', 'meta']);

        $combinedData = [
            'villages' => $villages,
            'provinces' => $provinces,
            'districts' => $districts,
            'cities' => $cities,
        ];

        // Redis::set('datalocations', json_encode($combinedData));

        // Mengembalikan data dalam format JSON
        return response()->json($combinedData, 200);
    }

    public function simple()
    {
        return response()->json([ 'message' => 'Hello World' ], 200);
    }
}
