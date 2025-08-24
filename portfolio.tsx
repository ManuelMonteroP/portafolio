"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Linkedin, ExternalLink, X, ChevronDown, ChevronUp } from "lucide-react"

export default function Component() {
  // State to track active section
  const [activeSection, setActiveSection] = useState("about")

  // State for cursor effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  // State for project modal
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [showFullDescription, setShowFullDescription] = useState(false)

  // Refs for sections and container
  const containerRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)

  // Handle mouse movement for cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // Handle scroll-based section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "about", ref: aboutRef },
        { id: "experience", ref: experienceRef },
        { id: "projects", ref: projectsRef },
      ]

      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle section change with smooth scroll
  const handleSectionChange = (section: string) => {
    setActiveSection(section)

    const refs = {
      about: aboutRef,
      experience: experienceRef,
      projects: projectsRef,
    }

    const targetRef = refs[section as keyof typeof refs]
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Reset description state when modal closes
  useEffect(() => {
    if (!selectedProject) {
      setShowFullDescription(false)
    }
  }, [selectedProject])

  // Project data
  const projects = {
    "flows-automation": {
      title: "Flows Automation App",
      description:
        "A powerful and intuitive platform that enables seamless integration with leading CRM and e-commerce tools like Shopify, HubSpot, RD Station, and VTEX. Designed to automate communications via SMS and email, handle high-traffic environments, and adapt to complex business logic with ease.",
      longDescription:
        "A robust and scalable platform designed to simplify integrations and automation for high-growth businesses. With native support for Shopify, HubSpot, RD Station (Marketing & CRM), VTEX, and Sale U, it empowers teams to connect their tools effortlessly and create powerful, automated workflows without technical barriers.        Built for performance, the platform supports high-traffic environments, real-time data synchronization, and dynamic handling of custom JSON structures and HTTP requests. Users can easily automate personalized SMS and email campaigns, synchronize contacts and product data, and streamline operations—all through an intuitive and user-friendly interface.",
      images: ["/images/flows-home.png", "/images/flows-example.png"],
      technologies: [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Jotai",
        "MobX",
        "React Flow",
        "Lottie",
        "ESLint",
        "Prettier",
      ],
      liveUrl: "#",
      githubUrl: "#",
    },
    "chats-metrics": {
      title: "Chats Metrics Dashboard",
      description:
        "A real-time dashboard for visualizing marketing campaign metrics and chat consumption by sales teams, powered by customizable JSON configurations that allow non-developers to manage and adapt data visualizations effortlessly.",
      longDescription:
        "An interactive analytics dashboard built to track and visualize marketing campaign performance and chat usage across sales teams in real time. The platform enables businesses to monitor the effectiveness of their advertising efforts, understand conversion behavior, and measure advisor interaction performance at a granular level. What sets this system apart is its admin-friendly configuration model: all visualizations are dynamically generated from a structured JSON schema, allowing non-technical users to define parameters like time ranges, funnel stages, metrics to display, and comparison groups—without touching code. Key capabilities include: Full-funnel campaign tracking (from prospecting to closed deals), Real-time chat activity analysis (delays, transfers, automation vs. agents), High-concurrency performance with fast-rendering UI, Custom HTTP data ingestion and dynamic JSON-based chart definitions, Filters by advisor, brand, or period, fully configurable by operations teams. Ideal for fast-paced marketing and sales environments, this dashboard empowers cross-functional teams to make data-driven decisions with ease and autonomy.",
      images: ["/images/metrics-home.png", "/images/metrics-maps.png"],
      technologies: ["Vue 3", "ECharts", "Chart.js", "Pinia", "FontAwesome"],
      liveUrl: "#",
      githubUrl: "#",
    },
    "sales-chats": {
      title: "Sales Chats App",
      description:
        "A smart sales chat platform powered by AI, designed to manage conversations, create sales opportunities, segment users, launch marketing campaigns, and enable team collaboration through internal chat rooms.",
      longDescription:
        "A powerful and intuitive AI-driven sales chat application built to centralize and optimize the commercial workflow of modern teams. The platform enables businesses to manage real-time conversations with leads and clients while integrating features that boost productivity and sales conversion. Users can: Engage in one-on-one sales chats enhanced with AI assistance, Create and track sales cards (opportunities) directly from the conversation, Segment users based on behavior, tags, or funnel stage, Launch targeted sales campaigns via chat, Create internal team rooms or group chats for coordinated sales strategies and client support. Designed for scalability and high interaction volumes, this system merges AI-powered automation with a clean, human-centered interface—making it ideal for teams looking to drive growth through smarter communication.",
      images: ["/images/chat-home.png", "/images/chat-form.png"],
      technologies: ["SwiftUI", "Lottie", "Kingfisher"],
      liveUrl: "#",
      githubUrl: "#",
    },
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-900 text-slate-300 relative overflow-hidden">
      {/* Cursor gradient effect */}
      {isHovering && (
        <div
          className="pointer-events-none absolute bg-gradient-to-r from-teal-500/20 via-purple-500/20 to-blue-500/20 blur-3xl rounded-full w-64 h-64 -translate-x-1/2 -translate-y-1/2 opacity-30 transition-opacity duration-300"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
          }}
        />
      )}

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-200">
                {projects[selectedProject as keyof typeof projects].title}
              </h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Project Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {projects[selectedProject as keyof typeof projects].images.map((image, index) => {
                  // Determine if this is a web dashboard (flows/metrics) or mobile app (chat)
                  const isWebDashboard = selectedProject === "flows-automation" || selectedProject === "chats-metrics"
                  const isMobileApp = selectedProject === "sales-chats"

                  return (
                    <div
                      key={index}
                      className={`bg-slate-700 rounded-lg border border-slate-600 overflow-hidden aspect-[4/3]`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${projects[selectedProject as keyof typeof projects].title} screenshot ${index + 1}`}
                        className="w-full h-full object-contain object-center"
                      />
                    </div>
                  )
                })}
              </div>

              {/* Project Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-3">About this project</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  {projects[selectedProject as keyof typeof projects].description}
                </p>

                {/* Show/Hide Full Description */}
                {showFullDescription && (
                  <p className="text-slate-400 leading-relaxed mb-4">
                    {projects[selectedProject as keyof typeof projects].longDescription}
                  </p>
                )}

                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="inline-flex items-center text-teal-300 hover:text-teal-200 transition-colors text-sm font-medium"
                >
                  {showFullDescription ? (
                    <>
                      Show less
                      <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Read more details
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedProject as keyof typeof projects].technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-teal-400/10 text-teal-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-0 lg:py-0 relative z-10">
        <div className="lg:block">
          {/* Left Column - Fixed Header */}
          <header className="lg:fixed lg:top-0 lg:left-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 lg:px-24">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">Manuel Montero</h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">Front End Engineer</h2>
              <p className="mt-4 max-w-xs leading-normal text-slate-400">
                I build accessible, pixel-perfect digital experiences across web and mobile platforms.
              </p>

              {/* Navigation */}
              <nav className="nav hidden lg:block" aria-label="In-page jump links">
                <ul className="mt-16 w-max">
                  <li>
                    <button
                      onClick={() => handleSectionChange("about")}
                      className={`group flex items-center py-3 ${activeSection === "about" ? "active" : ""}`}
                    >
                      <span
                        className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${
                          activeSection === "about" ? "w-16 bg-slate-200" : "w-8 bg-slate-600"
                        }`}
                      ></span>
                      <span
                        className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 ${
                          activeSection === "about" ? "text-slate-200" : "text-slate-500"
                        }`}
                      >
                        About
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSectionChange("experience")}
                      className={`group flex items-center py-3 ${activeSection === "experience" ? "active" : ""}`}
                    >
                      <span
                        className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${
                          activeSection === "experience" ? "w-16 bg-slate-200" : "w-8 bg-slate-600"
                        }`}
                      ></span>
                      <span
                        className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 ${
                          activeSection === "experience" ? "text-slate-200" : "text-slate-500"
                        }`}
                      >
                        Experience
                      </span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSectionChange("projects")}
                      className={`group flex items-center py-3 ${activeSection === "projects" ? "active" : ""}`}
                    >
                      <span
                        className={`nav-indicator mr-4 h-px transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none ${
                          activeSection === "projects" ? "w-16 bg-slate-200" : "w-8 bg-slate-600"
                        }`}
                      ></span>
                      <span
                        className={`nav-text text-xs font-bold uppercase tracking-widest group-hover:text-slate-200 group-focus-visible:text-slate-200 ${
                          activeSection === "projects" ? "text-slate-200" : "text-slate-500"
                        }`}
                      >
                        Projects
                      </span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Social Links */}
            <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
              <li className="mr-5 text-xs shrink-0">
                <Link
                  href="https://www.linkedin.com/in/manuel-montero-palencia/"
                  className="block hover:text-slate-200 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
              </li>
            </ul>
          </header>

          {/* Right Column - Main Content */}
          <main className="pt-24 lg:w-1/2 lg:py-24 lg:ml-auto">
            {/* About Section */}
            <section
              ref={aboutRef}
              id="about"
              className={`mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 transition-opacity duration-500 ${
                activeSection === "about" ? "opacity-100" : "opacity-60"
              }`}
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">About</h2>
              </div>
              <div className="text-slate-400">
                <p className="mb-4">
                  I'm a software developer passionate about building scalable and intuitive digital experiences across
                  web and mobile platforms. I enjoy bridging the gap between elegant design and solid engineering,
                  crafting products that are not only visually engaging but also optimized for performance and
                  maintainability.
                </p>
                <p className="mb-4">
                  Currently, I work independently on projects that span from high-impact mobile apps to complex web
                  systems, often collaborating with startups and established companies across Latin America. I
                  specialize in frontend architecture, cross-platform development with Flutter and SwiftUI, and building
                  structured, maintainable codebases using Clean Architecture, MVVM, and modern tooling.
                </p>
                <p>
                  Over the years, I've contributed to a wide variety of projects — from banking and electoral software
                  to e-commerce tools and customer communication platforms. I also have strong experience integrating
                  REST and GraphQL APIs, and handling real-time data in modern interfaces.
                </p>
              </div>
            </section>

            {/* Experience Section */}
            <section
              ref={experienceRef}
              id="experience"
              className={`mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 transition-opacity duration-500 ${
                activeSection === "experience" ? "opacity-100" : "opacity-60"
              }`}
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Experience</h2>
              </div>
              <div>
                <ol className="group/list">
                  <li className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        2024 — Present
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div>
                            <Link
                              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                              href="https://keybe.ai/"
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label="Senior Frontend Engineer (opens in a new tab)"
                            >
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>
                                Senior Frontend Engineer ·
                                <span className="inline-block">
                                  Keybe AI
                                  <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                </span>
                              </span>
                            </Link>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          Design, build, and maintain modern web applications using Vue and React, with a strong focus
                          on performance, scalability, and code maintainability. Lead migration efforts across
                          projects—whether upgrading frameworks or transitioning between languages—to ensure smooth,
                          stable evolutions. Develop and maintain native iOS applications using Swift and SwiftUI,
                          leveraging modern iOS architecture patterns. Support and improve cross-platform mobile apps
                          built in Flutter, ensuring consistent user experiences and seamless performance across
                          devices.
                        </p>
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              JavaScript
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              TypeScript
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              React
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Vue
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              SwiftUI
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        2022 — 2024
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div>
                            <Link
                              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                              href="https://amaris.com/"
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label="Lead Engineer at Upstatement (opens in a new tab)"
                            >
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>
                                Experienced Consultant ·
                                <span className="inline-block">
                                  Amaris Consulting
                                  <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                </span>
                              </span>
                            </Link>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          Develop and optimize web and mobile applications for high-impact clients such as Banco de
                          Chile, using React and React Native to deliver robust, scalable solutions. Build tailored web
                          applications for Sodexo using Vue, aligned with client requirements and modern development
                          standards. Participate in the selection and onboarding of new developers, mentoring them to
                          ensure alignment with team practices and project goals.
                        </p>
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              TypeScript
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              React
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Next
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Vue
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              React Native
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        2021 — 2022
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div>
                            <Link
                              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                              href="https://linktic.com/"
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label="Lead Engineer at Upstatement (opens in a new tab)"
                            >
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>
                                Senior Frontend ·
                                <span className="inline-block">
                                  Linktic
                                  <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                </span>
                              </span>
                            </Link>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          Developed and deployed web and mobile applications using Vue, React, and Nuxt.js for
                          large-scale public sector platforms, including electoral software for Colombia's Registraduría
                          Nacional and tourism-related systems. Applications were designed and optimized to handle high
                          user traffic, ensuring stability, performance, and responsive experiences across devices using
                          Capacitor.
                        </p>
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              JavaScript
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              React
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Vue
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              NuxtJs
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        2019 — 2021
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div>
                            <Link
                              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                              href="https://www.tecnoglass.com/"
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label="Lead Engineer at Upstatement (opens in a new tab)"
                            >
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>
                                Development Engineer ·
                                <span className="inline-block">
                                  Tecnoglass
                                  <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                </span>
                              </span>
                            </Link>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          Led the frontend development team for internal systems at Tecnoglass, an industrial
                          manufacturing company. Participated in requirements gathering, developer onboarding, and the
                          design and deployment of web applications focused on process optimization and workflow
                          digitalization.
                        </p>
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              JavaScript
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Vue
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Vuetify
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              SASS
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        2018 — 2019
                      </header>
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div>
                            <Link
                              className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                              href="https://dribbble.com/EmdiemLab"
                              target="_blank"
                              rel="noreferrer noopener"
                              aria-label="Lead Engineer at Upstatement (opens in a new tab)"
                            >
                              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                              <span>
                                Frontend Engineer ·
                                <span className="inline-block">
                                  Emdiem Lab
                                  <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                </span>
                              </span>
                            </Link>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          Started as a backend developer building RESTful APIs with Django REST Framework, later
                          transitioning to frontend development with Vue.js. Contributed to the development of
                          administrative dashboards and e-commerce platforms, with a focus on digital solutions for the
                          radio and transportation industries.
                        </p>
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              JavaScript
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Vue
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Vuetify
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ol>
                <div className="mt-12">
                  <Link
                    className="inline-flex items-center font-medium leading-tight text-slate-200 font-semibold text-slate-200 group"
                    aria-label="View Full Résumé"
                    href="#"
                  >
                    <span>
                      <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                        View Full
                      </span>
                      <span className="whitespace-nowrap">
                        <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                          Résumé
                        </span>
                        <ExternalLink className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section
              ref={projectsRef}
              id="projects"
              className={`mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 transition-opacity duration-500 ${
                activeSection === "projects" ? "opacity-100" : "opacity-60"
              }`}
            >
              <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Projects</h2>
              </div>
              <div>
                <ul className="group/list">
                  <li className="mb-12">
                    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <div className="z-10 sm:order-2 sm:col-span-6">
                        <h3>
                          <button
                            onClick={() => setSelectedProject("flows-automation")}
                            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base text-left"
                            aria-label="React Flows Automation App (opens project details)"
                          >
                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                            <span>
                              Flows Automation App
                              <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                            </span>
                          </button>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          A robust and scalable platform designed to simplify integrations and automation for
                          high-growth businesses. With native support for Shopify, HubSpot, RD Station, VTEX, it
                          empowers teams to connect their tools effortlessly and create powerful, automated workflows
                          without technical barriers.
                        </p>
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              React
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              TypeScript
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Jotai
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Tailwind CSS
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="aspect-[3/4] bg-slate-800 rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1 cursor-pointer overflow-hidden"
                        onClick={() => setSelectedProject("flows-automation")}
                      >
                        <img
                          alt="React Flows Automation App screenshot"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                          src="/images/flows-cover.png"
                        />
                      </div>
                    </div>
                  </li>
                  <li className="mb-12">
                    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <div className="z-10 sm:order-2 sm:col-span-6">
                        <h3>
                          <button
                            onClick={() => setSelectedProject("chats-metrics")}
                            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base text-left"
                            aria-label="Chats Metrics Dashboard (opens project details)"
                          >
                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                            <span>
                              Chats Metrics Dashboard
                              <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                            </span>
                          </button>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          A real-time dashboard for visualizing marketing campaign metrics and chat consumption by sales
                          teams, powered by customizable JSON configurations that allow non-developers to manage and
                          adapt data visualizations effortlessly.
                        </p>
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Vue 3
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              ECharts
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Chart.js
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Pinia
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="aspect-[3/4] bg-slate-800 rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1 cursor-pointer overflow-hidden"
                        onClick={() => setSelectedProject("chats-metrics")}
                      >
                        <img
                          alt="Chats Metrics Dashboard screenshot"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                          src="/images/metrics-cover.png"
                        />
                      </div>
                    </div>
                  </li>
                  <li className="mb-12">
                    <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <div className="z-10 sm:order-2 sm:col-span-6">
                        <h3>
                          <button
                            onClick={() => setSelectedProject("sales-chats")}
                            className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base text-left"
                            aria-label="Sales Chats App (opens project details)"
                          >
                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                            <span>
                              Sales Chats App
                              <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                            </span>
                          </button>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          A smart sales chat platform powered by AI, designed to manage conversations, create sales
                          opportunities, segment users, launch marketing campaigns, and enable team collaboration
                          through internal chat rooms.
                        </p>
                        <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              SwiftUI
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Lottie
                            </div>
                          </li>
                          <li className="mr-1.5 mt-2">
                            <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">
                              Kingfisher
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="aspect-[3/4] bg-slate-800 rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1 cursor-pointer overflow-hidden"
                        onClick={() => setSelectedProject("sales-chats")}
                      >
                        <img
                          alt="Sales Chats App screenshot"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                          src="/images/chat-cover.png"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
