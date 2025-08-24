"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>("en")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("portfolio-language", lang)
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

const translations = {
  en: {
    nav: {
      about: "About",
      experience: "Experience",
      projects: "Projects",
    },
    header: {
      name: "Manuel Montero",
      title: "Front End Engineer",
      description: "I build accessible, pixel-perfect digital experiences across web and mobile platforms.",
    },
    about: {
      title: "About",
      paragraph1:
        "I'm a software developer passionate about building scalable and intuitive digital experiences across web and mobile platforms. I enjoy bridging the gap between elegant design and solid engineering, crafting products that are not only visually engaging but also optimized for performance and maintainability.",
      paragraph2:
        "Currently, I work independently on projects that span from high-impact mobile apps to complex web systems, often collaborating with startups and established companies across Latin America. I specialize in frontend architecture, cross-platform development with Flutter and SwiftUI, and building structured, maintainable codebases using Clean Architecture, MVVM, and modern tooling.",
      paragraph3:
        "Over the years, I've contributed to a wide variety of projects — from banking and electoral software to e-commerce tools and customer communication platforms. I also have strong experience integrating REST and GraphQL APIs, and handling real-time data in modern interfaces.",
    },
    experience: {
      title: "Experience",
      viewResume: "View Full Résumé",
      present: "Present",
      positions: {
        keybe: {
          title: "Senior Frontend Engineer",
          company: "Keybe AI",
          period: "2024 — Present",
          description:
            "Design, build, and maintain modern web applications using Vue and React, with a strong focus on performance, scalability, and code maintainability. Lead migration efforts across projects—whether upgrading frameworks or transitioning between languages—to ensure smooth, stable evolutions. Develop and maintain native iOS applications using Swift and SwiftUI, leveraging modern iOS architecture patterns. Support and improve cross-platform mobile apps built in Flutter, ensuring consistent user experiences and seamless performance across devices.",
        },
        amaris: {
          title: "Experienced Consultant",
          company: "Amaris Consulting",
          period: "2022 — 2024",
          description:
            "Develop and optimize web and mobile applications for high-impact clients such as Banco de Chile, using React and React Native to deliver robust, scalable solutions. Build tailored web applications for Sodexo using Vue, aligned with client requirements and modern development standards. Participate in the selection and onboarding of new developers, mentoring them to ensure alignment with team practices and project goals.",
        },
        linktic: {
          title: "Senior Frontend",
          company: "Linktic",
          period: "2021 — 2022",
          description:
            "Developed and deployed web and mobile applications using Vue, React, and Nuxt.js for large-scale public sector platforms, including electoral software for Colombia's Registraduría Nacional and tourism-related systems. Applications were designed and optimized to handle high user traffic, ensuring stability, performance, and responsive experiences across devices using Capacitor.",
        },
        tecnoglass: {
          title: "Development Engineer",
          company: "Tecnoglass",
          period: "2019 — 2021",
          description:
            "Led the frontend development team for internal systems at Tecnoglass, an industrial manufacturing company. Participated in requirements gathering, developer onboarding, and the design and deployment of web applications focused on process optimization and workflow digitalization.",
        },
        emdiem: {
          title: "Frontend Engineer",
          company: "Emdiem Lab",
          period: "2018 — 2019",
          description:
            "Started as a backend developer building RESTful APIs with Django REST Framework, later transitioning to frontend development with Vue.js. Contributed to the development of administrative dashboards and e-commerce platforms, with a focus on digital solutions for the radio and transportation industries.",
        },
      },
    },
    projects: {
      title: "Projects",
      aboutProject: "About this project",
      technologiesUsed: "Technologies Used",
      readMore: "Read more details",
      showLess: "Show less",
      flows: {
        title: "Flows Automation App",
        description:
          "A powerful and intuitive platform that enables seamless integration with leading CRM and e-commerce tools like Shopify, HubSpot, RD Station, and VTEX. Designed to automate communications via SMS and email, handle high-traffic environments, and adapt to complex business logic with ease.",
        longDescription:
          "A robust and scalable platform designed to simplify integrations and automation for high-growth businesses. With native support for Shopify, HubSpot, RD Station (Marketing & CRM), VTEX, and Sale U, it empowers teams to connect their tools effortlessly and create powerful, automated workflows without technical barriers. Built for performance, the platform supports high-traffic environments, real-time data synchronization, and dynamic handling of custom JSON structures and HTTP requests. Users can easily automate personalized SMS and email campaigns, synchronize contacts and product data, and streamline operations—all through an intuitive and user-friendly interface.",
      },
      metrics: {
        title: "Chats Metrics Dashboard",
        description:
          "A real-time dashboard for visualizing marketing campaign metrics and chat consumption by sales teams, powered by customizable JSON configurations that allow non-developers to manage and adapt data visualizations effortlessly.",
        longDescription:
          "An interactive analytics dashboard built to track and visualize marketing campaign performance and chat usage across sales teams in real time. The platform enables businesses to monitor the effectiveness of their advertising efforts, understand conversion behavior, and measure advisor interaction performance at a granular level. What sets this system apart is its admin-friendly configuration model: all visualizations are dynamically generated from a structured JSON schema, allowing non-technical users to define parameters like time ranges, funnel stages, metrics to display, and comparison groups—without touching code. Key capabilities include: Full-funnel campaign tracking (from prospecting to closed deals), Real-time chat activity analysis (delays, transfers, automation vs. agents), High-concurrency performance with fast-rendering UI, Custom HTTP data ingestion and dynamic JSON-based chart definitions, Filters by advisor, brand, or period, fully configurable by operations teams. Ideal for fast-paced marketing and sales environments, this dashboard empowers cross-functional teams to make data-driven decisions with ease and autonomy.",
      },
      chats: {
        title: "Sales Chats App",
        description:
          "A smart sales chat platform powered by AI, designed to manage conversations, create sales opportunities, segment users, launch marketing campaigns, and enable team collaboration through internal chat rooms.",
        longDescription:
          "A powerful and intuitive AI-driven sales chat application built to centralize and optimize the commercial workflow of modern teams. The platform enables businesses to manage real-time conversations with leads and clients while integrating features that boost productivity and sales conversion. Users can: Engage in one-on-one sales chats enhanced with AI assistance, Create and track sales cards (opportunities) directly from the conversation, Segment users based on behavior, tags, or funnel stage, Launch targeted sales campaigns via chat, Create internal team rooms or group chats for coordinated sales strategies and client support. Designed for scalability and high interaction volumes, this system merges AI-powered automation with a clean, human-centered interface—making it ideal for teams looking to drive growth through smarter communication.",
      },
    },
  },
  es: {
    nav: {
      about: "Acerca de",
      experience: "Experiencia",
      projects: "Proyectos",
    },
    header: {
      name: "Manuel Montero",
      title: "Ingeniero Frontend",
      description: "Construyo experiencias digitales accesibles y pixel-perfect en plataformas web y móviles.",
    },
    about: {
      title: "Acerca de",
      paragraph1:
        "Soy un desarrollador de software apasionado por construir experiencias digitales escalables e intuitivas en plataformas web y móviles. Disfruto cerrar la brecha entre el diseño elegante y la ingeniería sólida, creando productos que no solo son visualmente atractivos sino también optimizados para el rendimiento y la mantenibilidad.",
      paragraph2:
        "Actualmente, trabajo de forma independiente en proyectos que van desde aplicaciones móviles de alto impacto hasta sistemas web complejos, colaborando frecuentemente con startups y empresas establecidas en América Latina. Me especializo en arquitectura frontend, desarrollo multiplataforma con Flutter y SwiftUI, y construcción de bases de código estructuradas y mantenibles usando Clean Architecture, MVVM y herramientas modernas.",
      paragraph3:
        "A lo largo de los años, he contribuido a una amplia variedad de proyectos — desde software bancario y electoral hasta herramientas de e-commerce y plataformas de comunicación con clientes. También tengo amplia experiencia integrando APIs REST y GraphQL, y manejando datos en tiempo real en interfaces modernas.",
    },
    experience: {
      title: "Experiencia",
      viewResume: "Ver Currículum Completo",
      present: "Presente",
      positions: {
        keybe: {
          title: "Ingeniero Frontend Senior",
          company: "Keybe AI",
          period: "2024 — Presente",
          description:
            "Diseño, construyo y mantengo aplicaciones web modernas usando Vue y React, con un fuerte enfoque en rendimiento, escalabilidad y mantenibilidad del código. Lidero esfuerzos de migración entre proyectos—ya sea actualizando frameworks o transicionando entre lenguajes—para asegurar evoluciones suaves y estables. Desarrollo y mantengo aplicaciones nativas de iOS usando Swift y SwiftUI, aprovechando patrones de arquitectura iOS modernos. Apoyo y mejoro aplicaciones móviles multiplataforma construidas en Flutter, asegurando experiencias de usuario consistentes y rendimiento fluido entre dispositivos.",
        },
        amaris: {
          title: "Consultor Experimentado",
          company: "Amaris Consulting",
          period: "2022 — 2024",
          description:
            "Desarrollo y optimizo aplicaciones web y móviles para clientes de alto impacto como Banco de Chile, usando React y React Native para entregar soluciones robustas y escalables. Construyo aplicaciones web personalizadas para Sodexo usando Vue, alineadas con los requerimientos del cliente y estándares de desarrollo modernos. Participo en la selección e incorporación de nuevos desarrolladores, mentoreándolos para asegurar alineación con las prácticas del equipo y objetivos del proyecto.",
        },
        linktic: {
          title: "Frontend Senior",
          company: "Linktic",
          period: "2021 — 2022",
          description:
            "Desarrollé e implementé aplicaciones web y móviles usando Vue, React y Nuxt.js para plataformas del sector público a gran escala, incluyendo software electoral para la Registraduría Nacional de Colombia y sistemas relacionados con turismo. Las aplicaciones fueron diseñadas y optimizadas para manejar alto tráfico de usuarios, asegurando estabilidad, rendimiento y experiencias responsivas entre dispositivos usando Capacitor.",
        },
        tecnoglass: {
          title: "Ingeniero de Desarrollo",
          company: "Tecnoglass",
          period: "2019 — 2021",
          description:
            "Lideré el equipo de desarrollo frontend para sistemas internos en Tecnoglass, una empresa de manufactura industrial. Participé en la recopilación de requerimientos, incorporación de desarrolladores, y el diseño e implementación de aplicaciones web enfocadas en optimización de procesos y digitalización de flujos de trabajo.",
        },
        emdiem: {
          title: "Ingeniero Frontend",
          company: "Emdiem Lab",
          period: "2018 — 2019",
          description:
            "Comencé como desarrollador backend construyendo APIs RESTful con Django REST Framework, luego transicioné al desarrollo frontend con Vue.js. Contribuí al desarrollo de dashboards administrativos y plataformas de e-commerce, con enfoque en soluciones digitales para las industrias de radio y transporte.",
        },
      },
    },
    projects: {
      title: "Proyectos",
      aboutProject: "Acerca de este proyecto",
      technologiesUsed: "Tecnologías Utilizadas",
      readMore: "Leer más detalles",
      showLess: "Mostrar menos",
      flows: {
        title: "App de Automatización de Flujos",
        description:
          "Una plataforma poderosa e intuitiva que permite integración perfecta con herramientas líderes de CRM y e-commerce como Shopify, HubSpot, RD Station y VTEX. Diseñada para automatizar comunicaciones vía SMS y email, manejar entornos de alto tráfico y adaptarse a lógica de negocio compleja con facilidad.",
        longDescription:
          "Una plataforma robusta y escalable diseñada para simplificar integraciones y automatización para negocios de alto crecimiento. Con soporte nativo para Shopify, HubSpot, RD Station (Marketing & CRM), VTEX y Sale U, empodera a los equipos para conectar sus herramientas sin esfuerzo y crear flujos de trabajo automatizados poderosos sin barreras técnicas. Construida para rendimiento, la plataforma soporta entornos de alto tráfico, sincronización de datos en tiempo real y manejo dinámico de estructuras JSON personalizadas y peticiones HTTP. Los usuarios pueden automatizar fácilmente campañas personalizadas de SMS y email, sincronizar contactos y datos de productos, y optimizar operaciones—todo a través de una interfaz intuitiva y amigable.",
      },
      metrics: {
        title: "Dashboard de Métricas de Chats",
        description:
          "Un dashboard en tiempo real para visualizar métricas de campañas de marketing y consumo de chats por equipos de ventas, potenciado por configuraciones JSON personalizables que permiten a no-desarrolladores gestionar y adaptar visualizaciones de datos sin esfuerzo.",
        longDescription:
          "Un dashboard de analíticas interactivo construido para rastrear y visualizar el rendimiento de campañas de marketing y uso de chats entre equipos de ventas en tiempo real. La plataforma permite a las empresas monitorear la efectividad de sus esfuerzos publicitarios, entender el comportamiento de conversión y medir el rendimiento de interacción de asesores a nivel granular. Lo que distingue a este sistema es su modelo de configuración amigable para administradores: todas las visualizaciones se generan dinámicamente desde un esquema JSON estructurado, permitiendo a usuarios no técnicos definir parámetros como rangos de tiempo, etapas de embudo, métricas a mostrar y grupos de comparación—sin tocar código. Las capacidades clave incluyen: Seguimiento completo de campañas de embudo (desde prospección hasta negocios cerrados), Análisis de actividad de chat en tiempo real (demoras, transferencias, automatización vs. agentes), Rendimiento de alta concurrencia con UI de renderizado rápido, Ingesta de datos HTTP personalizada y definiciones de gráficos basadas en JSON dinámico, Filtros por asesor, marca o período, completamente configurables por equipos de operaciones. Ideal para entornos de marketing y ventas de ritmo rápido, este dashboard empodera a equipos multifuncionales para tomar decisiones basadas en datos con facilidad y autonomía.",
      },
      chats: {
        title: "App de Chats de Ventas",
        description:
          "Una plataforma inteligente de chat de ventas potenciada por IA, diseñada para gestionar conversaciones, crear oportunidades de venta, segmentar usuarios, lanzar campañas de marketing y habilitar colaboración en equipo a través de salas de chat internas.",
        longDescription:
          "Una aplicación de chat de ventas poderosa e intuitiva impulsada por IA, construida para centralizar y optimizar el flujo de trabajo comercial de equipos modernos. La plataforma permite a las empresas gestionar conversaciones en tiempo real con prospectos y clientes mientras integra características que impulsan la productividad y conversión de ventas. Los usuarios pueden: Participar en chats de ventas uno-a-uno mejorados con asistencia de IA, Crear y rastrear tarjetas de ventas (oportunidades) directamente desde la conversación, Segmentar usuarios basado en comportamiento, etiquetas o etapa de embudo, Lanzar campañas de ventas dirigidas vía chat, Crear salas de equipo internas o chats grupales para estrategias de ventas coordinadas y soporte al cliente. Diseñada para escalabilidad y altos volúmenes de interacción, este sistema fusiona automatización potenciada por IA con una interfaz limpia y centrada en el humano—haciéndola ideal para equipos que buscan impulsar el crecimiento a través de comunicación más inteligente.",
      },
    },
  },
}
