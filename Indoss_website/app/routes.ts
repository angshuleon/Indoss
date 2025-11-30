// app/routes.ts
import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  // Home page `/`
  index("routes/index.tsx"),

  // /about
  route("about", "routes/about.tsx"),

  // /services
  route("services", "routes/services.tsx"),

  // /verticals
  route("verticals", "routes/verticals.tsx"),

  // /projects
  route("projects", "routes/projects.tsx"),

  // /contact
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;
