import { Link } from 'react-router-dom'
import { FaArrowRight, FaNewspaper } from 'react-icons/fa'
import { blogPosts } from '../data/blog'
import AnimatedBackground from '../components/AnimatedBackground'
import useScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'
import './Blog.css'

export default function Blog() {
  const revealRef = useScrollReveal()

  return (
    <div className="blog-page">
      <SEO 
        title="Web Design & SEO Blog | Insights from WebSage Agency"
        description="Stay updated with the latest trends, tips, and strategies in WordPress development, Shopify conversions, SEO, and digital marketing."
        keywords="web design blog, SEO tips, WordPress tutorials, Shopify conversion strategies, digital marketing insights"
      />
      <AnimatedBackground />

      <div className="page-hero">
        <div className="container">
          <span className="page-hero-label">Blog</span>
          <h1>Insights & <span className="gradient-text">Resources</span></h1>
          <p>Stay updated with the latest trends, tips, and strategies in web development, SEO, and digital marketing.</p>
        </div>
      </div>

      <section className="section" ref={revealRef}>
        <div className="container">
          <div className="blog-grid reveal">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-card stagger-child">
                <div className="blog-card-image" style={{ backgroundImage: `url(${import.meta.env.BASE_URL.slice(0, -1)}${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  <span className="blog-card-category" style={{ background: post.color }}>{post.category}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-card-meta">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="blog-card-link">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
