import { Link } from 'react-router-dom'
import { GraduationCap, BookOpen, Users, Shield, Award, ArrowRight, MapPin, Globe2, Building2 } from 'lucide-react'

const values = [
  { icon: BookOpen, title: 'Orientim akademik', text: 'Ndihmojmë studentët të kuptojnë dhe realizojnë punime akademike me cilësi.' },
  { icon: Users, title: 'Mbështetje praktike', text: 'Konsultime dhe mbështetje për çdo fazë të punimit, nga ideja tek dorëzimi.' },
  { icon: Shield, title: 'Konfidencialitet total', text: 'Informacioni juaj është 100% konfidencial dhe nuk ndahet me palë të treta.' },
  { icon: Award, title: 'Standard i lartë', text: 'Çdo shërbim sipas standardeve universitare dhe stilit akademik të kërkuar.' },
]

const countries = ['Shqipëri', 'Kosovë', 'Maqedoni e Veriut', 'Mal i Zi']
const languages = ['Shqip', 'Anglisht', 'Italisht']

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <section className="container-academic text-center mb-14">
        <span className="section-label">Rreth Nesh</span>
        <h1 className="section-title mt-2">Kush jemi ne</h1>
      </section>

      <section className="container-academic">

        {/* Main intro */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-xl h-80 sm:h-[420px]">
            <img
              src="https://images.pexels.com/photos/5905857/pexels-photo-5905857.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Student studion"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
            <div className="absolute bottom-6 left-6 bg-amber-400 rounded-2xl p-4 shadow-lg">
              <p className="font-serif text-2xl font-bold text-zinc-900">+400</p>
              <p className="text-xs text-zinc-800 font-medium">studentë të ndihmuar</p>
            </div>
            <div className="absolute top-4 right-4 bg-zinc-900/80 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-xl">
              Aktiv nga 2022
            </div>
          </div>
          <div>
            <p className="text-lg text-zinc-700 leading-relaxed mb-5">
              <strong className="text-zinc-900">temadiplome.ce</strong> është një platformë akademike profesionale, aktive që nga viti <strong>2022</strong>, e krijuar për të ndihmuar studentët të realizojnë punimet e tyre të diplomës me cilësi, saktësi dhe standard.
            </p>
            <p className="text-zinc-600 leading-relaxed mb-5">
              Ofrojmë shërbime të plota: nga projekt propozimi, deri tek diploma e përfunduar. Punojmë me studentë nga Shqipëria, Kosova, Maqedonia dhe Mali i Zi, në gjuhët shqipe, angleze dhe italiane.
            </p>
            <p className="text-zinc-600 leading-relaxed mb-7 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
              <strong className="text-amber-800">E rëndësishme:</strong> Platforma ofron ndihmë akademike profesionale. Ne nuk zëvendësojmë përgjegjësinë akademike të studentit. Qëllimi ynë është të ndihmojmë çdo student të realizojë punimin e tij me cilësi dhe standard.
            </p>
            <Link to="/kontakt" className="btn-primary">
              Na kontaktoni <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {[
            { val: '+400', label: 'Studentë të kënaqur' },
            { val: '60+', label: 'Universitete' },
            { val: '4', label: 'Shtete' },
            { val: '2022', label: 'Aktiv nga' },
          ].map((s) => (
            <div key={s.val} className="bg-zinc-950 rounded-2xl p-5 text-center">
              <p className="font-serif text-2xl font-bold text-amber-400">{s.val}</p>
              <p className="text-zinc-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="bg-zinc-950 rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <GraduationCap className="w-10 h-10 text-amber-400 mb-4" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">Misioni ynë</h2>
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                Çdo student meriton mbështetje cilësore. Që nga viti 2022, jemi platforma që i jep studentit drejtimin, njohuritë dhe mbështetjen për të kryer punimin e diplomës me sukses.
              </p>
            </div>
            <img
              src="https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Libra"
              className="rounded-2xl h-56 object-cover w-full"
            />
          </div>
        </div>

        {/* Coverage: countries + languages */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif font-bold text-zinc-900">Shtetet ku punojmë</h3>
            </div>
            <div className="space-y-2">
              {[
                { flag: '🇦🇱', label: 'Shqipëri' },
                { flag: '🇽🇰', label: 'Kosovë' },
                { flag: '🇲🇰', label: 'Maqedoni e Veriut' },
                { flag: '🇲🇪', label: 'Mal i Zi' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3 bg-zinc-50 rounded-xl px-3.5 py-2.5">
                  <span className="text-lg">{c.flag}</span>
                  <span className="text-sm font-medium text-zinc-800">{c.label}</span>
                </div>
              ))}
            </div>
            <Link to="/universitetet" className="inline-flex items-center gap-1.5 mt-4 text-xs font-semibold text-amber-600 hover:text-amber-700">
              Shiko të gjitha universitetet <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white border border-zinc-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Globe2 className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif font-bold text-zinc-900">Gjuhët e punimit</h3>
            </div>
            <div className="space-y-2">
              {[
                { code: 'SQ', label: 'Shqip', desc: 'Gjuha kryesore' },
                { code: 'EN', label: 'Anglisht', desc: 'English academic writing' },
                { code: 'IT', label: 'Italisht', desc: 'Scrittura accademica italiana' },
              ].map((l) => (
                <div key={l.code} className="flex items-center gap-3 bg-zinc-50 rounded-xl px-3.5 py-2.5">
                  <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {l.code}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-zinc-800">{l.label}</p>
                    <p className="text-xs text-zinc-400">{l.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {values.map((v) => (
            <div key={v.title} className="bg-zinc-50 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
                <v.icon className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-serif text-base font-semibold text-zinc-900 mb-1.5">{v.title}</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>

        {/* Legal / NIPT */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-zinc-200 flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-zinc-600" />
            </div>
            <div className="flex-1 grid sm:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-zinc-500 mb-1">Emri i subjektit</p>
                <p className="font-bold text-zinc-900">temadiplome.ce</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">NIPT</p>
                <p className="font-bold text-zinc-900 font-mono">M51607036D</p>
              </div>
              <div>
                <p className="text-xs text-zinc-500 mb-1">Aktiv nga</p>
                <p className="font-bold text-zinc-900">2022</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
