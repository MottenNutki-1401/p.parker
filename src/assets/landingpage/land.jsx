import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import car from "../../assets/car.svg";
import vector from "../../assets/vector.svg";
import "./land.css";

const features = [
  { icon: "⚡", title: "Fast Booking", desc: "Reserve a spot in seconds. No stress, no circling the block." },
  { icon: "📍", title: "Smart Location", desc: "Find the nearest available spots instantly, anywhere." },
  { icon: "🔒", title: "Secure", desc: "Your bookings and personal data are always safe." },
];

const steps = [
  { num: "01", label: "Search parking" },
  { num: "02", label: "Book instantly" },
  { num: "03", label: "Park & go" },
];

function Land() {
  const titleRef = useRef(null);
  const navigate = useNavigate();

useEffect(() => {
  const el = titleRef.current;
  if (!el) return;

  const text = "P.Parker";
  let i = 0;

  el.textContent = "";

  const type = setInterval(() => {
    if (i < text.length) {
      el.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(type);
    }
  }, 45);

  return () => clearInterval(type);
}, []);

  return (
    <div className="landing1">
      <img src={vector} className="vector1" alt="" aria-hidden="true" />
      <img src={car} className="car-bg1" alt="" aria-hidden="true" />

      {/* HERO */}
      <section className="hero glass1 fade-up">
        <span className="badge1">Smart Parking · Philippines</span>
        <h1 ref={titleRef} className="title1">Park Smarter. Move Faster.</h1>
        <p className="subtitle1">Find, reserve, and manage parking spots in seconds.</p>
        <div className="buttons1">
          <button onClick={() => navigate("/register")} className="sign1">Get Started</button>
          <button onClick={() => navigate("/login")} className="login1">Login</button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section1 fade-up">
        <p className="section-label1">Why choose us</p>
        <h2 className="section-title1">Why P.Parker?</h2>
        <div className="feature-grid1">
          {features.map((f, i) => (
            <div className="card1" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
              <div className="card-icon1">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how1 fade-up">
        <p className="section-label1">Simple process</p>
        <h2 className="section-title1">How it works</h2>
        <div className="steps1">
          {steps.map((s, i) => (
            <div className="step1" key={i}>
              <span className="step-num1">{s.num}</span>
              <span className="step-label1">{s.label}</span>
              {i < steps.length - 1 && <div className="step-connector1" />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta glass1 fade-up">
        <h2>Ready to park smarter?</h2>
        <p>Join thousands already parking with confidence.</p>
        <button onClick={() => navigate("/register")} className="sign1">Join Now — It's Free</button>
      </section>
    </div>
  );
}

export default Land;