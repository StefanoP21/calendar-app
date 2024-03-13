import './LoginPage.css';

export const LoginPage = () => {
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Iniciar sesión</h3>
          <form>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Correo electrónico"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>
            <div className="form-group mb-3">
              <input type="submit" className="btnSubmit" value="Ingresar" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Crear cuenta</h3>
          <form>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
              />
            </div>

            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
              />
            </div>

            <div className="form-group mb-3">
              <input type="submit" className="btnSubmit" value="Registrarse" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
