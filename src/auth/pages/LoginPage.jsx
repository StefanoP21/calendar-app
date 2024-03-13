import './styles.css';

import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-lg-8 login-form-1">
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

          <div className="form-group">
            <Link to="/auth/register">¿No tienes cuenta?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
