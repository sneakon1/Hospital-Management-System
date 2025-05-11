import "./DoctorCard.css";

const DoctorCard = ({
    name,
    img,
    onClick,
    dep
}) => {
    return (
        <div className="doctor-card" >
            <div className="profile-section">
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                        src={img}
                        alt="Dr. Anoop Misra"
                        className="profile-image"
                    />
                </div>
                <div className="profile-info">
                    <h3>Dr. {name}</h3>
                    <p className="designation">VS Care-Doc</p>
                    <div className="specialties">
                        <span>{dep}</span>        
                    </div>
                </div>
            </div>
            <div className="details">
                <div>
                    <span role="img" aria-label="experience">
                        📅
                    </span>{" "}
                    <strong>40 Years</strong>
                    <div className="label">Experience</div>
                </div>
                <div>
                    <span role="img" aria-label="fees">
                        ₹
                    </span>{" "}
                    <strong>2800</strong>
                    <div className="label">Fees</div>
                </div>
            </div>
            <div className="buttons">
                <button className="view-profile">View Full Profile</button>
                <button className="book-appointment" onClick={onClick}>Book An Appointment</button>
            </div>
        </div>
    );
};

export default DoctorCard;