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
Route::get('/assignmenttype/{id}/{detailfood_id?}', 'AssignamentTypeController@show');
Route::put('/assignmenttype/{id}/{detailfood_id}', 'AssignamentTypeController@update');
Route::delete('/assignmenttype/{id}/{detailfood_id}', 'AssignamentTypeController@destroy');


    //Display Index Page Vacancies
    Route::get('/vacancies', 'VacancyController@index');
    Route::get('/vacancies/{vacancy_id?}', 'VacancyController@show');
    Route::post('/vacancies', 'VacancyController@store');
    Route::post('/vacancies/{vacancy_id?}', 'VacancyController@update');
    Route::delete('/vacancies/{vacancy_id?}', 'VacancyController@destroy');
    Route::delete('/vacancies/delete/{id}', 'VacancyController@delete');

    //Display Index Page Candidates
   
    Route::get('/candidates/{id}', 'CandidateController@index');

    //Training
    Route::get('/training', 'TrainingController@index');
    Route::post('/training', 'TrainingController@store');
    Route::post('/training/{user_id}', 'TrainingController@update');
    Route::delete('/training/{user_id}', 'TrainingController@destroy');
    Route::delete('/training/delete/{id}', 'TrainingController@delete');

    //Settings
    Route::get('/settings', 'SettingsController@index');
    Route::get('/settings/{settings_id?}', 'SettingsController@show');
    Route::post('/settings', 'SettingsController@store');
    Route::post('/settings/{settings_id}', 'SettingsController@update');
    Route::delete('/settings/{settings_id}', 'SettingsController@destroy');
    Route::delete('/settings/delete/{id}', 'SettingsController@delete');

    //Clients
    Route::get('/clients', 'ClientsController@index');
});






