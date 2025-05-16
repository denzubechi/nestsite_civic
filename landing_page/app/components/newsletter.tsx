
export default function Newsletter() {
  return (
   <>
   <section className="bg-black" style={{borderBottom:"0.01px solid #6d6d6d"}}>
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md sm:text-center">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl text-white">Sign up for our newsletter</h2>
          <p className="mx-auto mb-8 max-w-2xl font-light  md:mb-12 sm:text-xl text-gray-300">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
          <form action="#">
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                  <div className="relative w-full">
                      <label  className="hidden mb-2 text-sm font-medium text-gray-900 text-gray-900">Email address</label>
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                      </div>
                      <input className="block p-3 py-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Enter your email" type="email" id="email" required/>
                  </div>
                  <div>
                      <button type="submit" className="py-4 px-5 w-full text-sm font-medium text-center text-white rounded-lg  cursor-pointer  sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-indigo-300 bg-gradient-to-r from-red-500 via-orange-600 to-purple-500 hover:bg-indigo-700 focus:ring-indigo-800"style={{background:"#7a3df7"}}>Subscribe</button>
                  </div>
              </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer text-gray-400">We care about the protection of your data. <a href="#" className="font-medium text-primary text-primary hover:underline">Read our Privacy Policy</a>.</div>
          </form>
      </div>
  </div>
</section>
   </>
  )
}