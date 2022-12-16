import logo from '../images/fastMusik_logo.svg';
import perfil from '../images/perfil.png';

function Header() {
    return (
      <>
        <header className="container">
          <div className="row mt-3">
            <div className="col-8 offset-2 text-center">
              <img src={logo} className="img-fluid header-logo" alt="FastMusik logo" />
            </div>
            <div className="col-2 text-end py-2">
              <img src={perfil} className="img-fluid align-middle header-perfil" alt="Perfil" />
            </div>
          </div>
      </header>
    </>
    );
}

export default Header;