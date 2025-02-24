import NavBar from "./NavBar";
import Logo from "./Logo";

const links = [
    { id: 1, text: 'Home', url: '/' },
    { id: 2, text: 'About', url: '/about' },
    { id: 3, text: 'Posts', url: '/posts' },
];

export default function Header() {

    return (
        <header className="d-flex justify-content-between align-items-center bg-light p-3">
            <div className="container">
                <div className="row">
                    <div className="col d-flex">
                        <Logo />
                    </div>
                    <div className="col box-nav">
                        <NavBar links={links} />
                    </div>
                </div>
            </div>
        </header>
    );
}
