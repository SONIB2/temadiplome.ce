import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Calendar, ArrowRight, Tag } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  image_url: string
  category: string
  created_at: string
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    supabase.from('blog_posts').select('id,title,slug,excerpt,image_url,category,created_at').order('created_at', { ascending: false }).then(({ data }) => {
      if (data) setPosts(data as Post[])
    })
  }, [])

  const fmt = (d: string) => new Date(d).toLocaleDateString('sq-AL', { day: 'numeric', month: 'short', year: 'numeric' })

  return (
    <div className="pt-24 pb-20">
      <section className="container-academic text-center mb-12">
        <span className="section-label">Blog</span>
        <h1 className="section-title mt-2 mb-3">Këshilla akademike</h1>
        <p className="section-subtitle mx-auto">Artikuj dhe guida për procesin e punimit të diplomës.</p>
      </section>

      <section className="container-academic">
        {posts.length === 0 ? (
          <p className="text-center text-zinc-400 py-10 text-sm">Artikujt do të jenë së shpejti.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card overflow-hidden group hover:-translate-y-0.5">
                <div className="h-44 overflow-hidden">
                  <img
                    src={post.image_url || 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      <Tag className="w-3 h-3" />{post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                      <Calendar className="w-3 h-3" />{fmt(post.created_at)}
                    </span>
                  </div>
                  <h2 className="font-serif text-lg font-semibold text-zinc-900 mb-2 leading-snug group-hover:text-amber-600 transition-colors">{post.title}</h2>
                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                    Lexo <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
