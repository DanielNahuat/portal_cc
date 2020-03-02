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

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('/', 'HomeController@index')->name('home');
Route::get('/home', 'HomeController@index')->name('home');
Auth::routes();


Route::group(['middleware'=>['auth']], function(){
    //Type User
    Route::get('/types', 'TypeUserController@index');
    Route::get('/types/{UserType_id?}', 'TypeUserController@show');
    Route::post('/types', 'TypeUserController@store');
    Route::post('/types/{UserType_id}', 'TypeUserController@update');
    Route::delete('/types/{UserType_id}', 'TypeUserController@destroy');
    Route::delete('/types/delete/{id}', 'TypeUserController@delete');

    Route::get('/home', 'HomeController@index')->name('home');



    //Assigment Type
    Route::get('/assignmenttype/{id}', 'AssignamentTypeController@index');
    Route::put('/assignmenttype/{id}/{detailfood_id}', 'AssignamentTypeController@update');
    Route::delete('/assignmenttype/{id}/{detailfood_id}', 'AssignamentTypeController@destroy');


    //Display Index Page Vacancies
    Route::get('/vacancies', 'VacancyController@index');
    Route::get('/vacancies/{vacancy_id?}', 'VacancyController@show');
    Route::post('/vacancies', 'VacancyController@store');
    Route::post('/vacancies/{vacancy_id?}', 'VacancyController@update');
    Route::delete('/vacancies/{vacancy_id?}', 'VacancyController@destroy');
    Route::delete('/vacancies/delete/{id}', 'VacancyController@delete');




    //Training
    Route::get('/training', 'TrainingController@index');

    //Clients
    Route::get('/clients', 'ClientsController@index');

    //User
    Route::get('/users','UserController@index');
    Route::get('/types/{UserType_id?}', 'TypeUserController@show');
    Route::post('/users', 'TypeUserController@store');
    Route::post('/users/{UserType_id}', 'TypeUserController@update');
    Route::delete('/users/{UserType_id}', 'TypeUserController@destroy');
    Route::delete('/users/delete/{id}', 'TypeUserController@delete');
});



