import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Lucid Hub. For events, partnerships, mentorship, and general enquiries.',
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-[#0A1628] pt-32 pb-20 px-[5%]">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-5xl font-bold text-white leading-tight mb-4">
            Let's <em className="italic text-[#F5AB00]">Connect</em>
          </h1>
          <p className="text-white/55 text-xl leading-relaxed">
            Whether you're looking to register for an event, apply for mentorship, partner with us, or simply say hello —
            we're here and we respond within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-24 px-[5%] bg-[#F7F5F0]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14">

          {/* Contact info */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#0A1628] mb-8">Get in Touch</h2>
            <div className="space-y-6">
              {[
                { icon:'📧', label:'Email', value:'lucidhub.info@gmail.com', href:'mailto:lucidhub.info@gmail.com' },
                { icon:'📍', label:'Base', value:'Lagos, Nigeria', href:null },
                { icon:'🌐', label:'Coverage', value:'19 States · 4 Countries', href:null },
                { icon:'⏱️', label:'Response Time', value:'Within 24 hours', href:null },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 bg-white rounded-xl p-5 border border-[#EDE9E1]">
                  <span className="text-2xl">{c.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-[#1A1AFF] font-semibold hover:underline">{c.value}</a>
                    ) : (
                      <p className="text-[#0A1628] font-semibold">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="font-serif text-xl font-semibold text-[#0A1628] mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label:'Register for an Event', subject:'Event Registration Enquiry' },
                  { label:'Apply for Mentorship',  subject:'Mentee Application' },
                  { label:'Become a Mentor',        subject:'Mentor Application' },
                  { label:'Corporate Partnership',  subject:'Corporate Partnership Inquiry' },
                  { label:'Make a Donation',        subject:'Donation Enquiry' },
                  { label:'Media & Press',          subject:'Media & Press Enquiry' },
                ].map((q) => (
                  <a
                    key={q.label}
                    href={`mailto:lucidhub.info@gmail.com?subject=${encodeURIComponent(q.subject)}`}
                    className="bg-white border border-[#EDE9E1] rounded-lg p-3 text-sm font-medium text-[#0A1628] hover:border-[#1A1AFF] hover:text-[#1A1AFF] transition-colors"
                  >
                    {q.label} →
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form — mailto fallback */}
          <div className="bg-white rounded-2xl p-8 border border-[#EDE9E1]">
            <h2 className="font-serif text-2xl font-bold text-[#0A1628] mb-2">Send a Message</h2>
            <p className="text-[#9CA3AF] text-sm mb-6">Fill in the form and we'll get back to you within 24 hours.</p>
            <form
              action="mailto:lucidhub.info@gmail.com"
              method="get"
              encType="text/plain"
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-[#0A1628] uppercase tracking-wider mb-1.5">Full Name</label>
                <input name="name" required className="w-full border border-[#EDE9E1] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1A1AFF] transition-colors" placeholder="Your full name" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0A1628] uppercase tracking-wider mb-1.5">Email Address</label>
                <input name="email" type="email" required className="w-full border border-[#EDE9E1] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1A1AFF] transition-colors" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0A1628] uppercase tracking-wider mb-1.5">Subject</label>
                <select name="subject" className="w-full border border-[#EDE9E1] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1A1AFF] transition-colors bg-white">
                  <option>General Enquiry</option>
                  <option>Event Registration</option>
                  <option>Mentorship Application</option>
                  <option>Donation / Partnership</option>
                  <option>Media & Press</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#0A1628] uppercase tracking-wider mb-1.5">Message</label>
                <textarea name="body" rows={5} required className="w-full border border-[#EDE9E1] rounded-lg px-4 py-3 text-sm outline-none focus:border-[#1A1AFF] transition-colors resize-none" placeholder="Tell us how we can help..." />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1A1AFF] text-white py-3 rounded-lg text-sm font-semibold hover:bg-[#3B3BFF] transition-colors"
              >
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
