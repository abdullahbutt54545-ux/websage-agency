import { useParams, Navigate, Link } from 'react-router-dom'
import { FaArrowLeft, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa'
import { blogPosts } from '../data/blog'
import AnimatedBackground from '../components/AnimatedBackground'
import SEO from '../components/SEO'
import './Blog.css'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  // Create keywords based on title and category for SEO
  const keywords = `${post.category.toLowerCase()}, ${post.title.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").split(" ").join(", ")}`

  return (
    <div className="blog-post-page">
      <SEO 
        title={`${post.title} | WebSage Blog`}
        description={post.excerpt}
        keywords={keywords}
        type="article"
      />
      <AnimatedBackground />

      <div className="container">
        <div className="blog-post-header">
          <Link to="/blog" className="back-link">
            <FaArrowLeft /> Back to Blog
          </Link>
          <span className="blog-category-badge" style={{ background: post.color }}>
            {post.category}
          </span>
          <h1 className="blog-post-title">{post.title}</h1>
          
          <div className="blog-post-meta-details">
            <span className="meta-item"><FaUser /> {post.author}</span>
            <span className="meta-item"><FaCalendarAlt /> {post.date}</span>
            <span className="meta-item"><FaClock /> {post.readTime}</span>
          </div>
        </div>

        <div className="blog-post-hero-image">
          <img src={`${import.meta.env.BASE_URL.slice(0, -1)}${post.image}`} alt={post.title} />
        </div>

        <article className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        
        <div className="blog-post-footer">
          <div className="cta-box">
            <h3>Ready to grow your digital presence?</h3>
            <p>Let WebSage Agency turn these strategies into reality for your business.</p>
            <Link to="/contact" className="btn btn-primary">Work With Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
