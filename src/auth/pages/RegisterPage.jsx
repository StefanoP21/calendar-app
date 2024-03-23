import './styles.css';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks';

const registerFormFields = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const RegisterPage = () => {
  const { name, email, password, confirmPassword, onInputChange } =
    useForm(registerFormFields);

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log({
      name,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-lg-8 login-form-1">
          <h3>Crear cuenta</h3>
          <form onSubmit={onFormSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre de usuario"
                name="name"
                value={name}
                onChange={onInputChange}
              />
            </div>
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
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onInputChange}
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
