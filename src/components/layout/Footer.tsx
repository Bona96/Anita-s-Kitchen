const Footer = () => {
  return (
    <footer className="py-8 text-center text-sm bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700 mt-12">
      <div className="py-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Anita's Kitchen
      </div>
          Developed by:
      <a 
          className='p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md ml-2'
          href="https://knihtdigitalsolutions.vercel.app"
      >
          KNiHT Digital Solutions
      </a>
    </footer>
  )
}

export default Footer
