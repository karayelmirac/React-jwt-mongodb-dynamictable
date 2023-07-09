import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import { Table } from "antd";

const Home = ({ data }) => {
  const [posts, setPosts] = useState([]);
  const { Column } = Table;

  useEffect(() => {
    PostService.getAllPublicPosts().then(
      (response) => {
        setPosts(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  // Last 3 companies for Homepage
  const lastThree = [];
  if (data.length > posts.length) {
    for (let i = 1; i < 4; i++) {
      lastThree.push(data[data.length - i]);
    }
  } else {
    for (let i = 1; i < 4; i++) {
      lastThree.push(posts[posts.length - i]);
    }
  }

  return (
    <div>
      {data.length > posts.length ? (
        <h3>There are {data.length} numbers of companies in the system</h3>
      ) : (
        <h3>There are {posts.length} numbers of companies in the system</h3>
      )}

      <h4>Lastly added 3 Companies</h4>

      <Table dataSource={lastThree}>
        <Column
          title="Company Name"
          dataIndex="company_name"
          key="company_name"
        />
        <Column
          title="Company Legal Number"
          dataIndex="company_legal_number"
          key="company_legal_number"
        />
        <Column
          title="Incorporation
        Country"
          dataIndex="incorporation_country"
          key="incorporation_country"
        />
        <Column title="Website" dataIndex="Website" key="Website" />
      </Table>
    </div>
  );
};

export default Home;
