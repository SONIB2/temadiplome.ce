import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  GraduationCap,
  Loader2,
  MessageCircle,
  Tag,
} from "lucide-react";
import { SITE_CONFIG, supabase } from "../lib/supabase";

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
      "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1200",
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
      "https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&w=1000",
    category: "Strukturim",
    created_at: "2026-01-18",
  },
  {
    id: "3",
    title: "Gabimet më të shpeshta në temat e diplomës",
    slug: "gabimet-me-te-shpeshta-ne-tema-diplome",
    excerpt:
      "Mungesa e referencave, analiza e dobët dhe struktura e paqartë janë disa nga gabimet që duhen shmangur.",
    image_url:
      "https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg?auto=compress&cs=tinysrgb&w=1000",
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
      "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=1000",
    category: "APA",
    created_at: "2026-02-15",
  },
  {
    id: "5",
    title: "Kur duhet analiza SPSS në një punim?",
    slug: "kur-duhet-analiza-spss-ne-punim",
    excerpt:
      "Nëse punimi ka pyetësor, hipoteza ose të dhëna numerike, analiza SPSS është pjesë kyçe e rezultateve.",
    image_url:
      "https://images.pexels.com/photos/669622/pexels-photo-669622.jpeg?auto=compress&cs=tinysrgb&w=1000",
    category: "SPSS",
    created_at: "2026-03-03",
  },
  {
    id: "6",
    title: "Si të përgatitesh për mbrojtjen e diplomës?",
    slug: "si-te-pergatitesh-per-mbrojtjen-e-diplomes",
    excerpt:
      "Mbrojtja kërkon prezantim të qartë, PowerPoint të mirëstrukturuar dhe përgjigje të sigurta ndaj pyetjeve.",
    image_url:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1000",
    category: "Prezantim",
    created_at: "2026-03-20",
  },
];

const fallbackImage =
  "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=1000";

function PostMeta({
  category,
  date,
  formatDate,
}: {
  category: string;
  date: string;
  formatDate: (value: string) => string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-[10px] font-bold text-violet-700 sm:text-xs">
        <Tag className="h-3 w-3" />
        {category}
      </span>

      <span className="inline-flex items-center gap-1.5 text-[10px] text-zinc-400 sm:text-xs">
        <Calendar className="h-3 w-3" />
        {formatDate(date)}
      </span>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("id,title,slug,excerpt,image_url,category,created_at")
        .order("created_at", { ascending: false });

      if (!active) return;

      if (!error && data && data.length > 0) {
        setPosts(data as Post[]);
      }

      setLoading(false);
    };

    loadPosts();

    return () => {
      active = false;
    };
  }, []);

  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("sq-AL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const featuredPost = useMemo(() => posts[0], [posts]);
  const remainingPosts = useMemo(() => posts.slice(1), [posts]);

  const whatsappMessage =
    "Përshëndetje! Kam nevojë për orientim akademik dhe dëshiroj më shumë informacion.";

  return (
    <main className="w-full max-w-full overflow-x-hidden bg-white pb-0 pt-24 lg:pt-28">
      {/* HERO */}
      <section className="px-4 sm:px-5 lg:px-10">
        <div className="mx-auto max-w-[1440px] text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-violet-600">
            Blog
          </p>

          <h1 className="mt-3 font-serif text-3xl font-bold text-zinc-950 sm:text-4xl lg:text-5xl">
            Këshilla akademike
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
            Artikuj dhe guida praktike për strukturimin e punimit, referencat,
            analizën SPSS dhe përgatitjen për mbrojtje.
          </p>
        </div>
      </section>

      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-violet-600" />
        </div>
      )}

      {!loading && featuredPost && (
        <>
          {/* FEATURED POST */}
          <section className="px-4 pb-5 pt-8 sm:px-5 sm:pb-7 sm:pt-10 lg:px-10">
            <div className="mx-auto max-w-[1440px]">
              <Link
                to={`/blog/${featuredPost.slug}`}
                className="group grid min-w-0 overflow-hidden rounded-[24px] border border-violet-100 bg-gradient-to-br from-white via-violet-50/30 to-white shadow-[0_18px_52px_rgba(76,29,149,0.08)] transition hover:border-violet-200 hover:shadow-[0_24px_64px_rgba(76,29,149,0.12)] lg:grid-cols-[1.05fr_1fr]"
              >
                <div className="relative min-h-[240px] overflow-hidden sm:min-h-[330px] lg:min-h-[410px]">
                  <img
                    src={featuredPost.image_url || fallbackImage}
                    alt={featuredPost.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:hidden" />
                </div>

                <div className="flex min-w-0 flex-col justify-center p-5 sm:p-8 lg:p-10">
                  <PostMeta
                    category={featuredPost.category}
                    date={featuredPost.created_at}
                    formatDate={formatDate}
                  />

                  <h2 className="mt-5 font-serif text-2xl font-bold leading-tight text-zinc-950 transition group-hover:text-violet-700 sm:text-3xl lg:text-4xl">
                    {featuredPost.title}
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
                    {featuredPost.excerpt}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-violet-700">
                    Lexo më shumë
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          </section>

          {/* OTHER POSTS */}
          <section className="px-4 py-5 sm:px-5 sm:py-7 lg:px-10">
            <div className="mx-auto max-w-[1440px]">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {remainingPosts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-[20px] border border-zinc-100 bg-white shadow-[0_10px_30px_rgba(24,24,27,0.05)] transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-[0_18px_44px_rgba(76,29,149,0.09)]"
                  >
                    <div className="h-44 overflow-hidden sm:h-48">
                      <img
                        src={post.image_url || fallbackImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <PostMeta
                        category={post.category}
                        date={post.created_at}
                        formatDate={formatDate}
                      />

                      <h2 className="mt-4 font-serif text-lg font-bold leading-snug text-zinc-950 transition group-hover:text-violet-700 sm:text-xl">
                        {post.title}
                      </h2>

                      <p className="mt-2 line-clamp-3 text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6">
                        {post.excerpt}
                      </p>

                      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-bold text-violet-700 sm:text-sm">
                        Lexo më shumë
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

       
        </>
      )}
    </main>
  );
}