import React from "react";

function LandingPage() {
  const [isProfileOpen, setIsProfileOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div
          className="relative mb-12 min-h-[480px] rounded-xl overflow-hidden flex items-end justify-start p-8 text-white bg-cover bg-center"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200")',
          }}
        >
          <div className="max-w-lg space-y-4">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Create Your Home
            </h1>
            <p className="text-base md:text-lg">
              Discover curated collections of furniture and decor to transform
              your living space.
            </p>
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-base font-bold shadow-lg hover:bg-indigo-700 transform transition-all duration-200 hover:scale-105">
              Shop Now
            </button>
          </div>
        </div>

        {/* Shop by Category */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="group flex flex-col items-center gap-3">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center transition-transform group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <p className="text-base font-medium">Living Room</p>
            </div>

            <div className="group flex flex-col items-center gap-3">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center transition-transform group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <p className="text-base font-medium">Bedroom</p>
            </div>

            <div className="group flex flex-col items-center gap-3">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center transition-transform group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <p className="text-base font-medium">Dining Room</p>
            </div>

            <div className="group flex flex-col items-center gap-3">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center transition-transform group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <p className="text-base font-medium">Office</p>
            </div>

            <div className="group flex flex-col items-center gap-3">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center transition-transform group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <p className="text-base font-medium">Outdoor</p>
            </div>
          </div>
        </section>

        {/* Trending Now */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Trending Now
          </h2>
          <div className="flex -mx-6 snap-x snap-mandatory scroll-px-6 space-x-4 overflow-x-auto pb-6">
            <div className="flex-none snap-center snap-always basis-64 space-y-3 px-6">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <div>
                <p className="font-medium text-gray-900">
                  The Cozy Corner Sofa
                </p>
                <p className="text-sm text-gray-500">
                  Perfect for movie nights
                </p>
              </div>
            </div>

            <div className="flex-none snap-center snap-always basis-64 space-y-3 px-6">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <div>
                <p className="font-medium text-gray-900">
                  The Serene Sleep Bed
                </p>
                <p className="text-sm text-gray-500">Drift off to dreamland</p>
              </div>
            </div>

            <div className="flex-none snap-center snap-always basis-64 space-y-3 px-6">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <div>
                <p className="font-medium text-gray-900">The Gathering Table</p>
                <p className="text-sm text-gray-500">Host memorable dinners</p>
              </div>
            </div>

            <div className="flex-none snap-center snap-always basis-64 space-y-3 px-6">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <div>
                <p className="font-medium text-gray-900">
                  The Productive Chair
                </p>
                <p className="text-sm text-gray-500">Boost your productivity</p>
              </div>
            </div>

            <div className="flex-none snap-center snap-always basis-64 space-y-3 px-6">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <div>
                <p className="font-medium text-gray-900">
                  The Relaxing Patio Set
                </p>
                <p className="text-sm text-gray-500">Enjoy the fresh air</p>
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            New Arrivals
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
            <div className="group space-y-3">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center transition-transform group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <p className="text-base font-medium">Artisan Coffee Table</p>
            </div>

            <div className="group space-y-3">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center transition-transform group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <p className="text-base font-medium">Luxury Bedding Set</p>
            </div>

            <div className="group space-y-3">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center transition-transform group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <p className="text-base font-medium">Modern Dining Chairs</p>
            </div>

            <div className="group space-y-3">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center transition-transform group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/159045/the-interior-of-the-repair-interior-design-159045.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <p className="text-base font-medium">Ergonomic Desk</p>
            </div>

            <div className="group space-y-3">
              <div
                className="w-full aspect-square rounded-lg bg-cover bg-center transition-transform group-hover:scale-105"
                style={{
                  backgroundImage:
                    'url("https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=400")',
                }}
              ></div>
              <p className="text-base font-medium">Outdoor Lounge Set</p>
            </div>
          </div>
        </section>

        {/* Join Our Community */}
        <section className="rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-600/10 text-center py-16 px-6 mb-12">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Join Our Community
            </h2>
            <p className="text-lg text-gray-700">
              Stay updated on the latest trends, exclusive offers, and design
              inspiration.
            </p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-base font-bold shadow-lg hover:bg-indigo-700 transform transition-all duration-200 hover:scale-105">
              Sign Up
            </button>
          </div>
        </section>
      </main>

      {/* Click outside to close dropdown */}
      {isProfileOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
}

export default LandingPage;
