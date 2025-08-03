'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Loader2 } from 'lucide-react'
import { useBlogPosts } from '@/hooks/useBlogPosts'
import NavbarBlog from '@/components/landingPage/NavbarBlog'
import Footer from '@/components/landingPage/Footer'
import Image from 'next/image'

export default function BlogList() {
  const { posts, loading, error } = useBlogPosts()
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingArticleId, setLoadingArticleId] = useState<string | null>(null)
  const router = useRouter()

  const postsPerPage = 5
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString))
  }

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content
    return content.slice(0, maxLength).trim() + '...'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading blog posts...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <h3 className="text-lg font-semibold mb-2">Error Loading Posts</h3>
          <p>{error}</p>
        </div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No blog posts found</h3>
        <p className="text-gray-600">There are no blog posts to display at the moment.</p>
      </div>
    )
  }

  return (
    <>
      <NavbarBlog />
      <div className="space-y-6 bg-gray-100 pb-10">
        <section className="w-full bg-[#355372]">
          <h1 className="text-3xl font-bold text-white pt-10 ml-40">Blog Health</h1>
          <h6 className="font-semibold text-gray-200 ml-40">
            Halaman artikel seputar peralatan kesehatan dan teknologi
          </h6>
          <div className="flex justify-end pb-5 mr-20">
            <Badge variant="outline" className="text-gray-100 border-gray-100 font-semibold">
              {posts.length} {posts.length === 1 ? 'post' : 'Posts'}
            </Badge>
          </div>
        </section>

        <div className="space-y-6">
          {currentPosts.map((post) => (
            <Card
              key={post.id}
              className="ml-60 mr-60 group hover:shadow-lg transition-all duration-200 hover:border-[#c6d7e7] shadow-xs"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Today : {formatDate(post.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{getReadTime(post.content)} min read</span>
                    </div>
                    <Badge variant="secondary" className="text-xs text-[#355372] ">
                      Article
                    </Badge>
                  </div>
                  <div>
                    <Badge variant="secondary" className="text-xs text-[#355372] ">
                      <span className="text-sm text-gray-500 mt-1">
                        Ditulis oleh: {post.author?.name ?? "Penulis tidak dikenal"}
                      </span>
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-[#355372] transition-colors leading-tight font-bold">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex gap-6">
                  {/* Gambar di sebelah kiri */}
                  <div className="min-w-[150px] max-w-[150px] h-[150px] relative rounded overflow-hidden">
                    <Image
                      src="/images/blog.png"
                      alt="Blog Health"
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  {/* Konten di sebelah kanan */}
                  <div className="flex-1">
                    <CardDescription className="text-gray-600 mb-6 text-base leading-relaxed">
                      {truncateContent(post.content, 200)}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto font-medium bg-[#355372] text-white hover:bg-[#6b8fb3] hover:text-gray-100 px-3 py-1"
                        onClick={() => {
                          setLoadingArticleId(post.id)
                          router.push(`/blogpost/${post.id}`)
                        }}
                      >
                        {loadingArticleId === post.id ? (
                          <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                          <>
                            Read full article
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                      <div className="text-sm text-gray-400">#{post.id.slice(-6)}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? 'default' : 'outline'}
              size="sm"
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
      <Footer />
    </>
  )
}
