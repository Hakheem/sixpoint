'use client'

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogPost {
  id: number;
  title: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      text: string;
    }[];
    conclusion: string;
  };
  image: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
}

// Sample blog posts data
const blogPosts: { [key: number]: BlogPost } = {
  1: {
    id: 1,
    title: "Discover the Serene Beauty of Riat Hills: Your Gateway to Tranquility",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&h=900&fit=crop",
    date: "December 5, 2024",
    readTime: "5 min read",
    category: "Location",
    author: "SixPoint Victoria Team",
    content: {
      intro: "When you arrive at SixPoint Victoria Hotel, you're not just checking into accommodation—you're stepping into a sanctuary. Nestled at the foot of the breathtaking Riat Hills along the Kisumu Airport-Lake Basin Mall Road, our hotel offers a unique blend of accessibility and natural serenity that sets us apart from any other establishment in the region.",
      sections: [
        {
          heading: "A Location Like No Other",
          text: "SixPoint Victoria holds the distinction of being the only tourist-class accommodation closest to Kisumu International Airport, just 3.4 kilometers away. This prime location means you can transition from your flight to our tranquil oasis in mere minutes, making us the perfect choice for both business travelers and leisure guests who value convenience without compromising on experience."
        },
        {
          heading: "The Magic of Riat Hills",
          text: "The Riat Hills provide more than just a stunning backdrop—they create a microclimate of peace and tranquility that envelops our property. Wake up to the sight of mist rolling over the hills, enjoy your morning coffee with a view that seems to stretch forever, and end your day watching the sun paint the sky in brilliant hues as it sets behind the peaks. Our guests consistently tell us that the natural beauty surrounding SixPoint Victoria is one of the highlights of their stay."
        },
        {
          heading: "Outdoor Experiences That Connect You to Nature",
          text: "Our outdoor dining area takes full advantage of this spectacular location. Imagine enjoying a perfectly prepared meal while surrounded by the natural amphitheater of the hills, with the sounds of birds and rustling leaves replacing the noise of the city. It's an experience that transforms a simple dinner into a memory that lasts long after you've checked out."
        },
        {
          heading: "The Perfect Base for Exploration",
          text: "While our location offers peace and quiet, we're also perfectly positioned for those who want to explore Kisumu and the surrounding areas. Lake Basin Mall is nearby for shopping and entertainment, while the cultural and natural attractions of Kisumu—including the famous Lake Victoria—are all easily accessible from our hotel."
        }
      ],
      conclusion: "At SixPoint Victoria, we've created more than just a hotel—we've created a destination where the modern conveniences of airport proximity meet the timeless beauty of the Riat Hills. Whether you're here for business or pleasure, for a night or a week, we invite you to experience the unique tranquility that only our location can provide."
    }
  },
  2: {
    id: 2,
    title: "Maya Restaurant: A Culinary Journey Through Kenya's Flavors",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=900&fit=crop",
    date: "November 28, 2024",
    readTime: "4 min read",
    category: "Dining",
    author: "Chef Samuel Omondi",
    content: {
      intro: "At the heart of SixPoint Victoria Hotel lies Maya Restaurant, our residential dining establishment that has become legendary among both guests and locals. More than just a place to eat, Maya Restaurant represents our commitment to providing heavenly hotel services backup through exceptional cuisine and unforgettable dining experiences.",
      sections: [
        {
          heading: "A Fusion of Flavors",
          text: "Our menu at Maya Restaurant is a carefully curated journey through Kenya's rich culinary heritage, complemented by international favorites. We believe that food should tell a story, and our chefs work tirelessly to source the finest local ingredients while incorporating global cooking techniques. From traditional Kenyan dishes that honor our cultural roots to contemporary international cuisine, every plate that leaves our kitchen is a work of art."
        },
        {
          heading: "The Outdoor Dining Experience",
          text: "One of Maya Restaurant's most celebrated features is our breathtaking outdoor dining area. Set against the backdrop of the Riat Hills, dining al fresco at Maya is an experience that engages all your senses. The gentle evening breeze, the stunning views, and the carefully crafted ambiance create the perfect setting for both romantic dinners and celebratory gatherings with friends and family."
        },
        {
          heading: "Service That Exceeds Expectations",
          text: "What truly sets Maya Restaurant apart is our dedication to service. Our staff doesn't just serve food—they create experiences. From the moment you're seated to the final course, every detail is attended to with care and professionalism. Whether you're enjoying a leisurely breakfast before a business meeting or celebrating a special occasion over dinner, our team ensures that every moment is perfect."
        },
        {
          heading: "Special Events and Private Dining",
          text: "Maya Restaurant also serves as an ideal venue for special events. Whether it's an intimate anniversary dinner, a business lunch, or a family celebration, our private dining options and customizable menus ensure that your event is exactly as you envision it. Our events team works closely with you to create memorable experiences that reflect your unique needs and preferences."
        }
      ],
      conclusion: "At Maya Restaurant, we don't just serve meals—we create culinary memories. We invite you to join us and discover why our guests consistently rate our dining experience as one of the highlights of their stay at SixPoint Victoria Hotel. Book your table today and let us take you on a gastronomic journey you won't forget."
    }
  },
  3: {
    id: 3,
    title: "Why SixPoint Victoria is the Perfect Choice for Airport Travelers",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&h=900&fit=crop",
    date: "November 20, 2024",
    readTime: "6 min read",
    category: "Travel Tips",
    author: "Janet Akinyi",
    content: {
      intro: "In today's fast-paced world, airport convenience is more than a luxury—it's a necessity. At SixPoint Victoria Hotel, we understand the unique needs of airport travelers, whether you're catching an early morning flight, dealing with a layover, or arriving late at night. Here's why we've become the go-to choice for travelers using Kisumu International Airport.",
      sections: [
        {
          heading: "Unbeatable Proximity",
          text: "Located just 3.4 kilometers from Kisumu International Airport, SixPoint Victoria is the closest tourist-class accommodation to the airport. This proximity translates to real benefits for our guests: no stress about morning traffic, reduced transportation costs, and the ability to maximize your time in Kisumu rather than spending it in transit. A quick 5-7 minute drive is all that separates you from the airport terminal."
        },
        {
          heading: "24/7 Airport Shuttle Service",
          text: "Understanding that flights don't operate on a 9-to-5 schedule, neither do we. Our complimentary airport shuttle service runs 24/7, ensuring that no matter when your flight arrives or departs, we're ready to transport you safely and comfortably. Simply inform our front desk of your flight details, and we'll have everything arranged."
        },
        {
          heading: "Business Traveler Amenities",
          text: "For business travelers, time is money, and SixPoint Victoria is designed with your needs in mind. High-speed WiFi throughout the property ensures you stay connected, while our business center offers everything you need for last-minute preparations. Need to host a meeting before your flight? Our conference facilities are equipped with modern audiovisual technology and can accommodate groups of various sizes."
        },
        {
          heading: "Rest and Relaxation Between Flights",
          text: "Extended layovers or early morning flights no longer need to be stressful experiences. Our heated swimming pool, open until 10 PM, provides the perfect way to unwind after a long journey. For those with evening flights, spend your day relaxing by the pool, enjoying our spa services, or simply resting in your comfortable room before your departure."
        },
        {
          heading: "More Than Just Convenience",
          text: "While our proximity to the airport is certainly convenient, it's not our only appeal. Unlike typical airport hotels that sacrifice ambiance for location, SixPoint Victoria offers a genuine retreat experience. Our serene setting at the foot of Riat Hills, exceptional dining at Maya Restaurant, and attentive service ensure that even short stays become memorable experiences."
        }
      ],
      conclusion: "At SixPoint Victoria, we've mastered the art of combining airport convenience with genuine hospitality. Whether you're here for a business trip, starting a safari adventure, or simply need a comfortable place to rest between flights, we offer the perfect blend of location, luxury, and service. Book your stay today and discover why airport travelers consistently choose SixPoint Victoria as their Kisumu base."
    }
  }
};

const BlogPostPage = ({ params }: { params?: { id?: string } }) => {
  // For demo purposes, default to blog post 1
  const postId = params?.id ? parseInt(params.id) : 1;
  const post = blogPosts[postId] || blogPosts[1];

  const relatedPosts = Object.values(blogPosts).filter(p => p.id !== post.id).slice(0, 2);

  return (
    <div className="">
     

      {/* Hero Image */}
      <div className="w-full h-[500px] relative">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        
        {/* Category Badge */}
        {/* <div className="absolute bottom-8 left-8 ">
          <span className="bg-primary text-black px-4 py-2 rounded-full text-sm font-semibold">
            {post.category}
          </span>
        </div> */}
      </div>

      {/* Article Content */}
      <div className="padded mx-auto py-12">
        <div className="max-w-4xl mx-auto">
          {/* Meta Info */}
          <div className="flex items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
            <span>By {post.author}</span>
          </div>

          {/* Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl title mb-8"
          >
            {post.title}
          </motion.h1>

          {/* Share Buttons */}
          <div className="flex items-center gap-4 mb-12 pb-8 border-b">
            <span className="text-gray-600 font-semibold">Share:</span>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Facebook className="w-5 h-5 text-blue-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Twitter className="w-5 h-5 text-blue-400" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Linkedin className="w-5 h-5 text-blue-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Article Body */}
          <article className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              {post.content.intro}
            </p>

            {post.content.sections.map((section, index) => (
              <div key={index} className="mb-8">
                <h2 className="text-3xl title mb-4">{section.heading}</h2>
                <p className="text-gray-700 leading-relaxed">{section.text}</p>
              </div>
            ))}

            <p className="text-xl text-gray-700 leading-relaxed mt-12 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              {post.content.conclusion}
            </p>
          </article>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="padded mx-auto">
            <h2 className="text-3xl title mb-8 text-center">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`}>
                  <div className="bg-white rounded overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-yellow-600 text-sm font-semibold">{relatedPost.category}</span>
                      <h3 className="text-xl title mt-2 mb-2 group-hover:text-yellow-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{relatedPost.date}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-[#1a1a1a] text-white py-16">
        <div className="padded mx-auto text-center">
          <h2 className="text-3xl title mb-4">Experience SixPoint Victoria Hotel</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover luxury accommodation near Kisumu International Airport with world-class amenities and exceptional service.
          </p>
          <Link href="/rooms">
            <button className="bg-primary text-black px-8 py-4 hover:bg-accent transition-colors font-semibold">
              Book Your Stay
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
