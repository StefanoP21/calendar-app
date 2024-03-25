import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './styles.css';

const loginFormFields = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const { email, password, onInputChange } = useForm(loginFormFields);
  const { startLogin, errorMessage } = useAuthStore();

  const onFormSubmit = (e) => {
    e.preventDefault();
    startLogin({ email, password });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-lg-8 login-form-1">
          <h3>Iniciar sesión</h3>
          <form onSubmit={onFormSubmit}>
            <div className="form-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </div>
            <div className="form-group mb-3">
              <input type="submit" className="btnSubmit" value="Ingresar" />
            </div>
          </form>

          <div className="form-group">
            <Link to="/auth/register">¿No tienes una cuenta?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
