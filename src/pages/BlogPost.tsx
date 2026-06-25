import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { researchImage } from '../lib/images'

interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  image_url: string
  category: string
  created_at: string
}

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    if (slug) {
      supabase.from('blog_posts').select('*').eq('slug', slug).single().then(({ data }) => {
        if (data) setPost(data as Post)
      })
    }
  }, [slug])

  if (!post) return <div className="pt-32 pb-20 container-academic">Duke ngarkuar...</div>

  const fmtDate = (d: string) => new Date(d).toLocaleDateString('sq-AL', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="pt-32 pb-20">
      <article className="container-academic max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gold-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kthehu te Blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center gap-1 text-xs text-gold-600 bg-gold-50 px-2.5 py-1 rounded-full">
            <Tag className="w-3 h-3" />{post.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />{fmtDate(post.created_at)}
          </span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy-900 mb-6 leading-tight">{post.title}</h1>

        <div className="rounded-2xl overflow-hidden mb-8 shadow-lg">
          <img src={post.image_url || researchImage} alt={post.title} className="w-full h-[400px] object-cover" />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.content}</div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <Link to="/blog" className="btn-outline">
            <ArrowLeft className="w-5 h-5" /> Të gjitha artikujt
          </Link>
        </div>
      </article>
    </div>
  )
}
