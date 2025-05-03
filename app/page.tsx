import { Button } from "@/components/ui/button"
import { ArrowRight, Layers, LucideLink, Paintbrush, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="size-6 text-emerald-500" />
            <span className="font-bold text-xl">LinkForest</span>
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
        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">One Link to Rule Them All</h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect your audience to all of your content with just one link. Customize your page, track analytics, and
              grow your following.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="px-8">
                  Get started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="px-8">
                  See demo
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why choose LinkForest?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Paintbrush className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Customizable Templates</h3>
                  <p className="text-gray-600">
                    Choose from 5 beautiful templates and make them your own with custom colors, fonts, and layouts.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <LucideLink className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Manage Links Easily</h3>
                  <p className="text-gray-600">
                    Add, edit, and reorder your links with our intuitive dashboard. Toggle links on and off as needed.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Grow Your Audience</h3>
                  <p className="text-gray-600">
                    Connect with your audience across all platforms with a single, memorable link.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="demo" className="py-16 md:py-24 container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6">See LinkForest in Action</h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Experience the power of LinkForest with our interactive demo
            </p>
            <div className="grid md:grid-cols-2 gap-12 items-center">
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
              <div>
                <h3 className="text-2xl font-bold mb-4">Create your perfect link page</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-emerald-100 text-emerald-600 h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Sign up for free</h4>
                      <p className="text-gray-600">Create your account in seconds</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-emerald-100 text-emerald-600 h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Add your links</h4>
                      <p className="text-gray-600">Add all your important links in one place</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-emerald-100 text-emerald-600 h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Customize your page</h4>
                      <p className="text-gray-600">Choose from templates and make it your own</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-emerald-100 text-emerald-600 h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-sm font-medium">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Share with the world</h4>
                      <p className="text-gray-600">Use your unique LinkForest URL everywhere</p>
                    </div>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/auth/register">
                    <Button size="lg">Get your LinkForest</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Layers className="size-5 text-emerald-500" />
              <span className="font-bold">LinkForest</span>
            </div>
            <div className="text-sm text-gray-600">© {new Date().getFullYear()} LinkForest. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Terms
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
