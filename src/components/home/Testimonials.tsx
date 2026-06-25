import { Star, Quote } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface Testimonial {
  id: string
  student_name: string
  university: string
  rating: number
  message: string
  service?: string
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: '1',
    student_name: 'A. Hoxha',
    university: 'Universiteti i Tiranës',
    service: 'Diplomë Bachelor',
    rating: 5,
    message: 'Më ndihmuan me strukturimin e temës dhe organizimin e kapitujve. Komunikimi ishte shumë korrekt dhe puna u dorëzua në kohë.',
  },
  {
    id: '2',
    student_name: 'E. Berisha',
    university: 'Prishtinë',
    service: 'Diplomë Master',
    rating: 5,
    message: 'Shërbim shumë profesional. Më pëlqeu që më sqaruan çdo hap dhe më ndihmuan me pjesën teorike dhe formatimin.',
  },
  {
    id: '3',
    student_name: 'K. Dervishi',
    university: 'Fakulteti Ekonomik',
    service: 'Analizë SPSS',
    rating: 5,
    message: 'Analiza SPSS ishte e qartë, me tabela, grafikë dhe interpretim të kuptueshëm. Më ndihmoi shumë për kapitullin e rezultateve.',
  },
  {
    id: '4',
    student_name: 'M. Krasniqi',
    university: 'Master',
    service: 'PowerPoint',
    rating: 5,
    message: 'Prezantimi ishte shumë estetik dhe i organizuar mirë. Nuk ishte i ngarkuar dhe u përshtat shumë bukur me temën.',
  },
  {
    id: '5',
    student_name: 'L. Gashi',
    university: 'Tiranë',
    service: 'Referenca APA',
    rating: 5,
    message: 'Referencat u rregulluan në format APA dhe dokumenti dukej shumë më profesional. Shërbim i shpejtë dhe korrekt.',
  },
  {
    id: '6',
    student_name: 'R. Deda',
    university: 'Durrës',
    service: 'Detyrë Kursi',
    rating: 5,
    message: 'Mora ndihmë për detyrën e kursit dhe u realizua sipas kërkesave të pedagogut. Komunikimi në WhatsApp ishte shumë i lehtë.',
  },
  {
    id: '7',
    student_name: 'B. Kola',
    university: 'Universitet privat',
    service: 'Formatim Punimi',
    rating: 5,
    message: 'Punimi u formatua sipas rregullores së universitetit. Më ndihmuan edhe me përmbajtjen, figurat dhe referencat.',
  },
  {
    id: '8',
    student_name: 'N. Shala',
    university: 'Kosovë',
    service: 'Konsultim Falas',
    rating: 5,
    message: 'Konsultimi fillestar më ndihmoi të kuptoja si duhej ta nisja temën. Më dhanë orientim të qartë për strukturën.',
  },
  {
    id: '9',
    student_name: 'D. Meta',
    university: 'Shkodër',
    service: 'Diplomë Bachelor',
    rating: 5,
    message: 'Puna ishte e organizuar dhe me komunikim të rregullt. Çdo ndryshim që kërkova u trajtua me kujdes.',
  },
  {
    id: '10',
    student_name: 'F. Gjoni',
    university: 'Elbasan',
    service: 'Kontroll Plagjiature',
    rating: 5,
    message: 'Më ndihmuan të kuptoja cilat pjesë duheshin rishikuar dhe si të përmirësoja citimet. Shumë korrektë.',
  },
  {
    id: '11',
    student_name: 'S. Rama',
    university: 'Bachelor',
    service: 'Strukturim dhe Organizim',
    rating: 5,
    message: 'Më ndihmuan të ndërtoja planin e punimit dhe ndarjen e kapitujve. Pas kësaj, puna u bë shumë më e qartë.',
  },
  {
    id: '12',
    student_name: 'J. Leka',
    university: 'Tiranë',
    service: 'Diplomë Master',
    rating: 5,
    message: 'Shërbim serioz dhe i kujdesshëm. Më pëlqeu që çdo pjesë u rishikua dhe u përshtat me kërkesat akademike.',
  },
  {
    id: '13',
    student_name: 'O. Prenga',
    university: 'Lezhë',
    service: 'PowerPoint',
    rating: 5,
    message: 'PowerPoint-i ishte shumë i pastër, profesional dhe i lehtë për t’u prezantuar. Më ndihmoi shumë për mbrojtjen.',
  },
  {
    id: '14',
    student_name: 'T. Murati',
    university: 'Maqedoni e Veriut',
    service: 'Detyrë Kursi',
    rating: 5,
    message: 'Detyra u përgatit sipas udhëzimeve dhe me strukturë të qartë. Përgjigjet ishin të shpejta dhe korrekte.',
  },
  {
    id: '15',
    student_name: 'V. Lleshi',
    university: 'Tiranë',
    service: 'Referenca APA',
    rating: 5,
    message: 'Kisha shumë probleme me citimet dhe bibliografinë. Pas rregullimit, dokumenti dukej shumë më akademik.',
  },
  {
    id: '16',
    student_name: 'G. Osmani',
    university: 'Prishtinë',
    service: 'Analizë SPSS',
    rating: 5,
    message: 'Rezultatet u paraqitën në mënyrë të qartë dhe me interpretim të kuptueshëm. Shërbim shumë i vlefshëm.',
  },
  {
    id: '17',
    student_name: 'I. Dervishi',
    university: 'Fakulteti i Drejtësisë',
    service: 'Diplomë Bachelor',
    rating: 5,
    message: 'Më ndihmuan me organizimin e kapitujve dhe rregullimin e gjuhës akademike. Punimi u përmirësua shumë.',
  },
  {
    id: '18',
    student_name: 'P. Hasa',
    university: 'Korçë',
    service: 'Formatim Punimi',
    rating: 5,
    message: 'Formatimi u bë sipas rregullave që kërkonte universiteti. Ishte punë e pastër dhe shumë korrekte.',
  },
]

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(fallbackTestimonials)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('sort_order')
      .then(({ data }) => {
        if (data && data.length) setItems(data as Testimonial[])
      })
  }, [])

  const visibleItems = showAll ? items : items.slice(0, 6)

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-academic">
        <div className="text-center mb-10">
          <span className="section-label">Vlerësime</span>
          <h2 className="section-title mt-2 mb-3">Çfarë thonë studentët tanë</h2>

          <div className="flex items-center justify-center gap-1.5 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm text-zinc-500 ml-2">
              4.9/5 nga 400+ studentë të asistuar
            </span>
          </div>

          <p className="text-sm text-zinc-500 max-w-2xl mx-auto mt-4">
            Vlerësime nga studentë që kanë marrë asistencë për punime diplome, detyra kursi,
            analiza statistikore, prezantime dhe formatim akademik.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleItems.map((t) => (
            <div
              key={t.id}
              className="card p-6 relative group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <Quote className="absolute top-4 right-4 w-7 h-7 text-zinc-100 group-hover:text-amber-100 transition-colors" />

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {t.service && (
                <span className="inline-flex mb-3 text-[11px] font-semibold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                  {t.service}
                </span>
              )}

              <p className="text-sm text-zinc-700 leading-relaxed mb-5">
                “{t.message}”
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
                <div className="w-9 h-9 rounded-full bg-zinc-900 flex items-center justify-center text-amber-400 font-serif font-bold text-sm flex-shrink-0">
                  {t.student_name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900 text-sm truncate">
                    {t.student_name}
                  </p>
                  <p className="text-xs text-zinc-400 truncate">
                    {t.university}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 6 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors"
            >
              {showAll ? 'Shfaq më pak' : 'Shiko më shumë vlerësime'}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}