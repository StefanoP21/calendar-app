import { Link } from 'react-router-dom';
import './styles.css';

export const RegisterPage = () => {
  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-lg-8 login-form-1">
          <h3>Crear cuenta</h3>
          <form>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de usuario"
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="email"
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

          <Link to="/auth/login">¿Ya tienes una cuenta?</Link>
        </div>
      </div>
    </div>
  );
};
