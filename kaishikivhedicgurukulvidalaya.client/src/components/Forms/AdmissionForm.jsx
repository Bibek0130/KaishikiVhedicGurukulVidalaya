import { useRef, useState } from "react";
import './AdmissionForm.css';
import { useTranslation } from '../../hooks/useTranslation';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { sendWhatsAppMessage } from '../../api/whatsapp';

const DI = ({ name, value, onChange, style }) => (
    <input
        className="dotted-input"
        name={name}
        value={value}
        onChange={onChange}
        style={style}
    />
);

export default function AdmissionForm() {
    const { t } = useTranslation();
    const formPageRef = useRef(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [downloading, setDownloading] = useState(false);
    const [downloaded, setDownloaded] = useState(false);
    const [form, setForm] = useState({
        date: "", naam: "", varsha: "", janmaMiti: "",
        gotra: "", pravar: "", gan: "",
        babuNaam: "", babuPesa: "",
        aamaNaam: "", aamaPesa: "",
        bajeNaam: "",
        matrugotra: "",
        samparkNa: "",
        uttirnaPramanpatra: "", vidyalaya: "", thegana: "",
        janmaDartaPramanpatra: "",
        sthayi_jilla: "", sthayi_pradesh: "", sthayi_gaun: "",
        janmasthan_jilla: "", janmasthan_pradesh: "", janmasthan_gaun: "",
        upaniit: "",
        guardian_naam: "", guardian_thegana: "", guardian_sampark: "",
        guardianRelation: "",
        verify_naam: "", verify_pad: "",
    });

    const set = (k) => (e) => {
        setForm((prev) => ({
            ...prev,
            [k]: e.target.value,
        }));
    }

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file) setPhotoPreview(URL.createObjectURL(file));
    };

    const validation = () => {
        if (!form.date) return false;
        if (!form.naam) return false;
        if (!form.varsha) return false;
        return true;
    }

    // Staff-facing summary of the filled form (labels match the paper form).
    // Empty fields are skipped; the photo and signatures can't travel over WhatsApp.
    const buildNotification = () => {
        const digits = form.samparkNa.replace(/\D/g, "");
        const waNumber = digits.length === 10 ? `977${digits}` : digits;
        const rows = [
            ["नाम", form.naam], ["वर्ष", form.varsha], ["जन्म मिति", form.janmaMiti],
            ["सम्पर्क नं.", form.samparkNa], ["Chat", waNumber ? `https://wa.me/${waNumber}` : ""],
            ["गोत्र", form.gotra], ["प्रवर", form.pravar], ["गण", form.gan],
            ["बाबुको नाम", form.babuNaam], ["बाबुको पेसा", form.babuPesa],
            ["आमाको नाम", form.aamaNaam], ["आमाको पेसा", form.aamaPesa],
            ["बाजेको नाम", form.bajeNaam], ["मातृगोत्र", form.matrugotra],
            ["उत्तीर्ण प्रमाणपत्र", form.uttirnaPramanpatra], ["विद्यालय", form.vidyalaya], ["ठेगाना", form.thegana],
            ["स्थायी निवास", [form.sthayi_jilla, form.sthayi_pradesh, form.sthayi_gaun].filter(Boolean).join(", ")],
            ["जन्मस्थान", [form.janmasthan_jilla, form.janmasthan_pradesh, form.janmasthan_gaun].filter(Boolean).join(", ")],
            ["उपनीत", form.upaniit],
            ["अभिभावक", form.guardian_naam], ["अभिभावकको ठेगाना", form.guardian_thegana],
            ["अभिभावकको सम्पर्क", form.guardian_sampark],
        ];
        const lines = rows.filter(([, v]) => v && v.trim()).map(([k, v]) => `${k}: ${v.trim()}`);
        return [`New admission form downloaded (${form.date})`, ...lines].join("\n");
    };

    // Renders the actual on-screen form (formPageRef) into a PDF, so the
    // download is pixel-faithful to the live design -- same fonts, colours,
    // dotted lines, and whatever the applicant has typed into each field --
    // rather than a separately laid-out document that could drift from it.
    const handleDownload = async (e) => {
        if (e) e.preventDefault();
        if (!validation()) {
            alert("Please fill all required fields.");
            return;
        }
        const node = formPageRef.current;
        if (!node) return;

        setDownloading(true);
        setDownloaded(false);
        try {
            const canvas = await html2canvas(node, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
            });

            const pdf = new jsPDF({ unit: "pt", format: "a4" });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            // JPEG, not PNG -- the form is solid white with thin lines and
            // text, so there's no transparency to preserve, and PNG's
            // lossless encoding of antialiased text at 2x scale otherwise
            // balloons the file to ~20MB for a document this simple.
            const imgData = canvas.toDataURL("image/jpeg", 0.92);

            // The form is taller than one A4 page -- paginate by shifting
            // the same full-height image up on each successive page, the
            // standard html2canvas+jsPDF technique for multi-page capture.
            let heightLeft = imgHeight;
            let position = 0;
            pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position -= pageHeight;
                pdf.addPage();
                pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            const safeName = form.naam ? form.naam.trim().replace(/\s+/g, "_") : "Admission-Form";
            pdf.save(`${safeName}.pdf`);
            setDownloaded(true);

            // Tell the ashram. The applicant already has their PDF, so a failed
            // notification must not interrupt them -- it is only logged.
            sendWhatsAppMessage(buildNotification()).catch((err) =>
                console.warn("Admission notification was not sent:", err.message));
        } catch (error) {
            alert("Could not generate the PDF. Please try again.");
        } finally {
            setDownloading(false);
        }
    }

    return (
        <div className="admission-form-page-wrap">
            <div className="admission-form-header">
                <div className="s-eyebrow">{t('forms.admissionForm.pageEyebrow')}</div>
                <h1 className="s-title">
                    {t('forms.admissionForm.pageTitle')}<em>{t('forms.admissionForm.pageTitleEm')}</em>
                </h1>
                <div className="rule" />
                <p className="admission-form-intro">{t('forms.admissionForm.pageIntro')}</p>
            </div>
            <form onSubmit={handleDownload}
            >
            <div className="form-page" ref={formPageRef}>

                {/* ── HEADER ── */}
                <div className="header">
                    <div className="phone-no">फोन नं.: ९८५१२३४९५९</div>
                    <div className="header-top">वैदिक अनुसन्धान समितिद्वारा सञ्चालित</div>
                    <div className="school-name-nep">कौशिकी वैदिक गुरुकुल विद्यालय</div>
                    <div className="school-name-eng">KAUSHIKI BAIDIK GURUKUL SCHOOL</div>
                    <div className="address">
                        भीमेश्वर मन्दिर, सुवेदी गाउँ, कागेश्वरी मनोहरा-१, काठमाडौं
                    </div>
                </div>

                <hr className="divider" />
                <hr className="divider-thin" />

                {/* ── FORM TITLE ── */}
                <div className="form-title-row">
                    <span className="form-title">विद्यार्थी भर्ना आवेदन फाराम</span>
                    <div className="form-title-rule" aria-hidden="true" />
                    <div className="date-field">
                        <span>मिति:</span>
                        <input value={form.date} onChange={set("date")} placeholder="मिति"/>
                    </div>
                </div>

                {/* ── TOP SECTION (fields + photo) ── */}
                <div className="top-section">
                    <div className="top-fields">
                        {/* नाम / वर्ष / जन्म मिति */}
                        <div className="field-row">
                            <span className="field-label">नाम:</span>
                            <DI name="naam" value={form.naam} onChange={set("naam")} />
                            <span className="field-label" style={{ marginLeft: 8 }}>वर्ष:</span>
                            <DI name="varsha" value={form.varsha} onChange={set("varsha")} style={{ maxWidth: 50 }} />
                            <span className="field-label">जन्म मिति:</span>
                            <DI name="janmaMiti" value={form.janmaMiti} onChange={set("janmaMiti")} />
                        </div>
                        <div className="field-row">
                            <span className="field-label">गोत्र</span>
                            <DI name="gotra" value={form.gotra} onChange={set("gotra")} />
                        </div>
                        <div className="field-row">
                            <span className="field-label">प्रवर</span>
                            <DI name="pravar" value={form.pravar} onChange={set("pravar")} />
                        </div>
                        <div className="field-row">
                            <span className="field-label">गण</span>
                            <DI name="gan" value={form.gan} onChange={set("gan")} />
                        </div>
                    </div>

                    {/* Photo */}
                    <div className="photo-box">
                        {photoPreview
                            ? <img src={photoPreview} alt="Uploaded student photo preview" />
                            : <span>फोटो</span>}
                        <input type="file" accept="image/*" onChange={handlePhoto} />
                    </div>
                </div>

                {/* ── PERSONAL FIELDS ── */}
                <div className="field-row col2">
                    <div className="inline-group">
                        <span className="field-label">बाबुको नाम</span>
                        <DI name="babuNaam" value={form.babuNaam} onChange={set("babuNaam")} />
                    </div>
                    <div className="inline-group">
                        <span className="field-label">पेसा</span>
                        <DI name="babuPesa" value={form.babuPesa} onChange={set("babuPesa")} />
                    </div>
                </div>

                <div className="field-row col2">
                    <div className="inline-group">
                        <span className="field-label">आमाको नाम</span>
                        <DI name="aamaNaam" value={form.aamaNaam} onChange={set("aamaNaam")} />
                    </div>
                    <div className="inline-group">
                        <span className="field-label">पेसा</span>
                        <DI name="aamaPesa" value={form.aamaPesa} onChange={set("aamaPesa")} />
                    </div>
                </div>

                <div className="field-row">
                    <span className="field-label">बाजेको नाम</span>
                    <DI name="bajeNaam" value={form.bajeNaam} onChange={set("bajeNaam")} />
                </div>

                <div className="field-row">
                    <span className="field-label">मातृगोत्र</span>
                    <DI name="matrugotra" value={form.matrugotra} onChange={set("matrugotra")} />
                </div>

                <div className="field-row">
                    <span className="field-label">सम्पर्क नं.</span>
                    <DI name="samparkNa" value={form.samparkNa} onChange={set("samparkNa")} />
                </div>

                <div className="field-row">
                    <span className="field-label">उत्तिर्ण प्रमाणपत्र</span>
                    <DI name="uttirnaPramanpatra" value={form.uttirnaPramanpatra} onChange={set("uttirnaPramanpatra")} />
                    <span className="field-label">विद्यालय</span>
                    <DI name="vidyalaya" value={form.vidyalaya} onChange={set("vidyalaya")} />
                    <span className="field-label">ठेगाना</span>
                    <DI name="thegana" value={form.thegana} onChange={set("thegana")} />
                </div>

                <div className="field-row">
                    <span className="field-label">जन्म दर्ता प्रमाणपत्र, जन्म पत्रिका..</span>
                    <DI name="janmaDartaPramanpatra" value={form.janmaDartaPramanpatra} onChange={set("janmaDartaPramanpatra")} />
                </div>

                <div className="field-row">
                    <span className="field-label">स्थायी निवास, जिल्ला</span>
                    <DI name="sthayi_jilla" value={form.sthayi_jilla} onChange={set("sthayi_jilla")} />
                    <span className="field-label">प्रदेश नं.</span>
                    <DI name="sthayi_pradesh" value={form.sthayi_pradesh} onChange={set("sthayi_pradesh")} style={{ maxWidth: 50 }} />
                    <span className="field-label">गाउँपालिका/नगरपालिका</span>
                    <DI name="sthayi_gaun" value={form.sthayi_gaun} onChange={set("sthayi_gaun")} />
                </div>

                <div className="field-row">
                    <span className="field-label">जन्मस्थान, जिल्ला</span>
                    <DI name="janmasthan_jilla" value={form.janmasthan_jilla} onChange={set("janmasthan_jilla")} />
                    <span className="field-label">प्रदेश नं.</span>
                    <DI name="janmasthan_pradesh" value={form.janmasthan_pradesh} onChange={set("janmasthan_pradesh")} style={{ maxWidth: 50 }} />
                    <span className="field-label">गाउँपालिका/नगरपालिका</span>
                    <DI name="janmasthan_gaun" value={form.janmasthan_gaun} onChange={set("janmasthan_gaun")} />
                </div>

                <div className="field-row">
                    <span className="field-label">उपनीत, अनुपनीत विशेष इच्छा</span>
                    <DI name="upaniit" value={form.upaniit} onChange={set("upaniit")} />
                </div>

                {/* ── GUARDIAN SECTION ── */}
                <div className="guardian-section">
                    <div className="section-label">अभिभावकको विवरण</div>
                    <div className="field-row">
                        <span className="field-label">नाम</span>
                        <DI name="guardian_naam" value={form.guardian_naam} onChange={set("guardian_naam")} />
                    </div>
                    <div className="field-row">
                        <span className="field-label">ठेगाना</span>
                        <DI name="guardian_thegana" value={form.guardian_thegana} onChange={set("guardian_thegana")} />
                    </div>
                    <div className="field-row">
                        <span className="field-label">सम्पर्क नं.</span>
                        <DI name="guardian_sampark" value={form.guardian_sampark} onChange={set("guardian_sampark")} />
                    </div>
                </div>

                {/* ── GUARDIAN DECLARATION ── */}
                <div className="declaration">
                    उपर्युक्त विवरण ठीक साँचो हो । ……… नाता भएको निजलाई आश्रमको नियममा राखी अध्यापन गराउन इच्छुक छु,
                    कुनै देवी विपत् या उच्छृङ्खलतावस वटुकबाट कुनै कुकार्य भएमा त्यसको जवाफदेहि हामी आफैं हुनेछौं ।
                </div>
                <div className="field-row">
                    <span className="field-label">दस्तखत</span>
                </div>
                <div className="sig-row">
                    <div className="sig-item">
                        <div className="sig-box" />
                        <span className="sig-label">दायाँ</span>
                    </div>
                    <div className="sig-item">
                        <div className="sig-box" />
                        <span className="sig-label">बायाँ</span>
                    </div>
                </div>
                <div className="sig-name-line" />

                {/* ── STUDENT DECLARATION ── */}
                <div className="declaration" style={{ marginTop: 14 }}>
                    म यस गुरुकुलको आचार संहितामा रहि अध्ययन गर्न इच्छुक छु साथै म बाट मर्यादा विपरित कार्य हुन गएमा स्वतः
                    निष्कासित हुन मन्जुर छु ।
                </div>
                <div className="field-row">
                    <span className="field-label">दस्तखत</span>
                </div>
                <div className="sig-row">
                    <div className="sig-item">
                        <div className="sig-box" />
                        <span className="sig-label">दायाँ</span>
                    </div>
                    <div className="sig-item">
                        <div className="sig-box" />
                        <span className="sig-label">बायाँ</span>
                    </div>
                </div>
                <div className="sig-name-line" />

                {/* ── VERIFICATION ── */}
                <div className="verify-section">
                    <div className="section-label">फाराम प्रमाणित गर्ने</div>
                    <div className="verify-field">
                        <span className="field-label">नाम</span>
                        <DI name="verify_naam" value={form.verify_naam} onChange={set("verify_naam")} />
                    </div>
                    <div className="verify-field">
                        <span className="field-label">पद</span>
                        <DI name="verify_pad" value={form.verify_pad} onChange={set("verify_pad")} />
                    </div>
                    <div className="field-label" style={{ marginTop: 6 }}>दस्तखत</div>
                    <div className="verify-sig-line" />
                </div>

                {/* ── NOTE ── */}
                <div className="note-section">
                    <strong>जानकारी:</strong>
                    <span> स्नातक: हाम्रो अधिनभन्दा बाहिर गएर भविष्य भएमा आश्रम जवाफदेहि हुनेछैन ।</span>
                </div>
            </div>

                <div className="admission-form-btn">
                    <button
                        className="btn-primary btn"
                        type="submit"
                        disabled={downloading}
                    >
                        {downloading ? t('forms.admissionForm.downloading') : t('forms.admissionForm.download')}
                    </button>
                    {downloaded && (
                        <p className="admission-form-downloaded-note">
                            ✓ {t('forms.admissionForm.downloadedNote')}
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}
