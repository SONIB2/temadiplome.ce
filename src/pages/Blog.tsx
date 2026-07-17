import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  category: string;
  created_at: string;
}

const fallbackPosts: Post[] = [
  {
    id: "1",
    title: "Si të zgjedhësh temën e diplomës?",
    slug: "si-te-zgjedhesh-temen-e-diplomes",
    excerpt:
      "Zgjedhja e temës është hapi i parë dhe më i rëndësishëm. Tema duhet të jetë e qartë, e realizueshme dhe e lidhur me degën tuaj.",
    image_url:
      "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Diplomë",
    created_at: "2026-01-10",
  },
  {
    id: "2",
    title: "Si strukturohet një punim diplome?",
    slug: "si-strukturohet-nje-punim-diplome",
    excerpt:
      "Një punim diplome duhet të ketë hyrje, kapitull teorik, metodologji, analizë, konkluzione dhe rekomandime të qarta.",
    image_url:
      "https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Strukturim",
    created_at: "2026-01-18",
  },
  {
    id: "3",
    title: "Gabimet më të shpeshta në temat e diplomës",
    slug: "gabimet-me-te-shpeshta-ne-tema-diplome",
    excerpt:
      "Mungesa e referencave, analiza e dobët dhe struktura e paqartë janë disa nga gabimet që duhen shmangur në punimet akademike.",
    image_url:
      "https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Këshilla",
    created_at: "2026-02-02",
  },
  {
    id: "4",
    title: "Si të përdorësh referencat APA?",
    slug: "si-te-perdoresh-referencat-apa",
    excerpt:
      "Referencat APA janë të rëndësishme për korrektësinë akademike. Mësoni si të citoni libra, artikuj dhe burime online.",
    image_url:
      "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "APA",
    created_at: "2026-02-15",
  },
  {
    id: "5",
    title: "Kur duhet analiza SPSS në një punim?",
    slug: "kur-duhet-analiza-spss-ne-punim",
    excerpt:
      "Nëse punimi ka pyetësor, hipoteza ose të dhëna numerike, analiza SPSS është pjesë kyçe e kapitullit të rezultateve.",
    image_url:
      "https://images.pexels.com/photos/669622/pexels-photo-669622.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "SPSS",
    created_at: "2026-03-03",
  },
  {
    id: "6",
    title: "Si të përgatitesh për mbrojtjen e diplomës?",
    slug: "si-te-pergatitesh-per-mbrojtjen-e-diplomes",
    excerpt:
      "Mbrojtja kërkon prezantim të qartë, PowerPoint të mirëstrukturuar dhe përgjigje të sigurta ndaj pyetjeve të komisionit.",
    image_url:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Prezantim",
    created_at: "2026-03-20",
  },
];

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select("id,title,slug,excerpt,image_url,category,created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data && data.length) setPosts(data as Post[]);
      });
  }, []);

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("sq-AL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="pt-24 pb-20">
      <section className="container-academic text-center mb-12">
        <span className="section-label">Blog</span>
        <h1 className="section-title mt-2 mb-3">Këshilla akademike</h1>
        <p className="section-subtitle mx-auto">
          Artikuj dhe guida praktike për procesin e punimit të diplomës,
          detyrave të kursit, referencave, analizës SPSS dhe përgatitjes për
          mbrojtje.
        </p>
      </section>

      <section className="container-academic">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="card overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={
                    post.image_url ||
                    "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=800"
                  }
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                    <Calendar className="w-3 h-3" />
                    {fmt(post.created_at)}
                  </span>
                </div>

                <h2 className="font-serif text-lg font-semibold text-zinc-900 mb-2 leading-snug group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 mb-3">
                  {post.excerpt}
                </p>

                <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                  Lexo <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}