import React from "react";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import type { NextPage } from "next";
import Head from "next/head"
import Image from "next/image";
import Button from "react-bootstrap/Button";

import Navbar from "../../components/Navbar";

import { MovieListItem } from "../../types";

interface Props {
  movieData: MovieListItem;
}

const index: NextPage<Props> = ({ movieData }) => {
  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    release_date,
    overview,
  } = movieData || {};

  const handlePrint = (): void => {
    window.print();
  };

  return (
    <div className="movie-detail">
      <Head>
        <title>Movie Spot! | {title}</title>
        <meta name="description" content="One spot of all your favourite movies!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="movie-detail-wrap">
        <div id="movie-detail-box" className="movie-detail-box">
          <div className="detail-image">
            <Image
              src={`https://image.tmdb.org/t/p/w400${poster_path}`}
              width={500}
              height={650}
            />
          </div>
          <div className="detail-description">
            <div className="detail-title">
              <h1>{title}</h1>
            </div>
            <div className="detail-text">
              <span>RELEASE DATE: </span>
              {dayjs(release_date).format("DD MMMM YYYY")}
            </div>
            <div className="detail-text">
              <span>VOTE AVERAGE: </span>
              {vote_average}
            </div>
            <div className="detail-text">
              <span>VOTE COUNT: </span>
              {vote_count}
            </div>
            <div className="detail-overview">OVERVIEW:</div>
            <div className="detail-overview-text">{overview}</div>
          </div>
        </div>
        <div className="button-print">
          <Button size="lg" onClick={() => handlePrint()}>
            PRINT!
          </Button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const resMovieData = await fetch(
    `https://api.themoviedb.org/3/movie/${context?.query?.id}?api_key=01d363b6952903b2f9cb39bc957763d8&language=en-US`
  );
  const movieData: MovieListItem = await resMovieData.json();

  return {
    props: {
      movieData: movieData,
    },
  };
};

export default index;
