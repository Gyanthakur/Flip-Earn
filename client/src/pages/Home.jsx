import React from "react";
import Hero from "../components/Hero";
import LatestListing from "../components/LatestListing";
import Plans from "../components/Plans";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Signature from "./Signature";

const Home = () => {
	return (
		<div>
			<Hero />
			<LatestListing />
			<Plans />
			<CTA />
      <Signature/>
		</div>
	);
};

export default Home;
