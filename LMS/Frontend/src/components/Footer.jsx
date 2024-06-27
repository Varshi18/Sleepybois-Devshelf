import React from 'react'

function Footer() {
  return (
    <>
    <div className="md:">
    <footer className="footer p-10 bg-neutral text-base-100 md:fixed bottom-0 left-0 right-0">
  <aside>
     <img src="../../public/IIT dh logo.png" className="w-39 h-20"/>
    <p className="my:auto">INDIAN INSTITUTE OF TECHNOLOGY DHARWAD<br/>PERMANENT CAMPUS<br/>CHIKKAMALLIGAWAD<br/>DHARWAD - 580007<br/>KARNATAKA,<br/>BHARATA (INDIA)</p>
  </aside> 
  <nav>
    <h6 className="footer-title">Academics</h6> 
    <a className="link link-hover">Admissions</a>
    <a className="link link-hover">Announcements</a>
    <a className="link link-hover">Departments</a>
    <a className="link link-hover">Programs</a>
  </nav> 
  <nav>
    <h6 className="footer-title">Research</h6> 
    <a className="link link-hover">Consultancy Projects</a>
    <a className="link link-hover">Publications</a>
    <a className="link link-hover">Project Vacancies</a>
    <a className="link link-hover">Sponsored Projects</a>
  </nav> 
  <nav>
    <h6 className="footer-title">Quick Access</h6> 
    <a className="link link-hover">About dhArwAD</a>
    <a className="link link-hover">Bus Schedule</a>
    <a className="link link-hover">ICC</a>
    <a className="link link-hover">DevShelf</a>
  </nav>
    </footer>
</div>
    </>
  )
}

export default Footer
