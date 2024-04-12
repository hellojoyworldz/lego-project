import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRecommendedMovies = (id) => {
  console.log(id);
  return api.get(`/movie/${id}/recommendations?language=ko`);
};

export const useRecommendedMoveiesQuery = (id) => {
  return useQuery({
    queryKey: ["movie-recommendations", id],
    queryFn: () => fetchRecommendedMovies(id),
    select: (result) => result.data,
  });
};
