import React, { Fragment, useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";
import clsx from "clsx";

import Button from "react-bootstrap/Button";

import { useSelector, useDispatch } from "react-redux";

import { API_KEY } from "../constants";
import { MovieList, MovieListItem, InitialState } from "../types";

import Navbar from "../components/Navbar";
import ModalDownload from "../components/ModalDownload";
import ScrollToTop from "../components/ScrollToTop";

import { wrapper } from "../store";
import { setMovieList, setTotalPage, getHomeData } from "../store/slices/home";

type Props = {
  movieListData: MovieListItem[];
};

const Home: NextPage<Props> = (props) => {
  const dispatch = useDispatch();
  const homeStateData: InitialState = useSelector(getHomeData);

  const [isDownload, setDownload] = useState(false);
  const [currentPage, setCurrentPage] = useState(5);

  const handleLoadMore = async (page: number) => {
    const resMovieList = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page+1}&with_watch_monetization_types=flatrate`, { method: "GET" });
    const movieListData: MovieList = await resMovieList.json();

    const resultsList: object[] = [...homeStateData.movieList, ...movieListData?.results];

    dispatch(setMovieList(resultsList))
    setCurrentPage(page+1);
  }

  return (
    <div>
      <Head>
        <title>Movie Spot!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="button-download">
        <Button size="lg" onClick={() => setDownload(!isDownload)}>
          Download Data
        </Button>
      </div>
      <ScrollToTop />
      <div className="movie-list">
        <div className="movie-list-wrap">
          {(homeStateData?.movieList || []).map(
            (item: MovieListItem, index) => (
              <Fragment key={index}>
                <Link href={`/${item?.id}`}>
                  <div className="movie-item">
                    <div className="image-wrap">
                      <div
                        className={clsx("rank-wrap", {
                          "first-pos": index === 0,
                          "second-pos": index === 1,
                          "third-pos": index === 2,
                        })}
                      >
                        <div className="rank-triangle" />
                        <div className="rank-text">{index + 1}</div>
                      </div>
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${item?.poster_path}`}
                        width={270}
                        height={370}
                      />
                    </div>
                    <div className="movie-item-description">
                      <div className="movie-title">{item?.title}</div>
                      <div className="movie-info">
                        <span>Release date:</span>{" "}
                        {dayjs(item?.release_date).format("DD MMM YYYY")}
                      </div>
                      <div className="movie-info">
                        <span>Popularity:</span> {item?.popularity}
                      </div>
                    </div>
                  </div>
                </Link>
                {index + 1 === (homeStateData?.movieList || []).length && (
                  <Button size="lg" onClick={() => handleLoadMore(currentPage)}>
                    Load More!
                  </Button>
                )}
              </Fragment>
            )
          )}
        </div>
      </div>
      {isDownload && (
        <ModalDownload
          data={homeStateData?.movieList}
          show={isDownload}
          onHide={setDownload}
        />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    let urls = [];

    for (let i: number = 1; i <= 5; i++) {
      urls.push(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&with_watch_monetization_types=flatrate`
      );
    }

    const resMovieList: MovieList[] = await Promise.all(
      urls.map(async (url) => {
        const res = await fetch(url, { method: "GET" });
        return res.json();
      })
    );

    const mappedListData: object[] = resMovieList.flatMap(
      (item) => item.results
    );

    store.dispatch(setMovieList(mappedListData));
    store.dispatch(setTotalPage(resMovieList?.[4]?.total_pages || 0));

    return {
      props: {
        movieListData: mappedListData,
      },
    };
  });

export default Home;
