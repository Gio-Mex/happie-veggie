import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function Paginator({
  firstItem,
  currentPage,
  onPageChange,
}: {
  firstItem: number;
  lastItem: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const recipes = useAppSelector((state) => state.recipes);
  const [index, setIndex] = useState(1);
  const paginatorItems = [];
  const pages = Math.ceil(recipes.data.length / 12);

  // Initialize index with current page
  useEffect(() => {
    if (currentPage) {
      setIndex(currentPage);
      onPageChange((currentPage - 1) * 12);
    }
  }),
    [];

  // Paginator handlers
  const next = () => {
    if (index < pages) {
      setIndex(index + 1);
      onPageChange(firstItem + 12);
      window.scrollTo(0, 0);
      const newUrl = `${window.location.origin}${
        window.location.pathname
      }?page=${index + 1}`;
      window.history.replaceState(null, "", newUrl);
    }
  };

  const previous = () => {
    if (index > 1) {
      setIndex(index - 1);
      onPageChange(firstItem - 12);
    }
    window.scrollTo(0, 0);
    const newUrl = `${window.location.origin}${window.location.pathname}?page=${
      index - 1
    }`;
    window.history.replaceState(null, "", newUrl);
  };

  // Paginator body
  for (let i = 1; i <= pages; i++) {
    paginatorItems.push(
      <PaginationItem key={i} className={`${index !== i ? "hidden" : ""}`}>
        <PaginationLink
          isActive
          className="border-green-600 rounded pointer-events-none"
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        {index === 1 ? null : (
          <PaginationItem>
            <PaginationPrevious
              className="rounded hover:bg-green-100 cursor-pointer"
              onClick={previous}
            />
          </PaginationItem>
        )}
        {paginatorItems}
        <PaginationItem>
          {index === pages ? null : <PaginationEllipsis />}
        </PaginationItem>

        {index === pages ? null : (
          <PaginationItem>
            <PaginationLink>{pages}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          {index === pages ? null : (
            <PaginationNext
              className="border-green-600 rounded hover:bg-green-100
               cursor-pointer"
              onClick={next}
            />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Paginator;
