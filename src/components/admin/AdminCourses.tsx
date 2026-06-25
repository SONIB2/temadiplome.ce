import { useState, useEffect } from 'react'
import { supabase, formatPrice } from '../../lib/supabase'
import { Save, Upload, CheckCircle2 } from 'lucide-react'

interface Course {
  id: string
  title: string
  description: string
  contents: string[]
  benefits: string[]
  price_cents: number
  image_url: string
  file_url: string | null
  is_active: boolean
}

export default function AdminCourses() {
  const [course, setCourse] = useState<Course | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('courses').select('*').limit(1).then(({ data }) => {
      if (data && data[0]) setCourse(data[0] as Course)
    })
  }, [])

  const save = async () => {
    if (!course) return
    setSaving(true)
    await supabase.from('courses').update({
      title: course.title, description: course.description,
      contents: course.contents, benefits: course.benefits,
      price_cents: course.price_cents, image_url: course.image_url,
      file_url: course.file_url, is_active: course.is_active,
    }).eq('id', course.id)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const uploadPdf = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !course) return
    const fileName = `course_${Date.now()}.pdf`
    const { error } = await supabase.storage.from('course-files').upload(fileName, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from('course-files').getPublicUrl(fileName)
      setCourse({ ...course, file_url: data.publicUrl })
    }
  }

  if (!course) return <div className="text-center text-zinc-400 py-8 text-sm">Duke ngarkuar...</div>

  const inputCls = "w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:border-amber-400 text-sm bg-zinc-50 focus:bg-white transition-colors"

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-serif text-xl font-bold text-zinc-900">Menaxho kursin PDF</h1>
        {saved && (
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-xl text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Ruajtur!
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 p-5 sm:p-6 space-y-4 shadow-sm">
        <div>
          <label className="block text-sm font-medium text-zinc-900 mb-1.5">Titulli</label>
          <input type="text" value={course.title} onChange={(e) => setCourse({ ...course, title: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-900 mb-1.5">Përshkrimi</label>
          <textarea rows={4} value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} className={inputCls + ' resize-none'} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-900 mb-1.5">Çmimi (Lekë)</label>
            <input type="number" value={Math.round(course.price_cents * 1.2)} onChange={(e) => setCourse({ ...course, price_cents: Math.round(Number(e.target.value) / 1.2) })} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-900 mb-1.5">URL imazhi</label>
            <input type="text" value={course.image_url || ''} onChange={(e) => setCourse({ ...course, image_url: e.target.value })} className={inputCls} />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-900 mb-1.5">Përmbajtja (rresht = pikë)</label>
            <textarea rows={8} value={course.contents?.join('\n') || ''} onChange={(e) => setCourse({ ...course, contents: e.target.value.split('\n').filter(Boolean) })} className={inputCls + ' resize-none'} />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-900 mb-1.5">Përfitimet (rresht = pikë)</label>
            <textarea rows={8} value={course.benefits?.join('\n') || ''} onChange={(e) => setCourse({ ...course, benefits: e.target.value.split('\n').filter(Boolean) })} className={inputCls + ' resize-none'} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-900 mb-2">Ngarko PDF</label>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-white rounded-xl cursor-pointer hover:bg-zinc-800 text-sm font-medium transition-colors">
              <Upload className="w-4 h-4" /> Ngarko
              <input type="file" accept=".pdf" onChange={uploadPdf} className="hidden" />
            </label>
            {course.file_url && <span className="text-sm text-green-600 font-medium">PDF i ngarkuar ✓</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" checked={course.is_active} onChange={(e) => setCourse({ ...course, is_active: e.target.checked })} className="w-4 h-4 accent-amber-400 rounded" id="active" />
          <label htmlFor="active" className="text-sm text-zinc-700">Kursi është aktiv</label>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary w-full justify-center">
          <Save className="w-4 h-4" /> {saving ? 'Duke ruajtur...' : 'Ruaj ndryshimet'}
        </button>
      </div>
    </div>
  )
}
