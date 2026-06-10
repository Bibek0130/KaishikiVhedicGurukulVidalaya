import './Home.css';
import { About, Activities, Contact, Footer } from '../home';
import StatCard from '../../components/Stat/StatCard'
import { Link } from 'react-router-dom';
import {STATS } from '../../data/constants'

export default function Hero() {
    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <section id="hero" className="hero">
                {/* Background with slow zoom */}
                <div className="heroBg" />
                <div className="heroGrain" />

                {/* Large watermark OM */}
                <div className="heroOm">ॐ</div>

                {/* Content */}
                <div className={"heroContent"}>
                    <div className={"heroEyebrow"}>
                        कौशिके वैदिक गुरुकुल · नेपाल
                    </div>

                    <h1 className={"heroTitle"}>
                        A School Rooted<br />in{" "}
                        <em className={"heroTitleEm"}>Sacred Hills</em>
                    </h1>

                    <p className={"heroDeva"}>
                        विद्या ददाति विनयम् — Knowledge bestows humility
                    </p>

                    <p className={"heroTagline"}>
                        Nestled on a hillside beside an Shiva temple, we preserve the living
                        tradition of Sanskrit learning — freely, simply, and in harmony with
                        all of nature.
                    </p>

                    <div className={"heroActions"}>
                        <Link to="/getInvolved">
                        <button
                            className="btn btn-primary"
                        >
                            🌱 Get Involved
                        </button>
                        </Link>
                        <button
                            className="btn btn-outline"
                            onClick={() => scrollTo("about")}
                        >
                            Know the Ashram
                        </button>
                        <Link to="/gallery">
                            <button
                                className="btn btn-outline"
                                style={{ borderColor: "var(--earth)", color: "var(--earth)" }}
                            >
                                📷 Gallery
                            </button>
                        </Link>
                        
                    </div>
                </div>

                {/* Scroll hint */}
                <div className="scrollHint">
                    <span>Scroll</span>
                    <div className="scrollLine" />
                </div>
            </section>
            <section>
                <div className="stats-grid">
                    {STATS.map((s, i) => <StatCard key={i} stat={s} index={i} />)}
                </div>
                <About />
                <Activities />
                <Footer />
            </section>
        </>
       
        
    );
}