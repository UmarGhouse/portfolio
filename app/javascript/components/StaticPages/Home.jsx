import React from "react";
import { Link } from "react-router-dom";

export default () => (
	<div>
		<p>The homepage</p>

		<Link
			to="/about"
			className="btn custom-button"
			role="button"
		>
			About Me
		</Link>
	</div>
);