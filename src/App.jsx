import React, { useRef, useState, useEffect } from "react";
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
  Sun,
  Moon,
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
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2";

  const variants = {
    // Light: Black bg, White text | Dark: White bg, Black text
    default:
      "bg-zinc-900 text-white hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 shadow-sm",
    // Outline: Adapts to borders
    outline:
      "border border-zinc-200 bg-transparent shadow-sm hover:bg-zinc-100 text-zinc-900 dark:border-zinc-800 dark:bg-black dark:hover:bg-zinc-900 dark:text-zinc-100",
    // Ghost: Subtle hover
    ghost:
      "hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-white",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

const Badge = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-300">
    {children}
  </span>
);

const Card = ({ children, className }) => (
  <div
    className={cn(
      "rounded-xl border shadow-sm px-6 py-6 transition-all bg-white border-zinc-200 text-zinc-950 hover:border-zinc-300 dark:bg-zinc-950/50 dark:border-zinc-800 dark:text-zinc-100 dark:hover:border-zinc-700",
      className,
    )}
  >
    {children}
  </div>
);

/* ---------------- Navbar ---------------- */

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = ["about", "skills", "projects", "contact"];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    setTimeout(() => {
      scrollToId(id);
    }, 100);
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b bg-white/80 border-zinc-200 dark:bg-black/80 dark:border-zinc-800 transition-colors duration-300">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center relative">
        <div
          className="flex items-center gap-2 font-bold text-xl z-50 cursor-pointer text-zinc-900 dark:text-white"
          onClick={() => scrollToId("about")}
        >
          <Terminal
            size={20}
            className="text-indigo-600 dark:text-indigo-500"
          />
          <span>Vansh.java</span>
        </div>

        {/* Centered Desktop Menu */}
        <div className="hidden md:flex gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((item) => (
            <button
              key={item}
              onClick={() => scrollToId(item)}
              className="px-4 py-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors capitalize"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="hidden md:flex gap-2 items-center">
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-10 px-0"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <a
            href="https://github.com/vanshbatham"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon" className="w-10 px-0">
              <Github size={18} className="text-zinc-700 dark:text-white" />
            </Button>
          </a>
          <a
            href="https://linkedin.com/in/vanshbatham"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="ghost" size="icon" className="w-10 px-0">
              <Linkedin
                size={18}
                className="text-blue-600 dark:text-blue-500"
              />
            </Button>
          </a>
          <a href="/Vansh-Batham-Java-Backend-Resume.pdf" download>
            <Button variant="ghost" className="gap-2">
              <Download
                size={16}
                className="text-emerald-600 dark:text-emerald-500"
              />
              <span className="hidden lg:inline">Resume</span>
            </Button>
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-10 px-0"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <button
            className="text-zinc-500 dark:text-zinc-300 z-50 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-0 w-full shadow-2xl overflow-hidden bg-white border-b border-zinc-200 dark:bg-black dark:border-zinc-800"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleLinkClick(item)}
                  className="text-left py-2 capitalize font-medium text-lg border-b last:border-0 cursor-pointer text-zinc-600 border-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:border-zinc-900 dark:hover:text-white"
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
                  <Github className="text-zinc-700 dark:text-white" size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/vanshbatham"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin
                    className="text-blue-600 dark:text-blue-500"
                    size={24}
                  />
                </a>
              </div>
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
    className="pt-32 md:pt-40 pb-20 min-h-screen relative overflow-hidden flex items-center bg-white dark:bg-black transition-colors duration-300"
  >
    {/* Background Glow */}
    <motion.div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none bg-indigo-500/5 dark:bg-indigo-500/10"
      animate={{ opacity: [0.5, 0.3, 0.5] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />

    <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative">
      <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Hire
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-zinc-900 dark:text-white">
            Java
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-500 dark:via-purple-500 dark:to-cyan-500">
              Backend Developer
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed text-zinc-600 dark:text-zinc-400">
            I develop backend applications with Spring Boot, focusing on REST
            APIs, authentication, and database integration.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              onClick={() => scrollToId("projects")}
              className="h-11 px-8 text-base"
            >
              <Code2
                size={18}
                className="mr-2 text-indigo-400 dark:text-indigo-500"
              />{" "}
              View Projects
            </Button>
            <a href="/Vansh-Batham-Java-Backend-Resume.pdf" download>
              <Button
                variant="outline"
                className="gap-2 w-full sm:w-auto h-11 px-8 text-base"
              >
                <Download
                  size={18}
                  className="text-emerald-600 dark:text-emerald-500"
                />{" "}
                Download Resume
              </Button>
            </a>
          </div>
        </Reveal>
      </div>

      <div className="flex justify-center order-1 lg:order-2">
        <Reveal delay={0.4}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <img
              src={portfolioImg}
              alt="Vansh Batham"
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* ---------------- Skills ---------------- */

const Skills = () => (
  <section
    id="skills"
    className="py-24 bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300"
  >
    <div className="container mx-auto px-6">
      <Reveal>
        <h2 className="text-3xl font-bold mb-12 text-center md:text-left text-zinc-900 dark:text-white">
          <span className="text-indigo-600 dark:text-indigo-500 mr-2">/</span>
          Tech Stack
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Reveal delay={0.1}>
          <Card className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md border bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                <Code2
                  size={20}
                  className="text-orange-600 dark:text-orange-500"
                />
              </div>
              <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                Languages
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Java</Badge>
              <Badge>SQL</Badge>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.2}>
          <Card className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md border bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                <Server
                  size={20}
                  className="text-emerald-600 dark:text-emerald-500"
                />
              </div>
              <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                Frameworks
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>Spring Boot</Badge>
              <Badge>Hibernate/JPA</Badge>
              <Badge>Spring MVC</Badge>
              <Badge>Spring Data</Badge>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.3}>
          <Card className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md border bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                <Database
                  size={20}
                  className="text-blue-600 dark:text-blue-500"
                />
              </div>
              <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                Databases
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge>MySQL</Badge>
              <Badge>Redis</Badge>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.4}>
          <Card className="hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-md border bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                <Lock size={20} className="text-rose-600 dark:text-rose-500" />
              </div>
              <span className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                Security
              </span>
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
        "Spring Security",
        "JPA",
        "MySQL",
        "Swagger",
      ],
      features: [
        "20+ REST APIs for users, products, cart, & orders",
        "Role-Based Access Control (Admin, Seller, Customer)",
        "Pagination & sorting for 1,000+ products",
      ],
      links: { github: "https://github.com/vanshbatham/sb-ecommerce" },
    },
    {
      title: "Authentication Service",
      type: "Security & Identity",
      description:
        "Centralized authentication service implementing modern stateless security patterns with OAuth2 and JWT.",
      tech: ["Java", "Spring Boot", "Security", "JWT", "OAuth2", "MySQL"],
      features: [
        "Access & Refresh token auth with rotation",
        "OAuth2 login with Google & GitHub",
        "HTTP-only cookies & password hashing",
      ],
      links: { github: "https://github.com/vanshbatham/auth-app" },
    },
    {
      title: "Task Management API",
      type: "REST API + Caching",
      description:
        "A scalable task management backend allowing users to manage tasks with pagination, filtering, Redis caching, and notification simulation.",
      tech: ["Java", "Spring Boot", "JPA", "MySQL", "Redis"],
      features: [
        "CRUD APIs with pagination & filtering",
        "Redis Cache-Aside for read-heavy retrieval",
        "NotificationService simulation",
      ],
      links: { github: "https://github.com/vanshbatham/task-manager-api" },
    },
  ];

  return (
    <section
      id="projects"
      className="py-24 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">
                <span className="text-indigo-600 dark:text-indigo-500 mr-2">
                  /
                </span>
                Projects
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xl">
                Real-world backend challenges. From security architecture to
                database optimization and caching strategies.
              </p>
            </div>
            <a
              href="https://github.com/vanshbatham"
              target="_blank"
              rel="noreferrer"
              className="hidden md:block"
            >
              <Button variant="ghost" className="gap-2">
                View all on GitHub <ChevronRight size={16} />
              </Button>
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <Card className="h-full flex flex-col group hover:border-zinc-400 dark:hover:border-zinc-700">
                <div className="mb-6 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest border px-2 py-1 rounded border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                      {project.type}
                    </span>
                    <h3 className="text-2xl font-bold mt-4 transition-colors text-zinc-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                      {project.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.links.github}
                      className="transition text-zinc-500 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-6 flex-grow text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>

                <div className="space-y-2 border-t pt-4 mt-auto border-zinc-100 dark:border-zinc-900">
                  {project.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-500"
                    >
                      <ChevronRight
                        size={14}
                        className="mt-1 shrink-0 text-indigo-600 dark:text-indigo-500"
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
            <Button variant="ghost" className="gap-2">
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
      className="py-24 bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">
              <span className="text-indigo-600 dark:text-indigo-500 mr-2">
                /
              </span>
              Get In Touch
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Have a question or want to work together? Drop me a message!
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side: Contact Info */}
          <Reveal delay={0.1}>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-md border bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                  <Mail
                    size={20}
                    className="text-purple-600 dark:text-purple-500"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-200">
                    Email Me
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-500">
                    vanshbatham.pro@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-md border bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
                  <Briefcase
                    size={20}
                    className="text-emerald-600 dark:text-emerald-500"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-zinc-900 dark:text-zinc-200">
                    Availability
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-500">
                    Open for opportunities
                  </p>
                </div>
              </div>

              <div className="pt-8">
                <h4 className="font-medium mb-4 text-zinc-900 dark:text-zinc-200">
                  Connect on Socials
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/vanshbatham"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-md border transition-all bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href="https://linkedin.com/in/vanshbatham"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 rounded-md border transition-all bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
                  >
                    <Linkedin
                      size={20}
                      className="text-blue-600 dark:text-blue-500"
                    />
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
              className="space-y-4 p-6 rounded-xl border bg-white border-zinc-200 dark:bg-zinc-900/30 dark:border-zinc-800"
            >
              <div>
                <label className="block text-xs font-medium mb-1 uppercase tracking-wider text-zinc-500">
                  Name
                </label>
                <input
                  name="name"
                  required
                  className="w-full p-3 rounded-md border focus:ring-0 focus:outline-none transition bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400 dark:bg-black dark:border-zinc-800 dark:text-zinc-200 dark:focus:border-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 uppercase tracking-wider text-zinc-500">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full p-3 rounded-md border focus:ring-0 focus:outline-none transition bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400 dark:bg-black dark:border-zinc-800 dark:text-zinc-200 dark:focus:border-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 uppercase tracking-wider text-zinc-500">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className="w-full p-3 rounded-md border focus:ring-0 focus:outline-none transition resize-none bg-zinc-50 border-zinc-200 text-zinc-900 focus:border-zinc-400 dark:bg-black dark:border-zinc-800 dark:text-zinc-200 dark:focus:border-white placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                  placeholder="Hi, I'd like to discuss a project..."
                />
              </div>

              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full h-11 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  "Sending..."
                ) : status === "success" ? (
                  "Message Sent!"
                ) : status === "error" ? (
                  "Error. Try again."
                ) : (
                  <>
                    <Mail size={16} className="mr-2" /> Send Message
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
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      // Default to dark if no preference
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    // Only 'dark' class on html/body triggers the dark variants
    <div className="font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-600 dark:selection:text-indigo-200">
      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
