import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  MessageCircle,
  GraduationCap,
  BookOpen,
  BarChart3,
  Presentation,
  FileText,
  Star,
  Clock,
  Shield,
} from 'lucide-react'
import { SITE_CONFIG } from '../lib/supabase'

const services = [
  {
    title: 'Konsultim Falas',
    desc: 'Orientim fillestar për temën dhe kërkesat.',
    icon: MessageCircle,
  },
  {
    title: 'Strukturim Punimi',
    desc: 'Ndarje kapitujsh, objektiva dhe metodologji.',
    icon: BookOpen,
  },
  {
    title: 'Referenca APA',
    desc: 'Citimet dhe bibliografia sipas stilit APA.',
    icon: FileText,
  },
  {
    title: 'Analizë SPSS',
    desc: 'Tabelat, grafikët dhe interpretimi statistikor.',
    icon: BarChart3,
  },
  {
    title: 'PowerPoint',
    desc: 'Slide profesionale dhe të pastra për mbrojtje.',
    icon: Presentation,
  },
  {
    title: 'Punime Diplome',
    desc: 'Bachelor dhe Master me strukturë akademike.',
    icon: GraduationCap,
  },
]

const process = [
  {
    day: '01',
    title: 'Zgjidh shërbimin',
    desc: 'Zgjidh llojin e shërbimit që të nevojitet: diplomë, SPSS, PowerPoint, APA ose detyrë kursi.',
    image:
      'https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    day: '02',
    title: 'Dërgo kërkesën',
    desc: 'Plotëso formularin me temën, universitetin, afatin dhe detajet e tjera të punimit.',
    image:
      'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    day: '03',
    title: 'Merr konfirmimin',
    desc: 'Ne të kontaktojmë në WhatsApp për çmimin, afatin, pagesën dhe hapat e radhës.',
    image:
      'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
]

function TestimonialsSlider() {
  const testimonials = [
    {
      name: 'A. Hoxha',
      university: 'Universiteti i Tiranës',
      service: 'Diplomë Bachelor',
      text: 'Më ndihmuan me strukturimin e temës dhe organizimin e kapitujve. Komunikimi ishte shumë korrekt dhe puna u dorëzua në kohë.',
    },
    {
      name: 'E. Berisha',
      university: 'Prishtinë',
      service: 'Diplomë Master',
      text: 'Shërbim shumë profesional. Më pëlqeu që më sqaruan çdo hap dhe më ndihmuan me pjesën teorike dhe formatimin.',
    },
    {
      name: 'K. Dervishi',
      university: 'Fakulteti Ekonomik',
      service: 'Analizë SPSS',
      text: 'Analiza SPSS ishte e qartë, me tabela, grafikë dhe interpretim të kuptueshëm. Më ndihmoi shumë për kapitullin e rezultateve.',
    },
    {
      name: 'M. Krasniqi',
      university: 'Master',
      service: 'PowerPoint',
      text: 'Prezantimi ishte shumë estetik dhe i organizuar mirë. Nuk ishte i ngarkuar dhe u përshtat bukur me temën.',
    },
    {
      name: 'L. Gashi',
      university: 'Tiranë',
      service: 'Referenca APA',
      text: 'Referencat u rregulluan në format APA dhe dokumenti dukej shumë më profesional. Shërbim i shpejtë dhe korrekt.',
    },
  ]

  const [active, setActive] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [testimonials.length])

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % testimonials.length)
  }

  const getVisibleTestimonials = () => {
    const previous = (active - 1 + testimonials.length) % testimonials.length
    const next = (active + 1) % testimonials.length

    return [
      { ...testimonials[previous], position: 'left' },
      { ...testimonials[active], position: 'center' },
      { ...testimonials[next], position: 'right' },
    ]
  }

  return (
    <div className="relative z-10">
      <div className="container-academic">
        <div className="text-center mb-12">
          <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Vlerësime studentësh
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
            Mos e merrni vetëm fjalën tonë.
            <br />
            <span className="text-zinc-300">400+ studentë na kanë besuar.</span>
          </h2>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none" />

        <div className="flex items-stretch justify-center gap-5 px-4 sm:px-8">
          {getVisibleTestimonials().map((item) => {
            const isCenter = item.position === 'center'

            return (
              <div
                key={`${item.name}-${item.position}`}
                className={`rounded-2xl border p-5 sm:p-6 transition-all duration-500 ${
                  isCenter
                    ? 'w-full max-w-[460px] bg-white/10 border-amber-400/30 shadow-2xl shadow-amber-400/10 scale-100 opacity-100'
                    : 'hidden md:block w-[320px] bg-white/[0.04] border-white/10 opacity-45 scale-95'
                }`}
              >
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed mb-6">
                  “{item.text}”
                </p>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-zinc-950 font-serif font-bold">
                      {item.name.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-white text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-zinc-400">
                        {item.university}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-0.5 rounded-full bg-amber-400/10 px-2 py-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-9">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white hover:bg-amber-400 hover:text-zinc-950 hover:border-amber-400 transition-colors"
          aria-label="Vlerësimi i mëparshëm"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full border border-white/20 bg-white/5 text-white hover:bg-amber-400 hover:text-zinc-950 hover:border-amber-400 transition-colors"
          aria-label="Vlerësimi tjetër"
        >
          ›
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const whatsappMessage =
    'Përshëndetje! Dua të interesohem për një shërbim akademik.'

  return (
    <main className="bg-white overflow-hidden">
      {/* HERO */}
      <section className="relative bg-zinc-950 overflow-hidden">
        <div className="relative min-h-[82vh] pt-16">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          >
            <source
              src="/images/7945680-hd_1920_1080_25fps.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-zinc-950/65" />

          <div className="container-academic relative z-10 min-h-[82vh] flex items-center">
            <div className="max-w-3xl text-white py-24">
              <p className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-5">
                temadiplome.ce
              </p>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 max-w-full">
                Asistencë akademike për një punim më të mirë.
              </h1>

              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                Nga struktura e temës, referencat APA dhe analiza SPSS, deri te
                PowerPoint-i për mbrojtje. Proces i qartë, komunikim i shpejtë
                dhe konfidencialitet.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Link
                  to="/zgjidh-punimin"
                  className="btn-primary w-full sm:w-auto"
                >
                  Porosit tani <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                    whatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4" /> Konsultim falas
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPLIT REGISTER / FORM */}
      <section className="grid lg:grid-cols-2">
        <div className="bg-amber-400 p-10 sm:p-16 lg:p-20 flex items-center">
          <div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-zinc-950 mb-5">
              Konsultim falas përpara porosisë
            </h2>

            <p className="text-zinc-800 leading-relaxed max-w-xl mb-8">
              Na shkruani në WhatsApp për të diskutuar temën, afatin,
              strukturën, çmimin dhe dokumentet që ju nevojiten.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: Clock, label: 'Përgjigje brenda 1 ore' },
                { icon: Shield, label: '100% konfidencial' },
              ].map((item) => {
                const Icon = item.icon

                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-zinc-950 text-amber-400 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="font-semibold text-zinc-950 text-sm">
                      {item.label}
                    </p>
                  </div>
                )
              })}
            </div>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-zinc-950 text-white px-6 py-3 rounded-xl font-semibold hover:bg-zinc-800 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Shkruaj në WhatsApp
            </a>
          </div>
        </div>

        <div className="relative p-8 sm:p-12 lg:p-16 bg-zinc-100 overflow-hidden flex items-center">
          <img
            src="https://images.pexels.com/photos/5905925/pexels-photo-5905925.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Student duke punuar"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />

          <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl w-full max-w-xl mx-auto">
            <h3 className="font-serif text-3xl font-bold text-zinc-950 mb-6">
              Kërko shërbimin tënd
            </h3>

            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault()

                const form = e.currentTarget
                const formData = new FormData(form)

                const name = formData.get('name')
                const whatsapp = formData.get('whatsapp')
                const service = formData.get('service')

                const message = `Përshëndetje! Dua të kërkoj një shërbim akademik.%0A%0AEmri: ${name}%0AWhatsApp: ${whatsapp}%0AShërbimi: ${service}`

                window.open(
                  `https://wa.me/${SITE_CONFIG.whatsapp}?text=${message}`,
                  '_blank'
                )
              }}
            >
              <input
                type="text"
                name="name"
                placeholder="Emri dhe mbiemri"
                required
                className="w-full h-12 rounded-lg bg-white border border-zinc-200 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              <input
                type="tel"
                name="whatsapp"
                placeholder="WhatsApp"
                required
                className="w-full h-12 rounded-lg bg-white border border-zinc-200 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              <select
                name="service"
                required
                className="w-full h-12 rounded-lg bg-white border border-zinc-200 px-4 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
                defaultValue=""
              >
                <option value="" disabled>
                  Shërbimi që kërkoni
                </option>
                <option value="Konsultim Falas">Konsultim Falas</option>
                <option value="Strukturim dhe Organizim">
                  Strukturim dhe Organizim
                </option>
                <option value="Referenca APA">Referenca APA</option>
                <option value="Analizë SPSS">Analizë SPSS</option>
                <option value="PowerPoint">PowerPoint</option>
                <option value="Diplomë Bachelor">Diplomë Bachelor</option>
                <option value="Diplomë Master">Diplomë Master</option>
                <option value="Detyrë Kursi">Detyrë Kursi</option>
              </select>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 text-zinc-950 px-6 py-3.5 rounded-xl font-semibold hover:bg-amber-300 transition-colors"
              >
                Plotëso kërkesën <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SERVICES MOVING STRIP */}
      <section className="py-14 bg-white overflow-hidden">
        <div className="text-center mb-8 px-4">
          <div className="w-10 h-0.5 bg-amber-400 mx-auto mb-4" />
          <h2 className="font-serif text-4xl font-bold text-zinc-950">
            Çfarë ofrojmë
          </h2>
          <p className="text-zinc-500 mt-3">
            Shërbimet kryesore që studentët kërkojnë më shpesh.
          </p>
        </div>

        <div className="relative border-y border-zinc-100 bg-zinc-50 py-8 overflow-hidden">
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max gap-5 animate-scroll-x px-4">
              {[...services, ...services].map((service, index) => {
                const Icon = service.icon

                return (
                  <Link
                    key={`${service.title}-${index}`}
                    to="/sherbimet"
                    className="w-[260px] sm:w-[310px] bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-amber-500" />
                    </div>

                    <h3 className="font-serif text-xl font-bold text-zinc-950 mb-2">
                      {service.title}
                    </h3>

                    <p className="text-sm text-zinc-500 leading-relaxed">
                      {service.desc}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            to="/sherbimet"
            className="inline-flex items-center justify-center gap-2 bg-zinc-950 text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-zinc-800 transition-colors"
          >
            Shiko të gjitha shërbimet <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* TESTIMONIAL SLIDER */}
      <section className="relative py-24 sm:py-28 bg-zinc-950 text-white overflow-hidden">
        <img
          src="https://images.pexels.com/photos/8197528/pexels-photo-8197528.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Student i diplomuar"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-zinc-950/85" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.12),_transparent_42%)]" />

        <TestimonialsSlider />
      </section>

      {/* PROCESS */}
      <section className="pt-20 sm:pt-24 pb-14 sm:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="w-10 h-0.5 bg-amber-400 mx-auto mb-4" />

            <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.25em] mb-3">
              Proces i thjeshtë
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-zinc-950">
              Si funksionon porosia?
            </h2>

            <p className="text-zinc-500 mt-4 max-w-2xl mx-auto">
              Tre hapa të qartë për të nisur punimin, për të dërguar kërkesën
              dhe për të marrë konfirmimin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {process.map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <div className="w-14 h-14 rounded-2xl border-2 border-amber-400 flex flex-col items-center justify-center mb-5">
                    <span className="font-serif text-2xl font-bold text-amber-500">
                      {item.day}
                    </span>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wide">
                      Hapi
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-zinc-950 mb-3">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}