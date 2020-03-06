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
    Route::get('/candidates/{id}/{candidate_id?}', 'CandidateController@show');
    Route::post('/candidates/{id}', 'CandidateController@store');
    Route::post('/candidates/{id}/{vacancy_id?}', 'CandidateController@update');
    Route::delete('/candidates/{id}/delete/{candidate_id?}', 'CandidateController@delete');
    Route::delete('/candidates/{id}/{candidate_id?}', 'CandidateController@destroy');

    //Training
    Route::get('/training', 'TrainingController@index');
    Route::post('/training', 'TrainingController@store');
    Route::post('/training/{trainee_id}', 'TrainingController@update');
    Route::delete('/training/{trainee_id}', 'TrainingController@destroy');
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
    Route::post('/clients', 'ClientsController@store');
    Route::get('/clients/{client_id}', 'ClientsController@show');
    Route::put('/clients/{client_id}', 'ClientsController@update');
    Route::delete('/clients/{client_id}', 'ClientsController@destroy');
    Route::delete('/clients/delete/{id}', 'ClientsController@delete');
    Route::post('/clients/document/{id}', 'ClientsController@storeDocuments');
    Route::get('/clients/document/show/{id}', 'ClientsController@showDocuments');


    //Contacts for Clients
    Route::post('/clients/contacts', 'ClientsController@storeContacts');
    Route::get('/clients/contacts/show/{id}', 'ClientsController@showContacts');

    //User
    Route::get('/users','UserController@index');
    Route::put('/users/{user}', 'UserController@update');
    Route::get('/users/{user}', 'UserController@edit');
    Route::get('/getClients', 'UserController@clients');
    Route::post('/users', 'UserController@store');
    Route::delete('/users/{id}', 'UserController@destroy');
    Route::delete('/users/delete/{id}', 'UserController@delete');
   
    //Schedule
    Route::get('/weekly', 'ScheduleWeeklyController@index');
    Route::get('/weekly/{UserType_id?}', 'ScheduleWeeklyController@show');
    Route::post('/weekly', 'ScheduleWeeklyController@store');
    Route::put('/weekly/{UserType_id}', 'ScheduleWeeklyController@update');
    Route::delete('/weekly/{UserType_id}', 'ScheduleWeeklyController@destroy');
    Route::delete('/weekly/delete/{id}', 'ScheduleWeeklyController@delete');

    //Operators
    Route::get('/operators', 'OperatorsController@index');
    Route::get('/operators/{id}', 'OperatorsController@show');
    Route::post('/operators', 'OperatorsController@store');
    Route::put('/operators/{id}', 'OperatorsController@update');
    Route::delete('/operators/{id}', 'OperatorsController@destroy');
    Route::delete('/operators/delete/{id}', 'OperatorsController@delete');
    
    //SERVICE GENERAL
    Route::post('/generate', 'ServiceGeneralController@generateNick');


});






