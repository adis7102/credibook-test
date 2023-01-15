import React from 'react';
import type { NextPage } from 'next';
import Head from "next/head";

import Navbar from '../../components/Navbar';

const About: NextPage = () => {
  return (
    <div className="about-page">
      <Head>
        <title>Movie Spot! | About Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="about-page-wrap">
        <h1 className="title">MOVIE SPOT!</h1>
        <div className="about-page-wrap-desc">
          <p className="subtitle">About Movie Spot!</p>
          <p>Movie Spot! is a place for you to find list of the best movies sorted from the highest rated.</p>

          <p className="mt-4">In this page you will find:</p>
          <p>*List of top movies</p>
          <p>*Detail information of the movies</p>
          <p>to access detail of movies you can click the movie card</p>

          <p className="mt-4">Also in this page you can:</p>
          <p>*Download data of all movies that have been loaded</p>
          <p>*print detail movie box</p>

          <p className="mt-4">This Web is built with NEXT.js and TypeScript</p>

          <p className="mt-4">every data this page used are coming from TMDB API</p>
          <p>You can find their API in this link</p>
          <a href="https://developers.themoviedb.org/3/getting-started/introduction" target='_blank'>themoviedb.org</a>
        </div>
      </div>
    </div>
  )
}

export default About