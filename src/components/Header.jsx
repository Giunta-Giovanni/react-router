import NavBar from "./NavBar";
import Logo from "./Logo";

export default function Header() {

    return (
        <header className="d-flex justify-content-between align-items-center bg-light p-3">
            <div className="container">
                <div className="row">
                    <div className="col d-flex">
                        <Logo />
                    </div>
                    <div className="col">
                        <NavBar />
                    </div>
                </div>
            </div>
        </header>
    );
}
