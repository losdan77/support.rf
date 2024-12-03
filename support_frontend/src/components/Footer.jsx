const Footer = () => {
    return (
        <footer className="bg-body-tertiary text-center text-lg-start">
        <div className="container p-4">
            <div className="row">
                <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                    <h5 className="text-uppercase">Помощь ближним</h5>
                    <p>
                    Я не писатель, не поэт, но я скажу стихами. Помочь другим в сей трудный час, сам бог велел годами!
                    </p>
                </div>
            </div>
        </div>
        <div className="text-center p-3">
            © 2024 ФСП:
            <a className="text-body" href="https://fsp-russia.com/">fsp-russia.com</a>
        </div>
        </footer>
    );
};

export default Footer;