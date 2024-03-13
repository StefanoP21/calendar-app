export const NavBar = () => {
  return (
    <div>
      <nav
        className="navbar bg-dark navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <span className="navbar-brand">
            <i className="fas fa-calendar-alt" />
            &nbsp; {`Calendario M & S`}
          </span>

          <button className="btn btn-outline-danger" type="submit">
            <i className="fas fa-sign-out-alt" />
            &nbsp; Salir
          </button>
        </div>
      </nav>
    </div>
  );
};
