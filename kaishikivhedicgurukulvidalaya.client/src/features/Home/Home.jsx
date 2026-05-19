import './Home.css';

export default function Hero() {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section id="hero" className= "hero">
            {/* Background with slow zoom */}
            <div className="heroBg"/>
            <div className= "heroGrain" />

            {/* Large watermark OM */}
            <div className= "heroOm">ॐ</div>

            {/* Content */}
            <div className={ "heroContent"}>
                <div className={ "heroEyebrow"}>
                    कौशिके वैदिक गुरुकुल · नेपाल
                </div>

                <h1 className={ "heroTitle"}>
                    A School Rooted<br />in{" "}
                    <em className={ "heroTitleEm"}>Sacred Hills</em>
                </h1>

                <p className={ "heroDeva"}>
                    विद्या ददाति विनयम् — Knowledge bestows humility
                </p>

                <p className={ "heroTagline"}>
                    Nestled on a hillside beside an Shiva temple, we preserve the living
                    tradition of Sanskrit learning — freely, simply, and in harmony with
                    all of nature.
                </p>

                <div className={ "heroActions"}>
                    <button
                        className="btn btn-primary"
                        onClick={() => scrollTo("get-involved")}
                    >
                        🌱 Get Involved
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => scrollTo("about")}
                    >
                        Know the Ashram
                    </button>
                    <button
                        className="btn btn-outline"
                        onClick={() => scrollTo("gallery")}
                        style={{ borderColor: "var(--earth)", color: "var(--earth)" }}
                    >
                        📷 Gallery
                    </button>
                </div>
            </div>

            {/* Scroll hint */}
            <div className= "scrollHint">
                <span>Scroll</span>
                <div className= "scrollLine" />
            </div>
        </section>
    );
}