import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieDetail = (id) => {
  return api.get(`/movie/${id}?language=ko`);
};

export const useMovieDetailQuery = (id) => {
  return useQuery({
    queryKey: ["movie-detil", id],
    queryFn: () => fetchMovieDetail(id),
    select: (result) => result.data,
  });
};
