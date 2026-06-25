import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Globe2, Building2, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '../lib/supabase'

interface University {
  name: string
  abbr: string
  city: string
  logo: string
  type: 'public' | 'private'
}

const albaniaPublic: University[] = [
  {
    name: 'Universiteti i Tiranës',
    abbr: 'UT',
    city: 'Tiranë',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/University_of_Tirana_logo.svg/375px-University_of_Tirana_logo.svg.png',
    type: 'public',
  },
  {
    name: 'Universiteti i Mjekësisë i Tiranës',
    abbr: 'UMT',
    city: 'Tiranë',
    logo: 'https://umed.edu.al/wp-content/uploads/2024/04/universiteti-i-mjekesise-logo-login-1-1.png',
    type: 'public',
  },
  {
    name: 'Universiteti Bujqësor i Tiranës',
    abbr: 'UBT',
    city: 'Tiranë',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Universiteti_Bujq%C3%ABsor_i_Tiran%C3%ABs.svg/512px-Universiteti_Bujq%C3%ABsor_i_Tiran%C3%ABs.svg.png',
    type: 'public',
  },
  {
    name: 'Universiteti Aleksandër Moisiu',
    abbr: 'UAMD',
    city: 'Durrës',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Universiteti_%22Aleksand%C3%ABr_Moisiu%22.svg/250px-Universiteti_%22Aleksand%C3%ABr_Moisiu%22.svg.png',
    type: 'public',
  },
  {
    name: 'Universiteti Luigj Gurakuqi',
    abbr: 'UNISHK',
    city: 'Shkodër',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Universiteti_i_Shkodr%C3%ABs_%22Luigj_Gurakuqi%22.svg/250px-Universiteti_i_Shkodr%C3%ABs_%22Luigj_Gurakuqi%22.svg.png',
    type: 'public',
  },
  {
    name: 'Universiteti Aleksandër Xhuvani',
    abbr: 'UNIEL',
    city: 'Elbasan',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Logo_e_Universitetit_%22Aleksand%C3%ABr_Xhuvani%22.svg/250px-Logo_e_Universitetit_%22Aleksand%C3%ABr_Xhuvani%22.svg.png',
    type: 'public',
  },
  {
    name: 'Universiteti Ismail Qemali',
    abbr: 'UNIVLORA',
    city: 'Vlorë',
    logo: 'https://univlora.edu.al/temauv/images/logo.png',
    type: 'public',
  },
  {
    name: 'Universiteti Fan S. Noli',
    abbr: 'UNKORCE',
    city: 'Korçë',
    logo: 'https://unkorce.edu.al/medngar/2024/08/Logo_e_Universitetit__Fan_Noli_-e1726660879862.png',
    type: 'public',
  },
  {
    name: 'Universiteti Eqerem Çabej',
    abbr: 'UOGJ',
    city: 'Gjirokastër',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Logo_e_Universitetit_%22Eqrem_%C3%87abej%22.svg/330px-Logo_e_Universitetit_%22Eqrem_%C3%87abej%22.svg.png',
    type: 'public',
  },
  {
    name: 'Universiteti i Arteve',
    abbr: 'UA',
    city: 'Tiranë',
    logo: '',
    type: 'public',
  },
  {
    name: 'Universiteti i Sporteve',
    abbr: 'USTA',
    city: 'Tiranë',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Universiteti_i_Sporteve_t%C3%AB_Tiran%C3%ABs.svg/481px-Universiteti_i_Sporteve_t%C3%AB_Tiran%C3%ABs.svg.png',
    type: 'public',
  },
  {
    name: 'Kolegji Profesional',
    abbr: 'KPT',
    city: 'Tiranë',
    logo: '',
    type: 'public',
  },
]

const albaniaPrivate: University[] = [
  {
    name: 'Universiteti Europian i Tiranës',
    abbr: 'UET',
    city: 'Tiranë',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Logo_e_Universitetit_Europian_t%C3%AB_Tiran%C3%ABs.svg/330px-Logo_e_Universitetit_Europian_t%C3%AB_Tiran%C3%ABs.svg.png',
    type: 'private',
  },
  {
    name: 'Universiteti Luarasi',
    abbr: 'LUARASI',
    city: 'Tiranë',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Luarasi_University_Logo.svg/330px-Luarasi_University_Logo.svg.png',
    type: 'private',
  },
  {
    name: 'Albanian University',
    abbr: 'AU',
    city: 'Tiranë',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Logo_of_Albanian_University.svg/330px-Logo_of_Albanian_University.svg.png',
    type: 'private',
  },
  {
    name: 'Universiteti Polis',
    abbr: 'POLIS',
    city: 'Tiranë',
    logo: '',
    type: 'private',
  },
  {
    name: 'Universiteti Katolik Zoja e Këshillit',
    abbr: 'UNIZKM',
    city: 'Tiranë',
    logo: '',
    type: 'private',
  },
  {
    name: 'Universiteti Western Balkans',
    abbr: 'WB',
    city: 'Tiranë',
    logo: '',
    type: 'private',
  },
  {
    name: 'Universiteti Mesdhetar',
    abbr: 'UMD',
    city: 'Tiranë',
    logo: '',
    type: 'private',
  },
]

const kosovoPublic: University[] = [
  {
    name: 'Universiteti i Prishtinës "Hasan Prishtina"',
    abbr: 'UP',
    city: 'Prishtinë',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/University_of_Prishtina_logo.svg/512px-University_of_Prishtina_logo.svg.png',
    type: 'public',
  },
  {
    name: 'Universiteti i Prizrenit "Ukshin Hoti"',
    abbr: 'UNIPRIZ',
    city: 'Prizren',
    logo: '',
    type: 'public',
  },
  {
    name: 'Universiteti i Pejës "Haxhi Zeka"',
    abbr: 'UPZ',
    city: 'Pejë',
    logo: '',
    type: 'public',
  },
  {
    name: 'Universiteti i Gjakovës "Fehmi Agani"',
    abbr: 'UGJFA',
    city: 'Gjakovë',
    logo: '',
    type: 'public',
  },
  {
    name: 'Universiteti i Gjilanit "Kadri Zeka"',
    abbr: 'UGJ',
    city: 'Gjilan',
    logo: '',
    type: 'public',
  },
  {
    name: 'Universiteti i Mitrovicës "Isa Boletini"',
    abbr: 'UMIB',
    city: 'Mitrovicë',
    logo: '',
    type: 'public',
  },
  {
    name: 'Universiteti i Shkencave të Aplikuara',
    abbr: 'USHAF',
    city: 'Ferizaj',
    logo: '',
    type: 'public',
  },
  {
    name: 'Fakulteti i Studimeve Islame',
    abbr: 'FSI',
    city: 'Prishtinë',
    logo: '',
    type: 'public',
  },
  {
    name: 'Akademia e Kosovës për Siguri Publike',
    abbr: 'AKSP',
    city: 'Vushtrri',
    logo: '',
    type: 'public',
  },
]

const kosovoPrivate: University[] = [
  {
    name: 'Kolegji AAB',
    abbr: 'AAB',
    city: 'Prishtinë',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Aab_logo.svg/512px-Aab_logo.svg.png',
    type: 'private',
  },
  {
    name: 'Kolegji UBT',
    abbr: 'UBT',
    city: 'Prishtinë',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/University_for_Business_and_Technology_Logo.jpg',
    type: 'private',
  },
  { name: 'Akademia Evolucion', abbr: 'AE', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji AUK', abbr: 'AUK', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Heimerer', abbr: 'HEIMERER', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Biznesi', abbr: 'KB', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Dardania', abbr: 'DARDANIA', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Evropian Dukagjini', abbr: 'KED', city: 'Pejë', logo: '', type: 'private' },
  { name: 'Kolegji ESLG', abbr: 'ESLG', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Evropian i Kosovës', abbr: 'KEK', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji FAMA', abbr: 'FAMA', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Gjilani', abbr: 'KG', city: 'Gjilan', logo: '', type: 'private' },
  { name: 'Kolegji Globus', abbr: 'GLOBUS', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Iliria', abbr: 'ILIRIA', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Rezonanca', abbr: 'REZ', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji ISPE', abbr: 'ISPE', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Juridika', abbr: 'JURIDIKA', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Pjeter Budi', abbr: 'PB', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Riinvest', abbr: 'RIINVEST', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Tempulli', abbr: 'TEMPULLI', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Universi', abbr: 'UNIVERSI', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'Kolegji Universum', abbr: 'UNIVERSUM', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'SHLP Design Factory', abbr: 'DF', city: 'Prishtinë', logo: '', type: 'private' },
  { name: 'IBC Mitrovica', abbr: 'IBCM', city: 'Mitrovicë', logo: '', type: 'private' },
]

const countries = [
  { flag: '🇦🇱', name: 'Shqipëri', count: albaniaPublic.length + albaniaPrivate.length },
  { flag: '🇽🇰', name: 'Kosovë', count: kosovoPublic.length + kosovoPrivate.length },
  { flag: '🇲🇰', name: 'Maqedoni', count: null },
  { flag: '🇲🇪', name: 'Mal i Zi', count: null },
]

const languages = [
  { code: 'SQ', name: 'Shqip' },
  { code: 'EN', name: 'Anglisht' },
  { code: 'IT', name: 'Italisht' },
]

function UniCard({ u }: { u: University }) {
  return (
    <div className="bg-white border border-zinc-100 rounded-2xl p-4 flex flex-col items-center text-center gap-3 hover:border-amber-300 hover:shadow-md transition-all duration-200 group">
      {/* Logo area */}
      <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
        {u.logo ? (
          <img
            src={u.logo}
            alt={u.name}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              const target = e.currentTarget
              target.style.display = 'none'
              const fallback = target.nextElementSibling as HTMLElement | null
              if (fallback) fallback.style.display = 'flex'
            }}
          />
        ) : null}
        {/* Fallback monogram */}
        <div
          className={`w-14 h-14 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-serif font-bold text-sm leading-none ${u.logo ? 'hidden' : 'flex'}`}
        >
          {u.abbr.slice(0, 3)}
        </div>
      </div>

      {/* Text */}
      <div className="min-w-0 w-full">
        <p className="font-semibold text-zinc-900 text-xs leading-snug line-clamp-2">{u.name}</p>
        <p className="text-zinc-400 text-[11px] mt-1 flex items-center justify-center gap-1">
          <MapPin className="w-3 h-3 flex-shrink-0" /> {u.city}
        </p>
      </div>
    </div>
  )
}

function Section({ flag, country, publicUnis, privateUnis }: {
  flag: string
  country: string
  publicUnis: University[]
  privateUnis: University[]
}) {
  return (
    <section className="container-academic mb-16">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">{flag}</span>
        <div>
          <h2 className="font-serif text-2xl font-bold text-zinc-900">{country}</h2>
          <p className="text-zinc-500 text-sm">{publicUnis.length + privateUnis.length} institucione</p>
        </div>
      </div>

      {publicUnis.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Universitete Publike</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {publicUnis.map((u) => <UniCard key={u.name} u={u} />)}
          </div>
        </div>
      )}

      {privateUnis.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-zinc-400" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Universitete &amp; Kolegje Private</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {privateUnis.map((u) => <UniCard key={u.name} u={u} />)}
          </div>
        </div>
      )}
    </section>
  )
}

export default function Universities() {
  return (
    <div className="pt-24 pb-20">

      {/* Hero */}
      <section className="container-academic text-center mb-14">
        <span className="section-label">Mbulimi ynë</span>
        <h1 className="section-title mt-2 mb-4">Universitetet që shërbejmë</h1>
        <p className="section-subtitle mx-auto mb-8">
          Nga viti 2022, kemi ndihmuar studentë nga mbi 60 universitete dhe kolegje në 4 shtete.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { val: '+400', label: 'Studentë' },
            { val: '60+', label: 'Universitete' },
            { val: '4', label: 'Shtete' },
            { val: '3', label: 'Gjuhë' },
            { val: '2022', label: 'Nga viti' },
          ].map((s) => (
            <div key={s.val} className="bg-zinc-950 rounded-2xl px-5 py-3 text-center">
              <p className="font-serif text-xl font-bold text-amber-400">{s.val}</p>
              <p className="text-zinc-400 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Country pills */}
      <section className="container-academic mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {countries.map((c) => (
            <div key={c.name} className="bg-white border border-zinc-100 rounded-2xl p-4 text-center shadow-sm">
              <span className="text-3xl mb-2 block">{c.flag}</span>
              <p className="font-serif font-bold text-zinc-900 text-sm">{c.name}</p>
              {c.count && <p className="text-zinc-400 text-xs mt-0.5">{c.count} institucione</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Albania */}
      <Section flag="🇦🇱" country="Shqipëri" publicUnis={albaniaPublic} privateUnis={albaniaPrivate} />

      {/* Kosovo */}
      <Section flag="🇽🇰" country="Kosovë" publicUnis={kosovoPublic} privateUnis={kosovoPrivate} />

      {/* Other countries */}
      <section className="container-academic mb-14">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { flag: '🇲🇰', name: 'Maqedoni e Veriut', desc: 'Universitete me program akademik në gjuhën shqipe.' },
            { flag: '🇲🇪', name: 'Mal i Zi', desc: 'Universitete me program akademik në gjuhën shqipe.' },
          ].map((c) => (
            <div key={c.name} className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex items-center gap-4">
              <span className="text-4xl flex-shrink-0">{c.flag}</span>
              <div>
                <p className="font-serif font-bold text-zinc-900">{c.name}</p>
                <p className="text-zinc-500 text-sm leading-relaxed mt-1">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Languages */}
      <section className="container-academic mb-14">
        <h2 className="font-serif text-2xl font-bold text-zinc-900 mb-6">Gjuhët e punimit</h2>
        <div className="grid grid-cols-3 gap-4">
          {languages.map((l) => (
            <div key={l.code} className="bg-zinc-950 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center mx-auto mb-3">
                <Globe2 className="w-6 h-6 text-zinc-900" />
              </div>
              <p className="font-serif text-lg font-bold text-white">{l.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NIPT */}
      <section className="container-academic mb-14">
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="w-12 h-12 rounded-xl bg-zinc-200 flex items-center justify-center flex-shrink-0">
            <Building2 className="w-6 h-6 text-zinc-600" />
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
      </section>

      {/* CTA */}
      <section className="container-academic">
        <div className="bg-zinc-950 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-serif text-3xl font-bold text-white mb-3">Universiteti juaj nuk është këtu?</h2>
            <p className="text-zinc-400 mb-7 max-w-md mx-auto text-sm leading-relaxed">
              Na kontaktoni gjithsesi. Punojmë me çdo institucion ku programi është në gjuhën shqipe, angleze ose italiane.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/zgjidh-punimin" className="btn-primary justify-center">
                Porosit tani <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp justify-center"
              >
                <MessageCircle className="w-4 h-4" /> Na shkruani
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
