import React from 'react'
import './login2.css'
function Login2() {
    return (
        <div>
            <div class="container">
                <div class="screen">
                    <div class="screen__content">
                        <form class="login">
                            <div class="login__field">
                                <input type="text" class="login__input" placeholder="Enrollment Number" />
                            </div>
                            <div class="login__field">
                                <input type="password" class="login__input" placeholder="Password" />
                            </div>
                            <button class="button login__submit">
                                <span class="button__text">Log In Now</span>
                            </button>
                        </form>

                    </div>
                    <div class="screen__background">
                        <span class="screen__background__shape screen__background__shape4"></span>
                        <span class="screen__background__shape screen__background__shape3"></span>
                        <span class="screen__background__shape screen__background__shape2"></span>
                        <span class="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login2