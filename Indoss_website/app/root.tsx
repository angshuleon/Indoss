import type { LinksFunction } from "react-router";
import "./app.css";
import { NavLink, Outlet } from "react-router";
import { useState } from "react";
import indossLogo from "./assets/indoss_logo_full.png";
import appStylesHref from "./app.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

// function Navbar() {
//   const baseLink =
//     "relative text-sm font-medium text-indoss-charcoal/75 hover:text-indoss-orange px-2 py-1";
//   const activeStyles =
//     "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-indoss-orange after:to-indoss-teal";

//   return (
//     <header className="sticky top-0 z-30 border-b border-white/70 bg-white/80 backdrop-blur">
//       <nav className="section py-3 flex items-center justify-between gap-6">
//         {/* Logo */}
//         <NavLink to="/" className="flex items-center gap-3 group">
//           <div className="h-9 w-9 rounded-3xl bg-gradient-to-br from-indoss-orange to-indoss-teal shadow-glow flex items-center justify-center text-xs font-bold text-white">
//             I
//           </div>
//           <div className="leading-tight">
//             <div className="tracking-[0.18em] text-xs font-semibold text-indoss-charcoal/80">
//               INDOSS
//             </div>
//             <div className="text-[11px] text-indoss-charcoal/60 group-hover:text-indoss-charcoal/90">
//               Energy LLP · Assam, India
//             </div>
//           </div>
//         </NavLink>

//         {/* Nav links */}
//         <div className="hidden md:flex items-center gap-7">
//           <NavLink
//             to="/"
//             end
//             className={({ isActive }) =>
//               `${baseLink} ${isActive ? activeStyles : ""}`
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/about"
//             className={({ isActive }) =>
//               `${baseLink} ${isActive ? activeStyles : ""}`
//             }
//           >
//             About
//           </NavLink>
//           <NavLink
//             to="/services"
//             className={({ isActive }) =>
//               `${baseLink} ${isActive ? activeStyles : ""}`
//             }
//           >
//             Services
//           </NavLink>
//           <NavLink
//             to="/verticals"
//             className={({ isActive }) =>
//               `${baseLink} ${isActive ? activeStyles : ""}`
//             }
//           >
//             Verticals
//           </NavLink>
//           <NavLink
//             to="/projects"
//             className={({ isActive }) =>
//               `${baseLink} ${isActive ? activeStyles : ""}`
//             }
//           >
//             Projects
//           </NavLink>
//           <NavLink
//             to="/contact"
//             className={({ isActive }) =>
//               `${baseLink} ${isActive ? activeStyles : ""}`
//             }
//           >
            
//             Contact
//           </NavLink>
//         </div>

//         {/* CTA */}
//         <NavLink
//           to="/contact"
//           className="hidden md:inline-flex items-center gap-2 rounded-full bg-indoss-orange px-4 py-2 text-xs font-semibold text-white shadow-soft hover:shadow-glow"
//         >
//           Plan a solar project
//         </NavLink>

//         <a
//           href="http://localhost:5174"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="hidden md:inline-flex items-center gap-2 rounded-full border border-indoss-orange px-4 py-2 text-xs font-semibold text-indoss-orange bg-white hover:bg-indoss-orange hover:text-white shadow-soft hover:shadow-glow transition-all"
//         >
//           Estimate your solar potential
//         </a>

//       </nav>
//     </header>
//   );
// }

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const baseLink =
    "relative text-sm font-medium text-indoss-charcoal/75 hover:text-indoss-orange px-2 py-1";
  const activeStyles =
    "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-indoss-orange after:to-indoss-teal";

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/90 backdrop-blur">
      {/* top bar */}
      <nav className="section flex min-h-[76px] items-center justify-between gap-6">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <img
            src={indossLogo}
            alt="Indoss Energy"
            className="h-16 w-auto select-none"
          />
          {/* <div className="leading-tight">
            <div className="tracking-[0.22em] text-sm font-semibold text-indoss-charcoal/65">
              INDOSS
            </div>
            <div className="text-[11px] text-indoss-charcoal/60 group-hover:text-indoss-charcoal/90">
              Energy LLP · Assam, India
            </div>
          </div> */}
        </NavLink>


        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeStyles : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeStyles : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeStyles : ""}`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/verticals"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeStyles : ""}`
            }
          >
            Verticals
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeStyles : ""}`
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${baseLink} ${isActive ? activeStyles : ""}`
            }
          >
            Contact
          </NavLink>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-indoss-orange px-4 py-2 text-xs font-semibold text-white shadow-soft hover:shadow-glow"
          >
            Plan a solar project
          </NavLink>

          {/* <a
            // href="http://localhost:5174"
            href  ="https://growing-lemon-able-being.trycloudflare.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-indoss-orange px-4 py-2 text-xs font-semibold text-indoss-orange bg-white hover:bg-indoss-orange hover:text-white shadow-soft hover:shadow-glow transition-all"
          >
            Estimate your solar potential
          </a> */}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-indoss-charcoal/15 bg-white shadow-soft"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="space-y-[4px]">
            <span
              className={`block h-[2px] w-4 rounded-full bg-indoss-charcoal transition-transform ${
                mobileOpen ? "translate-y-[3px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-4 rounded-full bg-indoss-charcoal transition-opacity ${
                mobileOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[2px] w-4 rounded-full bg-indoss-charcoal transition-transform ${
                mobileOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/80 bg-white/95 backdrop-blur">
          <div className="section py-3 flex flex-col gap-2">
            <NavLink
              to="/"
              end
              onClick={closeMobile}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeStyles : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMobile}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeStyles : ""}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              onClick={closeMobile}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeStyles : ""}`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/verticals"
              onClick={closeMobile}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeStyles : ""}`
              }
            >
              Verticals
            </NavLink>
            <NavLink
              to="/projects"
              onClick={closeMobile}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeStyles : ""}`
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeMobile}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeStyles : ""}`
              }
            >
              Contact
            </NavLink>

            <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-indoss-charcoal/5">
              <NavLink
                to="/contact"
                onClick={closeMobile}
                className="inline-flex items-center justify-center rounded-full bg-indoss-orange px-4 py-2 text-xs font-semibold text-white shadow-soft hover:shadow-glow"
              >
                Plan a solar project
              </NavLink>
              {/* <a
                // href="http://localhost:5174"
                href = "https://growing-lemon-able-being.trycloudflare.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className="inline-flex items-center justify-center rounded-full border border-indoss-orange px-4 py-2 text-xs font-semibold text-indoss-orange bg-white hover:bg-indoss-orange hover:text-white shadow-soft hover:shadow-glow transition-all"
              >
                Estimate your solar potential */}
              {/* </a> */}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-r from-indoss-teal to-indigo-950 text-white">
      <div className="section py-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] uppercase">
            Indoss Energy LLP
          </p>
          <p className="mt-1 text-xs text-white/80 max-w-sm">
            Renewable energy, microgrids & consulting for a resilient North East
            – starting with high-quality solar EPC.
          </p>
        </div>
        <div className="text-[11px] text-white/65 space-y-1 md:text-right">
          <p>© {new Date().getFullYear()} Indoss Energy LLP.</p>
          <p>Built with React, React Router & Tailwind.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Root() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indoss-mist via-white to-indoss-mist text-indoss-charcoal">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
