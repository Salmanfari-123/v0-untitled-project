import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, ChevronRight, Layers, Star, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  // Testimonial data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      image: "/placeholder.svg?height=80&width=80",
      quote: "LinkForest transformed how I share content with my audience. The customization options are incredible!",
    },
    {
      name: "Michael Chen",
      role: "Entrepreneur",
      image: "/placeholder.svg?height=80&width=80",
      quote:
        "I've tried many link-in-bio tools, but LinkForest stands out with its beautiful templates and ease of use.",
    },
    {
      name: "Priya Patel",
      role: "Digital Marketer",
      image: "/placeholder.svg?height=80&width=80",
      quote: "The analytics features help me understand what content resonates with my audience. Game changer!",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="size-6 text-emerald-500" />
            <span className="font-bold text-xl">LinkForest</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="#templates" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Templates
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Log in
            </Link>
            <Link href="/auth/register">
              <Button>Sign up free</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-emerald-50 pt-20 pb-32">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-emerald-100/50 blur-3xl"></div>
            <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-emerald-200/30 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="flex flex-col items-center text-center mb-12">
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-0">
                <Zap className="mr-1 h-3 w-3" /> Introducing LinkForest 2.0
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                One Link for All Your Content
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl">
                Connect your audience to everything you create, share, and sell with just one link. Customize your page,
                track analytics, and grow your following.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register">
                  <Button size="lg" className="px-8 h-14 text-base rounded-full">
                    Get started for free <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="px-8 h-14 text-base rounded-full">
                    See how it works
                  </Button>
                </Link>
              </div>
              <div className="mt-6 text-sm text-gray-500 flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" /> No credit card required
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto max-w-5xl">
              <div className="bg-white rounded-xl shadow-2xl overflow-hidden border">
                <Image
                  src="/placeholder.svg?height=600&width=1200"
                  width={1200}
                  height={600}
                  alt="LinkForest Dashboard"
                  className="w-full h-auto"
                  priority
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg border hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Engagement up</div>
                    <div className="text-emerald-600 font-bold">+27%</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg border hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 text-purple-600 p-2 rounded-full">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">80+ Templates</div>
                    <div className="text-purple-600 font-bold">Fully Customizable</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="py-12 bg-gray-50 border-y">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-500 mb-8">Trusted by creators and brands worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                  <div className="h-8 w-24 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need in One Place</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                LinkForest gives you all the tools to create a stunning link page that converts visitors into followers,
                subscribers, and customers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-xl border hover:shadow-lg transition-shadow">
                <div className="bg-emerald-100 text-emerald-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
                    <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    <path d="M12 2v2" />
                    <path d="M12 22v-2" />
                    <path d="m17 20.66-1-1.73" />
                    <path d="M11 10.27 7 3.34" />
                    <path d="m20.66 17-1.73-1" />
                    <path d="m3.34 7 1.73 1" />
                    <path d="M14 12h8" />
                    <path d="M2 12h2" />
                    <path d="m20.66 7-1.73 1" />
                    <path d="m3.34 17 1.73-1" />
                    <path d="m17 3.34-1 1.73" />
                    <path d="m7 20.66 1-1.73" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">80+ Stunning Templates</h3>
                <p className="text-gray-600 mb-4">
                  Choose from our library of professionally designed templates to match your brand and style.
                </p>
                <ul className="space-y-2">
                  {["Fully customizable", "Mobile optimized", "Unique designs"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-xl border hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M8 13h2" />
                    <path d="M8 17h2" />
                    <path d="M14 13h2" />
                    <path d="M14 17h2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Easy Link Management</h3>
                <p className="text-gray-600 mb-4">
                  Add, edit, and reorder your links with our intuitive dashboard. Toggle links on and off as needed.
                </p>
                <ul className="space-y-2">
                  {["Drag-and-drop interface", "Scheduled links", "Link analytics"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-xl border hover:shadow-lg transition-shadow">
                <div className="bg-purple-100 text-purple-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12Z" />
                    <path d="M9 22h6" />
                    <path d="M12 18h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Mobile Optimization</h3>
                <p className="text-gray-600 mb-4">
                  Every template is designed to look perfect on all devices, from smartphones to desktops.
                </p>
                <ul className="space-y-2">
                  {["Responsive design", "Fast loading", "App-like experience"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-8 rounded-xl border hover:shadow-lg transition-shadow">
                <div className="bg-amber-100 text-amber-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v8" />
                    <path d="m4.93 10.93 1.41 1.41" />
                    <path d="M2 18h2" />
                    <path d="M20 18h2" />
                    <path d="m19.07 10.93-1.41 1.41" />
                    <path d="M22 22H2" />
                    <path d="m8 22 4-10 4 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Custom Branding</h3>
                <p className="text-gray-600 mb-4">
                  Make your page truly yours with custom colors, fonts, backgrounds, and more.
                </p>
                <ul className="space-y-2">
                  {["Custom colors", "Font selection", "Background images"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-8 rounded-xl border hover:shadow-lg transition-shadow">
                <div className="bg-pink-100 text-pink-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 11v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3" />
                    <path d="M12 19H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3.5" />
                    <path d="m7 19 3 3 3-3" />
                    <path d="M4 8h16" />
                    <path d="M3 4h18" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Social Media Integration</h3>
                <p className="text-gray-600 mb-4">
                  Connect all your social profiles in one place with beautiful, branded icons.
                </p>
                <ul className="space-y-2">
                  {["20+ platforms", "Custom icons", "One-click follow"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature 6 */}
              <div className="bg-white p-8 rounded-xl border hover:shadow-lg transition-shadow">
                <div className="bg-indigo-100 text-indigo-600 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Detailed Analytics</h3>
                <p className="text-gray-600 mb-4">
                  Track clicks, views, and engagement to understand what content resonates with your audience.
                </p>
                <ul className="space-y-2">
                  {["Real-time data", "Click tracking", "Audience insights"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section id="templates" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Beautiful Templates for Every Style</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Choose from over 80 professionally designed templates and customize them to match your brand.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Template previews */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="group relative">
                  <div className="aspect-[9/16] rounded-lg overflow-hidden border bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-full h-full bg-gray-100"></div>
                  </div>
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <Button variant="secondary" size="sm">
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/auth/register">
                <Button size="lg" className="rounded-full">
                  Explore all templates <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200 border-0">Easy to use</Badge>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">Create Your Perfect Link Page in Minutes</h2>
                  <p className="text-lg text-gray-600 mb-8">
                    LinkForest makes it simple to create a stunning link page that showcases all your content in one
                    place. No design skills required.
                  </p>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="bg-emerald-100 text-emerald-600 h-10 w-10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-lg font-medium">1</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-medium mb-1">Sign up for free</h4>
                        <p className="text-gray-600">Create your account in seconds, no credit card required</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-emerald-100 text-emerald-600 h-10 w-10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-lg font-medium">2</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-medium mb-1">Add your links</h4>
                        <p className="text-gray-600">
                          Add all your important links, social profiles, and content in one place
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-emerald-100 text-emerald-600 h-10 w-10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-lg font-medium">3</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-medium mb-1">Customize your page</h4>
                        <p className="text-gray-600">
                          Choose from beautiful templates and customize colors, fonts, and more
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="bg-emerald-100 text-emerald-600 h-10 w-10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-lg font-medium">4</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-medium mb-1">Share with the world</h4>
                        <p className="text-gray-600">
                          Use your unique LinkForest URL everywhere to connect with your audience
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <Link href="/auth/register">
                      <Button size="lg" className="rounded-full">
                        Get started for free <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative aspect-[9/16] max-w-xs mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-400 to-teal-600 rounded-3xl shadow-xl">
                      <div className="absolute inset-2 bg-white rounded-2xl overflow-hidden">
                        <div className="pt-8 px-6 text-center">
                          <div className="relative size-20 rounded-full overflow-hidden mx-auto mb-4">
                            <Image
                              src="/placeholder.svg?height=80&width=80"
                              width={80}
                              height={80}
                              alt="Profile"
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-bold text-xl mb-1">@username</h3>
                          <p className="text-gray-600 text-sm mb-4">Digital creator & content strategist</p>
                          <div className="space-y-3 mt-6">
                            {[1, 2, 3, 4].map((index) => (
                              <div
                                key={index}
                                className="bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg p-3 text-center cursor-pointer"
                              >
                                Link #{index}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-100 rounded-full blur-xl opacity-70"></div>
                  <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-emerald-100 rounded-full blur-xl opacity-70"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by Creators Worldwide</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join thousands of creators, influencers, and businesses who use LinkForest to connect with their
                audience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-xl border shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        width={48}
                        height={48}
                        alt={testimonial.name}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  <div className="mt-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Start for free and upgrade when you need more features. No hidden fees or surprises.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="bg-white p-8 rounded-xl border hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Free</h3>
                  <p className="text-gray-600 mb-4">Perfect for getting started</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {["Up to 5 links", "Basic analytics", "Standard templates", "Mobile-friendly", "Custom URL"].map(
                    (feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ),
                  )}
                </ul>
                <Link href="/auth/register" className="w-full">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="bg-white p-8 rounded-xl border border-emerald-200 shadow-lg relative">
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Pro</h3>
                  <p className="text-gray-600 mb-4">For creators and professionals</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$9</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Unlimited links",
                    "Advanced analytics",
                    "All templates",
                    "Custom branding",
                    "Priority support",
                    "Background images",
                    "Scheduled links",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/register" className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>

              {/* Business Plan */}
              <div className="bg-white p-8 rounded-xl border hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Business</h3>
                  <p className="text-gray-600 mb-4">For teams and businesses</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Everything in Pro",
                    "Team management",
                    "Multiple profiles",
                    "API access",
                    "Dedicated support",
                    "Custom domains",
                    "Advanced integrations",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/auth/register" className="w-full">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Grow Your Audience?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of creators who use LinkForest to connect with their audience and grow their online
              presence.
            </p>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 text-base">
                Get started for free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-6 text-sm text-white/80">No credit card required. Cancel anytime.</p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Layers className="size-6 text-emerald-400" />
                <span className="font-bold text-xl">LinkForest</span>
              </div>
              <p className="text-gray-400 text-sm">Connect your audience to all your content with just one link.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                {["Features", "Templates", "Pricing", "Analytics", "Mobile App"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Press", "Contact"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                {["Terms", "Privacy", "Cookies", "Licenses", "Settings"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-400 hover:text-white text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} LinkForest. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Twitter", "Instagram", "Facebook", "LinkedIn", "YouTube"].map((social, i) => (
                <Link key={i} href="#" className="text-gray-400 hover:text-white text-sm">
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
