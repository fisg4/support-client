function RequireLogin({message}) {
    return (
        <div className="card card-body col-12 col-md-6 offset-md-3">
            {message}
            <div className="text-center mt-5">
                <a href="/" className="btn border-purple text-purple bg-blue">Click here to log in</a>
            </div>
        </div>
    )
}

export default RequireLogin;