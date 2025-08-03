import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";
import Navbar from "@/components/landingPage/NavbarBlogDetail";
import Footer from "@/components/landingPage/Footer";
import { headers } from "next/headers";
import Image from "next/image";
import Breadcrumb from "@/components/breadcrumb";

type Props = {
  params: Promise<{ id: string }>;
};

// Updated blog post type to match your API response
interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  authorId: string | null;
  author: {
    name: string;
  } | null; // This matches your API include structure
  category?: string;
  tags?: string[];
}

export default async function BlogDetailPage({ params }: Props) {
  // Await params in Next.js 15+
  const { id } = await params;
  
  try {
    // Get base URL dynamically from headers
    const host = (await headers()).get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const baseUrl = `${protocol}://${host}`;

    // Fetch blog post data
    const res = await fetch(`${baseUrl}/api/blogpost/${id}`, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle different error cases
    if (res.status === 404) {
      return notFound();
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch blog post: ${res.status}`);
    }

    const post: BlogPost = await res.json();

    // Validate that we have the required data
    if (!post || !post.title || !post.content) {
      return notFound();
    }

    const formatDate = (dateString: string) => {
      try {
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(dateString));
      } catch (error) {
        return "Date unavailable";
      }
    };

    const getReadTime = (content: string) => {
      const wordsPerMinute = 200;
      const wordCount = content.trim().split(/\s+/).length;
      return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    };

    // Function to render content with basic formatting
    const renderContent = (content: string) => {
      // Split content into paragraphs and render them
      const paragraphs = content.split('\n\n').filter(p => p.trim());
      
      return paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4 last:mb-0">
          {paragraph.trim()}
        </p>
      ));
    };

    const crumbs = [
    { label: "Home", href: "/" },
    { label: "Blog health", href: "/blogpost" },
    { label: "Detail BlogHealth", href: "" },
  ];


    return (
      <div className="bg-gray-100">
        <Navbar />
        
        {/* Hero Section */}
        <section className="bg-[#355372] py-16 px-6 md:px-20 text-white">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Detail</h1>
            <p className="text-lg text-gray-200">
              Baca artikel lengkap dari ShaolaCare
            </p>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 ">
          <div className="flex justify-end">
            <Breadcrumb crumbs={crumbs} />
          </div>
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="pb-6">
              {/* Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-gray-500 text-sm mb-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.createdAt)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {getReadTime(post.content)} min read
                  </span>
                  <Badge variant="secondary" className="text-xs text-[#355372] ">
                    Article
                  </Badge>
                </div>
                <span className="text-gray-400 text-xs font-mono">
                  #{post.id.slice(-6)}
                </span>
              </div>

              {/* Title */}
              <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {post.title}
              </CardTitle>

              <div className="mt-4">
                <Image
                  src="/images/toolkit.webp"
                  alt="medical toolkit"
                  width={800}
                  height={400}
                  className="rounded-lg w-full object-cover max-h-[400px]"
                />
              </div>

              {/* Author (FIXED) */}
              <div>
                <Badge variant="secondary" className="text-xs  text-[#355372]">
                  <span className="text-sm text-gray-500 mt-1 font-bold">
                    By: {post.author?.name || "Penulis tidak dikenal"}
                  </span>
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Content */}
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {renderContent(post.content)}
              </div>

              {/* Tags (if available) */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    );

  } catch (error) {
    console.error("Error loading blog post:", error);
    
    // Return error page instead of notFound()
    return (
      <>
        <Navbar />
        <section className="bg-[#355372] py-16 px-6 md:px-20 text-white">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Error</h1>
            <p className="text-lg text-gray-200">
              Terjadi kesalahan saat memuat artikel
            </p>
          </div>
        </section>
        <main className="container mx-auto px-4 py-16">
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="pt-6">
              <p className="text-center text-gray-600">
                Maaf, artikel yang Anda cari tidak dapat dimuat. Silakan coba lagi nanti.
              </p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </>
    );
  }
}