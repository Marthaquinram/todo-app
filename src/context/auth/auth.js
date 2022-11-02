import React from 'react';

const AuthBoxy = ({ register }) => {
  return (
    <div className="auth">
      <div className="auth__boxy">
        <div className="auth__header">
          <h1>{register ? "Register" : "Login"}</h1>
        </div>

        <form>
          {register && (
            <div className="auth__field">
              <label>Name</label>
              <input type="test" />
            </div>
          )
          }
          <div className="auth__field">
            <label>Email</label>
            <input type="test" />
          </div>
          <div className="auth__field">
            <label>Password</label>
            <input type="test" />
          </div>
          {register && (
            <div className="auth__field">
              <label>Confirm Password</label>
              <input type="test" />
              {/* <p className="auth__error">Something went wrong</p> */}
            </div>
          )}
          <div className="auth__footy">
            <p className="auth__error">Whoopsies something went terribly wrong.</p>
            <button className='btn'>{register ? "Register" : "Login"} </button>

          </div>
        </form>
      </div>
    </div>
  )
};

export default AuthBoxy;
