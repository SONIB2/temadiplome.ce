import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FileText, Download, CheckCircle2, ArrowRight, BookOpen } from 'lucide-react'
import { supabase, formatPrice } from '../../lib/supabase'

interface Course {
  id: string
  title: string
  description: string
  contents: string[]
  benefits: string[]
  price_cents: number
  image_url: string
}

export default function CoursesPreview() {
  const [course, setCourse] = useState<Course | null>(null)

  useEffect(() => {
    supabase.from('courses').select('*').eq('is_active', true).limit(1).then(({ data }) => {
      if (data && data[0]) setCourse(data[0] as Course)
    })
  }, [])

  if (!course) return null

  const price = formatPrice(course.price_cents)

  return (
    <section className="py-16 sm:py-20 bg-zinc-50">
      <div className="container-academic">
        <div className="bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-sm">
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 lg:h-auto min-h-[280px]">
              <img
                src={course.image_url || 'https://images.pexels.com/photos/5668772/pexels-photo-5668772.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-950/20 lg:bg-none" />
              <div className="absolute top-4 left-4 bg-amber-400 text-zinc-900 px-4 py-2 rounded-xl font-bold text-lg shadow-lg">
                {price}
              </div>
            </div>

            {/* Content */}
            <div className="p-7 lg:p-10 flex flex-col justify-center">
              <span className="section-label mb-2">Kurs PDF</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 mb-3 leading-snug">
                {course.title}
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mb-5">{course.description.slice(0, 180)}…</p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {course.benefits?.slice(0, 4).map((b, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-zinc-700">{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/kurse" className="btn-primary justify-center flex-1">
                  Bli tani — {price} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/kurse" className="btn-outline justify-center">
                  Detaje
                </Link>
              </div>

              <div className="flex items-center gap-4 mt-4 text-xs text-zinc-400">
                <span className="flex items-center gap-1"><Download className="w-3.5 h-3.5" /> Shkarkim automatik</span>
                <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> 13 kapituj</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
