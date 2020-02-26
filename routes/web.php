<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

//Type User
Route::get('/types', 'TypeUserController@index');
Route::get('/types/{UserType_id?}', 'TypeUserController@show');
Route::post('/types', 'TypeUserController@store');
Route::post('/types/{UserType_id}', 'TypeUserController@update');
Route::delete('/types/{UserType_id}', 'TypeUserController@destroy');
Route::delete('/types/delete/{id}', 'TypeUserController@delete');

//Assigment Type
Route::get('/assignmenttype/{id}', 'AssignamentTypeController@index');
Route::put('/assignmenttype/{id}/{detailfood_id}', 'AssignamentTypeController@update');
Route::delete('/assignmenttype/{id}/{detailfood_id}', 'AssignamentTypeController@destroy');


//Display Index Page Vacancies
Route::get('/vacancies', 'VacancyController@index');

//Training
Route::get('/training', 'TrainingController@index');