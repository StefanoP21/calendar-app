import './styles.css';

export const RegisterPage = () => {
  return (
    <div className="container login-container">
      <div className="row justify-content-center">
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
