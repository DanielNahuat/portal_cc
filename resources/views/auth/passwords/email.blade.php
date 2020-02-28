@extends('auth.template')

@section('auth-box')
    <div class="auth-box">
        <div class="top">
            <img src='{{asset('images/logo-white.svg')}}' alt="Lucid">
            <h1 style="color:white">YASC PORTAL</h1>
        </div>
        <div class="card">
            <div class="header">
                <p class="lead">Recuperación de Contraseña</p>
            </div>
            <div class="body">
                @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                @endif
                <p>Ingresa tu email para recibir instrucciones de como restaurarla.</p>
                <form class="form-auth-small" action="{{ route('password.email') }}">
                    <div class="form-group">                                    
                        <input id="email" type="email" placeholder="Email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>

                        @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg btn-block">RESTAURAR CONTRASEÑA</button>
                    <div class="bottom">
                        <span class="helper-text">¿Recuerdas tu contraseña? <a href="{{ route('login') }}">Iniciar Sesión</a></span>
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection