import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopulerMovies = () => {
  return api.get(`/movie/popular?language=ko`);
};

export const usePopularMOviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular"],
    queryFn: fetchPopulerMovies,
    select: (result) => result.data,
  });
};
