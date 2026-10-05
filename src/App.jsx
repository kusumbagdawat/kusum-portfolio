import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
//
import "./index.css";
import React, { useState, useEffect, useRef } from "react";

/* ================= EARTH ================= */

function Earth() {
  const earthRef = useRef();

  const [earthTexture, normalTexture, nightTexture, cloudTexture] =
    useLoader(THREE.TextureLoader, [
      "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg",
      "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg",
      "https://threejs.org/examples/textures/planets/earth_lights_2048.png",
      "https://threejs.org/examples/textures/planets/earth_clouds_1024.png",
    ]);

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.40;
    }
  });

  return (
    <group position={[2.6, -0.35, 0]} scale={1.10}>
      <mesh ref={earthRef} scale={2.35}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhongMaterial
          map={earthTexture}
          normalMap={normalTexture}
          normalScale={new THREE.Vector2(0.5, 0.5)}
          emissiveMap={nightTexture}
          emissive={new THREE.Color("#c99b45")}
          emissiveIntensity={0.45}
          shininess={18}
        />
      </mesh>

      <mesh scale={2.4}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshPhongMaterial
          map={cloudTexture}
          transparent
          opacity={0.22}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.7, 0.12, 0]}>
        <torusGeometry args={[3.05, 0.014, 16, 220]} />
        <meshBasicMaterial
          color="#d8b66b"
          transparent
          opacity={0.72}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2.25, -0.18, 0]}>
        <torusGeometry args={[2.82, 0.007, 12, 200]} />
        <meshBasicMaterial
          color="#f2dfb0"
          transparent
          opacity={0.32}
        />
      </mesh>

      <mesh position={[0, -2.68, 0]}>
        <cylinderGeometry args={[2.55, 3.15, 0.42, 64]} />
        <meshStandardMaterial
          color="#151412"
          roughness={0.9}
          metalness={0.12}
        />
      </mesh>

      <pointLight
        position={[5, 3, 5]}
        intensity={7}
        color="#ffe2a3"
      />
    </group>
  );
}

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0.25, 8.8], fov: 40 }}>
      <color attach="background" args={["#040404"]} />

      <ambientLight intensity={0.35} />

      <directionalLight
        position={[5, 4, 5]}
        intensity={3}
        color="#fff0cf"
      />

      <Stars
        radius={100}
        depth={50}
        count={4000}
        factor={3}
        saturation={0}
        fade={false}
        speed={0.5}
      />

      <Earth />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}

/* ================= SKILL ================= */
function SkillObject({ logo, name, type }) {
  return (
    <div className={`skill-object ${type || ""}`}>
      <div className="skill-logo-wrap">
        <img
          src={logo}
          alt={`${name} logo`}
          className="skill-logo"
        />
      </div>

      <div className="skill-name">{name}</div>
    </div>
  );
}

/* ================= PROJECT ================= */
function ProjectCard({
  number,
  title,
  subtitle,
  description,
  technologies,
  icon,
  type,
}) {
  return (
    <article className={`project-card ${type}`}>

      <div className="project-number">
        {number}
      </div>

      <div className="project-visual">

        <div className="project-glow" />

        <div className="project-device">

          <div className="device-top">
            <span />
            <span />
            <span />
          </div>

          <div className="device-screen">

            <div className="screen-header">
              <span className="screen-dot" />
              <span className="screen-title">
                {title}
              </span>
            </div>

            <div className="screen-main">

              <div className="screen-icon">
                {icon}
              </div>

              <div className="screen-lines">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

            </div>

          </div>

        </div>


        <div className="floating-project-object">

          {type === "ai" && (
            <>
              <span>AI</span>
              <small>CODE</small>
            </>
          )}

          {type === "quiz" && (
            <>
              <span>✓</span>
              <small>QUIZ</small>
            </>
          )}

          {type === "music" && (
            <>
              <span>♫</span>
              <small>MUSIC</small>
            </>
          )}

        </div>


        <div className="project-orbit orbit-one" />
        <div className="project-orbit orbit-two" />

      </div>


      <div className="project-info">

        <p className="project-subtitle">
          {subtitle}
        </p>

        <h3>
          {title}
        </h3>

        <p className="project-description">
          {description}
        </p>

        <div className="project-tech">

          {technologies.map((tech) => (
            <span key={tech}>
              {tech}
            </span>
          ))}

        </div>

      </div>

    </article>
  );
}
/* ================= APP ================= */

export default function App() {
      const contactRef = useRef(null);

      useEffect(() => {
        const contact = contactRef.current;

        if (!contact) return;

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              contact.classList.add("contact-visible");
              observer.disconnect();
            }
          },
          {
            threshold: 0.3,
          }
        );

        observer.observe(contact);

        return () => observer.disconnect();
      }, []);
  const educationRef = useRef(null);

  useEffect(() => {
    const education = educationRef.current;

    if (!education) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          education.classList.add("education-visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(education);

    return () => observer.disconnect();
  }, []);

  return (
    <main>

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-scene">
          <HeroScene />
        </div>

        <nav className="navbar">
          <div className="logo">KB</div>

          <div className="nav-links">
         <a href="#about">About</a>
         <a href="#skills">Skills</a>
         <a href="#projects">Projects</a>
         <a href="#experience">Experience</a>
         <a href="#contact">Contact</a>
          </div>
        </nav>

        <section className="hero-content">

          <p className="eyebrow">
            JAVA FULL STACK DEVELOPER
          </p>

          <h1>
            KUSUM
            <br />
            <span>BAGDAWAT</span>
          </h1>

          <p className="description">
            Building modern full-stack applications with Java,
            Spring Boot, React.js, APIs and microservices.
          </p>
<div className="hero-buttons">
  <button
    onClick={() =>
      document.getElementById("projects")?.scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    View Projects
  </button>

  <button
    className="outline"
    onClick={() =>
      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth",
      })
    }
  >
    Contact Me
  </button>

  <a
    href="/resume.pdf"
    target="_blank"
    rel="noreferrer"
    className="resume-button"
  >
    View Resume
  </a>
</div>

        </section>

        <div className="scroll-text">
          SCROLL TO EXPLORE ↓
        </div>



      </section>

      {/* ================= ABOUT ================= */}

      <section className="about"id="about">

        <div className="about-visual">

          <img
            src="/about-developer-scene.png"
            alt="Stylized developer working on laptop"
          />

        </div>

        <div className="about-content">

          <p className="section-label">
            ABOUT ME
          </p>

          <h2>
            Building Ideas
            <br />
            <span>Into Reality.</span>
          </h2>

          <p>
            I'm Kusum Bagdawat, a Computer Science Engineering
            student and Java Full Stack Developer passionate about
            building modern, scalable and user-focused applications.
          </p>

          <p>
            My development journey focuses on Java, Spring Boot,
            React.js, REST APIs, databases and microservices.
            I enjoy turning complex technical problems into
            clean and practical solutions.
          </p>

          <div className="about-tags">
            <span>Java</span>
            <span>Spring Boot</span>
            <span>React.js</span>
            <span>Microservices</span>
          </div>

        </div>

      </section>

      {/* ================= SKILLS ================= */}
<section className="skills"id="skills">

  <div className="skills-background">
    <div className="skills-orb orb-one" />
    <div className="skills-orb orb-two" />
    <div className="skills-grid" />
  </div>

  <div className="skills-heading">

    <p className="section-label">
      MY TOOLKIT
    </p>

    <h2>
      Skills &
      <br />
      <span>Technologies.</span>
    </h2>

    <p>
      Technologies I use to design, build and deploy
      modern full-stack applications.
    </p>

  </div>


  <div className="skills-stage">

    <SkillObject
      name="Java"
      type="java"
      logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
    />

    <SkillObject
      name="C++"
      type="cpp"
      logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
    />

    <SkillObject
      name="Spring Boot"
      type="spring"
      logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
    />

    <SkillObject
      name="React.js"
      type="react"
      logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    />

    <SkillObject
      name="MySQL"
      type="database"
      logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
    />

    <SkillObject
      name="PostgreSQL"
      type="database"
      logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
    />

    <SkillObject
      name="REST APIs"
      type="api"
      logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg"
    />

    <SkillObject
      name="JWT Auth"
      type="security"
      logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
    />

    <SkillObject
      name="Microservices"
      type="microservices"
      logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
    />

    <SkillObject
      name="GitHub"
      type="github"
      logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
    />

    <SkillObject
      name="Spring Data JPA"
      type="spring"
      logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg"
    />

    <SkillObject
      name="Hibernate"
      type="hibernate"
      logo="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg"
    />

  </div>


  <div className="skills-footer">
    DSA • OOP • DBMS • REST • MVC • API GATEWAY • EUREKA • OPENFEIGN
  </div>

</section>
      {/* ================= PROJECTS ================= */}

      <section className="projects"id="projects">

        <div className="projects-heading">

          <div>
            <p className="section-label">
              SELECTED WORK
            </p>

            <h2>
              Things I've
              <br />
              <span>Built.</span>
            </h2>
          </div>

          <p>
            A selection of full-stack applications built with
            Java, Spring Boot, React.js, databases and modern
            backend architecture.
          </p>

        </div>

        <div className="projects-list">

          <ProjectCard
            number="01"
            title="CodePilot AI"
            subtitle="AI-POWERED DEVELOPER ASSISTANT"
            icon="AI"
            type="ai"
            description="An AI-powered developer assistant for code review, bug detection, SQL generation, documentation, email generation and coding assistance."
            technologies={[
              "React",
              "TypeScript",
              "Spring Boot",
              "Gemini API",
              "REST APIs",
              "Render",
            ]}
          />

          <ProjectCard
            number="02"
            title="Quiz Assessment Platform"
            subtitle="MICROSERVICES-BASED PLATFORM"
            icon="Q"
            type="quiz"
            description="A microservices-based online assessment platform with quiz management, automatic scoring, result tracking, JWT authentication and role-based authorization."
            technologies={[
              "Java",
              "Spring Boot",
              "React.js",
              "PostgreSQL",
              "Eureka",
              "OpenFeign",
              "API Gateway",
            ]}
          />

          <ProjectCard
            number="03"
            title="Musify"
            subtitle="FULL-STACK MUSIC STREAMING"
            icon="♫"
            type="music"
            description="A full-stack music streaming application with admin and user panels, JWT authentication, playlists, albums, songs and RESTful APIs."
            technologies={[
              "Java",
              "Spring Boot",
              "Spring Security",
              "React.js",
              "MySQL",
              "REST APIs",
            ]}
          />

        </div>

      </section>
        {/* ================= EXPERIENCE ================= */}

       <section className="experience" id="experience">

         <div className="experience-background">
           <img
             src="/experience-mountain-road.png"
             alt=""
             className="experience-bg-image"
           />

           <div className="experience-overlay" />
         </div>

         <div className="experience-content">

           <div className="experience-heading">
             <p className="section-label">EXPERIENCE</p>

             <h2>
               The Journey
               <br />
               <span>So Far.</span>
             </h2>
           </div>

           <div className="experience-timeline">

             {/* EXPERIENCE */}

             <div className="timeline-block">

               <div className="timeline-title">
                 Experience
               </div>

               <div className="timeline-item">

                 <div className="timeline-icon">
                   💼
                 </div>

                 <div className="timeline-details">
                   <h3>Java Programming Intern</h3>

                   <p>
                     IndusAi Solutions
                   </p>
                 </div>

               </div>

             </div>

             {/* CERTIFICATIONS */}

             <div className="timeline-block">

               <div className="timeline-title">
                 Certifications
               </div>

               <div className="timeline-item">

                 <div className="timeline-icon">
                   🎓
                 </div>

                 <div className="timeline-details">
                   <h3>Java & Spring Boot Certification</h3>
                   <p>Udemy</p>
                 </div>

               </div>

               <div className="timeline-item">

                 <div className="timeline-icon">
                   🎓
                 </div>

                 <div className="timeline-details">
                   <h3>Data Structures & Algorithms Certification</h3>
                   <p>Apna College</p>
                 </div>

               </div>

               <div className="timeline-item">

                 <div className="timeline-icon">
                   🎓
                 </div>

                 <div className="timeline-details">
                   <h3>Java Programming Intern</h3>
                   <p>IndusAi Solutions</p>
                 </div>

               </div>

             </div>

           </div>

         </div>

       </section>
     <section className="education" ref={educationRef}>

         <div className="education-heading">
           <p className="section-label">EDUCATION</p>

           <h2>
             The Road
             <br />
             <span>Behind Me.</span>
           </h2>

           <p className="education-intro">
             A journey built through learning, consistency and continuous growth.
           </p>
         </div>

         <div className="education-journey">

           <div className="education-line" />

           <article className="education-card">
             <div className="education-year">2023 — 2027</div>

             <div className="education-dot">01</div>

             <div className="education-content">
               <p className="education-type">B.TECH</p>

               <h3>Computer Science & Engineering</h3>

               <p>Mahakal Institute of Technology, Ujjain</p>

               <span>Currently Pursuing</span>
             </div>
           </article>

           <article className="education-card">
             <div className="education-year">2023</div>

             <div className="education-dot">02</div>

             <div className="education-content">
               <p className="education-type">CLASS XII</p>

               <h3>Higher Secondary Education</h3>

               <p>85%</p>
             </div>
           </article>

           <article className="education-card">
             <div className="education-year">2021</div>

             <div className="education-dot">03</div>

             <div className="education-content">
               <p className="education-type">CLASS X</p>

               <h3>Secondary Education</h3>

               <p>91%</p>
             </div>
           </article>

         </div>

       </section>

<section className="contact"id="contact" ref={contactRef}>

    <div className="contact-background">
      <div className="contact-glow contact-glow-one" />
      <div className="contact-glow contact-glow-two" />
      <div className="contact-particles">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
         <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                 <span />
                     <span />
                                 <span />
                                 <span />
                                 <span />
                                 <span />
                                 <span />
                                 <span />
                                 <span />
                                  <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                        <span />
                             <span />
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                         <span />
                                                <span />
                                                <span />
                                                <span />
                                                <span />
                                                <span />
                                                <span />
                                                <span />
                                                <span />
                                                     <span />
                                                      <span />
                                                    <span />
                                                   <span />
                                                          <span />
                                                            <span />
                                            <span />
                                                <span />

      </div>
    </div>

    <div className="contact-content">

      <div className="contact-heading">
        <p className="section-label">GET IN TOUCH</p>

        <h2>
          Let's Build
          <br />
          <span>Something Great</span>
          <br />
          Together.
        </h2>

        <p className="contact-intro">
          Have an idea, an opportunity, or simply want to connect?
          Let's create something meaningful together.
        </p>
      </div>

      <div className="contact-links">

        <a
          href="mailto:bagdawatkusum1@gmail.com"
          className="contact-card"
        >
         <div className="contact-card-icon">
           <svg viewBox="0 0 24 24" aria-hidden="true">
             <path d="M3 5h18v14H3V5zm2 2v.5l7 5 7-5V7l-7 5-7-5z" />
           </svg>
         </div>

          <div>
            <small>EMAIL</small>
            <strong>bagdawatkusum1@gmail.com</strong>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/kusumbagdawat-javafullstackdeveloper/"
          target="_blank"
          rel="noreferrer"
          className="contact-card"
        >
<div className="contact-card-icon">
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.5 8.5A1.5 1.5 0 1 0 6.5 5a1.5 1.5 0 0 0 0 3.5zM5 10h3v9H5v-9zm5 0h2.9v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 4.56V19h-3v-4.23c0-1.01-.02-2.31-1.41-2.31-1.41 0-1.62 1.1-1.62 2.24V19h-3v-9z" />
  </svg>
</div>

          <div>
            <small>LINKEDIN</small>
            <strong>Let's connect professionally</strong>
          </div>
        </a>

        <a
          href="https://github.com/kusumbagdawat"
          target="_blank"
          rel="noreferrer"
          className="contact-card"
        >
          <div className="contact-card-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 .7A11.3 11.3 0 0 0 8.43 22.8c.57.1.78-.25.78-.55v-2.15c-3.18.69-3.85-1.34-3.85-1.34-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.34.96.1-.74.4-1.25.73-1.54-2.54-.29-5.21-1.27-5.21-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.03 0 0 .96-.31 3.13 1.17a10.8 10.8 0 0 1 5.7 0c2.17-1.48 3.13-1.17 3.13-1.17.62 1.57.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.39-2.68 5.35-5.23 5.64.41.36.78 1.07.78 2.16v3.2c0 .3.21.65.79.54A11.3 11.3 0 0 0 12 .7z" />
            </svg>
          </div>

          <div>
            <small>GITHUB</small>
            <strong>Explore my projects</strong>
          </div>
        </a>

      </div>

    </div>

    <div className="contact-footer">
      <span>KUSUM BAGDAWAT</span>
      <span>JAVA FULL STACK DEVELOPER</span>
      <span>© 2027</span>
    </div>

  </section>

    </main>

  );
}