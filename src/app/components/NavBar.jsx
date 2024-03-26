import { useAuthStore } from '../../hooks/useAuthStore';

export const NavBar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <div>
      <nav
        className="navbar bg-dark navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <span className="navbar-brand">
            <i className="fas fa-calendar-alt" />
            &nbsp; {user.name}
          </span>

          <button
            onClick={startLogout}
            className="btn btn-outline-danger"
            type="submit"
          >
            <i className="fas fa-sign-out-alt" />
            &nbsp; Salir
          </button>
        </div>
      </nav>
    </div>
  );
};
