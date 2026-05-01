import { useState } from "react";
import { INVOLVEMENT_SCHEMES } from "../../data/constants";
import { useReveal } from "../../hooks/UseReveal";
import "./GetInvolved.css";
/* ── Scheme Option ───────────────────────── */
function SchemeOption({ option, selected, onSelect }) {
    return (
        <button
            className={`option ${selected ? "optionSelected" : ""}`}
            onClick={() => onSelect(option)}
        >
            <span className="optionLabel">{option.label}</span>
            <span className="optionAmount">{option.amount}</span>
            <span className="optionDetail">{option.detail}</span>
            {selected && <span className="optionCheck">✓</span>}
        </button>
    );
}

/* ── Booking Modal ───────────────────────── */
function BookingModal({ scheme, selectedOption, onClose }) {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

    const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

    const handleSubmit = () => {
        if (!form.name || !form.email) {
            alert("Please fill in your name and email.");
            return;
        }
        setSubmitted(true);
    };

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="modalClose" onClick={onClose}>✕</button>

                {!submitted ? (
                    <>
                        <div className="modalIcon">{scheme.icon}</div>
                        <div className="modalTitle">{scheme.title}</div>
                        {selectedOption && (
                            <div className="modalOption">
                                {selectedOption.label} — <strong>{selectedOption.amount}</strong>
                            </div>
                        )}
                        <p className="modalSub">
                            Fill in your details and the ashram will contact you to complete the arrangement.
                        </p>

                        <div className="f-group">
                            <label className="f-label">Your Full Name</label>
                            <input className="f-input" placeholder="e.g. Sita Devi Sharma" value={form.name} onChange={update("name")} />
                        </div>
                        <div className="f-group">
                            <label className="f-label">Email Address</label>
                            <input type="email" className="f-input" placeholder="your@email.com" value={form.email} onChange={update("email")} />
                        </div>
                        <div className="f-group">
                            <label className="f-label">Phone / WhatsApp (optional)</label>
                            <input className="f-input" placeholder="+977 ..." value={form.phone} onChange={update("phone")} />
                        </div>
                        <div className="f-group">
                            <label className="f-label">Special Wishes or Notes</label>
                            <textarea
                                className="f-input"
                                placeholder="Birthday name, dedication message, special intentions…"
                                value={form.message}
                                onChange={update("message")}
                            />
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ width: "100%", justifyContent: "center", borderRadius: 5, padding: "14px" }}
                            onClick={handleSubmit}
                        >
                            🙏 Submit &amp; Confirm
                        </button>
                        <p className="danaNote">
                            The ashram accepts dana (sacred offering) — never a commercial fee.
                        </p>
                    </>
                ) : (
                    <div className="modalSuccess">
                        <div style={{ fontSize: 48, marginBottom: 16 }}>🙏</div>
                        <h3 className="successTitle">Pranam, {form.name}!</h3>
                        <p>Your expression of seva has been received. The ashram will contact you at <strong>{form.email}</strong> within 2 working days to complete the arrangement.</p>
                        <div className="successDeva">शुभमस्तु · सर्वे भवन्तु सुखिनः</div>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ── Scheme Card ─────────────────────────── */
function SchemeCard({ scheme }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className={`card card_${scheme.badgeColor}`}>
            {/* Badge */}
            <div className={`badge badge_${scheme.badgeColor}`}>
                {scheme.badge}
            </div>

            {/* Head */}
            <div className="cardHead">
                <div className="cardIcon">{scheme.icon}</div>
                <div className="cardDeva">{scheme.deva}</div>
                <h3 className="cardTitle">{scheme.title}</h3>
                <p className="cardTagline">{scheme.tagline}</p>
            </div>

            {/* Divider */}
            <div className="cardRule" />

            {/* Description */}
            <p className="cardDesc">{scheme.desc}</p>

            {/* Options */}
            <div className="optionsLabel">Choose an amount:</div>
            <div className="options">
                {scheme.options.map((opt) => (
                    <SchemeOption
                        key={opt.label}
                        option={opt}
                        selected={selectedOption?.label === opt.label}
                        onSelect={setSelectedOption}
                    />
                ))}
            </div>

            {/* CTA */}
            <button
                className={`btn ${scheme.badgeColor === "earth" ? "btn-earth" : "btn-primary"}`}
                style={{ width: "100%", justifyContent: "center", borderRadius: 5, marginTop: 8 }}
                onClick={() => setModalOpen(true)}
            >
                {scheme.icon} Participate in {scheme.title.split(" ")[0]} Scheme
            </button>

            {/* Modal */}
            {modalOpen && (
                <BookingModal
                    scheme={scheme}
                    selectedOption={selectedOption}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
}

/* ── GetInvolved Section ─────────────────── */
export default function GetInvolved() {
    const { ref, isVisible } = useReveal();

    return (
        <section
            id="get-involved"
            className="section"
            style={{ background: "var(--earth-pale)", borderTop: "1px solid rgba(90,120,69,.12)" }}
        >
            <div className="s-inner">
                {/* Header */}
                <div
                    ref={ref}
                    className={`${isVisible ? "reveal visible" : "reveal"}`}
                    style={{ maxWidth: 680, marginBottom: 56 }}
                >
                    <div className="s-eyebrow">Support the Ashram</div>
                    <h2 className="s-title">
                        Get <em>Involved</em>
                    </h2>
                    <div className="rule" />
                    <p style={{ fontSize: "15.5px", color: "var(--ink-mid)", lineHeight: 1.95 }}>
                        Every act of giving sustains the sacred flame of free Vedic education. Whether you celebrate a birthday, become a student's guardian, or simply light a lamp — your seva becomes part of this unbroken tradition.
                    </p>
                    <div className="statsRow">
                        {[
                            { num: "200+", label: "Students supported" },
                            { num: "20+", label: "Years of seva" },
                            { num: "₹0", label: "Charged for education" },
                        ].map(({ num, label }) => (
                            <div key={label} className="stat">
                                <span className="statNum">{num}</span>
                                <span className="statLabel">{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cards grid */}
                <div className="cardsGrid">
                    {INVOLVEMENT_SCHEMES.map((scheme, i) => (
                        <div
                            key={scheme.id}
                            className={`reveal ${i % 2 === 1 ? "reveal-delay-1" : ""}`}
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? "none" : "translateY(22px)",
                                transition: `opacity .8s ${i * 0.1}s ease, transform .8s ${i * 0.1}s ease`,
                            }}
                        >
                            <SchemeCard scheme={scheme} />
                        </div>
                    ))}
                </div>

                {/* Bottom note */}
                <div className="bottomNote">
                    <span style={{ fontFamily: "'Tiro Devanagari Sanskrit',serif", fontSize: 18, color: "var(--saff)", opacity: 0.65 }}>
                        सर्वे भवन्तु सुखिनः
                    </span>
                    <p>
                        All contributions go directly towards student education, temple upkeep, and ashram operations.
                        No administrative overhead. 100% of your dana reaches the purpose it is given for.
                    </p>
                    <a
                        href="mailto:kausikhe@bedhgurukul.org"
                        className="btn btn-outline"
                        style={{ marginTop: 16, fontSize: 13 }}
                    >
                        ✉️ Other Ways to Support
                    </a>
                </div>
            </div>
        </section>
    );
}