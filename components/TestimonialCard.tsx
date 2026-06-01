interface Testimonial {
  id: string
  author_name: string
  author_title: string
  content: string
  rating: number
  initials: string
  color: string
}

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < testimonial.rating)

  return (
    <div className="bg-white rounded-2xl border border-[#EDE9E1] p-7 flex flex-col hover:shadow-lg transition-shadow">

      {/* Opening quote */}
      <div className="font-serif text-5xl text-[#E6E6FF] font-bold leading-none mb-2 select-none">"</div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {stars.map((filled, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${filled ? 'text-[#F5AB00]' : 'text-[#EDE9E1]'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
      </div>

      {/* Content */}
      <p className="text-[#374151] text-sm leading-[1.8] flex-1 mb-6">
        {testimonial.content}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-5 border-t border-[#F3F4F6]">
        <div
          className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: testimonial.color }}
        >
          {testimonial.initials}
        </div>
        <div>
          <div className="text-[#0A1628] font-semibold text-sm">{testimonial.author_name}</div>
          <div className="text-[#9CA3AF] text-xs mt-0.5">{testimonial.author_title}</div>
        </div>
      </div>
    </div>
  )
}
