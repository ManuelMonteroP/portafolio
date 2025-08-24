"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Linkedin, ExternalLink, X, ChevronDown, ChevronUp } from "lucide-react"
import { useLanguage } from "./contexts/language-context"
import { LanguageSwitcher } from "./components/language-switcher"

export default function Component() {
  const { t } = useLanguage()

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
      title: t("projects.flows.title"),
      description: t("projects.flows.description"),
      longDescription: t("projects.flows.longDescription"),
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
      title: t("projects.metrics.title"),
      description: t("projects.metrics.description"),
      longDescription: t("projects.metrics.longDescription"),
      images: ["/images/metrics-home.png", "/images/metrics-maps.png"],
      technologies: ["Vue 3", "ECharts", "Chart.js", "Pinia", "FontAwesome"],
      liveUrl: "#",
      githubUrl: "#",
    },
    "sales-chats": {
      title: t("projects.chats.title"),
      description: t("projects.chats.description"),
      longDescription: t("projects.chats.longDescription"),
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
                <h3 className="text-lg font-semibold text-slate-200 mb-3">{t("projects.aboutProject")}</h3>
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
                      {t("projects.showLess")}
                      <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      {t("projects.readMore")}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-200 mb-3">{t("projects.technologiesUsed")}</h3>
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
              <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">{t("header.name")}</h1>
              <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">{t("header.title")}</h2>
              <p className="mt-4 max-w-xs leading-normal text-slate-400">{t("header.description")}</p>

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
                        {t("nav.about")}
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
                        {t("nav.experience")}
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
                        {t("nav.projects")}
                      </span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Social Links and Language Switcher */}
            <div className="flex flex-col space-y-4">
              <LanguageSwitcher />
              <ul className="ml-1 flex items-center" aria-label="Social media">
                <li className="mr-5 text-xs shrink-0">
                  <Link
                    href="https://www.linkedin.com/in/manuel-montero-palencia/"
                    className="block hover:text-slate-200 transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </Link>
                </li>
              </ul>
            </div>
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
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  {t("about.title")}
                </h2>
              </div>
              <div className="text-slate-400">
                <p className="mb-4">{t("about.paragraph1")}</p>
                <p className="mb-4">{t("about.paragraph2")}</p>
                <p>{t("about.paragraph3")}</p>
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
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  {t("experience.title")}
                </h2>
              </div>
              <div>
                <ol className="group/list">
                  <li className="mb-12">
                    <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                      <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                        {t("experience.positions.keybe.period")}
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
                                {t("experience.positions.keybe.title")} ·
                                <span className="inline-block">
                                  {t("experience.positions.keybe.company")}
                                  <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                </span>
                              </span>
                            </Link>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">{t("experience.positions.keybe.description")}</p>
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
                        {t("experience.positions.amaris.period")}
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
                                {t("experience.positions.amaris.title")} ·
                                <span className="inline-block">
                                  {t("experience.positions.amaris.company")}
                                  <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                </span>
                              </span>
                            </Link>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">{t("experience.positions.amaris.description")}</p>
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
                        {t("experience.positions.linktic.period")}
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
                                {t("experience.positions.linktic.title")} ·
                                <span className="inline-block">
                                  {t("experience.positions.linktic.company")}
                                  <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                </span>
                              </span>
                            </Link>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">{t("experience.positions.linktic.description")}</p>
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
                        {t("experience.positions.tecnoglass.period")}
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
                                {t("experience.positions.tecnoglass.title")} ·
                                <span className="inline-block">
                                  {t("experience.positions.tecnoglass.company")}
                                  <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                </span>
                              </span>
                            </Link>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">
                          {t("experience.positions.tecnoglass.description")}
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
                        {t("experience.positions.emdiem.period")}
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
                                {t("experience.positions.emdiem.title")} ·
                                <span className="inline-block">
                                  {t("experience.positions.emdiem.company")}
                                  <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                                </span>
                              </span>
                            </Link>
                          </div>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">{t("experience.positions.emdiem.description")}</p>
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
                        {t("experience.viewResume")}
                      </span>
                      <ExternalLink className="ml-1 inline-block h-4 w-4 shrink-0 -translate-y-px transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
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
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
                  {t("projects.title")}
                </h2>
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
                              {t("projects.flows.title")}
                              <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                            </span>
                          </button>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">{t("projects.flows.description")}</p>
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
                              {t("projects.metrics.title")}
                              <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                            </span>
                          </button>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">{t("projects.metrics.description")}</p>
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
                              {t("projects.chats.title")}
                              <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                            </span>
                          </button>
                        </h3>
                        <p className="mt-2 text-sm leading-normal">{t("projects.chats.description")}</p>
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
