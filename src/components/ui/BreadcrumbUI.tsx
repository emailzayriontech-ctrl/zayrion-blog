import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";

export const BreadcrumbUI = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  const breadcrumbList = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;
    const formattedName = name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      name: formattedName,
      path: routeTo,
      isLast,
    };
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://zayriontech.com/",
      },
      ...breadcrumbList.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.name,
        item: `https://zayriontech.com${crumb.path}`,
      })),
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className="w-full flex text-sm text-muted-foreground py-4 mb-4">
        <ol className="flex flex-wrap items-center space-x-2">
          <li>
            <Link to="/" className="flex items-center hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>
          {breadcrumbList.map((crumb) => (
            <li key={crumb.path} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
              {crumb.isLast ? (
                <span className="text-foreground font-medium pointer-events-none" aria-current="page">
                  {crumb.name}
                </span>
              ) : (
                <Link to={crumb.path} className="hover:text-primary transition-colors">
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};
