import { Link } from 'react-router-dom'
import { Download, FileText, BookOpen, Presentation, BarChart3, ArrowRight } from 'lucide-react'

const materials = [
  { title: 'Shabllon formatimi Word', type: 'Word', icon: FileText, desc: 'Format standard universitar gati për përdorim.' },
  { title: 'Udhëzues referenca APA', type: 'PDF', icon: BookOpen, desc: 'Gjithçka rreth citimeve në APA style.' },
  { title: 'Shabllon PowerPoint mbrojtje', type: 'PPTX', icon: Presentation, desc: 'Dizajn profesional për mbrojtjen tuaj.' },
  { title: 'Shabllon pyetësor', type: 'PDF', icon: FileText, desc: 'Model për kërkim empirik.' },
  { title: 'Udhëzues analizë SPSS', type: 'PDF', icon: BarChart3, desc: 'Hapa praktikë për statistikë me SPSS.' },
  { title: 'Lista kontrolli para dorëzimit', type: 'PDF', icon: FileText, desc: 'Kontrolloni punimin para dorëzimit.' },
]

export default function FreeMaterials() {
  return (
    <div className="pt-24 pb-20">
      <section className="container-academic text-center mb-12">
        <span className="section-label">Falas</span>
        <h1 className="section-title mt-2 mb-3">Materiale edukative falas</h1>
        <p className="section-subtitle mx-auto">Shkarkoni shabllone dhe udhëzues të dobishme.</p>
      </section>

      <section className="container-academic">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map((m, i) => (
            <div key={i} className="card p-6 group hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-zinc-100 group-hover:bg-amber-100 flex items-center justify-center transition-colors">
                  <m.icon className="w-5 h-5 text-zinc-700 group-hover:text-amber-600 transition-colors" />
                </div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">{m.type}</span>
              </div>
              <h3 className="font-serif text-lg font-semibold text-zinc-900 mb-1.5">{m.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">{m.desc}</p>
              <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors">
                <Download className="w-3.5 h-3.5" /> Shkarko falas
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-zinc-950 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-white mb-2">Keni nevojë për ndihmë të plotë?</h2>
          <p className="text-zinc-400 text-sm mb-5">Na kontaktoni për shërbime akademike profesionale.</p>
          <Link to="/sherbimet" className="btn-primary">
            Shiko shërbimet <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
