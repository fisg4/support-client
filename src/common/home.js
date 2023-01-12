import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="row">
            <h2>Iría el login</h2>
            <Link to={`/support`}>
                <div className="btn border-purple text-purple bg-blue btn-lg">
                    Support
                </div>
            </Link>
        </div>
    );
}

export default Home;