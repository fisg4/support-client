function Home() {
    return (
        <div className="row">
            <div className="col-8 offset-2">
                <div className="input-group mb-3">
                    <input type="text" className="form-control border-purple" placeholder="Search song" aria-label="Songs name" aria-describedby="Songs name" />
                    <button className="btn border-purple text-purple" type="button" id="button-addon2"><i className="bi bi-search btn-purple"></i></button>
                </div>
            </div>
            <div className="col-4 offset-4 text-center">
                <button type="button" className="btn border-purple text-purple bg-blue">Possibility</button>
            </div>
        </div>
    );
}

export default Home;