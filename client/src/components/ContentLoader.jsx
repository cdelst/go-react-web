import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={600}
      height={300}
      viewBox="0 0 600 300"
      backgroundColor="#000000"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="15" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="31" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="47" rx="3" ry="3" width="178" height="6" />
      <rect x="0" y="64" rx="3" ry="3" width="295" height="6" />
      <rect x="0" y="83" rx="3" ry="3" width="350" height="15" />
      <rect x="2" y="135" rx="3" ry="3" width="410" height="6" />
      <rect x="2" y="151" rx="3" ry="3" width="380" height="6" />
      <rect x="2" y="167" rx="3" ry="3" width="178" height="6" />
      <rect x="2" y="184" rx="3" ry="3" width="295" height="6" />
      <rect x="2" y="203" rx="3" ry="3" width="350" height="10" />
    </ContentLoader>
  );
};

export default MyLoader;
