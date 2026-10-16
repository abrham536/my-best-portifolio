
import Navbar from "./component/navbar.jsx";
import "./App.css";

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Git & GitHub",
];

const projects = [
  {
    number: "01",
    title: "Luxury Jewelry Store",
    category: "E-commerce Website",
    description:
      "A modern online store concept for showcasing luxury jewelry and helping customers explore products.",
    technologies: ["React", "CSS", "JavaScript"],
  },
  {
    number: "02",
    title: "Inventory Management",
    category: "Management System",
    description:
      "A system concept for tracking products, monitoring stock levels, and organizing inventory information.",
    technologies: ["React", "Node.js", "Database"],
  },
  {
    number: "03",
    title: "Lucy Hotel Website",
    category: "Hotel Website",
    description:
      "A responsive hotel website concept featuring room information, hotel services, and contact details.",
    technologies: ["React", "CSS", "JavaScript"],
  },
];

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />

      <main id="main-content">
        <section className="hero section-container" id="home">
          <div className="hero-content">
            <p className="eyebrow">COMPUTER SCIENCE STUDENT · WEB DEVELOPER</p>

            <h1>
              Thoughtful ideas,
              <br />
              built for the
              <br />
              <span>digital world.</span>
            </h1>

            <p className="hero-description">
              I'm Abrham Mesfin, a Computer Science student who enjoys
              creating clear, responsive web experiences and learning by
              building useful things.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="button button-primary">
                View selected work <span aria-hidden="true">↗</span>
              </a>

              <a href="#contact" className="button button-secondary">
                Get in touch
              </a>
            </div>

            <div className="hero-note">
              <span className="status-dot" aria-hidden="true"></span>
              Open to learning opportunities and collaboration
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow"></div>

            <div className="portrait-frame">
              <img
                src="/profile.jpg"
                alt="Portrait of Abrham Mesfin"
                className="profile-photo"
                fetchPriority="high"
              />
              <div className="portrait-caption">
                <span>Abrham Mesfin</span>
                <span>Computer Science Student · Web Developer</span>
              </div>
            </div>

            <div className="floating-label label-top">
              <span>✦</span> Creative thinking
            </div>

            <div className="floating-label label-bottom">
              <span>⌘</span> Clean code
            </div>
          </div>
        </section>

        <section className="about section-container" id="about">
          <div className="section-heading">
            <p className="eyebrow">ABOUT</p>
            <h2>
              Curious by nature.
              <br />
              <span>Builder at heart.</span>
            </h2>
          </div>

          <div className="about-content">
            <p>
              I'm a Computer Science student at Debre Berhan University,
              focused on growing my frontend and full-stack development
              skills.
            </p>

            <p>
              I believe the best way to learn is to build. Each project helps
              me practice problem-solving, explore new tools, and make digital
              experiences a little more useful.
            </p>

            <a href="#projects" className="text-link">
              Explore my work <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <section className="skills section-container" id="skills">
          <div className="section-heading">
            <p className="eyebrow">SKILLS & TECHNOLOGIES</p>
            <h2>My technical toolkit<span>.</span></h2>
          </div>

          <div className="skills-list">
            {skills.map((skill) => (
              <div className="skill-item" key={skill}>
                <span className="skill-symbol">✳</span>
                {skill}
              </div>
            ))}
          </div>

          <p className="skills-note">A growing toolkit, shaped by continuous learning and hands-on projects.</p>
        </section>

        <section className="projects section-container" id="projects">
          <div className="projects-heading">
            <div className="section-heading">
              <p className="eyebrow">SELECTED WORK · CONCEPTS</p>
              <h2>
                Learning through
                <br />
                <span>digital products.</span>
              </h2>
            </div>

            <p className="projects-intro">
              A few concepts and projects that reflect what I'm learning and
              the kinds of problems I enjoy exploring.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-card-top">
                  <span className="project-number">
                    / {project.number}
                  </span>
                  <span className="project-arrow" aria-hidden="true">↗</span>
                </div>

                <div className="project-art" aria-hidden="true">
                  <span className="art-orbit orbit-one"></span>
                  <span className="art-orbit orbit-two"></span>
                  <span className="art-center">
                    {project.number === "01"
                      ? "✧"
                      : project.number === "02"
                        ? "▦"
                        : "⌂"}
                  </span>
                </div>

                <div className="project-details">
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="technology-list">
                    {project.technologies.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </div>

                  <a href="#contact" className="project-link">
                    Discuss this concept <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="portfolio-disclaimer">
            These are project concepts. More detailed case studies and live
            demos will be added as the work is ready to share.
          </p>
        </section>

        <section className="contact section-container" id="contact">
          <p className="eyebrow">LET'S CONNECT</p>

          <h2>
            Have an idea?
            <br />
            <span>Let's talk.</span>
          </h2>

          <p className="contact-description">
            I'm always glad to meet fellow developers, explore opportunities,
            and hear about thoughtful ideas.
          </p>
          <div className="contact-methods" aria-label="Contact options">
            <a className="contact-method" href="mailto:abrhammesfn1@gmail.com">
              <span className="contact-method-label">Email</span>
              <span>abrhammesfn1@gmail.com</span>
              <span className="contact-method-arrow" aria-hidden="true">↗</span>
            </a>
            <a
              className="contact-method"
              href="https://t.me/Abrsh228"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-method-label">Telegram</span>
              <span>@Abrsh228</span>
              <span className="contact-method-arrow" aria-hidden="true">↗</span>
            </a>
            <a className="contact-method" href="tel:+251985785876">
              <span className="contact-method-label">Phone</span>
              <span>+251 985 785 876</span>
              <span className="contact-method-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="logo">
          Abrham<span>.</span>
        </a>

        <p>Designed and built by Abrham Mesfin.</p>

        <a href="#home" className="back-to-top">
          Back to top ↑
        </a>
      </footer>
    </>
  );
}

export default App;
