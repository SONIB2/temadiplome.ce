import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, FileText, BarChart3, Presentation } from 'lucide-react'

const serviceGroups = [
  {
    title: 'Punime Diplome',
    subtitle: 'Bachelor & Master',
    description: 'Asistencë për strukturim, zhvillim, formatim dhe përgatitje finale të punimit.',
    icon: GraduationCap,
  },
  {
    title: 'Detyra Kursi & Projekte',
    subtitle: 'Sipas lëndës dhe afatit',
    description: 'Ndihmë për detyra kursi, projekte akademike dhe materiale sipas kërkesave.',
    icon: FileText,
  },
  {
    title: 'Analizë & Formatim',
    subtitle: 'SPSS, APA, strukturim',
    description: 'Përpunim të dhënash, referenca APA, organizim kapitujsh dhe formatim final.',
    icon: BarChart3,
  },
  {
    title: 'Prezantime & Konsultim',
    subtitle: 'PowerPoint + konsultim falas',
    description: 'Prezantime profesionale për mbrojtje dhe orientim fillestar pa pagesë.',
    icon: Presentation,
  },
]

export default function ServicesPreview() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-academic">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-label">Shërbimet</span>
            <h2 className="section-title mt-2">Si mund t’ju ndihmojmë?</h2>
            <p className="text-zinc-500 text-sm sm:text-base mt-3 max-w-2xl">
              Zgjidhni kategorinë që ju përshtatet dhe shikoni listën e plotë të shërbimeve,
              çmimeve dhe mënyrës së porosisë.
            </p>
          </div>

          <Link
            to="/sherbimet"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-600 hover:text-amber-700 whitespace-nowrap"
          >
            Shiko të gjitha <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceGroups.map((group) => {
            const Icon = group.icon

            return (
              <Link
                key={group.title}
                to="/sherbimet"
                className="card p-6 group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 group-hover:bg-amber-100 flex items-center justify-center mb-5 transition-colors">
                  <Icon className="w-6 h-6 text-zinc-700 group-hover:text-amber-600 transition-colors" />
                </div>

                <span className="inline-flex mb-3 text-[11px] font-semibold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                  {group.subtitle}
                </span>

                <h3 className="font-serif text-xl font-semibold text-zinc-900 mb-2 leading-snug">
                  {group.title}
                </h3>

                <p className="text-sm text-zinc-500 leading-relaxed mb-5">
                  {group.description}
                </p>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-zinc-900 group-hover:text-amber-600 transition-colors">
                  Shiko detajet <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            )
          })}
        </div>

        <div className="mt-10 rounded-3xl bg-zinc-950 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Dëshironi të shikoni çmimet e plota?
            </h3>
            <p className="text-zinc-400 text-sm max-w-2xl">
              Te faqja e shërbimeve gjeni listën e plotë: konsultim falas, strukturim,
              referenca APA, SPSS, PowerPoint, Bachelor, Master dhe detyra kursi.
            </p>
          </div>

          <Link
            to="/sherbimet"
            className="inline-flex items-center justify-center gap-2 bg-amber-400 text-zinc-950 px-5 py-3 rounded-xl font-semibold hover:bg-amber-300 transition-colors whitespace-nowrap"
          >
            Shiko shërbimet dhe çmimet <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}