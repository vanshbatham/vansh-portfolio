import React, { useRef, useState } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Github,
  Linkedin,
  Mail,
  Terminal,
  Database,
  Server,
  Lock,
  Code2,
  ChevronRight,
  Download,
  Menu,
  X,
  Briefcase,
} from "lucide-react";

import portfolioImg from "./assets/portfolio.jpg";

/* ---------------- utils ---------------- */

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const scrollToId = (id) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

/* ---------------- animations ---------------- */

const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

/* ---------------- UI components ---------------- */

const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all h-10 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900";

  const variants = {
    default:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40",
    outline: "border border-slate-700 text-slate-200 hover:bg-slate-800",
    ghost: "hover:bg-slate-800 text-slate-300",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ children }) => (
  <span className="px-2.5 py-0.5 text-xs rounded-full border border-slate-700 bg-slate-900/60 text-slate-300">
    {children}
  </span>
);

const Card = ({ children, className }) => (
  <div
    className={cn(
      "rounded-lg border border-slate-800 bg-slate-950/60 p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10",
      className,
    )}
  >
    {children}
  </div>
);

/* ---------------- Navbar ---------------- */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["about", "skills", "projects", "contact"];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    // Added a small timeout to allow the menu to close smoothly without cancelling the scroll event on mobile
    setTimeout(() => {
      scrollToId(id);
    }, 100);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">
        <div
          className="flex items-center gap-2 text-indigo-400 font-mono font-bold z-50 cursor-pointer"
          onClick={() => scrollToId("about")}
        >
          <Terminal size={20} />
          <span>Vansh.java</span>
        </div>

        <div className="hidden md:flex gap-6 text-sm text-slate-400">
          {navLinks.map((item) => (
            <button
              key={item}
              onClick={() => scrollToId(item)}
              className="hover:text-indigo-400 transition capitalize"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="hidden md:flex gap-2">
          <a
            href="https://github.com/vanshbatham"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Github size={18} />
            </Button>
          </a>
          <a
            href="https://linkedin.com/in/vanshbatham"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Linkedin size={18} />
            </Button>
          </a>
          <a href="/Vansh-Batham-Java-Backend-Resume.pdf" download>
            <Button variant="ghost" className="gap-1">
              <Download size={16} />
              Resume
            </Button>
          </a>
        </div>

        <button
          className="md:hidden text-slate-300 z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 w-full bg-slate-950 border-b border-slate-800 shadow-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleLinkClick(item)}
                  className="text-left text-slate-300 hover:text-indigo-400 py-2 capitalize font-medium text-lg border-b border-slate-900 last:border-0 cursor-pointer"
                >
                  {item}
                </button>
              ))}
              <div className="flex gap-4 mt-4 justify-center">
                <a
                  href="https://github.com/vanshbatham"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github
                    className="text-slate-400 hover:text-white"
                    size={24}
                  />
                </a>
                <a
                  href="https://linkedin.com/in/vanshbatham"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin
                    className="text-slate-400 hover:text-white"
                    size={24}
                  />
                </a>
              </div>
              <a
                href="/Vansh-Batham-Java-Backend-Resume.pdf"
                download
                className="w-full mt-2"
              >
                <Button variant="outline" className="w-full gap-2 py-6">
                  <Download size={18} /> Download Resume
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ---------------- Hero ---------------- */

const Hero = () => (
  <section
    id="about"
    className="pt-32 md:pt-40 pb-20 min-h-screen relative overflow-hidden flex items-center"
  >
    <motion.div
      className="absolute -top-40 -left-40 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"
      animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    />

    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative">
      <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Available for Hire
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-mono font-bold leading-tight tracking-tight">
            Java
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient-x">
              Backend Developer
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-base md:text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            I work with Spring Boot to build REST APIs, handle authentication,
            and connect applications with databases. Most of my learning comes
            from building real projects, fixing bugs, and improving how backend
            systems behave in real scenarios.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Button
              onClick={() => scrollToId("projects")}
              className="h-12 px-8 text-base"
            >
              <Code2 size={18} className="mr-2" /> View Projects
            </Button>
            <a href="/Vansh-Batham-Java-Backend-Resume.pdf" download>
              <Button
                variant="outline"
                className="gap-2 w-full sm:w-auto h-12 px-8 text-base"
              >
                <Download size={18} /> Download Resume
              </Button>
            </a>
          </div>
        </Reveal>
      </div>

      <div className="flex justify-center order-1 lg:order-2">
        <Reveal delay={0.4}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
            <img
              src={portfolioImg}
              alt="Vansh Batham"
              className="relative w-56 h-56 md:w-80 md:h-80 rounded-full object-cover border-2 border-slate-800 shadow-2xl"
            />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Skills ---------------- */

const Skills = () => (
  <section id="skills" className="py-24 bg-slate-950 relative">
    <div className="container mx-auto px-6">
      <Reveal>
        <h2 className="text-3xl font-bold mb-12 text-center md:text-left">
          <span className="text-indigo-500">#</span> Tech Stack
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Reveal delay={0.1}>
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded text-indigo-400">
                <Code2 size={24} />
              </div>
              <span className="font-bold text-lg">Languages</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Java</Badge>
              <Badge>SQL</Badge>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.2}>
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded text-indigo-400">
                <Server size={24} />
              </div>
              <span className="font-bold text-lg">Frameworks</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Spring Boot</Badge>
              <Badge>Hibernate/JPA</Badge>
              <Badge>Spring MVC</Badge>
              <Badge>Spring Data JPA</Badge>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.3}>
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded text-indigo-400">
                <Database size={24} />
              </div>
              <span className="font-bold text-lg">Databases</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>MySQL</Badge>
              <Badge>Redis</Badge>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.4}>
          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded text-indigo-400">
                <Lock size={24} />
              </div>
              <span className="font-bold text-lg">Security</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Spring Security</Badge>
              <Badge>OAuth2</Badge>
              <Badge>JWT</Badge>
            </div>
          </Card>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Projects ---------------- */

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform",
      type: "Backend System",
      description:
        "Production-ready E-Commerce backend built with Spring Boot, supporting scalable product management, orders, and secure role-based access.",
      tech: [
        "Java",
        "Spring Boot",
        "Spring MVC",
        "Spring Security",
        "JPA",
        "MySQL",
        "Swagger/OpenAPI",
      ],
      features: [
        "20+ REST APIs for users, products, categories, cart, orders, and payments",
        "Role-Based Access Control (Admin, Seller, Customer)",
        "Pagination & sorting for 1,000+ products",
        "Global exception handling & validation",
      ],
      links: { github: "https://github.com/vanshbatham/sb-ecommerce" },
    },
    {
      title: "Authentication Service",
      type: "Security & Identity",
      description:
        "Centralized authentication service implementing modern stateless security patterns with OAuth2 and JWT.",
      tech: [
        "Java",
        "Spring Boot",
        "Spring Security",
        "JWT",
        "OAuth2",
        "MySQL",
      ],
      features: [
        "Access & Refresh token authentication with rotation",
        "OAuth2 login with Google & GitHub",
        "RBAC for admin and user APIs",
        "HTTP-only cookies & password hashing",
      ],
      links: { github: "https://github.com/vanshbatham/auth-app" },
    },
    {
      title: "Task Management API",
      type: "REST API + Caching",
      description:
        "A scalable task management backend allowing users to manage tasks with pagination, filtering, Redis caching, and notification simulation.",
      tech: ["Java", "Spring Boot", "Spring Data JPA", "MySQL", "Redis"],
      features: [
        "One-to-Many User–Task relationship with enums for status & priority",
        "CRUD APIs for tasks with pagination, filtering, and sorting",
        "Redis Cache-Aside pattern for read-heavy task retrieval",
        "Cache invalidation on task update & delete operations",
        "NotificationService simulation",
      ],
      links: { github: "https://github.com/vanshbatham/task-manager-api" },
    },
  ];

  return (
    <section id="projects" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                <span className="text-indigo-500">#</span> Projects
              </h2>
              <p className="text-slate-400 max-w-xl">
                Here are some of the projects I've build. Each project focuses
                on a specific backend challenge, from security to caching.
              </p>
            </div>
            <a
              href="https://github.com/vanshbatham"
              target="_blank"
              rel="noreferrer"
              className="hidden md:block"
            >
              <Button variant="ghost" className="text-indigo-400 gap-2">
                View all on GitHub <ChevronRight size={16} />
              </Button>
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="h-full flex flex-col hover:border-indigo-500/30">
                <div className="mb-6 flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2 py-1 rounded">
                      {project.type}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-100 mt-3 group-hover:text-indigo-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.links.github}
                      className="text-slate-400 hover:text-white transition"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                <div className="space-y-2 border-t border-slate-800 pt-4 mt-auto">
                  {project.features.slice(0, 3).map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-500"
                    >
                      <ChevronRight
                        size={14}
                        className="mt-1 text-indigo-500 shrink-0"
                      />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="https://github.com/vanshbatham"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" className="text-indigo-400 gap-2">
              View all on GitHub <ChevronRight size={16} />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Contact ---------------- */
const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState("idle");

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs
      .sendForm(
        "service_portfolio",
        "template_93kkmmi",
        formRef.current,
        "5Y7k4v5_VCfXzXPto",
      )
      .then(
        (result) => {
          setStatus("success");
          e.target.reset();
        },
        (error) => {
          setStatus("error");
          console.error(error.text);
        },
      );
  };

  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-b from-slate-900/50 to-slate-950 border-t border-slate-900"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-indigo-500">#</span> Get In Touch
            </h2>
            <p className="text-slate-400">
              Have a question or want to work together? Drop me a message!
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side: Contact Info */}
          <Reveal delay={0.1}>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-slate-900 rounded-full text-indigo-400">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium">Email Me</h4>
                  <p className="text-slate-400 text-sm">
                    vanshbatham.pro@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-4 bg-slate-900 rounded-full text-indigo-400">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="text-slate-200 font-medium">Availability</h4>
                  <p className="text-slate-400 text-sm">
                    Open for opportunities
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <h4 className="text-slate-200 font-medium mb-4">
                  Connect on Socials
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/vanshbatham"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-600 transition-all"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/vanshbatham"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-indigo-600 transition-all"
                  >
                    <Linkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Side: Form */}
          <Reveal delay={0.2}>
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="space-y-4 bg-slate-900/50 p-6 rounded-xl border border-slate-800"
            >
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">
                  Name
                </label>
                <input
                  name="name"
                  required
                  className="w-full p-3 rounded bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-slate-200 transition"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full p-3 rounded bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-slate-200 transition"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className="w-full p-3 rounded bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none text-slate-200 transition resize-none"
                  placeholder="Hi, I'd like to discuss a project..."
                />
              </div>

              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  "Sending..."
                ) : status === "success" ? (
                  "Message Sent!"
                ) : status === "error" ? (
                  "Error. Try again."
                ) : (
                  <>
                    <Mail size={18} className="mr-2" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ---------------- App ---------------- */

export default function App() {
  return (
    <div className="bg-slate-950 text-slate-200 min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
