import './Home.css';
import { About, Activities, Contact, Footer } from '../home';
import StatCard from '../../components/Stat/StatCard'
import { Link } from 'react-router-dom';
import { STATS } from '../../data/constants'
import ashramPhoto from '../../assets/edited_Ashram.jpeg';
import { useTranslation } from '../../hooks/useTranslation';

const STAT_KEYS = ['students', 'staff', 'cows']; // matches STATS array order in constants.js

export default function Hero() {
    const { t } = useTranslation();

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const translatedStats = STATS.map((s, i) => ({
        ...s,
        label: t(`stats.${STAT_KEYS[i]}.label`),
        desc: t(`stats.${STAT_KEYS[i]}.desc`),
    }));

    return (
        <>
            <section id="hero" className="hero">
                <div className="heroGrid">
                    {/* Text column — ~55% on desktop, left-aligned */}
                    <div className="heroText">
                        <div className="heroGrain" aria-hidden="true" />

                        <div className="heroEyebrow">
                            <span className="heroOmMark" aria-hidden="true">ॐ</span>
                            {t('home.hero.eyebrow')}
                        </div>

                        <h1 className="heroTitle">
                            {t('home.hero.title')}<br />{t('home.hero.titleLine2')}
                            <em className="heroTitleEm">{t('home.hero.titleEm')}</em>
                        </h1>

                        <p className="heroDeva">
                            <span className="heroDevaText">विद्या ददाति विनयम्</span>
                            <span className="heroDevaSep"> — </span>
                            <span className="heroDevaTranslation">{t('home.hero.devaGloss')}</span>
                        </p>

                        <p className="heroTagline measure-body">
                            {t('home.hero.tagline')}
                        </p>

                        <div className="heroActions">
                            <Link to="/getInvolved">
                                <button className="btn btn-primary">
                                    {t('home.hero.ctaGetInvolved')}
                                </button>
                            </Link>
                            <button
                                className="btn btn-outline"
                                onClick={() => scrollTo("about")}
                            >
                                {t('home.hero.ctaKnowAshram')}
                            </button>
                            <Link to="/gallery">
                                <button
                                    className="btn btn-outline"
                                    style={{ borderColor: "var(--earth)", color: "var(--earth)" }}
                                >
                                    {t('home.hero.ctaGallery')}
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Photo column — ~45%, a clear undimmed real photograph */}
                    <div className="heroPhoto">
                        <img
                            className="heroPhotoImg"
                            src={ashramPhoto}
                            alt="The hillside Shiva temple and main school building of Kaushiki Vaidik Gurukul Vidyalaya in Sankhu, with students and community members gathered in the courtyard"
                        />
                    </div>
                </div>

                {/* Scroll hint — small, static, no animation */}
                <div className="scrollHint" aria-hidden="true">
                    <span>{t('home.hero.scrollHint')}</span>
                    <span className="scrollArrow">↓</span>
                </div>
            </section>

            <section className="statsSection section">
                <div className="s-inner">
                    <div className="stats-grid">
                        {translatedStats.map((s, i) => <StatCard key={i} stat={s} index={i} />)}
                    </div>
                </div>
            </section>

            <About />
            <Activities />
            <Footer />
        </>
    );
}
