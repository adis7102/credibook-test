export type MovieList = {
  page: string,
  results: object[],
  total_pages: number,
  total_results: number
}

export type MovieListItem = {
  id: string,
  poster_path: string,
  title: string,
  vote_average: number,
  overview: string,
  popularity: number,
  release_date: Date,
  vote_count: number
}

export type InitialState = {
  movieList: MovieListItem[],
  totalPage: number
}